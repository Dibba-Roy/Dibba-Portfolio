export interface WorkExperience {
  id: number;
  documentId: string;
  WorkID: number;
  DateRange: string;
  JobTitle: string;
  CompanyName: string;
  ShortDescription: string;
  BulletPoints: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface WorkExperiencResponseRaw {
  data: WorkExperience[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}


export interface ExperienceModalProps {
  experience: WorkExperience | null;
  isOpen: boolean;
  onClose: () => void;
}
