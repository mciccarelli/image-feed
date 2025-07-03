export interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
    full?: string;
    raw?: string;
  };
  alt_description: string;
  description?: string;
  blur_hash?: string;
  user: {
    name: string;
    username?: string;
    links?: {
      html?: string;
    };
    profile_image?: {
      small?: string;
      medium?: string;
      large?: string;
    };
  };
  width: number;
  height: number;
  likes?: number;
  downloads?: number;
  views?: number;
  created_at?: string;
  updated_at?: string;
  tags?: string[];
  location?: {
    name?: string;
    city?: string;
    country?: string;
  };
  exif?: {
    make?: string;
    model?: string;
    focal_length?: string;
    aperture?: string;
    iso?: number;
    exposure_time?: string;
  };
}
