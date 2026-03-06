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
   NAV active section detection + smooth scroll
═══════════════════════════════════════════════════════════════════════════ */
function Nav() {
  const { scrollY } = useScroll();
  const bg   = useTransform(scrollY, [0,80], ['rgba(18,18,18,0)','rgba(18,18,18,0.85)']);
  const blur = useTransform(scrollY, [0,80], ['blur(0px)','blur(24px)']);
  const [active, setActive] = useState('');
  const links = ['Science','Carbon','Forests','Opinion','Digital','Pledge'];

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
          Paper being renewable is a well-intentioned myth. Real climate protection means choosing not to cut and letting ancient carbon vaults keep breathing.
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
   01 · SCIENCE  Where & How Photosynthesis Works
═══════════════════════════════════════════════════════════════════════════ */
function Science() {

  return (
    <Sec id="science" style={{ background:'var(--charcoal)' }}>
      <VeinBg opacity={0.05}/>
      <div className="max-w-5xl mx-auto">
        <Reveal><Tag n="01" label="The Science"/><H2>Where and How Photosynthesis Works</H2>
          <Lead>Photosynthesis happens inside <strong style={{color:'var(--emerald-light)'}}>chloroplasts</strong>, which are tiny structures found in plant leaf cells. It runs in two stages: the light-dependent reactions and the Calvin Cycle. Together they produce the oxygen we breathe and form the foundation of almost every food chain on Earth.</Lead>
        </Reveal>

        {/* Equation flashlight */}
        <Reveal delay={0.1}>
          <Flashlight hiddenText="Logging one hectare of old-growth forest instantly releases 150 to 200 tonnes of CO2, undoing this reaction for a century.">
            <div className="rounded-2xl border p-8 md:p-12 text-center mb-14"
              style={{ background:'linear-gradient(135deg, rgba(6,78,59,0.25), rgba(18,18,18,0.95))', borderColor:'rgba(16,185,129,0.15)' }}>
              <p className="sans text-xs tracking-[0.35em] uppercase mb-8" style={{ color:'rgba(16,185,129,0.5)' }}>Net Equation Photosynthesis</p>
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
              <p className="sans text-xs mt-4" style={{ color:'rgba(245,245,247,0.18)', fontStyle:'italic' }}>Hover to reveal what logging destroys</p>
            </div>
          </Flashlight>
        </Reveal>

        {/* Where it happens - 2 boxes only */}
        <Reveal delay={0.1}>
          <p className="sans text-xs tracking-[0.3em] uppercase mb-5" style={{ color:'var(--emerald-light)' }}>Where Photosynthesis Occurs</p>
          <div className="grid md:grid-cols-2 gap-5 mb-12">
            {[
              { icon:<Leaf size={20}/>, l:'The Leaf', d:'Leaves are the main place where photosynthesis happens. Their wide, flat shape helps them catch as much sunlight as possible. Tiny pores called stomata let carbon dioxide in and release oxygen out.' },
              { icon:<FlaskConical size={20}/>, l:'Chloroplasts', d:'Chloroplasts are the organelles inside leaf cells where photosynthesis actually takes place. They contain a green pigment called chlorophyll, which captures light energy and powers the whole process.' },
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
                <span className="sans font-medium text-sm" style={{ color:'#fde68a' }}>Stage 1 - Light-Dependent Reactions</span>
              </div>
              <p className="sans text-xs mb-5" style={{ color:'rgba(253,230,138,0.5)', lineHeight:1.6 }}>Takes place inside the chloroplast. Requires direct sunlight.</p>
              <div className="flex gap-3 items-start">
                <Badge n={1}/>
                <div>
                  <p className="sans text-sm font-medium mb-1" style={{ color:'var(--bone)' }}>Light Absorption</p>
                  <p className="sans text-xs" style={{ color:'var(--bone-dim)', lineHeight:1.7, fontWeight:300 }}>Chlorophyll in the chloroplast absorbs sunlight. That light energy is used to split water molecules apart, releasing oxygen as a byproduct into the air. The energy captured here powers the next stage.</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="rounded-2xl border p-7 h-full"
              style={{ background:'linear-gradient(145deg, rgba(16,185,129,0.06), rgba(18,18,18,0.9))', borderColor:'rgba(16,185,129,0.15)' }}>
              <div className="flex items-center gap-3 mb-4">
                <Atom size={20} color="var(--emerald-light)"/>
                <span className="sans font-medium text-sm" style={{ color:'var(--emerald-light)' }}>Stage 2 - The Calvin Cycle</span>
              </div>
              <p className="sans text-xs mb-5" style={{ color:'rgba(16,185,129,0.45)', lineHeight:1.6 }}>Takes place inside the chloroplast. Does not need direct light.</p>
              <p className="sans text-sm" style={{ color:'var(--bone-dim)', lineHeight:1.8, fontWeight:300 }}>
                The plant takes the energy made in Stage 1 and uses it to pull carbon dioxide out of the air. Through a series of chemical reactions called the Calvin Cycle, those carbon atoms get rearranged into glucose, a sugar the plant uses for energy and growth. Think of it as the plant building its own food out of air, water, and sunlight.
              </p>
            </div>
          </Reveal>
        </div>

      </div>
    </Sec>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   02 · CARBON Two CO₂ Processes + Why Balance Matters
═══════════════════════════════════════════════════════════════════════════ */
function Carbon() {
  const combSteps = [
    { n:1, t:'Fuel Meets Oxygen', d:'A carbon-based fuel (coal, oil, gas, wood/paper) is brought into contact with atmospheric O₂.' },
    { n:2, t:'Heat Starts the Reaction', d:'A source of heat, like a flame or spark, starts the process. Once it begins, the reaction keeps going on its own and releases even more heat.' },
    { n:3, t:'Carbon Bonds with Oxygen', d:'The carbon in the fuel combines with oxygen from the air to form carbon dioxide (CO2). This is the gas that gets released into the atmosphere.' },
    { n:4, t:'CO2 Released into the Air', d:'Carbon dioxide and heat are released as the final products. Burning fossil fuels releases carbon that was stored underground for millions of years, all at once.' },
  ];
  const respSteps = [
    { n:1, t:'Breaking Down Sugar', d:'Inside the cell, glucose (the sugar made during photosynthesis) gets broken down into smaller molecules. This releases a little bit of energy for the cell to use.' },
    { n:2, t:'Into the Mitochondria', d:'Those smaller molecules move into the mitochondria, the powerhouse of the cell. As they are broken down further, carbon dioxide is released as a waste product.' },
    { n:3, t:'More CO2 Released', d:'The mitochondria continue breaking down the molecules through a cycle of reactions, releasing more carbon dioxide with each turn.' },
    { n:4, t:'Energy Released, CO2 Exhaled', d:'The cell gets the energy it needs to function, and the carbon dioxide produced is released. In animals this happens with every breath we exhale. Net result: C6H12O6 + 6O2 turns into 6CO2 + 6H2O + energy.' },
  ];
  const reasons = [
    {
      icon:<Zap size={22}/>, color:'#ef4444',
      title:'Reason 1 Runaway Greenhouse Effect & Global Warming',
      cause:'Excess CO₂ and methane trap outgoing infrared radiation from Earth\'s surface amplifying the natural greenhouse effect beyond sustainable limits.',
      effect:'As the planet warms, ice caps melt and sea levels rise. Storms, droughts, and heat waves become more frequent and more extreme. Some of these changes, once triggered, cannot be reversed.',
    },
    {
      icon:<Wind size={22}/>, color:'#60a5fa',
      title:'Reason 2 Disrupted O₂/CO₂ Cycle & Ocean Acidification',
      cause:'When too much CO2 is in the air, the oceans absorb some of it. This causes a chemical reaction that makes the water more acidic, a process called ocean acidification.',
      effect:'In acidic water, animals like shellfish and coral cannot grow their shells or skeletons and die off. Since so many other animals depend on them for food, entire ocean ecosystems begin to collapse.',
    },
  ];
  const ref = useRef(null);
  const inV = useInView(ref, { once:true, margin:'-60px' });

  return (
    <Sec id="carbon" style={{ background:'linear-gradient(180deg, var(--charcoal) 0%, #0d1a10 100%)' }}>
      <VeinBg opacity={0.04}/>
      <div className="max-w-5xl mx-auto">
        <Reveal><Tag n="02" label="Carbon Imbalance"/><H2>Two Processes Flooding Our Atmosphere</H2>
          <Lead>While photosynthesis removes CO₂, two powerful natural and human-amplified processes continuously add it back. Their full mechanism step by step explains why "plant more trees" is not a fast enough answer.</Lead>
        </Reveal>

        {/* Combustion */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl border mb-7 overflow-hidden" style={{ borderColor:'rgba(239,68,68,0.2)', background:'rgba(18,18,18,0.85)' }}>
            <div className="p-6 border-b flex flex-wrap items-center gap-4" style={{ background:'rgba(239,68,68,0.07)', borderColor:'rgba(239,68,68,0.12)' }}>
              <div className="p-2 rounded-lg" style={{ background:'rgba(239,68,68,0.15)', color:'#ef4444' }}><Flame size={20}/></div>
              <div className="flex-1">
                <p className="sans font-medium" style={{ color:'#fca5a5' }}>Process 1 Combustion</p>

              </div>

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
                <p className="sans font-medium" style={{ color:'#bfdbfe' }}>Process 2 Cellular Respiration</p>
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
              <p className="sans font-medium mb-2" style={{ color:'#fca5a5' }}>Carbon dioxide in the atmosphere is rising every year and speeding up</p>
              <p className="sans text-sm" style={{ color:'rgba(245,245,247,0.45)', fontWeight:300, lineHeight:1.75 }}>
                The amount of CO2 in the air is now more than 50% higher than it was before humans started burning fossil fuels. Every year we wait to act, more damage is done. A tree planted today will take 10 to 20 years before it starts making a real difference.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Sec>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   03 · FORESTS Short & Long-Term Consequences of Clearing
═══════════════════════════════════════════════════════════════════════════ */
function Forests() {
  const shortPts = [
    'When a section of forest is burned or cut down, the carbon that took decades to store gets released into the atmosphere almost immediately, making climate change worse.',
    'When the forest canopy is removed, animals and plants that lived there lose their home immediately. Many species go extinct because of deforestation every single day.',
    'When trees are gone, the soil underneath is exposed to heat and rain. This causes the soil to break down and release even more stored carbon into the air within just a few months.',
    'Rivers and streams that depended on the forest for water can dry up, leaving nearby communities without a reliable water source.',
  ];
  const longPts = [
    'The Amazon rainforest generates much of its own rainfall through the trees releasing water vapor. If too many trees are removed, the rain stops coming and the entire region could turn into dry land permanently.',
    'Underground networks of roots and organisms that took hundreds of years to form are destroyed by logging equipment in a single day and cannot be simply replanted.',
    'Without tree roots to hold the soil in place, it washes away over time. After enough erosion, the land becomes bare and nothing can grow there anymore.',
    'With fewer forests left to absorb CO2, the atmosphere stays warmer for longer. Future generations will be stuck dealing with a hotter climate even if we cut emissions later.',
  ];

  return (
    <Sec id="forests" style={{ background:'var(--charcoal)' }}>
      <VeinBg opacity={0.04}/>
      <div className="max-w-5xl mx-auto">
        <Reveal><Tag n="03" label="Clearing Forests"/><H2>Two Consequences of Deforestation</H2>
          <Lead>Cutting down forests does not just affect the local area. It has consequences that are felt immediately and others that last for generations. Both matter when we talk about whether paper can really be considered renewable.</Lead>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Reveal delay={0.1}>
            <div className="rounded-2xl border overflow-hidden h-full" style={{ borderColor:'rgba(251,191,36,0.22)', background:'rgba(18,18,18,0.85)' }}>
              <div className="p-6 border-b" style={{ background:'rgba(251,191,36,0.07)', borderColor:'rgba(251,191,36,0.12)' }}>
                <div className="flex items-center gap-3">
                  <span className="sans text-xs font-bold px-3 py-1 rounded-full" style={{ background:'rgba(251,191,36,0.2)', color:'#fbbf24', letterSpacing:'0.1em' }}>SHORT-TERM</span>
                  <span className="sans font-medium text-sm" style={{ color:'#fde68a' }}>Immediate Release of Carbon and Loss of Wildlife</span>
                </div>
              </div>
              <div className="p-7 space-y-4">
                <p className="sans text-sm" style={{ color:'var(--bone-dim)', lineHeight:1.8, fontWeight:300 }}>
                  When a forest is cut down or burned, all of the carbon that the trees spent decades storing gets released back into the air very quickly.
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
                  <span className="sans font-medium text-sm" style={{ color:'#fca5a5' }}>Permanent Damage to Land and Climate</span>
                </div>
              </div>
              <div className="p-7 space-y-4">
                <p className="sans text-sm" style={{ color:'var(--bone-dim)', lineHeight:1.8, fontWeight:300 }}>
                  An old-growth forest is not simply trees. It is a system that took centuries to build. Once cleared, no plantation can replace it within a human lifetime. Some of the damage it causes cannot be undone.
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
            <p className="serif text-2xl italic mb-3" style={{ color:'var(--bone)' }}>"Industrial logging disrupts not just trees it destroys the carbon memory of the soil."</p>
            <span className="sans text-xs tracking-widest uppercase" style={{ color:'rgba(16,185,129,0.5)' }}> Nature Climate Change, 2023</span>
          </div>
        </Reveal>
      </div>
    </Sec>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   04 · OPINION Against Renewable Paper: 2 Scientific Reasons
═══════════════════════════════════════════════════════════════════════════ */
function Opinion() {
  const reasons = [
    {
      n:'01', color:'#ef4444', icon:<TreePine size={22}/>,
      title:'Carbon Debt Takes 40 to 80 Years to Repay',
      evidence:'Scientists have found that mature trees actually absorb more carbon the older they get. When a forest is logged, the new trees planted in its place can take 40 to 80 years just to absorb back the carbon that was released. During that entire time, there is more CO2 in the atmosphere than if the forest had never been cut down.',
      conclusion:'During the 40 to 80 year carbon repayment period, the atmosphere is measurably worse off than if the forest had simply been left standing. No certification scheme changes this physics.',
    },
    {
      n:'02', color:'#a78bfa', icon:<Layers size={22}/>,
      title:'The Damage to Soil Cannot Be Undone in Our Lifetime',
      evidence:'More than half of all the carbon stored in a forest is actually underground in the soil, not in the trees. When forests are logged, the heavy machinery that clears the land destroys the soil and can wipe out more than half of that stored carbon. The underground systems that took hundreds of years to develop are destroyed and cannot simply be replanted.',
      conclusion:'Certification programs track how many trees are replanted, but they do not measure what happens to the soil. Until that changes, the safest choice is simply to use less paper.',
    },
  ];

  return (
    <Sec id="opinion" style={{ background:'linear-gradient(180deg, #0d1a10 0%, var(--charcoal) 100%)' }}>
      <VeinBg opacity={0.05}/>
      <div className="max-w-5xl mx-auto">
        <Reveal><Tag n="04" label="My Opinion"/><H2>Against Renewable Paper:<br/><em style={{color:'var(--emerald-light)'}}>Two Scientific Reasons</em></H2>
          <Lead>I am firmly against the recommendation that "renewable paper" constitutes meaningful climate action. The science is unambiguous. Here are my two strongest evidence-based arguments and the conclusion they point to.</Lead>
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
                Certified paper is better than uncertified paper, but a certification label does not cancel out the damage done. Every document you choose not to print is a small win for the environment. Every forest left standing cannot be replaced. Going digital is the most direct way to make a real difference.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Sec>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   06 · DIGITAL SHIFT
═══════════════════════════════════════════════════════════════════════════ */
function DigitalShift() {
  const benefits = [
    { icon:<Wifi size={20}/>,        t:'Zero Transport Emissions',  d:'Sending a document digitally uses almost no energy. Printing and shipping that same document uses significantly more resources, fuel, and creates much more pollution.' },
    { icon:<DropletIcon size={20}/>, t:'Water Saved at Scale',      d:'One tonne of paper requires 10,000 to 20,000 litres of process water. Digital alternatives require effectively none.' },
    { icon:<Globe size={20}/>,       t:'Biodiversity Protected',    d:'Every ream of paper avoided keeps ~1.2 m² of forest intact insects, fungi, birds, and ancient soil microbiome included.' },
    { icon:<ShieldCheck size={20}/>, t:'Permanence of the Digital', d:'A digital archive survives indefinitely. Paper degrades, burns, floods, and requires reprinting. Choose the format that persists.' },
    { icon:<Monitor size={20}/>,     t:'Honest Lifecycle Comparison',d:'Yes, devices use electricity and have a cost to produce. But even accounting for that, going digital still causes significantly less environmental damage than the equivalent paper use.' },
    { icon:<FileX size={20}/>,       t:'No Bleach, No Dioxins',     d:'Making paper involves harsh chemicals that end up in rivers and lakes. Using digital documents avoids this chemical pollution entirely.' },
  ];

  return (
    <Sec id="digital" style={{ background:'linear-gradient(180deg, #0d1a10 0%, var(--charcoal) 100%)' }}>
      <VeinBg opacity={0.06}/>
      <div className="max-w-5xl mx-auto">
        <Reveal><Tag n="05" label="The Digital Shift"/><H2>When Less Paper Means<br/><em style={{color:'var(--emerald-light)'}}>More Life</em></H2>
          <Lead>The shift to digital isn't about perfection it's about asymmetric impact. Every document you don't print is a decision that compounds across billions of humans and decades of time.</Lead>
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
          <Tag n="06" label="The Digital Pledge"/>
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
                { n:'10.9M', l:'Hectares of forest lost every single year' },
                { n:'422+',  l:'ppm CO₂ in the air today, up from 280 before industrialization' },
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

        {/* Left brand */}
        <div className="flex items-center gap-2">
          <Leaf size={14} color="rgba(16,185,129,0.35)"/>
          <span className="sans text-xs tracking-[0.2em] uppercase" style={{ color:'rgba(245,245,247,0.18)' }}>Digital Roots</span>
        </div>

        {/* Centre sources */}
        <p className="sans text-xs text-center" style={{ color:'rgba(245,245,247,0.13)', fontStyle:'italic', maxWidth:520 }}>
          A student project on the environmental impact of paper vs. digital
        </p>

        {/* Right always pinned right */}
        <div className="flex flex-col items-end gap-1.5">
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
      <Divider/><DigitalShift/>
      <Divider/><Pledge/>
      <Footer/>
    </div>
  );
}
