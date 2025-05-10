import styles from './ImagesSection.module.scss'

import { Link } from "@remix-run/react";
import { Image, Money } from "@shopify/hydrogen";
import { HomeImagesSectionQuery, ProductItemFragment } from 'storefrontapi.generated';
import { useVariantUrl } from "~/lib/variants";
import BrandedLink from '../BrandedLink/BrandedLink';

export default function ImagesSection({ items }: { items: HomeImagesSectionQuery['metaobjects']['nodes'] }) {


    console.log({ items })



    return <div className={styles.products}>{items.map((item, i) => {


        // const variantUrl = useVariantUrl(product.handle);
        if (!item) {
            return null;
        }


        const featuredImage = item.fields.find(field => field.type === 'file_reference')?.reference;

        const product = item.fields.find(field => field.type === 'product_reference');



        if (!product || !featuredImage) {
            return null;
        }


        return <div className={styles.productItem}
            key={`${product.reference?.id}-${i}`}>
            <Link

                prefetch="intent"
                to={`/products/${product.reference?.handle}`}
            >
                {featuredImage?.image && (
                    <Image
                        alt={featuredImage.image.altText}
                        aspectRatio="1/1"
                        data={featuredImage.image}
                        // loading={loading}
                        sizes="(min-width: 45em) 1200px, 100vw"
                    />
                )}

                <div className={styles.productInfo}>
                    <div className={styles.textWrapper}><BrandedLink isActive text={product.reference?.title} /></div>
                </div>
            </Link>
        </div>
    })}
    </div>
}
