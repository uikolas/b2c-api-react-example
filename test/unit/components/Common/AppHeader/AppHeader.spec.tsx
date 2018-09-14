import * as React from 'react';
import { HTMLAttributes, shallow, ShallowWrapper, mount } from "enzyme";
import AppBar from '@material-ui/core/AppBar';
import {AppLogo} from '../../../../../src/shared/components/Common/AppLogo';
import CatalogSearch from '../../../../../src/shared/components/Common/CatalogSearch';
import {
  AppHeaderBase
} from '../../../../../src/shared/components/Common/AppHeader';
import {styles} from '../../../../../src/shared/components/Common/AppHeader/styles';

// Required props

const getShallowedComponent = () => (
  shallow(
    <AppHeaderBase
      classes = {styles}
    />
  )
);

describe('components->Common->AppHeader', () => {
  let wrapper;

  beforeEach(() => {
    wrapper =  getShallowedComponent();
  });

  it("renders the component", () => {
    expect(wrapper.find(AppBar)).toHaveLength(1);
  });

  it("renders the CatalogSearch", () => {
    expect(wrapper.find(CatalogSearch)).toHaveLength(1);
  });

  it("renders the AppLogo", () => {
    expect(wrapper.find(AppLogo)).toHaveLength(1);
  });

});
