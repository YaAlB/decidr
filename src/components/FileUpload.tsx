import React, { useState } from 'react';
import { uploadFileAPI } from '../services/api';
import { Button, Input, Box, Typography } from '@mui/material';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('No file selected');
      return;
    }

    try {
      setUploadStatus('Uploading...');
      const response = await uploadFileAPI(file);
      console.log('Upload Response:', response);
      setUploadStatus('File uploaded successfully');
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('Upload failed');
    }
  };

  return (
    <Box sx={{ textAlign: 'center', marginBottom: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Upload a File
      </Typography>
      <Input type="file" onChange={handleFileChange} />
      <Button
        onClick={handleUpload}
        variant="contained"
        sx={{ marginLeft: '16px', marginTop: '8px' }}
      >
        Upload
      </Button>
      {uploadStatus && <Typography variant="body2">{uploadStatus}</Typography>}
    </Box>
  );
};

export default FileUpload;
