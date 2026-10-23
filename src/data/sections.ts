import { FOLDERS, type FolderFile } from './folders';
import photo from '../assets/neha-bougainvillea.webp';
import imgQwipo from '../assets/images/qwipo.webp';
import imgIrctc from '../assets/images/irctc.webp';
import imgCaseathon from '../assets/images/caseathon.webp';
import imgKsum from '../assets/images/ksum.webp';

export const PHOTO = photo;

export const LINKS = {
  linkedin: 'https://linkedin.com/in/nehasusanmanoj',
  email: 'mailto:nehasusan369@gmail.com',
  github: 'https://github.com/neha771',
  medium: 'https://medium.com/@nehasusan369',
  resume: 'https://drive.google.com/drive/folders/1-29jxZ1Bmcezz1jgA6Lh9IOsGdxfpy07?usp=sharing',
};

export const INTRO =
  "I'm Neha, a product manager who builds. M.Tech in Product Design & Management at IIIT Hyderabad, PM intern at Qwipo and co-founder of Polaroids. I turn messy problems into products people love.";

/** How a card on the wheel is dressed. */
export type CardTone = 'photo' | 'image' | 'magenta' | 'navy' | 'paper';

export interface Section {
  id: string;
  title: string;
  /** Short line under the title inside the deck. */
  blurb: string;
  tone: CardTone;
  cover?: string;
  /** Big typographic figure for cards without a cover image. */
  stat?: string;
  files: FolderFile[];
}

const ME: FolderFile[] = [
  {
    ico: '',
    title: "Hi, I'm Neha",
    sub: 'Product Manager · Builder',
    desc: INTRO,
    tags: ['0→1', 'Product Strategy', 'Research'],
    img: photo,
  },
  {
    ico: '',
    title: 'Right now',
    sub: '2026',
    desc: 'Product Manager Intern at Qwipo, owning B2B commerce problems from discovery to delivery. Co-founder for Product & Growth at Polaroids, a travel photo map on iOS.',
    tags: ['Qwipo', 'Polaroids'],
  },
  {
    ico: '',
    title: 'Studying',
    sub: 'IIIT Hyderabad',
    desc: "M.Tech in Product Design & Management. CGPA 8.61 and on the Dean's List for top academic performance.",
    tags: ['M.Tech', "Dean's List"],
  },
  {
    ico: '',
    title: 'How I work',
    sub: 'Research → PRD → Ship',
    desc: 'Field research first, then crisp PRDs and user stories, then shipping alongside engineering. I love 0 to 1 problems, AI-assisted workflows and products that feel human.',
    tags: ['Field Research', 'PRDs', 'AI Automation'],
  },
  { ico: '', title: 'LinkedIn', sub: 'Say hello', desc: 'The fastest way to reach me.', tags: ['Connect'], link: LINKS.linkedin },
  { ico: '', title: 'Email', sub: 'nehasusan369@gmail.com', desc: 'For roles, collaborations or a good product chat.', tags: ['Write to me'], link: LINKS.email },
  { ico: '', title: 'Resume', sub: 'PDF', desc: 'The one-page version of everything here.', tags: ['Download'], link: LINKS.resume },
];

export const SECTIONS: Section[] = [
  { id: 'me', title: 'Me', blurb: 'A quick hello, what I am up to and how to reach me.', tone: 'photo', cover: photo, files: ME },
  {
    id: 'experience',
    title: 'Experience',
    blurb: 'Product roles, engineering roots and community building.',
    tone: 'image',
    cover: imgQwipo,
    files: FOLDERS.experience.files ?? [],
  },
  {
    id: 'projects',
    title: 'Projects',
    blurb: 'Case studies, research and 0 to 1 builds.',
    tone: 'image',
    cover: imgIrctc,
    files: FOLDERS.productResearch.files ?? [],
  },
  {
    id: 'hackathons',
    title: 'Hackathons',
    blurb: 'Prototypes built against the clock, and a few wins.',
    tone: 'image',
    cover: imgCaseathon,
    files: FOLDERS.hackathons.files ?? [],
  },
  {
    id: 'achievements',
    title: 'Achievements',
    blurb: 'Awards, finals and certifications.',
    tone: 'magenta',
    stat: String(FOLDERS.achievements.files?.length ?? 0).padStart(2, '0'),
    files: FOLDERS.achievements.files ?? [],
  },
  {
    id: 'impact',
    title: 'Impact',
    blurb: 'Programs and communities with real-world reach.',
    tone: 'image',
    cover: imgKsum,
    files: FOLDERS.impact.files ?? [],
  },
  {
    id: 'leadership',
    title: 'Leadership',
    blurb: 'Roles where I led people, programs and events.',
    tone: 'navy',
    stat: '300+',
    files: FOLDERS.leadership.files ?? [],
  },
  {
    id: 'education',
    title: 'Education',
    blurb: 'Where I learned to design, build and manage products.',
    tone: 'paper',
    stat: 'IIIT-H',
    files: FOLDERS.education.files ?? [],
  },
  {
    id: 'skills',
    title: 'Skills',
    blurb: 'The toolkit I bring to a product team.',
    tone: 'magenta',
    stat: String(FOLDERS.skills.files?.length ?? 0).padStart(2, '0'),
    files: FOLDERS.skills.files ?? [],
  },
];
