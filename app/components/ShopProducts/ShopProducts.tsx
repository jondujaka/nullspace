import styles from './ShopProducts.module.scss';

import { Link } from "@remix-run/react";
import { Image, Money } from "@shopify/hydrogen";
import { ShopProductsQuery } from "storefrontapi.generated";
import { useVariantUrl } from "~/lib/variants";


type Variant = ShopProductsQuery['products']['nodes'][0]['variants']['nodes'][0];

export default function ShopProducts({ variants }: { variants: Variant[] }) {
    return <div className={styles.productsWrapper}>{variants.map(variant => <ProductItem variant={variant} />)} </div>
}



function ProductItem({
    variant,
}: {
    variant: Variant;
}) {

    const variantUrl = useVariantUrl(variant.product.handle, variant.selectedOptions);

    const thumbnail = variant.image;

    return (
        <Link
            className={styles.product}
            key={variant.id}
            prefetch="intent"
            to={variantUrl}
        >
            {thumbnail && (
                <Image
                    alt={thumbnail.altText || variant.title}
                    aspectRatio="465/581"
                    data={thumbnail}
                    loading="eager"
                    sizes="(min-width: 45em) 800px, 100vw"
                />
            )}

            <div className={styles.productInfo}>
                <h4>{variant.product.title}({variant.title})</h4>
                <Money data={variant.price} withoutTrailingZeros />

            </div>
        </Link>
    );
}