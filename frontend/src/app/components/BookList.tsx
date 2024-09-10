import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Skeleton,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "../context/SnackbarContext";
import { Book } from "../types/book";
import ConfirmationModal from "./ConfirmationModal";
import { deleteBook } from "../services/apiService";

interface BookListProps {
  books: Book[];
  isLoading: boolean;
  onEdit: (book: Book) => void;
  onDelete: () => void;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const BookList: React.FC<BookListProps> = ({
  books,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { showSnackbar } = useSnackbar();

  const openConfirmationModal = (book: Book) => {
    setSelectedBook(book);
    setOpenModal(true);
  };

  const handleDelete = async () => {
    if (selectedBook) {
      try {
        await deleteBook(selectedBook._id!);
        showSnackbar("Book Deleted Successfully", "success");
        onDelete();
        closeConfirmationModal();
      } catch (error: any) {
        showSnackbar(error?.response?.data?.message, "error");
      }
    }
  };

  const closeConfirmationModal = () => {
    setSelectedBook(null);
    setOpenModal(false);
  };

  const skeletonRows = 5;

  const renderSkeletonRows = () =>
    Array.from({ length: skeletonRows }).map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton variant="rounded" height={20} />
        </TableCell>
        <TableCell>
          <Skeleton variant="rounded" height={20} />
        </TableCell>
        <TableCell>
          <Skeleton variant="rounded" height={20} />
        </TableCell>
      </TableRow>
    ));

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="center">Author</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? renderSkeletonRows()
              : books.map((book) => (
                  <TableRow key={book._id}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell align="center">{book.author}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => onEdit(book)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => openConfirmationModal(book)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            {!isLoading && books.length === 0 && (
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">No Data Available</TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationModal
        open={openModal}
        onClose={closeConfirmationModal}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the book titled "${selectedBook?.title}"?`}
      />
    </div>
  );
};

export default BookList;
