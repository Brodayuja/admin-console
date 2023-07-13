import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { string, ref } from "yup";
import { useNavigate } from "react-router-dom";
import { postToAllBooks } from "../../data/api_handlers";

const initialValues = {
  isbn: "",
  title: "",
  author: "",
  artist: "",
  illustrator: "",
  genre: "",
  summary: "",
  publisher: "",
  yearPublished: "",
  bookCover: "",
  audience: "",
  physicalDescription: "",
  booktype: "",
};

const AddBookForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await postToAllBooks(
        values.isbn,
        values.title,
        values.author,
        values.artist,
        values.illustrator,
        values.genre,
        values.summary,
        values.publisher,
        values.yearPublished,
        values.bookCover,
        values.audience,
        values.physicalDescription,
        values.bookType
      );

      console.log(result);
      navigate("/invoices");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="ADD BOOK" subtitle="Add a new book to database" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="ISBN"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.isbn}
                name="isbn"
                error={!!touched.isbn && !!errors.isbn}
                helperText={touched.isbn && errors.isbn}
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
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
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
                error={!!touched.author && !!errors.author}
                helperText={touched.author && errors.author}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Artist"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.artist}
                name="artist"
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
                error={!!touched.genre && !!errors.genre}
                helperText={touched.genre && errors.genre}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Summary"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.summary}
                name="summary"
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
                error={!!touched.publisher && !!errors.publisher}
                helperText={touched.publisher && errors.publisher}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Year Published"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.yearPublished}
                name="yearPublished"
                error={!!touched.yearPublished && !!errors.yearPublished}
                helperText={touched.yearPublished && errors.yearPublished}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Book Cover"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.bookCover}
                name="bookCover"
                error={!!touched.bookCover && !!errors.bookCover}
                helperText={touched.bookCover && errors.bookCover}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Audience"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.audience}
                name="audience"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Physical Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.physicalDescription}
                name="physicalDescription"
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Book Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.bookType}
                name="bookType"
                error={!!touched.bookType && !!errors.bookType}
                helperText={touched.bookType && errors.bookType}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Book
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  isbn: yup.string().required("required"),
  title: yup.string().required("required"),
  author: yup.string().required("required"),
  genre: yup.string().required("required"),
  publisher: yup.string().required("required"),
  yearPublished: yup.string().required("required"),
  bookCover: yup.string().required("required"),
  bookType: yup.string().required("required"),
});

export default AddBookForm;
