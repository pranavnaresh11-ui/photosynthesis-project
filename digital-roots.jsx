import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion, useScroll, useTransform, useSpring,
  useInView, AnimatePresence, useMotionValue
} from "framer-motion";
import {
  Leaf, Zap, DropletIcon, Globe, TreePine, Monitor,
  Wind, Flame, ArrowDown, CheckCircle, ChevronRight,
  Sun, CloudRain, Layers, Wifi, FileX, ShieldCheck,
  MessageCircle, ThumbsUp, AlertTriangle, FlaskConical,
  Dna, Sprout, Atom
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════════════════════ */
const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --emerald: #064e3b;
      --emerald-mid: #065f46;
      --emerald-light: #10b981;
      --charcoal: #121212;
      --bone: #f5f5f7;
      --bone-dim: rgba(245,245,247,0.55);
    }
    html { scroll-behavior: smooth; background: var(--charcoal); cursor: none; }
    body { background: var(--charcoal); overflow-x: hidden; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--charcoal); }
    ::-webkit-scrollbar-thumb { background: var(--emerald-light); border-radius: 2px; }
    ::selection { background: rgba(16,185,129,0.3); color: var(--bone); }
    .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
    .sans  { font-family: 'DM Sans', system-ui, sans-serif; }
    textarea { font-family: 'DM Sans', system-ui, sans-serif; }
  `}</style>
);

/* ═══════════════════════════════════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════════════════════════════════ */
function CustomCursor() {
  const cx = useMotionValue(-100), cy = useMotionValue(-100);
  const tx = useSpring(cx, { stiffness:80, damping:18 });
  const ty = useSpring(cy, { stiffness:80, damping:18 });
  const [hov, setHov] = useState(false);
  const [clk, setClk] = useState(false);
  useEffect(() => {
    const mv = e => { cx.set(e.clientX); cy.set(e.clientY); };
    const ov = e => { if (e.target.closest('button,a,[data-hover]')) setHov(true); };
    const ou = () => setHov(false);
    const md = () => setClk(true);
    const mu = () => setClk(false);
    window.addEventListener('mousemove', mv); window.addEventListener('mouseover', ov);
    window.addEventListener('mouseout', ou);  window.addEventListener('mousedown', md);
    window.addEventListener('mouseup', mu);
    return () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseover', ov);
      window.removeEventListener('mouseout', ou); window.removeEventListener('mousedown', md); window.removeEventListener('mouseup', mu); };
  }, []);
  return (<>
    <motion.div className="fixed top-0 left-0 z-[9999] pointer-events-none w-3 h-3 rounded-full"
      style={{ x:cx, y:cy, translateX:'-50%', translateY:'-50%', background: hov?'var(--emerald-light)':'var(--bone)', mixBlendMode:'difference' }}
      animate={{ scale: clk?0.5:hov?1.8:1 }} transition={{ type:'spring', stiffness:400, damping:25 }}/>
    <motion.div className="fixed top-0 left-0 z-[9998] pointer-events-none w-8 h-8 rounded-full border"
      style={{ x:tx, y:ty, translateX:'-50%', translateY:'-50%', borderColor:'var(--emerald-light)' }}
      animate={{ scale:hov?2.5:1, opacity:hov?0.4:0.2 }} transition={{ type:'spring', stiffness:120, damping:20 }}/>
  </>);
}

/* ═══════════════════════════════════════════════════════════════════════════
   FLASHLIGHT CARD
═══════════════════════════════════════════════════════════════════════════ */
function Flashlight({ children, hiddenText }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x:-999, y:-999 });
  const handleMove = useCallback(e => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setPos({ x: e.clientX-r.left, y: e.clientY-r.top });
  }, []);
  return (
    <div ref={ref} className="relative overflow-hidden" onMouseMove={handleMove}>
      {children}
      <div className="absolute inset-0 pointer-events-none select-none" style={{
        background:`radial-gradient(circle 180px at ${pos.x}px ${pos.y}px, transparent 0%, rgba(6,78,59,0.93) 100%)`}}>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="serif text-xl italic text-center px-8 max-w-lg" style={{
            color:'#6ee7b7',
            WebkitMaskImage:`radial-gradient(circle 160px at ${pos.x}px ${pos.y}px, black 0%, transparent 100%)`,
            maskImage:`radial-gradient(circle 160px at ${pos.x}px ${pos.y}px, black 0%, transparent 100%)`,
          }}>{hiddenText}</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LEAF VEIN BG
═══════════════════════════════════════════════════════════════════════════ */
function VeinBg({ opacity=0.04 }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }}>
      <defs><pattern id="vns" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
        <path d="M100 190 Q100 100 100 10" stroke="#10b981" strokeWidth="0.8" fill="none"/>
        <path d="M100 120 Q130 90 160 70" stroke="#10b981" strokeWidth="0.5" fill="none"/>
        <path d="M100 120 Q70 90 40 70"  stroke="#10b981" strokeWidth="0.5" fill="none"/>
        <path d="M100 150 Q125 130 145 115" stroke="#10b981" strokeWidth="0.4" fill="none"/>
        <path d="M100 150 Q75 130 55 115"  stroke="#10b981" strokeWidth="0.4" fill="none"/>
      </pattern></defs>
      <rect width="100%" height="100%" fill="url(#vns)"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED PRIMITIVES
═══════════════════════════════════════════════════════════════════════════ */
function Reveal({ children, delay=0, x=0, y=30 }) {
  const ref = useRef(null);
  const inV = useInView(ref, { once:true, margin:'-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity:0, x, y }}
      animate={inV?{ opacity:1, x:0, y:0 }:{}}
      transition={{ type:'spring', stiffness:55, damping:18, delay }}>
      {children}
    </motion.div>
  );
}
function Sec({ id, children, style={} }) {
  return <section id={id} className="relative py-28 md:py-36 px-6 md:px-16 overflow-hidden" style={style}>{children}</section>;
}
function Tag({ n, label }) {
  return <span className="sans text-xs tracking-[0.35em] uppercase" style={{ color:'var(--emerald-light)' }}>{n} / {label}</span>;
}
function H2({ children }) {
  return <h2 className="serif mt-4 mb-6 leading-tight" style={{ fontSize:'clamp(2.2rem,5vw,4rem)', color:'var(--bone)', fontWeight:300, letterSpacing:'-0.02em' }}>{children}</h2>;
}
function Lead({ children }) {
  return <p className="sans max-w-2xl mb-16" style={{ color:'var(--bone-dim)', lineHeight:1.8, fontWeight:300 }}>{children}</p>;
}
function Divider() {
  return (
    <div className="flex items-center gap-4 my-10 max-w-5xl mx-auto px-6 md:px-16">
      <div className="flex-1 h-px" style={{ background:'linear-gradient(to right, transparent, rgba(16,185,129,0.25))' }}/>
      <Leaf size={14} color="rgba(16,185,129,0.4)"/>
      <div className="flex-1 h-px" style={{ background:'linear-gradient(to left, transparent, rgba(16,185,129,0.25))' }}/>
    </div>
  );
}
function Badge({ n }) {
  return <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold sans"
    style={{ background:'rgba(16,185,129,0.12)', color:'var(--emerald-light)', border:'1px solid rgba(16,185,129,0.25)' }}>{n}</div>;
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAV — active section detection + smooth scroll
═══════════════════════════════════════════════════════════════════════════ */
function Nav() {
  const { scrollY } = useScroll();
  const bg   = useTransform(scrollY, [0,80], ['rgba(18,18,18,0)','rgba(18,18,18,0.85)']);
  const blur = useTransform(scrollY, [0,80], ['blur(0px)','blur(24px)']);
  const [active, setActive] = useState('');
  const links = ['Science','Carbon','Forests','Opinion','Forum','Digital','Pledge'];

  useEffect(() => {
    const obs = [];
    links.forEach(l => {
      const el = document.getElementById(l.toLowerCase());
      if (!el) return;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(l.toLowerCase()); },
        { rootMargin:'-40% 0px -50% 0px', threshold:0 });
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  const go = id => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:'smooth', block:'start' });

  return (
    <motion.nav style={{ backgroundColor:bg, backdropFilter:blur }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between"
      initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }}
      transition={{ type:'spring', stiffness:60, damping:18, delay:0.3 }}>
      <div className="flex items-center gap-2">
        <motion.div whileHover={{ rotate:20 }} transition={{ type:'spring', stiffness:300 }}>
          <Leaf size={16} color="var(--emerald-light)"/>
        </motion.div>
        <span className="serif text-base tracking-widest" style={{ color:'var(--bone)', letterSpacing:'0.18em' }}>DIGITAL ROOTS</span>
      </div>
      <div className="hidden lg:flex items-center gap-6">
        {links.map(l => {
          const isAct = active === l.toLowerCase();
          return (
            <motion.button key={l} data-hover onClick={() => go(l)}
              className="relative sans text-xs pb-1 bg-transparent border-0 outline-none"
              style={{ color: isAct?'var(--bone)':'rgba(245,245,247,0.38)', letterSpacing:'0.2em', cursor:'none' }}
              whileHover={{ color:'#f5f5f7' }}>
              {l.toUpperCase()}
              <motion.span className="absolute bottom-0 left-0 right-0 h-px rounded-full"
                style={{ background:'var(--emerald-light)', originX:0 }}
                initial={{ scaleX:0, opacity:0 }}
                animate={{ scaleX:isAct?1:0, opacity:isAct?1:0 }}
                transition={{ type:'spring', stiffness:120, damping:20 }}/>
              {!isAct && (
                <motion.span className="absolute bottom-0 left-0 right-0 h-px rounded-full"
                  style={{ background:'rgba(245,245,247,0.18)', originX:0 }}
                  initial={{ scaleX:0 }} whileHover={{ scaleX:1 }}
                  transition={{ type:'spring', stiffness:200, damping:22 }}/>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start start','end start'] });
  const ty  = useTransform(scrollYProgress, [0,1], [0,-60]);
  const op  = useTransform(scrollYProgress, [0,0.55], [1,0]);
  const sc  = useTransform(scrollYProgress, [0,1], [1,1.12]);
  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ scale:sc }} className="absolute inset-0">
        <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse 90% 80% at 50% 30%, #064e3b 0%, #0a1a10 40%, #121212 100%)' }}/>
        <VeinBg opacity={0.07}/>
        <div className="absolute inset-0" style={{ backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='512' height='512' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize:'200px', opacity:0.025 }}/>
      </motion.div>
      <motion.div animate={{ scale:[1,1.15,1], opacity:[0.12,0.2,0.12] }} transition={{ duration:8, repeat:Infinity }}
        className="absolute rounded-full pointer-events-none"
        style={{ width:600, height:600, top:'50%', left:'50%', transform:'translate(-50%,-50%)',
          background:'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)' }}/>
      <motion.div style={{ y:ty, opacity:op }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ type:'spring', stiffness:60, damping:18, delay:0.2 }}>
          <span className="sans text-xs tracking-[0.4em] uppercase mb-8 inline-block" style={{ color:'var(--emerald-light)' }}>A Scientific Case Against Renewable Paper</span>
        </motion.div>
        <motion.h1 initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }} transition={{ type:'spring', stiffness:50, damping:16, delay:0.4 }}
          className="serif mb-8 leading-none" style={{ fontSize:'clamp(3rem,8vw,7rem)', color:'var(--bone)', letterSpacing:'-0.02em', fontWeight:300 }}>
          The Best Tree is<br/><em style={{ color:'var(--emerald-light)' }}>the One Still Standing.</em>
        </motion.h1>
        <motion.p initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ type:'spring', stiffness:50, damping:18, delay:0.65 }}
          className="sans text-lg max-w-xl mx-auto mb-12" style={{ color:'var(--bone-dim)', fontWeight:300, lineHeight:1.75 }}>
          Renewable paper is a well-intentioned myth. Real climate leadership means choosing not to cut — and letting ancient carbon vaults keep breathing.
        </motion.p>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }}
          className="flex flex-col items-center gap-3" style={{ color:'rgba(245,245,247,0.25)' }}>
          <span className="sans text-xs tracking-[0.3em] uppercase">Scroll</span>
          <motion.div animate={{ y:[0,10,0] }} transition={{ duration:2, repeat:Infinity }}><ArrowDown size={16}/></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   01 · SCIENCE  — Where & How Photosynthesis Works
═══════════════════════════════════════════════════════════════════════════ */
function Science() {
  const stage1 = [
    { n:1, t:'Light Absorption', d:'Chlorophyll in thylakoid membranes absorbs red and blue wavelengths. Green is reflected — hence the colour of leaves.' },
    { n:2, t:'Photolysis (Water Splitting)', d:'H₂O → 2H⁺ + ½O₂ + 2e⁻. The oxygen released here is the O₂ we breathe — a by-product of splitting water, not directly from CO₂.' },
    { n:3, t:'ATP & NADPH Synthesis', d:'Released electrons travel an electron transport chain, driving synthesis of ATP and NADPH — the chemical energy stores used in Stage 2.' },
  ];
  const stage2 = [
    { n:1, t:'CO₂ Fixation (RuBisCO)', d:'In the stroma, the enzyme RuBisCO attaches atmospheric CO₂ to a 5-carbon molecule (RuBP), producing an unstable 6-carbon compound.' },
    { n:2, t:'Reduction (Calvin Cycle)', d:'ATP and NADPH drive a 3-step cycle that converts the captured carbon into G3P, a precursor to glucose (C₆H₁₂O₆).' },
    { n:3, t:'Regeneration of RuBP', d:'Most G3P is used to regenerate RuBP, keeping the cycle running and continuously locking CO₂ into stable organic matter.' },
  ];

  return (
    <Sec id="science" style={{ background:'var(--charcoal)' }}>
      <VeinBg opacity={0.05}/>
      <div className="max-w-5xl mx-auto">
        <Reveal><Tag n="01" label="The Science"/><H2>Where & How Photosynthesis Works</H2>
          <Lead>Photosynthesis takes place inside <strong style={{color:'var(--emerald-light)'}}>chloroplasts</strong> — organelles found mainly in the <strong style={{color:'var(--emerald-light)'}}>mesophyll cells</strong> of leaves. It runs in two sequential stages: light-dependent reactions and the Calvin Cycle (light-independent). Together they are responsible for virtually all atmospheric oxygen and form the base of every food chain on Earth.</Lead>
        </Reveal>

        {/* Equation flashlight */}
        <Reveal delay={0.1}>
          <Flashlight hiddenText="Logging one hectare of old-growth instantly releases 150–200 tonnes of CO₂ — undoing this reaction for a century.">
            <div className="rounded-2xl border p-8 md:p-12 text-center mb-14"
              style={{ background:'linear-gradient(135deg, rgba(6,78,59,0.25), rgba(18,18,18,0.95))', borderColor:'rgba(16,185,129,0.15)' }}>
              <p className="sans text-xs tracking-[0.35em] uppercase mb-8" style={{ color:'rgba(16,185,129,0.5)' }}>Net Equation — Photosynthesis</p>
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-4">
                {[{l:'6CO₂',s:'Carbon Dioxide',c:'#5b9bd5'},{l:'+',c:'rgba(245,245,247,0.18)'},{l:'6H₂O',s:'Water',c:'#60a5fa'},
                  {l:'+',c:'rgba(245,245,247,0.18)'},{l:'Light',s:'Solar Energy',c:'#fbbf24'},{l:'→',c:'rgba(16,185,129,0.5)'},
                  {l:'C₆H₁₂O₆',s:'Glucose',c:'#10b981'},{l:'+',c:'rgba(245,245,247,0.18)'},{l:'6O₂',s:'Oxygen',c:'#34d399'}
                ].map((item,i)=>(
                  <div key={i} className="flex flex-col items-center">
                    <span className="font-mono text-xl md:text-2xl font-bold" style={{ color:item.c }}>{item.l}</span>
                    {item.s && <span className="sans text-xs mt-1" style={{ color:'rgba(245,245,247,0.28)' }}>{item.s}</span>}
                  </div>
                ))}
              </div>
              <p className="sans text-xs mt-4" style={{ color:'rgba(245,245,247,0.18)', fontStyle:'italic' }}>↑ Hover to reveal what logging destroys</p>
            </div>
          </Flashlight>
        </Reveal>

        {/* Where it happens */}
        <Reveal delay={0.1}>
          <p className="sans text-xs tracking-[0.3em] uppercase mb-5" style={{ color:'var(--emerald-light)' }}>Where Photosynthesis Occurs</p>
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {[
              { icon:<Leaf size={20}/>,        l:'The Leaf',         d:'The primary photosynthetic organ. Flat, broad surface maximises light capture. Stomata (underside pores) admit CO₂ and release O₂ and water vapour.' },
              { icon:<Dna size={20}/>,          l:'Mesophyll Cells',  d:'Palisade cells (near the surface) are densely packed with chloroplasts and absorb most light. Spongy cells below allow gas exchange.' },
              { icon:<FlaskConical size={20}/>, l:'Chloroplasts',     d:'The organelle where all photosynthesis happens. Contains thylakoid membranes (Stage 1) and the fluid stroma (Stage 2 / Calvin Cycle).' },
            ].map((c,i)=>(
              <Reveal key={i} delay={i*0.08}>
                <motion.div whileHover={{ y:-5, borderColor:'rgba(16,185,129,0.4)' }}
                  transition={{ type:'spring', stiffness:200, damping:20 }}
                  className="rounded-xl border p-6" style={{ background:'rgba(6,78,59,0.08)', borderColor:'rgba(16,185,129,0.1)' }}>
                  <div className="mb-4" style={{ color:'var(--emerald-light)' }}>{c.icon}</div>
                  <p className="sans font-medium mb-2" style={{ color:'var(--bone)' }}>{c.l}</p>
                  <p className="sans text-sm" style={{ color:'var(--bone-dim)', lineHeight:1.7, fontWeight:300 }}>{c.d}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Two stages */}
        <div className="grid md:grid-cols-2 gap-7">
          <Reveal delay={0.1}>
            <div className="rounded-2xl border p-7 h-full"
              style={{ background:'linear-gradient(145deg, rgba(251,191,36,0.06), rgba(18,18,18,0.9))', borderColor:'rgba(251,191,36,0.15)' }}>
              <div className="flex items-center gap-3 mb-4">
                <Sun size={20} color="#fbbf24"/>
                <span className="sans font-medium text-sm" style={{ color:'#fde68a' }}>Stage 1 — Light-Dependent Reactions</span>
              </div>
              <p className="sans text-xs mb-5" style={{ color:'rgba(253,230,138,0.5)', lineHeight:1.6 }}>Location: <em>thylakoid membranes</em> inside chloroplasts. Requires direct sunlight.</p>
              <div className="space-y-4">
                {stage1.map(s=>(
                  <div key={s.n} className="flex gap-3 items-start">
                    <Badge n={s.n}/>
                    <div>
                      <p className="sans text-sm font-medium mb-1" style={{ color:'var(--bone)' }}>{s.t}</p>
                      <p className="sans text-xs" style={{ color:'var(--bone-dim)', lineHeight:1.7, fontWeight:300 }}>{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="rounded-2xl border p-7 h-full"
              style={{ background:'linear-gradient(145deg, rgba(16,185,129,0.06), rgba(18,18,18,0.9))', borderColor:'rgba(16,185,129,0.15)' }}>
              <div className="flex items-center gap-3 mb-4">
                <Atom size={20} color="var(--emerald-light)"/>
                <span className="sans font-medium text-sm" style={{ color:'var(--emerald-light)' }}>Stage 2 — Calvin Cycle (Dark Reactions)</span>
              </div>
              <p className="sans text-xs mb-5" style={{ color:'rgba(16,185,129,0.45)', lineHeight:1.6 }}>Location: <em>stroma</em> of chloroplasts. Uses ATP & NADPH from Stage 1; does not require direct light.</p>
              <div className="space-y-4">
                {stage2.map(s=>(
                  <div key={s.n} className="flex gap-3 items-start">
                    <Badge n={s.n}/>
                    <div>
                      <p className="sans text-sm font-medium mb-1" style={{ color:'var(--bone)' }}>{s.t}</p>
                      <p className="sans text-xs" style={{ color:'var(--bone-dim)', lineHeight:1.7, fontWeight:300 }}>{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Key stats */}
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {[
            { icon:<TreePine size={22}/>, stat:'800+', label:'Years', desc:'Coastal old-growth trees like redwoods accumulate carbon for 800+ years — dwarfing any plantation cycle in both scale and density.' },
            { icon:<Layers size={22}/>,   stat:'56%',  label:'Soil Carbon', desc:'Of all forest carbon is stored underground (U.S. EPA). Logging destroys this hidden vault, which can take centuries to partially rebuild.' },
            { icon:<CloudRain size={22}/>,stat:'~40%', label:'Rainfall', desc:'Of precipitation in major tropical basins is recycled through forest transpiration. Lose the canopy — eventually lose the rain.' },
          ].map((s,i)=>(
            <Reveal key={i} delay={i*0.1}>
              <motion.div whileHover={{ y:-5, borderColor:'rgba(16,185,129,0.4)' }}
                transition={{ type:'spring', stiffness:200, damping:20 }}
                className="rounded-xl border p-7" style={{ background:'rgba(6,78,59,0.08)', borderColor:'rgba(16,185,129,0.1)' }}>
                <div className="mb-4" style={{ color:'var(--emerald-light)' }}>{s.icon}</div>
                <div className="serif mb-1" style={{ fontSize:'2.8rem', color:'var(--bone)', fontWeight:300, lineHeight:1 }}>{s.stat}</div>
                <div className="sans text-xs tracking-widest uppercase mb-3" style={{ color:'var(--emerald-light)' }}>{s.label}</div>
                <p className="sans text-sm" style={{ color:'var(--bone-dim)', lineHeight:1.7, fontWeight:300 }}>{s.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </Sec>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   02 · CARBON — Two CO₂ Processes + Why Balance Matters
═══════════════════════════════════════════════════════════════════════════ */
function Carbon() {
  const combSteps = [
    { n:1, t:'Fuel Meets Oxygen', d:'A carbon-based fuel (coal, oil, gas, wood/paper) is brought into contact with atmospheric O₂.' },
    { n:2, t:'Ignition & Activation Energy', d:'Heat is applied to overcome the activation energy barrier, triggering an exothermic chain reaction.' },
    { n:3, t:'Rapid Oxidation', d:'Carbon atoms bond with two oxygen atoms: C + O₂ → CO₂. Hydrogen bonds with oxygen: 2H₂ + O₂ → 2H₂O.' },
    { n:4, t:'CO₂ & Heat Released', d:'Energy stored over millions of years releases as heat, light, and CO₂ in seconds. Global fossil fuel burning now emits ~37 Gt CO₂/yr (IEA 2024).' },
  ];
  const respSteps = [
    { n:1, t:'Glycolysis (Cytoplasm)', d:'Glucose (C₆H₁₂O₆) is split into 2 pyruvate molecules, yielding a small ATP gain. No oxygen required at this stage.' },
    { n:2, t:'Pyruvate Oxidation', d:'Each pyruvate enters the mitochondria and converts to Acetyl-CoA, releasing one CO₂ per pyruvate (2 total per glucose).' },
    { n:3, t:'Krebs Cycle', d:'Acetyl-CoA is systematically broken down, releasing 2 CO₂ molecules per turn and generating NADH and FADH₂ electron carriers.' },
    { n:4, t:'Electron Transport Chain', d:'NADH/FADH₂ drive a proton pump producing large ATP yields. O₂ is the final electron acceptor, forming H₂O. Net: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP.' },
  ];
  const reasons = [
    {
      icon:<Zap size={22}/>, color:'#ef4444',
      title:'Reason 1 — Runaway Greenhouse Effect & Global Warming',
      cause:'Excess CO₂ and methane trap outgoing infrared radiation from Earth\'s surface — amplifying the natural greenhouse effect beyond sustainable limits.',
      effect:'Global average temperatures rise. Ice caps melt, sea levels increase, and extreme weather intensifies. The IPCC warns of irreversible tipping points above 1.5–2°C. CO₂ is already at 422+ ppm (NOAA 2024) — 50% above pre-industrial levels of ~280 ppm.',
    },
    {
      icon:<Wind size={22}/>, color:'#60a5fa',
      title:'Reason 2 — Disrupted O₂/CO₂ Cycle & Ocean Acidification',
      cause:'As CO₂ rises and forests shrink, oceans absorb excess CO₂, forming carbonic acid: CO₂ + H₂O → H₂CO₃. Ocean pH drops (acidification). Photosynthetic marine organisms decline.',
      effect:'Shellfish and coral cannot form shells in acidic water — entire marine food webs collapse. Reduced ocean photosynthesis means less O₂ production globally. Every link in the chain of life is threatened by this cascade.',
    },
  ];
  const ref = useRef(null);
  const inV = useInView(ref, { once:true, margin:'-60px' });

  return (
    <Sec id="carbon" style={{ background:'linear-gradient(180deg, var(--charcoal) 0%, #0d1a10 100%)' }}>
      <VeinBg opacity={0.04}/>
      <div className="max-w-5xl mx-auto">
        <Reveal><Tag n="02" label="Carbon Imbalance"/><H2>Two Processes Flooding Our Atmosphere</H2>
          <Lead>While photosynthesis removes CO₂, two powerful natural and human-amplified processes continuously add it back. Their full mechanism — step by step — explains why "plant more trees" is not a fast enough answer.</Lead>
        </Reveal>

        {/* Combustion */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl border mb-7 overflow-hidden" style={{ borderColor:'rgba(239,68,68,0.2)', background:'rgba(18,18,18,0.85)' }}>
            <div className="p-6 border-b flex flex-wrap items-center gap-4" style={{ background:'rgba(239,68,68,0.07)', borderColor:'rgba(239,68,68,0.12)' }}>
              <div className="p-2 rounded-lg" style={{ background:'rgba(239,68,68,0.15)', color:'#ef4444' }}><Flame size={20}/></div>
              <div className="flex-1">
                <p className="sans font-medium" style={{ color:'#fca5a5' }}>Process 1 — Combustion</p>
                <p className="sans text-xs mt-0.5" style={{ color:'rgba(239,68,68,0.45)' }}>General: C + O₂ → CO₂ + Energy (heat & light)</p>
              </div>
              <span className="font-mono text-sm font-bold" style={{ color:'#ef4444' }}>~37 Gt CO₂ / yr</span>
            </div>
            <div className="p-7 grid md:grid-cols-2 gap-5">
              {combSteps.map(s=>(
                <div key={s.n} className="flex gap-3 items-start">
                  <Badge n={s.n}/>
                  <div>
                    <p className="sans text-sm font-medium mb-1" style={{ color:'var(--bone)' }}>{s.t}</p>
                    <p className="sans text-xs" style={{ color:'var(--bone-dim)', lineHeight:1.7, fontWeight:300 }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Respiration */}
        <Reveal delay={0.15}>
          <div className="rounded-2xl border mb-12 overflow-hidden" style={{ borderColor:'rgba(96,165,250,0.2)', background:'rgba(18,18,18,0.85)' }}>
            <div className="p-6 border-b flex flex-wrap items-center gap-4" style={{ background:'rgba(96,165,250,0.07)', borderColor:'rgba(96,165,250,0.12)' }}>
              <div className="p-2 rounded-lg" style={{ background:'rgba(96,165,250,0.15)', color:'#60a5fa' }}><Wind size={20}/></div>
              <div className="flex-1">
                <p className="sans font-medium" style={{ color:'#bfdbfe' }}>Process 2 — Cellular Respiration</p>
                <p className="sans text-xs mt-0.5" style={{ color:'rgba(96,165,250,0.45)' }}>Net: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP</p>
              </div>
              <span className="font-mono text-sm font-bold" style={{ color:'#60a5fa' }}>All living organisms</span>
            </div>
            <div className="p-7 grid md:grid-cols-2 gap-5">
              {respSteps.map(s=>(
                <div key={s.n} className="flex gap-3 items-start">
                  <Badge n={s.n}/>
                  <div>
                    <p className="sans text-sm font-medium mb-1" style={{ color:'var(--bone)' }}>{s.t}</p>
                    <p className="sans text-xs" style={{ color:'var(--bone-dim)', lineHeight:1.7, fontWeight:300 }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Why balance matters */}
        <Reveal><p className="sans text-xs tracking-[0.3em] uppercase mb-6" style={{ color:'var(--emerald-light)' }}>Why the Atmosphere Must Stay in Balance</p></Reveal>
        <div ref={ref} className="grid md:grid-cols-2 gap-6 mb-10">
          {reasons.map((r,i)=>(
            <Reveal key={i} delay={i*0.12}>
              <motion.div whileHover={{ scale:1.01 }} transition={{ type:'spring', stiffness:200, damping:25 }}
                className="rounded-2xl border p-7 h-full"
                style={{ background:`linear-gradient(145deg, ${r.color}08, rgba(18,18,18,0.9))`, borderColor:`${r.color}20` }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg" style={{ background:`${r.color}18`, color:r.color }}>{r.icon}</div>
                  <p className="sans font-medium text-sm" style={{ color:'var(--bone)' }}>{r.title}</p>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg p-4" style={{ background:'rgba(255,255,255,0.025)', border:`1px solid ${r.color}12` }}>
                    <p className="sans text-xs font-semibold tracking-widest uppercase mb-2" style={{ color:r.color }}>Cause</p>
                    <p className="sans text-sm" style={{ color:'var(--bone-dim)', lineHeight:1.75, fontWeight:300 }}>{r.cause}</p>
                  </div>
                  <div className="rounded-lg p-4" style={{ background:'rgba(255,255,255,0.025)', border:`1px solid ${r.color}12` }}>
                    <p className="sans text-xs font-semibold tracking-widest uppercase mb-2" style={{ color:r.color }}>Effect</p>
                    <p className="sans text-sm" style={{ color:'var(--bone-dim)', lineHeight:1.75, fontWeight:300 }}>{r.effect}</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="rounded-xl border p-7 flex gap-5 items-start" style={{ background:'rgba(239,68,68,0.05)', borderColor:'rgba(239,68,68,0.18)' }}>
            <Zap size={24} style={{ color:'#ef4444', flexShrink:0, marginTop:2 }}/>
            <div>
              <p className="sans font-medium mb-2" style={{ color:'#fca5a5' }}>Net rise: +2.4 ppm/yr avg (2011–2020) · record +3.75 ppm in 2024 (NOAA/WMO)</p>
              <p className="sans text-sm" style={{ color:'rgba(245,245,247,0.45)', fontWeight:300, lineHeight:1.75 }}>
                CO₂ now stands at 422+ ppm — over 50% above pre-industrial levels. Growth rates have tripled since the 1960s. A sapling planted today won't absorb meaningfully for 10–20 years. The second-best time to stop cutting was yesterday.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Sec>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   03 · FORESTS — Short & Long-Term Consequences of Clearing
═══════════════════════════════════════════════════════════════════════════ */
function Forests() {
  const shortPts = [
    'A single hectare of tropical forest contains 150–200 tonnes of CO₂ equivalent. Burning or felling releases this almost instantly.',
    'Loss of canopy destroys micro-habitats for thousands of species overnight. WWF estimates 137 species go extinct daily from deforestation.',
    'Exposed soil oxidises rapidly under direct sunlight, releasing further stored carbon and destroying soil structure within months.',
    'Forest-fed rivers and water sources dry up seasonally — local communities and indigenous populations lose their primary water supply immediately.',
  ];
  const longPts = [
    'The Amazon may be near a "dieback tipping point" — where enough forest is gone that the region can no longer generate its own rainfall, converting permanently to savanna.',
    'Mycorrhizal fungal networks — belowground carbon stores and nutrient highways — are permanently eradicated by heavy machinery and take 80–200 years to partially recover.',
    'Without root systems to hold topsoil, deforested land erodes rapidly. Within decades, exposed bedrock renders land permanently non-productive.',
    'Reduced global photosynthetic capacity locks in higher atmospheric CO₂ for centuries, committing future generations to a warmer climate regardless of what emissions cuts come later.',
  ];

  return (
    <Sec id="forests" style={{ background:'var(--charcoal)' }}>
      <VeinBg opacity={0.04}/>
      <div className="max-w-5xl mx-auto">
        <Reveal><Tag n="03" label="Clearing Forests"/><H2>Two Consequences of Deforestation</H2>
          <Lead>Logging a forest is not a neutral exchange. It triggers two chains of consequence — one felt within days, another that reshapes the climate for centuries. Both must be understood to evaluate the "renewable paper" argument honestly.</Lead>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Reveal delay={0.1}>
            <div className="rounded-2xl border overflow-hidden h-full" style={{ borderColor:'rgba(251,191,36,0.22)', background:'rgba(18,18,18,0.85)' }}>
              <div className="p-6 border-b" style={{ background:'rgba(251,191,36,0.07)', borderColor:'rgba(251,191,36,0.12)' }}>
                <div className="flex items-center gap-3">
                  <span className="sans text-xs font-bold px-3 py-1 rounded-full" style={{ background:'rgba(251,191,36,0.2)', color:'#fbbf24', letterSpacing:'0.1em' }}>SHORT-TERM</span>
                  <span className="sans font-medium text-sm" style={{ color:'#fde68a' }}>Immediate CO₂ Pulse & Habitat Collapse</span>
                </div>
              </div>
              <div className="p-7 space-y-4">
                <p className="sans text-sm" style={{ color:'var(--bone-dim)', lineHeight:1.8, fontWeight:300 }}>
                  When a forest is felled or burned, the carbon accumulated over decades or centuries is released in hours to months — a sudden pulse into an already-overloaded atmosphere.
                </p>
                {shortPts.map((p,i)=>(
                  <div key={i} className="flex gap-3 items-start">
                    <AlertTriangle size={13} style={{ color:'#fbbf24', marginTop:3, flexShrink:0 }}/>
                    <p className="sans text-sm" style={{ color:'var(--bone-dim)', lineHeight:1.7, fontWeight:300 }}>{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.17}>
            <div className="rounded-2xl border overflow-hidden h-full" style={{ borderColor:'rgba(239,68,68,0.22)', background:'rgba(18,18,18,0.85)' }}>
              <div className="p-6 border-b" style={{ background:'rgba(239,68,68,0.07)', borderColor:'rgba(239,68,68,0.12)' }}>
                <div className="flex items-center gap-3">
                  <span className="sans text-xs font-bold px-3 py-1 rounded-full" style={{ background:'rgba(239,68,68,0.2)', color:'#ef4444', letterSpacing:'0.1em' }}>LONG-TERM</span>
                  <span className="sans font-medium text-sm" style={{ color:'#fca5a5' }}>Permanent Carbon Vault Loss & Climate Tipping</span>
                </div>
              </div>
              <div className="p-7 space-y-4">
                <p className="sans text-sm" style={{ color:'var(--bone-dim)', lineHeight:1.8, fontWeight:300 }}>
                  An old-growth forest is not simply trees — it is a centuries-old climate regulation system. Once cleared, no plantation can replicate it on any human timescale. The IPCC classifies certain thresholds as potential irreversible tipping points.
                </p>
                {longPts.map((p,i)=>(
                  <div key={i} className="flex gap-3 items-start">
                    <AlertTriangle size={13} style={{ color:'#ef4444', marginTop:3, flexShrink:0 }}/>
                    <p className="sans text-sm" style={{ color:'var(--bone-dim)', lineHeight:1.7, fontWeight:300 }}>{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="rounded-2xl border p-8 text-center" style={{ background:'linear-gradient(135deg, rgba(6,78,59,0.15), rgba(18,18,18,0.9))', borderColor:'rgba(16,185,129,0.15)' }}>
            <p className="serif text-2xl italic mb-3" style={{ color:'var(--bone)' }}>"Industrial logging disrupts not just trees — it destroys the carbon memory of the soil."</p>
            <span className="sans text-xs tracking-widest uppercase" style={{ color:'rgba(16,185,129,0.5)' }}>— Nature Climate Change, 2023</span>
          </div>
        </Reveal>
      </div>
    </Sec>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   04 · OPINION — Against Renewable Paper: 2 Scientific Reasons
═══════════════════════════════════════════════════════════════════════════ */
function Opinion() {
  const reasons = [
    {
      n:'01', color:'#ef4444', icon:<TreePine size={22}/>,
      title:'Carbon Debt Takes 40–80 Years to Repay',
      evidence:'Stephenson et al. (Nature, 2014) confirmed that mature trees accelerate their carbon sequestration throughout their lifespan. When a forest is logged, the carbon debt — the difference between stored carbon lost and new carbon absorbed by replanted saplings — takes 40–80+ years to repay. Research from the International Journal of Wildland Fire (IJW, 2022) found that even optimally managed replanted forests remain net carbon sources for decades. Given that the IPCC SR1.5 report identifies the 2020s–2030s as the critical window for emissions reductions, this timescale makes "renewable paper" climatically irresponsible.',
      conclusion:'During the 40–80 year carbon repayment period, the atmosphere is measurably worse off than if the forest had simply been left standing. No certification scheme changes this physics.',
    },
    {
      n:'02', color:'#a78bfa', icon:<Layers size={22}/>,
      title:'Soil Carbon & Ecosystems Cannot Be Renewed on Human Timescales',
      evidence:'The U.S. EPA confirms that 56% of all forest carbon is stored in soil — not in trees. NRDC/USDA research (2023) shows intensive logging can destroy up to 50% of upper soil carbon through compaction, scarification, and exposure. The mycorrhizal fungal networks that regulate belowground carbon storage, water retention, and nutrient cycling took millennia to form and are eradicated in a single harvest. FSC and PEFC certification schemes track tree volume and regeneration, not soil ecosystem recovery.',
      conclusion:'Until certification accounts for full lifecycle soil carbon costs, "sustainably certified" paper is a measurement artifact, not a climate reality. The only guaranteed protection is reducing demand.',
    },
  ];

  return (
    <Sec id="opinion" style={{ background:'linear-gradient(180deg, #0d1a10 0%, var(--charcoal) 100%)' }}>
      <VeinBg opacity={0.05}/>
      <div className="max-w-5xl mx-auto">
        <Reveal><Tag n="04" label="My Opinion"/><H2>Against Renewable Paper:<br/><em style={{color:'var(--emerald-light)'}}>Two Scientific Reasons</em></H2>
          <Lead>I am firmly against the recommendation that "renewable paper" constitutes meaningful climate action. The science is unambiguous. Here are my two strongest evidence-based arguments — and the conclusion they point to.</Lead>
        </Reveal>

        <div className="space-y-8">
          {reasons.map((r,i)=>(
            <Reveal key={i} delay={i*0.12}>
              <motion.div whileHover={{ x:3 }} transition={{ type:'spring', stiffness:200, damping:25 }}
                className="rounded-2xl border overflow-hidden" style={{ borderColor:`${r.color}18`, background:'rgba(18,18,18,0.88)' }}>
                <div className="p-7 border-b flex items-start gap-5" style={{ background:`${r.color}07`, borderColor:`${r.color}12` }}>
                  <div className="serif text-4xl font-light" style={{ color:`${r.color}35`, lineHeight:1 }}>{r.n}</div>
                  <div className="flex items-center gap-3 pt-1">
                    <span style={{ color:r.color }}>{r.icon}</span>
                    <h3 className="sans font-medium" style={{ color:'var(--bone)' }}>{r.title}</h3>
                  </div>
                </div>
                <div className="p-7 grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="sans text-xs font-semibold tracking-widest uppercase mb-3" style={{ color:r.color }}>Scientific Evidence</p>
                    <p className="sans text-sm" style={{ color:'var(--bone-dim)', lineHeight:1.85, fontWeight:300 }}>{r.evidence}</p>
                  </div>
                  <div className="rounded-xl p-5" style={{ background:`${r.color}07`, border:`1px solid ${r.color}18` }}>
                    <p className="sans text-xs font-semibold tracking-widest uppercase mb-3" style={{ color:r.color }}>Conclusion</p>
                    <p className="sans text-sm" style={{ color:'var(--bone-dim)', lineHeight:1.85, fontWeight:300 }}>{r.conclusion}</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-10 rounded-xl border p-7 flex gap-5 items-start" style={{ background:'rgba(16,185,129,0.05)', borderColor:'rgba(16,185,129,0.18)' }}>
            <CheckCircle size={22} style={{ color:'var(--emerald-light)', flexShrink:0, marginTop:2 }}/>
            <div>
              <p className="sans font-medium mb-2" style={{ color:'var(--emerald-light)' }}>The Verdict: Reduce First, Then Certify</p>
              <p className="sans text-sm" style={{ color:'rgba(245,245,247,0.48)', fontWeight:300, lineHeight:1.8 }}>
                Certified paper is better than uncertified — but certification is not a licence to consume freely. Every document not printed is an immediate, compounding climate win. Every ancient forest left standing is irreplaceable carbon infrastructure. Choosing digital-first is not perfectionism. It is the only path with guaranteed, immediate impact.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Sec>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   05 · FORUM — Class Discussion & Response
═══════════════════════════════════════════════════════════════════════════ */
function Forum() {
  const [liked, setLiked]   = useState({});
  const [text,  setText]    = useState('');
  const [sent,  setSent]    = useState(false);
  const posts = [
    { id:'m', av:'M', name:'Maya Chen',  role:'Student', time:'2 hours ago', color:'#60a5fa', likes:14,
      text:'I think renewable paper is a decent compromise — at least companies are planting new trees. Isn\'t replanting better than nothing? Besides, if we switch everything to digital we\'re just replacing paper factories with server farms and e-waste.' },
    { id:'r', av:'R', name:'Raj Patel',  role:'Student', time:'1 hour ago',  color:'#fbbf24', likes:22,
      text:'What about the communities that depend on paper manufacturing for their livelihoods? Going fully digital feels like an elitist solution — not everyone has reliable internet or can afford devices. Are we just exporting our environmental guilt?' },
  ];
  const myReply = `Great contributions from both of you — these are exactly the tensions worth interrogating. Maya, you're right that replanting is better than nothing, but the science is clear: a newly replanted forest takes 40–80+ years just to repay the carbon debt from clearing the original stand (Stephenson et al., Nature 2014; IJW 2022). In a decade where every tonne of emissions matters, that timescale isn't a compromise — it's a deferral. Raj, the digital divide is a real and serious issue, but it calls for expanding digital access, not preserving deforestation. These are separate problems that need separate solutions. The environmental cost of logging ancient forests should not be subsidised by communities who lack digital alternatives. My position: certified paper is better than uncertified, but neither beats genuine consumption reduction. The best action is to use less paper first, then ask about certification.`;

  return (
    <Sec id="forum" style={{ background:'var(--charcoal)' }}>
      <div className="max-w-3xl mx-auto">
        <Reveal><Tag n="05" label="Class Forum"/><H2>Discussion: Paper vs. Digital</H2>
          <Lead>A peer forum on the core question: should we switch to digital-first to protect forests? Two student contributions below — and a direct scientific response engaging with both.</Lead>
        </Reveal>

        {/* Thread header */}
        <Reveal delay={0.1}>
          <div className="rounded-t-2xl border border-b-0 px-6 py-4 flex items-center gap-3"
            style={{ background:'rgba(6,78,59,0.12)', borderColor:'rgba(16,185,129,0.14)' }}>
            <MessageCircle size={16} style={{ color:'var(--emerald-light)' }}/>
            <span className="sans text-sm font-medium" style={{ color:'var(--bone)' }}>
              Thread: Should schools and offices go fully digital to protect forests?
            </span>
          </div>
        </Reveal>

        {/* Thread body */}
        <div className="border border-t-0 rounded-b-2xl overflow-hidden"
          style={{ borderColor:'rgba(16,185,129,0.1)', background:'rgba(12,12,12,0.9)' }}>
          {/* Peer posts */}
          {posts.map((p,i)=>(
            <Reveal key={p.id} delay={0.15+i*0.1}>
              <div className="p-6 border-b" style={{ borderColor:'rgba(255,255,255,0.04)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background:`${p.color}22`, color:p.color }}>{p.av}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="sans text-sm font-medium" style={{ color:'var(--bone)' }}>{p.name}</span>
                      <span className="sans text-xs" style={{ color:'rgba(245,245,247,0.28)' }}>{p.role} · {p.time}</span>
                    </div>
                    <p className="sans text-sm" style={{ color:'var(--bone-dim)', lineHeight:1.8, fontWeight:300 }}>{p.text}</p>
                    <motion.button data-hover onClick={()=>setLiked(l=>({...l,[p.id]:!l[p.id]}))}
                      whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                      transition={{ type:'spring', stiffness:300 }}
                      className="mt-3 flex items-center gap-2 text-xs sans px-3 py-1.5 rounded-full border"
                      style={{ borderColor:liked[p.id]?'rgba(16,185,129,0.5)':'rgba(255,255,255,0.07)',
                        color:liked[p.id]?'var(--emerald-light)':'rgba(245,245,247,0.28)',
                        background:liked[p.id]?'rgba(16,185,129,0.07)':'transparent', cursor:'none' }}>
                      <ThumbsUp size={12}/>{p.likes+(liked[p.id]?1:0)}
                    </motion.button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Pranav's reply */}
          <Reveal delay={0.35}>
            <div className="p-6 border-b" style={{ borderColor:'rgba(16,185,129,0.1)', background:'rgba(6,78,59,0.07)' }}>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background:'rgba(16,185,129,0.18)', color:'var(--emerald-light)', border:'1px solid rgba(16,185,129,0.3)' }}>P</div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="sans text-sm font-medium" style={{ color:'var(--emerald-light)' }}>Pranav</span>
                    <span className="sans text-xs" style={{ color:'rgba(245,245,247,0.28)' }}>Student · Just now</span>
                    <span className="sans text-xs px-2 py-0.5 rounded-full" style={{ background:'rgba(16,185,129,0.1)', color:'var(--emerald-light)' }}>Your reply</span>
                  </div>
                  <p className="sans text-sm" style={{ color:'var(--bone-dim)', lineHeight:1.85, fontWeight:300 }}>{myReply}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Reply box */}
          <Reveal delay={0.42}>
            <div className="p-6">
              {!sent ? (
                <div>
                  <p className="sans text-xs mb-3" style={{ color:'rgba(245,245,247,0.28)' }}>Add your perspective to the discussion:</p>
                  <textarea value={text} onChange={e=>setText(e.target.value)} rows={3}
                    placeholder="Share your view, backed by evidence..."
                    className="w-full rounded-xl p-4 text-sm resize-none outline-none"
                    style={{ background:'rgba(255,255,255,0.035)', border:'1px solid rgba(255,255,255,0.07)',
                      color:'var(--bone)', cursor:'text' }}/>
                  <div className="flex justify-end mt-3">
                    <motion.button data-hover onClick={()=>text.trim()&&setSent(true)}
                      whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                      transition={{ type:'spring', stiffness:300, damping:20 }}
                      className="sans text-xs px-5 py-2 rounded-full font-medium"
                      style={{ background:'var(--emerald)', color:'var(--bone)', border:'1px solid rgba(16,185,129,0.3)', cursor:'none' }}>
                      Post Reply
                    </motion.button>
                  </div>
                </div>
              ) : (
                <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                  transition={{ type:'spring', stiffness:80, damping:15 }}
                  className="flex items-center gap-3 p-4 rounded-xl"
                  style={{ background:'rgba(16,185,129,0.07)', border:'1px solid rgba(16,185,129,0.18)' }}>
                  <CheckCircle size={16} style={{ color:'var(--emerald-light)' }}/>
                  <p className="sans text-sm" style={{ color:'var(--emerald-light)' }}>Reply posted. Your voice is part of the conversation.</p>
                </motion.div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </Sec>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   06 · DIGITAL SHIFT
═══════════════════════════════════════════════════════════════════════════ */
function DigitalShift() {
  const benefits = [
    { icon:<Wifi size={20}/>,        t:'Zero Transport Emissions',  d:'A PDF sent globally uses ~0.00006 kg CO₂. Shipping the same document overnight: 0.85 kg — a 14,000× difference in favour of digital.' },
    { icon:<DropletIcon size={20}/>, t:'Water Saved at Scale',      d:'One tonne of paper requires 10,000–20,000 litres of process water. Digital alternatives require effectively none.' },
    { icon:<Globe size={20}/>,       t:'Biodiversity Protected',    d:'Every ream of paper avoided keeps ~1.2 m² of forest intact — insects, fungi, birds, and ancient soil microbiome included.' },
    { icon:<ShieldCheck size={20}/>, t:'Permanence of the Digital', d:'A digital archive survives indefinitely. Paper degrades, burns, floods, and requires reprinting. Choose the format that persists.' },
    { icon:<Monitor size={20}/>,     t:'Honest Lifecycle Comparison',d:'Devices have a footprint — but lifecycle analyses show heavy digital users still out-perform equivalent paper consumption by 3–8×.' },
    { icon:<FileX size={20}/>,       t:'No Bleach, No Dioxins',     d:'Paper bleaching releases dioxin compounds into waterways. Digital production generates zero chemical effluent from the process itself.' },
  ];

  return (
    <Sec id="digital" style={{ background:'linear-gradient(180deg, #0d1a10 0%, var(--charcoal) 100%)' }}>
      <VeinBg opacity={0.06}/>
      <div className="max-w-5xl mx-auto">
        <Reveal><Tag n="06" label="The Digital Shift"/><H2>When Less Paper Means<br/><em style={{color:'var(--emerald-light)'}}>More Life</em></H2>
          <Lead>The shift to digital isn't about perfection — it's about asymmetric impact. Every document you don't print is a decision that compounds across billions of humans and decades of time.</Lead>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5">
          {benefits.map((b,i)=>(
            <Reveal key={i} delay={i*0.07}>
              <motion.div whileHover={{ scale:1.02, borderColor:'rgba(16,185,129,0.35)' }}
                transition={{ type:'spring', stiffness:220, damping:22 }}
                className="rounded-xl border p-7 h-full"
                style={{ background:'rgba(6,78,59,0.07)', borderColor:'rgba(16,185,129,0.1)' }}>
                <div className="mb-4" style={{ color:'var(--emerald-light)' }}>{b.icon}</div>
                <h3 className="sans font-medium mb-3" style={{ color:'var(--bone)' }}>{b.t}</h3>
                <p className="sans text-sm" style={{ color:'var(--bone-dim)', lineHeight:1.75, fontWeight:300 }}>{b.d}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </Sec>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   07 · PLEDGE
═══════════════════════════════════════════════════════════════════════════ */
function Pledge() {
  const [pledged, set] = useState(false);
  const [count,   cnt] = useState(24817);
  return (
    <Sec id="pledge" style={{ background:'var(--charcoal)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <motion.div animate={{ scale:[1,1.05,1], opacity:[0.4,0.7,0.4] }} transition={{ duration:4, repeat:Infinity }}>
            <TreePine size={48} color="var(--emerald-light)" style={{ margin:'0 auto 24px' }}/>
          </motion.div>
          <Tag n="07" label="The Digital Pledge"/>
          <div style={{ marginTop:16 }}>
            <H2>Choose the Forest<br/><em style={{color:'var(--emerald-light)'}}>Over the Page.</em></H2>
          </div>
          <p className="sans max-w-lg mx-auto mb-12" style={{ color:'var(--bone-dim)', lineHeight:1.8, fontWeight:300 }}>
            Commit to printing less, questioning paper defaults, and sharing this argument with someone who still thinks "renewable" means "harmless."
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <AnimatePresence mode="wait">
            {!pledged ? (
              <motion.button key="btn" data-hover onClick={()=>{set(true);cnt(c=>c+1);}}
                whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                transition={{ type:'spring', stiffness:300, damping:20 }}
                className="relative inline-flex items-center gap-3 px-10 py-5 rounded-full sans font-medium"
                style={{ background:'linear-gradient(135deg, var(--emerald), var(--emerald-mid))',
                  color:'var(--bone)', letterSpacing:'0.08em', cursor:'none',
                  border:'1px solid rgba(16,185,129,0.4)',
                  boxShadow:'0 0 40px rgba(16,185,129,0.25), 0 0 80px rgba(16,185,129,0.1)' }}>
                <motion.span className="absolute inset-0 rounded-full"
                  animate={{ boxShadow:['0 0 20px rgba(16,185,129,0.2)','0 0 60px rgba(16,185,129,0.5)','0 0 20px rgba(16,185,129,0.2)'] }}
                  transition={{ duration:2.5, repeat:Infinity }}/>
                <Leaf size={18}/>I Take the Digital Pledge<ChevronRight size={16}/>
              </motion.button>
            ) : (
              <motion.div key="done" initial={{ opacity:0, scale:0.8, y:20 }} animate={{ opacity:1, scale:1, y:0 }}
                transition={{ type:'spring', stiffness:80, damping:15 }} className="inline-flex flex-col items-center gap-4">
                <div className="flex items-center gap-3 px-8 py-4 rounded-full border"
                  style={{ background:'rgba(16,185,129,0.1)', borderColor:'rgba(16,185,129,0.4)' }}>
                  <CheckCircle size={20} color="var(--emerald-light)"/>
                  <span className="sans font-medium" style={{ color:'var(--emerald-light)' }}>Pledge Taken. Thank you.</span>
                </div>
                <p className="serif italic text-xl" style={{ color:'rgba(245,245,247,0.4)' }}>You join {count.toLocaleString()} digital advocates.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-20 pt-16 border-t" style={{ borderColor:'rgba(16,185,129,0.1)' }}>
            <div className="grid grid-cols-3 gap-8">
              {[
                { n:'10.9M', l:'Hectares of forest lost annually — FAO 2025' },
                { n:'422+',  l:'ppm CO₂ today vs ~280 pre-industrial — NOAA 2024' },
                { n:'0',     l:'Years it takes to stop printing' },
              ].map((s,i)=>(
                <div key={i} className="text-center">
                  <div className="serif mb-2" style={{ fontSize:'clamp(1.8rem,4vw,3rem)', color:'var(--bone)', fontWeight:300 }}>{s.n}</div>
                  <p className="sans text-xs" style={{ color:'rgba(245,245,247,0.28)', lineHeight:1.6 }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Sec>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="px-8 py-10 border-t" style={{ borderColor:'rgba(16,185,129,0.1)', background:'#0a0a0a' }}>
      <div className="max-w-6xl mx-auto" style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center', gap:'1rem' }}>

        {/* Left — brand */}
        <div className="flex items-center gap-2">
          <Leaf size={14} color="rgba(16,185,129,0.35)"/>
          <span className="sans text-xs tracking-[0.2em] uppercase" style={{ color:'rgba(245,245,247,0.18)' }}>Digital Roots</span>
        </div>

        {/* Centre — sources */}
        <p className="sans text-xs text-center" style={{ color:'rgba(245,245,247,0.13)', fontStyle:'italic', maxWidth:520 }}>
          Sources: NOAA GML 2024 · IEA 2025 · FAO FRA 2025 · U.S. EPA · USDA · NRDC · WMO 2024 · Nature (Stephenson 2014) · IJW 2022
        </p>

        {/* Right — always pinned right */}
        <div className="flex flex-col items-end gap-1.5">
          <span className="sans text-xs" style={{ color:'rgba(245,245,247,0.18)' }}>© 2025 · Less Paper, More Planet</span>
          <span className="sans text-xs flex items-center gap-1.5" style={{ color:'rgba(245,245,247,0.3)' }}>
            Made with
            <motion.span
              animate={{ scale:[1, 1.45, 1] }}
              transition={{ duration:1.4, repeat:Infinity, ease:'easeInOut' }}
              style={{ display:'inline-block', color:'#10b981' }}>
              ♥
            </motion.span>
            by Pranav
          </span>
        </div>

      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div style={{ background:'var(--charcoal)' }}>
      <GS/><CustomCursor/><Nav/>
      <Hero/>
      <Divider/><Science/>
      <Divider/><Carbon/>
      <Divider/><Forests/>
      <Divider/><Opinion/>
      <Divider/><Forum/>
      <Divider/><DigitalShift/>
      <Divider/><Pledge/>
      <Footer/>
    </div>
  );
}
