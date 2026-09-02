import type {MouseEvent} from 'react';
import styles from './GatePage.module.scss';
import gateBackground from '~/assets/world/gate-background.jpg';
import eyewearLogo from '~/assets/world/ns-eyewear-logo-white.png';
import worldLogo from '~/assets/world/ns-world-logo.png';
import GateDevControls from './GateDevControls';
import {startPageDip} from '~/components/PageDipWhite';

function handleDipClick(event: MouseEvent<HTMLAnchorElement>, to: string) {
  if (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  ) {
    return;
  }
  event.preventDefault();
  startPageDip(to);
}

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
        <a
          className={`${styles.pill} ${styles.eyewear}`}
          href="/shop"
          onClick={(event) => handleDipClick(event, '/shop')}
        >
          <img
            className={styles.wordmark}
            src={eyewearLogo}
            alt="NULL SPACE"
          />
          <span className={styles.subtitle}>EYEWEAR</span>
        </a>
        <a
          className={`${styles.pill} ${styles.world}`}
          href="/world"
          onClick={(event) => handleDipClick(event, '/world')}
        >
          <img
            className={styles.wordmark}
            src={worldLogo}
            alt="( NULL ) SPACE WORLD"
          />
          <span className={styles.subtitle}>CULTURAL &amp; EDITORIAL PLATFORM</span>
        </a>
      </div>
      {import.meta.env.MODE === 'development' ? <GateDevControls /> : null}
    </div>
  );
}
