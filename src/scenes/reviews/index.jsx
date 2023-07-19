import { Button, Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../data/api_handlers";

const Reviews = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "score",
      headerName: "Score",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "user_id",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "nfBook_isbn",
      headerName: "Non-Fiction ISBN",
      flex: 1,
    },
    {
      field: "fictionBook_isbn",
      headerName: "Fiction Book ISBN",
      flex: 1,
    },
    {
      field: "graphicBook_isbn",
      headerName: "Graphic Book ISBN",
      flex: 1,
    },
    {
      field: "bookClubBook_isbn",
      headerName: "Book Club ISBN",
      flex: 1,
    },
    {
      field: "childrensBook_isbn",
      headerName: "Children's Book ISBN",
      flex: 1,
    },
    {
      field: "isInappropriate",
      headerName: "Reported Inappropriate",
      flex: 1,
    },
    {
      field: "isNotAccurate",
      headerName: "Reported Not Accurate",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Created",
      flex: 1,
    },
  ];

  const [reviews, setReviews] = useState([]);
  const [selectedReviews, setSelectedReviews] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/reviews`);

        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, []);

  async function handleUserClick(review) {
    // Navigate to the UserDetails page with the selected user's ID
    navigate(`/reviews/review/${review.id}`);
  }

  async function handleDelete() {
    // You can access the selected user IDs from the `selectedUsers` state
    console.log(
      "Selected Review IDs:",
      selectedReviews.map((review) => review.id)
    );
    try {
      for (const review of selectedReviews) {
        const response = await fetch(`${BASE_URL}/reviews/${review.id}`, {
          method: "DELETE",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box m="20px">
      <Header title="Reviews" subtitle="List of all reviews" />
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
          rows={reviews}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onSelectionModelChange={(newSelection) => {
            const selectedReviews = newSelection.map((id) =>
              reviews.find((review) => review.id === id)
            );
            setSelectedReviews(selectedReviews);
          }}
          onRowClick={(params) => handleUserClick(params.row)}
        />

        <Button onClick={handleDelete} color="secondary" variant="contained">
          Delete Selected
        </Button>
      </Box>
    </Box>
  );
};

export default Reviews;
