import { Github, Mail, Globe, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ICON_MAP = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
  website: Globe,
}

export function Hero({ basics, profiles = [] }) {
  if (!basics) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-brand-dark">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand/20 via-transparent to-transparent" />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto pt-16">
        {basics.picture && (
          <div className="mb-6 flex justify-center">
            <img
              src={basics.picture}
              alt={basics.name}
              onError={(e) => { e.target.style.display = 'none' }}
              className="h-32 w-32 rounded-full object-cover ring-4 ring-brand ring-offset-4 ring-offset-slate-900"
            />
          </div>
        )}

        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-3">
          {basics.name}
        </h1>
        <p className="text-xl md:text-2xl text-brand-light font-medium mb-6">
          {basics.label}
        </p>

        {profiles.length > 0 && (
          <div className="flex justify-center gap-4 mb-8">
            {profiles.map((p) => {
              const Icon = ICON_MAP[p.network?.toLowerCase()] || Globe
              return (
                <a key={p.network} href={p.url} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/10 hover:bg-brand transition-colors text-white">
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
            {basics.email && (
              <a href={`mailto:${basics.email}`}
                className="p-2.5 rounded-full bg-white/10 hover:bg-brand transition-colors text-white">
                <Mail className="h-5 w-5" />
              </a>
            )}
          </div>
        )}

        <div className="flex justify-center gap-4">
          <Button size="lg" className="bg-brand hover:bg-brand-dark text-white" asChild>
            <a href="#about">View Resume</a>
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
            <a href={`mailto:${basics.email}`}>Contact Me</a>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white/50 hover:text-white transition-colors">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  )
}
