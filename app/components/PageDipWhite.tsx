import {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';
import styles from './PageDipWhite.module.scss';

const DIP_IN_MS = 420;
const DIP_OUT_MS = 520;

type DipDetail = {to: string};

/** Trigger a white dip, then navigate. Used from the gate. */
export function startPageDip(to: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('ns-page-dip', {detail: {to} satisfies DipDetail}),
  );
}

/**
 * Full-viewport white veil for soft page transitions (dip in → navigate → dip out).
 * Mount once in the root layout so it survives route changes.
 */
export default function PageDipWhite() {
  const navigate = useNavigate();
  const location = useLocation();
  const [phase, setPhase] = useState<'idle' | 'in' | 'hold' | 'out'>('idle');
  const targetRef = useRef<string | null>(null);

  useEffect(() => {
    const onDip = (event: Event) => {
      const {to} = (event as CustomEvent<DipDetail>).detail;
      if (!to || to === location.pathname) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        navigate(to);
        return;
      }

      targetRef.current = to;
      setPhase('in');
    };

    window.addEventListener('ns-page-dip', onDip);
    return () => window.removeEventListener('ns-page-dip', onDip);
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (phase !== 'in') return;
    const timer = window.setTimeout(() => {
      const to = targetRef.current;
      if (to) navigate(to);
      setPhase('hold');
    }, DIP_IN_MS);
    return () => window.clearTimeout(timer);
  }, [phase, navigate]);

  useEffect(() => {
    if (phase !== 'hold') return;
    if (targetRef.current && location.pathname !== targetRef.current) return;
    const timer = window.setTimeout(() => setPhase('out'), 40);
    return () => window.clearTimeout(timer);
  }, [phase, location.pathname]);

  useEffect(() => {
    if (phase !== 'out') return;
    const timer = window.setTimeout(() => {
      targetRef.current = null;
      setPhase('idle');
    }, DIP_OUT_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (phase === 'idle') return null;

  return <div className={`${styles.veil} ${styles[phase]}`} aria-hidden />;
}
