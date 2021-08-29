import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTodoList } from "./todoAPI";

const initialState = {
  list: [],
  pagination: { page: 1, limit: 10, totalPage: 1 },
};
export const fetchFunction = createAsyncThunk(
  "ActionGroup/API.method",
  async (params) => {
    return fetchTodoList(params);
  }
);
export const Slice = createSlice({
  name: "ActionGroup",
  initialState: initialState,
  reducers: {
    reducerName: (state, { type, payload }) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFunction.fulfilled, (state, action) => {
      state.list = [...action.payload.data];
      state.pagination = { ...action.payload.pagination };
    });
  },
});

export const { reducerName } = Slice.actions;
export default Slice.reducer;
