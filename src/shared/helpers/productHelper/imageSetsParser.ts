import { IProductCardImages } from '../../interfaces/product';

export const parseImageSets = (imageSets: any): Array<IProductCardImages> | null => {

  if (!Array.isArray(imageSets)) {
    return null;
  }

  const result: Array<IProductCardImages> = [];

  imageSets.map((set: any) => {
    set.images.forEach((imgs: any) => {
      result.push(imgs);
    });
  });

  return result;
};
