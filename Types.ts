export type UrlSizes = {
  thumb: string;
  full: string;
};
export type UidUrls = {
  [uid: string]: UrlSizes;
};
export type UidUrlsArray = [UidUrls][];
