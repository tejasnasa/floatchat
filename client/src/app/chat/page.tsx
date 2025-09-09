'use client';
import { useState, FormEvent } from 'react';

type Role = 'user' | 'assistant';
type Message = { role: Role; content: string };

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! Ask me anything.' },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const userText = input.trim();
    setMessages((m) => [...m, { role: 'user', content: userText }, { role: 'assistant', content: '' }]);
    setInput('');
    setSending(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, history: messages }),
      });
      if (!res.body) throw new Error('No body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let assistantText = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buffer.indexOf('\n\n')) !== -1) {
          const raw = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 2);

          for (const line of raw.split('\n')) {
            if (!line.startsWith('data:')) continue;

            // remove only the single leading space after "data:" (if present)
            const payload = line.slice(5).replace(/^ /, '');
            if (payload === '[DONE]') {
              reader.cancel();
              break;
            }

            // ✅ add a space between tokens
            assistantText += (assistantText ? ' ' : '') + payload;

            setMessages((prev) => {
              const next = [...prev];
              const last = next[next.length - 1];
              if (last?.role === 'assistant') next[next.length - 1] = { ...last, content: assistantText };
              return next;
            });
          }
        }
      }
    } catch {
      setMessages((m) => [...m.slice(0, -1), { role: 'assistant', content: 'Oops, something went wrong.' }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 16 }}>
      <h2>FloatChat</h2>
      <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, minHeight: 320 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', margin: '8px 0' }}>
            <div style={{ background: m.role === 'user' ? '#1e293b' : '#e5e7eb', color: m.role === 'user' ? '#fff' : '#111', borderRadius: 12, padding: '8px 12px', maxWidth: '80%', whiteSpace: 'pre-wrap' }}>
              {m.content}
            </div>
          </div>
        ))}
        {sending && <div style={{ opacity: 0.6 }}>Assistant is typing…</div>}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd', color: '#111' }} />
        <button type="submit" disabled={sending} style={{ padding: '10px 16px', borderRadius: 8, background: '#111', color: '#fff' }}>
          Send
        </button>
      </form>
    </div>
  );
}