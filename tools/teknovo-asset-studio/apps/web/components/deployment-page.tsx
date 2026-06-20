'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@teknovo-asset-studio/ui';
import { StudioShell } from './studio-shell';
import { api } from '../lib/api';

interface DeploymentResponse {
  assets: Array<{
    id: string;
    name: string;
    status: string;
    manifestPath: string | null;
    deployment: { configured?: boolean; message?: string; success?: boolean; publicUrl?: string } | null;
  }>;
  r2: { configured: boolean; bucket: string | null; mode: string };
}

export function DeploymentPage() {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ['deployment'], queryFn: () => api<DeploymentResponse>('/api/deployment') });
  const mutation = useMutation({
    mutationFn: async (assetId: string) => api(`/api/assets/${assetId}/deploy`, { method: 'POST' }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['deployment'] });
      await queryClient.invalidateQueries({ queryKey: ['assets'] });
      await queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    }
  });

  return (
    <StudioShell title="Asset Deployment" description="Promote manifest-backed assets into Cloudflare R2 when credentials exist, or surface a truthful dry-run state instead of a fake success path." badge="Deployment">
      <Card>
        <CardHeader>
          <CardTitle>R2 integration layer</CardTitle>
          <CardDescription>Mode: {data?.r2.mode ?? 'loading'} · Bucket: {data?.r2.bucket ?? 'not configured'}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(data?.assets ?? []).length === 0 ? <p className="text-sm text-slate-400">No deployable assets yet.</p> : null}
          {(data?.assets ?? []).map((asset) => (
            <div key={asset.id} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-white">{asset.name}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge>{asset.manifestPath ? 'Manifest ready' : 'Manifest pending'}</Badge>
                    <Badge className={asset.deployment?.success ? '' : 'border-white/15 bg-white/5 text-slate-200'}>{asset.status}</Badge>
                  </div>
                  {asset.deployment?.message ? <p className="mt-3 text-sm text-slate-400">{asset.deployment.message}</p> : null}
                  {asset.deployment?.publicUrl ? <a className="mt-2 inline-block text-sm text-cyan-200 underline" href={asset.deployment.publicUrl} target="_blank">Open public asset</a> : null}
                </div>
                <Button onClick={() => mutation.mutate(asset.id)} disabled={mutation.isPending || !asset.manifestPath}>Deploy</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </StudioShell>
  );
}
