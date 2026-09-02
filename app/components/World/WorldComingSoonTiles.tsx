import styles from './WorldComingSoonTiles.module.scss';

const TILE_COUNT = 6;

export default function WorldComingSoonTiles() {
  return (
    <div className={styles.grid} aria-label="Upcoming editorials">
      {Array.from({length: TILE_COUNT}, (_, index) => (
        <div key={index} className={styles.tile}>
          <span className={styles.label}>COMING SOON</span>
        </div>
      ))}
    </div>
  );
}
