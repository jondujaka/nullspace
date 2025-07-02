import styles from './LinkSection.module.scss'
import { NavLink } from 'react-router';

export default function LinkSection({ text, link }: { text: string, link: string }) {
    return <div className={styles.wrapper}>
        <NavLink to={link}>
            ({text})
        </NavLink>
    </div>
}