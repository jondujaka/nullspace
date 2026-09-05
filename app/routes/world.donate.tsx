import {type MetaFunction} from 'react-router';
import {getSeoMeta} from '@shopify/hydrogen';
import WorldLayout from '~/components/World/WorldLayout';
import WorldComingSoon from '~/components/World/WorldComingSoon';

export const meta: MetaFunction = () => {
  return getSeoMeta({
    title: '(NULL) SPACE WORLD | Donate',
    description: 'Donate — coming soon.',
  });
};

export default function WorldDonate() {
  return (
    <WorldLayout>
      <WorldComingSoon title="DONATE" />
    </WorldLayout>
  );
}
