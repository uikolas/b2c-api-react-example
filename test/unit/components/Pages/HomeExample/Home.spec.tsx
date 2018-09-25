import * as React from 'react';
// import { Store, Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
import { HTMLAttributes, shallow, ShallowWrapper, mount } from "enzyme";

// import {configureEnzyme} from '../../../../src/shared/lib/tests-helper';
// import {ErrorBoundary} from '../../../../src/shared/components/Library/ErrorBoundary';
import {title, Home, ConnectedHome} from '../../../../../src/shared/components/Pages/HomeExample';
// import {items} from "../../../../src/shared/services/Pages/Home.fixtures";


// configureEnzyme();

describe('components->Pages->HomeExample', () => {
  // const initialState = {
  //   error: null,
  //   data: {
  //     items,
  //     items_count: items.length,
  //   },
  //   pending: false,
  //   fulfilled: true,
  //   rejected: false,
  // };
  // console.info('init->initialState', initialState);
  // const mockStore = configureStore();
  // let store: Store<any>, wrapper: React.ReactElement<any>;
  //
  // beforeEach(() => {
  //   store = mockStore(initialState);
  //   console.info('beforeEach->store', store);
  //   wrapper = mount( <Provider store={store}><ErrorBoundary><ConnectedHome /></ErrorBoundary></Provider> );
  //   console.info('beforeEach->wrapper', wrapper);
  // });

  // it('+++ render the connected(Home) component', () => {
  //   console.info('render->wrapper', wrapper);
  //   console.info('render->wrapper.find(ConnectedHome)', wrapper.find(ConnectedHome));
  //   console.info(
  //     'render->wrapper.find(ConnectedHome).length',
  //     wrapper.find(ConnectedHome).length
  //   );
  //   expect(wrapper.find(ConnectedHome).length).toEqual(1);
  // });
  //
  // it('+++ check Prop matches with initialState', () => {
  //   console.info('matches->wrapper', wrapper);
  //   console.info('matches->wrapper.find(Home)', wrapper.find(Home));
  //   console.info(
  //     'matches->wrapper.find(Home).prop(\'data\')',
  //     wrapper.find(Home).prop('data')
  //   );
  //   expect(wrapper.find(Home).prop('data')).toEqual(initialState.data);
  // });

  const dispatch = () => null;

  it("renders the title", () => {
    const result = shallow(<Home dispatch={dispatch} />).contains(<div>{title}</div>);
    expect(result).toBeTruthy();
  });
});
