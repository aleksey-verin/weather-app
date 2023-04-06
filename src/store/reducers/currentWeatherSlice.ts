import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { storage, storageGetItem } from '../../utils/storage';
import { ICurrentWeatherNormalized } from '../../types/weatherType';
import { transformWeather } from '../../utils/helpers';
import { AppDispatch, IRootState } from '../store';
import { createUrlWeather, urlWeatherTypes } from '../../utils/api-helpers';

interface initialStateTypes {
  currentWeather: ICurrentWeatherNormalized | null;
  currentCity: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState = {
  currentWeather: null,
  currentCity: (storageGetItem(storage.weatherCurrentCity) as string) ?? 'Псков',
  isLoading: false,
  isSuccess: false,
  isError: false
};

export const getCurrentWeather = createAsyncThunk<
  ICurrentWeatherNormalized, // return type
  string, // args type
  {
    dispatch: AppDispatch;
    state: IRootState; // thunkAPI type
  }
>('getCurrentWeather', async (cityName, thunkAPI) => {
  const urlWeather = createUrlWeather(cityName, urlWeatherTypes.currentWeather);
  try {
    const response = await fetch(urlWeather);
    if (response.ok) {
      const data = await response.json();
      return transformWeather(data);
    } else {
      const error = await response.json();
      return thunkAPI.rejectWithValue(error?.message);
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const currentWeatherSlice = createSlice({
  name: 'currentWeatherSlice',
  initialState: initialState as initialStateTypes,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentWeather.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(
      getCurrentWeather.fulfilled,
      (state, { payload }: PayloadAction<ICurrentWeatherNormalized>) => {
        state.currentWeather = payload;
        state.currentCity = payload.cityName;
        state.isLoading = false;
        state.isSuccess = true;
      }
    );
    builder.addCase(getCurrentWeather.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const selectorCurrentWeatherSlice = (state: IRootState) => state.currentWeatherSlice;

export default currentWeatherSlice.reducer;
