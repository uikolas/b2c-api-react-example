import * as React from 'react';
import { HTMLAttributes, shallow, ShallowWrapper, mount } from "enzyme";
import LinearProgress from '@material-ui/core/LinearProgress';

import {
  PreloaderBase
} from '../../../../../src/shared/components/Common/Preloader';
import {styles} from '../../../../../src/shared/components/Common/Preloader/styles';

// Required props

const getShallowedComponent = () => (
  shallow(
    <PreloaderBase
      classes = {styles}
    />
  )
);

describe('components->Common->Preloader', () => {
  let wrapper;

  beforeEach(() => {
    wrapper =  getShallowedComponent();
  });

  it("renders the component", () => {
    expect(wrapper.find(LinearProgress)).toHaveLength(2);
  });

});
