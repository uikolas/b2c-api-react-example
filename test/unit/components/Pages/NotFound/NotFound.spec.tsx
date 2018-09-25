import * as React from 'react';
import {create} from 'react-test-renderer';

import {wrapIntoProviders} from '../../../../../src/shared/lib/tests-helper';
import {NotFound} from '../../../../../src/shared/components/Pages/NotFound';


it('renders correctly', () => {
  const className = 'test';
  const tree = create(wrapIntoProviders(
    <NotFound className={className} />
)).toJSON();
  expect(tree).toMatchSnapshot();
});
