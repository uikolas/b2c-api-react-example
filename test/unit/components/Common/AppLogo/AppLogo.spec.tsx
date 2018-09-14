import * as React from 'react';
import { HTMLAttributes, shallow, ShallowWrapper, mount } from "enzyme";
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import {NavLink} from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import {
  AppLogoBase
} from '../../../../../src/shared/components/Common/AppLogo';
import {styles} from '../../../../../src/shared/components/Common/AppLogo/styles';
import {IconLogo} from '../../../../../src/shared/assets/icons/IconLogo';

// Required props

const getShallowedComponent = () => (
  shallow(
    <AppLogoBase
      classes = {styles}
    />
  )
);

describe('components->Common->AppLogo', () => {
  let wrapper;

  beforeEach(() => {
    wrapper =  getShallowedComponent();
  });

  it("renders the component", () => {
    expect(wrapper.find(IconLogo)).toHaveLength(1);
  });
});
