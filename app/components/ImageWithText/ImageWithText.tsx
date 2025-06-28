import { Image, RichText } from '@shopify/hydrogen';
import styles from './ImageWithText.module.scss'
import useElementOnScreen from "~/hooks/useElementOnScreen";
import { Image as ImageType } from '@shopify/hydrogen/storefront-api-types';


export default function ImageWithText({ image, isEager, text }: { image: Partial<ImageType>, isEager?: boolean, text?: string }) {
    const [containerRef, isVisible] = useElementOnScreen({
        threshold: isEager ? .01 : .2,
    });



    console.log({text})
    return (

        <div>
            {text && <RichText className={styles.text} data={text} />}
            <Image loading={isEager ? 'eager' : 'lazy'} className={isVisible ? 'reveal' : ''} data={image} sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
    )
}


export function Wrapper({ images, isEager, text }: { images: { image: Partial<ImageType> }[], isEager?: boolean, text?: string }) {
    const [containerRef, isVisible] = useElementOnScreen({
        threshold: isEager ? .01 : .2,
    });

    return <div ref={containerRef} className={styles.imagesWrapper}>
        {images.map(image => <ImageWithText image={image.image} isEager text={text} />)}
    </div>
}