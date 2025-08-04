import { z } from 'zod';

export const VariationSchema = z.object({
  color: z.string().nonempty({
    message: 'Вкажіть колір',
  }),
  price: z
    .number({
      required_error: 'Ціну обов’язково вказати',
    })
    .min(1, 'Ціна повинна бути більшою за нуль'),
  imgUrl: z.string().optional(),
});
export type VariationSchemaType = z.infer<typeof VariationSchema>;
