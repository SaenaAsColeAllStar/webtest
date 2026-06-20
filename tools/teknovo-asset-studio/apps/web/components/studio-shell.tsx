'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { ArrowsClockwise, Cube, Gauge, GridFour, RocketLaunch, ShieldCheck, Sparkle, UploadSimple } from '@phosphor-icons/react';
import { Badge, cn } from '@teknovo-asset-studio/ui';

const navigation = [
  { href: '/', label: 'Dashboard', icon: GridFour },
  { href: '/library', label: 'Asset Library', icon: Cube },
  { href: '/upload', label: 'Upload Center', icon: UploadSimple },
  { href: '/optimize', label: '3D Optimization', icon: ArrowsClockwise },
  { href: '/validation', label: 'Validation', icon: ShieldCheck },
  { href: '/deployment', label: 'Deployment', icon: RocketLaunch }
];

export function StudioShell({ title, description, children, badge }: { title: string; description: string; children: ReactNode; badge?: string }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-studio-grid bg-studio-grid px-5 py-6 text-slate-100 lg:px-8">
      <div className="mx-auto grid max-w-[1600px] gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-[32px] border border-white/10 bg-slate-950/90 p-6 shadow-studio backdrop-blur">
          <div className="mb-8 space-y-3">
            <Badge className="border-cyan-400/40 bg-cyan-400/12 text-cyan-100">Teknovo Asset Studio</Badge>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Centralized 3D operations</p>
              <h1 className="mt-3 text-2xl font-semibold text-white">Asset system for immersive products</h1>
            </div>
          </div>
          <nav className="space-y-2">
            {navigation.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition',
                    active ? 'bg-cyan-400/14 text-white shadow-[inset_0_0_0_1px_rgba(34,211,238,0.2)]' : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                  )}
                >
                  <Icon size={18} weight={active ? 'fill' : 'regular'} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <div className="mb-3 flex items-center gap-2 text-white">
              <Sparkle size={16} />
              Marketplace foundation
            </div>
            <p>Shared packages, storage abstraction, and deployment plumbing are ready for catalog, tenant, and approval workflows.</p>
          </div>
        </aside>
        <main className="space-y-6">
          <header className="rounded-[32px] border border-white/10 bg-slate-950/75 p-8 shadow-studio backdrop-blur">
            <div className="flex flex-wrap items-center gap-3">
              {badge ? <Badge>{badge}</Badge> : null}
              <span className="text-xs uppercase tracking-[0.28em] text-slate-500">Production workspace</span>
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-white">{title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">{description}</p>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
