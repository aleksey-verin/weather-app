import { storage, storageGetItem } from '../../utils/storage';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from '../store';

interface initialStateTypes {
  favoriteCities: string[];
}

const initialState = storageGetItem(storage.weatherFavoriteList) ?? {
  favoriteCities: []
};

export const favoriteCitiesSlice = createSlice({
  name: 'favoriteCitiesSlice',
  initialState: initialState as initialStateTypes,
  reducers: {
    addToFavoriteCities: (state, { payload }: PayloadAction<string>) => {
      state.favoriteCities.push(payload);
    },
    deleteFromFavoriteCities: (state, { payload }: PayloadAction<string>) => {
      state.favoriteCities = state.favoriteCities.filter((item: string) => item !== payload);
    },
    clearAllFavoriteCities: (state) => {
      state.favoriteCities = initialState.favoriteCities;
    }
  }
});

export const selectorFavoriteCities = (state: IRootState) => state.favoriteCitiesSlice;

export const { addToFavoriteCities, deleteFromFavoriteCities, clearAllFavoriteCities } =
  favoriteCitiesSlice.actions;

export default favoriteCitiesSlice.reducer;
