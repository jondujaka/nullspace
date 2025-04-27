import styles from './Carousel.module.scss'

import { Image, Video } from "@shopify/hydrogen";
import type { MediaImage as ImageType, Video as VideoType } from "@shopify/hydrogen/storefront-api-types";
import Controls from './Controls';
import { useState } from 'react';
import { ImageObjectFragment } from 'storefrontapi.generated';


const Carousel = ({ items }: { items: (VideoType | ImageObjectFragment)[] }) => {

    const [active, setActive] = useState(0)

    const handleSwitch = (id: number) => {
        console.log(id)
        setActive(id)
    }


    const thumbnails = items.map(item => {

        if (item.__typename === 'MediaImage') {
            return item.previewImage;
        }

        if (item.__typename === 'Video') {


            return item.previewImage
        }
    }).filter(Boolean)

    return <>
        <div className={styles.carousel}>

            {!Boolean(items.length) && <div className={styles.noImage}>[ No image ]</div>}
            {items.map((item, i) => {

                if (!item || i !== active) {
                    return null;
                }
                if (item.__typename === 'MediaImage' && item.image) {
                    return <Image key={item.id} data={item.image} width={item.image.width ?? "auto"} height={item.image.height ?? "auto"}/>
                }

                if (item.__typename === 'Video') {
                    return <Video controls={false} preload='auto' key={item.id} data={item} autoPlay muted playsInline />
                }


                return null;
            }
            )}

            <Controls activeIndex={active} callback={handleSwitch} items={thumbnails} classes={styles.controls} />
        </div>

    </>
}

export default Carousel