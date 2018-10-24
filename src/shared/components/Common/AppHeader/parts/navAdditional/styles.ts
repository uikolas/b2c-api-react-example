import createStyles from '@material-ui/core/styles/createStyles';

export const styles = () => createStyles({
  addNavContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  addNavItem: {
    '&:not(:first-child)': {
      marginLeft: 8,
    }
  }
});
