'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@teknovo-asset-studio/ui';
import { StudioShell } from './studio-shell';
import { api } from '../lib/api';
import { analyzePerformanceClient } from '../lib/performance';

interface AssetResponse {
  assets: Array<{
    id: string;
    name: string;
    category: string;
    status: string;
    sizeBytes: number;
    analysis: Record<string, unknown> | null;
    manifestPath: string | null;
    validation: Record<string, unknown> | null;
  }>;
}

export function OptimizePage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['assets'], queryFn: () => api<AssetResponse>('/api/assets') });
  const mutation = useMutation({
    mutationFn: async (assetId: string) => api(`/api/assets/${assetId}/optimize`, { method: 'POST', body: JSON.stringify({ budget: 'standard' }) }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['assets'] });
      await queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    }
  });

  const models = (data?.assets ?? []).filter((asset) => asset.category === 'model');

  return (
    <StudioShell title="3D Optimization" description="Trigger the shared Teknovo 3D pipeline when available, capture its output, and surface fallback diagnostics when the external dependency or adapters are missing." badge="Optimization">
      <Card>
        <CardHeader>
          <CardTitle>Pipeline queue</CardTitle>
          <CardDescription>Model assets are surfaced here for analysis and optimization orchestration.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? <p className="text-sm text-slate-400">Loading models…</p> : null}
          {models.length === 0 ? <p className="text-sm text-slate-400">No model assets available yet.</p> : null}
          {models.map((asset) => {
            const insight = analyzePerformanceClient(asset);
            return (
              <div key={asset.id} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">{asset.name}</h3>
                    <p className="text-sm text-slate-400">Performance score {insight.score} · {insight.summary}</p>
                    <div className="flex flex-wrap gap-2">{insight.highlights.map((item) => <Badge key={item}>{item}</Badge>)}</div>
                  </div>
                  <Button onClick={() => mutation.mutate(asset.id)} disabled={mutation.isPending}>{mutation.isPending ? 'Running…' : 'Run optimize'}</Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </StudioShell>
  );
}
