import {  type MetaFunction } from '@remix-run/react';
import ComingSoon from '~/components/ComingSoon';

export const meta: MetaFunction = () => {
  return [{ title: 'NullSpace' }];
};


export default function Homepage() {
 
  return <ComingSoon/>
}
