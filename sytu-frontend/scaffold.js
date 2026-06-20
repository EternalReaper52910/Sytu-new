const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

const dirs = [
  'app/(auth)/login',
  'app/(auth)/register',
  'app/(dashboard)/discover',
  'app/(dashboard)/messages',
  'app/(dashboard)/profile',
  'app/(dashboard)/projects',
  'app/(dashboard)/portfolio',
  'app/(dashboard)/settings',
  'components/ui',
  'components/common',
  'components/navigation',
  'components/cards',
  'components/forms',
  'components/layouts',
  'hooks',
  'services/api',
  'services/socket',
  'services/auth',
  'store',
  'lib',
  'types',
  'constants',
  'styles'
];

dirs.forEach(d => fs.mkdirSync(path.join(baseDir, d), { recursive: true }));

// create basic page.tsx for each route
const routes = [
  { p: 'app/(auth)/login/page.tsx', name: 'Login' },
  { p: 'app/(auth)/register/page.tsx', name: 'Register' },
  { p: 'app/(dashboard)/discover/page.tsx', name: 'Discover' },
  { p: 'app/(dashboard)/messages/page.tsx', name: 'Messages' },
  { p: 'app/(dashboard)/profile/page.tsx', name: 'Profile' },
  { p: 'app/(dashboard)/projects/page.tsx', name: 'Projects' },
  { p: 'app/(dashboard)/portfolio/page.tsx', name: 'Portfolio' },
  { p: 'app/(dashboard)/settings/page.tsx', name: 'Settings' }
];

routes.forEach(r => {
  const content = `export default function ${r.name}Page() {\n  return (\n    <div className="flex flex-col items-center justify-center min-h-screen p-8">\n      <h1 className="text-4xl font-bold text-primary">${r.name}</h1>\n      <p className="mt-4 text-gray-400">Placeholder for ${r.name} page.</p>\n    </div>\n  );\n}\n`;
  fs.writeFileSync(path.join(baseDir, r.p), content);
});

// Update app/page.tsx
const landingContent = `import Link from "next/link";

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
`;
fs.writeFileSync(path.join(baseDir, 'app/page.tsx'), landingContent);

// Add Zustand Stores
fs.writeFileSync(path.join(baseDir, 'store/auth.store.ts'), `import { create } from 'zustand';\n\ninterface AuthState {\n  user: any | null;\n  isAuthenticated: boolean;\n  setUser: (user: any) => void;\n  logout: () => void;\n}\n\nexport const useAuthStore = create<AuthState>((set) => ({\n  user: null,\n  isAuthenticated: false,\n  setUser: (user) => set({ user, isAuthenticated: true }),\n  logout: () => set({ user: null, isAuthenticated: false }),\n}));\n`);
fs.writeFileSync(path.join(baseDir, 'store/ui.store.ts'), `import { create } from 'zustand';\n\ninterface UIState {\n  theme: 'light' | 'dark';\n  toggleTheme: () => void;\n}\n\nexport const useUIStore = create<UIState>((set) => ({\n  theme: 'dark',\n  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),\n}));\n`);
fs.writeFileSync(path.join(baseDir, 'store/user.store.ts'), `import { create } from 'zustand';\n\ninterface UserState {\n  profile: any | null;\n  setProfile: (profile: any) => void;\n}\n\nexport const useUserStore = create<UserState>((set) => ({\n  profile: null,\n  setProfile: (profile) => set({ profile }),\n}));\n`);

// Add Lib Files
fs.writeFileSync(path.join(baseDir, 'lib/axios.ts'), `import axios from 'axios';\n\nexport const api = axios.create({\n  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',\n  headers: {\n    'Content-Type': 'application/json',\n  },\n});\n`);
fs.writeFileSync(path.join(baseDir, 'lib/query-client.ts'), `import { QueryClient } from '@tanstack/react-query';\n\nexport const queryClient = new QueryClient({\n  defaultOptions: {\n    queries: {\n      staleTime: 1000 * 60 * 5, // 5 minutes\n      retry: 1,\n    },\n  },\n});\n`);
fs.writeFileSync(path.join(baseDir, 'lib/utils.ts'), `import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n`);

// Middleware
fs.writeFileSync(path.join(baseDir, 'middleware.ts'), `import { NextResponse } from 'next/server';\nimport type { NextRequest } from 'next/server';\n\nexport function middleware(request: NextRequest) {\n  // Placeholder for authentication checks\n  return NextResponse.next();\n}\n\nexport const config = {\n  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],\n};\n`);

console.log('Scaffolding complete!');
