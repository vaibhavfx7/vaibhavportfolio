
import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO, WORK_EXPERIENCE, SKILLS_DATA, EDUCATION, CERTIFICATIONS } from './constants';
import type { Role, Experience } from './types';
import { LinkedInIcon } from './components/icons/LinkedInIcon';
import { EmailIcon } from './components/icons/EmailIcon';
import { PhoneIcon } from './components/icons/PhoneIcon';
import { SkillsChart } from './components/SkillsChart';

const ExperienceItem: React.FC<{ role: Role; company: string }> = ({ role, company }) => (
    <li className="mb-12">
        <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
            <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2" aria-label={`${role.startDate} to ${role.endDate}`}>
                {role.startDate} — {role.endDate}
            </header>
            <div className="z-10 sm:col-span-6">
                <h3 className="font-medium leading-snug text-slate-200">
                    <div>
                        <span className="inline-block font-bold text-slate-200 group-hover:text-cyan-400 transition-colors duration-300">
                            {role.title} · {company}
                        </span>
                    </div>
                    <div>
                        <div className="text-slate-500" aria-hidden="true">{role.subTitle}</div>
                    </div>
                </h3>
                <ul className="mt-2 list-disc pl-5 space-y-2 text-sm">
                    {role.description.map((desc, i) => <li key={i}>{desc}</li>)}
                </ul>
            </div>
        </div>
    </li>
);

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState('summary');
    const sections = useRef<{[key: string]: HTMLElement | null}>({});
    const [copiedStatus, setCopiedStatus] = useState<'phone' | 'email' | null>(null);

    const handleCopyToClipboard = (text: string | undefined, type: 'phone' | 'email') => {
        if (!text || copiedStatus) return;
        navigator.clipboard.writeText(text).then(() => {
            setCopiedStatus(type);
            setTimeout(() => {
                setCopiedStatus(null);
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-30% 0px -70% 0px' }
        );

        const sectionElements = document.querySelectorAll('section[id]');
        sectionElements.forEach(sec => {
            sections.current[sec.id] = sec as HTMLElement;
            observer.observe(sec);
        });

        return () => {
            sectionElements.forEach(sec => observer.unobserve(sec));
        };
    }, []);

    const navItems = [
        { id: 'summary', label: 'Summary' },
        { id: 'experience', label: 'Experience' },
        { id: 'skills', label: 'Skills' },
        { id: 'education', label: 'Education' },
    ];

    const phoneContact = PERSONAL_INFO.contacts.find(c => c.type === 'phone');
    const emailContact = PERSONAL_INFO.contacts.find(c => c.type === 'email');
    const linkedinContact = PERSONAL_INFO.contacts.find(c => c.type === 'linkedin');

    return (
        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
            <div className="lg:flex lg:justify-between lg:gap-4">
                <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
                    <div>
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                                {PERSONAL_INFO.name}
                            </h1>
                            <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                                {PERSONAL_INFO.title}
                            </h2>
                        </div>
                        
                        <nav className="nav hidden lg:block" aria-label="In-page navigation">
                            <ul className="mt-16 w-max">
                                {navItems.map(item => (
                                     <li key={item.id}>
                                        <a className="group flex items-center py-3" href={`#${item.id}`}>
                                            <span className={`nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 motion-reduce:transition-none ${activeSection === item.id ? 'w-16 bg-slate-200' : ''}`}></span>
                                            <span className={`nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 ${activeSection === item.id ? 'text-slate-200' : ''}`}>
                                                {item.label}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
                        <li className="relative mr-5 shrink-0 group">
                            <a className="block hover:text-slate-200" href={phoneContact?.href} target="_blank" rel="noreferrer noopener" aria-label="Phone">
                                <span className="sr-only">Phone</span>
                                <PhoneIcon />
                            </a>
                            <div 
                                onClick={() => handleCopyToClipboard(phoneContact?.value, 'phone')}
                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-slate-800 text-slate-200 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                                {copiedStatus === 'phone' ? 'Copied!' : phoneContact?.value}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-[4px] border-t-slate-800"></div>
                            </div>
                        </li>
                        <li className="relative mr-5 shrink-0 group">
                            <a className="block hover:text-slate-200" href={emailContact?.href} target="_blank" rel="noreferrer noopener" aria-label="Email">
                                <span className="sr-only">Email</span>
                                <EmailIcon />
                            </a>
                            <div 
                                onClick={() => handleCopyToClipboard(emailContact?.value, 'email')}
                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-slate-800 text-slate-200 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                                {copiedStatus === 'email' ? 'Copied!' : emailContact?.value}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-[4px] border-t-slate-800"></div>
                            </div>
                        </li>
                        <li className="mr-5 shrink-0">
                            <a className="block hover:text-slate-200" href={linkedinContact?.href} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
                                <span className="sr-only">LinkedIn</span>
                                <LinkedInIcon />
                            </a>
                        </li>
                    </ul>
                </header>

                <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
                    <section id="summary" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Summary">
                        <p>{PERSONAL_INFO.summary}</p>
                    </section>

                    <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Work experience">
                        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Experience</h2>
                        </div>
                        <div>
                            <ol className="group/list">
                                {WORK_EXPERIENCE.map(exp => (
                                    exp.roles.map(role => <ExperienceItem key={`${exp.company}-${role.title}`} role={role} company={exp.company} />)
                                ))}
                            </ol>
                        </div>
                    </section>

                    <section id="skills" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Skills">
                         <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Skills</h2>
                        </div>
                        <div className="mb-8">
                           <SkillsChart data={SKILLS_DATA} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {SKILLS_DATA.map(category => (
                                <div key={category.title}>
                                    <h3 className="font-semibold text-slate-300 mb-2">{category.title}</h3>
                                    <ul className="list-disc list-inside text-sm">
                                        {category.skills.map(skill => <li key={skill.name}>{skill.name}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="education" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Education">
                         <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Education</h2>
                        </div>
                        <div className="space-y-6">
                            {EDUCATION.map(edu => (
                                <div key={edu.degree} className="group relative transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50"></div>
                                    <div className="relative">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{edu.period}</p>
                                        <h3 className="font-medium text-slate-200">{edu.degree}</h3>
                                        <p className="text-slate-400">{edu.institution}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="certifications" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Certifications">
                         <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Certifications</h2>
                        </div>
                        <ul className="list-disc list-inside">
                            {CERTIFICATIONS.map(cert => (
                                <li key={cert.name}>{cert.name}</li>
                            ))}
                        </ul>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default App;
