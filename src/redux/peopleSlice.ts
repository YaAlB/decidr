import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchPeopleAPI } from '../services/api';
import { Person } from '../types/Person';

// Define the state type
interface PeopleState {
  people: Person[];
  total: number;
  filteredPeople: Person[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PeopleState = {
  people: [],
  total: 0,
  filteredPeople: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch people
export const fetchPeople = createAsyncThunk(
  'people/fetchPeople',
  async ({
    page,
    limit,
    search,
    sortBy,
    order,
  }: {
    page: number;
    limit: number;
    search: string;
    sortBy: string;
    order: 'asc' | 'desc';
  }) => {
    const response = await fetchPeopleAPI(page, limit, search, sortBy, order);
    return response.data;
  }
);

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.filteredPeople = state.people.filter((person) =>
        Object.values(person).some((value) =>
          value?.toString().toLowerCase().includes(action.payload.toLowerCase())
        )
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchPeople.fulfilled,
        (state, action: PayloadAction<{ total: number; people: Person[] }>) => {
          state.status = 'succeeded';
          state.total = action.payload.total;
          state.people = action.payload.people;
          state.filteredPeople = action.payload.people;
        }
      )
      .addCase(fetchPeople.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch people';
      });
  },
});

export const { setSearchQuery } = peopleSlice.actions;
export default peopleSlice.reducer;
