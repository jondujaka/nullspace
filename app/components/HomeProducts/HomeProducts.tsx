import styles from './HomeProducts.module.scss';

import { Link } from "react-router";
import { CartForm, getAdjacentAndFirstAvailableVariants, Image, Money, useOptimisticVariant } from "@shopify/hydrogen";
import { ShopProductsQuery } from "storefrontapi.generated";
import { useVariantUrl } from "~/lib/variants";
import { AddToCartButton, CartProvider, useCart } from '@shopify/hydrogen-react';
import { useAside } from '../Aside/Aside';


type Product = ShopProductsQuery['products']['nodes'][0]

export default function HomeProducts({ products }: { products: ShopProductsQuery['products']['nodes'], }) {


    if (!products) {
        return;
    }
    return <>
        <CartProvider
            onLineAdd={() => {
                console.log('a line is being added');
            }}
            onLineAddComplete={() => {
                console.log('a line has been added');
            }}
        >
            <div className={styles.productsWrapper}>
                {products.map(product => <ProductItem key={product.id} product={product} />)}
            </div></CartProvider>
    </>
}



function ProductItem({
    product
}: {
    product: Product;
}) {

    const { open } = useAside();


    const productUrl = `/products/${product.handle}`
    const variant = product.variants?.nodes[0];
    const metafields = product.metafields;


    const thumbnailModel = metafields?.find(meta => meta?.key === "thumbnail_model")?.reference?.image;
    const thumbnail = metafields?.find(meta => meta?.key === "thumbnail")?.reference?.image;

    const renderedThumbnail = thumbnailModel ?? thumbnail


    // const [productTitle, color] = product.title.split(" ")

    const sizes = '(min-width: 768px ) 33vw, 400px';




    const lines = [
        {
            merchandiseId: variant.id,
            quantity: 1,
        },
    ];

    return (
        <div
            className={`${styles.product} ${true && styles.productWithSideImage} `}
        // prefetch="intent"
        // to={productUrl}
        >


            <div className={styles.image}>{renderedThumbnail && (
                <Image
                    alt={renderedThumbnail.altText || product.title}
                    aspectRatio="1"
                    data={renderedThumbnail}
                    loading="eager"
                    sizes={sizes}
                />
            )}
            </div>

            <div className={styles.productInfo}>
                <h4>{product.title}</h4>
                {variant && <Money data={variant.price} withoutTrailingZeros />}
                <CartForm
                    route="/cart"
                    action={CartForm.ACTIONS.LinesAdd}
                    inputs={{ lines }}

                >
                    <button className={styles.addToCart} onClick={() => {
                        open('cart');
                    }} type="submit">
                        Add to cart
                    </button>
                </CartForm>
            </div>
        </div>

    );
}