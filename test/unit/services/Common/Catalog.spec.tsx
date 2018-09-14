import * as React from 'react';
import { HTMLAttributes, shallow, ShallowWrapper, mount } from "enzyme";
import AppBar from '@material-ui/core/AppBar';
import { toast } from 'react-toastify';
import {
  CatalogService
} from '../../../../src/shared/services/Common/Catalog';

describe('services->Common->CatalogService', () => {
  let service;

  beforeEach(() => {
    service =  new CatalogService();
  });

  it("instantiates an instance  ", () => {
    expect(service).toBeInstanceOf(CatalogService);
  });

});
