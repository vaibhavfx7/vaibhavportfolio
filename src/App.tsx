
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
        { id: 'certifications', label: 'Certifications' },
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
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {SKILLS_DATA.map(category => (
                                <div key={category.title} className="rounded-lg bg-slate-800/50 p-6">
                                    <h3 className="mb-4 text-lg font-semibold text-slate-200">{category.title}</h3>
                                    <div className="space-y-3">
                                        {category.skills.map(skill => (
                                            <div key={skill.name} className="flex items-center justify-between gap-3">
                                                <span className="text-sm">{skill.name}</span>
                                                <div className="flex w-24 bg-slate-700 rounded-full h-2">
                                                    <div 
                                                        className="bg-cyan-400 h-2 rounded-full transition-all duration-500" 
                                                        style={{width: `${skill.level}%`}}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="education" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Education">
                         <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Education</h2>
                        </div>
                        <ol className="group/list">
                            {EDUCATION.map(edu => (
                                <li key={edu.degree} className="mb-12">
                                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                                        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                                            {edu.period}
                                        </header>
                                        <div className="z-10 sm:col-span-6">
                                            <h3 className="font-medium leading-snug text-slate-200">
                                                <div>
                                                    <span className="inline-block font-bold text-slate-200 group-hover:text-cyan-400 transition-colors duration-300">
                                                        {edu.degree}
                                                    </span>
                                                </div>
                                                <div className="text-slate-500">{edu.institution}</div>
                                            </h3>
                                            <p className="mt-2 text-sm leading-normal">
                                                {edu.degree.includes('M.Tech') ? 'Specialized in advanced data science methodologies, machine learning algorithms, and big data technologies.' 
                                                : 'Specialized in Data Structures, Algorithms, and Machine Learning. Graduated with First Class with Distinction.'}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </section>

                    <section id="certifications" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Certifications">
                         <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Certifications & Awards</h2>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-lg bg-slate-800/50 p-6">
                                <h3 className="mb-3 text-lg font-semibold text-slate-200">Professional Certifications</h3>
                                <ul className="space-y-2">
                                    {CERTIFICATIONS.filter(cert => cert.name.includes('Google')).map(cert => (
                                        <li key={cert.name} className="flex items-center">
                                            <svg className="mr-2 h-4 w-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="text-sm">{cert.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="rounded-lg bg-slate-800/50 p-6">
                                <h3 className="mb-3 text-lg font-semibold text-slate-200">Awards & Recognition</h3>
                                <ul className="space-y-2">
                                    {CERTIFICATIONS.filter(cert => !cert.name.includes('Google')).map(cert => (
                                        <li key={cert.name} className="flex items-center">
                                            <svg className="mr-2 h-4 w-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                            <span className="text-sm">{cert.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default App;
