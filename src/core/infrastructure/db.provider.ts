import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { BranchOfficeModel } from 'src/branch-offices/domain/branch-office.model';
import { EmployeeModel } from 'src/employees/domain/employee.model';
import { ProductCategoryModel } from 'src/product-categories/domain/product-category.model';
import { ProductModel } from 'src/products/domain/product.model';
import { SaleOrderModel } from 'src/sale-orders/domain/sale-orders.model';
import { SaleModel } from 'src/sales/domain/sale.model';
import { StockModel } from 'src/stock/domain/stock.model';

export const DbProvider: Provider = {
  provide: 'Database',
  useFactory: async (configService: ConfigService) => {
    const sequelize = new Sequelize({
      dialect: 'mysql',
      host: configService.get('DB_HOST'),
      port: Number(configService.get('DB_PORT')),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
    });
    sequelize.addModels([
      BranchOfficeModel,
      EmployeeModel,
      ProductCategoryModel,
      ProductModel,
      SaleOrderModel,
      SaleModel,
      StockModel,
    ]);
    await sequelize.sync();
    return sequelize;
  },
  inject: [ConfigService],
};
