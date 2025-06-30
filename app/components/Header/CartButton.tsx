import { Suspense } from 'react';
import { Await, NavLink, useAsyncValue } from 'react-router';

import { useAside } from '../Aside/Aside';
import { CartViewPayload, useAnalytics, useOptimisticCart } from '@shopify/hydrogen';
import { CartApiQueryFragment } from 'storefrontapi.generated';
import BrandedLink from '../BrandedLink/BrandedLink';

export default function CartButton({ cart, className }: { cart: Promise<CartApiQueryFragment | null>, className?: string }) {
    return (
        <Suspense fallback={<CartBadge count={null} />}>
            <Await resolve={cart}>
                <CartBanner className={className} />
            </Await>
        </Suspense>
    );
}



function CartBadge({ count, className }: { count: number | null, className?: string }) {
    const { open } = useAside();
    const { publish, shop, cart, prevCart } = useAnalytics();

    return (
        <a
            href="/cart"
            onClick={(e) => {
                e.preventDefault();
                open('cart');
                publish('cart_viewed', {
                    cart,
                    prevCart,
                    shop,
                    url: window.location.href || '',
                } as CartViewPayload);
            }}
            className={className}
        >
            {/* <BrandedLink text={`cart ${count === null ? `&nbsp` : `(${count})`}`} /> */}
            <span>{count}</span>

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-sentry-element="svg" data-sentry-component="ShoppingBagIcon" data-sentry-source-file="ShoppingBagIcon.tsx"><path d="M4.6 6.6H19.4V20.9H4.6V6.6Z" stroke="black" stroke-width="1.2" data-sentry-element="path" data-sentry-source-file="ShoppingBagIcon.tsx"></path><path d="M15.2988 5.9998C15.2988 3.68021 13.8219 1.7998 12 1.7998C10.1781 1.7998 8.70117 3.68021 8.70117 5.9998" stroke="black" stroke-width="1.2" data-sentry-element="path" data-sentry-source-file="ShoppingBagIcon.tsx"></path></svg>
        </a>
    );
}



function CartBanner({ className }: { className?: string }) {
    const originalCart = useAsyncValue() as CartApiQueryFragment | null;
    const cart = useOptimisticCart(originalCart);
    return <CartBadge count={cart?.totalQuantity ?? 0} className={className} />;
}