'use client';

import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@teknovo-asset-studio/ui';
import { StudioShell } from './studio-shell';
import { api } from '../lib/api';
import { analyzePerformanceClient } from '../lib/performance';

interface AssetDetailResponse {
  asset: {
    id: string;
    name: string;
    category: string;
    status: string;
    description: string | null;
    sizeBytes: number;
    tags: string[];
    manifestPath: string | null;
    exportPath: string | null;
    analysis: Record<string, unknown> | null;
    validation: Record<string, unknown> | null;
    deployment: Record<string, unknown> | null;
  };
  manifest: { preview: { canUseGLTF: boolean } };
  fileUrl: string;
}

export function AssetDetailPage({ assetId }: { assetId: string }) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({ queryKey: ['asset', assetId], queryFn: () => api<AssetDetailResponse>(`/api/assets/${assetId}`) });

  const onSettled = async () => {
    await queryClient.invalidateQueries({ queryKey: ['asset', assetId] });
    await queryClient.invalidateQueries({ queryKey: ['assets'] });
    await queryClient.invalidateQueries({ queryKey: ['deployment'] });
    await queryClient.invalidateQueries({ queryKey: ['dashboard'] });
  };

  const manifestMutation = useMutation({ mutationFn: async () => api(`/api/assets/${assetId}/manifest`, { method: 'POST' }), onSuccess: onSettled });
  const exportMutation = useMutation({ mutationFn: async () => api(`/api/assets/${assetId}/export`, { method: 'POST' }), onSuccess: onSettled });
  const validateMutation = useMutation({ mutationFn: async () => api(`/api/assets/${assetId}/validate`, { method: 'POST' }), onSuccess: onSettled });
  const deployMutation = useMutation({ mutationFn: async () => api(`/api/assets/${assetId}/deploy`, { method: 'POST' }), onSuccess: onSettled });
  const optimizeMutation = useMutation({ mutationFn: async () => api(`/api/assets/${assetId}/optimize`, { method: 'POST', body: JSON.stringify({ budget: 'standard' }) }), onSuccess: onSettled });

  if (isLoading || !data) {
    return <StudioShell title="Asset detail" description="Loading asset detail." badge="Asset"><Card><CardHeader><CardTitle>Loading…</CardTitle></CardHeader></Card></StudioShell>;
  }
  if (error) {
    return <StudioShell title="Asset detail" description="Unable to load the asset." badge="Asset"><Card><CardHeader><CardTitle>Error</CardTitle><CardDescription>{error.message}</CardDescription></CardHeader></Card></StudioShell>;
  }

  const insight = analyzePerformanceClient(data.asset);
  const deploymentMessage =
    data.asset.deployment && typeof data.asset.deployment.message === 'string'
      ? data.asset.deployment.message
      : 'Not deployed';
  const deploymentPublished = data.asset.deployment?.success === true;

  return (
    <StudioShell title={data.asset.name} description={data.asset.description ?? 'Detailed production controls for this asset.'} badge={data.asset.category}>
      <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <Card>
          <CardHeader>
            <CardTitle>Asset controls</CardTitle>
            <CardDescription>Manifest generation, React Three Fiber export, optimization, validation, and deployment all originate from this record.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => manifestMutation.mutate()} disabled={manifestMutation.isPending}>Generate manifest</Button>
              <Button variant="secondary" onClick={() => exportMutation.mutate()} disabled={exportMutation.isPending}>Generate R3F export</Button>
              <Button variant="outline" onClick={() => validateMutation.mutate()} disabled={validateMutation.isPending}>Validate</Button>
              <Button variant="outline" onClick={() => optimizeMutation.mutate()} disabled={optimizeMutation.isPending}>Optimize</Button>
              <Button variant="secondary" onClick={() => deployMutation.mutate()} disabled={deployMutation.isPending || !data.asset.manifestPath}>Deploy</Button>
              <Button asChild variant="ghost"><Link href={`/preview/${assetId}`}>Open Preview Studio</Link></Button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {[['Status', data.asset.status], ['Manifest', data.asset.manifestPath ? 'Generated' : 'Pending'], ['R3F export', data.asset.exportPath ? 'Generated' : 'Pending'], ['Validation', data.asset.validation ? (data.asset.validation.passed ? 'Passed' : 'Issues found') : 'Not run']].map(([label, value]) => (
                <div key={String(label)} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">{label}</p>
                  <p className="mt-2 font-medium text-white">{String(value)}</p>
                </div>
              ))}
            </div>
            <div className="rounded-[28px] border border-cyan-400/20 bg-cyan-400/6 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-300">Performance Analyzer</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">Score {insight.score}</h3>
                </div>
                <Badge>{insight.summary}</Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">{insight.highlights.map((item) => <Badge key={item}>{item}</Badge>)}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Metadata and deployment state</CardTitle>
            <CardDescription>Technical metadata, tags, and current deployment posture.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">{data.asset.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
            <div className="space-y-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                Preview compatible: {data.manifest.preview.canUseGLTF ? 'Yes' : 'No'}
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                Deployment state: {deploymentPublished ? 'Published' : deploymentMessage}
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 break-all">
                File URL: {data.fileUrl}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudioShell>
  );
}
