import type {ReactNode} from 'react';
import {useLayoutEffect} from 'react';
import WorldHeader from './WorldHeader';
import WorldFooter from './WorldFooter';
import styles from './WorldLayout.module.scss';

export default function WorldLayout({children}: {children: ReactNode}) {
  // Chrome device mode: layout viewport can stay desktop-wide while visualViewport
  // is phone-sized. Drive wide/narrow from visual width, not CSS media queries.
  useLayoutEffect(() => {
    const sync = () => {
      const width = window.visualViewport?.width ?? window.innerWidth;
      document.documentElement.dataset.worldWide =
        width >= 900 ? 'true' : 'false';
    };
    sync();
    window.visualViewport?.addEventListener('resize', sync);
    window.addEventListener('resize', sync);
    return () => {
      delete document.documentElement.dataset.worldWide;
      window.visualViewport?.removeEventListener('resize', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  return (
    <div className={`ns-world-shell world-scope ${styles.shell}`}>
      <WorldHeader />
      <main className={`ns-world-main ${styles.main}`}>{children}</main>
      <WorldFooter />
    </div>
  );
}
