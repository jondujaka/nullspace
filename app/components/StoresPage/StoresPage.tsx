import { Link } from 'react-router'
import styles from './StoresPage.module.scss'


const stores = [{
    title: "Glamcult Store",
    location: "Amsterdam,  Netherlands",
    link: "https://maps.app.goo.gl/Nas5mZugyyd72oj19",
    address: "OudeZijds Voorburgwal 92, D, 1012 GH"
}]

export default function StoresPage({ storesList }) {
    return <div className={styles.wrapper}>

        <div className={styles.title}>
            Europe
        </div>

        <div className={styles.storesWrapper}>{storesList.map(store => <Store store={store} id={store.title} />)}

        </div></div>
}

function Store({ store }) {

    const title = store.fields.find(field => field.key === 'title').value;
    const location = store.fields.find(field => field.key === 'location').value;
    const link = store.fields.find(field => field.key === 'link').value;
    const address = store.fields.find(field => field.key === 'address').value;
    return (<div className={styles.store} id={store.title}>
        <h2>{title}</h2>
        <span>{location}</span>
        <a href={link} target='_blank' rel="noopener noreferrer">{address} </a>
    </div>)
}