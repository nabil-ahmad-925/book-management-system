import React, { useEffect } from "react";
import {
  Stack,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSnackbar } from "../context/SnackbarContext";
import { Book } from "../types/book";
import { addBook, updateBook } from "../services/apiService";

interface BookFormProps {
  book?: Book;
  onClose: (isReadData: boolean) => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BookForm: React.FC<BookFormProps> = ({ book, onClose }) => {
  const { showSnackbar } = useSnackbar();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required.").min(3).max(100),
    author: Yup.string().required("Author is required.").min(3).max(70),
  });

  const formik = useFormik({
    initialValues: {
      title: book?.title || "",
      author: book?.author || "",
    },
    validationSchema,
    onSubmit: async (values: Book) => {
      try {
        if (book) {
          await updateBook(book._id!, values);
          showSnackbar("Book Updated Successfully!", "success");
        } else {
          await addBook(values);
          showSnackbar("Book Added Successfully!", "success");
        }
        onClose(true);
      } catch (error: any) {
        showSnackbar(
          error?.response?.data?.message || "An error occurred",
          "error"
        );
      }
    },
  });

  useEffect(() => {
    if (book) {
      formik.setValues({ title: book.title, author: book.author });
    }
  }, [book]);

  return (
    <BootstrapDialog
      onClose={() => onClose(false)}
      aria-labelledby="customized-dialog-title"
      open
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {book ? "Edit Book" : "Add New Book"}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => onClose(false)}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Typography variant="body1" color="text.primary">
            {book
              ? "Update the details of the book"
              : "Enter the details of the new book"}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              name="title"
              label="Title"
              variant="outlined"
              value={formik.values.title}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              sx={{ width: 300 }}
            />
            <TextField
              name="author"
              label="Author"
              variant="outlined"
              value={formik.values.author}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.author && Boolean(formik.errors.author)}
              helperText={formik.touched.author && formik.errors.author}
              sx={{ width: 300, marginTop: 4 }}
            />
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
              >
                {book ? "Save" : "Add"}
              </Button>
              <Button onClick={() => onClose(false)} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Stack>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default BookForm;
