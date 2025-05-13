import { Image } from "@shopify/hydrogen";
import { Image as ImageType, Maybe } from "@shopify/hydrogen/storefront-api-types";
import styles from './Carousel.module.scss'
const Controls = ({ classes, items, activeIndex, goTo }: { callback: (index: number) => void; classes: string, items: ImageType[], activeIndex: number, goTo: (pageIndex: number, opts?: { behavior: "auto" | "instant" | "smooth"; }) => void }) => {

    return (<div className={classes}>
        {items.map((item, i) => {
            return <button className={activeIndex === i ? styles.activeButton : ""} key={item.id} onClick={() => goTo(i)}><Image loading="eager" data={item} aspectRatio="1/1" /></button>
        })}
    </div>)
}
export default Controls