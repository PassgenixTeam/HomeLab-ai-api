import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseInterceptors,
  Param,
  Body,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiPayloadTooLargeResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DetailDrawingService } from 'src/apis/detail-drawing/detail-drawing.service';
import {
  responseError,
  responseSuccess,
  responseSuccessWithData,
} from '../../base/base.controller';
import { Auth } from '../../core/decorators/auth.decorator';
import { User } from '../../core/decorators/user.decorator';
import { DetailDrawingDto } from './dto/detail-drawing.dto';

@ApiTags('detail-drawings')
@Controller('detail-drawings')
export class DetailDrawingController {
  constructor(private readonly detailDrawingService: DetailDrawingService) {}

  @ApiOperation({ summary: 'Get all drawing' })
  @Auth()
  @Get()
  async getAll(@User('id') userId: string) {
    try {
      const data = await this.detailDrawingService.getAllByUser(userId);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Get a drawing by id' })
  @Auth()
  @Get(':id')
  async getById(@Param('id') id: string, @User('id') userId: string) {
    try {
      const data = await this.detailDrawingService.getById(id, userId);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Create a drawing' })
  @Auth()
  @Post()
  async create(@Body() body: DetailDrawingDto, @User('id') userId: string) {
    try {
      const data = await this.detailDrawingService.create(body, userId);
      return responseSuccessWithData(data);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Update a drawing' })
  @Auth()
  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() data: DetailDrawingDto,
    @User('id') userId: string,
  ) {
    try {
      await this.detailDrawingService.updateById(id, data, userId);
      return responseSuccess('Update drawing success');
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Delete a drawing' })
  @Auth()
  @Delete(':id')
  async deleteById(@Param('id') id: string, @User('id') userId: string) {
    try {
      await this.detailDrawingService.deleteById(id, userId);
      return responseSuccess('Delete drawing success');
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }
}