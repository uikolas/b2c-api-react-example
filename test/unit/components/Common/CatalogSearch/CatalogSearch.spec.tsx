import * as React from 'react';
import { HTMLAttributes, shallow, ShallowWrapper, mount } from "enzyme";
import Autosuggest from "react-autosuggest";
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import {
  CatalogSearchBase,
  buttonTitle,
} from '../../../../../src/shared/components/Common/CatalogSearch';
import {styles} from '../../../../../src/shared/components/Common/CatalogSearch/styles';
import {fixtureSearchTerm, fixtureItems} from '../../../../../src/shared/components/Pages/SearchPage/fixture';

// Required props
const suggestions = fixtureItems;
const searchTerm = 'sam';
const dispatch = jest.fn();

const countItems = fixtureItems.length;

const getShallowedComponent = () => (
  shallow(
    <CatalogSearchBase
      classes = {styles}
      dispatch = {dispatch}
      suggestions = {suggestions}
      searchTerm = {searchTerm}
      currency = {'EUR'}
    />
  )
);

describe('components->Common->CatalogSearch', () => {
  let wrapper;

  beforeEach(() => {
    wrapper =  getShallowedComponent();
  });

  it("renders the component", () => {
    expect(wrapper.find("#CatalogSearch")).toHaveLength(1);
  });

  it("renders the Button", () => {
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).prop('children')).toContain(buttonTitle);
  });

  it("renders the Autosuggest", () => {
    expect(wrapper.find(Autosuggest)).toHaveLength(1);
  });

  it("calls the dispatch function when the Button is clicked", () => {
    const clicker = wrapper.find(Button);
    clicker.simulate('click');
    expect(dispatch).toHaveBeenCalledTimes(1);
    dispatch.mockClear();
  });

  it("renders the Autosuggest when searchTerm is empty", () => {
    wrapper.setProps({ searchTerm: null });
    expect(wrapper.find(Autosuggest)).toHaveLength(1);
  });

  it("renders the Autosuggest when suggestions is empty", () => {
    wrapper.setProps({ suggestions: [] });
    expect(wrapper.find(Autosuggest)).toHaveLength(1);
  });

  it("renders the Autosuggest when value in the state is empty", () => {
    wrapper.setState({ value: '' });
    expect(wrapper.find(Autosuggest)).toHaveLength(1);
  });


});
