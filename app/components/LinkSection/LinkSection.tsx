import styles from './LinkSection.module.scss'
import { NavLink } from "@remix-run/react";

export default function LinkSection({ text, link }: { text: string, link: string }) {
    return <div className={styles.wrapper}>
        <NavLink to={link}>
            #{text}
        </NavLink>
    </div>
}