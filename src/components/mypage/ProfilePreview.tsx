'use client';

import { useRef, useState } from 'react';

interface ProfilePreviewProps {
  width: number;
  height: number;
  name: string;
  setValue: (name: string, file: File | null) => void;
  imageUrl?: string;
  className?: string;
  innerClass?: string;
}

const ProfilePreview = ({
  width,
  height,
  name,
  setValue,
  imageUrl = '/icons/profile-image.webp',
  className,
}: ProfilePreviewProps) => {
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const profileRef = useRef<HTMLInputElement>(null);
  const url = profileFile ? URL.createObjectURL(profileFile) : imageUrl;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setProfileFile(file);
    setValue(name, file);
  };

  return (
    <div className={`relative ${className}`} onClick={() => profileRef.current?.click()}>
      <img
        src={url}
        width={width}
        height={height}
        alt="selected profile image"
        className="rounded-full object-cover w-full h-full"
      />
      <input
        type="file"
        accept="image/*"
        ref={profileRef}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePreview;
