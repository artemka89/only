export interface DataType {
  id: string;
  title: string;
  years: number[];
  items: GalleryItemType[];
}

export interface GalleryItemType {
  id: string;
  year: number;
  text: string;
}
