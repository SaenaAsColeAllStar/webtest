import fs from 'node:fs/promises';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export interface R2UploadTarget {
  bucket: string;
  key: string;
  filePath: string;
  contentType: string;
}

export interface R2DeploymentResult {
  success: boolean;
  configured: boolean;
  message: string;
  publicUrl?: string;
}

function readConfig() {
  const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const bucket = process.env.CLOUDFLARE_R2_BUCKET;
  const publicBaseUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;
  const configured = Boolean(accountId && accessKeyId && secretAccessKey && bucket);
  return { accountId, accessKeyId, secretAccessKey, bucket, publicBaseUrl, configured };
}

export async function uploadToR2(target: R2UploadTarget): Promise<R2DeploymentResult> {
  const config = readConfig();
  if (!config.configured || config.bucket !== target.bucket) {
    return {
      success: false,
      configured: false,
      message: 'Cloudflare R2 credentials or bucket config are missing.'
    };
  }

  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId!,
      secretAccessKey: config.secretAccessKey!
    }
  });

  const body = await fs.readFile(target.filePath);
  await client.send(new PutObjectCommand({
    Bucket: target.bucket,
    Key: target.key,
    Body: body,
    ContentType: target.contentType
  }));

  return {
    success: true,
    configured: true,
    message: 'Uploaded to Cloudflare R2.',
    publicUrl: config.publicBaseUrl ? `${config.publicBaseUrl.replace(/\/$/, '')}/${target.key}` : undefined
  };
}

export function getR2Status() {
  const config = readConfig();
  return {
    configured: config.configured,
    bucket: config.bucket ?? null,
    publicBaseUrl: config.publicBaseUrl ?? null,
    mode: config.configured ? 'live' : 'dry-run'
  };
}
