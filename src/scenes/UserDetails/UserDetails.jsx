import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  CircularProgress,
  Paper,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import EditUser from "./EditUser/EditUser";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [newUserData, setNewUserData] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${userId}`
        );
        const data = await response.json();

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [userId, newUserData]);

  if (!user) {
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
        User Details
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
          <strong>ID:</strong> {user.id}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>Name:</strong> {user.name}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>Username:</strong> {user.username}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>Location:</strong> {user.location}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>Access Level:</strong> {user.is_admin ? "Admin" : "User"}
        </Typography>
        <EditUser user={user} setNewUserData={setNewUserData} />
      </Box>
    </Box>
  );
};

export default UserDetails;
