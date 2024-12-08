import React, { useState, DragEvent } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

const FileUploadModal: React.FC<{ onClose: () => void; onUpload: (file: File) => void }> = ({
  onClose,
  onUpload,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  // Drag-and-Drop Handlers
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      setFile(null);
      onClose();
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Upload File
        </Typography>
        <Box
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            border: dragging ? '2px dashed #007bff' : '2px dashed #ccc',
            borderRadius: 2,
            padding: 4,
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: dragging ? '#f0f8ff' : 'transparent',
          }}
        >
          <Typography>
            {file ? `Selected File: ${file.name}` : 'Drag and drop a file here, or click to select'}
          </Typography>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input">
            <Button variant="outlined" component="span" sx={{ mt: 2 }}>
              Select File
            </Button>
          </label>
        </Box>
        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUpload} disabled={!file}>
            Upload
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FileUploadModal;
