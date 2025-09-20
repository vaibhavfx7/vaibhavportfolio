
export interface Contact {
  type: 'phone' | 'email' | 'linkedin';
  value: string;
  href: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  contacts: Contact[];
  summary: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Role {
  title: string;
  subTitle: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Experience {
  company: string;
  roles: Role[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface Certification {
  name: string;
}