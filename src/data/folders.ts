import imgHci from '../assets/images/hci.png';
import imgOotd from '../assets/images/ootd.png';
import imgUrm from '../assets/images/urm.jpg';
import imgSkillswap from '../assets/images/skillswap.jpg';
import imgDesignThinking from '../assets/images/design-thinking.jpg';
import imgVidyavichar from '../assets/images/vidyavichar.jpg';
import imgBrandstorm from '../assets/images/brandstorm.png';
import imgInstagramPmf from '../assets/images/instagram-pmf.jpg';
import imgZerodha from '../assets/images/zerodha.jpg';
import imgIndah from '../assets/images/indah.jpg';
import imgEcotopia from '../assets/images/ecotopia.jpg';
import imgVivaLaVulva from '../assets/images/viva-la-vulva.jpg';
import imgPranaah from '../assets/images/pranaah.png';
import imgWestart from '../assets/images/westart.jpg';
import imgHackatarch from '../assets/images/hackatarch.jpg';

export interface FolderFile {
  ico: string;
  title: string;
  sub?: string;
  desc?: string;
  tags: string[];
  link?: string;
  story?: string;
  img?: string;
}

export interface FolderDef {
  name: string;
  em: string;
  f1: string;
  f2: string;
  tab: string;
  desc?: string;
  subfolders?: FolderKey[];
  files?: FolderFile[];
}

export type FolderKey =
  | 'experience'
  | 'projects'
  | 'productResearch'
  | 'hackathons'
  | 'impact'
  | 'leadership'
  | 'education'
  | 'achievements'
  | 'skills';

