import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
  name: "file",
  initialState: {
    fileName: "",
    fileType: "",
  },

  reducers: {
    setFileName: (state, action) => {
      state.fileName = action.payload;
    },
    setFileType: (state, action) => {
      state.fileType = action.payload;
    },
    clearFile: (state) => {
      state.fileName = "";
      state.fileType = "";
    },
  },
});

export const { setFileName, setFileType, clearFile } = fileSlice.actions;
export default fileSlice.reducer;
