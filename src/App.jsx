import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  Cpu, BookOpen, Briefcase, Code, Mail, Github, Linkedin,
  Terminal, Database, LineChart, Zap, Layers, MapPin,
  Sparkles, Send, Loader2, Wand2, ChevronRight
} from 'lucide-react';

/**
 * CINEMATIC PORTFOLIO: JATEEN JAYPRAKASH MOURYA
 * Refined Cinematic Logic: Scroll is time, Scroll is growth.
 * AI Integration: Gemini API Project Strategist
 */

// --- GEMINI API CONFIGURATION ---
const apiKey = "";
const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

const callGemini = async (prompt) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: {
      parts: [{
        text: "You are an AI Strategy Consultant for Jateen Mourya's portfolio. Jateen is an AI/ML & Data Analytics student skilled in Python, Java, TensorFlow, Scikit-learn, SQL, AWS, and Power BI. When a user provides a project idea, generate a concise technical roadmap (3-4 steps) explaining how Jateen could build it using his specific tech stack. Keep it cinematic, professional, and brief."
      }]
    }
  };

  let delay = 1000;
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.ok ? await response.json() : null;
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a strategy at this moment.";
    } catch (error) {
      if (i === 4) return "Connection error. Please try again later.";
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
};

// --- ANIMATION CONSTANTS ---
const CINEMA_EASE = [0.16, 1, 0.3, 1];

// --- REUSABLE COMPONENTS ---
const SectionTitle = ({ children, subtitle }) => (
  <div className="mb-24 text-center">
    <motion.h2
      initial={{ opacity: 0, y: 30, letterSpacing: "0.4em" }}
      whileInView={{ opacity: 1, y: 0, letterSpacing: "0.15em" }}
      viewport={{ once: false }}
      transition={{ duration: 1.5, ease: CINEMA_EASE }}
      className="text-4xl md:text-7xl font-extralight uppercase text-white mb-6"
    >
      {children}
    </motion.h2>
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: "100px" }}
      transition={{ delay: 0.5, duration: 1 }}
      className="h-[1px] bg-blue-500 mx-auto mb-6"
    />
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.6 }}
      transition={{ delay: 0.8, duration: 1 }}
      className="text-gray-400 text-lg md:text-xl italic font-light tracking-wide"
    >
      {subtitle}
    </motion.p>
  </div>
);

// --- ACT 1: ORIGIN ---
const ActOrigin = () => {
  const text = "I was curious about how data thinks_".split(" ");

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden bg-black px-6">
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, #111 0%, #000 100%)",
            "radial-gradient(circle at 50% 50%, #1a1a2e 0%, #000 100%)",
            "radial-gradient(circle at 50% 50%, #111 0%, #000 100%)"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 -z-10"
      />

      <div className="text-center max-w-5xl">
        <div className="flex flex-wrap justify-center gap-x-4 mb-12">
          {text.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: i * 0.15, duration: 1.4, ease: CINEMA_EASE }}
              className={`text-2xl md:text-4xl font-light ${word.endsWith('_') ? 'text-blue-500' : 'text-gray-400'}`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 2, ease: CINEMA_EASE }}
        >
          <motion.h1
            initial={{ letterSpacing: "0.8em" }}
            animate={{ letterSpacing: "0.15em" }}
            transition={{ delay: 1.8, duration: 2.5, ease: CINEMA_EASE }}
            className="text-5xl md:text-8xl font-black text-white uppercase leading-none"
          >
            JATEEN MOURYA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 3.2, duration: 2 }}
            className="mt-6 text-sm md:text-xl tracking-[0.5em] text-blue-400 uppercase font-medium"
          >
            AI / ML & Data Analytics
          </motion.p>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-blue-500 to-transparent" />
      </motion.div>
    </section>
  );
};

