'use server';
import { prisma } from '@/lib/prisma';

export const getBrands = async () => {
  const brands = await prisma.brand.findMany();
  return brands;
};

export const getSeries = async () => {
  const series = await prisma.series.findMany({
    include: {
      modelSmartphone: true,
    },
  });
  return series;
};

export const getModels = async () => {
  const models = await prisma.model.findMany();
  return models;
};
