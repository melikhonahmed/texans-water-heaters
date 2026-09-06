import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { ErrorBoundary } from '@/components/error-boundary';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Droplets,
  Facebook,
  FileText,
  Flame,
  Gauge,
  House,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Thermometer,
  Wrench,
  X,
  Youtube,
} from 'lucide-react';

const queryClient = new QueryClient();

const BUSINESS = {
  name: 'Northline Plumbing & Water Heat',
  shortName: 'Northline',
  phone: '(415) 847-0192',
  phoneHref: 'tel:+14158470192',
  email: 'hello@northlineplumbing.com',
  region: 'San Francisco and surrounding neighborhoods',
  hours: 'Dispatch open 7 days',
};

const services = [
  { icon: 'flame', title: 'Water heater repair', text: 'A cold shower, pilot light issue, or leaking tank deserves a clear diagnosis and a clean fix.' },
  { icon: 'thermometer', title: 'Tankless water heaters', text: 'Upgrade your hot water supply with a right-sized, efficient system installed for your home.' },
  { icon: 'droplets', title: 'Leak detection & repair', text: 'We find the source behind walls, under floors, and below fixtures before small leaks become expensive.' },
  { icon: 'wrench', title: 'Plumbing repairs', text: 'From stubborn drains to worn valves, get dependable repairs that hold up to daily life.' },
  { icon: 'house', title: 'Whole-home plumbing', text: 'Thoughtful maintenance and fixture upgrades that make every room work a little better.' },
  { icon: 'gauge', title: 'Water pressure', text: 'Uneven pressure, noisy pipes, and flow problems solved with a practical plan—not guesswork.' },
];

const faqs = [
  { q: 'How quickly can someone come out?', a: 'We keep same-day appointments open for urgent water heater and plumbing needs whenever the schedule allows. Call the dispatch line for the clearest arrival window.' },
  { q: 'Do you offer free estimates?', a: 'Yes. We provide straightforward estimates before recommended work begins, so you can make a confident decision without pressure.' },
  { q: 'What areas do you serve?', a: 'Northline serves San Francisco and nearby neighborhoods. If you are just outside the area, call us—we will let you know whether your home is within our route.' },
  { q: 'Should I repair or replace my water heater?', a: 'It depends on age, condition, energy use, and the cost of the repair. We will explain both options and help you choose what makes sense for your home.' },
  { q: 'Is emergency plumbing available after hours?', a: 'Our dispatch team can help triage urgent issues outside normal appointment windows. Call first for guidance when water is actively leaking or hot water has stopped unexpectedly.' },
];

const gallery = [
  { src: '/work-copper.jpg', title: 'Clean copper work', label: 'Water heater installation' },
  { src: '/hero-technician.jpg', title: 'A careful diagnosis', label: 'Tankless service visit' },
  { src: '/service-van.jpg', title: 'Ready for the neighborhood', label: 'Local service, on the move' },
  { src: '/work-copper.jpg', title: 'Details that matter', label: 'Valve and supply line repair' },
];

