import z from 'zod';

export const SOQuestionSchema = z.object({
  question_id: z.number(),
  title: z.string(),
  link: z.url(),
  score: z.number(),
  body: z.string(),
  owner: z.object({
    display_name: z.string(),
    reputation: z.number()
  }),
  view_count: z.number(),
  last_activity_date: z.number()
});

export const SOApiResponseSchema = z.object({
  items: z.array(SOQuestionSchema)
});

export type SOQuestion = z.infer<typeof SOQuestionSchema>;
export type SOApiResponse = z.infer<typeof SOApiResponseSchema>;
export const ITEM_COUNT = 5;
export const SEARCH_PHRASE = 'react-redux';
