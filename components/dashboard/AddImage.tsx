'use client';

import { Upload } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
interface AddImageProps {
  setImageUrl: (url: string) => void;
}
const AddImage = ({ setImageUrl }: AddImageProps) => {
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>();

  const handleButtonClick = () => {
    imgInputRef.current?.click();
  };
  const uploadImage = async () => {
    if (!image) {
      alert('Please select an image');
      return;
    }
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:3000/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      console.log('Uploaded image URL:', data.url);
      setImageUrl(data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  return (
    <div>
      <input
        type='file'
        accept='image/*'
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        ref={imgInputRef}
        className='hidden'
      />
      <button
        className='flex items-center gap-2 cursor-pointer'
        type='button'
        onClick={handleButtonClick}
      >
        <Upload size={20} /> <span>Додайте зображення</span>
      </button>
      <Button onClick={uploadImage}>Загрузить</Button>
      {image && (
        <Image src={URL.createObjectURL(image)} alt='Preview Image' width={200} height={200} />
      )}
    </div>
  );
};
export default AddImage;
