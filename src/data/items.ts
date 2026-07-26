import type { FolderKey } from './folders';

export type DeskItem =
  | {
      type: 'note';
      variant: 'a' | 'b';
      x: number;
      y: number;
      rot: number;
      eyebrow: string;
      title: string;
      body: string;
      chip?: string;
    }
  | { type: 'portrait'; x: number; y: number }
  | { type: 'folder'; key: FolderKey; x: number; y: number }
  | { type: 'journal'; x: number; y: number }
  | { type: 'resume'; x: number; y: number };

export const ITEMS: DeskItem[] = [
  { type: 'note', variant: 'a', x: 2.5, y: 11, rot: -2.5, eyebrow: 'Product Thinker who builds',
    title: "Hi, I'm Neha.", body: 'Product Manager crafting products that matter — currently interning in product while pursuing my M.Tech in Product Design & Management at IIIT Hyderabad.', chip: 'Open to product roles' },
  { type: 'portrait', x: 3, y: 54 },
  // top row
  { type: 'folder', key: 'experience', x: 32, y: 12 },
  { type: 'folder', key: 'projects', x: 48, y: 11 },
  { type: 'folder', key: 'leadership', x: 64, y: 13 },
  { type: 'resume', x: 84, y: 12 },
  // mid row
  { type: 'folder', key: 'achievements', x: 32, y: 43 },
  { type: 'folder', key: 'skills', x: 48, y: 42 },
  { type: 'folder', key: 'education', x: 64, y: 44 },
  { type: 'journal', x: 84, y: 43 },
  // bottom row
  { type: 'note', variant: 'b', x: 48, y: 71, rot: 2, eyebrow: 'What I love',
    title: '0→1 & impact', body: 'Turning messy problems into delightful, human products — and fostering diversity in tech along the way.' },
];

export const RESUME_LINK = 'https://drive.google.com/drive/folders/1-29jxZ1Bmcezz1jgA6Lh9IOsGdxfpy07?usp=sharing';
