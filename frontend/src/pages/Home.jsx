import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, Zap, Shield, Search, Clock, 
  Terminal, Code2, Bot, Layers, Sparkles, 
  Cpu, CheckCircle2, X
} from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import { useRef } from 'react';
import useAuth from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';
import Footer from '../components/layout/Footer';

const FEATURES = [
  {
    icon: Search,
    title: 'AI Bug Detection',
    description: 'Instantly identifies syntax errors, logical flaws, and edge cases in your code with high precision.'
  },
  {
    icon: Zap,
    title: 'Root Cause Analysis',
    description: 'Stop treating symptoms. DebugMind explains exactly why the bug occurs before fixing it.'
  },
  {
    icon: Code2,
    title: 'Fixed Code Generation',
    description: 'Generates drop-in replacement code that perfectly resolves the issue while maintaining your style.'
  },
  {
    icon: Cpu,
    title: 'Performance Optimization',
    description: 'Suggests algorithmic improvements and highlights bottlenecks to make your code run faster.'
  },
  {
    icon: Shield,
    title: 'Security Analysis',
    description: 'Automatically flags vulnerabilities and suggests secure coding practices.'
  },
  {
    icon: Layers,
    title: 'Best Practices',
    description: 'Ensures your code adheres to industry standards and language-specific conventions.'
  },
  {
    icon: Bot,
    title: 'AI Chat Assistant',
    description: 'Have a conversation with your codebase. Ask questions and get intelligent answers.'
  },
  {
    icon: Clock,
    title: 'Code History',
    description: 'Easily search through your past debugging sessions and learn from previous mistakes.'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }
  })
};

