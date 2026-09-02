import {type MetaFunction} from 'react-router';
import {getSeoMeta} from '@shopify/hydrogen';
import GatePage from '~/components/World/GatePage';

export const meta: MetaFunction = () => {
  return getSeoMeta({
    title: 'NULL SPACE',
    description:
      'Choose NULL SPACE Eyewear or (NULL) SPACE World — cultural & editorial platform.',
  });
};

export default function GateRoute() {
  return <GatePage />;
}
