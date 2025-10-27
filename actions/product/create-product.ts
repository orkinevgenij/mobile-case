'use server';

import { auth } from '@/auth';
import { getErrorMessage } from '@/lib/error-message';
import { prisma } from '@/lib/prisma';
import { CaseSchema, CaseSchemaType } from '@/schemas/CaseSchema';
import { nanoid } from 'nanoid';
import slugify from 'slugify';

export const createProduct = async (values: CaseSchemaType) => {
  const isAuth = await auth();
  const isAdmin = isAuth?.user?.role === 'ADMIN';
  if (!isAdmin) {
    return {
      error: 'Access denied',
    };
  }
  const vFields = CaseSchema.safeParse(values);
  if (!vFields.success) {
    return {
      error: 'Invalid fields',
    };
  }
  const { guarantee, material, model, description, name } = vFields.data;
  const slug = slugify(name, { lower: true, strict: true }) + '-' + nanoid();

  try {
    await prisma.case.create({
      data: {
        name: name,
        description: description,
        material: material,
        guarantee: guarantee,
        modelSmartphone: { connect: { id: model } },
        slug: slug,
      },
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
};
