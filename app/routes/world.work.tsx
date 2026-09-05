import {type MetaFunction} from 'react-router';
import {getSeoMeta} from '@shopify/hydrogen';
import WorldLayout from '~/components/World/WorldLayout';
import WorldComingSoon from '~/components/World/WorldComingSoon';

export const meta: MetaFunction = () => {
  return getSeoMeta({
    title: '(NULL) SPACE WORLD | Work',
    description: 'Work for NULL SPACE — coming soon.',
  });
};

export default function WorldWork() {
  return (
    <WorldLayout>
      <WorldComingSoon title="WORK FOR NULL SPACE" />
    </WorldLayout>
  );
}
