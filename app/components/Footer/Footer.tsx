import styles from './Footer.module.scss'
import { Await, NavLink } from "@remix-run/react";
import { Suspense } from "react";
import { FooterQuery, HeaderQuery } from "storefrontapi.generated";
import Logo from '../Logo';


export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.copyright}>
                <Logo />
                <span>NULL SPACE ALL RIGHTS RESERVED 2025&copy;</span>
            </div>
            <div className={styles.newsletterButton}>
                <a href="/newsletter">subscribe to our newsletter</a>
            </div>
            <nav className={styles.menu}>
                <NavLink
                    end
                    prefetch="intent"
                    to={"/about"}
                >
                    About
                </NavLink>
                <NavLink
                    end
                    prefetch="intent"
                    to={"/faq"}
                >
                    FAQ
                </NavLink>
                <NavLink
                    end
                    prefetch="intent"
                    to={"/terms-conditions"}
                >
                    Terms & Conditions
                </NavLink>
                <NavLink
                    end
                    prefetch="intent"
                    to={"/prviacy"}
                >
                    Privacy
                </NavLink>
                <a href="https://instagram.com/jdujaka" rel="noopener noreferrer" target="_blank">
                    Instagram
                </a>
            </nav>
        </footer>
    );
}