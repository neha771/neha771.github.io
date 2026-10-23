import { useEffect, useId, useState, type CSSProperties, type ReactNode } from 'react';
import { FOLDERS } from '../data/folders';
import type { FolderFile } from '../data/folders';
import { LINKS } from '../data/sections';
import facePhoto from '../assets/neha-face.webp';

const ABOUT = [
  "I'm Neha, a product manager who doesn't stop at the idea. I like sitting with the people who live a problem, writing it down clearly, and then building it with engineering until it is real and in people's hands.",
  "I started as a software engineer at Publicis Sapient, ran a program for 200+ women founders at Kerala Startup Mission and grew a 15,000-member tech community at TinkerHub. Today I'm a PM intern at Qwipo, co-founder of Polaroids and an M.Tech student in Product Design & Management at IIIT Hyderabad.",
];

interface Role {
  company: string;
  role: string;
  when?: string;
}

const TIMELINE: { years: string; roles: Role[] }[] = [
  {
    years: '2026 – Now',
    roles: [
      { company: 'Qwipo', role: 'Product Manager Intern', when: 'May 2026' },
      { company: 'Polaroids', role: 'Co-Founder, Product & Growth', when: 'Aug 2026' },
      { company: 'Directure', role: 'Product Manager Intern', when: 'Mar – May 2026' },
    ],
  },
  { years: '2024 – 2025', roles: [{ company: 'Publicis Sapient', role: 'Associate Software Development Engineer' }] },
  {
    years: '2023 – 2024',
    roles: [
      { company: 'Kerala Startup Mission', role: 'Technology Fellow' },
      { company: 'T4G Impact Tech', role: 'Product Manager Intern' },
    ],
  },
  { years: '2021 – 2023', roles: [{ company: 'TinkerHub Foundation', role: 'Community Manager' }] },
];

const EDUCATION = [
  { school: 'IIIT Hyderabad', what: "M.Tech, Product Design & Management · 2025 – 2027 · CGPA 8.61 · Dean's List" },
  { school: 'GEC Thrissur', what: 'B.Tech, Computer Science · 2019 – 2023 · CGPA 8.81' },
];

const EXPERIENCE = FOLDERS.experience.files ?? [];
const EDU_FILES = FOLDERS.education.files ?? [];
const roleIndex = (company: string) => EXPERIENCE.findIndex((f) => f.sub?.startsWith(company));
const eduIndex = (school: string) => EDU_FILES.findIndex((f) => f.sub?.includes(school.split(' ')[0]));

interface BlockProps {
  title: string;
  i: number;
  children: ReactNode;
  className?: string;
  onOpen?: () => void;
  /** Collapsed by default; the heading becomes a toggle that opens it in place. */
  collapsible?: boolean;
  /** Shown beside a collapsed heading, e.g. "15 projects". */
  summary?: string;
}

function Block({ title, i, children, className = '', onOpen, collapsible = false, summary }: BlockProps) {
  const [expanded, setExpanded] = useState(!collapsible);
  const bodyId = useId();

  return (
    <section
      className={`g-block ${className}${collapsible ? ' collapsible' : ''}${expanded ? ' open' : ''}`}
      style={{ '--i': i } as CSSProperties}
    >
      <div className="g-head-row">
        <h2 className="g-head">
          {collapsible ? (
            <button
              type="button"
              className="g-toggle"
              aria-expanded={expanded}
              aria-controls={bodyId}
              onClick={() => setExpanded((v) => !v)}
            >
              <span className="g-tri" aria-hidden="true" />
              {title}
              {summary && <span className="g-summary">{summary}</span>}
            </button>
          ) : (
            <>
              <span className="g-tri" aria-hidden="true" />
              {title}
            </>
          )}
        </h2>
        <div className="g-head-actions">
          {collapsible && (
            <button
              type="button"
              className="g-more g-show"
              aria-expanded={expanded}
              aria-controls={bodyId}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? 'Hide' : 'Show'}
            </button>
          )}
          {onOpen && (
            <button type="button" className="g-more" onClick={onOpen}>
              See cards →
            </button>
          )}
        </div>
      </div>
      {collapsible ? (
        // grid-rows 0fr → 1fr animates to the content's natural height
        <div className="g-collapse" id={bodyId} inert={!expanded}>
          <div className="g-collapse-inner">{children}</div>
        </div>
      ) : (
        children
      )}
    </section>
  );
}

