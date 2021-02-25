import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CustomersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
