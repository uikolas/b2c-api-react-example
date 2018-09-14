import * as React from 'react';
import { HTMLAttributes, shallow, ShallowWrapper, mount } from "enzyme";

import {
  LoginFormBase
} from '../../../../../../src/shared/components/Pages/LoginPage/LoginForm';
import {formStyles} from '../../../../../../src/shared/components/Pages/LoginPage/styles';

// Required props
const handleSubmit = jest.fn();
const dispatch = () => null;

const getShallowedComponent = () => (
  shallow(
    <LoginFormBase
      handleSubmit={handleSubmit}
      classes={formStyles}
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

  it('DO NOT run handleSubmit function when the username is null and form is submitted', () => {
    wrapper.setState({username: '', password: 'password'});
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(handleSubmit).toHaveBeenCalledTimes(0);
    handleSubmit.mockClear();
  });

  it('DO NOT run handleSubmit function when the password is null and form is submitted', () => {
    wrapper.setState({username: '', password: ''});
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(handleSubmit).toHaveBeenCalledTimes(0);
    handleSubmit.mockClear();
  });

});
