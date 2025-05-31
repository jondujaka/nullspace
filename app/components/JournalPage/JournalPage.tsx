import { MediaImage } from '@shopify/hydrogen/storefront-api-types'
import styles from './JournalPage.module.scss'
import { Image } from '@shopify/hydrogen'

export default function JournalPage({ media }: { media: MediaImage[] }) {
    return (
        <div className={styles.wrapper}>


            {media.map(media => media.image && <div key={media.id}><Image

                data={media.image}
                sizes="(min-width:1600px) 1600px, (min-width: 960px) 70vw, 100vw"
                loading='lazy'
            /></div>)}

        </div>
    )
}