const articles = [
  { tag: 'Water heaters', title: 'The quiet signs your water heater is ready for attention', text: 'A little rust, a warm floor, or a tank that suddenly sounds different can tell you a lot.', color: 'blue' },
  { tag: 'Homeowner guide', title: 'What to do when a pipe starts leaking', text: 'The first five minutes matter. Here is how to limit damage before help arrives.', color: 'copper' },
  { tag: 'Maintenance', title: 'A simple seasonal check for your plumbing', text: 'A few small checks can prevent an inconvenient call when the weather changes.', color: 'navy' },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function ServiceIcon({ name, size = 21 }: { name: string; size?: number }) {
  if (name === 'flame') return <Flame size={size} strokeWidth={1.7} />;
  if (name === 'thermometer') return <Thermometer size={size} strokeWidth={1.7} />;
  if (name === 'droplets') return <Droplets size={size} strokeWidth={1.7} />;
  if (name === 'house') return <House size={size} strokeWidth={1.7} />;
  if (name === 'gauge') return <Gauge size={size} strokeWidth={1.7} />;
  return <Wrench size={size} strokeWidth={1.7} />;
}

function Header({ onEstimate }: { onEstimate: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    ['Services', 'services'],
    ['Why Northline', 'why'],
    ['Our work', 'gallery'],
    ['FAQs', 'faq'],
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--primary)/.1)] bg-[hsl(var(--background)/.94)] backdrop-blur-xl">
      <div className="section-wrap flex min-h-[76px] items-center justify-between gap-6">
        <button type="button" onClick={() => scrollToId('top')} className="flex items-center gap-3 text-left" data-testid="button-logo">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--accent))]">
            <Droplets size={21} strokeWidth={2.3} />
          </span>
          <span>
            <span className="block font-display text-[1.04rem] font-bold leading-none tracking-[-.03em]">NORTHLINE</span>
            <span className="mt-1 block font-mono text-[.57rem] font-bold tracking-[.16em] text-[hsl(var(--muted-foreground))]">PLUMBING + WATER HEAT</span>
          </span>
        </button>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {links.map(([label, id]) => (
            <button key={id} type="button" onClick={() => scrollToId(id)} className="nav-link" data-testid={`link-nav-${id}`}>{label}</button>
          ))}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <a href={BUSINESS.phoneHref} className="group flex items-center gap-2 text-right" data-testid="link-header-phone">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[hsl(var(--accent)/.18)] text-[hsl(var(--primary))] transition group-hover:bg-[hsl(var(--accent))]"><Phone size={14} /></span>
            <span><span className="block font-mono text-[.61rem] font-bold tracking-[.12em] text-[hsl(var(--muted-foreground))]">CALL DISPATCH</span><span className="block text-sm font-bold">{BUSINESS.phone}</span></span>
          </a>
          <button type="button" onClick={onEstimate} className="button-base button-primary" data-testid="button-header-estimate">Get a free estimate <ArrowRight size={16} /></button>
        </div>
        <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-[hsl(var(--primary)/.15)] md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-[hsl(var(--primary)/.1)] bg-[hsl(var(--background))] px-4 pb-5 pt-3 md:hidden">
          <nav className="section-wrap flex flex-col gap-1" aria-label="Mobile navigation">
            {links.map(([label, id]) => (
              <button key={id} type="button" onClick={() => { scrollToId(id); setOpen(false); }} className="border-b border-[hsl(var(--primary)/.08)] py-3 text-left font-display text-lg font-semibold" data-testid={`link-mobile-${id}`}>{label}</button>
            ))}
            <button type="button" onClick={() => { onEstimate(); setOpen(false); }} className="button-base button-blue mt-4 w-full" data-testid="button-mobile-estimate">Get a free estimate <ArrowRight size={16} /></button>
          </nav>
        </div>
      )}
    </header>
  );
}

function EstimateForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };
  if (submitted) {
    return (
      <div className="flex min-h-[360px] flex-col justify-between p-7 sm:p-8" data-testid="status-estimate-success">
        <div>
          <span className="icon-box mb-7 bg-[hsl(var(--accent)/.2)] text-[hsl(var(--accent))]"><Check size={24} /></span>
          <p className="eyebrow text-[hsl(var(--accent))]">Request received</p>
          <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-.04em] text-[hsl(var(--card))]">We’ll be in touch shortly{name ? `, ${name.split(' ')[0]}` : ''}.</h3>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[hsl(var(--card)/.68)]">A Northline coordinator will review your request and reach out with the next available appointment window.</p>
        </div>
        <button type="button" onClick={() => setSubmitted(false)} className="mt-8 self-start text-sm font-bold text-[hsl(var(--accent))] underline decoration-[hsl(var(--accent)/.4)] underline-offset-4" data-testid="button-new-estimate">Send another request</button>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="p-7 sm:p-8" data-testid="form-estimate">
      <p className="eyebrow text-[hsl(var(--accent))]">Start here</p>
      <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.05] tracking-[-.04em] text-[hsl(var(--card))]">Tell us what’s happening.</h2>
      <p className="mt-3 text-sm leading-6 text-[hsl(var(--card)/.68)]">A few details help us send the right person, with the right tools.</p>
      <div className="mt-6 grid gap-4">
        <div><label className="form-label text-[hsl(var(--card)/.62)]" htmlFor="estimate-name">Your name</label><input id="estimate-name" required value={name} onChange={(event) => setName(event.target.value)} className="form-input border-[hsl(var(--card)/.18)] bg-[hsl(var(--card)/.08)] text-[hsl(var(--card))] placeholder:text-[hsl(var(--card)/.4)]" placeholder="How should we address you?" data-testid="input-estimate-name" /></div>
        <div><label className="form-label text-[hsl(var(--card)/.62)]" htmlFor="estimate-contact">Phone or email</label><input id="estimate-contact" required className="form-input border-[hsl(var(--card)/.18)] bg-[hsl(var(--card)/.08)] text-[hsl(var(--card))] placeholder:text-[hsl(var(--card)/.4)]" placeholder="Best way to reach you" data-testid="input-estimate-contact" /></div>
        <div><label className="form-label text-[hsl(var(--card)/.62)]" htmlFor="estimate-service">What can we help with?</label><select id="estimate-service" required className="form-input border-[hsl(var(--card)/.18)] bg-[hsl(var(--card)/.08)] text-[hsl(var(--card))]" defaultValue="" data-testid="select-estimate-service"><option value="" disabled>Select a service</option><option>Water heater repair</option><option>New water heater</option><option>Leak or plumbing repair</option><option>Something else</option></select></div>
      </div>
      <button type="submit" className="button-base button-blue mt-6 w-full" data-testid="button-submit-estimate">Request my estimate <ArrowRight size={16} /></button>
      <p className="mt-3 text-center text-[.68rem] leading-5 text-[hsl(var(--card)/.45)]">No pressure. Just a clear next step from a local team.</p>
    </form>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[hsl(var(--primary))] text-[hsl(var(--card))]">
      <div className="blueprint-grid-dark absolute inset-0 opacity-70" />
      <div className="absolute -right-28 top-10 h-96 w-96 rounded-full border border-[hsl(var(--accent)/.2)]" />
      <div className="absolute -right-10 top-28 h-72 w-72 rounded-full border border-[hsl(var(--accent)/.12)]" />
      <div className="section-wrap relative grid items-center gap-12 py-16 md:grid-cols-[1.04fr_.96fr] md:py-24 lg:gap-20 lg:py-28">
        <div className="reveal max-w-2xl">
          <div className="mb-6 flex items-center gap-3"><span className="h-px w-9 bg-[hsl(var(--accent))]" /><span className="eyebrow text-[hsl(var(--accent))]">The neighborhood’s steady hand</span></div>
          <h1 className="font-display text-[clamp(3.25rem,8vw,6.5rem)] font-semibold leading-[.91] tracking-[-.07em]">Good plumbing.<br /><span className="text-[hsl(var(--accent))]">No drama.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[hsl(var(--card)/.72)]">Water heater trouble, a hidden leak, or a fix you’ve been putting off—we bring calm, capable help to homes across {BUSINESS.region.replace(' and surrounding neighborhoods', '')}.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => scrollToId('estimate')} className="button-base button-light" data-testid="button-hero-estimate">Get a free estimate <ArrowRight size={16} /></button>
            <a href={BUSINESS.phoneHref} className="button-base border border-[hsl(var(--card)/.25)] text-[hsl(var(--card))] hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" data-testid="link-hero-call"><Phone size={16} /> Call {BUSINESS.phone}</a>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-[.73rem] font-bold uppercase tracking-[.11em] text-[hsl(var(--card)/.54)]"><span className="flex items-center gap-2"><Check size={14} className="text-[hsl(var(--accent))]" /> Same-day service</span><span className="flex items-center gap-2"><Check size={14} className="text-[hsl(var(--accent))]" /> Free estimates</span><span className="flex items-center gap-2"><Check size={14} className="text-[hsl(var(--accent))]" /> Real people, local routes</span></div>
        </div>
        <div id="estimate" className="reveal delay-2 relative overflow-hidden bg-[hsl(var(--primary)/.7)] shadow-2xl shadow-[hsl(var(--primary)/.35)] md:mt-8">
          <div className="absolute right-0 top-0 h-20 w-20 border-b border-l border-[hsl(var(--accent)/.35)]" /><EstimateForm />
        </div>
      </div>
      <div className="section-wrap relative flex items-center justify-between border-t border-[hsl(var(--card)/.13)] py-4 text-[.67rem] font-bold uppercase tracking-[.14em] text-[hsl(var(--card)/.48)]"><span>Serving the homes that make this city</span><span className="hidden items-center gap-2 sm:flex"><MapPin size={13} /> Local dispatch · 7 days</span></div>
    </section>
  );
}

function TrustStrip() {
  const items = [{ icon: Clock3, title: 'Fast response', text: 'Clear arrival windows' }, { icon: CalendarDays, title: 'Same-day help', text: 'When the schedule allows' }, { icon: ShieldCheck, title: 'Work you can trust', text: 'Straightforward recommendations' }, { icon: BadgeCheck, title: 'Free estimates', text: 'Before work begins' }];
  return <section className="border-b border-[hsl(var(--primary)/.1)] bg-[hsl(var(--card))]"><div className="section-wrap grid divide-y divide-[hsl(var(--primary)/.1)] py-2 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">{items.map(({ icon: Icon, title, text }) => <div key={title} className="flex items-center gap-4 px-1 py-5 sm:px-6"><Icon size={21} className="shrink-0 text-[hsl(var(--secondary))]" strokeWidth={1.7} /><span><strong className="block text-sm font-bold">{title}</strong><span className="text-xs text-[hsl(var(--muted-foreground))]">{text}</span></span></div>)}</div></section>;
}

