import { Link } from 'react-router'
import styles from './StoresPage.module.scss'


const stores = [{
    title: "Glamcult Store",
    location: "Amsterdam,  Netherlands",
    link: "https://maps.app.goo.gl/Nas5mZugyyd72oj19",
    address: "OudeZijds Voorburgwal 92, D, 1012 GH"
}]

export default function StoresPage() {
    return <div className={styles.wrapper}>

        <div className={styles.title}>
            Europe
        </div>

        <div className={styles.storesWrapper}>{stores.map(store =>
            <div className={styles.store} id={store.title}>
                <h2>{store.title}</h2>
                <span>{store.location}</span>
                <a href={store.link} target='_blank' rel="noopener noreferrer">{store.address} </a>
            </div>)}</div>
    </div>
}