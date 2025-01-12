export async function uploadFlagImg(file: File) {
    const apiKey = process.env.NEXT_PUBLIC_F123_API_KEY; // 서버 환경 변수에서 API 키를 가져옵니다.
  
    if (!apiKey) {
      throw new Error('API key is not set on the server.');
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch(`/api/flags/imgbb`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
        body: formData,
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || 'Image upload failed');
      }
  
      return result.imageUrl; // img_url 반환
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to upload image');
        } else {
            console.error(`err:${error}`)
        }
    }
  }
  