function Story() {
  return (
    <section className="section-pad blueprint-grid" id="why">
      <div className="section-wrap grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
        <div className="reveal relative min-h-[430px] overflow-hidden bg-[hsl(var(--primary))]">
          <img src="/hero-technician.jpg" alt="Northline technician inspecting a modern water heater" className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary)/.92)] via-transparent to-[hsl(var(--primary)/.1)]" />
          <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between"><div><p className="eyebrow text-[hsl(var(--accent))]">Since the first call</p><p className="mt-1 font-display text-2xl font-semibold text-[hsl(var(--card))]">Calm, capable, close to home.</p></div><span className="grid h-12 w-12 place-items-center rounded-full border border-[hsl(var(--card)/.3)] text-[hsl(var(--accent))]"><ArrowDownRight size={21} /></span></div>
        </div>
        <div className="reveal delay-1">
          <p className="eyebrow">A better service visit</p>
          <h2 className="mt-4 max-w-xl font-display text-[clamp(2.5rem,5vw,4.6rem)] font-semibold leading-[.98] tracking-[-.06em]">Your home deserves more than a quick patch.</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-[hsl(var(--muted-foreground))]">Northline was built around a simple idea: plumbing help should feel clear from the first phone call to the final wipe-down. We listen, diagnose carefully, and explain the options in plain language.</p>
          <div className="mt-9 grid gap-6 sm:grid-cols-2"><div className="stat-line"><strong className="font-display text-2xl">Clear</strong><p className="mt-1 text-sm leading-6 text-[hsl(var(--muted-foreground))]">No mystery line items or rushed decisions.</p></div><div className="stat-line"><strong className="font-display text-2xl">Considered</strong><p className="mt-1 text-sm leading-6 text-[hsl(var(--muted-foreground))]">Solutions sized for your home and routine.</p></div></div>
          <button type="button" onClick={() => scrollToId('services')} className="button-base button-outline mt-9" data-testid="button-story-services">Explore our services <ArrowRight size={16} /></button>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section-pad bg-[hsl(var(--card))]" id="services">
      <div className="section-wrap">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div className="reveal"><p className="eyebrow">What we solve</p><h2 className="mt-4 max-w-2xl font-display text-[clamp(2.5rem,5vw,4.6rem)] font-semibold leading-[.95] tracking-[-.06em]">Help for the water<br className="hidden sm:block" /> systems you rely on.</h2></div><p className="reveal delay-1 max-w-xs text-sm leading-7 text-[hsl(var(--muted-foreground))]">From one stubborn fixture to a whole-home upgrade, our team meets the moment with a practical plan.</p></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{services.map((service, index) => <article key={service.title} className={`service-card reveal delay-${(index % 3) + 1}`} data-testid={`card-service-${index}`}><div className="icon-box"><ServiceIcon name={service.icon} /></div><div className="mt-12 flex items-end justify-between gap-4"><div><h3 className="font-display text-[1.35rem] font-semibold tracking-[-.03em]">{service.title}</h3><p className="mt-3 max-w-[260px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">{service.text}</p></div><button type="button" onClick={() => scrollToId('estimate')} className="mb-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[hsl(var(--primary)/.15)] text-[hsl(var(--secondary))] transition hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--card))]" aria-label={`Request help with ${service.title}`} data-testid={`button-service-${index}`}><ArrowUpRightIcon /></button></div></article>)}</div>
      </div>
    </section>
  );
}

function ArrowUpRightIcon() {
  return <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><path d="M3.25 12.75 12.75 3.25M5 3.25h7.75V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function EmergencyBand() {
  return <section className="overflow-hidden bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"><div className="section-wrap grid items-center gap-9 py-14 md:grid-cols-[1fr_auto] md:py-16"><div className="reveal"><p className="eyebrow text-[hsl(var(--primary)/.65)]">When it cannot wait</p><h2 className="mt-3 max-w-3xl font-display text-[clamp(2.5rem,6vw,5.4rem)] font-semibold leading-[.9] tracking-[-.07em]">Hot water out?<br />Let’s get it moving.</h2><p className="mt-5 max-w-xl text-base leading-7 text-[hsl(var(--primary)/.7)]">Same-day water heater service, urgent repairs, and a real person on the other end of the line.</p></div><div className="reveal delay-1 flex flex-col items-start gap-3 md:items-end"><a href={BUSINESS.phoneHref} className="button-base button-primary" data-testid="link-emergency-call"><Phone size={16} /> Call {BUSINESS.phone}</a><button type="button" onClick={() => scrollToId('estimate')} className="button-base border border-[hsl(var(--primary)/.25)] text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))]" data-testid="button-emergency-estimate">Schedule service <ArrowRight size={16} /></button></div></div></section>;
}

