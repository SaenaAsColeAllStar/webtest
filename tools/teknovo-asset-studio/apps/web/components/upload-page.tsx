'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Textarea } from '@teknovo-asset-studio/ui';
import { StudioShell } from './studio-shell';

export function UploadPage() {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState<string>('');

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/assets/upload', { method: 'POST', body: formData });
      if (!response.ok) throw new Error(await response.text());
      return response.json() as Promise<{ asset: { name: string } }>;
    },
    onSuccess: async (data) => {
      setMessage(`Uploaded ${data.asset.name}`);
      await queryClient.invalidateQueries({ queryKey: ['assets'] });
      await queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    }
  });

  return (
    <StudioShell title="Upload Center" description="Ingest raw media into local studio storage, capture production metadata, and immediately persist the record for downstream preview and deployment." badge="Upload">
      <Card>
        <CardHeader>
          <CardTitle>Asset intake form</CardTitle>
          <CardDescription>Designed for real local ingestion with server-side persistence rather than front-end only placeholders.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-5"
            onSubmit={(event) => {
              event.preventDefault();
              const form = event.currentTarget;
              const formData = new FormData(form);
              mutation.mutate(formData);
            }}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Name</label>
                <Input name="name" placeholder="Library display name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Category</label>
                <select name="category" defaultValue="model" className="h-11 rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-slate-100">
                  {['model', 'texture', 'material', 'scene', 'video', 'image', 'audio', 'document'].map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Tags</label>
              <Input name="tags" placeholder="hero, homepage, phase-2" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Description</label>
              <Textarea name="description" placeholder="Describe usage context, owner, or expected deployment surface." />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-300">File</label>
              <input name="file" type="file" required className="block w-full rounded-3xl border border-dashed border-cyan-400/35 bg-cyan-400/5 p-6 text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-400 file:px-4 file:py-2 file:text-slate-950" />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? 'Uploading…' : 'Store asset'}</Button>
              {message ? <Badge>{message}</Badge> : null}
              {mutation.error ? <p className="text-sm text-rose-300">{mutation.error.message}</p> : null}
            </div>
          </form>
        </CardContent>
      </Card>
    </StudioShell>
  );
}
