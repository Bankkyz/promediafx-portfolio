import React, { useMemo, useState } from "react";

// ==============================================
// ProMediaFX – VFX Portfolio (Single-file React + TSX)
// - Dark cinematic theme
// - TH/EN toggle
// - Sections: Home, Portfolio (filters + modal), About, Contact
// - Tailwind classes
// ==============================================

const NAV = [
  { id: "home", th: "หน้าแรก", en: "Home" },
  { id: "portfolio", th: "ผลงาน", en: "Portfolio" },
  { id: "about", th: "เกี่ยวกับ", en: "About" },
  { id: "contact", th: "ติดต่อ", en: "Contact" },
] as const;

type LangKey = "th" | "en";

const LANG: Record<LangKey, any> = {
  th: {
    brand: "ProMediaFX",
    headline: "Bank – VFX & Compositing Artist",
    subhead:
      "เชี่ยวชาญงานคอมโพส ซิมูเลชัน 3D และตัดต่อ สำหรับโฆษณาและภาพยนตร์",
    ctaView: "ดูผลงาน",
    ctaContact: "ติดต่อผม",
    portfolioTitle: "ผลงาน",
    filterAll: "ทั้งหมด",
    filterComp: "Compositing",
    filterSim: "Simulation",
    filter3D: "3D",
    filterEdit: "Editing",
    aboutTitle: "เกี่ยวกับผม",
    aboutBody:
      "ผมชื่อแบงค์ เป็น VFX Artist ที่ถนัดด้าน Compositing (Nuke/After Effects), FX Simulation (Houdini), 3D (Maya/Houdini) และการตัดต่อ (Premiere Pro) เน้นโฟกัสคุณภาพภาพจริง-งานมืออาชีพ พร้อมอธิบาย Breakdown ทุกช็อตเพื่อให้ง่ายต่อการประเมินผลงาน",
    skills: "ทักษะ & ซอฟต์แวร์",
    contactTitle: "ติดต่อ",
    contactPitch:
      "พร้อมร่วมงานกับสตูดิโอ VFX, โปรดักชันเฮาส์ และงานโฆษณา/ภาพยนตร์",
    email: "อีเมล",
    phone: "โทร",
    location: "ที่อยู่",
    breakdown: "ดูรายละเอียด",
    viewVideo: "ดูวิดีโอ",
    close: "ปิด",
  },
  en: {
    brand: "ProMediaFX",
    headline: "Bank – VFX & Compositing Artist",
    subhead:
      "Specialized in compositing, FX simulation, 3D, and editing for film & advertising.",
    ctaView: "View Work",
    ctaContact: "Contact",
    portfolioTitle: "Portfolio",
    filterAll: "All",
    filterComp: "Compositing",
    filterSim: "Simulation",
    filter3D: "3D",
    filterEdit: "Editing",
    aboutTitle: "About",
    aboutBody:
      "I'm Bank, a VFX artist focusing on Compositing (Nuke/After Effects), FX Simulation (Houdini), 3D (Maya/Houdini), and Editing (Premiere Pro). I deliver realistic, production-ready visuals with clear per-shot breakdowns.",
    skills: "Skills & Software",
    contactTitle: "Contact",
    contactPitch:
      "Available for VFX studios, production houses, advertising, and film projects.",
    email: "Email",
    phone: "Phone",
    location: "Location",
    breakdown: "Breakdown",
    viewVideo: "View Video",
    close: "Close",
  },
};

const TAGS = ["compositing", "simulation", "3d", "editing"] as const;
type Tag = typeof TAGS[number];

type Project = {
  id: string;
  title: string;
  client?: string;
  role: string;
  tools: string[];
  tags: Tag[];
  thumb: string;
  video?: string;
  before?: string;
  after?: string;
  desc: string;
};

