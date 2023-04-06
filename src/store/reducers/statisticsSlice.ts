import { createSlice } from '@reduxjs/toolkit';
import { storage, storageGetItem } from '../../utils/storage';
import { countDataForTopOneCity, findTopOneCity } from '../../utils/helpers';
import { IDataForStatistics } from '../../types/otherTypes';
import { IRootState } from '../store';

interface initialStateTypes {
  requestCounter: number;
  dataForTopOneCity: IDataForStatistics[];
  topOneCity: IDataForStatistics | undefined;
}

const initialState = storageGetItem(storage.weatherStats) ?? {
  requestCounter: 0,
  dataForTopOneCity: [],
  topOneCity: {}
};

export const statisticsSlice = createSlice({
  name: 'statisticsSlice',
  initialState: initialState as initialStateTypes,
  reducers: {
    addDataForRequestCounter: (state) => {
      state.requestCounter = state.requestCounter + 1;
    },
    addDataForTopOneCity: (state, action) => {
      state.dataForTopOneCity = countDataForTopOneCity(state.dataForTopOneCity, action.payload);
      state.topOneCity = findTopOneCity(state.dataForTopOneCity);
    }
  }
});

export const selectorStatistics = (state: IRootState) => state.statisticsSlice;

export const { addDataForRequestCounter, addDataForTopOneCity } = statisticsSlice.actions;

export default statisticsSlice.reducer;
