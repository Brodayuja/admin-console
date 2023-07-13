import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, CircularProgress, useTheme } from "@mui/material";
import { tokens } from "../../src/theme";
import EditBook from "./EditBook/EditBook";
import {
  fetchAllBooksTable,
  fetchFromAllBooksByIsbn,
} from "../data/api_handlers";

const BookDetails = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [newBookData, setNewBookData] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetchFromAllBooksByIsbn(isbn);
        console.log(book);
        setBook(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBook();
  }, [isbn, newBookData]);

  if (!book) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      width="60%"
      height="40%"
      m="0 auto"
      px="5px"
      pt="10px"
      display="flex"
      justifyContent="center"
      flexDirection={"column"}
      backgroundColor={colors.primary[400]}
      borderRadius="4px"
    >
      <Typography
        variant="h4"
        width="60%"
        m="0 auto"
        p="5px"
        display="flex"
        justifyContent="center"
      >
        Book Details
      </Typography>
      <Box
        width="60%"
        m="0 auto"
        p="5px"
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        gap={"10px"}
      >
        <Typography color={colors.grey[100]}>
          <strong>ID:</strong> {book.id}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>ISBN:</strong> {book.isbn}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>Title:</strong> {book.title}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>Author:</strong> {book.author}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>Illustrator:</strong> {book.illustrator}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>Artist:</strong> {book.artist}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>Genre:</strong> {book.genre}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>Publisher:</strong> {book.publisher}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>Year Published:</strong> {book.yearPublished}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>Book Type:</strong> {book.booktype}
        </Typography>
        <EditBook book={book} setNewBookData={setNewBookData} />
      </Box>
    </Box>
  );
};

export default BookDetails;
