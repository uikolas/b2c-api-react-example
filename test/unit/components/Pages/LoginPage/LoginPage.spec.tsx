import * as React from 'react';
import { HTMLAttributes, shallow, ShallowWrapper, mount } from "enzyme";

import {
  LoginPageBase
} from '../../../../../src/shared/components/Pages/LoginPage';
import {styles} from '../../../../../src/shared/components/Pages/LoginPage/styles';
import {LoginForm} from '../../../../../src/shared/components/Pages/LoginPage/LoginForm';
import {RegisterForm} from '../../../../../src/shared/components/Pages/LoginPage/RegisterForm';

// Required props

const dispatch = () => null;

const getShallowedComponent = () => (
  shallow(
    <LoginPageBase
      classes={styles}
    />
  )
);

describe('components->Pages->LoginPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper =  getShallowedComponent();
  });

  it("renders the LoginForm", () => {
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });

  it("renders the RegisterForm", () => {
    expect(wrapper.find(RegisterForm)).toHaveLength(1);
  });

  it("renders the divider", () => {
    expect(wrapper.find('#divider')).toHaveLength(1);
  });

});
