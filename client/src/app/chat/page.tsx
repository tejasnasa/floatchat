'use client';
import { useState, FormEvent } from 'react';

type Role = 'user' | 'assistant';
type Message = { role: Role; content: string };
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! Ask me anything.' },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [graphData, setGraphData] = useState<any | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const userText = input.trim();
    // Optimistically add user + a placeholder assistant bubble
    setMessages((m) => [...m, { role: 'user', content: userText }, { role: 'assistant', content: '…' }]);
    setInput('');
    setSending(true);

    try {
      const res = await fetch(`${backendUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 🔁 Backend expects `user_prompt`; it can also accept `history` if you want
        body: JSON.stringify({
          user_prompt: userText,
          history: messages,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const { generated_answer, graph_data } = await res.json();

      setGraphData(graph_data ?? null);

      // Replace the last assistant stub with the actual answer
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last?.role === 'assistant') {
          next[next.length - 1] = {
            ...last,
            content: (generated_answer ?? '').trim() || 'I couldn’t generate a response.',
          };
        }
        return next;
      });
    } catch (err: any) {
      // Replace the last assistant stub with an error message
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last?.role === 'assistant') {
          next[next.length - 1] = {
            ...last,
            content: 'Oops, something went wrong.',
          };
        }
        return next;
      });
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 16 }}>
      <h2>FloatChat</h2>

      <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, minHeight: 320 }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
              margin: '8px 0'
            }}
          >
            <div
              style={{
                background: m.role === 'user' ? '#1e293b' : '#e5e7eb',
                color: m.role === 'user' ? '#fff' : '#111',
                borderRadius: 12,
                padding: '8px 12px',
                maxWidth: '80%',
                whiteSpace: 'pre-wrap'
              }}
            >
              {m.content}
            </div>
          </div>
        ))}

        {sending && <div style={{ opacity: 0.6 }}>Assistant is thinking…</div>}
      </div>

      {/* Optional: show graph data if backend returns it */}
      {graphData && (
        <pre
          style={{
            marginTop: 12,
            background: '#0b0f19',
            color: '#e5e7eb',
            padding: 12,
            borderRadius: 8,
            overflowX: 'auto'
          }}
        >
          {JSON.stringify(graphData, null, 2)}
        </pre>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd', color: '#111' }}
        />
        <button type="submit" disabled={sending} style={{ padding: '10px 16px', borderRadius: 8, background: '#111', color: '#fff' }}>
          Send
        </button>
      </form>
    </div>
  );
}