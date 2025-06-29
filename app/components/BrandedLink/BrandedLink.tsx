import styles from './BrandedLink.module.scss'

export default function BrandedLink({ text, isActive }: { text: string; isActive?: boolean }) {


    return (
        <span className={`${styles.wrapper} ${isActive && styles.isActive}`}>
            {/* <span className={styles.leftBracket}>(</span> */}
            <span>{text}</span>
            {/* <span className={styles.rightBracket}>)</span> */}
        </span>)
}

