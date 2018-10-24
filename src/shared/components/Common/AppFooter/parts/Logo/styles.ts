import createStyles from '@material-ui/core/styles/createStyles';

export const styles = () => createStyles({
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    display: 'block',
    marginRight: 8,
  },
  logoCopy: {
    color: '#111',
    fontSize: '14px',
    lineHeight: '18px',
    opacity: .4
  }
});
