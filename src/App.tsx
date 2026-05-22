import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { 
  Globe, 
  Crown, 
  Target, 
  Sword, 
  Lock, 
  Scale, 
  Eye, 
  Flame, 
  ChevronDown, 
  Calendar,
  Layers,
  Skull,
  Award,
  X
} from 'lucide-react';

import victoria_phoenix_img from './assets/images/victoria_phoenix_1779467501745.png';

// Image assets with absolute fallbacks referring to original assets
const x5_img = "https://vite-deploy--vsolotuche.replit.app/assets/Captura_de_pantalla_2026-05-21_211540_1779412983406-CF9zK68e.png";
const S5_img = "https://vite-deploy--vsolotuche.replit.app/assets/image_1779413142882-CQMJuicP.png";
const T5_img = "https://vite-deploy--vsolotuche.replit.app/assets/image_1779413663124-Dg5ta--f.png";
const w5_img = victoria_phoenix_img;
const E5_img = "https://vite-deploy--vsolotuche.replit.app/assets/ASFFSASAAFSASFAFSASF_1779414975572-EXETozYt.jpg";
const A5_img = "https://vite-deploy--vsolotuche.replit.app/assets/asffafaaffs_1779416494920-Dm8_g-lw.png";
const C5_img = "https://vite-deploy--vsolotuche.replit.app/assets/asfsafafasfsasafsasf_1779416532953-DILFY3rK.webp";

