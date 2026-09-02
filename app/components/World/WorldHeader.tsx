import {Link, NavLink} from 'react-router';
import styles from './WorldHeader.module.scss';
import {worldNavItems} from './worldContent';
import worldLogo from '~/assets/world/ns-world-logo.png';
import eyewearLogo from '~/assets/world/ns-eyewear-logo-black.png';

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M16 16l4 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 4.5h10v15l-5-3.2-5 3.2v-15z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M5.5 19c1.6-3.2 3.8-4.8 6.5-4.8S16.9 15.8 18.5 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export default function WorldHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="World navigation">
        <Link
          to="/"
          className={styles.brand}
          aria-label="NULL SPACE — back to split"
        >
          <span className={styles.brandSwap} aria-hidden="true">
            <img
              className={`${styles.brandLogo} ${styles.brandLogoWorld}`}
              src={worldLogo}
              alt=""
            />
            <img
              className={`${styles.brandLogo} ${styles.brandLogoEyewear}`}
              src={eyewearLogo}
              alt=""
            />
          </span>
        </Link>

        <div className={styles.menu}>
          {worldNavItems.map((item, index) => {
            const orderClass =
              index === 0
                ? styles.order1
                : index === 1
                  ? styles.order2
                  : index === 2
                    ? styles.order3
                    : styles.order4;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({isActive}) =>
                  `${styles.link} ${orderClass} ${isActive ? styles.active : ''}`
                }
                end
              >
                {item.label}
              </NavLink>
            );
          })}
        </div>

        <div className={styles.utilities} aria-hidden="true">
          <span className={styles.utility}>
            <SearchIcon />
          </span>
          <span className={styles.utility}>
            <BookmarkIcon />
          </span>
          <span className={styles.utility}>
            <AccountIcon />
          </span>
        </div>
      </nav>
    </header>
  );
}
