import {IProductPropFullData} from "../../../interfaces/product";

export const productPropsFixture: IProductPropFullData = {
  attributes: {
    auto_focus: "yes",
    brand: "Samsung",
    bundled_product: "Yes",
    camera_type: "Compact camera"
  },
  availability: true,
  availableQuantity: 3,
  description: "This is a unique product bundle featuring various Samsung products.",
  images: [
    {
      externalUrlLarge: "//images.icecat.biz/img/norm/high/26935356-6244.jpg",
      externalUrlSmall: "//images.icecat.biz/img/norm/medium/26935356-6244.jpg",
    }
  ],
  name: "Samsung Bundle",
  price: 95000,
  sku: "214",
  superAttributes: {
    attribute_variants: [],
    product_concrete_ids: ["214_123"],
    super_attributes: [],
  }
};

export const productPropsFixtureSuper: IProductPropFullData = {
  attributes: {
    auto_focus: "yes",
    brand: "Samsung",
    bundled_product: "Yes",
    camera_type: "Compact camera"
  },
  availability: true,
  availableQuantity: 3,
  description: "This is a unique product bundle featuring various Samsung products.",
  images: [
    {
      externalUrlLarge: "//images.icecat.biz/img/norm/high/26935356-6244.jpg",
      externalUrlSmall: "//images.icecat.biz/img/norm/medium/26935356-6244.jpg",
    }
  ],
  name: "Samsung Bundle",
  price: 95000,
  sku: "214",
  superAttributes: {
    attribute_variants: {
      "storage_media:SSD": {
        id_product_concrete: "135_29836399",
      },
      "storage_media:Flash": {
        id_product_concrete: "135_30359386",
      }
    },
    product_concrete_ids: [
      "135_29836399",
      "135_30359386"
    ],
    super_attributes: {
      storage_media: [
        "SSD",
        "Flash"
      ]
    },
  }
};