// --- ACT 2: EDUCATION ---
const ActEducation = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const height = useSpring(useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]), {
    stiffness: 100,
    damping: 30
  });

  const education = [
    {
      year: "2020 – 2023",
      degree: "Diploma in Computer Engineering",
      school: "Kala Vidya Mandir Institute Of Technology",
      result: "Percentage: 78.5%",
      icon: <Layers className="w-5 h-5" />
    },
    {
      year: "2023 – 2026",
      degree: "B.Tech in Information Technology",
      school: "Shree L.R. Tiwari College of Engineering",
      result: "Current CGPA: 6.9",
      icon: <Cpu className="w-5 h-5" />
    }
  ];

  return (
    <section ref={ref} className="py-40 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        <SectionTitle subtitle="Strong foundations create stronger systems.">
          The Growth
        </SectionTitle>

        <div className="relative pl-16">
          <div className="absolute left-[31px] top-0 bottom-0 w-[1px] bg-white/10" />
          <motion.div
            style={{ height }}
            className="absolute left-[31px] top-0 w-[1px] bg-blue-500 shadow-[0_0_15px_#3b82f6]"
          />

          {education.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.4, duration: 1.2, ease: CINEMA_EASE }}
              className="mb-32 last:mb-0 relative"
            >
              <div className="absolute -left-[48px] top-0 w-8 h-8 rounded-full bg-black border border-blue-500 flex items-center justify-center z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              </div>
              <span className="text-blue-500 font-mono text-sm tracking-widest">{e.year}</span>
              <h3 className="text-3xl md:text-4xl text-white mt-3 font-bold tracking-tight">{e.degree}</h3>
              <p className="text-gray-400 text-xl mt-2 font-light">{e.school}</p>
              <div className="inline-block px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase mt-4">
                {e.result}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- ACT 3: SKILLS ---
