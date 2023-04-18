import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { SaleOrdersModule } from './sale-orders/sale-orders.module';
import { SalesModule } from './sales/sales.module';
import { BranchOfficesModule } from './branch-offices/branch-offices.module';
import { StockModule } from './stock/stock.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    EmployeesModule,
    ProductsModule,
    ProductCategoriesModule,
    SaleOrdersModule,
    SalesModule,
    BranchOfficesModule,
    StockModule,
    CoreModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
})
export class AppModule {
  static SERVER_PORT: number;
  constructor(private configService: ConfigService) {
    AppModule.SERVER_PORT = this.configService.get<number>('SERVER_PORT');
  }
}
