import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction } from 'react-router';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
  getSeoMeta,
} from '@shopify/hydrogen';

import SingleProductView from '~/components/SingleProductView/SingleProductView';
import RelatedProducts from '~/components/RelatedProducts/RelatedProducts';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return getSeoMeta({
    title: `NULLSPACE | ${data?.product.title ?? ''}`,
    description: 'Eyewear that merges technology with timeless aesthetics. built for those who see beyond the ordinary.'
  })
};



export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  context,
  params,
  request,
}: LoaderFunctionArgs) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{ product }, { shop }, products] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: { handle, selectedOptions: getSelectedProductOptions(request) },
    }),
    storefront.query(SHIPPING_QUERY),
    storefront.query(PRODUCT_ALL_PRODUCTS)
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }


  return {
    product,
    shipping: shop.shippingPolicy,
    allProducts: products
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context, params }: LoaderFunctionArgs) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export default function Product() {
  const { product, shipping, allProducts } = useLoaderData<typeof loader>();


  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const { title, descriptionHtml } = product;

  const carouselItems = product.media.nodes;



  return (
    <div className="product">
      <SingleProductView product={product} selectedVariant={selectedVariant} productOptions={productOptions} shipping={shipping} />
      <RelatedProducts products={allProducts} current={product.id}/>
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    media(first: 10){
      nodes {
        ... on MediaImage {
          id
          __typename
          previewImage {
            width
            url
            id
            height
            altText
          }
          image {
            width
            url
            id
            height
            altText
          }
        }
      }
    }

    metafields(identifiers: [
          { namespace: "custom", key: "lens" },
          { namespace: "custom", key: "product_short_description" }
        ]) {
      id
      key
      value
      reference {
        ... on Metaobject {
          id
          fields {
            value
            key
          }
        }
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;


const SHIPPING_QUERY = `#graphql
  fragment ProductShippingPolicy on ShopPolicy {
    body
    handle
    id
    title
    url
  }
  query ShippingPolicy(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    shop {
      shippingPolicy {
        ...ProductShippingPolicy
      }
    }
  }
` as const;



const PRODUCT_ALL_PRODUCTS = `#graphql

  fragment ProductProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }

  fragment ProductAllProductsItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    variants(first: 1) {
      nodes {
        ...ProductProductVariant
      }
    }

    

    
    metafields(identifiers: [
          { namespace: "custom", key: "thumbnail" },
          { namespace: "custom", key: "thumbnail_side" },
        ]) {
      id
      key
      reference {
        ... on MediaImage {
          id
          image {
            originalSrc
            src
            transformedSrc
            width
            url
            height
            id
            altText
          }
        }
      }
    }
  }


   query ProductAllProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 20, sortKey: TITLE, reverse:true) {
      nodes {
        ...ProductAllProductsItem
      }
    }
  }
` as const;
