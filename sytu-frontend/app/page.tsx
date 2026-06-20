import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text selection:bg-primary selection:text-primaryForeground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="text-xl font-semibold tracking-tight text-primary">SYTU</div>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/login" className="text-muted hover:text-primary transition-colors">Log in</Link>
          <Link href="/register" className="px-5 py-2 bg-primary text-primaryForeground rounded-full hover:bg-primary/90 transition-transform active:scale-95">
            Sign up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
        <div className="inline-flex items-center rounded-full border border-border px-3 py-1 text-sm font-medium text-muted mb-8">
          <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
          SYTU is now in Early Access
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-primary tracking-tighter max-w-4xl leading-[1.1]">
          The professional network for the modern web.
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl font-light tracking-wide">
          Connect with developers, designers, and founders. Build your portfolio, find your next gig, and scale your career without the noise.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/register" className="px-8 py-3 bg-primary text-primaryForeground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors">
            Start building
          </Link>
          <Link href="/discover" className="px-8 py-3 bg-surface text-primary border border-border text-sm font-medium rounded-full hover:bg-accent transition-colors">
            Explore network
          </Link>
        </div>
      </main>

      {/* Features Showcase */}
      <section className="py-24 px-6 border-t border-border bg-surface">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col p-8 rounded-2xl bg-background border border-border">
            <h3 className="text-lg font-semibold text-primary mb-2">Live Networking</h3>
            <p className="text-muted text-sm leading-relaxed">Real-time socket-powered messaging. Cut through the noise and connect instantly with peers and founders.</p>
          </div>
          <div className="flex flex-col p-8 rounded-2xl bg-background border border-border">
            <h3 className="text-lg font-semibold text-primary mb-2">Minimal Portfolios</h3>
            <p className="text-muted text-sm leading-relaxed">Showcase your best work with high-performance, distraction-free portfolios designed to convert.</p>
          </div>
          <div className="flex flex-col p-8 rounded-2xl bg-background border border-border">
            <h3 className="text-lg font-semibold text-primary mb-2">Curated Opportunities</h3>
            <p className="text-muted text-sm leading-relaxed">Discover high-quality freelance gigs and co-founder matches tailored specifically to your skill stack.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-border">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} SYTU Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
