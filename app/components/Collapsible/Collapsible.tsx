import { useCollapse } from "react-collapsed";
import styles from './Collapsible.module.scss'
import { ReactElement, useState } from 'react';
export default function Collapsible({ title, children }: { title: string, children: ReactElement | ReactElement[] }) {

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    return <div className={styles.wrapper}>
        <div className={styles.title} {...getToggleProps()}>{title}
            <svg className={isExpanded ? styles.rotate : "" } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <path d="m50 1018.518 2.594-2.218 28-24-5.188-6.094L50 1007.987l-25.406-21.781-5.188 6.094 28 24 2.594 2.218z" overflow="visible"  transform="translate(0 -952.362)" />
            </svg>
        </div>

        <section {...getCollapseProps()}> {children}</section>


    </div>
}