export const FOLDERS: Record<FolderKey, FolderDef> = {
  experience: {
    name: 'Experience', em: '💼',
    f1: '#3a2c4e', f2: '#5a3d82', tab: '#6b4a9a',
    files: [
      { ico: '🛒', title: 'Product Manager Intern', sub: 'Qwipo · May 2026 – Present',
        desc: 'Leading 0→1 design of a vendor onboarding portal. Authored PRDs & user stories across seller store, retailer & logistics apps.', tags: ['0→1', 'PRDs', 'Market Research'] },
      { ico: '🧭', title: 'Product Manager Intern', sub: 'Directure · Mar 2026 – May 2026',
        desc: 'Owned product discovery — user interviews, PRDs, and a 0→1 dev workflow in Linear. Built investor pitch decks with founders.', tags: ['Discovery', 'Linear', 'Strategy'] },
      { ico: '💻', title: 'Associate Software Development Engineer', sub: 'Publicis Sapient · Feb 2024 – Aug 2025',
        desc: 'Owned an internal stakeholder tool for Nissan end-to-end, cutting manual effort 50%+ and report time from ~2 days to <15 min.', tags: ['Automation', 'Agile', 'Nissan'] },
      { ico: '🚀', title: 'Technology Fellow — Women Entrepreneurship', sub: 'Kerala Startup Mission · Aug 2023 – Jan 2024',
        desc: 'Designed & ran WE Start, a 0→1 pre-incubation program supporting 200+ women-led startups; +50% participant satisfaction.', tags: ['Program Mgmt', '0→1', 'Research'] },
      { ico: '🌱', title: 'Product Manager Intern', sub: 'T4G Impact Tech (Aikyam Fellows) · Feb – Apr 2023',
        desc: 'Drove ideation & roadmap for a fellowship platform; ran user interviews with NGO partners to refine MVP scope.', tags: ['Roadmap', 'User Research', 'Impact'] },
      { ico: '👥', title: 'Community Manager', sub: 'TinkerHub Foundation · Jun 2021 – Apr 2023',
        desc: 'Scaled a 15,000+ member tech community. Ran 40+ events and lifted active participation ~85%.', tags: ['Community', 'Events', 'Growth'] },
    ],
  },
  projects: {
    name: 'Projects', em: '🎨',
    f1: '#2a3c63', f2: '#3f5e96', tab: '#4d6fa8',
    subfolders: ['productResearch', 'hackathons', 'impact'],
  },
  productResearch: {
    name: 'Product & Research Projects', em: '🔍',
    f1: '#2a3c63', f2: '#3f5e96', tab: '#4d6fa8',
    desc: 'Case studies, research projects & 0→1 builds',
    files: [
      { ico: '🛣️', title: 'Designing for Indian Roads', desc: 'HCI study on usability challenges of Indian road conditions → interaction principles & interface recommendations.', tags: ['HCI', 'Research', 'Interaction'], link: 'https://drive.google.com/file/d/13301HTq8iZ64Zr3dPrxyB67qYBWju-Eg/view', img: imgHci },
      { ico: '🤖', title: 'Emotional Sharing with AI Tools', desc: 'Mixed-methods study on how adults 18–40 emotionally engage with AI conversational tools.', tags: ['User Research', 'Card Sorting'], link: 'https://drive.google.com/file/d/19n12xb1Io1uN-WviCQYlIfzH3ArvzFib/view', img: imgUrm },
      { ico: '👗', title: 'OOTD', desc: 'Private iOS outfit-diary app — polaroid-style daily photo logging with occasion & location tags, no social feed, built around user privacy.', tags: ['0→1', 'iOS', 'Product Thinking'], link: 'https://ootd-app-topaz.vercel.app/', img: imgOotd },
      { ico: '🔄', title: 'SkillSwap', desc: 'Peer-to-peer skill exchange platform — product discovery, Figma wireframing & full-stack MERN build.', tags: ['0→1', 'Full Stack', 'Wireframing'], link: 'https://drive.google.com/file/d/1dPdX8xhUIIbWTVMqVriklOKalOiFoW-j/view', img: imgSkillswap },
      { ico: '🎨', title: 'Design Thinking Project', desc: 'A collaborative maker-experience platform built through the design thinking process.', tags: ['Design Thinking', 'IIIT-H'], link: 'https://drive.google.com/file/d/1Wb3ZXYt-Vw4KUOSokVyeIzdDtD68FGi9/view', img: imgDesignThinking },
      { ico: '💬', title: 'Vidya Vichar', desc: 'Interactive classroom Q&A system for real-time student engagement.', tags: ['Full Stack', 'Product'], link: 'https://github.com/Ishaan-Giri/VidyaVichar.git', img: imgVidyavichar },
      { ico: '🕯️', title: 'Ember', desc: "A two-format luxury fragrance ecosystem — L'Oréal Brandstorm '26.", tags: ['Product Design', "L'Oréal"], link: 'https://drive.google.com/file/d/15JRh9G1y_Xgr6MGmNqxueK7LtoqeSp38/view?usp=sharing', img: imgBrandstorm },
      { ico: '📸', title: 'Instagram — PMF Case Study', desc: 'Product-market-fit teardown of Instagram.', tags: ['Product Strategy', 'PMF'], link: 'https://www.canva.com/design/DAGzHc6y5ho/YSE1gPugSj6HgSdPTyUaNQ/view', img: imgInstagramPmf },
      { ico: '📊', title: 'Zerodha — Product Strategy', desc: 'Market analysis & product strategy deep-dive.', tags: ['Market Analysis', 'Strategy'], link: 'https://www.canva.com/design/DAG0WQk_icc/1CpRrfeQny5awClTrFDOlg/view', img: imgZerodha },
    ],
  },
  hackathons: {
    name: 'Hackathon Wins', em: '🏆',
    f1: '#4e2c3a', f2: '#823d54', tab: '#9a4866',
    desc: 'Hackathon-winning prototypes & finalist projects',
    files: [
      { ico: '♿', title: 'Indah', desc: 'Accessibility platform for differently-abled users — led scoping, personas & rapid prototyping. Hackathon winner.', tags: ['Accessibility', 'Winner'], link: 'https://devpost.com/software/indah', img: imgIndah },
      { ico: '🌍', title: 'Ecotopia', desc: 'Climate-impact solution that reached the national finals — IBM Call for Code 2021 National Finalist.', tags: ['Sustainability', 'IBM Finalist'], link: 'https://devpost.com/software/ecotopia-acus9o', img: imgEcotopia },
      { ico: '🌸', title: 'Viva La Vulva', desc: 'Menstrual health & awareness platform.', tags: ['HealthTech', 'Product'], link: 'https://devpost.com/software/viva-la-vulva', img: imgVivaLaVulva },
      { ico: '🧠', title: 'Pranaah', desc: 'Mental health support application — built under hackathon conditions for accessible, everyday care.', tags: ['Mental Health', 'Hackathon'], link: 'https://devfolio.co/projects/pranah-6099', img: imgPranaah },
    ],
  },
  impact: {
    name: 'Impact', em: '🌍',
    f1: '#3a2c1a', f2: '#6e4a20', tab: '#8a5e28',
    desc: 'Programs & community work with real-world impact',
    files: [
      { ico: '👩‍💼', title: 'WE Start Program', desc: 'Designed & ran a 0→1 pre-incubation program supporting 200+ women-led startups across Kerala at Kerala Startup Mission.', tags: ['Program Mgmt', 'DEI', 'KSUM'], link: 'https://startupmission.kerala.gov.in/pages/westart_cohort1', story: 'https://spice-shame-f3e.notion.site/Building-a-Women-Entrepreneurship-Development-Program-at-KSUM-13d34d54f88142f0b88d49c408f6c838', img: imgWestart },
      { ico: '🏗️', title: 'Hack@Arch', desc: "Kerala's largest offline student-led hackathon post-covid — conceptualized and led end-to-end from scratch.", tags: ['Leadership', 'Community', 'Events'], link: 'https://medium.com/@nehasusan369/from-ideation-to-implementation-my-journey-of-organizing-a-hackathon-from-scratch-bb8e4f8208f5', img: imgHackatarch },
    ],
  },
  leadership: {
    name: 'Leadership', em: '🌟',
    f1: '#4a3a1d', f2: '#8a6a28', tab: '#a07e30',
    files: [
      { ico: '🎓', title: "Student Placement Coordinator '26", sub: 'IIIT Hyderabad', desc: 'Representing & coordinating placements for the cohort.', tags: ['IIIT-H'] },
      { ico: '🎤', title: 'Mentor & Speaker', sub: '300+ mentees', desc: 'Mentoring across Product, UI/UX & Women Entrepreneurship.', tags: ['Mentorship', 'Speaking'] },
      { ico: '💡', title: 'Organizer & Host — WE Start', sub: 'Kerala Startup Mission', desc: 'Hosted & ran the women entrepreneurship pre-incubation program.', tags: ['Events', 'DEI'] },
      { ico: '🏗️', title: 'Lead Organizer — Hack@Arch', sub: 'Largest offline student hackathon, Kerala', desc: 'Built it from scratch — ideation to execution.', tags: ['Leadership'] },
      { ico: '⚙️', title: 'IEEE Leadership', sub: 'CS SB Chair · SB Vice Chair · WIE Vice Chair', desc: 'Held three IEEE student-branch leadership roles.', tags: ['IEEE', 'Community'] },
      { ico: '👩‍💻', title: 'Women in Tech Lead', sub: 'TinkerHub · GDSC Lead', desc: 'Drove women-in-tech initiatives and led the Google Developer Student Clubs chapter.', tags: ['DEI', 'Community'] },
    ],
  },
  education: {
    name: 'Education', em: '🎓',
    f1: '#1d4a3e', f2: '#2f6e58', tab: '#3a8068',
    files: [
      { ico: '🎓', title: 'M.Tech, Product Design & Management', sub: 'IIIT Hyderabad', desc: '2025 – Present · CGPA 8.61', tags: ['Product', 'Design'] },
      { ico: '💻', title: 'B.Tech, Computer Science & Engineering', sub: 'Govt Engineering College, Thrissur', desc: '2019 – 2023 · CGPA 8.81', tags: ['CSE'] },
      { ico: '📚', title: 'AISSCE (PCMC) & AISSE', sub: 'Good Shepherd Public School, Thengana', desc: 'AISSCE 2019 · 96.2%   |   AISSE 2017 · CGPA 10', tags: ['School'] },
    ],
  },
  achievements: {
    name: 'Achievements', em: '⭐',
    f1: '#3a2c4e', f2: '#5a3d82', tab: '#6b4a9a',
    files: [
      { ico: '☁️', title: 'AWS Certified Cloud Practitioner', desc: 'CLF-C02 Certification', tags: ['Cloud'] },
      { ico: '🥇', title: 'IBM Call for Code 2021', desc: 'National Finalist', tags: ['Hackathon'] },
      { ico: '🎓', title: 'Carolyn Leighton Scholar', desc: 'Recognized for academic excellence', tags: ['Scholarship'] },
      { ico: '💡', title: 'Young Innovators Program', desc: 'State Winner', tags: ['Innovation'] },
      { ico: '🏆', title: 'hack() National Hackathon', desc: '1st Prize Winner', tags: ['Winner'] },
      { ico: '🥈', title: 'Make-a-thon National', desc: '2nd Prize', tags: ['Hackathon'] },
      { ico: '🌿', title: 'Envirothon International', desc: '2nd Place', tags: ['Sustainability'] },
      { ico: '⛰️', title: 'Hack the Mountains National', desc: 'Top 55', tags: ['Hackathon'] },
    ],
  },
  skills: {
    name: 'Skills', em: '🧩',
    f1: '#1d4444', f2: '#2f6e6a', tab: '#3a807c',
    files: [
      { ico: '🧩', title: 'Product Management', tags: ['Product Strategy', 'Roadmapping', 'PRD & User Stories', 'Feature Prioritization', 'OKRs & Metrics', 'GTM'] },
      { ico: '🔍', title: 'Research & Design', tags: ['User Research', 'Design Thinking', 'Wireframing', 'Usability Testing', 'Journey Design', 'Competitive Analysis'] },
      { ico: '⚡', title: 'Execution & Delivery', tags: ['Agile & Scrum', 'Sprint Planning', 'Stakeholder Comms', 'Cross-functional', 'Program Mgmt'] },
      { ico: '🛠️', title: 'Tools', tags: ['Figma', 'Jira', 'Linear', 'Notion', 'Confluence', 'Postman', 'Git', 'SQL', 'Claude'] },
      { ico: '💻', title: 'Technical', tags: ['Java', 'Spring Boot', 'MERN', 'REST APIs', 'HTML', 'CSS', 'JS'] },
      { ico: '☁️', title: 'Infrastructure & Data', tags: ['AWS', 'Docker', 'Jenkins', 'PostgreSQL', 'MongoDB'] },
    ],
  },
};