const Home = () => {
  const { isAuthenticated } = useAuth();
  const primaryCtaTarget = isAuthenticated ? ROUTES.DASHBOARD : ROUTES.REGISTER;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="bg-black text-white selection:bg-indigo-500/30 font-sans" ref={containerRef}>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 left-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDelay: '4s' }} />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div initial="hidden" animate="visible" custom={0.1} variants={fadeUp} className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <Sparkles size={14} className="text-indigo-400" />
            <span className="text-xs font-medium text-zinc-300">Introducing DebugMind AI 2.0</span>
          </motion.div>
          
          <motion.h1 initial="hidden" animate="visible" custom={0.2} variants={fadeUp} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-tight">
            Find Bugs. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-300% animate-gradient">Fix Faster.</span> <br className="hidden md:block" />
            Code Smarter.
          </motion.h1>
          
          <motion.p initial="hidden" animate="visible" custom={0.3} variants={fadeUp} className="mt-8 max-w-2xl text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
            AI-powered bug detection, code explanation, root cause analysis, code optimization, performance suggestions, security insights, and intelligent debugging.
          </motion.p>
          
          <motion.div initial="hidden" animate="visible" custom={0.4} variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link to={primaryCtaTarget}>
              <button className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                {isAuthenticated ? 'Go to Workspace' : 'Start Analyzing Free'}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <a href="#features">
              <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10">
                View Features
              </button>
            </a>
          </motion.div>
        </div>

        {/* Floating Code Cards Decoration */}
        <motion.div style={{ y, opacity }} className="absolute bottom-0 left-0 right-0 h-[40vh] pointer-events-none" style={{ perspective: '1000px' }}>
           <div className="absolute left-[5%] md:left-[15%] bottom-[20%] w-64 md:w-72 rounded-xl border border-white/10 bg-black/60 p-4 backdrop-blur-xl shadow-2xl shadow-indigo-500/10" style={{ transform: 'rotate(-15deg) rotateX(20deg)' }}>
              <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <div className="font-mono text-[10px] md:text-xs text-zinc-400 leading-relaxed">
                <span className="text-purple-400">const</span> <span className="text-blue-400">analyzeBug</span> = <span className="text-yellow-300">async</span> (code) =&gt; {'{\n'}
                &nbsp;&nbsp;<span className="text-purple-400">const</span> rootCause = <span className="text-yellow-300">await</span> ai.detect(code);{'\n'}
                &nbsp;&nbsp;<span className="text-red-400 line-through">return fix;</span>{'\n'}
                &nbsp;&nbsp;<span className="text-green-400">return rootCause.generateFix();</span>{'\n'}
                {'}'}
              </div>
           </div>

           <div className="absolute right-[5%] md:right-[15%] bottom-[30%] w-64 md:w-72 rounded-xl border border-white/10 bg-black/60 p-4 backdrop-blur-xl shadow-2xl shadow-purple-500/10 hidden sm:block" style={{ transform: 'rotate(10deg) rotateX(15deg)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-indigo-400" />
                <span className="text-xs font-medium text-white">Analysis Complete</span>
              </div>
              <div className="text-xs text-zinc-400 bg-white/5 p-3 rounded-lg border border-white/5 leading-relaxed">
                "The issue stems from a race condition in the useEffect hook. I've restructured the state updates to ensure synchronization."
              </div>
           </div>
        </motion.div>
      </section>

      {/* Workspace Preview */}
      <section className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-20 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="rounded-2xl border border-white/10 bg-black/40 p-2 md:p-3 shadow-[0_0_50px_rgba(99,102,241,0.1)] backdrop-blur-sm"
        >
          <div className="rounded-xl border border-white/10 bg-[#0D0D12] overflow-hidden shadow-2xl">
            <div className="flex h-12 items-center justify-between border-b border-white/5 px-4 bg-black/80">
               <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
                <Terminal size={12} /> workspace.js
              </div>
              <div className="w-16" /> {/* Spacer */}
            </div>
            <div className="flex flex-col md:flex-row h-[500px] md:h-[600px]">
              {/* Left Code Side */}
              <div className="flex-1 border-r border-white/5 pt-4 overflow-hidden hidden md:block bg-[#0A0A0F]">
                <pre className="font-mono text-sm leading-loose">
                  <code className="text-zinc-400">
                    <div className="px-6 flex group"><span className="text-zinc-600 w-8 select-none">1</span><span className="text-purple-400">function</span> <span className="text-blue-400">processData</span>(data) {'{'}</div>
                    <div className="px-6 flex group"><span className="text-zinc-600 w-8 select-none">2</span>&nbsp;&nbsp;<span className="text-zinc-500">// Transform the incoming array</span></div>
                    <div className="px-6 flex group bg-red-500/10 w-full"><span className="text-red-500/50 w-8 select-none">3</span>&nbsp;&nbsp;<span className="text-red-400 line-through decoration-red-500/50">return data.map(item =&gt; item.value * 2);</span></div>
                    <div className="px-6 flex group bg-green-500/10 w-full"><span className="text-green-500/50 w-8 select-none">4</span>&nbsp;&nbsp;<span className="text-green-400">return data?.map(item =&gt; item?.value * 2) || [];</span></div>
                    <div className="px-6 flex group"><span className="text-zinc-600 w-8 select-none">5</span>{'}'}</div>
                  </code>
                </pre>
              </div>
              {/* Right Chat Side */}
              <div className="w-full md:w-[450px] flex flex-col bg-[#0D0D12]">
                <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 scrollbar-thin scrollbar-thumb-white/10">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                      <Sparkles size={16} className="text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white mb-1.5 flex items-center gap-2">
                        DebugMind AI
                        <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-mono">ASSISTANT</span>
                      </div>
                      <div className="text-sm text-zinc-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 rounded-tl-none">
                        I found a potential <code className="text-red-400 bg-red-400/10 px-1 rounded">TypeError</code>. If <code className="text-zinc-300 bg-white/10 px-1 rounded">data</code> is undefined, calling <code className="text-zinc-300 bg-white/10 px-1 rounded">.map()</code> will throw an error. I've added optional chaining and a fallback array to prevent this crash.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-white/5 bg-black/20">
                  <div className="rounded-xl border border-white/10 bg-black/50 p-2 pl-4 flex items-center justify-between text-sm shadow-inner transition-colors hover:bg-black hover:border-white/20">
                    <span className="text-zinc-500 font-medium">Ask a follow-up...</span>
                    <button className="w-8 h-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white transition-colors shadow-lg shadow-indigo-600/20">
                       <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="border-t border-white/10 bg-black py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-900/10 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:divide-x divide-white/10">
            {[
              { value: "50K+", label: "Analyses" },
              { value: "99%", label: "Accuracy" },
              { value: "<5s", label: "Response Time" },
              { value: "24/7", label: "AI Assistant" }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center px-4 py-4"
              >
                <div className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">{stat.value}</div>
                <div className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a14] to-black" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-20">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              How it works
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">From error to production-ready fix in four simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Terminal, title: "1. Paste Code", desc: "Drop your snippet and the stack trace into the editor." },
              { icon: Cpu, title: "2. AI Analysis", desc: "Our engine dissects the logic and pinpoints the root cause." },
              { icon: Code2, title: "3. Review Suggestions", desc: "Evaluate the explained fix and performance tips." },
              { icon: CheckCircle2, title: "4. Apply & Ship", desc: "Copy the perfectly formatted code back to your project." }
            ].map((step, i) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative group"
              >
                <div className="rounded-2xl bg-white/5 border border-white/10 p-8 h-full backdrop-blur-sm relative z-10 hover:bg-white/10 transition-all duration-300 hover:border-white/20 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <step.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {i < 3 && (
                   <div className="hidden md:block absolute top-1/2 right-[-24px] transform -translate-y-1/2 z-0 text-white/10">
                     <ArrowRight size={48} strokeWidth={1} />
                   </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-black border-y border-white/10 relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Everything you need to debug
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">Built from the ground up for modern developers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 transition-all hover:bg-[#141414] hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-default"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 transition-colors group-hover:bg-indigo-500 group-hover:text-white border border-indigo-500/20 group-hover:border-transparent">
                  <feature.icon size={24} />
                </div>
                <h3 className="mb-3 text-lg font-bold text-white tracking-tight">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why DebugMind AI vs Traditional */}
      <section className="py-32 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              A paradigm shift in debugging
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent p-8 lg:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
              <h3 className="text-2xl font-bold text-red-400 mb-8 flex items-center gap-3">
                <X size={28} /> Traditional Debugging
              </h3>
              <ul className="space-y-6 text-zinc-400 text-lg">
                <li className="flex items-start gap-4"><div className="mt-2 w-2 h-2 rounded-full bg-red-500 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.5)]"/> Hours spent reading StackOverflow threads</li>
                <li className="flex items-start gap-4"><div className="mt-2 w-2 h-2 rounded-full bg-red-500 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.5)]"/> Guessing and checking solutions that don't fit</li>
                <li className="flex items-start gap-4"><div className="mt-2 w-2 h-2 rounded-full bg-red-500 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.5)]"/> Ignoring performance and security implications</li>
                <li className="flex items-start gap-4"><div className="mt-2 w-2 h-2 rounded-full bg-red-500 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.5)]"/> Fixing symptoms without understanding root causes</li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 p-8 lg:p-12 relative overflow-hidden shadow-2xl shadow-indigo-500/10"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" />
              <h3 className="text-2xl font-bold text-indigo-400 mb-8 flex items-center gap-3">
                <CheckCircle2 size={28} /> DebugMind AI
              </h3>
              <ul className="space-y-6 text-zinc-200 text-lg font-medium">
                <li className="flex items-start gap-4"><div className="mt-2 w-2 h-2 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.8)]"/> Instant analysis with context-aware solutions</li>
                <li className="flex items-start gap-4"><div className="mt-2 w-2 h-2 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.8)]"/> Drop-in code generation tailored to your codebase</li>
                <li className="flex items-start gap-4"><div className="mt-2 w-2 h-2 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.8)]"/> Built-in performance and security optimizations</li>
                <li className="flex items-start gap-4"><div className="mt-2 w-2 h-2 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.8)]"/> Deep explanations to help you learn and grow</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-[#050505] border-t border-white/5 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="text-center mb-20">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Loved by engineers
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah Jenkins", role: "Senior Frontend Engineer", text: "DebugMind AI has completely transformed my workflow. What used to take hours of digging through trace logs now takes seconds. It's like having a staff engineer pairing with you." },
              { name: "David Chen", role: "Fullstack Developer", text: "The root cause explanations are incredible. It doesn't just give you code to copy-paste; it actually teaches you why the bug happened. My team's code quality has noticeably improved." },
              { name: "Elena Rodriguez", role: "Tech Lead", text: "We integrated this into our daily routine. The ability to paste a snippet and immediately see security and performance suggestions alongside the fix is a game changer for our sprints." }
            ].map((testimonial, i) => (
              <motion.div 
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 relative hover:bg-[#111] transition-colors"
              >
                <div className="flex text-amber-400 mb-6 gap-1">
                  {[1,2,3,4,5].map(star => <span key={star}>★</span>)}
                </div>
                <p className="text-zinc-300 mb-8 leading-relaxed text-lg">"{testimonial.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-zinc-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-40 overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 to-black pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Ready to debug smarter?
          </h2>
          <p className="text-xl md:text-2xl text-zinc-400 mb-12 font-light">
            Join thousands of developers who are shipping faster with DebugMind AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={primaryCtaTarget}>
              <button className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-10 py-5 text-base font-bold text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_50px_rgba(255,255,255,0.6)]">
                {isAuthenticated ? 'Go to Dashboard' : 'Start Analyzing Now'}
              </button>
            </Link>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <button className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-black/50 backdrop-blur-md px-10 py-5 text-base font-medium text-white transition-all hover:bg-white/10 hover:border-white/30">
                <FiGithub size={20} /> GitHub Repository
              </button>
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
