import {type MetaFunction} from 'react-router';
import {getSeoMeta} from '@shopify/hydrogen';
import WorldLayout from '~/components/World/WorldLayout';
import WorldTextPage, {WorldSection} from '~/components/World/WorldTextPage';
import textStyles from '~/components/World/WorldTextPage.module.scss';
import {WORLD_TAGLINE, worldIntro} from '~/components/World/worldContent';
import landingPic from '~/assets/world/world-landing.jpg';

export const meta: MetaFunction = () => {
  return getSeoMeta({
    title: '(NULL) SPACE WORLD',
    description: WORLD_TAGLINE,
  });
};

/** Phase 1 World intro — manifesto text only (no editorial gallery). */
export default function WorldIndex() {
  return (
    <WorldLayout>
      <WorldTextPage tagline={WORLD_TAGLINE}>
        {worldIntro.sections.map((section) => (
          <WorldSection key={section.title} title={section.title}>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </WorldSection>
        ))}
        <img
          className={`ns-world-landing-image ${textStyles.landingImage}`}
          src={landingPic}
          alt=""
          decoding="async"
          loading="lazy"
        />
      </WorldTextPage>
    </WorldLayout>
  );
}
