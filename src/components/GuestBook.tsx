import { useEffect, useRef, useState } from 'react';
import { useGuestBook } from '../hooks/useGuestBook';
import { burst } from '../lib/burst';

export function GuestBook() {
  const { entries, loading, signing, refresh, sign } = useGuestBook();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleSign = async () => {
    if (!message.trim()) {
      messageRef.current?.focus();
      return;
    }
    const result = await sign(name, message);
    if (!result.ok) {
      alert('Could not save your note — please try again in a moment.');
      return;
    }
    setName('');
    setMessage('');
    burst(window.innerWidth / 2, window.innerHeight / 2);
  };

  return (
    <div className="gb-wrap">
      <div className="gb-form">
        <h4>Sign the book</h4>
        <p>Leave a little note for Neha ✦</p>
        <input
          placeholder="your name"
          maxLength={50}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          ref={messageRef}
          placeholder="write something nice..."
          maxLength={240}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="gb-btn" disabled={signing} onClick={handleSign}>
          {signing ? 'Signing…' : 'Sign ✍️'}
        </button>
      </div>
      <div className="gb-entries">
        {loading ? (
          <div className="gb-empty">Loading notes…</div>
        ) : entries.length ? (
          entries.map((e, i) => (
            <div className="gbe" key={i}>
              <div className="gm">{e.m}</div>
              <div className="gn">— {e.n}</div>
            </div>
          ))
        ) : (
          <div className="gb-empty">No notes yet — be the first ✦</div>
        )}
      </div>
    </div>
  );
}
