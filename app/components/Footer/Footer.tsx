import styles from './Footer.module.scss'
import { Await, NavLink } from "react-router";
import { Suspense } from "react";
import { FooterQuery, HeaderQuery } from "storefrontapi.generated";
import Logo from '../Logo';


export default function Footer() {
    return (<>
        <footer className={styles.footer}>
            <div className={styles.newsletterWrapper}>
                <div className={styles.newsletterButton}>
                    <span>Sign up and receive 10% off on your first order</span>
                    <div className="klaviyo-form-Uf3hBV" />
                </div>
            </div>
            <div className={styles.copyright}>
                <Logo />
                <span>NULL SPACE ALL RIGHTS RESERVED 2025&copy;</span>
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
                    Contact/FAQ
                </NavLink>
                <NavLink
                    end
                    prefetch="intent"
                    to={"/policies"}
                >
                    Policies
                </NavLink>

                <a href="https://instagram.com/null_________space" rel="noopener noreferrer" target="_blank">
                    Instagram
                </a>
            </nav>
        </footer>

        <footer className={styles.footerMobile}>
            <div className={styles.newsletterWrapper}>
                <div className={styles.newsletterButton}>
                    <span>Sign up and receive 10% off on your first order</span>
                    <div className="klaviyo-form-Uf3hBV" />
                </div>
            </div>
            <div className={styles.logo}>
                <Logo />
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
                    to={"/policies"}
                >
                    Policies
                </NavLink>

                <a href="https://instagram.com/null_________space" rel="noopener noreferrer" target="_blank">
                    Instagram
                </a>
            </nav>
            <div className={styles.copyright}>
                <span>NULL SPACE ALL RIGHTS RESERVED 2025&copy;</span>
            </div>
        </footer ></>
    );
}