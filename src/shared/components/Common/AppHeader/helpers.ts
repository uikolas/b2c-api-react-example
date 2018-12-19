import {appContainerStyles} from "src/shared/theme/properties/new/appContainerStyles";
import {appFixedDimensions} from "src/shared/theme/properties/new/appFixedDimensions";

export const getPopoverPosition = ({pageWidth, isSticky, showSearch}:
                                   {pageWidth: number;
                                    isSticky: boolean;
                                    showSearch: boolean
                                   }): {top: number; left: number} => {

  const {cartDrop, headerHeight, customBreakpoints} = appFixedDimensions;
  const containerWidth = Number(appContainerStyles.maxWidth);
  const margin = (pageWidth - containerWidth) / 2;
  const overFlowNumber = (pageWidth < customBreakpoints.tablet ? 0 : cartDrop.overFlow);
  const fullHeaderHeight = (pageWidth < customBreakpoints.smallTablet ? headerHeight.tablet : headerHeight.desktop);

  const popoverPosLeft: number = margin + containerWidth - cartDrop.width + overFlowNumber;
  let popoverPosTop: number = headerHeight.sticky;
  if (showSearch) {
    popoverPosTop = fullHeaderHeight;
  } else if (isSticky && !showSearch) {
    popoverPosTop = headerHeight.sticky;
  }

  return {
    top: popoverPosTop,
    left: popoverPosLeft,
  };
};
