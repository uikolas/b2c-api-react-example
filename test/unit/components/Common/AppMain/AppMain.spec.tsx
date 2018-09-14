///<reference path="../../../../../node_modules/@types/jest/index.d.ts"/>
import * as React from 'react';
import { HTMLAttributes, shallow, ShallowWrapper, mount } from "enzyme";
import {Preloader} from '../../../../../src/shared/components/Common/Preloader';
import {LoginPageBase} from '../../../../../src/shared/components/Pages/LoginPage';
import Grid from '@material-ui/core/Grid';

import {
  AppMainBase
} from '../../../../../src/shared/components/Common/AppMain';
import {styles} from '../../../../../src/shared/components/Common/AppMain/styles';

// Required props
const isLoading = false;

const getShallowedComponent = () => (
  shallow(
    <AppMainBase
      classes = {styles}
      isLoading = {isLoading}
      children={LoginPageBase}
    />
  )
);

describe('components->Common->AppMain', () => {
  let wrapper;

  beforeEach(() => {
    wrapper =  getShallowedComponent();
  });

  it("renders the component", () => {
    expect(wrapper.find('main')).toHaveLength(1);
  });

  it("renders the Preloader when isLoading is true", () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find(Preloader)).toHaveLength(1);
  });

  it("DO NOT render the Preloader when isLoading is false", () => {
    wrapper.setProps({ isLoading: false });
    expect(wrapper.find(Preloader)).toHaveLength(0);
  });

  it("renders the children", () => {
    expect(wrapper.find(Grid).prop('children')).toContain(LoginPageBase);
  });

});
