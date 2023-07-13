import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  useTheme,
  Button,
  Card,
  CardContent,
  TextField,
  Backdrop,
} from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { string, ref } from "yup";
import { useNavigate } from "react-router-dom";
import { updateAllBooks } from "../../data/api_handlers";

const EditBook = (props) => {
  const { isbn } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const book = props.book;
  const setNewBookData = props.setNewBookData;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const initialValues = {
    isbn: book.isbn,
    title: book.title,
    Author: book.author,
    artist: book.artist,
    illustrator: book.illustrator,
    genre: book.genre,
    publisher: book.publisher,
    yearPublished: book.yearPublished,
    booktype: book.booktype,
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const bookInfo = {
      isbn: values.isbn,
      title: values.title,
      Author: values.author,
      artist: values.artist,
      illustrator: values.illustrator,
      genre: values.genre,
      publisher: values.publisher,
      yearPublished: values.yearPublished,
      booktype: values.booktype,
    };
    try {
      const result = await updateAllBooks(book.isbn, bookInfo);
      const data = await result.json();

      setNewBookData(bookInfo);

      setOpen(false);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} color="secondary" variant="contained">
        <Typography color={colors.grey[100]}>Edit Book</Typography>
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
            >
              {({
                values,

                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Isbn"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.isbn}
                      name="isbn"
                      sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Title"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.title}
                      name="title"
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Author"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.author}
                      name="author"
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Illustrator"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.illustrator}
                      name="illustrator"
                      sx={{ gridColumn: "span 4" }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Genre"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.genre}
                      name="genre"
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Publisher"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.publisher}
                      name="publisher"
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Year Published"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.yearPublished}
                      name="yearPublished"
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Book Type"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.booktype}
                      name="bookType"
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button
                      onClick={handleClose}
                      color="secondary"
                      variant="contained"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" color="secondary" variant="contained">
                      Save
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Backdrop>
    </div>
  );
};

const checkoutSchema = yup.object().shape({
  isbn: yup.string(),
  title: yup.string(),
  author: yup.string(),
  genre: yup.string(),
  publisher: yup.string(),
  yearPublished: yup.string(),
  bookCover: yup.string(),
  bookType: yup.string(),
});

export default EditBook;
