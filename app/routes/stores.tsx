import { LoaderFunctionArgs, useLoaderData, useRouteLoaderData } from "react-router";
import StoresPage from "~/components/StoresPage/StoresPage";
import { STORES_QUERY } from "~/lib/fragments";
import { RootLoader } from "~/root";


async function loadCriticalData({ context }: LoaderFunctionArgs) {
    const { storefront } = context;

    const stores = await storefront.query(STORES_QUERY)

    return { stores };
}


export async function loader(args: LoaderFunctionArgs) {
    // Start fetching non-critical data without blocking time to first byte


    // Await the critical data required to render initial state of the page
    const criticalData = await loadCriticalData(args);

    return { ...criticalData };
}

export default function Stores() {

    const data = useLoaderData<typeof loader>();

    const storesList = data.stores.metaobjects.nodes;

    return <StoresPage storesList={storesList}/>
}