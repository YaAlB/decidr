import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const uploadFileAPI = async (file: File) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/upload`, file, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'x-filename': file.name,
      },
    });
    console.log('response', response);
    return response.data;
  } catch (error: any) {
    console.error('Error uploading file:', error.response?.data || error.message);
    throw error;
  }
};


export const fetchPeopleAPI = async (
  page: number,
  limit: number,
  search = '',
  sortBy = 'first_name',
  order: 'asc' | 'desc' = 'asc'
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/people`, {
      params: {
        page,
        limit,
        search,
        sortBy,
        order,
      },
    });
    console.log('Fetch people response:', response.data);
    return response;
  } catch (error: any) {
    console.error('Error fetching people:', error.response?.data || error.message);
    throw error;
  }
};

