import cloudinary from '@/lib/cloudinary';
import type { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'case-mobile',
            resource_type: 'auto',
          },
          (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (error || !result) return reject(error);
            resolve(result);
          },
        )
        .end(buffer);
    });
    console.log('uploadResult', uploadResult);
    return NextResponse.json({ url: uploadResult.secure_url }, { status: 200 });
  } catch (error: unknown) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
