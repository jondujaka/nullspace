import {useEffect, useState} from 'react';
import styles from './WorldDevControls.module.scss';

type Controls = {
  bodySize: number;
  sidePadding: number;
  navSidePadding: number;
  headerPadY: number;
  topSpacing: number;
  navSize: number;
  logoSize: number;
  lineHeight: number;
};

const DEFAULTS: Controls = {
  bodySize: 15.5,
  sidePadding: 64,
  navSidePadding: 120,
  headerPadY: 22,
  topSpacing: 46,
  navSize: 13.5,
  logoSize: 26,
  lineHeight: 1.35,
};

const STORAGE_KEY = 'nullspace-world-dev-controls';

function loadControls(): Controls {
  if (typeof window === 'undefined') return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return {...DEFAULTS, ...JSON.parse(raw)};
  } catch {
    return DEFAULTS;
  }
}

function applyControls(values: Controls) {
  const root = document.documentElement;
  root.style.setProperty('--world-type-size', `${values.bodySize}px`);
  root.style.setProperty('--world-heading-size', `${values.bodySize}px`);
  root.style.setProperty('--world-body-pad-x', `${values.sidePadding}px`);
  root.style.setProperty('--world-nav-pad-x', `${values.navSidePadding}px`);
  root.style.setProperty('--world-header-pad-y', `${values.headerPadY}px`);
  root.style.setProperty('--world-content-top', `${values.topSpacing}px`);
  root.style.setProperty('--world-nav-size', `${values.navSize}px`);
  root.style.setProperty('--world-logo-size', `${values.logoSize}px`);
  root.style.setProperty('--world-leading', String(values.lineHeight));
}

function toCss(values: Controls) {
  return `:root {
  --world-type-size: ${values.bodySize}px;
  --world-heading-size: ${values.bodySize}px;
  --world-body-pad-x: ${values.sidePadding}px;
  --world-nav-pad-x: ${values.navSidePadding}px;
  --world-header-pad-y: ${values.headerPadY}px;
  --world-content-top: ${values.topSpacing}px;
  --world-nav-size: ${values.navSize}px;
  --world-logo-size: ${values.logoSize}px;
  --world-leading: ${values.lineHeight};
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

export default function WorldDevControls() {
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

  const set = (key: keyof Controls, value: number) => {
    setValues((prev) => ({...prev, [key]: value}));
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

    downloadText('world-dev-settings.json', text);
    downloadText('world-dev-settings.css', payload.css);
  };

  return (
    <div className={styles.panel}>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Hide' : 'Show'} World Dev
      </button>

      {open ? (
        <div className={styles.body}>
          <label className={styles.row}>
            <span>Body size {values.bodySize}px</span>
            <input
              type="range"
              min={12}
              max={28}
              step={0.5}
              value={values.bodySize}
              onChange={(e) => set('bodySize', Number(e.target.value))}
            />
          </label>

          <label className={styles.row}>
            <span>Body side padding {values.sidePadding}px</span>
            <input
              type="range"
              min={8}
              max={120}
              step={2}
              value={values.sidePadding}
              onChange={(e) => set('sidePadding', Number(e.target.value))}
            />
          </label>

          <label className={styles.row}>
            <span>Nav side padding {values.navSidePadding}px</span>
            <input
              type="range"
              min={0}
              max={120}
              step={2}
              value={values.navSidePadding}
              onChange={(e) => set('navSidePadding', Number(e.target.value))}
            />
          </label>

          <label className={styles.row}>
            <span>Header vertical padding {values.headerPadY}px</span>
            <input
              type="range"
              min={4}
              max={64}
              step={1}
              value={values.headerPadY}
              onChange={(e) => set('headerPadY', Number(e.target.value))}
            />
          </label>

          <label className={styles.row}>
            <span>Top spacing {values.topSpacing}px</span>
            <input
              type="range"
              min={0}
              max={160}
              step={2}
              value={values.topSpacing}
              onChange={(e) => set('topSpacing', Number(e.target.value))}
            />
          </label>

          <label className={styles.row}>
            <span>Nav size {values.navSize}px</span>
            <input
              type="range"
              min={8}
              max={20}
              step={0.5}
              value={values.navSize}
              onChange={(e) => set('navSize', Number(e.target.value))}
            />
          </label>

          <label className={styles.row}>
            <span>Nav logo {values.logoSize}px</span>
            <input
              type="range"
              min={12}
              max={48}
              step={1}
              value={values.logoSize}
              onChange={(e) => set('logoSize', Number(e.target.value))}
            />
          </label>

          <label className={styles.row}>
            <span>Line height {values.lineHeight.toFixed(2)}</span>
            <input
              type="range"
              min={1.1}
              max={2}
              step={0.05}
              value={values.lineHeight}
              onChange={(e) => set('lineHeight', Number(e.target.value))}
            />
          </label>

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
