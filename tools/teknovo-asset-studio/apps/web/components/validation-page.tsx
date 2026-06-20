'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@teknovo-asset-studio/ui';
import { StudioShell } from './studio-shell';
import { api } from '../lib/api';

interface AssetResponse {
  assets: Array<{
    id: string;
    name: string;
    category: string;
    validation: { passed?: boolean; checks?: string[] } | null;
  }>;
}

export function ValidationPage() {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ['assets'], queryFn: () => api<AssetResponse>('/api/assets') });
  const mutation = useMutation({
    mutationFn: async (assetId: string) => api(`/api/assets/${assetId}/validate`, { method: 'POST' }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['assets'] });
      await queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    }
  });

  return (
    <StudioShell title="Asset Validation" description="Run local validation heuristics plus optional pipeline checks so asset handoff quality is visible before deployment or marketplace packaging." badge="Validation">
      <Card>
        <CardHeader>
          <CardTitle>Validation matrix</CardTitle>
          <CardDescription>Every asset shows its latest quality signal and can be revalidated on demand.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(data?.assets ?? []).length === 0 ? <p className="text-sm text-slate-400">No assets in the library yet.</p> : null}
          {(data?.assets ?? []).map((asset) => (
            <div key={asset.id} className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div>
                <p className="font-medium text-white">{asset.name}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge className={asset.validation?.passed === false ? 'border-rose-400/30 bg-rose-400/10 text-rose-200' : ''}>
                    {asset.validation ? (asset.validation.passed ? 'Passed' : 'Needs attention') : 'Not run'}
                  </Badge>
                  {(asset.validation?.checks ?? []).map((check) => <Badge key={check}>{check}</Badge>)}
                </div>
              </div>
              <Button variant="secondary" onClick={() => mutation.mutate(asset.id)} disabled={mutation.isPending}>Validate</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </StudioShell>
  );
}
