import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel(createBookDto);
    return newBook.save();
  }

  async update(id: string, updateBookDto: CreateBookDto): Promise<Book> {
    const book = await this.bookModel.findById(id);

    // If no book found, throw an error
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not exist`);
    }

    return this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);

    // If no book found, throw an error id not found
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not exist`);
    }

    // Delete the book
    return this.bookModel.findByIdAndDelete(id).exec();
  }
}
