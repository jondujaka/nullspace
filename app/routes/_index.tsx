import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction } from 'react-router';

import Carousel from '~/components/Carousel/Carousel';
import ImagesSection from '~/components/Products/ImagesSection';
import LinkSection from '~/components/LinkSection/LinkSection';
import AboutSection from '~/components/AboutSection/AboutSection';
import ShopProducts from '~/components/ShopProducts/ShopProducts';
import { getSeoMeta, Image } from '@shopify/hydrogen';
import { Image as ImageType } from '@shopify/hydrogen/storefront-api-types';
import useElementOnScreen from '~/hooks/useElementOnScreen';
import { Wrapper } from '~/components/ImageWithText/ImageWithText';
import Video from '~/components/Video/Video';
import HomeVideo from '~/components/HomeVideo/HomeVideo';
import Marquee from '~/components/Marquee/Marquee';
import ProductHighlights from '~/components/ProductHighlights/ProductHighlights';
import HomeProducts from '~/components/HomeProducts/HomeProducts';

export const meta: MetaFunction = () => {

  return getSeoMeta({
    title: "NULLSPACE",
    description: 'Eyewear that merges technology with timeless aesthetics. built for those who see beyond the ordinary.'
  });

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
  const [{ products }, { metaobject }, { metaobjects }, { metaobjects: productHighlights }, { products: allProducts }] = await Promise.all([
    context.storefront.query(HOME_PRODUCTS),
    context.storefront.query(HOME_VIDEOS_QUERY),
    context.storefront.query(HOME_IMAGES_SECTION),
    context.storefront.query(PRODUCT_HIGHLIGHTS),
    context.storefront.query(HOME_ALL_PRODUCTS),


    // Add other queries here, so that they are loaded in parallel
  ]);


  return {
    homeProducts: products.nodes,
    metaobject: metaobject,
    imagesSection: metaobjects.nodes,
    allProducts: allProducts,
    productHighlights
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */




export default function Homepage() {
  const data = useLoaderData<typeof loader>();


  const productHighlights = data.productHighlights;



  const carouselMeta = data.metaobject?.fields.find(field => field.key === 'home_page_videos')
  const carouselItems = carouselMeta?.references?.nodes.filter(Boolean);


  const text = data.metaobject?.fields.find(field => field.key === "home_page_text_section")?.value;
  const textUnder = data.metaobject?.fields.find(field => field.key === "home_page_text_section_2")?.value;
  const image = data.metaobject?.fields.find(field => field.key === "home_page_image")?.reference;

  const secondaryImages = data.metaobject?.fields.find(field => field.key === "secondary_images")?.references?.nodes;
  const mainImages = data.metaobject?.fields.find(field => field.key === "main_images")?.references?.nodes;

  const allproducts = data?.allProducts;

  const finalVideo = secondaryImages && secondaryImages[0];

  return (
    <div className="home">
      {carouselItems && <HomeVideo lazy video={carouselItems[0]} />}

      {allproducts?.nodes && <ShopProducts products={allproducts.nodes} isSmall />}


      {/* {mainImages && <Wrapper images={mainImages} isEager text={text} />} */}

      <ProductHighlights items={productHighlights} />

      
      {image && text && <AboutSection richtext={textUnder} image={image} />}

      
      {allproducts?.nodes && <HomeProducts products={allproducts.nodes} />}

      {finalVideo && <Video lazy video={finalVideo} id="campaign" />}


{/* 
      <LinkSection text="VIEW FULL COLLECTION" link="/products" /> */}

      {/* {secondaryImges && <Wrapper images={secondaryImges} />} */}
    </div>
  );
}



const HOME_IMAGES_SECTION = `#graphql


  fragment ImagesSetionImage on MediaImage {
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

  fragment ImagesSetionProduct on Product {
    id
    title
    handle
  }

  query HomeImagesSection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
      metaobjects(type: "home_page_second_section", first: 10) {
        nodes {
          id
          fields {
            type
            value
            reference {
              ...ImagesSetionImage
              ...ImagesSetionProduct
            }
          }
        }
      }
  }
  
` as const;



const PRODUCT_HIGHLIGHTS = `#graphql


  fragment ProductImage on MediaImage {
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

  fragment ProductInfo on Product {
    id
    title
    handle
  }

  query ProductHighlightsQuery($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
      metaobjects(type: "product_highlight", first: 10, reverse: true) {
        nodes {
          id
          fields {
            type
            value
            reference {
              ...ProductImage
              ...ProductInfo
            }
          }
        }
      }
  }
  
` as const;

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
    metafield(key: "featured_image", namespace: "custom") {
      id
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

  query HomeProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 2, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...HomeProducts
      }
    }
  }
` as const;


const HOME_ALL_PRODUCTS = `#graphql

  fragment HomeProductVariant on ProductVariant {
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

  fragment HomeAllProductsItem on Product {
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
        ...HomeProductVariant
      }
    }

    

    
    metafields(identifiers: [
          { namespace: "custom", key: "thumbnail" },
          { namespace: "custom", key: "thumbnail_side" },
          { namespace: "custom", key: "thumbnail_model" },
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


   query HomeAllProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 20, sortKey: TITLE, reverse:true) {
      nodes {
        ...HomeAllProductsItem
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
        type
        key
        references(first: 10){
          nodes {
            ...VideoObject
            ...ImageObject
          }
        }
          reference {
          ...ImageObject
          }
      }
    }
  }
` as const;

