import styles from './Carousel.module.scss'

import { Image, Video } from "@shopify/hydrogen";
import type { MediaImage as ImageType, Video as VideoType } from "@shopify/hydrogen/storefront-api-types";
import Controls from './Controls';
import { useEffect, useRef, useState } from 'react';
import { ImageObjectFragment } from 'storefrontapi.generated';
import { useSnapCarousel } from 'react-snap-carousel';


const Carousel = ({ items = [], isHomepage = false }: { items?: (VideoType | MediaImage)[]; isHomepage: boolean }) => {


    const {
        scrollRef,

        activePageIndex,

        goTo,

    } = useSnapCarousel();


    const thumbnails = items?.map(item => {

        if (item.type === 'MediaImage' || item.__typename === 'MediaImage') {
            return item.previewImage;
        }

        if (item.__typename === 'Video') {


            return item.previewImage
        }
    }).filter(Boolean)


    return <div className={styles.wrapper}>
        <div className={`${styles.carousel} ${isHomepage ? styles.isHomepage : ""}`} ref={scrollRef}>


            {!Boolean(items.length) && <div className={styles.noImage}>[ No image ]</div>}
            {Boolean(items?.length) && items.map((item, i) => {

                // if (!item || i !== active) {
                //     return null;
                // }
                if (item.__typename === 'MediaImage' && item.image) {
                    return <Image loading='eager' sizes={isHomepage ? '100vw' : '(min-width: 1600px) 1600px, 100vw'} key={item.id} data={item.image} width={item.image.width ?? "auto"} height={item.image.height ?? "auto"} />
                }

                if (item.__typename === 'Video') {
                    return <Video loop controls={false} sizes="100vw" preload='auto' key={item.id} data={item} autoPlay muted playsInline />
                }


                return null;
            }
            )}



        </div>
        <Controls activeIndex={activePageIndex} items={thumbnails} goTo={goTo} classes={`${styles.controls} ${isHomepage ? styles.homepageControls : ''}`} />
    </div>
}

export default Carousel