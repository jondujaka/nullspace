import {type MetaFunction} from 'react-router';
import {getSeoMeta} from '@shopify/hydrogen';
import WorldLayout from '~/components/World/WorldLayout';
import WorldTextPage, {WorldSection} from '~/components/World/WorldTextPage';
import {purposeAndBoard} from '~/components/World/worldContent';
import textStyles from '~/components/World/WorldTextPage.module.scss';

export const meta: MetaFunction = () => {
  return getSeoMeta({
    title: '(NULL) SPACE WORLD | Foundation',
    description: 'Purpose of the Foundation and Board Composition.',
  });
};

export default function WorldFoundation() {
  const {purpose, board} = purposeAndBoard;

  return (
    <WorldLayout>
      <WorldTextPage title={purpose.title}>
        <p>{purpose.lead}</p>
        <ul className={textStyles.list}>
          {purpose.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{purpose.closing}</p>

        <WorldSection title={board.title}>
          <p>{board.intro}</p>
          {board.members.map((member) => (
            <div className={textStyles.block} key={member.name}>
              <p className={textStyles.memberName}>{member.name}</p>
              <p>{member.bio}</p>
            </div>
          ))}
          <p className={textStyles.boardClosing}>{board.closing}</p>
        </WorldSection>
      </WorldTextPage>
    </WorldLayout>
  );
}
