import {IAvailableLabelsCollection, TLabelId} from "src/shared/interfaces/searchPageData/index";
import {IProductLabel} from "src/shared/interfaces/product/index";

export const getProductLabelCollection = (labelsIdArr: Array<TLabelId> | null,
                                          availableLabels: IAvailableLabelsCollection | null
                                          ): Array<IProductLabel> | null => {

  const isLabelsExist = (Array.isArray(labelsIdArr) && labelsIdArr.length > 0);

  const labels = isLabelsExist
    ? labelsIdArr.map((labelId: TLabelId) => {
      if (availableLabels[labelId]) {
        return {
          type: availableLabels[labelId].id,
          text: availableLabels[labelId].name,
          position: availableLabels[labelId].position,
        };
      }
    })
    : null;

  return labels;
};

export const getProductLabel = (labelsIdArr: Array<TLabelId> | null,
                                availableLabels: IAvailableLabelsCollection | null): IProductLabel | null => {

  const labels = getProductLabelCollection(labelsIdArr, availableLabels);
  if (!labels) {
    return null;
  }
  const checkedValue = "position";

  /*if (labels.length === 1) {
    return labels[0];
  }*/

  const label = labels.reduce(function(prev: IProductLabel, current: IProductLabel) {
    if (prev && current) {
      return (prev[checkedValue] > current[checkedValue]) ? prev : current;
    }
    return null;
  }, labels[0]);

  return label;
};
