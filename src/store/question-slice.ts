import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SOQuestion } from '../model/types';
import { fetchQuestions } from '../api/fetch-questions';

interface QuestionState {
  items: SOQuestion[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  fromDate: number;
}

const initialState: QuestionState = {
  items: [],
  status: 'idle',
  error: null,
  fromDate: Math.floor(Date.UTC(2026, 0, 1) / 1000)
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setFromDate(state, action: PayloadAction<number>) {
      state.fromDate = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Неизвестная ошибка';
      });
  }
});

export const { setFromDate } = questionsSlice.actions;
export default questionsSlice.reducer;
