const STORAGE_KEY = 'nsm_desktop_positions';

export interface DeskPosition {
  left: number;
  top: number;
}

function loadAll(): Record<number, DeskPosition> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function loadPosition(index: number): DeskPosition | undefined {
  return loadAll()[index];
}

export function savePosition(index: number, pos: DeskPosition) {
  try {
    const all = loadAll();
    all[index] = pos;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // localStorage unavailable — position just won't persist
  }
}
