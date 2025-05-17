export interface DataType {
  id: string;
  title: string;
  years: number[];
  items: GalleryItemType[];
}

export interface GalleryItemType {
  id: string;
  title: string;
  text: string;
}
