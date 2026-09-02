import {Link} from 'react-router';
import styles from './GatePage.module.scss';
import gateBackground from '~/assets/world/gate-background.jpg';
import eyewearLogo from '~/assets/world/ns-eyewear-logo-white.png';
import worldLogo from '~/assets/world/ns-world-logo.png';
import GateDevControls from './GateDevControls';

export default function GatePage() {
  return (
    <div className={styles.gate}>
      <img
        className={styles.background}
        src={gateBackground}
        alt=""
        decoding="async"
      />
      <div className={styles.overlay} aria-hidden />
      <div className={styles.choices}>
        <Link className={`${styles.pill} ${styles.eyewear}`} to="/shop">
          <img
            className={styles.wordmark}
            src={eyewearLogo}
            alt="NULL SPACE"
          />
          <span className={styles.subtitle}>EYEWEAR</span>
        </Link>
        <Link className={`${styles.pill} ${styles.world}`} to="/world">
          <img
            className={styles.wordmark}
            src={worldLogo}
            alt="( NULL ) SPACE WORLD"
          />
          <span className={styles.subtitle}>CULTURAL &amp; EDITORIAL PLATFORM</span>
        </Link>
      </div>
      {import.meta.env.MODE === 'development' ? <GateDevControls /> : null}
    </div>
  );
}
