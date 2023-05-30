/* eslint-disable unicorn/no-null */
import { createSlice } from '@reduxjs/toolkit';

type Quality = {
  date: string | null;
  water: number;
  plastic: number;
  risk: number;
  observation: string;
};

type Info = {
  rocks: boolean;
  algues: boolean;
  river: boolean;
  waves: boolean;
};

export type SpotState = {
  id: string | null;
  name: string;
  coords: Array<number>;
  status: boolean;
  quality: Quality;
  info: Info;
};

const initialState: SpotState = {
  id: null,
  name: 'Newy Beach',
  coords: [0, 0],
  status: false,
  quality: {
    date: '',
    water: 0,
    plastic: 0,
    risk: 0,
    observation: '',
  },
  info: {
    rocks: false,
    algues: false,
    river: false,
    waves: false,
  },
};

export const showSpotSlice = createSlice({
  name: 'spot',
  initialState,
  reducers: {
    setSpot: (state, marker) => {
      state.id = marker.payload.id;
      state.name = marker.payload.name;
      state.coords = marker.payload.coords;
      state.status = marker.payload.status;
      state.quality = marker.payload.quality;
      state.info = marker.payload.info;
    },
  },
});

export const { setSpot } = showSpotSlice.actions;

export default showSpotSlice.reducer;
