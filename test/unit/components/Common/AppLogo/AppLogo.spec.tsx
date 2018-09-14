import * as React from 'react';
import { HTMLAttributes, shallow, ShallowWrapper, mount } from "enzyme";

import Typography from '@material-ui/core/Typography';
import {
  AppLogoBase
} from '../../../../../src/shared/components/Common/AppLogo';
import {styles} from '../../../../../src/shared/components/Common/AppLogo/styles';

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
    expect(wrapper.find(Typography).dive().dive().text()).toContain('Spryker Logo');
  });

});
