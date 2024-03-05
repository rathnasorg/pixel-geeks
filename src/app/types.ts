
export interface GeekPhoto {
  id: number;
  url: string;
  title: string;
  thumbnailUrl: string;
  description: string;
}

export interface GeekSettings {
  hideTitleAndDescription: boolean
  isMasonary: boolean
  greyScalePercent: number
  slideShowInterval: number
}

