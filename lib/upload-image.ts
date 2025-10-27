export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch('/api/upload-image', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Помилка завантаження');

  const data = await res.json();

  if (!data?.url) throw new Error('Сервер не повернув URL');

  return data.url;
};
