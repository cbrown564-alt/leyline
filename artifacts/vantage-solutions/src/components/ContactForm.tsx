import { useState, type CSSProperties, type FormEvent } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const CREAM = '#F5F3EC';
const BURGUNDY = '#8B1A2C';

const labelStyle: CSSProperties = {
  display: 'block',
  fontSize: 10,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(245,243,236,0.5)',
  marginBottom: 8,
};

const inputStyle: CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: '1px solid rgba(245,243,236,0.25)',
  color: CREAM,
  padding: '12px 14px',
  fontSize: 14,
  fontFamily: 'inherit',
  outline: 'none',
  boxSizing: 'border-box',
};

export default function ContactForm({ selectedServices = [], onRemoveService, onSubmitted }: {
  selectedServices?: string[];
  onRemoveService?: (name: string) => void;
  onSubmitted?: () => void;
}) {
  const isMobile = useIsMobile();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message: selectedServices.length
            ? `Interested in: ${selectedServices.join(', ')}\n\n${message}`
            : message,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Something went wrong sending your message.');
      }
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
      onSubmitted?.();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong sending your message.');
    }
  }

  if (status === 'sent') {
    return (
      <div style={{ border: '1px solid rgba(245,243,236,0.25)', padding: 28, marginBottom: 36 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: BURGUNDY, marginBottom: 12 }}>
          Message sent
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(245,243,236,0.8)', margin: 0, marginBottom: 20 }}>
          Thank you — we will be in touch.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,243,236,0.6)', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 4 }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 36 }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label htmlFor="cf-name" style={labelStyle}>Your name</label>
          <input
            id="cf-name"
            required
            maxLength={200}
            value={name}
            onChange={e => setName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="cf-email" style={labelStyle}>Email</label>
          <input
            id="cf-email"
            type="email"
            required
            maxLength={320}
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>
      {selectedServices.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={labelStyle}>You are interested in</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedServices.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => onRemoveService?.(s)}
                aria-label={`Remove ${s} from your inquiry`}
                title="Click to remove"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, letterSpacing: '0.04em', color: CREAM, background: 'transparent', border: '1px solid rgba(245,243,236,0.35)', padding: '7px 12px', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                {s}<span aria-hidden="true" style={{ color: 'rgba(245,243,236,0.55)', fontSize: 14, lineHeight: 1 }}>×</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <div style={{ marginBottom: 20 }}>
        <label htmlFor="cf-message" style={labelStyle}>What are you working with?</label>
        <textarea
          id="cf-message"
          required
          rows={4}
          maxLength={5000}
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>
      {status === 'error' && (
        <p style={{ fontSize: 13, lineHeight: 1.6, color: '#d98a94', marginBottom: 16 }}>
          {errorMsg} You can also email hello@leylinedigital.co.uk directly.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{ width: isMobile ? '100%' : undefined, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: CREAM, background: 'transparent', border: '1px solid rgba(245,243,236,0.4)', padding: '14px 28px', cursor: status === 'sending' ? 'wait' : 'pointer', opacity: status === 'sending' ? 0.6 : 1 }}
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}

