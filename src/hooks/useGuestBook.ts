import { useCallback, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface GuestBookEntry {
  n: string;
  m: string;
}

const SEED: GuestBookEntry[] = [
  { n: 'a fellow PM', m: 'The WE Start initiative is incredible — 200+ founders supported. So inspired.' },
  { n: 'future collaborator', m: 'This whole portfolio is a vibe. Would love to build something together ✦' },
];

export function useGuestBook() {
  const [entries, setEntries] = useState<GuestBookEntry[]>(SEED);
  const [loading, setLoading] = useState(false);
  const [signing, setSigning] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('guestbook')
      .select('name,message')
      .order('created_at', { ascending: false })
      .limit(100);
    setLoading(false);
    if (error || !data || !data.length) {
      setEntries(SEED);
      return;
    }
    setEntries(data.map((d) => ({ n: d.name as string, m: d.message as string })));
  }, []);

  const sign = useCallback(async (name: string, message: string) => {
    const n = name.trim() || 'a kind stranger';
    const m = message.trim();
    if (!m) return { ok: false as const };
    setSigning(true);
    const { error } = await supabase.from('guestbook').insert({ name: n, message: m });
    setSigning(false);
    if (error) return { ok: false as const };
    setEntries((prev) => [{ n, m }, ...prev]);
    return { ok: true as const };
  }, []);

  return { entries, loading, signing, refresh, sign };
}
