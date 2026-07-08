import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SOQuestion } from '../types/question';
import { fetchQuestions } from '../api/fetch-questions';

interface QuestionState {
  items: SOQuestion[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  fromDate: number;
  lastFetchedDate: number;
}

const initialState: QuestionState = {
  items: [],
  status: 'idle',
  error: null,
  fromDate: Math.floor(Date.UTC(2026, 0, 1) / 1000),
  lastFetchedDate: 0
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setFromDate(state, action: PayloadAction<number>) {
      state.fromDate = action.payload;
    },
    changeScore(state, action: PayloadAction<{ questionId: number; delta: number }>) {
      const item = state.items.find((q) => q.question_id === action.payload.questionId);
      if (item) item.score += action.payload.delta;
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
        state.lastFetchedDate = state.fromDate;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Неизвестная ошибка';
      });
  }
});

export const { setFromDate, changeScore } = questionsSlice.actions;
export default questionsSlice.reducer;
