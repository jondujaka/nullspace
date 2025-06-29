import { useLoaderData } from "react-router";
import { LoaderFunctionArgs } from "react-router";
import { getSeoMeta } from "@shopify/hydrogen";
import AboutPage from "~/components/AboutPage/AboutPage";

export const meta = () => {
    return getSeoMeta({
        title: "NULLSPACE | About",
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
    const result = await
        context.storefront.query(ABOUT_PAGE)


    return result
}


export default function About() {

    const data = useLoaderData<typeof loader>();

    if (!data?.metaobject) {
        return null;
    }
    return <AboutPage data={data.metaobject} />
}


const ABOUT_PAGE = `#graphql

query AboutPage($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
        metaobject(handle: {handle: "about-page-description-zsw7daga", type: "about_page_description"}) {
            fields {
                value
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
                    ... on Video {
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
                }
                type
            }
        }
    }

` as const;