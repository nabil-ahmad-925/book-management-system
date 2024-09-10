// services/api.ts
import axios from "axios";
import { Book } from "../types/book";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const getBooks = async (): Promise<Book[]> => {
  const response = await axios.get<Book[]>(`${API_BASE_URL}/books`);
  return response.data;
};

export const addBook = async (newBook: Book): Promise<Book> => {
  const response = await axios.post<Book>(`${API_BASE_URL}/books`, newBook);
  return response.data;
};

export const updateBook = async (
  id: string,
  updatedBook: Book
): Promise<Book> => {
  const response = await axios.put<Book>(
    `${API_BASE_URL}/books/${id}`,
    updatedBook
  );
  return response.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/books/${id}`);
};
