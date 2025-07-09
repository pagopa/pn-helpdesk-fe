import axios from 'axios';

const client = axios.create();

export async function apiUpload(url: string, file: File, sha: string) {
  try {
    const response = await client.put(url, file, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        // 'x-amz-meta-secret': secret,
        'x-amz-checksum-sha256': sha,
      },
    });
    return response;
  } catch (e: any) {
    throw new Error(e);
  }
}
