import {type MetaFunction} from 'react-router';
import {getSeoMeta} from '@shopify/hydrogen';
import WorldLayout from '~/components/World/WorldLayout';
import WorldComingSoon from '~/components/World/WorldComingSoon';

export const meta: MetaFunction = () => {
  return getSeoMeta({
    title: '(NULL) SPACE WORLD | Re-seeing',
    description: 'Re-seeing programme — coming soon.',
  });
};

export default function WorldReSeeing() {
  return (
    <WorldLayout>
      <WorldComingSoon title="RE-SEEING" />
    </WorldLayout>
  );
}
