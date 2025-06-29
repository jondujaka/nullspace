import { ProductAllProductsQuery } from "storefrontapi.generated"
import ShopProducts from "../ShopProducts/ShopProducts"
import styles from './RelatedProducts.module.scss'
export default function RelatedProducts({products, current}:{products: ProductAllProductsQuery, current:string}) {
    const relatedProducts = products.products.nodes.filter(node => node.id !== current)
    return <div className={styles.wrapper}>
        <h2>You may also like</h2>
        <ShopProducts products={relatedProducts} isRelated noButton />
    </div>
}