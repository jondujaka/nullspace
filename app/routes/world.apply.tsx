import {type MetaFunction} from 'react-router';
import {getSeoMeta} from '@shopify/hydrogen';
import WorldLayout from '~/components/World/WorldLayout';
import WorldComingSoon from '~/components/World/WorldComingSoon';

export const meta: MetaFunction = () => {
  return getSeoMeta({
    title: '(NULL) SPACE WORLD | Apply',
    description: 'Apply — coming soon.',
  });
};

export default function WorldApply() {
  return (
    <WorldLayout>
      <WorldComingSoon title="APPLY" />
    </WorldLayout>
  );
}