const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "City Night – Neon Rain",
    client: "Spec / Demo",
    role: "Compositing, Color, Lighting",
    tools: ["Nuke", "After Effects"],
    tags: ["compositing"],
    thumb:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&q=75&auto=format&fit=crop",
    video: "https://www.youtube.com/embed/ysz5S6PUM-U",
    before:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&q=75&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=75&auto=format&fit=crop",
    desc:
      "Keyed and composited foreground talent into a stylized neon cityscape; added atmospheric rain, reflections, and glows.",
  },
  {
    id: "p2",
    title: "Sand Burst – Houdini FX",
    client: "Spec / Demo",
    role: "FX Simulation, Lighting",
    tools: ["Houdini", "Maya"],
    tags: ["simulation", "3d"],
    thumb:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=75&auto=format&fit=crop",
    video: "https://player.vimeo.com/video/76979871?h=8272103f6e",
    desc:
      "Grain-based explosion sim with velocity-driven debris and volumetric lighting. Rendered in Mantra/Arnold.",
  },
  {
    id: "p3",
    title: "Commercial Cutdown – 30s",
    client: "Ad – Lifestyle Brand",
    role: "Offline/Online Editing, Finish",
    tools: ["Premiere Pro", "After Effects"],
    tags: ["editing"],
    thumb:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=75&auto=format&fit=crop",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    desc:
      "Rhythm-driven edit with graphic transitions and end-frame supers. Conformed and delivered in 4K.",
  },
  {
    id: "p4",
    title: "Creature Lookdev – Alley",
    client: "Short Film",
    role: "Layout, Shading, Comp",
    tools: ["Maya", "Houdini", "Nuke"],
    tags: ["3d", "compositing"],
    thumb:
      "https://images.unsplash.com/photo-1519681393700-8a7d8d62f86d?w=1200&q=75&auto=format&fit=crop",
    desc:
      "Lookdev pass with AOV-driven comp: diffuse/spec separation, screen-space fog, and chromatic aberration.",
  },
];

function classNames(...args: (string | false | null | undefined)[]) {
  return args.filter(Boolean).join(" ");
}

