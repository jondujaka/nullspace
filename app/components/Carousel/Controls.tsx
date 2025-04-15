import { Image } from "@shopify/hydrogen";
import { Image as ImageType, Maybe } from "@shopify/hydrogen/storefront-api-types";

const Controls = ({ callback, classes, items }: { callback: (index: number) => void; classes: string, items: ImageType[] }) => {
    return <div className={classes}>
        {items.map((item, i) => {
            return <button key={item.id} onClick={() => callback(i)}><Image data={item} /></button>
        })}
    </div>
}
export default Controls