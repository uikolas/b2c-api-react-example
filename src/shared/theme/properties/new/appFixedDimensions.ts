export interface IAppFixedDimensions {
  headerHeight: React.CSSProperties['height'];
  card: {
    actionAreaWidth: React.CSSProperties['width'];
    actionAreaHeight: React.CSSProperties['height'];
  };
  borderRadius: React.CSSProperties['borderRadius'];
}

export const appFixedDimensions: IAppFixedDimensions = {
  headerHeight: 65,
  card: {
    actionAreaWidth: 282,
    actionAreaHeight: 428
  },
  borderRadius: 4,
};
