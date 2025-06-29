import { Link } from 'react-router';
import Video from '../Video/Video';
import styles from './HomeVideo.module.scss'
import { Video as VideoType } from "@shopify/hydrogen/storefront-api-types";


export default function HomeVideo({ video }: { video: VideoType }) {


    return <div className={styles.wrapper}>

        <div className={styles.content}>
            <h2>2025 COLLECTION</h2>

            <div className={styles.buttons}>
                <Link to="/products" className={styles.button}>View Sunglasses</Link>
                <a href="#campaign" className={styles.button}>View Campaign</a>
            </div>
        </div>
        <Video video={video} />
    </div>
}