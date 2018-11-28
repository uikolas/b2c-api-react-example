import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const bannerStyles = (theme: Theme) => createStyles({
  root: {
    // backgroundImage: `url("http://glue.de.suite.local:3000/img/homepage_hero_image.jpg")`,
    backgroundColor: 'red',
    backgroundSize: 'cover',
    height: '700px',
  },
});
