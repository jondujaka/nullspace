import styles from './ImagesSection.module.scss'

import { Link } from 'react-router';
import { Image, Money } from "@shopify/hydrogen";
import { HomeImagesSectionQuery, ProductItemFragment } from 'storefrontapi.generated';
import { useVariantUrl } from "~/lib/variants";
import BrandedLink from '../BrandedLink/BrandedLink';
import useElementOnScreen from '~/hooks/useElementOnScreen';

export default function ImagesSection({ items }: { items: HomeImagesSectionQuery['metaobjects']['nodes'] }) {



    return <div className={styles.products}>{items.map((item, i) => <ProductImage product={item} key={`product-image-${i}`} />)}
    </div>
}


function ProductImage({ product }: { product: HomeImagesSectionQuery['metaobjects']['nodes'][0] }) {

    const [containerRef, isVisible] = useElementOnScreen({
        threshold: .5,
        reappear: true,
    });

    if (!product) {
        return null;
    }


    const featuredImage = product.fields.find(field => field.type === 'file_reference')?.reference;

    const productData = product.fields.find(field => field.type === 'product_reference');

    const title = product.fields.find(field => field.type === 'single_line_text_field')?.value;


    if (!productData || !featuredImage) {
        return null;
    }

    return <div className={styles.productItem}
    >
        <Link

            prefetch="intent"
            to={`/products/${productData.reference?.handle}`}
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

            <div className={` ${styles.productInfo} ${isVisible && styles.isVisible}`} ref={containerRef}>
                <div className={styles.textWrapper}><BrandedLink isActive text={title ?? productData.reference.title} /></div>
            </div>
        </Link>
    </div>
}