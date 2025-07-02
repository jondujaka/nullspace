import { AboutPageQuery } from 'storefrontapi.generated';
import styles from './AboutPage.module.scss';
import { RichText, Video } from '@shopify/hydrogen';


type Data = AboutPageQuery['metaobject']
export default function AboutPage({ data }: { data: Data }) {

    if (!data) {
        return null;
    }


    const richText = data.fields.find(field => field.key === 'text');
    const video = data.fields.find(field => field.key === 'video')


    return (
        <div className={styles.wrapper}>

            <div className={styles.text}>
                {richText?.value && <RichText data={richText.value} />}</div>


            {video?.reference &&
                <Video className={styles.video} data={video.reference} loop controls={false} preload='auto' autoPlay muted={true} playsInline />


            }
        </div>
    )
}