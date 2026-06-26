import type { NavLink, Project, Skill, ExperienceItem, Achievement } from '../types'

export const NAV_LINKS: NavLink[] = [
  { label: 'Realm', href: '#home', rune: 'ᚠ' },
  { label: 'Chronicle', href: '#about', rune: 'ᚢ' },
  { label: 'Arsenal', href: '#skills', rune: 'ᚦ' },
  { label: 'Portals', href: '#projects', rune: 'ᚩ' },
  { label: 'Journey', href: '#experience', rune: 'ᚱ' },
  { label: 'Legends', href: '#achievements', rune: 'ᚳ' },
  { label: 'Summon', href: '#contact', rune: 'ᛟ' },
]

export const HERO_DATA = {
  greeting: 'Welcome, Traveller',
  name: 'Naufal Mumtaz',
  title: 'Backend Engineer & Fullstack Developer',
  roles: ['Backend Engineer', 'Fullstack Developer', 'Mobile Developer', 'OSINT & Security Engineer'],
  description:
    'Results-driven Backend Engineer with 5+ years of full-stack mastery across web, mobile, and enterprise platforms. I architect secure, scalable systems — from OSINT intelligence platforms to government apps.',
  portraitAlt: 'Naufal Mumtaz',
}

export const ABOUT_DATA = {
  paragraphs: [
    'Born and raised in Bandung, Indonesia, I have been forging digital solutions since 2020 — from PHP and Laravel APIs to full-blown mobile apps in Swift and Flutter. My craft thrives at the intersection of security, performance, and elegant architecture.',
    'My current focus is Cyber Security and Open Source Intelligence (OSINT): integrating threat intelligence APIs (Shodan, WhoisXML, DeHashed), building secure OpenVPN tunnels, and optimising databases for high-volume intelligence datasets.',
    'When not engineering backend systems, I explore generative AI, contribute to enterprise low-code platforms, and build the occasional immersive 3D web experience. Every problem is a puzzle — every solution, a spell cast in code.',
  ],
  stats: [
    { value: '5+', label: 'Years of Craft' },
    { value: '20+', label: 'Realms Forged' },
    { value: '8+', label: 'Companies Served' },
    { value: '∞', label: 'Curiosity' },
  ],
  timeline: [
    { year: '2020', event: 'First Incantation', desc: 'Wrote my first Laravel RESTful API. The arcane arts of PHP began to reveal themselves.' },
    { year: '2021', event: 'The Awakening', desc: 'Mobile development unlocked: multi-platform auth, real-time video calls, and healthcare algorithms.' },
    { year: '2022', event: 'The Ascension', desc: 'Enterprise mastery at PT. Telkom Indonesia — low-code platforms, PostgreSQL, Oracle DB.' },
    { year: '2023', event: 'The Expansion', desc: 'Web, mobile, and government apps — Bank BSI, Suquise Tower, and the IKN Capital City app.' },
    { year: '2025', event: 'The Reckoning', desc: 'Backend Engineer for a Cyber Threat Intelligence & OSINT platform. Darkness hath been illuminated.' },
  ],
}

export const SKILLS: Skill[] = [
  // Backend (primary)
  { name: 'PHP / Yii2 / Laravel', level: 95, color: '#7c3aed', icon: '🐘', category: 'Backend' },
  { name: 'Node.js / Nest.js', level: 88, color: '#68a063', icon: '🌿', category: 'Backend' },
  { name: 'MySQL / PostgreSQL', level: 85, color: '#336791', icon: '🗄️', category: 'Backend' },
  { name: 'Docker / DevOps', level: 78, color: '#2496ed', icon: '🐳', category: 'Backend' },
  // Frontend
  { name: 'React / Next.js', level: 85, color: '#61dafb', icon: '⚛', category: 'Frontend' },
  { name: 'TypeScript', level: 88, color: '#3178c6', icon: '🔷', category: 'Frontend' },
  { name: 'Angular / Vue.js', level: 80, color: '#dd0031', icon: '🔺', category: 'Frontend' },
  // Mobile
  { name: 'React Native / Flutter', level: 82, color: '#00d4ff', icon: '📱', category: 'Mobile' },
  { name: 'Swift / Kotlin', level: 72, color: '#e87d0d', icon: '🍎', category: 'Mobile' },
  // Security & OSINT
  { name: 'OSINT / Threat Intel', level: 85, color: '#ff4060', icon: '🔍', category: 'Security & OSINT' },
  { name: 'API Design / Swagger', level: 90, color: '#00d97e', icon: '📜', category: 'Security & OSINT' },
  { name: 'OpenVPN / Networking', level: 75, color: '#8866ff', icon: '🔒', category: 'Security & OSINT' },
]

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Cyber Threat Intelligence Platform',
    subtitle: 'OSINT & Security Intelligence System',
    description: 'Full-scale threat intelligence platform integrating Shodan, WhoisXML, DeHashed, and Wayback Machine for automated domain, IP, and data breach investigations with APK security scanning via MobSF.',
    tech: ['PHP / Yii2', 'MySQL', 'OpenVPN', 'MobSF', 'Swagger'],
    color: '#ff4060',
    accent: '#8866ff',
    github: '#',
    demo: '#',
    category: 'security',
  },
  {
    id: 2,
    title: 'IKN Government Mobile App',
    subtitle: "Indonesia's New Capital City App",
    description: 'Official government service application for Indonesia\'s new capital city (IKN Nusantara), built with Swift UI and WebView integration for seamless citizen services.',
    tech: ['Swift UI', 'WebView', 'iOS', 'Government APIs'],
    color: '#d4af37',
    accent: '#00d97e',
    github: '#',
    demo: '#',
    category: 'government',
  },
  {
    id: 3,
    title: 'Bank BSI Risk Management System',
    subtitle: 'Banking Operational Risk & Compliance',
    description: 'Enterprise operational risk assessment and monitoring system with role-based approval workflows, advanced reporting, document management, and audit trail capabilities compliant with banking regulations.',
    tech: ['PHP', 'MySQL', 'Laravel', 'Vue.js', 'Docker'],
    color: '#00d97e',
    accent: '#00ff88',
    github: '#',
    demo: '#',
    category: 'enterprise',
  },
  {
    id: 4,
    title: 'Low-Code Enterprise Platform',
    subtitle: 'No-Code Business Solution Builder',
    description: 'Enterprise low-code/no-code platform with Next.js SSR frontend, Nest.js/TypeScript backend, multi-tenant MySQL architecture, and Docker containerisation for Go Buddy Asia.',
    tech: ['Next.js', 'Nest.js', 'TypeScript', 'MySQL', 'Docker'],
    color: '#8866ff',
    accent: '#00d4ff',
    github: '#',
    demo: '#',
    category: 'platform',
  },
  {
    id: 5,
    title: 'Suquise Tower Management',
    subtitle: 'Smart Building Management Platform',
    description: 'Complete web and mobile platform for building management: rental tracking, biometric attendance, private network security, and tenant services for a premium tower.',
    tech: ['PHP', 'React Native', 'MySQL', 'Biometric API'],
    color: '#00cfff',
    accent: '#8866ff',
    github: '#',
    demo: '#',
    category: 'enterprise',
  },
  {
    id: 6,
    title: 'White-Label Multi-Tenant App',
    subtitle: 'Customisable SaaS Platform Architecture',
    description: 'White-label application architecture transforming core systems into customisable multi-tenant solutions with Angular 12, Midtrans payment gateway, and Google OAuth authentication.',
    tech: ['Angular 12', 'Node.js', 'Midtrans', 'Google OAuth'],
    color: '#c060ff',
    accent: '#8866ff',
    github: '#',
    demo: '#',
    category: 'saas',
  },
]

