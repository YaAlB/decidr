import React, { useState, useEffect } from "react";
import { Box, TextField, SxProps, CircularProgress, InputAdornment } from "@mui/material";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Clear the previous timeout
    if (debounceTimeout) clearTimeout(debounceTimeout);

    // Show loading spinner
    setIsLoading(true);

    // Set a new debounce timeout
    const timeout = window.setTimeout(() => {
      onSearch(query);
      setIsLoading(false);
    }, 1000);

    setDebounceTimeout(timeout);
  };

  // Cleanup the timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, [debounceTimeout]);

  return (
      <TextField
        label="Search"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search..."
        fullWidth
        variant="outlined"
        slotProps={{
          input: {
            endAdornment: isLoading ? (
              <InputAdornment position="end">
                <CircularProgress size={20} />
              </InputAdornment>
            ) : null,
          },
        }}
      />
  );
};

export default SearchBar;
