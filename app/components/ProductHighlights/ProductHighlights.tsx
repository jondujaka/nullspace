import { ProductHighlightsQueryQuery } from 'storefrontapi.generated'
import styles from './ProductHighlights.module.scss'
import { Link } from 'react-router'
import { Image } from '@shopify/hydrogen';
export default function ProductHighlights({ items }: { items: ProductHighlightsQueryQuery['metaobjects'] }) {
    return <div className={styles.wrapper}>
        {items.nodes.map(item => <Product item={item} />)}
    </div>
}


function Product({ item }: { item: ProductHighlightsQueryQuery['metaobjects']['nodes'][0] }) {

    const image = item.fields.find(field => field.type === 'file_reference')?.reference;
    const product = item.fields.find(field => field.type === 'product_reference')?.reference;


    return <Link className={styles.productWrapper} to={`/products/${product?.handle}`}>
        {image?.image && <Image data={image.image} />}
        <span>VIEW PRODUCT</span>

    </Link>
}