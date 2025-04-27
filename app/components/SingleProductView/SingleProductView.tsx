import styles from './SingleProductView.module.scss'
import { MappedProductOptions, Money } from "@shopify/hydrogen";
import { Product, ProductVariant } from "@shopify/hydrogen/storefront-api-types";
import { ProductItemFragment } from "storefrontapi.generated";
import { AddToCartButton } from '../AddToCartButton';
import { useAside } from '../Aside';
import Carousel from '../Carousel/Carousel';




export default function SingleProductView({ product, selectedVariant, productOptions }: { product: Product, selectedVariant: ProductVariant, productOptions: MappedProductOptions[] }) {

    const { open } = useAside();
    console.log({ productOptions, product, selectedVariant })

    const colorOptions = productOptions.find(option => option.name === 'Color');
    const selectedColor = selectedVariant.selectedOptions.find(option => option.name === 'Color');

    const variantImages = product.media.nodes.filter(mediaNode => {
        if (mediaNode.__typename !== 'MediaImage') {
            return false;
        }

        const mediaAlt = mediaNode?.image?.altText;

        if (!mediaAlt) {
            return false;
        }
        if (!mediaAlt.startsWith('#')) {
            return false;
        }

        const string = mediaAlt.substring(1).split("_");
        if (string[0] !== 'color') {
            return false;
        }

        return string[1] && string[1].toLowerCase() === selectedColor?.value.toLowerCase();
    }).filter(node => node.__typename === 'MediaImage')

    console.log({ variantImages })

    return <div className={styles.wrapper}>

        <div className={styles.hero}>
            <div className={styles.carouselWrapper}><Carousel items={variantImages} /></div>
            <div className={styles.description}>
                <p>Mauretania, stretching from central Algeria to the Moroccan Atlantic coast, is a frame inspired by the ancient region of Maghreb, renowned as the land of a million poets. Drawing from the historical city of Tangier the Mauretania frame pays homage to the Moors and their vibrant cultural heritage. Part of our permanent Ihsan collection, the Mauretania features an oversize square frame and is available in three distinct acetates and three lens colors.</p>
            </div>
        </div>

        <div className={styles.shoppingInfo}>
            <div className={styles.productTitle}>
                <h1> {product.title}</h1>
                <Money className={styles.variantPrice} data={selectedVariant.price} withoutTrailingZeros />

            </div>
            <div className={styles.buttons}>
                <div className={styles.button}>
                    <AddToCartButton
                        disabled={!selectedVariant || !selectedVariant.availableForSale}
                        onClick={() => {
                            open('cart');
                        }}
                        lines={
                            selectedVariant
                                ? [
                                    {
                                        merchandiseId: selectedVariant.id,
                                        quantity: 1,
                                        selectedVariant,
                                    },
                                ]
                                : []
                        }
                    >
                        {selectedVariant?.availableForSale ? '[Add to cart]' : 'Sold out'}
                    </AddToCartButton>
                </div>
            </div>
        </div>

        <div className={styles.longDescription} dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        {colorOptions && colorOptions.optionValues.map(opt => opt.name)}</div>
}