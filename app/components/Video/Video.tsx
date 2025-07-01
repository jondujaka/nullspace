import { Video as VideoType } from "@shopify/hydrogen/storefront-api-types";
import styles from './Video.module.scss'
import { Video as VideoComponent } from "@shopify/hydrogen";
import { useState } from "react";
import useElementOnScreen from "~/hooks/useElementOnScreen";
import { Image } from "@shopify/hydrogen";

export default function Video({ video, id, noSound, lazy }: { video: VideoType, id?: string, noSound?: boolean, lazy?: boolean }) {

    const [isMuted, setIsMuted] = useState(true);

    const [containerRef, isVisible] = useElementOnScreen({
        reappear: false,
        threshold: 0,
    });



    return <div className={styles.wrapper} id={id} ref={containerRef}>

        {video.previewImage && <Image sizes="100vw" data={video.previewImage} />}
        {lazy && isVisible && <VideoComponent loop controls={false} preload='auto' data={video} autoPlay muted={isMuted} playsInline />}
        {isMuted && !noSound && <button className={styles.button} onClick={() => setIsMuted(false)}>

            <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" baseProfile="tiny" viewBox="10 10 80 80">
                <path d="M51.573 31.544a1.5 1.5 0 0 0-1.572.146L36.357 41.984h-6.273a2.435 2.435 0 0 0-2.431 2.432v11.17c0 1.34 1.091 2.43 2.431 2.43h6.273l13.644 10.295a1.499 1.499 0 0 0 2.403-1.197V32.887a1.5 1.5 0 0 0-.831-1.343zm-2.169 32.559-11.641-8.784a1.501 1.501 0 0 0-.903-.303h-6.207V44.984h6.207c.326 0 .644-.106.903-.303l11.641-8.784v28.206zm22.503-7.32L65.124 50l6.782-6.783a1.5 1.5 0 1 0-2.121-2.121l-6.782 6.783-6.782-6.783a1.5 1.5 0 1 0-2.121 2.121L60.882 50 54.1 56.783a1.5 1.5 0 1 0 2.122 2.121l6.782-6.783 6.783 6.783c.293.293.677.439 1.061.439s.768-.146 1.061-.439a1.501 1.501 0 0 0-.002-2.121z" />
            </svg>

        </button>}
    </div>
}

