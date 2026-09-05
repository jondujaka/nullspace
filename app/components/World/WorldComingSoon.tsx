import WorldTextPage from './WorldTextPage';

export default function WorldComingSoon({title}: {title: string}) {
  return (
    <WorldTextPage title={title}>
      <p>Coming soon</p>
    </WorldTextPage>
  );
}
