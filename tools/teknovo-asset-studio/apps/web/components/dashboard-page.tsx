'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Cube, Rocket, WarningCircle } from '@phosphor-icons/react';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@teknovo-asset-studio/ui';
import { StudioShell } from './studio-shell';
import { api } from '../lib/api';

interface DashboardResponse {
  summary: {
    totalAssets: number;
    deploymentReady: number;
    optimizationCandidates: number;
    byCategory: Record<string, number>;
    byStatus: Record<string, number>;
    recentAssets: Array<{ id: string; name: string; category: string; status: string; sizeBytes: number }>;
    recentJobs: Array<{ id: string; type: string; status: string; message: string; updatedAt: string }>;
  };
  r2: { configured: boolean; mode: string; bucket: string | null };
}

function formatSize(sizeBytes: number) {
  const sizeMb = sizeBytes / (1024 * 1024);
  return `${sizeMb < 1 ? (sizeBytes / 1024).toFixed(0) + ' KB' : sizeMb.toFixed(2) + ' MB'}`;
}

export function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => api<DashboardResponse>('/api/dashboard')
  });

  return (
    <StudioShell
      title="Production asset operations"
      description="One place to ingest, optimize, validate, preview, manifest, and deploy the Teknovo asset catalog without fragmenting 3D and media workflows across tools."
      badge="Dashboard"
    >
      {isLoading ? <div className="grid gap-6 md:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => <Card key={i} className="h-40 animate-pulse bg-white/5" />)}</div> : null}
      {error ? (
        <Card>
          <CardHeader>
            <CardTitle>Dashboard unavailable</CardTitle>
            <CardDescription>{error.message}</CardDescription>
          </CardHeader>
        </Card>
      ) : null}
      {data ? (
        <>
          <section className="grid gap-6 xl:grid-cols-4 md:grid-cols-2">
            {[
              ['Total assets', data.summary.totalAssets, <Cube key="cube" size={20} />],
              ['Deployment ready', data.summary.deploymentReady, <Rocket key="rocket" size={20} />],
              ['Need optimization', data.summary.optimizationCandidates, <WarningCircle key="warning" size={20} />],
              ['R2 mode', data.r2.configured ? 'Live' : 'Dry run', <Badge key="badge">{data.r2.mode}</Badge>]
            ].map(([label, value, icon]) => (
              <Card key={String(label)}>
                <CardHeader>
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-sm">{label}</span>
                    {icon}
                  </div>
                  <CardTitle className="text-3xl">{String(value)}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </section>
          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle>Recently ingested assets</CardTitle>
                <CardDescription>Fresh uploads and registered files available for preview, validation, and deployment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.summary.recentAssets.length === 0 ? <p className="text-sm text-slate-400">No assets yet. Start in Upload Center.</p> : data.summary.recentAssets.map((asset) => (
                  <Link key={asset.id} href={`/library/${asset.id}`} className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-4 transition hover:bg-white/10">
                    <div>
                      <p className="font-medium text-white">{asset.name}</p>
                      <p className="text-sm text-slate-400">{asset.category} · {asset.status}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>{formatSize(asset.sizeBytes)}</span>
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Operational signal</CardTitle>
                <CardDescription>Recent backend jobs across optimization, manifest generation, validation, and deployment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.summary.recentJobs.length === 0 ? <p className="text-sm text-slate-400">No jobs recorded yet.</p> : data.summary.recentJobs.map((job) => (
                  <div key={job.id} className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-white">{job.type}</p>
                        <p className="text-sm text-slate-400">{job.message}</p>
                      </div>
                      <Badge className={job.status === 'failed' ? 'border-rose-400/30 bg-rose-400/10 text-rose-200' : ''}>{job.status}</Badge>
                    </div>
                  </div>
                ))}
                <div className="flex gap-3 pt-3">
                  <Button asChild><Link href="/upload">Add asset</Link></Button>
                  <Button asChild variant="secondary"><Link href="/library">Open library</Link></Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </>
      ) : null}
    </StudioShell>
  );
}
