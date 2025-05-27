import { Link } from '@remix-run/react';
import styles from './AboutSection.module.scss'
import { Image, RichText } from "@shopify/hydrogen";
import { Image as Imagetype, MediaImage } from "@shopify/hydrogen/storefront-api-types";
import { ImageObjectFragment } from "storefrontapi.generated";
import useElementOnScreen from '~/hooks/useElementOnScreen';

export default function AboutSection({ richtext, image }: { richtext: string, image: ImageObjectFragment }) {

    const [containerRef, isVisible] = useElementOnScreen({
        threshold: 0.5,
        reappear: true,
      });

    return <div className={styles.aboutSection}>
        <div className={`${styles.text} ${isVisible ? styles.isVisible : ''}`} ref={containerRef}>
            <RichText data={richtext} />
            <Link to="/about"> [ Read More ]</Link>

            <div className={styles.extraText}>
                <p>
                    To redefine eyewear as a fusion of future tech and timeless design, creating pieces that unlock new dimensions of style, functionality, and creativity.
                </p>
            </div>
        </div>
        <div className={styles.image}>
            {image?.image && <Image data={image.image} width={image.image.width ?? ""} height={image.image.height ?? ""} />}
        </div>


    </div>
}

