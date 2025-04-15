import styles from './Products.module.scss'

import { Link } from "@remix-run/react";
import { Image, Money } from "@shopify/hydrogen";
import { ProductItemFragment } from "storefrontapi.generated";
import { useVariantUrl } from "~/lib/variants";

export default function Products({ items }: { items: ProductItemFragment[] }) {

    return <div className={styles.products}>{items.map(product => {


        const variantUrl = useVariantUrl(product.handle);

        return <div className={styles.productItem}
            key={product.id}>
            <Link

                prefetch="intent"
                to={variantUrl}
            >
                {product.featuredImage && (
                    <Image
                        alt={product.featuredImage.altText || product.title}
                        aspectRatio="1/1"
                        data={product.featuredImage}
                        // loading={loading}
                        sizes="(min-width: 45em) 400px, 100vw"
                    />
                )}

                <div className={styles.productInfo}>
                <h4>{product.title}</h4>
                <small>
                    <Money data={product.priceRange.minVariantPrice} />
                </small>
                </div>
            </Link>
        </div>
    })}
    </div>
}
