import styles from './ShopProducts.module.scss';

import { Link } from "@remix-run/react";
import { Image, Money } from "@shopify/hydrogen";
import { ShopProductsQuery } from "storefrontapi.generated";
import { useVariantUrl } from "~/lib/variants";


type Product = ShopProductsQuery['products']['nodes'][0]

export default function ShopProducts({ products }: { products: ShopProductsQuery['products']['nodes'] }) {
    
    return <div className={styles.productsWrapper}>{products.map(product => <ProductItem key={product.id} product={product} />)} </div>
}



function ProductItem({
    product,
}: {
    product: Product;
}) {

    
    const productUrl = `/products/${product.handle}`
    const variant = product.variants.nodes[0];

    const thumbnail = product.metafield?.reference?.image

    return (
        <Link
            className={styles.product}
            prefetch="intent"
            to={productUrl}
        >
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
                <h4>{product.title}</h4>
                <Money data={variant.price} withoutTrailingZeros />

            </div>
        </Link>
    );
}