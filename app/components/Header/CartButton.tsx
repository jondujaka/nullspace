import { Suspense } from 'react';
import { Await, NavLink, useAsyncValue } from '@remix-run/react';

import { useAside } from '../Aside';
import { CartViewPayload, useAnalytics, useOptimisticCart } from '@shopify/hydrogen';
import { CartApiQueryFragment } from 'storefrontapi.generated';

export default function CartButton({ cart }: {cart: Promise<CartApiQueryFragment | null>}) {
    return (
        <Suspense fallback={<CartBadge count={null} />}>
            <Await resolve={cart}>
                <CartBanner />
            </Await>
        </Suspense>
    );
}

function CartBadge({ count }: { count: number | null }) {
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
        >
            Cart {count === null ? <span>&nbsp;</span> : `(${count})`}
        </a>
    );
}



function CartBanner() {
    const originalCart = useAsyncValue() as CartApiQueryFragment | null;
    const cart = useOptimisticCart(originalCart);
    return <CartBadge count={cart?.totalQuantity ?? 0} />;
}