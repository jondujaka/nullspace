import { Link } from 'react-router';
import styles from './AboutSection.module.scss'
import { Image, RichText } from "@shopify/hydrogen";
import { Image as Imagetype, MediaImage } from "@shopify/hydrogen/storefront-api-types";
import { ImageObjectFragment } from "storefrontapi.generated";
import useElementOnScreen from '~/hooks/useElementOnScreen';

export default function AboutSection({ richtext, image, richtextUnder }: { richtext: string, richtextUnder?:string, image: ImageObjectFragment }) {

    const [containerRef, isVisible] = useElementOnScreen({
        threshold: 0.5,
        reappear: false,
      });


    return <div className={styles.aboutSection}>
        <div className={`${styles.text} ${isVisible ? styles.isVisible : ''}`} ref={containerRef}>
            <RichText data={richtext} />
            <Link to="/about">(READ MORE)</Link>

           {richtextUnder &&<RichText className={styles.extraText} data={richtextUnder} />}

            
        </div>
        <div className={styles.image}>
            {image?.image && <Image sizes="100vw" data={image.image} width={image.image.width ?? ""} height={image.image.height ?? ""} />}
        </div>


    </div>
}

