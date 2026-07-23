import { Terminal } from 'lucide-react';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                <Terminal size={18} />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                DebugMind <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AI</span>
              </span>
            </div>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              The AI-powered developer assistant that finds bugs, explains root causes, and generates fixes instantly.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><FiGithub size={20} /></a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><FiTwitter size={20} /></a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><FiLinkedin size={20} /></a>
            </div>
          </div>

          <div className="col-span-1 flex flex-col gap-3 lg:ml-auto">
            <h4 className="font-semibold text-white">Product</h4>
            <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">How it Works</a>
            <Link to={ROUTES.LOGIN} className="text-sm text-zinc-400 hover:text-white transition-colors">Log In</Link>
          </div>

          <div className="col-span-1 flex flex-col gap-3 lg:ml-auto">
            <h4 className="font-semibold text-white">Resources</h4>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Documentation</a>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">API Reference</a>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Blog</a>
          </div>

          <div className="col-span-1 flex flex-col gap-3 lg:ml-auto">
            <h4 className="font-semibold text-white">Legal</h4>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} DebugMind AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span>Built for developers who</span>
            <span className="font-mono text-indigo-400 px-2 py-0.5 rounded-md bg-indigo-400/10 border border-indigo-400/20 font-medium">ship.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
