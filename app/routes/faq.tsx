import { useLoaderData } from "@remix-run/react";
import { RichText } from "@shopify/hydrogen";
import { LoaderFunctionArgs, MetaFunction } from "@shopify/remix-oxygen";

export const meta: MetaFunction = () => {
    return [{ title: 'NullSpace | FAQ' }];
};

export async function loader(args: LoaderFunctionArgs) {
    // Start fetching non-critical data without blocking time to first byte


    // Await the critical data required to render initial state of the page
    const criticalData = await loadCriticalData(args);

    return { ...criticalData };
}

async function loadCriticalData({ context }: LoaderFunctionArgs) {
    const result = await
        context.storefront.query(FAQ_PAGE)


    return result
}



export default function Faq() {
    const data = useLoaderData<typeof loader>();

    console.log(data);

    if (!data?.metaobject) {
        return null;
    }

    const title = data.metaobject.fields.find(field => field.key === 'title')?.value
    const content = data.metaobject.fields.find(field => field.key === 'content')?.value
    return <div className="content-wrapper">

        <h1>{title}</h1>
        {content && <RichText data={content} />}
    </div>
}



const FAQ_PAGE = `#graphql

query FaqPage($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
        metaobject(handle: {handle: "frequently-asked-questions-faq", type: "information_pages"}) {
            fields {
                value
                type
                key
            }
        }
    }

` as const;