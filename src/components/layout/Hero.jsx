import { Github, Mail, Globe, Linkedin, Twitter, ArrowDown, FileText } from 'lucide-react'

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated ambient orbs */}
      <div className="orb-1 absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-brand/10 blur-[120px] pointer-events-none" />
      <div className="orb-2 absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-brand-light/8 blur-[100px] pointer-events-none" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 text-center px-5 w-full max-w-3xl mx-auto pt-24 pb-32">
        {/* Avatar */}
        {basics.picture && (
          <div className="hero-avatar mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-brand/30 blur-2xl scale-125" />
              <img
                src={basics.picture}
                alt={basics.name}
                onError={(e) => { e.target.style.display = 'none' }}
                className="relative h-28 w-28 rounded-full object-cover ring-2 ring-brand/50 ring-offset-4 ring-offset-slate-950"
              />
            </div>
          </div>
        )}

        {/* Name */}
        <h1 className="hero-name font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-5 break-words">
          {basics.name}
        </h1>

        {/* Role pill */}
        <div className="hero-label flex justify-center mb-9">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/25 bg-brand/8 text-brand-light text-sm font-medium tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light animate-pulse" />
            {basics.label}
          </span>
        </div>

        {/* Social links */}
        {(profiles.length > 0 || basics.email) && (
          <div className="hero-socials flex justify-center gap-2.5 mb-10">
            {profiles.map((p) => {
              const Icon = ICON_MAP[p.network?.toLowerCase()] || Globe
              return (
                <a
                  key={p.network}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={p.network}
                  className="h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-brand/40 hover:bg-brand/10 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
            {basics.email && (
              <a
                href={`mailto:${basics.email}`}
                title="Email"
                className="h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-brand/40 hover:bg-brand/10 transition-all duration-200"
              >
                <Mail className="h-4 w-4" />
              </a>
            )}
          </div>
        )}

        {/* CTAs */}
        <div className="hero-ctas flex flex-wrap justify-center gap-3">
          <a
            href="#about"
            className="inline-flex items-center gap-2 h-11 px-7 rounded-lg bg-brand hover:bg-brand-dark text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-brand/20 hover:shadow-brand/35"
          >
            <FileText className="h-4 w-4" />
            View Resume
          </a>
          <a
            href={`mailto:${basics.email}`}
            className="inline-flex items-center gap-2 h-11 px-7 rounded-lg border border-white/12 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white/80 hover:text-white font-medium text-sm transition-all duration-200"
          >
            <Mail className="h-4 w-4" />
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/30 hover:text-brand/70 transition-colors"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
        <ArrowDown className="h-3.5 w-3.5" />
      </a>
    </section>
  )
}
