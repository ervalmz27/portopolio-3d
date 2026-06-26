export interface NavLink { label: string; href: string; rune: string }

export interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  tech: string[]
  color: string
  accent: string
  github: string
  demo: string
  category: string
  image?: string
}

export interface Skill {
  name: string
  level: number
  color: string
  icon: string
  category: string
}

export interface ExperienceItem {
  year: string
  role: string
  company: string
  description: string
  tags: string[]
}

export interface Achievement {
  title: string
  icon: string
  description: string
  year: string
  rarity: 'legendary' | 'epic' | 'rare'
}
