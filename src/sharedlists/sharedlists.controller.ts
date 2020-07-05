import {
  Controller,
  Post,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';
import { SharedlistsService } from './sharedlists.service';
import { Sharedlist } from './sharedlist.entity';
import { CreateSharedlistDTO } from './dto/create-sharedlist.dto';
import { UsersService } from 'src/users/users.service';

export interface ShowResponse {
  statusCode: number;
  sharedlist: Sharedlist;
}

export interface CreateResponse {
  statusCode: number;
  sharedlist: Sharedlist;
}

@Controller('sharedlists')
export class SharedlistsController {
  constructor(
    private readonly sharedlistsService: SharedlistsService,
    private readonly usersService: UsersService,
  ) {}

  @Get(':sharedlistId')
  async show(
    @Param('sharedlistId') sharedlistId: string,
  ): Promise<ShowResponse> {
    const sharedlist = await this.sharedlistsService.searchSharedlist(
      sharedlistId,
    );
    return { statusCode: HttpStatus.OK, sharedlist };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createSharedlistDTO: CreateSharedlistDTO,
  ): Promise<CreateResponse> {
    const { name, creatorId } = createSharedlistDTO;

    const creator = await this.usersService.findById(creatorId);
    if (!creator) {
      throw new HttpException(
        'Cannot create a shared list related to the creator id',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const sharedlist = await this.sharedlistsService.createSharedlist({
      name,
      creator,
    });
    return { statusCode: HttpStatus.CREATED, sharedlist };
  }

  @Delete(':sharedlistId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('sharedlistId') sharedlistId: string): Promise<void> {
    await this.sharedlistsService.deleteSharedlist(sharedlistId);
  }
}
