import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/core/decorators/auth.decorator';
import { User } from 'src/core/decorators/user.decorator';
import { responseError, responseSuccess } from '../../base/base.controller';
import { ROLE } from '../../core/constants/enum';
import { ProductFilterDto } from './dto/product-filter.dto';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Get all product' })
  @Get()
  async getAll(@Query() filter: ProductFilterDto) {
    try {
      const data = await this.productService.getAll(filter);
      return responseSuccess(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Get product by id' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const data = await this.productService.getById(id);
      return responseSuccess(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Create product' })
  @Auth()
  @Post()
  async create(@Body() product: ProductDto, @User('id') userId: string) {
    try {
      const data = await this.productService.create(product, userId);
      return responseSuccess(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Update product by id' })
  @Auth()
  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() product: ProductDto,
    @User('id') userId: string,
    @User('role') role: ROLE,
  ) {
    try {
      const data = await this.productService.updateById(
        id,
        product,
        userId,
        role,
      );
      return responseSuccess(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Delete product by id' })
  @Auth()
  @Delete(':id')
  async deleteById(@Param('id') id: string, @User('id') userId: string) {
    try {
      const data = await this.productService.deleteById(id, userId);

      return responseSuccess(data);
    } catch (error) {
      console.log(error);
      return responseError(error.message);
    }
  }
}
