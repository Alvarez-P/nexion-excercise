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
import { LogsModule } from './logs/logs.module';
import { AuthService } from './auth/application/auth.service';
import { LocalStrategy } from './auth/application/strategy/local.strategy';
import { JwtStrategy } from './auth/application/strategy/jwt.strategy';
import { EmployeeRepository } from './employees/infrastructure/employees.repository';
import { JwtModule } from '@nestjs/jwt';

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
    LogsModule,
    JwtModule.register({}),
  ],
  controllers: [],
  providers: [
    ConfigService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    EmployeeRepository,
  ],
})
export class AppModule {
  static SERVER_PORT: number;
  constructor(private configService: ConfigService) {
    AppModule.SERVER_PORT = this.configService.get<number>('SERVER_PORT');
  }
}
