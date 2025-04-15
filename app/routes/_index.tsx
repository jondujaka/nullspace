import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction } from '@remix-run/react';

import Carousel from '~/components/Carousel/Carousel';
import Products from '~/components/Products/Products';

export const meta: MetaFunction = () => {
  return [{ title: 'Hydrogen | Home' }];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context }: LoaderFunctionArgs) {
  const [{ products }, { metaobject }] = await Promise.all([
    context.storefront.query(HOME_PRODUCTS),
    context.storefront.query(HOME_VIDEOS_QUERY)
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    homeProducts: products.nodes,
    metaobject: metaobject?.fields[0]
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */


export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  const carouselItems = data.metaobject?.references?.nodes.filter(Boolean);

  return (
    <div className="home">

      {carouselItems && <Carousel items={carouselItems} />}
      <Products items={data.homeProducts} />
      
    </div>
  );
}


const HOME_PRODUCTS = `#graphql
  fragment HomeProducts on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
        maxVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      altText
      url
      width
      height
    }
  }

  query HomeProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 2, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...HomeProducts
      }
    }
  }
` as const;


const HOME_VIDEOS_QUERY = `#graphql


  fragment VideoObject on Video {
    id
    __typename
    sources {
      url
      width
      mimeType
      height
      format
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


  query HomePageMetaObjects($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    metaobject(handle: {handle: "home-page-ubjrgxn5", type: "home_page"}) {
      id
      fields {
        value
        references(first: 10){
          nodes {
            ...VideoObject
            ...ImageObject
          }
        }
      }
    }
  }
` as const;