function WhyChoose() {
  const reasons = [{ n: '01', title: 'We start with listening', text: 'The best repair plan starts with the story behind the symptom.' }, { n: '02', title: 'We explain the trade-offs', text: 'You get clear options, not a hard sell or a one-size-fits-all answer.' }, { n: '03', title: 'We leave it better', text: 'Respect for your floors, your time, and the details other crews rush past.' }];
  return <section className="section-pad bg-[hsl(var(--primary))] text-[hsl(var(--card))]" id="approach"><div className="section-wrap grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-24"><div className="reveal"><p className="eyebrow text-[hsl(var(--accent))]">Why homeowners call back</p><h2 className="mt-4 max-w-lg font-display text-[clamp(2.7rem,5vw,4.8rem)] font-semibold leading-[.94] tracking-[-.06em]">The difference is in the details.</h2><p className="mt-7 max-w-md text-sm leading-7 text-[hsl(var(--card)/.63)]">A skilled repair is important. So is how the room looks when we leave, how well you understand the work, and whether you know who to call next time.</p><button type="button" onClick={() => scrollToId('estimate')} className="button-base button-light mt-8" data-testid="button-why-estimate">Talk to a Northline pro <ArrowRight size={16} /></button></div><div className="reveal delay-1 divide-y divide-[hsl(var(--card)/.15)]">{reasons.map((reason) => <div key={reason.n} className="grid gap-4 py-7 sm:grid-cols-[64px_1fr]"><span className="font-mono text-sm text-[hsl(var(--accent))]">{reason.n}</span><div><h3 className="font-display text-2xl font-semibold">{reason.title}</h3><p className="mt-2 max-w-md text-sm leading-7 text-[hsl(var(--card)/.62)]">{reason.text}</p></div></div>)}</div></div></section>;
}

function Gallery({ onOpen }: { onOpen: (item: typeof gallery[number]) => void }) {
  return <section className="section-pad blueprint-grid" id="gallery"><div className="section-wrap"><div className="flex items-end justify-between gap-5"><div className="reveal"><p className="eyebrow">A look at the work</p><h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.6rem)] font-semibold leading-[.95] tracking-[-.06em]">Built to be noticed.<br /><span className="text-[hsl(var(--secondary))]">Not the repair.</span></h2></div><span className="hidden items-center gap-2 pb-2 text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))] sm:flex"><Sparkles size={15} /> Tap to inspect</span></div><div className="mt-12 grid auto-rows-[190px] grid-cols-2 gap-3 md:auto-rows-[240px] md:grid-cols-4">{gallery.map((item, index) => <button type="button" key={`${item.title}-${index}`} className={`gallery-item text-left ${index === 0 ? 'col-span-2 row-span-2' : index === 1 ? 'row-span-2' : ''}`} onClick={() => onOpen(item)} aria-label={`View ${item.title}`} data-testid={`button-gallery-${index}`}><img src={item.src} alt={item.title} /><span className="gallery-label"><span className="block font-display text-xl font-semibold">{item.title}</span><span className="mt-1 block text-xs uppercase tracking-[.11em] text-[hsl(var(--card)/.68)]">{item.label}</span></span></button>)}</div></div></section>;
}

function VideoSection({ onPlay }: { onPlay: () => void }) {
  return <section className="section-pad bg-[hsl(var(--card))]"><div className="section-wrap grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20"><div className="reveal"><p className="eyebrow">See the Northline way</p><h2 className="mt-4 max-w-xl font-display text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[.95] tracking-[-.06em]">The work is technical.<br />The experience is human.</h2><p className="mt-6 max-w-md text-sm leading-7 text-[hsl(var(--muted-foreground))]">A quick look at how we approach a water heater visit—from the first walkthrough to the final test.</p><button type="button" onClick={onPlay} className="button-base button-outline mt-8" data-testid="button-play-video"><span className="grid h-6 w-6 place-items-center rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--card))]"><Play size={12} fill="currentColor" /></span> Watch the 90-second visit</button></div><button type="button" onClick={onPlay} className="group relative min-h-[330px] overflow-hidden bg-[hsl(var(--primary))] text-left reveal delay-1" data-testid="button-video-poster"><img src="/service-van.jpg" alt="Northline service vehicle arriving in a local neighborhood" className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-[hsl(var(--primary)/.45)]" /><span className="service-pulse absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--primary))] transition group-hover:scale-110"><Play size={22} fill="currentColor" /></span><span className="absolute bottom-6 left-6 font-mono text-[.65rem] font-bold uppercase tracking-[.16em] text-[hsl(var(--card)/.75)]">Northline field notes · 01:30</span></button></div></section>;
}

