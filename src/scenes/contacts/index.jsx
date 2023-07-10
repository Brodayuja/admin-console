import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "isbn",
      headerName: "ISBN",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "title",
      headerName: "Title",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "author",
      headerName: "Author",
      flex: 1,
    },
    {
      field: "artist",
      headerName: "Artist",
      flex: 1,
    },
    {
      field: "illustrator",
      headerName: "Illustrator",
      flIx: 1,
    },
    {
      field: "genre",
      headerName: "Genre",
      flex: 1,
    },
    {
      field: "publisher",
      headerName: "Publisher",
      flex: 1,
    },
    {
      field: "yearPublished",
      headerName: "Year Published",
      flex: 1,
    },
    {
      field: "booktype",
      headerName: "Book Type",
      flex: 1,
    },
  ];

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/allbooks");

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <Box m="20px">
      <Header title="Books" subtitle="List of all books" />
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
          rows={books}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
