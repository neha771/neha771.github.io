import { useCallback, useEffect, useState } from 'react';
import type { FolderKey } from '../data/folders';

export type WindowKey = FolderKey | 'guestbook';

export function useWindowManager() {
  const [openKey, setOpenKey] = useState<WindowKey | null>(null);
  const [parentKey, setParentKey] = useState<FolderKey | null>(null);

  const openWin = useCallback((key: WindowKey, parent?: FolderKey) => {
    setOpenKey(key);
    setParentKey(key === 'guestbook' ? null : parent ?? null);
  }, []);

  const closeWin = useCallback(() => {
    setOpenKey(null);
    setParentKey(null);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeWin();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [closeWin]);

  return { openKey, parentKey, isOpen: openKey !== null, openWin, closeWin };
}
