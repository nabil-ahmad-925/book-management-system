import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './schemas/book.schema';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Create Book Test
  describe('create', () => {
    it('should create a new book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        author: 'Test Author',
      };
      const result: Book = { ...createBookDto };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createBookDto)).toEqual(result);
    });
  });

  // Get All Books Test
  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result: Book[] = [{ title: 'Test Book', author: 'Test Author' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
    });
  });

  // Update Book Test
  describe('update', () => {
    it('should update a book by ID', async () => {
      const updateBookDto: CreateBookDto = {
        title: 'Updated Title',
        author: 'Updated Author',
      };
      const result: Book = { ...updateBookDto };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('1', updateBookDto)).toEqual(result);
    });
  });

  // Delete Book Test
  describe('delete', () => {
    it('should delete a book by ID', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(undefined);

      expect(await controller.delete('1')).toBeUndefined();
    });
  });
});
