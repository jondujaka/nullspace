import {useEffect, useState} from 'react';
import styles from './WorldDevControls.module.scss';

type PillControls = {
  logoHeight: number;
  subtitleGap: number;
  subtitleSize: number;
  subtitleTracking: number;
  padX: number;
  padTop: number;
  padBottom: number;
  minHeight: number;
  minWidth: number;
};

type Controls = {
  pillGap: number;
  eyewear: PillControls;
  world: PillControls;
};

const PILL_DEFAULTS: PillControls = {
  logoHeight: 31,
  subtitleGap: 10,
  subtitleSize: 10,
  subtitleTracking: 0.08,
  padX: 52,
  padTop: 32,
  padBottom: 20,
  minHeight: 108,
  minWidth: 400,
};

const DEFAULTS: Controls = {
  pillGap: 48,
  eyewear: {...PILL_DEFAULTS},
  world: {
    ...PILL_DEFAULTS,
    logoHeight: 32,
    padX: 28,
    minWidth: 420,
  },
};

const STORAGE_KEY = 'nullspace-gate-dev-controls';

function loadControls(): Controls {
  if (typeof window === 'undefined') return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<Controls>;
    return {
      pillGap: parsed.pillGap ?? DEFAULTS.pillGap,
      eyewear: {...DEFAULTS.eyewear, ...parsed.eyewear},
      world: {...DEFAULTS.world, ...parsed.world},
    };
  } catch {
    return DEFAULTS;
  }
}

function applyPill(prefix: 'eyewear' | 'world', values: PillControls) {
  const root = document.documentElement;
  root.style.setProperty(`--gate-${prefix}-logo`, `${values.logoHeight}px`);
  root.style.setProperty(`--gate-${prefix}-sub-gap`, `${values.subtitleGap}px`);
  root.style.setProperty(`--gate-${prefix}-sub-size`, `${values.subtitleSize}px`);
  root.style.setProperty(
    `--gate-${prefix}-sub-track`,
    `${values.subtitleTracking}em`,
  );
  root.style.setProperty(`--gate-${prefix}-pad-x`, `${values.padX}px`);
  root.style.setProperty(`--gate-${prefix}-pad-top`, `${values.padTop}px`);
  root.style.setProperty(`--gate-${prefix}-pad-bottom`, `${values.padBottom}px`);
  root.style.setProperty(`--gate-${prefix}-min-h`, `${values.minHeight}px`);
  root.style.setProperty(`--gate-${prefix}-min-w`, `${values.minWidth}px`);
}

function applyControls(values: Controls) {
  document.documentElement.style.setProperty(
    '--gate-pill-gap',
    `${values.pillGap}px`,
  );
  applyPill('eyewear', values.eyewear);
  applyPill('world', values.world);
}

