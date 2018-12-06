import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: '1400px',
    margin: 'auto',
  },
  infoParent: {

  },
  wishlistBtnArea: {
    marginTop: theme.spacing.unit / 2,
  },
  buyBtnParent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  productBtn: {
    width: '100%',
    fontSize: 18,
    margin: 0,
  },
  buyBtn: {
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
      borderColor: theme.palette.primary.main,
    },
    '&:disabled': {
      opacity: .5,
      cursor: 'not-allowed',
    },
  },
  wishListBtn: {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
    borderColor: theme.palette.primary.main,
    '&:hover': {
      color: '#fff',
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
    '&:disabled': {
      opacity: .5,
      cursor: 'not-allowed',
    },
  },
  sliderParent: {},
  sliderParentContainer: {
    marginBottom: 30,
    '& *': {
      maxHeight: '70vh',
    },
    '& .slide': {
      background: 'transparent',
    },
    '& img': {
      width: 'auto !important',
      height: 'auto',
      maxHeight: '100%',
      maxWidth: '100%',
    },
    '& .slider-wrapper': {
      margin: '0 auto',
      width: 'auto',
      maxWidth: '370px',
    },
    '& .control-prev': {
      '&:before': {
        transform: 'scale(-1, 1)',
      },
    },
    '& .control-arrow': {
      width: 68,
      '&:before': {
        border: 'none !important',
        // tslint:disable:max-line-length
        content: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAAXNSR0IArs4c6QAAAO5JREFUGBljNjY2bpSWll4uKSkpnJ6evv/AgQP/GZAAI1DBAyBfHiq2SklJKXb16tW/YGqYGBkZS4Cc31CBsPv37291cHDggSlgBDFMTU09/v37txbI5ALxgZrOcHJyeh0+fPg1WAFI0MzMzBKoaMv///+FoIpusbGxucEVgASBJmkDFe0EMqWhio4zgRj4ANwEXFaATQA58u/fv3tg9gNNPAt0pM2xY8ceMpmYmIQA7d0EFAT7AEjv4+DgcAT5AGQ1E1BXD5BmBXGA3lsrJibmdfTo0c8gPgiArFgIlHgJxF0+Pj5h27dv/wmWgRIADAlXCagfJNEAAAAASUVORK5CYII=') !important`,
        // tslint:enable:max-line-length
      },
    },
  },
  productMain: {
    marginBottom: 114,
    paddingTop: '1.25rem',
  },
  descriptionContainer: {
    [theme.breakpoints.up('lg')]: {
      width: '98.7vw',
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    background: '#f8f8f8',
    padding: '12vmin 2vmin',
  },
  description: {
    fontSize: '16px',
    color: theme.appColors.black,
    width: '100%',
    maxWidth: '1400px',
    margin: 'auto',
  },
  descriptionTitle: {
    fontSize: 34,
    margin: '0 0 38px',
  },
  descriptionSku: {
    fontSize: 14,
    color: theme.appColors.grey,
    textTransform: 'uppercase',
    paddingTop: 25,
  },
  blockControl: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  formQuantity: {
    "&:first-child": {
      paddingTop: 0,
    },
    "& [data-form-column='0-0']": {
      maxWidth: 142,
      [theme.breakpoints.down('xs')]: {
        maxWidth: "100%",
      },
    }
  },
  formWishList: {
    "&:first-child": {
      paddingTop: 0,
    },
    "& > :first-child": {
      paddingTop: 0,
    },
  },
  controlsGroupQuantity: {
    paddingTop: 0,
  },
  wishlistRoot: {
    margin: 0
  }
});
