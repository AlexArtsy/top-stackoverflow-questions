import { createAsyncThunk } from '@reduxjs/toolkit';
import { SOApiResponseSchema, SOQuestion } from '../types/question';
import { ITEM_COUNT, SEARCH_PHRASE } from '../constants';

export const fetchQuestions = createAsyncThunk<SOQuestion[], number>(
  'questions/fetchQuestions',
  async (fromDate) => {
    const params = new URLSearchParams({
      order: 'desc',
      sort: 'votes',
      q: SEARCH_PHRASE,
      site: 'stackoverflow',
      pagesize: String(ITEM_COUNT),
      filter: 'withbody'
    });

    if (fromDate > 0) {
      params.set('fromdate', String(fromDate));
    }

    const response = await fetch(`https://api.stackexchange.com/2.3/search/advanced?${params}`);
    const json = await response.json();
    const parsed = SOApiResponseSchema.parse(json);
    return parsed.items;
  }
);
