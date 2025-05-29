import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Link } from '@remix-run/react';
import { getSeoMeta } from '@shopify/hydrogen';

export async function loader({ context }: LoaderFunctionArgs) {
  const data = await context.storefront.query(POLICIES_QUERY);
  const policies = Object.values(data.shop || {});

  if (!policies.length) {
    throw new Response('No policies found', { status: 404 });
  }

  return { policies };
}


export const meta = () => {
  return getSeoMeta({
    title: "Nullspace | Policies",
    description: 'Eyewear that merges technology with timeless aesthetics. built for those who see beyond the ordinary.'
  });

};


export default function Policies() {
  const { policies } = useLoaderData<typeof loader>();

  return (
    <div className="policies content-wrapper">
      <h1>Policies</h1>
      <div>
        {policies.map((policy) => {
          if (!policy) return null;
          return (

            <Link key={policy.id} to={`/policies/${policy.handle}`}>- {policy.title}</Link>

          );
        })}
      </div>
    </div>
  );
}

const POLICIES_QUERY = `#graphql
  fragment PolicyItem on ShopPolicy {
    id
    title
    handle
  }
  query Policies ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    shop {
      privacyPolicy {
        ...PolicyItem
      }
      shippingPolicy {
        ...PolicyItem
      }
      termsOfService {
        ...PolicyItem
      }
      refundPolicy {
        ...PolicyItem
      }
      subscriptionPolicy {
        id
        title
        handle
      }
    }
  }
` as const;
