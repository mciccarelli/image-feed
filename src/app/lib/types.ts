export interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  user: {
    name: string;
    links?: {
      html?: string;
    };
  };
  width: number;
  height: number;
}
