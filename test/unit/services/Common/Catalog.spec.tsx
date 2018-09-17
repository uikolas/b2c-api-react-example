import * as React from 'react';
import { HTMLAttributes, shallow, ShallowWrapper, mount } from "enzyme";
import { toast } from 'react-toastify';
import {
  CatalogService
} from '../../../../src/shared/services/Common/Catalog';

import api from '../../../../src/shared/services/api';

jest.mock('../../../../src/shared/services/api');

const dispatch = jest.fn();

describe('services->Common->CatalogService', () => {

  it("fetches products in method catalogSearch", async () => {

    const resp = {
      ok: 'true',
      data: {
        data: {
          attributes: {
            products: [
              {
                "abstract_sku": "191",
                "abstract_name": "Samsung F90BN",
                "price": 24899,
                "images": [
                  {
                    "external_url_small": "//images.icecat.biz/img/gallery_mediums/img_17681791_medium_1482143992_4607_19487.jpg",
                    "external_url_large": "//images.icecat.biz/img/norm/high/17681791-4446.jpg"
                  }
                ]
              },
              {
                "abstract_sku": "192",
                "abstract_name": "Samsung F90BN",
                "price": 28178,
                "images": [
                  {
                    "external_url_small": "//images.icecat.biz/img/gallery_mediums/img_17738941_medium_1482147097_3908_19487.jpg",
                    "external_url_large": "//images.icecat.biz/img/norm/high/17738941-1395.jpg"
                  }
                ]
              },
            ]
          }
        }
      }
    };
    api.get.mockImplementation(() => Promise.resolve(resp));

    // work
    const result = await CatalogService.catalogSearch('PAGES_SEARCH_REQUEST_TEST', dispatch, 'sss');

    // expect
    expect(result.data).toEqual(resp.data.data);
  });

  it("catches errors in method catalogSearch", async () => {

    const resp = {
      problem: 'true',
      data: {

      }
    };
    api.get.mockImplementation(() => Promise.resolve(resp));

    // work
    const result = await CatalogService.catalogSearch('PAGES_SEARCH_REQUEST_TEST', dispatch, 'sss');

    // expect
    expect(result).toBeNull();
  });

});
