import {
  Controller,
  Post,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SharedlistsService } from './sharedlists.service';
import { Sharedlist } from './sharedlist.entity';
import { CreateSharedlistDTO } from './dto/create-sharedlist.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('sharedlists')
export class SharedlistsController {
  constructor(private readonly sharedlistsService: SharedlistsService) {}

  @Get(':sharedlistId')
  async show(@Param('sharedlistId') sharedlistId: string): Promise<Sharedlist> {
    return await this.sharedlistsService.searchSharedlist(sharedlistId);
  }

  @Post()
  async create(
    @Body() createSharedlistDTO: CreateSharedlistDTO,
  ): Promise<Sharedlist> {
    return await this.sharedlistsService.createSharedlist(createSharedlistDTO);
  }

  @Delete(':sharedlistId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('sharedlistId') sharedlistId: string): Promise<void> {
    await this.sharedlistsService.deleteSharedlist(sharedlistId);
  }
}
