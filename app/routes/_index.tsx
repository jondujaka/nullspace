import {  type MetaFunction } from '@remix-run/react';
import ComingSoon from '~/components/ComingSoon';
import { Script } from '@shopify/hydrogen';

export const meta: MetaFunction = () => {
  return [{ title: 'NullSpace' }];
};


export default function Homepage() {
 
  return <div><ComingSoon/><div className="newsletter klaviyo-form-Uf3hBV"/></div>
}
