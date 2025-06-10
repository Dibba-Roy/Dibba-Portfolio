export interface ImageFormatDetailed {
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

export interface ImageFormats {
  thumbnail: ImageFormatDetailed;
  medium:    ImageFormatDetailed;
  small:     ImageFormatDetailed;
  large:     ImageFormatDetailed;
}

export interface RawImageFile {
  id:               number;
  documentId:       string;
  name:             string;
  alternativeText:  string | null;
  caption:          string | null;
  width:            number;
  height:           number;
  formats:          ImageFormats;
  hash:             string;
  ext:              string;
  mime:             string;
  size:             number;       
  url:              string;       
  previewUrl:       string | null;
  provider:         string;
  provider_metadata: any;         
  createdAt:        string;       
  updatedAt:        string;       
  publishedAt:      string;       
}

