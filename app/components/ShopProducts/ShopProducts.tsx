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
    return <div className={`${styles.productsWrapper} ${isSmall ? styles.smallWrapper : ""}`}>{products.map(product => <ProductItem isSmall key={product.id} product={product} />)} </div>
}



function ProductItem({
    product, isSmall
}: {
    product: Product;
    isSmall?: boolean;
}) {


    const productUrl = `/products/${product.handle}`
    const variant = product.variants?.nodes[0];
    const metafields = product.metafields;


    const thumbnail = metafields?.find(meta => meta?.key === "thumbnail")?.reference?.image;
    const thumbnailSide = metafields?.find(meta => meta?.key === "thumbnail_side")?.reference?.image;


    const [productTitle, color] = product.title.split(" ")

    const sizesSmall = '(min-width: 768px ) 25vw, (min-width: 1140px) 15vw, 33vw';
    const sizesLarge = "(min-width: 768px) 25vw, (min-width: 768px) 33vw, 200vw";

    const sizes = isSmall ? sizesSmall : sizesLarge;

    return (
        <Link
            className={`${styles.product} ${true && styles.productWithSideImage} `}
            prefetch="intent"
            to={productUrl}
        >

            <h5 className={styles.color}>({color})</h5>
            <div className={styles.image}>{thumbnail && (
                <Image
                    alt={thumbnail.altText || product.title}
                    aspectRatio="1"
                    data={thumbnail}
                    loading="eager"
                    sizes={sizes}
                />
            )}

                {thumbnailSide && (
                    <Image
                        alt={thumbnailSide.altText || product.title}
                        aspectRatio="1"
                        data={thumbnailSide}
                        className={styles.secondImage}
                        loading="eager"
                        sizes={sizes}
                    />
                )}</div>

            <div className={styles.productInfo}>
                <h4>{productTitle}</h4>
                {variant && <Money data={variant.price} withoutTrailingZeros />}

            </div>
        </Link>
    );
}