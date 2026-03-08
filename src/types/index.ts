export type ProjectType = 'featured' | 'live' | 'opensource';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  teamType: 'Solo' | 'Team';
  projectType: ProjectType;
  period: string;
  tags?: string[];
  highlights: string[];
  techStack: string[];
  link: string;
  linkLabel: string;
  isLive: boolean;
  // Detail page
  overview: string[];
  problemDefinition: string;
  keyFeatures: KeyFeature[];
  techDecisions: TechDecision[];
  problemSolving: ProblemSolving[];
  outcomes: string[];
  links: ProjectLink[];
}

export interface KeyFeature {
  title: string;
  description: string;
}

export interface TechDecision {
  tech: string;
  reason: string;
}

export interface ProblemSolving {
  problem: string;
  approach: string;
  result: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface PersonalInfo {
  name: string;
  nameEn: string;
  title: string;
  phone: string;
  email: string;
  github: string;
  githubUrl: string;
  siteUrl: string;
}

export interface CoreValue {
  title: string;
  description: string[];
}

export interface FocusArea {
  title: string;
  tag: string;
  description: string;
}

export interface SkillItem {
  name: string;
  logo: string;
  color: string;
  logoColor?: string;
}

export interface SkillCategory {
  items: SkillItem[];
  core: string[];
}

export interface Education {
  school: string;
  major: string;
  period: string;
}

export interface Award {
  title: string;
  project: string;
  org: string;
  date: string;
}

export interface OtherExperience {
  period: string;
  content: string;
}

export interface ResumeProject {
  title: string;
  subtitle: string;
  type: 'Solo' | 'Team';
  period: string;
  highlights: string[];
  link: string;
  linkLabel: string;
  isLive: boolean;
  detailId: string;
}
