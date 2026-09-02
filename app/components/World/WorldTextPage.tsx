import type {ReactNode} from 'react';
import styles from './WorldTextPage.module.scss';

export default function WorldTextPage({
  title,
  children,
  tagline,
}: {
  title?: string;
  tagline?: string;
  children: ReactNode;
}) {
  return (
    <article className={styles.page}>
      {tagline ? <p className={styles.tagline}>{tagline}</p> : null}
      <div className={styles.body}>
        {title ? <h1 className={styles.title}>{title}</h1> : null}
        {children}
      </div>
    </article>
  );
}

export function WorldSection({
  title,
  children,
  plainTitle = false,
}: {
  title: string;
  children: ReactNode;
  plainTitle?: boolean;
}) {
  return (
    <section className={styles.section}>
      <h2 className={plainTitle ? styles.subheading : styles.title}>{title}</h2>
      {children}
    </section>
  );
}
