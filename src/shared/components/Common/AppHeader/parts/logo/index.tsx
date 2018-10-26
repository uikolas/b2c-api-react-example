import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import { pathHomePage } from 'src/shared/routes/contentRoutes';

import { LogoProps as Props } from './types';
import { styles } from './styles';

const logoImage = (
  <svg width="175" height="24" viewBox="0 0 175 24">
    <g fill="#FFF" fillRule="evenodd">
      { /*tslint:disable:max-line-length*/ }
      <path
        d="M162.426 23.763c-1.732 0-3.349-.31-4.85-.931-1.502-.621-2.806-1.47-3.914-2.548a11.948 11.948 0 0 1-2.615-3.776 11.294 11.294 0 0 1-.954-4.614 11.174 11.174 0 0 1 1.653-5.875 11.524 11.524 0 0 1 1.916-2.345 12.184 12.184 0 0 1 2.488-1.812 12.757 12.757 0 0 1 2.961-1.168 13.114 13.114 0 0 1 3.315-.415c1.159 0 2.267.139 3.324.415 1.057.277 2.044.666 2.961 1.168a11.91 11.91 0 0 1 4.403 4.157c.535.858.945 1.783 1.232 2.777.287.993.43 2.026.43 3.098a11.415 11.415 0 0 1-1.661 5.977 12.104 12.104 0 0 1-4.404 4.267c-.917.519-1.904.92-2.96 1.202a12.836 12.836 0 0 1-3.325.423zm0-1.117c1.283 0 2.416-.269 3.4-.805a7.272 7.272 0 0 0 2.489-2.243c.675-.96 1.183-2.094 1.527-3.403.343-1.31.514-2.743.514-4.3 0-1.547-.171-2.964-.514-4.25-.344-1.287-.852-2.396-1.527-3.328a7.103 7.103 0 0 0-2.489-2.167c-.984-.513-2.117-.77-3.4-.77-1.304 0-2.449.257-3.433.77a7.028 7.028 0 0 0-2.48 2.167c-.67.932-1.173 2.04-1.51 3.327-.337 1.287-.506 2.704-.506 4.25 0 1.558.169 2.991.506 4.3.337 1.31.84 2.444 1.51 3.404a7.196 7.196 0 0 0 2.48 2.243c.984.536 2.129.805 3.433.805zM124.04.787h7.76c1.34 0 2.515.144 3.527.432 1.012.288 1.856.691 2.53 1.21a5.107 5.107 0 0 1 1.528 1.855 5.36 5.36 0 0 1 .514 2.345c0 .7-.132 1.354-.396 1.964a5.474 5.474 0 0 1-1.114 1.65 6.836 6.836 0 0 1-1.73 1.27 9.956 9.956 0 0 1-2.226.838l8.149 10.887h-4.37l-7.778-10.548h-2.632v10.548h-3.762V.788zm3.762 10.769h2.177c.843 0 1.622-.113 2.336-.34a5.782 5.782 0 0 0 1.856-.956c.523-.412.931-.911 1.223-1.498.293-.587.44-1.247.44-1.981a4.88 4.88 0 0 0-.347-1.862 4.116 4.116 0 0 0-.978-1.448 4.553 4.553 0 0 0-1.502-.94 5.183 5.183 0 0 0-1.898-.338h-3.307v9.363zM113.546.787v1.456h-11.793v8.026h7.895v1.456h-7.895v10.057h11.793v1.456H97.99V.788zM59.978.787h3.847l8.706 17.22h.185L81.253.786h3.78v22.451h-3.78V4.834h-.118l-9.178 18.404h-.776l-9.28-18.252h-.252v18.252h-1.67zM37.387 23.763c-1.732 0-3.349-.31-4.85-.931-1.502-.621-2.807-1.47-3.914-2.548a11.948 11.948 0 0 1-2.616-3.776 11.294 11.294 0 0 1-.953-4.614 11.174 11.174 0 0 1 1.653-5.875 11.524 11.524 0 0 1 1.916-2.345 12.184 12.184 0 0 1 2.488-1.812A12.757 12.757 0 0 1 34.072.694 13.114 13.114 0 0 1 37.387.28c1.159 0 2.267.139 3.324.415 1.057.277 2.044.666 2.961 1.168a11.91 11.91 0 0 1 4.403 4.157c.535.858.945 1.783 1.232 2.777.287.993.43 2.026.43 3.098a11.415 11.415 0 0 1-1.662 5.977 12.104 12.104 0 0 1-4.403 4.267c-.917.519-1.904.92-2.961 1.202a12.836 12.836 0 0 1-3.324.423zm0-1.117c1.283 0 2.416-.269 3.4-.805a7.272 7.272 0 0 0 2.488-2.243c.675-.96 1.184-2.094 1.527-3.403.343-1.31.515-2.743.515-4.3 0-1.547-.172-2.964-.515-4.25-.343-1.287-.852-2.396-1.527-3.328a7.103 7.103 0 0 0-2.488-2.167c-.984-.513-2.117-.77-3.4-.77-1.304 0-2.449.257-3.433.77a7.028 7.028 0 0 0-2.48 2.167c-.67.932-1.173 2.04-1.51 3.327-.338 1.287-.506 2.704-.506 4.25 0 1.558.168 2.991.506 4.3.337 1.31.84 2.444 1.51 3.404a7.196 7.196 0 0 0 2.48 2.243c.984.536 2.129.805 3.433.805zM8.183 22.34c.55 0 1.096-.075 1.636-.228a4.766 4.766 0 0 0 1.451-.677c.428-.3.77-.666 1.03-1.1.258-.435.387-.94.387-1.516 0-.688-.177-1.3-.531-1.837a6.218 6.218 0 0 0-1.392-1.473 13.904 13.904 0 0 0-1.965-1.261c-.737-.395-1.488-.79-2.253-1.186a45.823 45.823 0 0 1-2.252-1.244 11.189 11.189 0 0 1-1.966-1.456A6.94 6.94 0 0 1 .936 8.567C.582 7.907.405 7.147.405 6.29c0-.858.16-1.654.48-2.387.321-.734.79-1.369 1.41-1.905.618-.536 1.38-.957 2.286-1.261C5.486.432 6.524.279 7.693.279c1.058 0 2.003.113 2.835.339a6.984 6.984 0 0 1 2.193.999c.63.44 1.164.982 1.603 1.625a8.555 8.555 0 0 1 1.063 2.235l-1.924.88a8.898 8.898 0 0 0-.86-1.887 5.948 5.948 0 0 0-1.248-1.465 5.255 5.255 0 0 0-1.68-.94c-.635-.22-1.352-.33-2.15-.33-.709 0-1.328.1-1.856.297-.529.197-.97.457-1.325.779a3.166 3.166 0 0 0-.793 1.083c-.174.4-.261.81-.261 1.228 0 .587.18 1.126.54 1.617.36.49.838.953 1.434 1.388.596.435 1.274.855 2.033 1.261.76.407 1.532.819 2.32 1.236.787.418 1.56.853 2.32 1.304.759.452 1.437.945 2.033 1.482a6.994 6.994 0 0 1 1.434 1.76c.36.638.54 1.352.54 2.142 0 .892-.17 1.73-.507 2.514a5.601 5.601 0 0 1-1.518 2.05c-.675.58-1.513 1.04-2.514 1.379-1 .339-2.165.508-3.492.508-1.08 0-2.042-.119-2.885-.356a7.338 7.338 0 0 1-2.236-1.032 6.801 6.801 0 0 1-1.662-1.651A8.89 8.89 0 0 1 0 18.497l2.008-.83a7.4 7.4 0 0 0 .953 1.965 6.39 6.39 0 0 0 1.392 1.464c.529.401 1.116.709 1.763.923a6.525 6.525 0 0 0 2.067.322z"/>
      { /*tslint:enable:max-line-length*/ }
    </g>
  </svg>
);

export const LogoComponent: React.SFC<Props> = ({classes}) => (
  <div className={ classes.logoContainer }>
    <NavLink to={pathHomePage} className={ classes.logo }>{ logoImage }</NavLink>
  </div>
);

export const Logo = withStyles(styles)(LogoComponent);