export default function PortfolioApp() {
  const [lang, setLang] = useState<LangKey>("th");
  const t = LANG[lang];
  const [filter, setFilter] = useState<"all" | Tag>("all");
  const [active, setActive] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.tags.includes(filter));
  }, [filter]);

  const activeProject = useMemo(
    () => PROJECTS.find((p) => p.id === active) || null,
    [active]
  );

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold text-xl tracking-wide">
            <span className="text-white">{t.brand}</span>
            <span className="text-cyan-400">.studio</span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="text-zinc-300 hover:text-white transition"
              >
                {lang === "th" ? n.th : n.en}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              className={classNames(
                "px-3 py-1 rounded-full text-sm",
                lang === "th"
                  ? "bg-cyan-500/20 text-cyan-300"
                  : "bg-zinc-800 text-zinc-300"
              )}
              onClick={() => setLang("th")}
            >
              TH
            </button>
            <button
              className={classNames(
                "px-3 py-1 rounded-full text-sm",
                lang === "en"
                  ? "bg-cyan-500/20 text-cyan-300"
                  : "bg-zinc-800 text-zinc-300"
              )}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.15),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-4 py-16 lg:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {t.headline}
            </h1>
            <p className="mt-4 text-zinc-300 md:text-lg">{t.subhead}</p>
            <div className="mt-6 flex gap-3">
              <a
                href="#portfolio"
                className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium"
              >
                {t.ctaView}
              </a>
              <a
                href="#contact"
                className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium"
              >
                {t.ctaContact}
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/ysz5S6PUM-U"
                title="Showreel"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="max-w-6xl mx-auto px-4 py-14 lg:py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold">{t.portfolioTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {([
              { key: "all", label: t.filterAll },
              { key: "compositing", label: t.filterComp },
              { key: "simulation", label: t.filterSim },
              { key: "3d", label: t.filter3D },
              { key: "editing", label: t.filterEdit },
            ] as const).map((b) => (
              <button
                key={b.key}
                onClick={() => setFilter(b.key as any)}
                className={classNames(
                  "px-3 py-1.5 rounded-full text-sm border",
                  filter === (b.key as any)
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                    : "bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-600"
                )}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition"
            >
              <button
                onClick={() => setActive(p.id)}
                className="text-left block w-full"
                aria-label={`${p.title} ${t.breakdown}`}
              >
                <div className="relative">
                  <img
                    src={p.thumb}
                    alt={p.title}
                    className="h-48 w-full object-cover group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <h3 className="font-medium text-white drop-shadow">{p.title}</h3>
                    <div className="flex gap-1">
                      {p.tags.map((tg) => (
                        <span
                          key={tg}
                          className="px-2 py-0.5 text-[11px] rounded-full bg-black/60 border border-white/10"
                        >
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 text-sm text-zinc-300 border-t border-zinc-800">
                  <p className="line-clamp-2">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded border border-zinc-700 text-zinc-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="relative border-y border-zinc-900 bg-gradient-to-b from-zinc-950 to-black"
      >
        <div className="max-w-6xl mx-auto px-4 py-16 lg:py-24 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">{t.aboutTitle}</h2>
            <p className="text-zinc-300 leading-relaxed">{t.aboutBody}</p>

            <h3 className="mt-8 font-medium text-zinc-100">{t.skills}</h3>
            <ul className="mt-3 flex flex-wrap gap-2 text-sm">
              {["Nuke", "After Effects", "Houdini", "Maya", "Premiere Pro"].map((s) => (
                <li key={s} className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-800 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1517697471339-4aa32003c11a?w=1600&q=75&auto=format&fit=crop"
              alt="Studio / Workbench"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">{t.contactTitle}</h2>
            <p className="text-zinc-300">{t.contactPitch}</p>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex gap-3">
                <dt className="w-24 text-zinc-400">{t.email}</dt>
                <dd>
                  <a href="mailto:hello@promediafx.com" className="hover:underline">
                    hello@promediafx.com
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 text-zinc-400">{t.phone}</dt>
                <dd>
                  <a href="tel:+66999999999" className="hover:underline">
                    +66 99 999 9999
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 text-zinc-400">{t.location}</dt>
                <dd>Bangkok, Thailand</dd>
              </div>
            </dl>

            <div className="mt-6 flex gap-3 text-sm">
              <a
                href="#"
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500"
              >
                YouTube
              </a>
              <a
                href="#"
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500"
              >
                Vimeo
              </a>
              <a
                href="#"
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500"
              >
                ArtStation
              </a>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget as HTMLFormElement);
              const subject = encodeURIComponent("Project Inquiry – ProMediaFX");
              const body = encodeURIComponent(
                `Name: ${data.get("name")}
Email: ${data.get("email")}
Message: ${data.get("message")}`
              );
              window.location.href = `mailto:hello@promediafx.com?subject=${subject}&body=${body}`;
            }}
            className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800"
          >
            <div className="grid grid-cols-1 gap-4">
              <label className="text-sm">
                <span className="text-zinc-300">Name</span>
                <input
                  name="name"
                  required
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-black border border-zinc-700 focus:border-cyan-500 outline-none"
                />
              </label>
              <label className="text-sm">
                <span className="text-zinc-300">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-black border border-zinc-700 focus:border-cyan-500 outline-none"
                />
              </label>
              <label className="text-sm">
                <span className="text-zinc-300">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-black border border-zinc-700 focus:border-cyan-500 outline-none resize-none"
                />
              </label>
              <button
                type="submit"
                className="mt-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-zinc-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {t.brand}. All rights reserved.</p>
          <p>
            Built with <span className="text-zinc-200 font-medium">React</span> and Tailwind.
          </p>
        </div>
      </footer>

      {/* Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="max-w-3xl w-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-semibold text-white">{activeProject.title}</h3>
                <p className="text-sm text-zinc-400">
                  {activeProject.role} • {activeProject.tools.join(", ")}
                </p>
              </div>
              <button
                onClick={() => setActive(null)}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-700 hover:border-zinc-500"
              >
                {t.close}
              </button>
            </div>

            <div className="p-5 grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                {activeProject.video ? (
                  <div className="aspect-video rounded-xl overflow-hidden border border-zinc-800">
                    <iframe
                      className="w-full h-full"
                      src={activeProject.video}
                      title={activeProject.title}
                      frameBorder={0}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <img
                    src={activeProject.thumb}
                    alt={activeProject.title}
                    className="rounded-xl border border-zinc-800"
                  />
                )}
              </div>

              <div className="space-y-3">
                <p className="text-zinc-300 leading-relaxed">{activeProject.desc}</p>

                {(activeProject.before || activeProject.after) && (
                  <div className="grid grid-cols-2 gap-3">
                    {activeProject.before && (
                      <figure>
                        <img
                          src={activeProject.before}
                          alt="Before"
                          className="rounded-lg border border-zinc-800"
                        />
                        <figcaption className="mt-1 text-xs text-zinc-400">Before</figcaption>
                      </figure>
                    )}
                    {activeProject.after && (
                      <figure>
                        <img
                          src={activeProject.after}
                          alt="After"
                          className="rounded-lg border border-zinc-800"
                        />
                        <figcaption className="mt-1 text-xs text-zinc-400">After</figcaption>
                      </figure>
                    )}
                  </div>
                )}

                <div className="pt-2 flex flex-wrap gap-2">
                  {activeProject.tags.map((tg) => (
                    <span
                      key={tg}
                      className="px-2 py-0.5 rounded-full text-xs bg-zinc-900 border border-zinc-700"
                    >
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-5 pb-5 flex gap-2">
              {activeProject.video && (
                <a
                  href={activeProject.video}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm"
                >
                  {t.viewVideo}
                </a>
              )}
              <button
                onClick={() => setActive(null)}
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 text-sm"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