const ActSkills = () => {
  const skills = [
    { name: "Python", icon: <Terminal /> },
    { name: "Java", icon: <Code /> },
    { name: "NumPy", icon: <Cpu /> },
    { name: "Scikit-learn", icon: <Layers /> },
    { name: "TensorFlow", icon: <Zap /> },
    { name: "Advanced SQL", icon: <Database /> },
    { name: "Power BI", icon: <LineChart /> },
    { name: "Tableau", icon: <LineChart /> },
    { name: "Excel", icon: <BookOpen /> },
    { name: "MySQL", icon: <Database /> },
    { name: "PostgreSQL", icon: <Database /> },
    { name: "Git", icon: <Github /> },
    { name: "AWS", icon: <Zap /> },
    { name: "Jenkins", icon: <Layers /> },
    { name: "Jira", icon: <Briefcase /> }
  ];

  return (
    <section className="py-40 px-6 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="Skills weren’t learned overnight — they evolved.">
          Evolution
        </SectionTitle>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {skills.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10, borderColor: "rgba(59, 130, 246, 0.5)" }}
              transition={{ delay: i * 0.05, duration: 0.8 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center transition-colors group"
            >
              <div className="mb-6 text-gray-500 group-hover:text-blue-500 transition-colors transform group-hover:scale-110 duration-500">
                {React.cloneElement(s.icon, { size: 32 })}
              </div>
              <h4 className="text-lg text-gray-300 font-light group-hover:text-white transition-colors">{s.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- ACT 4: INTERNSHIPS ---
const ActInternships = () => {
  const data = [
    {
      role: "Artificial Intelligence Intern",
      company: "Topperworld",
      date: "Feb 2024 – Mar 2024",
      desc: "Deep-dived into data preprocessing, model training, and performance evaluation. Specialized in NLP techniques and predictive modeling architectures."
    },
    {
      role: "Machine Learning Intern",
      company: "Edunet Foundation",
      date: "Jan 2025 – Feb 2025",
      desc: "Focused on end-to-end ML lifecycles. Executed thorough Exploratory Data Analysis (EDA), cleaning pipelines, and rigorous model evaluation using Python ecosystems."
    }
  ];

  return (
    <section className="py-40 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <SectionTitle subtitle="Theory met reality.">
          Field Work
        </SectionTitle>

        <div className="grid gap-12">
          {data.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="group p-10 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Briefcase size={80} />
              </div>
              
              <div className="relative z-10">
                <span className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-4 block">
                  {d.date}
                </span>
                <h3 className="text-white text-3xl md:text-4xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {d.role}
                </h3>
                <p className="text-xl text-gray-400 font-light mb-6">@ {d.company}</p>
                <p className="text-gray-500 text-lg leading-relaxed max-w-3xl border-l border-blue-500/30 pl-6">
                  {d.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- ACT 5: PROJECTS & AI STRATEGIST ---
const ActProjects = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const projects = [
    {
      title: "Stock Price Prediction",
      desc: "Architected a high-precision forecasting system using LSTM and GRU layers to analyze and predict complex financial time-series data.",
      tools: ["Python", "TensorFlow", "Pandas", "Scikit-learn"],
    },
    {
      title: "Movie Recommender",
      desc: "Engineered a content-based recommendation engine utilizing sentiment analysis on TMDB datasets for hyper-personalized user experiences.",
      tools: ["Flask", "BeautifulSoup", "AJAX", "TMDB API"],
    },
    {
      title: "Blockchain Security",
      desc: "Developed a decentralized framework for question paper security using Ethereum smart contracts, IPFS storage, and Polygon L2.",
      tools: ["Web3.js", "Polygon", "IPFS", "Solidity"],
    }
  ];

  const handleBrainstorm = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult("");
    const response = await callGemini(prompt);
    setResult(response);
    setLoading(false);
  };

  return (
    <section className="py-40 px-6 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <SectionTitle subtitle="Idea → System → Impact">
          Creations
        </SectionTitle>

        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-12 rounded-[3rem] bg-black border border-white/10 flex flex-col h-full hover:border-white/20 transition-all duration-500"
            >
              <div className="flex flex-wrap gap-2 mb-8">
                {p.tools.map((t, ti) => (
                  <span key={ti} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-gray-400">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-3xl text-white mb-6 font-bold">{p.title}</h3>
              <p className="text-gray-500 leading-relaxed font-light mb-10 flex-grow">
                {p.desc}
              </p>
              <motion.button 
                whileHover={{ gap: "1.5rem" }}
                className="flex items-center gap-3 text-blue-500 text-sm font-bold uppercase tracking-widest self-start group"
              >
                View Project <div className="w-10 h-[1px] bg-blue-500 transition-all group-hover:w-20" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* AI STRATEGIST INTEGRATION */}
       
      </div>
    </section>
  );
};

// --- ACT 6: CONTACT ---
const ActContact = () => (
  <section className="h-screen flex flex-col items-center justify-center bg-black relative px-6">
    <SectionTitle subtitle="Available for innovative opportunities.">
      The Next Move
    </SectionTitle>

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-12"
    >
      <a
        href="mailto:jateen1231@gmail.com"
        className="relative px-16 py-8 rounded-full bg-white text-black text-2xl font-black uppercase tracking-tighter hover:scale-105 transition-transform group overflow-hidden"
      >
        <span className="relative z-10">Connect Now</span>
        <motion.div 
          className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
        />
      </a>

      <div className="flex gap-12 text-gray-500">
        <motion.a whileHover={{ y: -5, color: "#fff" }} href="https://github.com/JATINMOUR"><Github size={32} /></motion.a>
        <motion.a whileHover={{ y: -5, color: "#fff" }} href="https://www.linkedin.com/in/jateen-maurya-89a492239/"><Linkedin size={32} /></motion.a>
        <motion.a whileHover={{ y: -5, color: "#fff" }} href="mailto:jateen1231@gmail.com"><Mail size={32} /></motion.a>
      </div>
    </motion.div>

    <div className="absolute bottom-12 flex flex-col items-center gap-4 text-gray-800">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em]">
        <MapPin size={12} /> Mumbai, India
      </div>
      <p className="text-[10px] tracking-[0.8em] font-light">
        JATEEN MOURYA © 2025
      </p>
    </div>
  </section>
);

// --- MAIN APP ---
export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-black text-white selection:bg-blue-500 selection:text-white font-sans overflow-x-hidden antialiased">
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
        ::selection { background: #3b82f6; color: #fff; }
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
      `}</style>

      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-blue-400 origin-left z-[100] shadow-[0_0_15px_rgba(37,99,235,0.8)]"
      />
      
      <ActOrigin />
      <ActEducation />
      <ActSkills />
      <ActInternships />
      <ActProjects />
      <ActContact />
    </div>
  );
}
