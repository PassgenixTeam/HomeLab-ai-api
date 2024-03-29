import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiPayloadTooLargeResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectService } from 'src/apis/project/project.service';
import { responseError, responseSuccess } from '../../base/base.controller';
import { Auth } from '../../core/decorators/auth.decorator';
import { User } from '../../core/decorators/user.decorator';
import { multerDiskOption } from '../../core/multer/multer.option';
import { ProjectDto } from './dto/project.dto';

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: 'Get all project' })
  @Auth()
  @Get()
  async getAll(@User('id') userId: string) {
    try {
      const data = await this.projectService.getAllByUser(userId);
      return responseSuccess(data);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Get a project by id' })
  @Auth()
  @Get(':id')
  async getById(@Param('id') id: string, @User('id') userId: string) {
    try {
      const data = await this.projectService.getById(id, userId);
      return responseSuccess(data);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Create a project' })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'boundaryImg', maxCount: 1 },
        { name: 'crossSectionImg', maxCount: 1 },
      ],
      multerDiskOption,
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        star: { type: 'number' },
        oldPrice: { type: 'number' },
        price: { type: 'number' },
        sale: { type: 'number' },
        description: { type: 'string' },
        boundaryImg: {
          type: 'string',
          format: 'binary',
        },
        crossSectionImg: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiPayloadTooLargeResponse({
    description: 'The upload files size is greater than 10 MB',
  })
  @Auth()
  @Post()
  async create(@Body() body: ProjectDto, @User('id') userId: string) {
    try {
      const data = await this.projectService.create(body, userId);
      return responseSuccess(data);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Update a project' })
  @Auth()
  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() data: ProjectDto,
    @User('id') userId: string,
  ) {
    try {
      await this.projectService.updateById(id, data, userId);
      return responseSuccess('Update project success');
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }

  @ApiOperation({ summary: 'Delete a project' })
  @Auth()
  @Delete(':id')
  async deleteById(@Param('id') id: string, @User('id') userId: string) {
    try {
      await this.projectService.deleteById(id, userId);
      return responseSuccess('Delete project success');
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }
}
