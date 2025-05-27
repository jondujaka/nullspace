import styles from './ShopProducts.module.scss';

import { Link } from "@remix-run/react";
import { Image, Money } from "@shopify/hydrogen";
import { ShopProductsQuery } from "storefrontapi.generated";
import { useVariantUrl } from "~/lib/variants";


type Product = ShopProductsQuery['products']['nodes'][0]

export default function ShopProducts({ products, isSmall }: { products: ShopProductsQuery['products']['nodes'], isSmall?: boolean }) {


    if (!products) {
        return;
    }
    return <div className={`${styles.productsWrapper} ${isSmall ? styles.smallWrapper : ""}`}>{products.map(product => <ProductItem key={product.id} product={product} />)} </div>
}



function ProductItem({
    product,
}: {
    product: Product;
}) {


    const productUrl = `/products/${product.handle}`
    const variant = product.variants?.nodes[0];

    const thumbnail = product.metafield?.reference?.image;

    const [productTitle, color] = product.title.split(" ")

    console.log({product })

    return (
        <Link
            className={styles.product}
            prefetch="intent"
            to={productUrl}
        >

            <h5 className={styles.color}>{color}</h5>
            {thumbnail && (
                <Image
                    alt={thumbnail.altText || product.title}
                    aspectRatio="465/581"
                    data={thumbnail}
                    loading="eager"
                    sizes="(min-width: 45em) 800px, 100vw"
                />
            )}

            <div className={styles.productInfo}>
                <h4>{productTitle}</h4>
                {variant && <Money data={variant.price} withoutTrailingZeros />}

            </div>
        </Link>
    );
}