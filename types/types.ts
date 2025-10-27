import { Brand, Model, Prisma, Series } from '@prisma/client';

export type TBrands = {
  brands: Brand[];
};

export type TSeries = {
  series: Series[];
};
export type TModels = {
  models: Model[];
};

export type TCategoryMenu = {
  brands: Brand[];
  series: Prisma.SeriesGetPayload<{
    include: {
      modelSmartphone: true;
    };
  }>[];
  models: Model[];
};