function Testimonials() {
  return <section className="section-pad bg-[hsl(var(--muted))]" id="reviews"><div className="section-wrap"><div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24"><div className="reveal"><p className="eyebrow">Good words travel</p><h2 className="mt-4 max-w-sm font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[.95] tracking-[-.06em]">The kind of service people mention.</h2><div className="mt-8 flex gap-1 text-[hsl(var(--accent))]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={16} fill="currentColor" />)}</div><p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">A few notes from recent Northline homeowners.</p></div><div className="reveal delay-1 grid gap-3 md:grid-cols-2"><blockquote className="bg-[hsl(var(--card))] p-7 md:col-span-2"><div className="quote-mark">“</div><p className="mt-2 max-w-2xl font-display text-2xl font-medium leading-[1.2] tracking-[-.03em]">They explained what had failed, what could wait, and what they would do in our home. That level of care is rare.</p><footer className="mt-7 flex items-center justify-between border-t border-[hsl(var(--primary)/.1)] pt-4 text-xs font-bold"><span>— Recent Northline customer</span><span className="font-mono text-[hsl(var(--muted-foreground))]">WATER HEATER REPAIR</span></footer></blockquote><blockquote className="bg-[hsl(var(--primary))] p-7 text-[hsl(var(--card))]"><div className="quote-mark text-[hsl(var(--accent))]">“</div><p className="mt-2 text-base leading-7 text-[hsl(var(--card)/.8)]">On time, tidy, and no pressure. We knew exactly what we were paying for.</p><footer className="mt-6 border-t border-[hsl(var(--card)/.17)] pt-4 text-xs font-bold">— Homeowner in the city</footer></blockquote><blockquote className="bg-[hsl(var(--accent))] p-7 text-[hsl(var(--primary))]"><div className="quote-mark text-[hsl(var(--primary)/.45)]">“</div><p className="mt-2 text-base leading-7">The technician found the leak quickly and treated our house like it was his own.</p><footer className="mt-6 border-t border-[hsl(var(--primary)/.16)] pt-4 text-xs font-bold">— Repeat customer</footer></blockquote></div></div></div></section>;
}

function Offers() {
  return <section className="section-pad bg-[hsl(var(--card))]"><div className="section-wrap"><div className="mb-11 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">A little extra room</p><h2 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[.95] tracking-[-.06em]">Good timing has its perks.</h2></div><p className="max-w-xs text-sm leading-7 text-[hsl(var(--muted-foreground))]">Ask about current offers when you call. We will confirm eligibility before any work begins.</p></div><div className="grid gap-3 lg:grid-cols-[1.15fr_.85fr]"><div className="relative overflow-hidden bg-[hsl(var(--primary))] p-8 text-[hsl(var(--card))] sm:p-11"><span className="absolute -right-8 -top-16 font-display text-[15rem] font-bold leading-none text-[hsl(var(--card)/.05)]">01</span><div className="relative"><span className="eyebrow text-[hsl(var(--accent))]">New customer offer</span><h3 className="mt-5 max-w-lg font-display text-4xl font-semibold leading-[.98] tracking-[-.05em]">A better start for your home’s water system.</h3><p className="mt-5 max-w-md text-sm leading-7 text-[hsl(var(--card)/.65)]">Ask about a complimentary system check with your first qualifying service visit.</p><button type="button" onClick={() => scrollToId('estimate')} className="button-base button-light mt-8" data-testid="button-offer-primary">Ask about this offer <ArrowRight size={16} /></button></div></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"><div className="flex items-start gap-5 bg-[hsl(var(--muted))] p-7"><span className="font-mono text-sm text-[hsl(var(--secondary))]">02</span><div><h3 className="font-display text-2xl font-semibold">Seasonal savings</h3><p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">Planning a replacement? Ask about current installation promotions.</p><button type="button" onClick={() => scrollToId('estimate')} className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-[hsl(var(--secondary))]" data-testid="button-offer-seasonal">Check availability <ArrowRight size={14} /></button></div></div><div className="flex items-start gap-5 bg-[hsl(var(--accent)/.22)] p-7"><span className="font-mono text-sm text-[hsl(var(--secondary))]">03</span><div><h3 className="font-display text-2xl font-semibold">Refer a neighbor</h3><p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">Know a home that needs help? We appreciate the introduction.</p><button type="button" onClick={() => scrollToId('estimate')} className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-[hsl(var(--secondary))]" data-testid="button-offer-referral">Connect us <ArrowRight size={14} /></button></div></div></div></div></div></section>;
}

function FAQ() {
  const [active, setActive] = useState<number | null>(0);
  return <section className="section-pad blueprint-grid" id="faq"><div className="section-wrap grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-24"><div className="reveal"><p className="eyebrow">Good to know</p><h2 className="mt-4 max-w-sm font-display text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-[.95] tracking-[-.06em]">Questions, answered plainly.</h2><p className="mt-6 max-w-sm text-sm leading-7 text-[hsl(var(--muted-foreground))]">Still not seeing your question? Call dispatch and we will point you in the right direction.</p><a href={`mailto:${BUSINESS.email}`} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--secondary))]" data-testid="link-faq-email"><MessageCircle size={17} /> Send us a note <ArrowRight size={15} /></a></div><div className="reveal delay-1">{faqs.map((item, index) => <div className="faq-row" key={item.q}><button type="button" className="faq-question" onClick={() => setActive(active === index ? null : index)} aria-expanded={active === index} data-testid={`button-faq-${index}`}><span>{item.q}</span><span className={`transition-transform duration-300 ${active === index ? 'rotate-180' : ''}`}><ChevronDown size={19} className="text-[hsl(var(--secondary))]" /></span></button>{active === index && <div className="faq-answer">{item.a}</div>}</div>)}</div></div></section>;
}

