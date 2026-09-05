import {type MetaFunction} from 'react-router';
import {getSeoMeta} from '@shopify/hydrogen';
import WorldLayout from '~/components/World/WorldLayout';
import WorldTextPage from '~/components/World/WorldTextPage';
import {WORLD_TAGLINE} from '~/components/World/worldContent';
import styles from '~/components/World/WorldComingSoon.module.scss';

// Full intro + gallery kept for later phases (not rendered):
// import {WorldSection} from '~/components/World/WorldTextPage';
// import WorldComingSoonTiles from '~/components/World/WorldComingSoonTiles';
// import {worldIntro} from '~/components/World/worldContent';

export const meta: MetaFunction = () => {
  return getSeoMeta({
    title: '(NULL) SPACE WORLD | Editorials',
    description: 'Editorials — coming soon.',
  });
};

export default function WorldEditorials() {
  return (
    <WorldLayout>
      <WorldTextPage tagline={WORLD_TAGLINE}>
        <div className={styles.announcement} role="status">
          <p className={styles.headline}>Coming soon</p>
        </div>
      </WorldTextPage>
    </WorldLayout>
  );
}
