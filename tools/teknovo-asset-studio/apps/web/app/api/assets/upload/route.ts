import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getStudioContext } from '@teknovo-asset-studio/core';

const uploadSchema = z.object({
  name: z.string().trim().optional(),
  category: z.enum(['model', 'texture', 'material', 'scene', 'video', 'image', 'audio', 'document']),
  description: z.string().trim().optional(),
  tags: z.string().trim().optional()
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = uploadSchema.parse({
    name: formData.get('name')?.toString(),
    category: formData.get('category')?.toString(),
    description: formData.get('description')?.toString(),
    tags: formData.get('tags')?.toString()
  });
  const file = formData.get('file');
  if (!(file instanceof File)) {
    return new NextResponse('File is required', { status: 400 });
  }

  const ctx = getStudioContext();
  const buffer = Buffer.from(await file.arrayBuffer());
  const asset = ctx.assets.createAssetFromUpload({
    ...parsed,
    tags: parsed.tags ? parsed.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
    originalName: file.name,
    mimeType: file.type || 'application/octet-stream',
    buffer
  });

  return NextResponse.json({ asset });
}
