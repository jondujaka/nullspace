import styles from './AboutSection.module.scss'
import { Image, RichText } from "@shopify/hydrogen";
import { Image as Imagetype, MediaImage } from "@shopify/hydrogen/storefront-api-types";
import { ImageObjectFragment } from "storefrontapi.generated";

export default function AboutSection({ richtext, image }: { richtext: string, image: ImageObjectFragment }) {

    console.log({image})

    return <div className={styles.aboutSection}>
        <div className={styles.text}>
            <RichText data={richtext} />
            <a> [ subscribe to our newsletter ]</a>
        </div>
        <div className={styles.image}>
            {image?.image && <Image data={image.image} width={image.image.width ?? ""} height={image.image.height ?? ""} />}
        </div>
    </div>
}