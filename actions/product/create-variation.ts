'use server';

import { getErrorMessage } from '@/lib/error-message';
import { prisma } from '@/lib/prisma';
import { VariationSchema, VariationSchemaType } from '@/schemas/VariationSchema';
import { nanoid } from 'nanoid';
import slugify from 'slugify';

export const createVariation = async (values: VariationSchemaType, caseId: string) => {
  const vFields = VariationSchema.safeParse(values);

  if (!vFields.success) {
    return {
      error: 'Invalid fields',
    };
  }
  const { color } = vFields.data;
  const slug = slugify(color, { lower: true, strict: true }) + '-' + nanoid();

  try {
    await prisma.caseVariation.create({
      data: {
        ...vFields.data,
        caseId: caseId,
        slug: slug,
      },
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
};
