import Logo from '~/components/Logo';
import styles from '~/components/Footer/Footer.module.scss';
import wrapStyles from './WorldFooter.module.scss';

/**
 * Same Footer.module.scss classes + Logo asset as the eyewear shop footer
 * (desktop copyright block + mobile logo block).
 * ns-world-* classes mirror critical rules in world.css for Chrome mobile SSR.
 */
export default function WorldFooter() {
  return (
    <div className={`ns-world-footer-wrap ${wrapStyles.wrap}`}>
      <footer className={`ns-world-footer-desktop ${styles.footer}`}>
        <div className={`ns-world-footer-copyright ${styles.copyright}`}>
          <Logo />
          <span>NULL SPACE ALL RIGHTS RESERVED 2026&copy;</span>
        </div>
      </footer>

      <footer className={`ns-world-footer-mobile ${styles.footerMobile}`}>
        <div className={`ns-world-footer-logo ${styles.logo}`}>
          <Logo />
        </div>
        <div className={`ns-world-footer-copyright ${styles.copyright}`}>
          <span>NULL SPACE ALL RIGHTS RESERVED 2026&copy;</span>
        </div>
      </footer>
    </div>
  );
}
