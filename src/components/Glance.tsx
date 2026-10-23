import { useEffect, type CSSProperties, type ReactNode } from 'react';
import { FOLDERS } from '../data/folders';
import { LINKS, PHOTO } from '../data/sections';

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

function Block({ title, children, i }: { title: string; children: ReactNode; i: number }) {
  return (
    <section className="g-block" style={{ '--i': i } as CSSProperties}>
      <h2 className="g-head">
        <span className="g-tri" aria-hidden="true" />
        {title}
      </h2>
      {children}
    </section>
  );
}

/** The one-screen summary: about, experience, skills, achievements, contact. */
export function Glance() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const skills = FOLDERS.skills.files ?? [];
  const achievements = FOLDERS.achievements.files ?? [];

  return (
    <main className="glance" id="top">
      <header className="g-intro">
        <img className="g-photo" src={PHOTO} alt="Neha Susan Manoj among bougainvillea" />
        <div>
          <span className="status-chip">
            <span className="dot" aria-hidden="true" /> Open to product roles
          </span>
          <h1 className="g-name">Neha Susan Manoj</h1>
          <p className="g-tag">Product manager who builds. Hyderabad, India.</p>
        </div>
      </header>

      <div className="g-grid">
        <div className="g-col">
          <Block title="About me" i={0}>
            {ABOUT.map((p) => (
              <p className="g-p" key={p.slice(0, 20)}>
                {p}
              </p>
            ))}
          </Block>

          <Block title="Education" i={2}>
            <ul className="g-list">
              {EDUCATION.map((e) => (
                <li key={e.school}>
                  <strong>{e.school}</strong>
                  <span>{e.what}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Contact" i={4}>
            <a className="g-email" href={LINKS.email}>
              nehasusan369@gmail.com
            </a>
            <div className="g-contact">
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={LINKS.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={LINKS.medium} target="_blank" rel="noreferrer">
                Medium
              </a>
              <a className="primary" href={LINKS.resume} target="_blank" rel="noreferrer">
                Download resume ↓
              </a>
            </div>
          </Block>
          <Block title="Achievements" i={5}>
            <ul className="g-ach">
              {achievements.map((a) => (
                <li key={a.title}>
                  <strong>{a.title}</strong>
                  {a.desc && <span>{a.desc}</span>}
                </li>
              ))}
            </ul>
          </Block>
        </div>

        <div className="g-col">
          <Block title="Work experience" i={1}>
            {TIMELINE.map((g) => (
              <div className="g-years" key={g.years}>
                <span className="g-year">• {g.years}</span>
                {g.roles.map((r) => (
                  <div className="g-role" key={r.company + r.role}>
                    <span className="g-company">
                      {r.company}
                      {r.when && <small>{r.when}</small>}
                    </span>
                    <span className="g-line" aria-hidden="true" />
                    <span className="g-title">{r.role}</span>
                  </div>
                ))}
              </div>
            ))}
          </Block>

          <Block title="Skills" i={3}>
            <div className="g-skills">
              {skills.map((s) => (
                <div className="g-skill" key={s.title}>
                  <span className="g-skill-k">{s.title}</span>
                  <span className="g-skill-v">{s.tags.join(' · ')}</span>
                </div>
              ))}
            </div>
          </Block>
        </div>
      </div>
    </main>
  );
}
