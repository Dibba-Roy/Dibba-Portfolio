import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ImageContextType {
  imgUrl: string | null;
  setImgUrl: (url: string | null) => void;
  isImageLoading: boolean;
  setIsImageLoading: (loading: boolean) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const useImage = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
};

interface ImageProviderProps {
  children: ReactNode;
}

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const value = {
    imgUrl,
    setImgUrl,
    isImageLoading,
    setIsImageLoading,
  };

  return (
    <ImageContext.Provider value={value}>
      {children}
    </ImageContext.Provider>
  );
};