function toCss(values: Controls) {
  const pill = (prefix: 'eyewear' | 'world', p: PillControls) => `  --gate-${prefix}-logo: ${p.logoHeight}px;
  --gate-${prefix}-sub-gap: ${p.subtitleGap}px;
  --gate-${prefix}-sub-size: ${p.subtitleSize}px;
  --gate-${prefix}-sub-track: ${p.subtitleTracking}em;
  --gate-${prefix}-pad-x: ${p.padX}px;
  --gate-${prefix}-pad-top: ${p.padTop}px;
  --gate-${prefix}-pad-bottom: ${p.padBottom}px;
  --gate-${prefix}-min-h: ${p.minHeight}px;
  --gate-${prefix}-min-w: ${p.minWidth}px;`;

  return `:root {
  --gate-pill-gap: ${values.pillGap}px;
${pill('eyewear', values.eyewear)}
${pill('world', values.world)}
}`;
}

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], {type: 'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function PillSliders({
  label,
  values,
  onChange,
}: {
  label: string;
  values: PillControls;
  onChange: (key: keyof PillControls, value: number) => void;
}) {
  return (
    <div className={styles.group}>
      <p className={styles.groupTitle}>{label}</p>
      <label className={styles.row}>
        <span>Logo height {values.logoHeight}px</span>
        <input
          type="range"
          min={12}
          max={48}
          step={1}
          value={values.logoHeight}
          onChange={(e) => onChange('logoHeight', Number(e.target.value))}
        />
      </label>
      <label className={styles.row}>
        <span>Logo → subtitle gap {values.subtitleGap}px</span>
        <input
          type="range"
          min={0}
          max={32}
          step={1}
          value={values.subtitleGap}
          onChange={(e) => onChange('subtitleGap', Number(e.target.value))}
        />
      </label>
      <label className={styles.row}>
        <span>Subtitle size {values.subtitleSize}px</span>
        <input
          type="range"
          min={7}
          max={16}
          step={0.5}
          value={values.subtitleSize}
          onChange={(e) => onChange('subtitleSize', Number(e.target.value))}
        />
      </label>
      <label className={styles.row}>
        <span>Subtitle tracking {values.subtitleTracking.toFixed(2)}em</span>
        <input
          type="range"
          min={0}
          max={0.35}
          step={0.01}
          value={values.subtitleTracking}
          onChange={(e) => onChange('subtitleTracking', Number(e.target.value))}
        />
      </label>
      <label className={styles.row}>
        <span>Pad X {values.padX}px</span>
        <input
          type="range"
          min={16}
          max={80}
          step={2}
          value={values.padX}
          onChange={(e) => onChange('padX', Number(e.target.value))}
        />
      </label>
      <label className={styles.row}>
        <span>Pad top {values.padTop}px</span>
        <input
          type="range"
          min={8}
          max={56}
          step={1}
          value={values.padTop}
          onChange={(e) => onChange('padTop', Number(e.target.value))}
        />
      </label>
      <label className={styles.row}>
        <span>Pad bottom {values.padBottom}px</span>
        <input
          type="range"
          min={8}
          max={56}
          step={1}
          value={values.padBottom}
          onChange={(e) => onChange('padBottom', Number(e.target.value))}
        />
      </label>
      <label className={styles.row}>
        <span>Min height {values.minHeight}px</span>
        <input
          type="range"
          min={72}
          max={180}
          step={2}
          value={values.minHeight}
          onChange={(e) => onChange('minHeight', Number(e.target.value))}
        />
      </label>
      <label className={styles.row}>
        <span>Min width {values.minWidth}px</span>
        <input
          type="range"
          min={220}
          max={480}
          step={4}
          value={values.minWidth}
          onChange={(e) => onChange('minWidth', Number(e.target.value))}
        />
      </label>
    </div>
  );
}

export default function GateDevControls() {
  const [open, setOpen] = useState(true);
  const [values, setValues] = useState<Controls>(DEFAULTS);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const loaded = loadControls();
    setValues(loaded);
    applyControls(loaded);
  }, []);

  useEffect(() => {
    applyControls(values);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  }, [values]);

  const setPill =
    (pill: 'eyewear' | 'world') =>
    (key: keyof PillControls, value: number) => {
      setValues((prev) => ({
        ...prev,
        [pill]: {...prev[pill], [key]: value},
      }));
    };

  const flash = (message: string) => {
    setStatus(message);
    window.setTimeout(() => setStatus(''), 1800);
  };

  const exportSettings = async () => {
    const payload = {
      controls: values,
      css: toCss(values),
      exportedAt: new Date().toISOString(),
    };
    const text = JSON.stringify(payload, null, 2);

    try {
      await navigator.clipboard.writeText(text);
      flash('Copied JSON + CSS');
    } catch {
      flash('Clipboard blocked — downloading');
    }

    downloadText('gate-dev-settings.json', text);
    downloadText('gate-dev-settings.css', payload.css);
  };

  return (
    <div className={`${styles.panel} ${styles.gatePanel}`}>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Hide' : 'Show'} Gate Dev
      </button>

      {open ? (
        <div className={styles.body}>
          <label className={styles.row}>
            <span>Gap between pills {values.pillGap}px</span>
            <input
              type="range"
              min={8}
              max={48}
              step={1}
              value={values.pillGap}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  pillGap: Number(e.target.value),
                }))
              }
            />
          </label>

          <PillSliders
            label="Eyewear pill"
            values={values.eyewear}
            onChange={setPill('eyewear')}
          />
          <PillSliders
            label="World pill"
            values={values.world}
            onChange={setPill('world')}
          />

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.reset}
              onClick={() => setValues(DEFAULTS)}
            >
              Reset
            </button>
            <button
              type="button"
              className={styles.reset}
              onClick={() => void exportSettings()}
            >
              Export settings
            </button>
          </div>

          {status ? <p className={styles.status}>{status}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
