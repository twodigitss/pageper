export interface BookmarkCategory {
  [name: string]: string;
}

export interface AppConfig {
  bookmarks: {
    [category: string]: BookmarkCategory;
  };
  showFavicons?: boolean;
}
