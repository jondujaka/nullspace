import type {ReactNode} from 'react';
import WorldHeader from './WorldHeader';
import WorldDevControls from './WorldDevControls';
import styles from './WorldLayout.module.scss';
import '~/styles/world.css';

export default function WorldLayout({children}: {children: ReactNode}) {
  return (
    <div className={`${styles.shell} world-scope`}>
      <WorldHeader />
      <main className={styles.main}>{children}</main>
      {import.meta.env.MODE === 'development' ? <WorldDevControls /> : null}
    </div>
  );
}
