import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => {
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    },
  },
});

export const {addFeed,removeFeed}=feedSlice.actions;
export default feedSlice.reducer;