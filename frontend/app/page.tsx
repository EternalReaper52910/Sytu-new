import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text">
      <header className="flex items-center justify-between p-6 border-b border-surface">
        <div className="text-2xl font-bold text-primary">SYTU</div>
        <nav className="flex gap-4 items-center">
          <Link href="/login" className="text-gray-300 hover:text-white transition">Login</Link>
          <Link href="/register" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition font-medium">Sign Up</Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-text tracking-tight max-w-4xl leading-tight">
          Premium Professional <span className="text-accent">Networking</span> & Portfolio Platform
        </h1>
        <p className="mt-6 text-xl text-gray-400 max-w-2xl">
          Join the exclusive network of students, developers, designers, freelancers, and entrepreneurs.
        </p>
        <div className="mt-10 flex gap-4 justify-center">
          <Link href="/register" className="px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition shadow-lg shadow-primary/20">
            Get Started
          </Link>
          <Link href="/discover" className="px-8 py-4 bg-surface text-text font-medium rounded-lg hover:bg-gray-800 transition border border-gray-800">
            Explore Network
          </Link>
        </div>
      </main>

      <section className="py-20 px-8 bg-surface/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface p-8 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-bold text-primary mb-4">Live Networking</h3>
            <p className="text-gray-400">Connect with professionals in real-time with our socket-powered messaging system.</p>
          </div>
          <div className="bg-surface p-8 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-bold text-accent mb-4">Portfolio Showcase</h3>
            <p className="text-gray-400">Build a stunning, minimal portfolio that highlights your best work and projects.</p>
          </div>
          <div className="bg-surface p-8 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-bold text-text mb-4">Discover Opportunities</h3>
            <p className="text-gray-400">Find freelance gigs, co-founders, and career opportunities tailored for you.</p>
          </div>
        </div>
      </section>

      <footer className="p-8 text-center text-gray-500 border-t border-surface">
        &copy; {new Date().getFullYear()} SYTU. All rights reserved. Built for professionals.
      </footer>
    </div>
  );
}
