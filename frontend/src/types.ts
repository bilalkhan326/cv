export type SkillGroup = {
  title: string
  skills: string[]
}

export type ExperienceItem = {
  role: string
  company: string
  period: string
  responsibilities: string[]
}

export type ProjectItem = {
  title: string
  description: string
  technologies: string[]
  link?: string
}

export type CertificationItem = {
  title: string
  issuer: string
}
