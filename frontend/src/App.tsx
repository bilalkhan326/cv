import { motion } from 'framer-motion'
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa'
import { FiMenu, FiX } from 'react-icons/fi'
import { BrowserRouter } from 'react-router-dom'
import { SectionHeading } from './components/SectionHeading'
import { certifications, experience, navLinks, projects, skillGroups } from './data'
import './App.css'

const heroImage = '/PNG (2) (1).jpg'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/bilalkhan3266', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bilalkhan3266', icon: FaLinkedin },
]

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const apiUrl = import.meta.env.VITE_API_URL || '/api/contact'

  const closeMenu = () => setMenuOpen(false)
  const toggleMenu = () => setMenuOpen((value) => !value)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.55 },
    )

    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('Sending your message...')

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })

      let result: { message?: string } | null = null
      const text = await response.text()

      if (text) {
        try {
          result = JSON.parse(text) as { message?: string }
        } catch {
          result = null
        }
      }

      if (!response.ok) {
        throw new Error(result?.message || 'Unable to send message right now.')
      }

      const friendlyMessage = result?.message === 'Message received and sent to your email.'
        ? 'Thanks! Your message has been received. I’ll get back to you soon.'
        : result?.message || 'Thanks! Your message has been received. I’ll get back to you soon.'

      setStatus(friendlyMessage)
      setFormState({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Something went wrong.')
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#050505]/95 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
          <a href="#home" onClick={closeMenu} className="text-lg font-semibold tracking-[0.2em] text-emerald-400">MB</a>
          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm transition ${activeSection === link.href.replace('#', '') ? 'text-emerald-400' : 'text-zinc-400 hover:text-white'}`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <button className="inline-flex rounded-full border border-zinc-700 p-2 text-zinc-200 lg:hidden" onClick={toggleMenu} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </nav>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden" onClick={closeMenu} />
            <div className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800 bg-[#050505]/98 px-4 py-4 shadow-2xl backdrop-blur lg:hidden">
              <div className="mx-auto flex max-w-7xl items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">Navigate</span>
                <button className="rounded-full border border-zinc-700 p-2 text-zinc-200" onClick={closeMenu} aria-label="Close navigation">
                  <FiX size={18} />
                </button>
              </div>
              <div className="mx-auto mt-4 max-w-7xl space-y-2">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} onClick={closeMenu} className={`block rounded-xl px-3 py-3 text-sm font-medium ${activeSection === link.href.replace('#', '') ? 'bg-emerald-500/10 text-emerald-400' : 'text-zinc-300 hover:bg-zinc-900'}`}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </header>

      <main id="home">
        <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} whileHover={{ scale: 1.01, y: -4 }} className="order-2 lg:order-1">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-400">Full Stack Developer</p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl lg:text-7xl">Muhammad Bilal</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">Passionate Full Stack Developer specializing in scalable web applications, REST APIs, cloud deployment, and modern JavaScript technologies.</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-300">
              <span className="rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-2">React.js</span>
              <span className="rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-2">Node.js</span>
              <span className="rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-2">TypeScript</span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:items-center">
              <a href="/Bilal__Engr__CV.pdf" download="Bilal__Engr__CV.pdf" className="w-full rounded-full bg-emerald-500 px-5 py-3 text-center font-medium text-black transition hover:bg-emerald-400 sm:w-auto">Download Resume</a>
              <a href="#contact" className="w-full rounded-full border border-zinc-700 px-5 py-3 text-center font-medium text-white transition hover:border-emerald-500 hover:text-emerald-400 sm:w-auto">Contact Me</a>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:ml-1 sm:justify-start">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="rounded-full border border-zinc-700 p-3 text-zinc-300 transition hover:border-emerald-500 hover:text-emerald-400">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="relative order-1 w-full lg:order-2">
            <div className="absolute inset-0 rounded-[2rem] bg-emerald-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-4 shadow-[0_0_120px_rgba(34,197,94,0.16)]">
              <motion.div animate={{ y: [0, -10, 0], rotateX: [0, 4, 0], rotateY: [0, -6, 0], scale: [1, 1.01, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950/70 p-3 shadow-2xl">
                <div className="overflow-hidden rounded-[1.2rem] bg-black p-2">
                  <img src={heroImage} alt="Muhammad Bilal profile portrait" className="h-[240px] w-full rounded-[1.05rem] object-cover object-center grayscale-[0.2] contrast-[1.05] sm:h-[320px] lg:h-[420px] bg-zinc-900" style={{ backgroundColor: '#111111', backgroundImage: 'linear-gradient(135deg, #1f1f1f 0%, #0a0a0a 100%)' }} />
                </div>
              </motion.div>
              <div className="mt-4 flex flex-col gap-3 rounded-[1rem] border border-zinc-800 bg-[#111111]/90 px-4 py-3 text-sm text-zinc-300 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-zinc-500">Availability</p>
                  <p className="font-medium text-white">Open to opportunities & collaborations</p>
                </div>
                <div className="w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-400">Available Now</div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading eyebrow="About Me" title="Crafting reliable digital experiences" description="I blend product thinking, engineering discipline, and a strong backend foundation to build systems that are fast, maintainable, and deployment-ready." />
          <div className="mt-10 grid gap-8 rounded-3xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} whileHover={{ y: -6, scale: 1.01 }}>
              <p className="text-base leading-8 text-zinc-400 sm:text-lg">I am a software engineer with a strong interest in full-stack development, cloud deployment, and building applications that are simple for users and clean for developers. My experience spans frontend engineering, REST API development, authentication, and deployment workflows with a focus on scalable architecture and professional collaboration.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} whileHover={{ y: -6, scale: 1.01 }} className="rounded-2xl border border-zinc-800 bg-[#111111] p-6">
              <h3 className="text-xl font-semibold text-white">Highlights</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                {['Full Stack Development', 'Backend APIs', 'Authentication', 'Cloud Deployment', 'Clean Code', 'Problem Solving', 'Team Collaboration'].map((item) => (
                  <li key={item} className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading eyebrow="Technical Skills" title="A modern toolkit for shipping quality products" description="I enjoy working across the stack and combining strong UI craftsmanship with backend reliability." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group, index) => (
              <motion.div key={group.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 + index * 0.08 }} whileHover={{ y: -8, scale: 1.01 }} className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6">
                <h3 className="text-xl font-semibold text-white">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="rounded-full border border-zinc-700 bg-[#111111] px-3 py-2 text-sm text-zinc-300">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading eyebrow="Experience" title="Building experience through hands-on product work" description="My professional journey has centered on modern frontend architecture, API development, and collaborative delivery." />
          <div className="mt-10 space-y-6">
            {experience.map((item, index) => (
              <motion.article key={item.role} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 + index * 0.1 }} whileHover={{ y: -8, scale: 1.01 }} className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 sm:p-8">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{item.role}</h3>
                    <p className="mt-2 text-emerald-400">{item.company}</p>
                  </div>
                  <p className="text-sm text-zinc-400">{item.period}</p>
                </div>
                <ul className="mt-5 grid gap-2 text-sm text-zinc-400 md:grid-cols-2">
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility} className="flex items-start gap-2"><span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-400" />{responsibility}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading eyebrow="Projects" title="Selected work with real-world impact" description="Each project reflects a focus on clean architecture, secure APIs, and thoughtful UX." />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.article key={project.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 + index * 0.1 }} whileHover={{ y: -10, scale: 1.01 }} className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-[#111111] p-5 sm:p-8 transition hover:border-emerald-500/40">
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                <p className="mt-4 text-base leading-7 text-zinc-400">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-300">{technology}</span>
                  ))}
                </div>
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition hover:text-emerald-300">
                    Visit project
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </motion.article>
            ))}
          </div>
        </section>

        <section id="education" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading eyebrow="Education" title="Academic foundation" description="A disciplined engineering education paired with practical development experience." />
          <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 sm:p-8">
            <h3 className="text-2xl font-semibold text-white">Riphah International University</h3>
            <p className="mt-3 text-lg text-zinc-300">Bachelor of Software Engineering</p>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-zinc-500">2022 – 2026</p>
          </div>
        </section>

        <section id="certifications" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading eyebrow="Certifications" title="Industry-recognized credentials" description="I continue to sharpen my technical foundation through structured learning and practical certifications." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {certifications.map((certification, index) => (
              <motion.div key={certification.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 + index * 0.08 }} whileHover={{ y: -8, scale: 1.01 }} className="rounded-3xl border border-zinc-800 bg-[#111111] p-6">
                <p className="text-emerald-400">{certification.title}</p>
                <p className="mt-3 text-sm text-zinc-400">{certification.issuer}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-8 rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading eyebrow="Contact" title="Let’s build something meaningful" description="I’m open to opportunities, collaborations, and conversations around modern web products." />
              <div className="mt-8 space-y-4 text-sm text-zinc-400">
                <p><span className="font-semibold text-white">Email</span><br />bilalyousafxai326@gmail.com</p>
                <p><span className="font-semibold text-white">Phone</span><br />+92 340 5050242</p>
                <p><span className="font-semibold text-white">GitHub</span><br /><a className="text-emerald-400" href="https://github.com/bilalkhan3266">github.com/bilalkhan3266</a></p>
                <p><span className="font-semibold text-white">LinkedIn</span><br /><a className="text-emerald-400" href="https://www.linkedin.com/in/bilalkhan3266">linkedin.com/in/bilalkhan3266</a></p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-zinc-800 bg-[#111111] p-4 sm:p-6">
              <div>
                <label className="mb-2 block text-sm text-zinc-400" htmlFor="name">Name</label>
                <input id="name" value={formState.name} onChange={(event) => setFormState({ ...formState, name: event.target.value })} required className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 text-white placeholder:text-zinc-600 outline-none ring-0 focus:border-emerald-500" placeholder="Your name" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-zinc-400" htmlFor="email">Email</label>
                <input id="email" type="email" value={formState.email} onChange={(event) => setFormState({ ...formState, email: event.target.value })} required className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 text-white placeholder:text-zinc-600 outline-none ring-0 focus:border-emerald-500" placeholder="you@example.com" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-zinc-400" htmlFor="message">Message</label>
                <textarea id="message" rows={5} value={formState.message} onChange={(event) => setFormState({ ...formState, message: event.target.value })} required className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 text-white placeholder:text-zinc-600 outline-none ring-0 focus:border-emerald-500" placeholder="Tell me about your idea..." />
              </div>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-medium text-black transition hover:bg-emerald-400 sm:w-auto">
                <FaPaperPlane /> Send Message
              </button>
              {status ? <p className="text-sm text-zinc-400">{status}</p> : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800 bg-[#050505]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-zinc-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold text-white">Muhammad Bilal</p>
            <p className="mt-1">Full Stack Developer</p>
          </div>
          <div className="flex gap-4">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="transition hover:text-emerald-400"><Icon size={18} /></a>
            ))}
          </div>
          <p>© 2026 Muhammad Bilal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
