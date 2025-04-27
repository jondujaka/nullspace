import { MediaImage } from '@shopify/hydrogen/storefront-api-types'
import styles from './JournalPage.module.scss'
import { Image } from '@shopify/hydrogen'

export default function JournalPage({ media }: { media: MediaImage[] }) {
    return (
        <div className={styles.wrapper}>

            <div>
                {media[0].image && <Image
                    width={media[0].image.width ?? "auto"}
                    height={media[0].image.height ?? "auto"}
                    data={media[0].image}
                />}
            </div>


            <div className={styles.row}>
                {media[1].image && media[2].image &&
                    <>
                        <Image
                            width={media[1].image.width ?? "auto"}
                            height={media[1].image.height ?? "auto"}
                            data={media[1].image}
                        />
                        <Image
                            width={media[2].image.width ?? "auto"}
                            height={media[2].image.height ?? "auto"}
                            data={media[2].image}
                        />
                    </>
                }
            </div>

            <div>
                {media[3].image && <Image
                    width={media[3].image.width ?? "auto"}
                    height={media[3].image.height ?? "auto"}
                    data={media[3].image}
                />}
            </div>
        </div>
    )
}