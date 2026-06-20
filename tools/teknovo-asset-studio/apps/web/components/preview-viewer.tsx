'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@teknovo-asset-studio/ui';
import { api } from '../lib/api';
import { StudioShell } from './studio-shell';

const ModelCanvas = dynamic(() => import('./preview-viewer-canvas').then((mod) => mod.PreviewViewerCanvas), { ssr: false });

interface PreviewResponse {
  asset: {
    id: string;
    name: string;
    category: string;
    description: string | null;
    sizeBytes: number;
    tags: string[];
    analysis: Record<string, unknown> | null;
    validation: Record<string, unknown> | null;
  };
  manifest: {
    preview: { canUseGLTF: boolean };
  };
  fileUrl: string;
}

export function PreviewViewer({ assetId }: { assetId: string }) {
  const { data, isLoading } = useQuery({ queryKey: ['asset', assetId], queryFn: () => api<PreviewResponse>(`/api/assets/${assetId}`) });

  const stats = useMemo(() => [
    ['Category', data?.asset.category ?? '—'],
    ['Tags', data?.asset.tags.join(', ') || '—'],
    ['Validation', data?.asset.validation ? (data.asset.validation.passed ? 'Passed' : 'Issues found') : 'Not run']
  ], [data]);

  return (
    <StudioShell title="Preview Studio" description="Inspect an individual asset, view generated manifest/export outputs, and validate that preview-safe formats render correctly in React Three Fiber." badge="Preview">
      {isLoading || !data ? <Card><CardHeader><CardTitle>Loading preview…</CardTitle></CardHeader></Card> : (
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>{data.asset.name}</CardTitle>
              <CardDescription>{data.asset.description ?? 'No description provided.'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[520px] overflow-hidden rounded-[28px] border border-white/10 bg-slate-950">
                <ModelCanvas src={data.fileUrl} canUseGLTF={data.manifest.preview.canUseGLTF} />
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {stats.map(([label, value]) => (
                  <div key={String(label)} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="text-sm text-slate-400">{label}</span>
                    <span className="text-sm text-white">{String(value)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Outputs</CardTitle>
                <CardDescription>Manifest and React component generation are available on the asset detail page.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="secondary"><Link href={`/library/${assetId}`}>Open asset detail</Link></Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </StudioShell>
  );
}
