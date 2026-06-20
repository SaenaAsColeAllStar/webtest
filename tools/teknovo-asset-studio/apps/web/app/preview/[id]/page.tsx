import { PreviewViewer } from '../../../components/preview-viewer';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PreviewViewer assetId={id} />;
}
