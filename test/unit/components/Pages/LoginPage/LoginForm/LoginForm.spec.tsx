import * as React from 'react';
import { HTMLAttributes, shallow, ShallowWrapper, mount } from "enzyme";

import {
  LoginFormBase
} from '../../../../../../src/shared/components/Pages/LoginPage/LoginForm';
import {styles} from '../../../../../../src/shared/components/Pages/SearchPage/styles/page';

// Required props
const handleSubmit = jest.fn();
const dispatch = () => null;

// Common html block parent
const parent = '.component-container';

const getShallowedComponent = () => (
  shallow(
    <LoginFormBase
      handleSubmit={handleSubmit}
      classes={styles}
    />
  )
);

describe('components->Pages->LoginPage->LoginForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper =  getShallowedComponent();
  });

  it("renders the form", () => {
    expect(wrapper.find("#LoginForm")).toHaveLength(1);
  });

  it('runs handleSubmit function when the form WITH username and password is submitted', () => {
    wrapper.setState({username: 'test', password: 'testPassword'});
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    handleSubmit.mockClear();
  });

  it('DO NOT run handleSubmit function when the form WITHOUT username or password is submitted', () => {
    wrapper.setState({username: '', password: ''});
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(handleSubmit).toHaveBeenCalledTimes(0);
    handleSubmit.mockClear();
  });

});
