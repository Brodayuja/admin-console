import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useState, useEffect } from "react";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "username",
      headerName: "Username",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "is_admin",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { is_admin } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              is_admin ? colors.greenAccent[600] : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {is_admin
              ? <AdminPanelSettingsOutlinedIcon /> && "Admin"
              : <LockOpenOutlinedIcon /> && "User"}
            {/* <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {is_admin}
            </Typography> */}
          </Box>
        );
      },
    },
  ];

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  async function handleDelete() {
    // You can access the selected user IDs from the `selectedUsers` state
    console.log(
      "Selected User IDs:",
      selectedUsers.map((user) => user.id)
    );
    try {
      for (const user of selectedUsers) {
        const response = await fetch(
          `http://localhost:3000/api/users/${user.id}`,
          {
            method: "DELETE",
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box m="20px">
      <Header title="Users" subtitle="Managing Users" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onSelectionModelChange={(newSelection) => {
            const selectedUsers = newSelection.map((id) =>
              users.find((user) => user.id === id)
            );
            setSelectedUsers(selectedUsers);
          }}
        />
        <Button onClick={handleDelete} color="secondary" variant="contained">
          Delete Selected
        </Button>
      </Box>
    </Box>
  );
};

export default Team;
