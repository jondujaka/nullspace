import { Image } from "@shopify/hydrogen";
import { Image as ImageType, Maybe } from "@shopify/hydrogen/storefront-api-types";
import styles from './Carousel.module.scss'

const Controls = ({ callback, classes, items, activeIndex }: { callback: (index: number) => void; classes: string, items: ImageType[], activeIndex: number }) => {
    return <div className={classes}>
        {items.map((item, i) => {
            return <button className={activeIndex === i ? styles.activeButton : ""} key={item.id} onClick={() => callback(i)}><Image data={item} aspectRatio="1/1"/></button>
        })}
    </div>
}
export default Controls