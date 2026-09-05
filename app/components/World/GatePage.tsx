import type {MouseEvent} from 'react';
import {useLayoutEffect, useRef} from 'react';
import styles from './GatePage.module.scss';
import gateBackground from '~/assets/world/gate-background.jpg';
import eyewearLogo from '~/assets/world/ns-eyewear-logo-white.png';
import worldLogo from '~/assets/world/ns-world-logo.png';
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
  const gateRef = useRef<HTMLDivElement>(null);

  // Keep gate sized to the *visual* viewport (Chrome device mode can report a
  // much larger layout viewport, which pushed pills below the fold).
  useLayoutEffect(() => {
    const gate = gateRef.current;
    if (!gate) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const sync = () => {
      const vv = window.visualViewport;
      const width = vv?.width ?? window.innerWidth;
      const height = vv?.height ?? window.innerHeight;

      // Keep left/top at 0 — offsetLeft/Top can nudge the whole gate after load.
      gate.style.position = 'fixed';
      gate.style.top = '0';
      gate.style.left = '0';
      gate.style.right = 'auto';
      gate.style.bottom = 'auto';
      gate.style.width = `${width}px`;
      gate.style.height = `${height}px`;
      gate.style.margin = '0';
      gate.style.transform = 'none';
      gate.style.overflow = 'hidden';
      gate.style.display = 'flex';
      gate.style.alignItems = 'center';
      gate.style.justifyContent = 'center';
      gate.dataset.wide = width >= 768 ? 'true' : 'false';
    };

    sync();
    window.visualViewport?.addEventListener('resize', sync);
    window.visualViewport?.addEventListener('scroll', sync);
    window.addEventListener('resize', sync);
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      window.visualViewport?.removeEventListener('resize', sync);
      window.visualViewport?.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  return (
    <div className={`ns-gate ${styles.gate}`} ref={gateRef}>
      <img
        className={`ns-gate-bg ${styles.background}`}
        src={gateBackground}
        alt=""
        decoding="async"
      />
      <div className={`ns-gate-overlay ${styles.overlay}`} aria-hidden />
      <div className={`ns-gate-choices ${styles.choices}`}>
        <a
          className={`ns-gate-pill ns-gate-pill-eyewear ${styles.pill} ${styles.eyewear}`}
          href="/shop"
          onClick={(event) => handleDipClick(event, '/shop')}
        >
          <img
            className={styles.wordmark}
            src={eyewearLogo}
            alt="NULL SPACE"
          />
          <span className={`ns-gate-sub ${styles.subtitle}`}>EYEWEAR</span>
        </a>
        <a
          className={`ns-gate-pill ns-gate-pill-world ${styles.pill} ${styles.world}`}
          href="/world"
          onClick={(event) => handleDipClick(event, '/world')}
        >
          <img
            className={styles.wordmark}
            src={worldLogo}
            alt="( NULL ) SPACE WORLD"
          />
          <span className={`ns-gate-sub ${styles.subtitle}`}>
            CULTURAL &amp; EDITORIAL PLATFORM
          </span>
        </a>
      </div>
    </div>
  );
}
