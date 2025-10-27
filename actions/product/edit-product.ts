'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { CaseSchema, CaseSchemaType } from '@/schemas/CaseSchema';

export const editProduct = async (values: CaseSchemaType, id: string) => {
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

  const product = await prisma.case.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      description: description,
      material: material,
      guarantee: guarantee,
      modelSmartphone: { connect: { id: model } },
    },
  });
  if (product) {
    return {
      success: 'Product updated Successfully',
    };
  } else {
    return {
      error: 'Product not found',
    };
  }
};