function Learn() {
  const [selected, setSelected] = useState<number | null>(null);
  return <section className="section-pad bg-[hsl(var(--card))]" id="learn"><div className="section-wrap"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">Field notes for homeowners</p><h2 className="mt-4 max-w-2xl font-display text-[clamp(2.5rem,5vw,4.6rem)] font-semibold leading-[.95] tracking-[-.06em]">Know a little more<br />before you call.</h2></div><button type="button" onClick={() => scrollToId('estimate')} className="button-base button-outline self-start md:self-end" data-testid="button-learn-help">Have a question? Ask us <ArrowRight size={16} /></button></div><div className="mt-12 grid gap-3 md:grid-cols-3">{articles.map((article, index) => <article key={article.title} className={`group border-t-4 p-7 ${article.color === 'blue' ? 'border-[hsl(var(--secondary))] bg-[hsl(var(--secondary)/.08)]' : article.color === 'copper' ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent)/.18)]' : 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/.08)]'}`} data-testid={`card-article-${index}`}><div className="flex items-center justify-between"><span className="eyebrow">{article.tag}</span><FileText size={17} className="text-[hsl(var(--muted-foreground))]" /></div><h3 className="mt-12 font-display text-2xl font-semibold leading-[1.06] tracking-[-.03em]">{article.title}</h3><p className="mt-4 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{selected === index ? `${article.text} A Northline professional can help you turn this into a simple maintenance plan for your home.` : article.text}</p><button type="button" onClick={() => setSelected(selected === index ? null : index)} className="mt-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-[hsl(var(--secondary))]" data-testid={`button-article-${index}`}>{selected === index ? 'Show less' : 'Read the note'} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></button></article>)}</div></div></section>;
}

function TrustFooter() {
  return <><section className="section-pad-sm bg-[hsl(var(--primary))] text-[hsl(var(--card))]"><div className="section-wrap grid items-center gap-9 lg:grid-cols-[1fr_auto]"><div><p className="eyebrow text-[hsl(var(--accent))]">A considered choice</p><h2 className="mt-4 max-w-3xl font-display text-[clamp(2.35rem,5vw,4.5rem)] font-semibold leading-[.95] tracking-[-.06em]">Trust is built one careful visit at a time.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-[hsl(var(--card)/.62)]">Northline brings experienced service, honest communication, and respect for your home to every appointment.</p></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2"><div className="grid h-24 w-32 place-items-center border border-[hsl(var(--card)/.15)] text-center"><BadgeCheck size={22} className="text-[hsl(var(--accent))]" /><span className="font-mono text-[.58rem] font-bold uppercase tracking-[.13em] text-[hsl(var(--card)/.62)]">Verified care</span></div><div className="grid h-24 w-32 place-items-center border border-[hsl(var(--card)/.15)] text-center"><ShieldCheck size={22} className="text-[hsl(var(--accent))]" /><span className="font-mono text-[.58rem] font-bold uppercase tracking-[.13em] text-[hsl(var(--card)/.62)]">Service promise</span></div></div></div></section><footer className="bg-[hsl(var(--primary))] text-[hsl(var(--card))]"><div className="section-wrap border-t border-[hsl(var(--card)/.14)] py-12"><div className="grid gap-10 md:grid-cols-[1.35fr_.65fr_.65fr]"><div><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[hsl(var(--accent))] text-[hsl(var(--primary))]"><Droplets size={21} /></span><span className="font-display text-xl font-bold">NORTHLINE</span></div><p className="mt-5 max-w-sm text-sm leading-7 text-[hsl(var(--card)/.58)]">Plumbing and water heater service for homes that deserve a thoughtful fix.</p><div className="mt-7 flex gap-2"><a href="#" className="grid h-9 w-9 place-items-center rounded-full border border-[hsl(var(--card)/.16)] text-[hsl(var(--card)/.7)] hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" aria-label="Northline on Instagram" data-testid="link-footer-instagram"><Instagram size={15} /></a><a href="#" className="grid h-9 w-9 place-items-center rounded-full border border-[hsl(var(--card)/.16)] text-[hsl(var(--card)/.7)] hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" aria-label="Northline on Facebook" data-testid="link-footer-facebook"><Facebook size={15} /></a><a href="#" className="grid h-9 w-9 place-items-center rounded-full border border-[hsl(var(--card)/.16)] text-[hsl(var(--card)/.7)] hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" aria-label="Northline on YouTube" data-testid="link-footer-youtube"><Youtube size={15} /></a></div></div><div><p className="eyebrow text-[hsl(var(--accent))]">Explore</p><div className="mt-5 grid gap-3 text-sm text-[hsl(var(--card)/.65)]"><button type="button" onClick={() => scrollToId('services')} className="text-left hover:text-[hsl(var(--accent))]" data-testid="link-footer-services">Services</button><button type="button" onClick={() => scrollToId('gallery')} className="text-left hover:text-[hsl(var(--accent))]" data-testid="link-footer-gallery">Our work</button><button type="button" onClick={() => scrollToId('faq')} className="text-left hover:text-[hsl(var(--accent))]" data-testid="link-footer-faq">FAQs</button><button type="button" onClick={() => scrollToId('learn')} className="text-left hover:text-[hsl(var(--accent))]" data-testid="link-footer-learn">Homeowner notes</button></div></div><div><p className="eyebrow text-[hsl(var(--accent))]">Contact</p><div className="mt-5 grid gap-3 text-sm text-[hsl(var(--card)/.65)]"><a href={BUSINESS.phoneHref} className="flex items-center gap-2 hover:text-[hsl(var(--accent))]" data-testid="link-footer-phone"><Phone size={14} /> {BUSINESS.phone}</a><a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 hover:text-[hsl(var(--accent))]" data-testid="link-footer-email"><MessageCircle size={14} /> {BUSINESS.email}</a><span className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" /> {BUSINESS.region}</span></div></div></div><div className="mt-12 flex flex-col justify-between gap-3 border-t border-[hsl(var(--card)/.14)] pt-5 text-[.68rem] text-[hsl(var(--card)/.4)] sm:flex-row"><span>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</span><span>Built for homes, not hard sells.</span></div></div></footer></>;
}

