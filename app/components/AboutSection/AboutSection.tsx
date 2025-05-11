import { Link } from '@remix-run/react';
import styles from './AboutSection.module.scss'
import { Image, RichText } from "@shopify/hydrogen";
import { Image as Imagetype, MediaImage } from "@shopify/hydrogen/storefront-api-types";
import { ImageObjectFragment } from "storefrontapi.generated";

export default function AboutSection({ richtext, image }: { richtext: string, image: ImageObjectFragment }) {


    return <div className={styles.aboutSection}>
        <div className={styles.text}>
            <RichText data={richtext} />
            <Link to="/about"> [ Read More ]</Link>

            <div className={styles.extraText}>
                <p>
                    TO REDEFINE EYEWEAR AS A FUSION OF FUTURE TECH AND TIMELESS DESIGN, CREATING PIECES THAT UNLOCK NEW DIMENSIONS OF STYLE, FUNCTIONALITY, AND CREATIVITY.
                </p>
            </div>
        </div>
        <div className={styles.image}>
            {image?.image && <Image data={image.image} width={image.image.width ?? ""} height={image.image.height ?? ""} />}
        </div>


    </div>
}