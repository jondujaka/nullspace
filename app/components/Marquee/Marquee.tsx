import { useState } from "react";
import styles from './Marquee.module.scss'
import MarqueeComponent from './MarqueeComponent'

export default function Marquee({ text, onClose }: { text: string, onClose: () => void }) {

    const [hide, setHide] = useState(false);

    if (hide) {
        return null;
    }
    return (
        <div className={styles.wrapper}>
            <button onClick={() => {
                setHide(true)
                onClose()
            }}>&#10006;</button>
            <MarqueeComponent autoFill style={{ padding: '.1rem 0', background: 'white' }}>
                <span className={styles.textContainer}>{text}</span>
            </MarqueeComponent>
        </div>)
}