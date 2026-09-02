import {type MetaFunction} from 'react-router';
import {getSeoMeta} from '@shopify/hydrogen';
import WorldLayout from '~/components/World/WorldLayout';
import WorldTextPage from '~/components/World/WorldTextPage';
import {contactInfo} from '~/components/World/worldContent';
import textStyles from '~/components/World/WorldTextPage.module.scss';

export const meta: MetaFunction = () => {
  return getSeoMeta({
    title: '(NULL) SPACE WORLD | Contact',
    description: 'Contact details for NULL SPACE World Foundation.',
  });
};

export default function WorldContact() {
  return (
    <WorldLayout>
      <WorldTextPage title={contactInfo.title}>
        <div className={textStyles.contactStack}>
          <div className={textStyles.block}>
            <p>{contactInfo.statutoryName}</p>
          </div>

          <div className={textStyles.block}>
            <p>
              {contactInfo.addressLabel}
              <br />
              {contactInfo.addressLines.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </p>
          </div>

          <div className={textStyles.block}>
            <p>
              {contactInfo.registration.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </p>
          </div>

          <div className={textStyles.block}>
            <p>
              tel: <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
              <br />
              e-mail:{' '}
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              <br />
              {contactInfo.iban}
            </p>
          </div>
        </div>
      </WorldTextPage>
    </WorldLayout>
  );
}
