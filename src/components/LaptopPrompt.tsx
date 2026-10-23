import { useEffect, useState } from 'react';

const DISMISS_KEY = 'nsm_laptop_prompt_dismissed';
// Same breakpoint where the desk collapses into a stacked mobile layout.
const SMALL_SCREEN = '(max-width: 860px)';

function wasDismissed() {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

/** On phones, gently suggest opening the portfolio on a laptop, with an easy way out. */
export function LaptopPrompt() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (window.matchMedia(SMALL_SCREEN).matches && !wasDismissed()) setOpen(true);
  }, []);

  if (!open) return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // storage unavailable, so the prompt may show again next visit
    }
    setOpen(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + window.location.pathname);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="laptop-prompt" role="dialog" aria-modal="true" aria-labelledby="laptop-prompt-title">
      <div className="lp-card">
        <div className="lp-icon" aria-hidden="true">
          💻
        </div>
        <h2 id="laptop-prompt-title">Best on a laptop</h2>
        <p>
          This portfolio is a little desktop you can drag around and explore. It really shines on a bigger screen, so
          open <strong>neha771.github.io</strong> on your laptop for the full experience.
        </p>
        <div className="lp-actions">
          <button type="button" className="lp-btn primary" onClick={copyLink}>
            {copied ? 'Link copied ✓' : 'Copy link'}
          </button>
          <button type="button" className="lp-btn" onClick={dismiss}>
            Continue on phone
          </button>
        </div>
      </div>
    </div>
  );
}
