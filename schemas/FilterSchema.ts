import { z } from 'zod';

export const FilterSchema = z.object({
  brand: z.string().nonempty({
    message: 'Вкажіть бренд',
  }),
  series: z.string().nonempty({
    message: 'Вкажіть серію',
  }),
  model: z.string().nonempty({
    message: 'Вкажіть модель',
  }),
});

export type FilterSchemaType = z.infer<typeof FilterSchema>;
