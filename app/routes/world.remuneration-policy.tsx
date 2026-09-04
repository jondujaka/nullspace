import {type MetaFunction} from 'react-router';
import {getSeoMeta} from '@shopify/hydrogen';
import WorldLayout from '~/components/World/WorldLayout';
import WorldTextPage, {WorldSection} from '~/components/World/WorldTextPage';
import {remunerationPolicy} from '~/components/World/worldContent';
import textStyles from '~/components/World/WorldTextPage.module.scss';

export const meta: MetaFunction = () => {
  return getSeoMeta({
    title: '(NULL) SPACE WORLD | Remuneration Policy',
    description: 'Remuneration Policy / beloningsbeleid for NULL SPACE World.',
  });
};

export default function WorldRemunerationPolicy() {
  return (
    <WorldLayout>
      <WorldTextPage title={remunerationPolicy.title}>
        <p>{remunerationPolicy.intro}</p>

        {remunerationPolicy.sections.map((section) => (
          <WorldSection key={section.title} title={section.title} plainTitle>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
            {section.listIntro ? <p>{section.listIntro}</p> : null}
            {section.items ? (
              <ul className={`ns-world-list ${textStyles.list}`}>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.afterList?.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
            {section.afterItems ? (
              <ul className={`ns-world-list ${textStyles.list}`}>
                {section.afterItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.closing?.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </WorldSection>
        ))}
      </WorldTextPage>
    </WorldLayout>
  );
}
