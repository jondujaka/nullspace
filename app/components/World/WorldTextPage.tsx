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
    <article className={`ns-world-page ${styles.page}`}>
      {tagline ? (
        <p className={`ns-world-tagline ${styles.tagline}`}>{tagline}</p>
      ) : null}
      <div className={`ns-world-body ${styles.body}`}>
        {title ? <h1 className={`ns-world-title ${styles.title}`}>{title}</h1> : null}
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
    <section className={`ns-world-section ${styles.section}`}>
      <h2
        className={
          plainTitle
            ? `ns-world-subheading ${styles.subheading}`
            : `ns-world-title ${styles.title}`
        }
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
