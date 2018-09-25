import * as React from 'react';
import { HTMLAttributes, shallow, ShallowWrapper, mount } from "enzyme";

import {
  RegisterFormBase
} from '../../../../../../src/shared/components/Pages/LoginPage/RegisterForm';
import {formStyles} from '../../../../../../src/shared/components/Pages/LoginPage/styles';

// Required props
const handleSubmit = jest.fn();
const dispatch = () => null;

const getShallowedComponent = () => (
  shallow(
    <RegisterFormBase
      handleSubmit={handleSubmit}
      classes={formStyles}
    />
  )
);

describe('components->Pages->LoginPage->RegisterForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper =  getShallowedComponent();
  });

  it("renders the form", () => {
    expect(wrapper.find("#RegisterForm")).toHaveLength(1);
  });

  it('runs handleSubmit function when the form is filled with all required data and submitted', () => {
    wrapper.setState({
      salutation: 'salutation',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      password: 'password',
      passwordConfirmation: 'passwordConfirmation',
      acceptedTerms: 'acceptedTerms',
    });
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    handleSubmit.mockClear();
  });

  it('DO NOT run handleSubmit function when the salutation is null and the form is submitted', () => {
    wrapper.setState({
      salutation: '',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      password: 'password',
      passwordConfirmation: 'passwordConfirmation',
      acceptedTerms: 'acceptedTerms',
    });
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(handleSubmit).toHaveBeenCalledTimes(0);
    handleSubmit.mockClear();
  });

  it('DO NOT run handleSubmit function when the firstName is null and the form is submitted', () => {
    wrapper.setState({
      salutation: 'salutation',
      firstName: '',
      lastName: 'lastName',
      email: 'email',
      password: 'password',
      passwordConfirmation: 'passwordConfirmation',
      acceptedTerms: 'acceptedTerms',
    });
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(handleSubmit).toHaveBeenCalledTimes(0);
    handleSubmit.mockClear();
  });

  it('DO NOT run handleSubmit function when the lastName is null and the form is submitted', () => {
    wrapper.setState({
      salutation: 'salutation',
      firstName: 'firstName',
      lastName: '',
      email: 'email',
      password: 'password',
      passwordConfirmation: 'passwordConfirmation',
      acceptedTerms: 'acceptedTerms',
    });
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(handleSubmit).toHaveBeenCalledTimes(0);
    handleSubmit.mockClear();
  });

  it('DO NOT run handleSubmit function when the email is null and the form is submitted', () => {
    wrapper.setState({
      salutation: 'salutation',
      firstName: 'firstName',
      lastName: 'lastName',
      email: '',
      password: 'password',
      passwordConfirmation: 'passwordConfirmation',
      acceptedTerms: 'acceptedTerms',
    });
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(handleSubmit).toHaveBeenCalledTimes(0);
    handleSubmit.mockClear();
  });

  it('DO NOT run handleSubmit function when the password is null and the form is submitted', () => {
    wrapper.setState({
      salutation: 'salutation',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      password: '',
      passwordConfirmation: 'passwordConfirmation',
      acceptedTerms: 'acceptedTerms',
    });
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(handleSubmit).toHaveBeenCalledTimes(0);
    handleSubmit.mockClear();
  });

  it('DO NOT run handleSubmit function when the passwordConfirmation is null and the form is submitted', () => {
    wrapper.setState({
      salutation: 'salutation',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      password: 'password',
      passwordConfirmation: '',
      acceptedTerms: 'acceptedTerms',
    });
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(handleSubmit).toHaveBeenCalledTimes(0);
    handleSubmit.mockClear();
  });

  it('DO NOT run handleSubmit function when the acceptedTerms is null and the form is submitted', () => {
    wrapper.setState({
      salutation: 'salutation',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      password: 'password',
      passwordConfirmation: 'passwordConfirmation',
      acceptedTerms: '',
    });
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(handleSubmit).toHaveBeenCalledTimes(0);
    handleSubmit.mockClear();
  });

  it('changes the property salutation of the state when the field is changed', () => {

    const value = 'mr';
    const field = wrapper.find('form').find("#register-salutation");
    expect(field).toHaveLength(1);
    field.simulate('change', { preventDefault: jest.fn(), target: {value: 'mr'} });
    expect(wrapper.state('salutation')).toEqual(value);

  });

});
