// src/services/get-image-service.tsx
import api from '../lib/api';
import type { RawImageFile } from '../models/fetchImageModel';

export const imageService = {
  async getImageList(): Promise<RawImageFile[]> {
    try {
      const response = await api.get('/upload/files');

      const files = response.data as RawImageFile[];
      return files;
    } catch (error) {
      console.error('imageService.getImageList error >>', error);
      throw error;
    }
  }
};
