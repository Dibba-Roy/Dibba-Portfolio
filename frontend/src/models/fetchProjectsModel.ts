export interface ProjectResponseRaw {
  data: Project[];
  meta: Meta;
}

export interface Project {
  id: number;
  documentId: string;
  title: string;
  Description: string;
  tags: string[];
  githubUrl: string;
  websiteUrl?: string | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  projectImage: ProjectImage;
  projectid: number;
}

export interface ProjectImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    large: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
