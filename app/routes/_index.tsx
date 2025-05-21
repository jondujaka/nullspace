import { type MetaFunction } from '@remix-run/react';
import ComingSoon from '~/components/ComingSoon';
import { Script } from '@shopify/hydrogen';

export const meta: MetaFunction = () => {
  return [{ title: 'NullSpace' }];
};


export default function Homepage() {

  return (
    <div>
      <div className='wrapper'>

        <ComingSoon />
        <div className="newsletter"><p>Insert email for early access</p>
          <div className="klaviyo-form-Uf3hBV" /></div>
      </div>
    </div>)
}
