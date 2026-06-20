import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#B4D2ED]/10 blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#CBBDDD]/10 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full bg-[#A8C3E6]/10 blur-[100px] mix-blend-screen animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 relative z-10 w-full">
        <div className="flex flex-col justify-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              Build Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B4D2ED] via-[#9CCEEE] to-[#CBBDDD]">Digital Presence.</span><br />
              Find People Who Build.
            </h1>
            <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed max-w-lg">
              SYTU helps students, developers, designers, and founders create premium portfolios, discover opportunities, and showcase work in an immersive ecosystem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-white text-[#0f1115] rounded-full font-semibold text-lg hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(180,210,237,0.3)]">
                Start Building
              </button>
              <button className="px-8 py-4 glass-panel rounded-full text-white font-semibold text-lg hover:bg-white/10 transition-colors">
                Explore Projects
              </button>
            </div>
          </motion.div>
        </div>

        <div className="hidden lg:flex relative h-[600px] items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute z-10 top-[10%] left-[10%] w-[320px] h-[200px] glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/20"
          >
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80')] bg-cover bg-center opacity-50"></div>
            <div className="absolute bottom-4 left-4 text-white font-bold">Portfolio Preview</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 4 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute z-20 bottom-[15%] right-[5%] w-[300px] h-[240px] glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/20"
          >
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80')] bg-cover bg-center opacity-60"></div>
            <div className="absolute top-4 right-4 text-white font-bold bg-[#161920]/80 px-3 py-1 rounded-full text-xs">Workspace</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute z-30 bottom-[5%] left-[20%] w-[260px] h-[120px] bg-[#161920] rounded-2xl shadow-2xl border border-white/10 p-4 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>
              <div>
                <div className="text-sm font-bold text-white">Live Collab</div>
                <div className="text-xs text-white/50">Hiring React Dev</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
