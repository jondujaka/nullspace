import styles from './SingleProductView.module.scss'
import { MappedProductOptions, Money, RichText } from "@shopify/hydrogen";
import { Product, ProductVariant } from "@shopify/hydrogen/storefront-api-types";
import { ProductItemFragment } from "storefrontapi.generated";
import { AddToCartButton } from '../AddToCartButton';
import { useAside } from '../Aside/Aside';
import Carousel from '../Carousel/Carousel';




export default function SingleProductView({ product, selectedVariant, productOptions }: { product: Product, selectedVariant: ProductVariant, productOptions: MappedProductOptions[] }) {

    const { open } = useAside();

    const colorOptions = productOptions.find(option => option.name === 'Color');
    const selectedColor = selectedVariant.selectedOptions.find(option => option.name === 'Color');

    const productImages = product.media.nodes.filter(node => node.__typename === 'MediaImage')

    const lensDescription = product.metafield?.reference?.fields;

    const lensTitle = lensDescription.find(field => field.key === 'title')?.value
    const filterCategory = lensDescription.find(field => field.key === 'filter_category')?.value
    const lensDescriptionText = lensDescription.find(field => field.key === 'lens-description')?.value

    return <div className={styles.wrapper}>

        <div className={styles.hero}>
            <div className={styles.carouselWrapper}><Carousel items={productImages} /></div>
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
                        {selectedVariant?.availableForSale ? '[ Add to cart ]' : 'Sold out'}
                    </AddToCartButton>
                </div>
            </div>
        </div>

        <div className={styles.longDescription} dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        {lensDescription && (
            <div className={styles.lensDescription}>
                <div>
                    <h3>{lensTitle}</h3>
                    <span className={styles.category}>Filter category: {filterCategory}</span>
                </div>
                <RichText className={styles.richText} data={lensDescriptionText} />
            </div>
        )}
        {colorOptions && colorOptions.optionValues.map(opt => opt.name)}</div>
}