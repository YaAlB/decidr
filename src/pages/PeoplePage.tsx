import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeople, setSearchQuery } from "../redux/peopleSlice";
import SearchBar from "../components/SearchBar";
import DataTable from "../components/Table";
import Pagination from "../components/Pagination";
import FileUploadModal from "../components/FileUploadModal";
import { AppDispatch, RootState } from "../redux/store";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { uploadFileAPI } from "../services/api";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";

const PeoplePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredPeople, total, status, error } = useSelector(
    (state: RootState) => state.people
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("first_name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  // Fetch data when component mounts or pagination/sorting changes
  useEffect(() => {
    dispatch(
      fetchPeople({
        page: page + 1,
        limit: rowsPerPage,
        search: "",
        sortBy,
        order,
      })
    );
  }, [dispatch, page, rowsPerPage, sortBy, order]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
    dispatch(
      fetchPeople({
        page: 1,
        limit: rowsPerPage,
        search: query,
        sortBy,
        order,
      })
    );
    setPage(0);
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpload = async (file: File) => {
    try {
      await uploadFileAPI(file);
      dispatch(
        fetchPeople({
          page: page + 1,
          limit: rowsPerPage,
          search: "",
          sortBy,
          order,
        })
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleSort = (column: string) => {
    const newOrder = sortBy === column && order === "asc" ? "desc" : "asc";
    setSortBy(column);
    setOrder(newOrder);
  };

  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "16px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          gap: "16px",
        }}
      >
        <SearchBar onSearch={handleSearch} />
        <Button
          variant="contained"
          onClick={() => setIsModalOpen(true)}
          sx={{
            height: "52px",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <UploadFileOutlinedIcon /> Upload File
        </Button>
      </Box>

      {status === "loading" ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginY: "16px" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {filteredPeople.length === 0 ? (
            <Typography
              variant="body1"
              align="center"
              sx={{ marginY: "16px", color: "gray" }}
            >
              No data available. Try uploading a file or adjusting your search.
            </Typography>
          ) : (
            <DataTable
              people={filteredPeople}
              onSort={handleSort}
              sortBy={sortBy}
              order={order}
            />
          )}
          <Pagination
            count={total}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </>
      )}
      {isModalOpen && (
        <FileUploadModal
          onClose={() => setIsModalOpen(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
};

export default PeoplePage;
