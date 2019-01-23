import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { LangProps as Props, LangState as State, language } from './types';
import { styles } from './styles';
import { LanguageDeutschTest, LanguageEnglishTest } from 'src/shared/translation/translations';
import { connect } from './connect';
import { TAppLocale } from 'src/shared/interfaces/locale/index';
import api from '@services/api';


const availableLanguages: language[] = [
  {
    name: LanguageEnglishTest,
    code: 'en',
  },
  {
    name: LanguageDeutschTest,
    code: 'de',
  },
];

@connect
export class LangComponent extends React.PureComponent<Props, State> {
  public state: State = {
    anchorEl: null
  };

  private openLang = ({currentTarget}: React.MouseEvent<HTMLElement>) => {
    this.setState(() => ({anchorEl: currentTarget}));
  };
  private closeLang = () => this.setState(() => ({anchorEl: null}));
  private selectLang = (lang: language) => (event: React.MouseEvent<HTMLElement>) => {
    const locale: TAppLocale = lang.code;

    api.setHeader('Accept-Language', locale);
    this.setState({anchorEl: null});
    this.props.switchLocaleAction({locale});
  };

  public render() {
    const {appLocale} = this.props;
    if (!appLocale) {
        return null;
    }
    const {anchorEl} = this.state;
    const selectedLang = availableLanguages.filter((item: language) => (item.code === appLocale))[0];
    const {classes} = this.props;
    const open = Boolean(anchorEl);

    return (
      <div>
        <Button
          className={ classes.langBtn }
          size='small'
          aria-owns={ open ? 'lang-menu' : null }
          aria-haspopup='true'
          onClick={ this.openLang }
        >
          { selectedLang.name }
          { Boolean(anchorEl) ? <KeyboardArrowUp/> : <KeyboardArrowDown/> }
        </Button>

        <Menu
          id='lang-menu'
          anchorEl={ anchorEl }
          open={ open }
          onClose={ this.closeLang }
        >
          { availableLanguages.map(language => (
            <MenuItem
              key={ language.code }
              selected={ language.code === selectedLang.code }
              onClick={ this.selectLang(language) }
            >
              { language.name }
            </MenuItem>
          )) }
        </Menu>
      </div>
    );
  }
}

export const LanguageSwircher = withStyles(styles)(LangComponent);

export default LanguageSwircher;
