import * as React from 'react';
import { HTMLAttributes, shallow, ShallowWrapper, mount } from "enzyme";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import renderer from 'react-test-renderer';

import {getFormattedPrice} from '../../../../../src/shared/services/priceFormatter';
import {
  ProductCardBase
} from '../../../../../src/shared/components/Common/ProductCard';
import {styles} from '../../../../../src/shared/components/Common/ProductCard/styles';


// Required props
const abstract_sku = "191";
const abstract_name = "test_name";
const price = 22222;
const images = [
  {
    "external_url_small": "//images.icecat.biz/img/gallery_mediums/img_17681791_medium_1482143992_4607_19487.jpg",
    "external_url_large": "//images.icecat.biz/img/norm/high/17681791-4446.jpg"
  }
];
const currency = "EUR";

const dispatch = () => null;

const getShallowedComponent = () => (
  shallow(
    <ProductCardBase
      abstract_sku={abstract_sku}
      abstract_name={abstract_name}
      price={price}
      images={images}
      currency={currency}
      classes={styles}
    />
  )
);

describe('components->Common->ProductCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper =  getShallowedComponent();
  });

  it("renders the component", () => {
    expect(wrapper.find(Card)).toHaveLength(1);
  });

  it("renders the image block", () => {
    expect(wrapper.find(CardMedia)).toHaveLength(1);
  });

  it("renders the image", () => {
    expect(wrapper.find(CardMedia).dive().dive().find('img').prop('src')).toEqual(images[0].external_url_small);
  });

  it("renders the product Name", () => {
    expect(wrapper.find('[data-type="productName"]').dive().dive().text()).toEqual(abstract_name);
  });

  it("renders the price", () => {
    expect(wrapper.find('[data-type="priceToShow"]').dive().dive().text()).toEqual(getFormattedPrice(price, currency));
  });

});

describe('components->Common->ProductCard: snapshot', () => {

  it('renders correctly', () => {
    const tree = renderer
      .create(
        getShallowedComponent()
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly if something is missed', () => {
    const tree = renderer
      .create(
        <ProductCardBase
          abstract_sku={null}
          abstract_name={null}
          price={null}
          images={null}
          currency={currency}
          classes={styles}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
