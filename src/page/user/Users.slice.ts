import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';

export interface TableState {
  data: User[];
  currentPage: number;
  pageSize: number;
  querySearch: string;
}

const initialState: TableState = {
  data: [],
  currentPage: 1,
  pageSize: 20,
  querySearch: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, { payload: data }: PayloadAction<User[]>) => {
      state.data = data;
    },
    setCurrentPage: (state, { payload: currentPage }: PayloadAction<number>) => {
      state.currentPage = currentPage;
    },
    setPageSize: (state, { payload: pageSize }: PayloadAction<number>) => {
      state.pageSize = pageSize;
    },
    setQuerySearch: (state, { payload: querySearch }: PayloadAction<string>) => {
      state.querySearch = querySearch;
    },
  },
});

export const { setUsers, setCurrentPage, setPageSize, setQuerySearch } = usersSlice.actions;

export default usersSlice.reducer;