import { AboutPageQuery } from 'storefrontapi.generated';
import styles from './AboutPage.module.scss';
import { RichText } from '@shopify/hydrogen';


type Data = AboutPageQuery['metaobject']
export default function AboutPage({ data }: { data: Data }) {

    if (!data) {
        return null;
    }

    const image = data.fields.find(field => field.type === 'file_reference')
    const richText = data.fields.find(field => field.type === 'rich_text_field');


    return (
        <div className={styles.wrapper}>

            <div className={styles.text}>
                {richText?.value && <RichText data={richText.value} />}</div>


            <div className={styles.video}></div>
        </div>
    )
}