import * as React from 'react';
import { HTMLAttributes, shallow, ShallowWrapper, mount } from "enzyme";
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';

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

describe('components->Common->AppLogo: snapshot', () => {

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={[ '/' ]}>
          <AppLogoBase classes = {styles} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
