import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  CircularProgress,
  Paper,
  useTheme,
  Button,
  Card,
  CardContent,
  TextField,
  MenuItem,
  FormControlLabel,
  Backdrop,
  useScrollTrigger,
  Select,
} from "@mui/material";
import { tokens } from "../../../theme";
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { string, ref } from "yup";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../../data/api_handlers";

const EditUser = (props) => {
  const { userId } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = props.user;
  const setNewUserData = props.setNewUserData;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const initialValues = {
    name: user.name,
    email: user.email,
    userName: user.username,
    location: user.location,
    // password: user.password,
    // confirmPassword: "",
    is_admin: user.is_admin,
  };

  const selectOptions = [
    { id: false, text: "No" },
    { id: true, text: "Yes" },
  ];
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const userInfo = {
      username: values.userName,
      // password: values.password,
      email: values.email,
      name: values.name,
      is_admin: values.is_admin,
    };
    try {
      const result = await updateUser(user.id, userInfo);

      setNewUserData(userInfo);
      // navigate("/UserDetails");
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} color="secondary" variant="contained">
        <Typography color={colors.grey[100]}>Edit User</Typography>
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
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.userName}
                      name="userName"
                      error={!!touched.userName && !!errors.userName}
                      helperText={touched.userName && errors.userName}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Location"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.location}
                      name="location"
                      error={!!touched.location && !!errors.location}
                      helperText={touched.location && errors.location}
                      sx={{ gridColumn: "span 4" }}
                    />
                    {/* <TextField
                      fullWidth
                      variant="filled"
                      type="password"
                      label="Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      sx={{ gridColumn: "span 4" }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="password"
                      label="Confirm Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.confirmPassword}
                      name="confirmPassword"
                      error={
                        !!touched.confirmPassword && !!errors.confirmPassword
                      }
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      sx={{ gridColumn: "span 4" }}
                    /> */}
                    <FormControlLabel
                      control={
                        <Field
                          component={Select}
                          placeholder="Select One"
                          type="checkbox"
                          value={
                            selectOptions.find(
                              ({ id }) => id === values.is_admin
                            ).text
                          }
                          name="is_admin"
                          onChange={(e) => {
                            if (e.target.value) {
                              const { id } = selectOptions.find(
                                ({ text }) => text === e.target.value
                              );
                              setFieldValue("is_admin", id);
                              console.log(values.is_admin);
                            }
                          }}
                        >
                          {selectOptions.map(({ text }) => (
                            <MenuItem key={text} value={text}>
                              {text}
                            </MenuItem>
                          ))}
                        </Field>
                      }
                      label="is Admin?"
                      labelPlacement="top"
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

const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};

const checkoutSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email("invalid email"),
  password: string()
    // check minimum characters
    .min(8, "Password must have at least 8 characters")
    // different error messages for different requirements
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  confirmPassword: string()
    // use oneOf to match one of the values inside the array.
    // use "ref" to get the value of passwrod.
    .oneOf([ref("password")], "Passwords does not match"),
});

export default EditUser;