/** A row of project tiles; each opens its card in the matching deck. */
function ProjectGroup({ label, items, onPick }: { label: string; items: FolderFile[]; onPick: (i: number) => void }) {
  return (
    <div className="g-proj-group">
      <span className="g-sublabel">{label}</span>
      <div className="g-projects">
        {items.map((p, i) => (
          <button type="button" className="g-proj" key={p.title} onClick={() => onPick(i)}>
            <span className="g-proj-thumb">
              {p.img ? (
                <img src={p.img} alt="" loading="lazy" draggable={false} />
              ) : (
                <span className="g-proj-word">{p.title.split(/[\s,:]/)[0]}</span>
              )}
            </span>
            <span className="g-proj-title">{p.title}</span>
            {p.desc && <span className="g-proj-desc">{p.desc}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

interface GlanceProps {
  /** Open a section's deck with one card flipped to its details. */
  onJump: (sectionId: string, focus: number) => void;
}

/**
 * The one-screen summary, as a sheet over the card wheel. Reads top to bottom:
 * who → what I've done → what I can do → recognition. Every item links into its card.
 */
export function Glance({ onJump }: GlanceProps) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  const skills = FOLDERS.skills.files ?? [];
  const achievements = FOLDERS.achievements.files ?? [];
  const projects = FOLDERS.productResearch.files ?? [];
  const hackathons = FOLDERS.hackathons.files ?? [];

  return (
    <div className="glance-sheet" role="dialog" aria-modal="true" aria-label="At a glance">
      <main className="glance">
        <header className="g-intro">
          <img className="g-photo" src={facePhoto} alt="Neha Susan Manoj" />
          <div className="g-who">
            <span className="status-chip">
              <span className="dot" aria-hidden="true" /> Open to Product Management roles
            </span>
            <h1 className="g-name">Neha Susan Manoj</h1>
            <p className="g-tag">Product manager who builds · Hyderabad, India</p>
          </div>
          <div className="g-actions">
            <a className="primary" href={LINKS.resume} target="_blank" rel="noreferrer">
              Download resume ↓
            </a>
            <a href={LINKS.email}>nehasusan369@gmail.com</a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </header>

        <div className="g-grid">
          <div className="g-col">
            <Block title="About me" i={0} onOpen={() => onJump('me', 0)}>
              {ABOUT.map((p) => (
                <p className="g-p" key={p.slice(0, 20)}>
                  {p}
                </p>
              ))}
            </Block>

            <Block title="Education" i={2} onOpen={() => onJump('education', 0)}>
              <ul className="g-list">
                {EDUCATION.map((e) => (
                  <li key={e.school}>
                    <button
                      type="button"
                      className="g-link"
                      onClick={() => onJump('education', Math.max(0, eduIndex(e.school)))}
                    >
                      <strong>{e.school}</strong>
                      <span>{e.what}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          <div className="g-col">
            <Block title="Work experience" i={1} onOpen={() => onJump('experience', 0)}>
              {TIMELINE.map((g) => (
                <div className="g-years" key={g.years}>
                  <span className="g-year">• {g.years}</span>
                  {g.roles.map((r) => (
                    <button
                      type="button"
                      className="g-role g-link"
                      key={r.company + r.role}
                      onClick={() => onJump('experience', Math.max(0, roleIndex(r.company)))}
                    >
                      <span className="g-company">
                        {r.company}
                        {r.when && <small>{r.when}</small>}
                      </span>
                      <span className="g-line" aria-hidden="true" />
                      <span className="g-title">{r.role}</span>
                      <span className="g-go" aria-hidden="true">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </Block>
          </div>
        </div>

        <Block
          title="Projects"
          i={3}
          className="g-wide"
          collapsible
          summary={`${projects.length + hackathons.length} projects`}
          onOpen={() => onJump('projects', 0)}
        >
          <ProjectGroup label="Product & research" items={projects} onPick={(i) => onJump('projects', i)} />
          <ProjectGroup label="Hackathon builds" items={hackathons} onPick={(i) => onJump('hackathons', i)} />
        </Block>

        <Block
          title="Skills"
          i={4}
          className="g-wide"
          collapsible
          summary={`${skills.length} areas`}
          onOpen={() => onJump('skills', 0)}
        >
          <div className="g-skills">
            {skills.map((s, i) => (
              <button type="button" className="g-skill g-link" key={s.title} onClick={() => onJump('skills', i)}>
                <span className="g-skill-k">{s.title}</span>
                <span className="g-skill-v">{s.tags.join(' · ')}</span>
              </button>
            ))}
          </div>
        </Block>

        <Block
          title="Achievements"
          i={5}
          className="g-wide"
          collapsible
          summary={`${achievements.length} wins`}
          onOpen={() => onJump('achievements', 0)}
        >
          <ul className="g-ach">
            {achievements.map((a, i) => (
              <li key={a.title}>
                <button type="button" className="g-link" onClick={() => onJump('achievements', i)}>
                  <strong>{a.title}</strong>
                  {a.desc && <span>{a.desc}</span>}
                </button>
              </li>
            ))}
          </ul>
        </Block>
      </main>
    </div>
  );
}
