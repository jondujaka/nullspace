import styles from './ShopImage.module.scss'

import { Image } from "@shopify/hydrogen";
import { ImageObjectFragment } from "storefrontapi.generated";

export default function ShopImage({ image }: { image: ImageObjectFragment }) {
    return <div className={styles.wrapper}>{image?.image && <Image data={image.image} width={image.image.width ?? ""} height={image.image.height ?? ""} />}</div>
}