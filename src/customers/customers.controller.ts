import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Put,
  Res,
  Query, UseGuards, Req,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { ReturnCustomerDto } from './dtos/return-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { Customer } from './customer.entity';
import { DeleteResult } from 'typeorm';
import { Response } from 'express';
import {Role} from "../auth/role-decorator";
import {AuthGuard} from "@nestjs/passport";
import {UserRole} from "../users/user-roles.enum";
import {RolesGuard} from "../auth/role-guards";

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post()
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<ReturnCustomerDto> {
    const customer = await this.customersService.createCustomer(
      createCustomerDto,
    );
    return { customer, message: 'Cliente cadastrado com sucesso' };
  }

  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @Get('/id')
  async findCustomersByIds(@Query('id') id: string[]): Promise<Customer[]> {
    const customer = await this.customersService.findCustomersByIds(id);
    return customer;
  }
  // @Get('/:id')
  // async findCustomerById(@Param('id') id: string): Promise<Customer> {
  //   const customer = await this.customersService.findCustomerById(id);
  //   return customer;
  // }

  @Get('phone/:id')
  async findCustomerByphone(
    @Param('id') id: string,
  ): Promise<ReturnCustomerDto> {
    const customer = await this.customersService.findCustomerByphone(id);
    return { customer, message: 'Cliente Encontrado!' };
  }

  @Put('/:id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() newCustomer: UpdateCustomerDto,
  ): Promise<Customer> {
    const oldCustomer = await this.customersService.findCustomerById(id);
    const customer = await this.customersService.updateCustomer(
      oldCustomer,
      newCustomer,
    );
    return customer;
  }

  @Role(UserRole.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  async getAllCustomers(@Res() res: Response, @Query('search') filter: String): Promise<Customer[]> {
    let customers;

    if (filter == undefined){
      customers = await this.customersService.findAllCustomers()
    } else{
      customers = await this.customersService.searchCostumer(filter);
    }

    res.header('X-Total-Count', customers.count.toString());
    res.send(customers.listCustomers);
    return customers.listCustomers;
  }

  @Delete('deleteId')
  async deleteCustomerById(@Body() id: string): Promise<DeleteResult> {
    return await this.customersService.deleteCustomerById(id);
  }
  //
  // @Get()
  // async searchCustomer(@Query('filter') q: String): Promise<Customer[]> {
  //   const customer = await this.customersService.searchCostumer(q);
  //   return customer;
  // }
}
