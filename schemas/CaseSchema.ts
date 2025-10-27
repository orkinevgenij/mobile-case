import { z } from 'zod';

export const CaseSchema = z.object({
  name: z.string().nonempty({
    message: "Назва обов'язкова",
  }),
  description: z.string().min(5, {
    message: 'Менше ніж 5 символів',
  }),

  brand: z.string().nonempty({
    message: 'Вкажіть бренд',
  }),
  series: z.string().nonempty({
    message: 'Вкажіть серію',
  }),
  model: z.string().nonempty({
    message: 'Вкажіть модель',
  }),
  material: z.string().nonempty({
    message: 'Вкажіть метеріал',
  }),
  guarantee: z
    .number({
      message: 'Вкажіть строк гарантії',
    })
    .min(1, 'Ціна повинна бути більшою за нуль'),
});
export type CaseSchemaType = z.infer<typeof CaseSchema>;
