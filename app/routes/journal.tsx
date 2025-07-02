import { useLoaderData } from "react-router";
import { LoaderFunctionArgs } from "react-router";
import { getSeoMeta } from "@shopify/hydrogen";
import JournalPage from "~/components/JournalPage/JournalPage";

export const meta = () => {
  return getSeoMeta({
    title: "NULLSPACE | Journal",
    description: 'Eyewear that merges technology with timeless aesthetics. built for those who see beyond the ordinary.'
  });

};


export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte


  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...criticalData };
}



async function loadCriticalData({ context }: LoaderFunctionArgs) {
  const result = await context.storefront.query(JOURNAL_MEDIA)

  return {
    media: result.metaobject?.fields
  };
}


export default function Journal() {

  const data = useLoaderData<typeof loader>();

  const metaObject = data.media && data.media[0]

  const items = metaObject?.references?.nodes;
  return items && <JournalPage media={items} />
}


const JOURNAL_MEDIA = `#graphql 

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

  query JournalMetaObjects($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    metaobject(handle: {handle: "journal-6dwwqnuc", type: "journal"}) {
      id
      fields {
        value
        type
        references(first: 200){
          nodes {
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