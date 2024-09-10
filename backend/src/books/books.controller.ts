import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ValidateObjectIdPipe } from './pipes/validate-object-id.pipe';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll() {
    return this.booksService.findAll();
  }

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    if (!createBookDto.title || !createBookDto.author) {
      throw new BadRequestException('Title and author are required');
    }
    return this.booksService.create(createBookDto);
  }

  @Put(':id')
  async update(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateBookDto: CreateBookDto,
  ) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async delete(@Param('id', ValidateObjectIdPipe) id: string) {
    return this.booksService.delete(id);
  }
}