function GalleryModal({ item, onClose }: { item: typeof gallery[number]; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={item.title} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="modal-panel"><button type="button" onClick={onClose} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--primary)/.8)] text-[hsl(var(--card))]" aria-label="Close gallery image" data-testid="button-close-gallery"><X size={18} /></button><img src={item.src} alt={item.title} className="max-h-[70vh] w-full object-cover" /><div className="p-6"><p className="eyebrow">{item.label}</p><h2 className="mt-2 font-display text-3xl font-semibold">{item.title}</h2></div></div></div>;
}

function VideoModal({ onClose }: { onClose: () => void }) {
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Northline field notes video" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="modal-panel bg-[hsl(var(--primary))] p-8 text-[hsl(var(--card))] sm:p-12"><button type="button" onClick={onClose} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-[hsl(var(--card)/.2)]" aria-label="Close video" data-testid="button-close-video"><X size={18} /></button><div className="grid min-h-[360px] place-items-center text-center"><div><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--primary))]"><Play size={22} fill="currentColor" /></span><p className="eyebrow mt-7 text-[hsl(var(--accent))]">Northline field notes</p><h2 className="mt-3 font-display text-4xl font-semibold">A service visit, start to finish.</h2><p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[hsl(var(--card)/.65)]">Video playback is ready to connect to your existing field story. For now, call dispatch and we will walk you through the same thoughtful process.</p><a href={BUSINESS.phoneHref} className="button-base button-light mt-7" data-testid="link-video-call"><Phone size={16} /> Call the team</a></div></div></div></div>;
}

function Home() {
  const [galleryItem, setGalleryItem] = useState<typeof gallery[number] | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  useEffect(() => {
    document.title = `${BUSINESS.name} | Plumbing help without the drama`;
    const description = 'Premium local plumbing and water heater service with same-day appointments, free estimates, and a thoughtful approach to your home.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', description);
  }, []);
  return (
    <div className="site-shell" data-testid="page-home">
      <Header onEstimate={() => scrollToId('estimate')} />
      <main>
        <Hero />
        <TrustStrip />
        <Story />
        <Services />
        <EmergencyBand />
        <WhyChoose />
        <Gallery onOpen={setGalleryItem} />
        <VideoSection onPlay={() => setVideoOpen(true)} />
        <Testimonials />
        <Offers />
        <FAQ />
        <Learn />
        <TrustFooter />
      </main>
      <div className="mobile-bar">
        <a href={BUSINESS.phoneHref} className="button-base button-light" data-testid="link-mobile-call"><Phone size={15} /> Call now</a>
        <button type="button" onClick={() => scrollToId('estimate')} className="button-base button-blue" data-testid="button-mobile-estimate-bar">Get estimate <ArrowRight size={15} /></button>
      </div>
      {galleryItem && <GalleryModal item={galleryItem} onClose={() => setGalleryItem(null)} />}
      {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}
    </div>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={Home} /></Switch></RoutedErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;