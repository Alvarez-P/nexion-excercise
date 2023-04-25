import { Injectable } from '@nestjs/common';
import { Query } from '../types/query.interface';
import { Model } from 'sequelize-typescript';
import { Attributes, FindOptions, Order, WhereOptions } from 'sequelize';
import { Op } from 'sequelize';

@Injectable()
export class QueryBuilder<T, M extends Model> {
  build(queryDto: Query<T>): FindOptions<Attributes<M>> {
    const {
      sort = 'ASC',
      offset = 0,
      limit = 20,
      orderBy = 'createdAt',
      ...filters
    } = queryDto;
    const order: Order = [[orderBy.toString(), sort.toUpperCase()]];
    const where: WhereOptions<T> = {};
    for (const filter in filters) {
      if (filters[filter].from || filters[filter].to) {
        const { from, to } = filters[filter];
        if (from && to) where[filter] = { [Op.between]: [from, to] };
        else if (from) where[filter] = { [Op.gte]: from };
        else if (to) where[filter] = { [Op.lte]: to };
      } else if (typeof filters[filter] === 'string')
        where[filter] = { [Op.substring]: filters[filter] };
      else where[filter] = { [Op.eq]: filters[filter] };
    }
    return {
      where,
      order,
      offset,
      limit,
      raw: true,
      nest: true,
      paranoid: false,
    };
  }
}
