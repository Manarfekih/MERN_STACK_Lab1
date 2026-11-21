import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  visible: false
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload;
      state.visible = true;
    },
    hideToast: (state) => {
      state.message = '';
      state.visible = false;
    }
  }
});

export const { showToast, hideToast } = uiSlice.actions;

export default uiSlice.reducer;