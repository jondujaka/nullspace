import {redirect, type LoaderFunctionArgs, type MetaFunction} from 'react-router';
import {getSeoMeta} from '@shopify/hydrogen';
import {WORLD_TAGLINE} from '~/components/World/worldContent';

export const meta: MetaFunction = () => {
  return getSeoMeta({
    title: '(NULL) SPACE WORLD',
    description: WORLD_TAGLINE,
  });
};

/** Phase 1: World entry goes to Editorials (coming soon). */
export async function loader(_args: LoaderFunctionArgs) {
  return redirect('/world/editorials');
}

export default function WorldIndex() {
  return null;
}
