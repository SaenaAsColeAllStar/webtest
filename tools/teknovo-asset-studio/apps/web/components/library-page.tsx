'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Table, TableCell, TableHead } from '@teknovo-asset-studio/ui';
import { StudioShell } from './studio-shell';
import { api } from '../lib/api';
import { useStudioFilters } from '../lib/store';

interface AssetListResponse {
  assets: Array<{
    id: string;
    name: string;
    category: string;
    status: string;
    sizeBytes: number;
    tags: string[];
    updatedAt: string;
    manifestPath: string | null;
  }>;
}

function formatSize(sizeBytes: number) {
  return sizeBytes > 1024 * 1024 ? `${(sizeBytes / (1024 * 1024)).toFixed(2)} MB` : `${Math.max(1, Math.round(sizeBytes / 1024))} KB`;
}

export function LibraryPage() {
  const { query, category, setQuery, setCategory } = useStudioFilters();
  const { data, isLoading, error } = useQuery({
    queryKey: ['assets'],
    queryFn: () => api<AssetListResponse>('/api/assets')
  });

  const filtered = useMemo(() => {
    const assets = data?.assets ?? [];
    return assets.filter((asset) => {
      const matchesQuery = query.length === 0 || `${asset.name} ${asset.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'all' || asset.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [category, data?.assets, query]);

  const categories = Array.from(new Set((data?.assets ?? []).map((asset) => asset.category)));

  return (
    <StudioShell title="Asset Library" description="Search the full catalog, inspect readiness, and open the detail surface for preview, manifest, export, and deployment actions." badge="Library">
      <Card>
        <CardHeader>
          <CardTitle>Catalog controls</CardTitle>
          <CardDescription>Fast filtering with persistent Zustand state for triage across model, media, and deployable assets.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
          <Input placeholder="Search by name or tag" value={query} onChange={(event) => setQuery(event.target.value)} />
          <select className="h-11 rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-slate-100" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">All categories</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Stored assets</CardTitle>
          <CardDescription>{filtered.length} asset{filtered.length === 1 ? '' : 's'} shown</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? <p className="text-sm text-slate-400">Loading assets…</p> : null}
          {error ? <p className="text-sm text-rose-300">{error.message}</p> : null}
          {!isLoading && !error && filtered.length === 0 ? <p className="text-sm text-slate-400">No assets match the current filters.</p> : null}
          {filtered.length > 0 ? (
            <div className="overflow-hidden rounded-[28px] border border-white/10">
              <Table>
                <thead className="bg-white/5">
                  <tr>
                    <TableHead>Asset</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Manifest</TableHead>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((asset) => (
                    <tr key={asset.id} className="hover:bg-white/5">
                      <TableCell>
                        <Link href={`/library/${asset.id}`} className="font-medium text-white hover:text-cyan-200">{asset.name}</Link>
                        <div className="mt-2 flex flex-wrap gap-2">{asset.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
                      </TableCell>
                      <TableCell>{asset.category}</TableCell>
                      <TableCell><Badge className={asset.status === 'deployed' ? '' : 'border-white/15 bg-white/5 text-slate-200'}>{asset.status}</Badge></TableCell>
                      <TableCell>{formatSize(asset.sizeBytes)}</TableCell>
                      <TableCell>{asset.manifestPath ? 'Generated' : 'Pending'}</TableCell>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </StudioShell>
  );
}