export const EXPERIENCE: ExperienceItem[] = [
  {
    year: '2025–Present',
    role: 'Backend Engineer',
    company: 'Cyber Threat Intelligence Platform (Confidential)',
    description: 'Integrating OSINT APIs (Shodan, WhoisXML, DeHashed, Wayback Machine), building APK security scanning endpoints via MobSF, optimising complex MySQL queries for high-volume intelligence datasets, and configuring secure OpenVPN proxy routing. Authored 40+ Swagger/OpenAPI endpoint docs.',
    tags: ['PHP / Yii2', 'MySQL', 'MobSF', 'OpenVPN', 'Swagger', 'OSINT'],
  },
  {
    year: '2025 Feb–Dec',
    role: 'Frontend Developer',
    company: 'PT. SAI (Sarana Amal Indonesia)',
    description: 'Developed white-label multi-tenant application architecture, implemented Angular 12 component-based UI, integrated Midtrans payment gateway, and built Google OAuth authentication with responsive cross-brand design patterns.',
    tags: ['Angular 12', 'Midtrans', 'Google OAuth', 'TypeScript', 'Multi-Tenant'],
  },
  {
    year: '2023–2024',
    role: 'Web & Mobile Developer',
    company: 'CV. Kreasitech',
    description: "Built Bank BSI operational risk management system with role-based approval workflows. Engineered Suquise Tower full-stack management platform with biometric attendance. Developed the IKN Government app in Swift UI for Indonesia's new capital city.",
    tags: ['PHP', 'Swift UI', 'React Native', 'MySQL', 'Laravel', 'Government'],
  },
  {
    year: '2022',
    role: 'Full Stack Developer',
    company: 'PT. Telkom Indonesia',
    description: 'Architected low-code/no-code business solutions for enterprise clients using Vuetify + Node.js/Express.js. Configured PostgreSQL and Oracle DB systems and led cross-functional technical discussions on system architecture.',
    tags: ['Node.js', 'Vue.js / Vuetify', 'PostgreSQL', 'Oracle DB', 'Enterprise'],
  },
]

export const ACHIEVEMENTS: Achievement[] = [
  { title: 'OSINT Platform Architect', icon: '🔍', description: 'Engineered a full-scale Cyber Threat Intelligence & OSINT platform integrating Shodan, WhoisXML, DeHashed, and MobSF.', year: '2025', rarity: 'legendary' },
  { title: 'Telkom Indonesia Alumnus', icon: '🏛️', description: 'Contributed to enterprise low-code solutions and PostgreSQL/Oracle DB architecture at PT. Telkom Indonesia.', year: '2022', rarity: 'legendary' },
  { title: 'Government App Hero', icon: '🇮🇩', description: 'Built the official mobile app for IKN Nusantara — Indonesia\'s new capital city — on Swift UI.', year: '2024', rarity: 'epic' },
  { title: 'Banking System Engineer', icon: '🏦', description: 'Delivered the Bank BSI operational risk management system, compliant with national banking regulations.', year: '2023', rarity: 'epic' },
  { title: '5+ Years Full-Stack', icon: '⚔️', description: 'Over five years of continuous full-stack mastery spanning PHP, TypeScript, Swift, Kotlin, Flutter and more.', year: '2025', rarity: 'rare' },
  { title: 'Multi-Platform Wizard', icon: '📱', description: 'Shipped production apps on iOS, Android, and Web — across 8+ companies in diverse industries.', year: '2024', rarity: 'rare' },
]
