import { Video as VideoType } from "@shopify/hydrogen/storefront-api-types";
import styles from './Video.module.scss'
import { Video as VideoComponent } from "@shopify/hydrogen";

export default function Video({ video }: { video: VideoType }) {
    return <div className={styles.wrapper}>
        <VideoComponent loop controls={false} preload='auto' data={video} autoPlay muted playsInline />

        <button className={styles.unmute}></button>
    </div>
}