// 1. M5 - Canvas golden particle floats
function M5() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 120;

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.5 + 0.1),
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(198, 161, 91, ${p.alpha})`; // gold ember
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-50" />;
}

// 2. BhLogo - Primary Hellfire Club Logo/Icon
interface LogoProps {
  className?: string;
}

function BhLogo({ className = "" }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" />
      <path d="M50 15C50 15 35 30 35 50C35 65 45 75 50 85C55 75 65 65 65 50C65 30 50 15 50 15Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
      <path d="M50 25C50 25 40 40 40 55C40 65 45 70 50 75C55 70 60 65 60 55C60 40 50 25 50 25Z" fill="currentColor" />
      <path d="M30 45C30 45 35 60 42 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M70 45C70 45 65 60 58 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 3. R5 - Chess icons rendered using SVG geometry paths verbatim
interface RepresentationProps {
  type: string;
  className?: string;
  style?: React.CSSProperties;
}

function R5({ type, className = "", style }: RepresentationProps) {
  const pieces: Record<string, React.ReactNode> = {
    king: (
      <path d="M45 10H55M50 5V15M30 85H70M40 85V70C40 50 45 40 50 30C55 40 60 50 60 70V85M35 30L45 40M65 30L55 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    ),
    queen: (
      <path d="M30 85H70M40 85V70C40 55 45 45 50 30C55 45 60 55 60 70V85M20 20L40 40M80 20L60 40M50 10V30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    ),
    bishop: (
      <path d="M30 85H70M40 85V70C40 55 45 50 50 40C55 50 60 55 60 70V85M50 10C40 20 40 30 50 40C60 30 60 20 50 10Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    ),
    knight: (
      <path d="M30 85H70M40 85V70H60V50L45 40C35 45 30 60 40 70M60 50V30C60 20 50 15 45 20L40 30L50 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    ),
    rook: (
      <path d="M30 85H70M40 85V40H60V85M35 40H65V20H35V40ZM35 20V10H45V20M55 20V10H65V20M45 20H55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    ),
    pawn: (
      <path d="M35 85H65M45 85V60C45 50 55 50 55 60V85M50 20C42 20 42 30 50 35C58 30 58 20 50 20Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    )
  };

  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      {pieces[type] || pieces.pawn}
    </svg>
  );
}

// 4. Xe - Scroll trigger entry wrapper
interface EntranceProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function Xe({ children, delay = 0, className = "" }: EntranceProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 5. Hero section (D5)
interface HeroProps {
  onExploreHierarchy: () => void;
  onOpenEvents: () => void;
}

function D5({ onExploreHierarchy, onOpenEvents }: HeroProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-destructive/25 via-background to-background" />
        <div className="absolute inset-0 bg-black/50 vignette" />
        <M5 />
        
        {/* Animated noise pattern */}
        <motion.div 
          className="absolute inset-0 opacity-30 mix-blend-screen bg-cover"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.015%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"
          }}
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 bg-destructive/40 blur-3xl rounded-full" />
          <BhLogo className="w-24 h-24 md:w-28 md:h-28 text-primary drop-shadow-[0_0_15px_rgba(198,161,91,0.5)]" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-primary tracking-[0.25em] mb-4 text-glow"
        >
          HELLFIRE CLUB
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base md:text-xl font-sans italic mb-12 max-w-3xl leading-relaxed"
          style={{ color: "#E8E1D4" }}
        >
          "El poder no se conquista frente al mundo… se controla desde las sombras."
        </motion.p>

        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
        >
          <button
            onClick={onOpenEvents}
            className="px-8 py-3.5 font-serif uppercase tracking-widest text-xs transition-all duration-300 hover:opacity-95 hover:shadow-[0_0_24px_rgba(198,161,91,0.6)] relative overflow-hidden group border border-primary text-black rounded-sm cursor-pointer"
            style={{ backgroundColor: "#C6A15B" }}
          >
            <span className="relative z-10 font-bold flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Calendario de eventos
            </span>
            <div className="absolute inset-0 h-full w-0 bg-white/20 group-hover:w-full transition-all duration-500 ease-out" />
          </button>

          <button
            onClick={onExploreHierarchy}
            className="px-8 py-3.5 font-serif uppercase tracking-widest text-xs transition-all duration-300 hover:bg-[#C6A15B]/15 border border-primary text-primary bg-transparent rounded-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4" />
            Explorar la Jerarquía
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={onExploreHierarchy}
      >
        <span className="text-[10px] font-serif text-primary/70 tracking-widest uppercase mb-1">Descender</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-primary/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// 6. About Section - "¿Qué es el Hellfire Club?" (O5)
function O5() {
  const cards = [
    { title: "Influencia", icon: Globe, desc: "La mano invisible que guía las decisiones geopolíticas globales." },
    { title: "Poder", icon: Crown, desc: "Control absoluto sobre los mercados financieros y recursos." },
    { title: "Estrategia", icon: Target, desc: "Jugamos partidas que duran generaciones, no años." },
    { title: "Dominación", icon: Sword, desc: "El mundo es un tablero. Nosotros movemos las piezas." }
  ];

  return (
    <section id="about" className="py-32 px-6 md:px-12 lg:px-24 bg-background relative border-t border-primary/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <Xe>
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6 tracking-wide">
              ¿Qué es el Hellfire Club?
            </h2>
          </Xe>
          <Xe delay={0.2}>
            <div className="w-24 h-px bg-primary/50 mx-auto mb-8" />
            <p className="text-base md:text-lg font-sans text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-6">
              El Club Fuego Infernal fue fundado en el siglo XVIII, como una organización para congregar a la élite de la sociedad internacional: políticos, empresarios, multimillonarios, etc., como una forma de proporcionar a sus miembros placeres que a menudo desafiaban las normas morales de la época, y de permitirles consolidar su influencia en asuntos económicos y políticos. El grupo se fundó originalmente en Inglaterra con el nombre de{" "}
              <span style={{ color: "#C6A15B" }} className="font-semibold font-serif">
                Orden de los Frailes de San Francisco de Wycombe
              </span>
              . Para la década de 1770, el Club Hellfire operaba ya en las Trece Colonias. Un puñado de los miembros más poderosos —encabezados por Sir Patrick Clemens y su amante Diana Knight— emigraron a las colonias americanas e iniciaron una rama en la ciudad de Nueva York.
            </p>
            <p className="text-base md:text-lg font-sans text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              El Club Fuego Infernal cuenta con miembros famosos e influyentes de la sociedad. Su afiliación solo es posible vía hereditaria por algún familiar o por invitación personal, y rara vez puede ser ganada sin importar cuán rica o influyente sea la persona. Además de Nueva York, hoy en día el club cuenta con filiales en{" "}
              <span style={{ color: "#C6A15B" }} className="font-semibold font-serif">
                San Francisco, París, Hong Kong y Londres
              </span>
              , todas ellas supervisadas por el Círculo Interno, que a su vez es dirigido por el Lord Imperial.{" "}
              <span style={{ color: "#E8E1D4", fontStyle: "italic" }}>Eve Frost</span>
              , quien ascendió como la espuma bajo el título de{" "}
              <span style={{ color: "#C6A15B" }} className="font-semibold font-serif">
                Reina Blanca
              </span>
              , tomó el mando del Círculo Interno, tras la fachada de alguien que lucha por la protección mutante, pero con un deseo más que oscuro: poder, acompañada del mismísimo infierno para obtenerlo.
            </p>
          </Xe>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <Xe key={idx} delay={0.3 + idx * 0.1} className="h-full">
              <div className="glass-panel p-8 h-full flex flex-col items-center text-center group cursor-default relative overflow-hidden rounded-xs">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <card.icon className="w-12 h-12 text-primary mb-6 group-hover:text-destructive group-hover:scale-110 transition-all duration-500" strokeWidth={1.2} />
                <h3 className="text-lg font-serif text-foreground mb-4 uppercase tracking-widest group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-muted-foreground font-sans text-sm relative z-10 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </Xe>
          ))}
        </div>
      </div>
    </section>
  );
}

// 7. Classified Document / Objectives Section (N5)
function N5() {
  const objectives = [
    "I. Tomar control total de la economía mundial, adquiriendo las empresas de primera necesidad como propiedad.",
    "II. Adquirir influencia en las decisiones políticas y sociales del mundo, siendo claves en la manipulación de las potencias mundiales.",
    "III. Atraer el poder del mismísimo cosmos, usando a un recipiente como carnada para someter a quien intente estar en contra del control del Círculo Interno.",
    "IV. Funcionar como un club reconocido y exitoso de cara al mundo, en donde cualquiera desee ser parte y, por supuesto, con la influencia suficiente para ello.",
    "V. Tomar control del infierno y el limbo, para juntarlas a la dimensión terrenal como parte de un sistema de gobierno extra-dimensional.",
    "VI. Eliminar a las organizaciones gubernamentales que trabajan y actúan en contra de las voluntades del Círculo Interno."
  ];

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-secondary relative overflow-hidden border-t border-b border-primary/5">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-radial-glow opacity-30 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <Xe>
          <div className="flex items-center gap-4 mb-8">
            <Lock className="w-5 h-5 text-destructive" />
            <span className="text-destructive font-mono text-xs tracking-widest uppercase font-semibold">
              Documento Clasificado // Nivel 5
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-16 tracking-wide">
            Objetivos <span className="text-primary text-glow">del Club</span>
          </h2>
        </Xe>

        <div className="space-y-6">
          {objectives.map((obj, idx) => (
            <Xe key={idx} delay={0.2 + idx * 0.1}>
              <div className="pl-6 border-l border-destructive/60 py-3 relative group hover:bg-background/40 transition-colors duration-400 p-4 -ml-4 rounded-r-xs">
                {/* Glowing red marker */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-destructive rounded-full -translate-x-[4px] group-hover:scale-130 transition-transform shadow-[0_0_10px_rgba(110,11,20,0.8)]" />
                <p className="text-base md:text-lg font-serif text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                  {obj}
                </p>
                <div className="w-full h-[1px] bg-primary/10 mt-4 group-hover:bg-primary/30 transition-colors" />
              </div>
            </Xe>
          ))}
        </div>
      </div>
    </section>
  );
}

// 8. V0 - Member Profile Card Component
interface Member {
  rank: string;
  type: string;
  name: string;
  image: string;
  description: string;
  aspirations: string;
}

interface V0Props {
  item: Member;
  branch: "blanca" | "negra";
}

function V0({ item, branch }: V0Props) {
  const isWhite = branch === "blanca";
  const borderColor = isWhite ? "border-[#E8E1D4]/20" : "border-[#6E0B14]/30";
  const hoverBorderColor = isWhite ? "hover:border-[#E8E1D4]/60" : "hover:border-[#6E0B14]";
  const shadowColor = isWhite ? "hover:shadow-[0_0_28px_rgba(232,225,212,0.1)]" : "hover:shadow-[0_0_28px_rgba(110,11,20,0.35)]";
  const bgStyle = isWhite ? "bg-[#E8E1D4]/5" : "bg-black/75";
  const nameColor = "#C6A15B";
  const themeColor = isWhite ? "#E8E1D4" : "#6E0B14";

  return (
    <div className={`${bgStyle} ${borderColor} ${hoverBorderColor} ${shadowColor} border transition-all duration-500 group overflow-hidden rounded-xs flex flex-col h-full`}>
      <div 
        className="relative w-full aspect-[4/3] overflow-hidden flex items-center justify-center border-b border-white/5"
        style={{ background: isWhite ? "rgba(232,225,212,0.03)" : "rgba(10,10,10,0.9)" }}
      >
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            style={{ imageRendering: "auto", filter: "contrast(1.04) saturate(1.02) sepia(0.08)" }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-8 opacity-40 group-hover:opacity-60 transition-opacity">
            <R5 type={item.type} className="w-16 h-16" style={{ color: themeColor }} />
            <span className="text-[10px] font-serif uppercase tracking-widest" style={{ color: themeColor }}>Sin imagen</span>
          </div>
        )}
        
        {/* Rank tag in upper-left corner */}
        <div 
          className="absolute top-3 left-3 px-3 py-1 text-[10px] font-serif uppercase tracking-widest font-semibold"
          style={isWhite ? {
            background: "rgba(0, 0, 0, 0.85)",
            border: "1px solid rgba(232, 225, 212, 0.3)",
            color: "#FFFFFF",
            backdropFilter: "blur(4px)"
          } : {
            background: "#6E0B14",
            border: "1px solid #9B1B2A",
            color: "#FFFFFF",
            backdropFilter: "blur(4px)"
          }}
        >
          {item.rank}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-lg font-serif mb-3 tracking-wide" style={{ color: nameColor }}>
          {item.name}
        </h4>
        <p 
          className="text-xs md:text-sm font-sans leading-relaxed mb-6"
          style={{ color: isWhite ? "rgba(232,225,212,0.72)" : "rgba(232,225,212,0.6)" }}
        >
          {item.description}
        </p>

        <div 
          className="pt-4 mt-auto"
          style={{ borderTop: `1px solid ${isWhite ? "rgba(232,225,212,0.12)" : "rgba(110,11,20,0.3)"}` }}
        >
          <p className="text-[10px] font-serif uppercase tracking-widest mb-2 font-bold" style={{ color: "rgba(198,161,91,0.85)" }}>
            Aspiraciones
          </p>
          <p 
            className="text-xs font-sans italic leading-relaxed"
            style={{ color: isWhite ? "rgba(232,225,212,0.6)" : "rgba(232,225,212,0.5)" }}
          >
            {item.aspirations}
          </p>
        </div>
      </div>
    </div>
  );
}

// 9. Inner Circle Section (InnerCircle)
function InnerCircle() {
  const whiteBranch: Member[] = [
    {
      rank: "Rey Blanco",
      type: "king",
      name: "Nikolai Rapustin",
      image: E5_img,
      description: "Tras manifestar su mutación, Nikolai pasó años atrapado en el Limbo, donde sobrevivió, dominó la magia negra y se coronó como su Hechicero Supremo. Al regresar a la Tierra, adoptó la fachada de un elegante aristócrata y diplomático para reclamar el título de Rey Blanco, convirtiendo al Limbo en la base de operaciones secreta de su imperio.",
      aspirations: "Establecer una red de influencia y contrabando global inaudita dentro del Club. Desarrollar tramas de alta política interna utilizando su inmunidad mental y la Espada del Alma como factor de intimidación absoluto. Poderes: Teletransportación mediante Discos · Espada Alma · Armadura de Eldrich · Hechicería del Limbo."
    },
    {
      rank: "Reina Blanca",
      type: "queen",
      name: "Eve Frost",
      image: S5_img,
      description: "Nacida en una cruel y poderosa familia mutante, Eve Frost perfeccionó una telepatía aterradora con la que destruyó políticamente a sus rivales. A los veintiséis años se unió a los X-Men durante una crisis global, pero mantuvo en secreto su liderazgo en el Club, operando siempre por puro pragmatismo.",
      aspirations: "Controlar el mundo en las sombras desde el Hellfire Club, mientras a plena vista es una heroína para el mundo. Poderes: Telepatía · Piel de Diamante."
    },
    {
      rank: "Alfil Blanco",
      type: "bishop",
      name: "Victoria",
      image: w5_img,
      description: "Activo especial bajo supervisión directa de S.T.A.R.S., considerada el expediente más peligroso de la organización por estar destinada a ser el origen de una catáfe mundial. Formó parte de los X-Men, donde protegió a la humanidad y soportó grandes pérdidas. Posee poderes de telepatía, manipulación psíquica y una fuerte presencia mental.",
      aspirations: "Ganarse el legado del título de DARK PHOENIX y aspirar a tener el linaje Grey. Eliminar a los X-Men y al sueño asociado a ellos. Reestructurar el sistema de resurrección de Krakoa a través de la propia energía de la Fuerza del Fénix. Poderes: Telepatía · Telequinesis · Avatar del Fénix."
    },
    {
      rank: "Torre Blanca",
      type: "rook",
      name: "???",
      image: "",
      description: "Identidad clasificada. Los archivos de este miembro permanecen sellados bajo el más alto nivel de confidencialidad del Círculo Interno.",
      aspirations: "???"
    }
  ];

  const blackBranch: Member[] = [
    {
      rank: "Rey Negro",
      type: "king",
      name: "Damian Hellstorm",
      image: x5_img,
      description: 'Abrazando su herencia como el "Hijo de Satán", Damian ha decidido usar su intelecto, carisma y misticismo para infiltrarse en las esferas de poder más exclusivas del mundo. Su ingreso al Hellfire Club es un movimiento estratégico para manipular influencias, recursos financieros y secretos arcanos. Su objetivo final es debilitar las barreras místicas de la Tierra para abrir las puertas del plano infernal.',
      aspirations: "Forjar alianzas dentro del Club para financiar y encubrir investigaciones sobre portales interdimensionales. Usar a los miembros como peones inconscientes en un tablero apocalíptico cuyo fin es abrir las puertas para la invasión de las huestes demoníacas. Poderes: Herencia Mística: Alma Oscura · Tridente de Netharium."
    },
    {
      rank: "Reina Negra",
      type: "queen",
      name: "Lilith Hellstorm",
      image: T5_img,
      description: "Tras sufrir abuso en su juventud, el trauma despertó su herencia latente como súcubo y su dominio de la magia demoníaca, jurando usar el deseo de los hombres para destruirlos. Fundó un club VIP de ultra lujo para devorar almas y recopilar secretos. Ahora manipula el control político de América y se ha sumado al proyecto MAGA como candidata al Senado.",
      aspirations: "Alcanzar la Secretaría de Salud y Derechos Humanos para moldear las leyes a su antojo y blindarse con un escudo legal impenetrable. Convertirse en la titiritera absoluta de los Estados Unidos combinando ambos mundos. Poderes: Herencia Mística: Súcubo Demoníaco · Tridente de Netharium | Guadaña de las Penas."
    },
    {
      rank: "Alfil Negro",
      type: "bishop",
      name: "Cassandra Gallio",
      image: C5_img,
      description: "Con el miedo al envejecimiento presente en cada uno de sus pensamientos, Cassandra se considera una devota del tiempo, dispuesta a prolongar su propio reloj de vida a cualquier costo. Dinero, extorsión, persuasión o asesinato: el método carece de importancia mientras le permita obtener aquello que más anhela — tiempo y vitalidad para perdurar eternamente. Su infalible intuición la condujo hasta el Hellfire, donde las influencias y redes de poder facilitan lo que cree necesitar: más vida y más tiempo.",
      aspirations: "Crear una isla aislada de la sociedad humana para establecer un culto dedicado a ella misma, con rituales místicos de su raza external. Alzarse como gobernadora rodeada de fieles bajo su dirección absoluta. Poderes: Vampirismo Psíquico · Raza External."
    },
    {
      rank: "Torre Negra",
      type: "rook",
      name: "Jane Warren",
      image: A5_img,
      description: "En la sonrisa hay dos afilados caninos; la mirada es filuda como la de un lobo salvaje; cabellera, una melena; manos, garras. Desencaja con el fuego infernal, sienta en las filas de atrás y es desatada cuando la diplomacia no rinde. De sus labios se interrogó poco, pero la administración descubrió un antepasado clínico: mesas de laboratorio, un búnker en Yukon, aparente trauma óseo. El reporte no tenía un nombre, sino un número.",
      aspirations: "Destruir Arma X y obtener libertad y protección plena. Apoya la carrera política de la Reina Negra a cambio de inmunidad total ante los estragos de su pasado. Poderes: Lupus Sapiens: Experimento Genético · Esqueleto de Adamantium · Lupus Sapiens: Feral Alpha."
    }
  ];

  return (
    <section id="hierarchy" className="py-32 bg-background relative chess-grid border-b border-primary/10">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
          <Xe>
            <h2 className="text-4xl md:text-6xl font-serif text-primary mb-6 tracking-wider">
              El Círculo Interno
            </h2>
            <p className="text-lg md:text-xl font-sans text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              El Círculo Interno representa la máxima autoridad del Hellfire Club. Su estructura jerárquica se inspira en las piezas del ajedrez, donde cada rango simboliza poder, influencia y autoridad.
            </p>
          </Xe>
        </div>

        {/* white branch */}
        <div className="mb-24">
          <Xe>
            <div className="flex items-center gap-6 mb-12">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#E8E1D4]/30" />
              <h3 className="text-xl md:text-3xl font-serif text-[#E8E1D4] uppercase tracking-[0.25em] px-4 font-medium">
                Rama Blanca
              </h3>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#E8E1D4]/30" />
            </div>
          </Xe>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whiteBranch.map((item, idx) => (
              <Xe key={idx} delay={0.1 + idx * 0.08}>
                <V0 item={item} branch="blanca" />
              </Xe>
            ))}
          </div>
        </div>

        {/* separator icon */}
        <Xe className="my-16">
          <div className="flex items-center gap-4 py-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <BhLogo className="w-10 h-10 text-primary opacity-40 float-anim" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
        </Xe>

        {/* black branch */}
        <div>
          <Xe>
            <div className="flex items-center gap-6 mb-12">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#6E0B14]/30" />
              <h3 className="text-xl md:text-3xl font-serif text-[#6E0B14] uppercase tracking-[0.25em] px-4 font-medium text-glow">
                Rama Negra
              </h3>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#6E0B14]/30" />
            </div>
          </Xe>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blackBranch.map((item, idx) => (
              <Xe key={idx} delay={0.1 + idx * 0.08}>
                <V0 item={item} branch="negra" />
              </Xe>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// 10. Quotes / Philosophy section (PhilosophyQuotes)
function PhilosophyQuotes() {
  const quotes = [
    "El caos es la escalera del poder.",
    "La influencia vale más que la corona.",
    "Los gobiernos cambian. Nosotros permanecemos.",
    "La élite no nace… se selecciona."
  ];

  return (
    <section className="py-40 bg-[#050505] relative flex flex-col items-center justify-center border-b border-primary/10">
      {quotes.map((quote, idx) => (
        <Xe key={idx} delay={0.15} className="w-full max-w-4xl px-6 mb-32 last:mb-0 relative">
          <div className="absolute inset-0 bg-radial-glow opacity-10 pointer-events-none -z-10 blur-3xl" />
          <div className="text-center">
            <Flame className="w-8 h-8 text-primary mx-auto mb-8 opacity-40 float-anim" />
            <blockquote className="text-2xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight italic px-4">
              "{quote}"
            </blockquote>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-12" />
          </div>
        </Xe>
      ))}
    </section>
  );
}

// 11. Footer (V5)
function V5() {
  return (
    <footer className="bg-black py-24 relative border-t border-primary/25">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-16" />
        <BhLogo className="w-20 h-20 text-primary mx-auto mb-8 opacity-75 float-anim" />
        <h2 className="text-xl md:text-2xl font-serif text-primary tracking-[0.25em] uppercase mb-12">
          Lux, Potentia, Imperium.
        </h2>

        {/* Social vectors using custom lucide circle wraps */}
        <div className="flex justify-center gap-6 mb-16">
          <div className="w-10 h-10 border border-primary/30 rounded-full flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all duration-300 cursor-pointer group hover:scale-105">
            <Eye className="w-4 h-4 text-primary group-hover:text-glow" />
          </div>
          <div className="w-10 h-10 border border-primary/30 rounded-full flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all duration-300 cursor-pointer group hover:scale-105">
            <Scale className="w-4 h-4 text-primary group-hover:text-glow" />
          </div>
          <div className="w-10 h-10 border border-primary/30 rounded-full flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-all duration-300 cursor-pointer group hover:scale-105">
            <Globe className="w-4 h-4 text-primary group-hover:text-glow" />
          </div>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-16 mb-8" />
        <p className="text-[#E8E1D4]/40 font-mono text-[10px] uppercase tracking-widest leading-relaxed max-w-3xl mx-auto">
          Cualquier acceso, recopilación de datos no autorizadas serán castigadas de forma directa por los Reyes del Círculo Interno. · Toda aspiración está basada y confirmada por los usuarios presentes. · Esta página web se considera una página web invicta con todos los derechos reservados © {new Date().getFullYear()} Hellfire Club.
        </p>
      </div>
    </footer>
  );
}

// 12. Modal / Ledger component for "Calendario de Eventos"
interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function EventsModal({ isOpen, onClose }: EventsModalProps) {
  if (!isOpen) return null;

  const events = [
    {
      date: "21 de Junio, 2026",
      title: "Cónclave de la Noche del Solsticio",
      location: "Búnker Secreto del Limbo (Operado por Nikolai Rapustin)",
      desc: "Celebración y consagración de aspirantes rústicos, comunión arcana liderada por el Círculo Interno bajo el umbral interdimensional."
    },
    {
      date: "10 de Julio, 2026",
      title: "Congregación Anual del Círculo Interno",
      location: "Mansión Club Hellfire, Suite Imperial, Nueva York",
      desc: "Alineación de tramas financieras globales, votación de vetos mutuos, y reporte parlamentario de Lilith Hellstorm ante el senado místico."
    },
    {
      date: "04 de Agosto, 2026",
      title: "Asignación de Sucesores: Krakoa Gateway",
      location: "Isla Privada de Cassandra Gallio, Mar Egeo",
      desc: "Reorganización de cuotas de vitalidad y re-sifonado de la Fuerza del Fénix para resucitar eslabones claves caídos."
    },
    {
      date: "31 de Octubre, 2026",
      title: "Cena de Máscaras y Gala del Fuego Infernal",
      location: "Filial Secreta - París, Francia",
      desc: "Nuestros lazos europeos se reúnen en la gala anual para consolidar herencias y reclutar herencias de familias aristócratas."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative bg-secondary/95 border border-primary/30 max-w-2xl w-full p-6 md:p-8 rounded-sm shadow-[0_0_50px_rgba(110,11,20,0.3)] max-h-[85vh] overflow-y-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-primary/75 hover:text-primary transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 border-b border-primary/20 pb-4">
          <Calendar className="w-6 h-6 text-primary" />
          <h3 className="text-xl md:text-2xl font-serif text-primary uppercase tracking-[0.15em]">
            Códice de Eventos Imperiales
          </h3>
        </div>

        <p className="text-xs font-sans text-muted-foreground italic mb-6 leading-relaxed">
          Atención: El acceso a la siguiente agenda es restrictivo. Sólo miembros titulares con sello hereditario certificado o invitación directa del Lord Imperial serán admitidos en las coordenadas especificadas.
        </p>

        <div className="space-y-6">
          {events.map((ev, idx) => (
            <div key={idx} className="border border-primary/10 bg-background/50 p-4 transition-all hover:border-primary/30 rounded-xs">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-xs font-semibold">
                  {ev.date}
                </span>
                <span className="text-[10px] font-serif text-destructive tracking-widest uppercase font-semibold">
                  Reservado Sello V
                </span>
              </div>
              <h4 className="text-base font-serif text-foreground font-medium mb-1 tracking-wide">
                {ev.title}
              </h4>
              <p className="text-xs font-mono text-primary/70 mb-2 font-medium">
                Sede: {ev.location}
              </p>
              <p className="text-xs md:text-sm font-sans text-muted-foreground leading-relaxed">
                {ev.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-primary/20 pt-4 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-primary/40 hover:bg-primary/10 hover:border-primary transition-all text-xs font-serif uppercase tracking-widest text-primary font-bold cursor-pointer"
          >
            Sellar Registro
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Main App export
export default function App() {
  const [isEventsOpen, setIsEventsOpen] = useState(false);

  const handleExploreHierarchy = () => {
    const el = document.getElementById("hierarchy");
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenEvents = () => {
    setIsEventsOpen(true);
  };

  const handleCloseEvents = () => {
    setIsEventsOpen(false);
  };

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-destructive/30 selection:text-foreground overflow-x-hidden antialiased">
      <D5 onExploreHierarchy={handleExploreHierarchy} onOpenEvents={handleOpenEvents} />
      <O5 />
      <N5 />
      <InnerCircle />
      <PhilosophyQuotes />
      <V5 />

      {/* Interactive codex modal */}
      <EventsModal isOpen={isEventsOpen} onClose={handleCloseEvents} />
    </div>
  );
}
