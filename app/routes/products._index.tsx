import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import {
  getPaginationVariables,
  getSeoMeta,
} from '@shopify/hydrogen';
import ShopProducts from '~/components/ShopProducts/ShopProducts';
import ShopImage from '~/components/ShopImage/ShopImage';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return getSeoMeta({
    title: "NULLSPACE | Products",
    description: 'Eyewear that merges technology with timeless aesthetics. built for those who see beyond the ordinary.'
  });

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
  const { storefront } = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  const [{ products }, { metaobject }] = await Promise.all([
    storefront.query(PRODUCTS_QUERY),
    storefront.query(HEADER_IMAGE_QUERY)
  ]);

  if (!products) {
    throw new Response(`Products not found`, {
      status: 404,
    });
  }

  return { products: products.nodes, metaobject }
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: LoaderFunctionArgs) {
  return {};
}

export default function Products() {
  const { products, metaobject } = useLoaderData<typeof loader>();
  const headerMeta = metaobject?.fields[0].reference;

  return (
    <div className="collection">

      {headerMeta && <ShopImage image={headerMeta} />}
      <ShopProducts products={products} />

      {/* <Analytics.CollectionView
                data={{
                    collection: {
                        id: collection.id,
                        handle: collection.handle,
                    },
                }}
            /> */}
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
`

const PRODUCT_ITEM_FRAGMENT = `#graphql

  

  fragment ProductItem on Product {
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
    metafields(identifiers: [
          { namespace: "custom", key: "thumbnail" },
          { namespace: "custom", key: "thumbnail_side" }
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
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;



const PRODUCTS_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query ShopProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 20, sortKey: TITLE, reverse: true) {
      nodes {
        ...ProductItem
      }
    }
  }
` as const;


const HEADER_IMAGE_QUERY = `#graphql
  fragment ImageObject on MediaImage {
    id
    __typename
    
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
    previewImage {
      originalSrc
      src
      transformedSrc
      width
      url
      height
      id
      altText
    }
    presentation {
      id
    }
    mediaContentType
    alt
  }

  query MetaObjects($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    metaobject(handle: {handle: "shop-page-bhae8tlz", type: "shop_page"}) {
      id
      fields {
        value
        type
        reference {
        ...ImageObject
        }
      }
    }
  }

  `