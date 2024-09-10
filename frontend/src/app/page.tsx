"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  useTheme,
  Box,
  useMediaQuery,
} from "@mui/material";
import { SnackbarProvider } from "./context/SnackbarContext";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import { Book } from "./types/book";
import { getBooks } from "./services/apiService";

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isFormOpen, setFormOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  const onBookFormClose = (isReadData = false) => {
    setFormOpen(false);
    setEditingBook(null);
    if (isReadData) {
      fetchBooks();
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowercasedSearchTerm) ||
        book.author.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <SnackbarProvider>
      <Container>
        <Typography className="text-center" variant="h4" gutterBottom>
          Book Management System
        </Typography>
        <Typography variant="h5" gutterBottom>
          Book List
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={isMobile ? "column" : "row"}
          mb={2}
        >
          <TextField
            label="Search by Title or Author Name"
            variant="outlined"
            value={searchTerm}
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 300 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setEditingBook(null);
              setFormOpen(true);
            }}
            sx={{ mt: isMobile ? 2 : 0 }}
            disableElevation
          >
            Add New Book
          </Button>
        </Box>

        <BookList
          books={filteredBooks}
          isLoading={isLoading}
          onEdit={(book) => {
            setEditingBook(book);
            setFormOpen(true);
          }}
          onDelete={() => fetchBooks()}
        />

        {isFormOpen && (
          <BookForm
            book={editingBook || undefined}
            onClose={(isReadData: boolean) => {
              onBookFormClose(isReadData);
            }}
          />
        )}
      </Container>
    </SnackbarProvider>
  );
};

export default HomePage;
