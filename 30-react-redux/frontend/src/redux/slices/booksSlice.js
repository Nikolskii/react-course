import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithId from '../../utils/createBookWithId';
import { setError } from './errorSlice';

const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      // Option 1
      return thunkAPI.rejectWithValue(error);
      // Option 2
      // throw error;
    }
  },
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books = [...state.books, action.payload];
      // state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
      // return {
      //   ...state,
      //   books: state.books.filter((book) => book.id !== action.payload),
      // };
    },
    toggleFavorite: (state, action) => {
      state.books = state.books.map((book) =>
        book.id === action.payload
          ? { ...book, isFavorite: !book.isFavorite }
          : book,
      );
      // state.books.forEach((book) => {
      //   if (book.id === action.payload) {
      //     book.isFavorite = !book.isFavorite;
      //   }
      // });
    },
  },
  // Option 1
  extraReducers: {
    [fetchBook.pending]: (state) => {
      state.isLoadingViaAPI = true;
    },
    [fetchBook.fulfilled]: (state, action) => {
      state.isLoadingViaAPI = false;
      if (action?.payload?.title && action?.payload?.author) {
        state.books = [...state.books, createBookWithId(action.payload, 'API')];
      }
    },
    [fetchBook.rejected]: (state) => {
      state.isLoadingViaAPI = false;
    },
  },
  // Option 2
  // extraReducers: (builder) => {
  //   builder.addCase(fetchBook.pending, (state) => {
  //     state.isLoadingViaAPI = true;
  //   });
  //   builder.addCase(fetchBook.fulfilled, (state, action) => {
  //     state.isLoadingViaAPI = false;
  //     if (action.payload.title && action.payload.author) {
  //       state.books.push(createBookWithId(action.payload, 'API'));
  //     }
  //   });
  //   builder.addCase(fetchBook.rejected, (state) => {
  //     state.isLoadingViaAPI = false;
  //   });
  // },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;

export default booksSlice.reducer;