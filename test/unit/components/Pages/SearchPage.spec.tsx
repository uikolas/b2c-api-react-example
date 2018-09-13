import * as React from 'react';
import { HTMLAttributes, shallow, ShallowWrapper, mount } from "enzyme";

import {
  SearchPage,
  SearchPageBase,
  ConnectedSearchPage,
  pageTitle
} from '../../../../src/shared/components/Pages/SearchPage';
import {fixtureSearchTerm, fixtureItems} from '../../../../src/shared/components/Pages/SearchPage/fixture';
import {ProductCard} from '../../../../src/shared/components/Common/ProductCard';
import {styles} from '../../../../src/shared/components/Pages/SearchPage/styles/page';

// Required props
const items = fixtureItems;
const searchTerm = fixtureSearchTerm;
const currency = 'EUR';

const dispatch = () => null;

const CountItems = fixtureItems.length;
// Common html block parent
const parent = '.component-container';

const getShallowedComponent = () => (
  shallow(
    <SearchPageBase
      items={items}
      searchTerm={searchTerm}
      currency={currency}
      classes={styles}
    />
  )
);

describe('components->Pages->SearchPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper =  getShallowedComponent();
  });


  it("renders the base component", () => {
    expect(wrapper.find(parent)).toHaveLength(1);
  });

  it("renders the ProductCards", () => {
    expect(wrapper.find(ProductCard)).toHaveLength(CountItems);
  });

  it("renders the searchTerm", () => {
    expect(wrapper.find('#pageTitle')).toHaveLength(1);
    expect(wrapper.find('#searchTerm')).toHaveLength(1);
  });

  it("renders nothing when the searchTerm is null", () => {
    wrapper.setProps({ searchTerm: null });
    expect(wrapper.find('#pageTitle')).toHaveLength(0);
    expect(wrapper.find('#searchTerm')).toHaveLength(0);
  });

});
