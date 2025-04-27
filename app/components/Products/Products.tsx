import styles from './Products.module.scss'

import { Link } from "@remix-run/react";
import { Image, Money } from "@shopify/hydrogen";
import { ProductItemFragment } from 'storefrontapi.generated';
import { useVariantUrl } from "~/lib/variants";
import BrandedLink from '../BrandedLink/BrandedLink';

export default function Products({ items }: { items: ProductItemFragment[] }) {


    return <div className={styles.products}>{items.map(product => {


        const variantUrl = useVariantUrl(product.handle);


        // @ts-expect-error codegen ???
        const featuredImage = product.metafield.reference.image;

        return <div className={styles.productItem}
            key={product.id}>
            <Link

                prefetch="intent"
                to={variantUrl}
            >
                {featuredImage && (
                    <Image
                        alt={featuredImage.altText || product.title}
                        aspectRatio="1/1"
                        data={featuredImage}
                        // loading={loading}
                        sizes="(min-width: 45em) 1200px, 100vw"
                    />
                )}

                <div className={styles.productInfo}>
                    <div className={styles.textWrapper}><BrandedLink isActive text={product.title} /></div>
                </div>
            </Link>
        </div>
    })}
    </div>
}
