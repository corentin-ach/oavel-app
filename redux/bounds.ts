import { createSlice } from '@reduxjs/toolkit';

export interface SpotState {
  ne: Array<number>;
  sw: Array<number>;
}

const initialState: SpotState = {
  ne: [0, 0],
  sw: [0, 0],
};

export const computeBounds = createSlice({
  name: 'bounds',
  initialState,
  reducers: {
    setBounds: (state, marker) => {
      state.ne = marker.payload.ne;
      state.sw = marker.payload.sw;
    },
  },
});

export const { setBounds } = computeBounds.actions;

export default computeBounds.reducer;
