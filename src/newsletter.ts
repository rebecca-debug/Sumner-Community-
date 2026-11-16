/**
 * Newsletter sign-up: sends an email address straight to SCRA's MailerLite
 * form ("Website newsletter sign-up"). MailerLite then emails the person to
 * confirm (double opt-in) and adds them to the newsletter list.
 *
 * The MailerLite form requires Google's "I'm not a robot" tick, so the
 * reCAPTCHA below uses MailerLite's own site key.
 */

export const MAILERLITE_FORM_URL =
  'https://assets.mailerlite.com/jsonp/2339561/forms/204260058095158705/subscribe';
export const RECAPTCHA_SITE_KEY = '6Lf1KHQUAAAAAFNKEX1hdSWCS3mRMv4FlFaNslaD';

type Grecaptcha = {
  render: (el: HTMLElement, opts: { sitekey: string; theme?: 'light' | 'dark' }) => number;
  getResponse: (id?: number) => string;
  reset: (id?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
    __scraRecaptchaReady?: () => void;
  }
}

let loader: Promise<Grecaptcha> | null = null;

/** Loads Google's reCAPTCHA script once and resolves when it is ready to use. */
export function loadRecaptcha(): Promise<Grecaptcha> {
  if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
    return Promise.resolve(window.grecaptcha);
  }
  if (!loader) {
    loader = new Promise((resolve, reject) => {
      window.__scraRecaptchaReady = () => resolve(window.grecaptcha as Grecaptcha);
      const s = document.createElement('script');
      s.src = 'https://www.google.com/recaptcha/api.js?onload=__scraRecaptchaReady&render=explicit';
      s.async = true;
      s.defer = true;
      s.onerror = () => {
        loader = null;
        reject(new Error('The "I\'m not a robot" check could not load. Please refresh the page and try again.'));
      };
      document.head.appendChild(s);
    });
  }
  return loader;
}

/** Sends the sign-up to MailerLite. Throws an Error with a friendly message if it fails. */
export async function subscribeToNewsletter(email: string, captchaToken: string): Promise<void> {
  if (!captchaToken) throw new Error('Please tick the "I\'m not a robot" box first.');

  const body = new URLSearchParams({
    'fields[email]': email.trim(),
    'ml-submit': '1',
    anticsrf: 'true',
    'g-recaptcha-response': captchaToken,
  });

  let out: { success?: boolean; message?: string; errors?: { fields?: { email?: string[] } } };
  try {
    const res = await fetch(MAILERLITE_FORM_URL, { method: 'POST', body });
    out = await res.json();
  } catch {
    throw new Error("We couldn't reach our mailing list just now. Please check your internet connection and try again.");
  }

  if (out.success) return;
  const emailError = out.errors?.fields?.email?.[0];
  if (emailError) throw new Error('Please check your email address.');
  if (out.message && /captcha/i.test(out.message)) {
    throw new Error('The "I\'m not a robot" check timed out. Please tick it again and press Subscribe.');
  }
  throw new Error(out.message || 'Something went wrong. Please try again.');
}
