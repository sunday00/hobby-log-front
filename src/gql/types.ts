export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Long: { input: any; output: any; }
};

export type AddSubImageInput = {
  category?: InputMaybe<Category>;
  id?: InputMaybe<Scalars['String']['input']>;
  logAtStr?: InputMaybe<Scalars['String']['input']>;
  subId?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type Auth = {
  __typename?: 'Auth';
  accessToken?: Maybe<Scalars['String']['output']>;
};

export type BaseSchema = {
  category?: Maybe<Category>;
  id?: Maybe<Scalars['String']['output']>;
  logAt?: Maybe<Scalars['DateTime']['output']>;
  ratings?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Status>;
  subImages?: Maybe<Array<Maybe<ImageEntity>>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type Casting = {
  __typename?: 'Casting';
  adult?: Maybe<Scalars['Boolean']['output']>;
  castId?: Maybe<Scalars['Long']['output']>;
  character?: Maybe<Scalars['String']['output']>;
  creditId?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Long']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  profilePath?: Maybe<Scalars['String']['output']>;
};

export enum Category {
  Draw = 'DRAW',
  Essay = 'ESSAY',
  Gallery = 'GALLERY',
  Movie = 'MOVIE',
  Read = 'READ',
  Walk = 'WALK'
}

export type Crew = {
  __typename?: 'Crew';
  adult?: Maybe<Scalars['Boolean']['output']>;
  creditId?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Long']['output']>;
  job?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  profilePath?: Maybe<Scalars['String']['output']>;
};

export type Draw = BaseSchema & {
  __typename?: 'Draw';
  category?: Maybe<Category>;
  content?: Maybe<Scalars['String']['output']>;
  drawType?: Maybe<DrawType>;
  id?: Maybe<Scalars['String']['output']>;
  logAt?: Maybe<Scalars['DateTime']['output']>;
  mainImage?: Maybe<Scalars['String']['output']>;
  ratings?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Status>;
  subImages?: Maybe<Array<Maybe<ImageEntity>>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type DrawInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  drawType?: InputMaybe<DrawType>;
  id?: InputMaybe<Scalars['String']['input']>;
  logAtStr?: InputMaybe<Scalars['String']['input']>;
  mainImage?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum DrawType {
  BlackPencil = 'BLACK_PENCIL',
  Cg = 'CG',
  ColorPencil = 'COLOR_PENCIL',
  Etc = 'ETC',
  Three = 'THREE'
}

export type Essay = BaseSchema & {
  __typename?: 'Essay';
  category?: Maybe<Category>;
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  logAt?: Maybe<Scalars['DateTime']['output']>;
  ratings?: Maybe<Scalars['Int']['output']>;
  series?: Maybe<Array<Maybe<Series>>>;
  seriesKey?: Maybe<Scalars['String']['output']>;
  seriesName?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Status>;
  subImages?: Maybe<Array<Maybe<ImageEntity>>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  writingType?: Maybe<WritingType>;
};

export type EssayInput = {
  content: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  logAtStr?: InputMaybe<Scalars['String']['input']>;
  seriesKey?: InputMaybe<Scalars['String']['input']>;
  seriesName?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  writingType: WritingType;
};

export type Gallery = BaseSchema & {
  __typename?: 'Gallery';
  category?: Maybe<Category>;
  content?: Maybe<Scalars['String']['output']>;
  galleryType?: Maybe<GalleryType>;
  id?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  logAt?: Maybe<Scalars['DateTime']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  ratings?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Status>;
  subImages?: Maybe<Array<Maybe<ImageEntity>>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type GalleryInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  galleryType: GalleryType;
  id?: InputMaybe<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  logAtStr?: InputMaybe<Scalars['String']['input']>;
  overview?: InputMaybe<Scalars['String']['input']>;
  ratings: Scalars['Int']['input'];
  status?: InputMaybe<Status>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export enum GalleryType {
  Classic = 'CLASSIC',
  Organization = 'ORGANIZATION',
  Solo = 'SOLO',
  Special = 'SPECIAL',
  Student = 'STUDENT'
}

export type Hobby = BaseSchema & {
  __typename?: 'Hobby';
  category?: Maybe<Category>;
  id?: Maybe<Scalars['String']['output']>;
  logAt?: Maybe<Scalars['DateTime']['output']>;
  ratings?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Status>;
  subImages?: Maybe<Array<Maybe<ImageEntity>>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ImageEntity = {
  __typename?: 'ImageEntity';
  flag?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  usedAs?: Maybe<UsedAs>;
  usedBy?: Maybe<Scalars['String']['output']>;
};

export type Movie = BaseSchema & {
  __typename?: 'Movie';
  actors?: Maybe<Array<Maybe<Casting>>>;
  adult?: Maybe<Scalars['Boolean']['output']>;
  budget?: Maybe<Scalars['Long']['output']>;
  category?: Maybe<Category>;
  contents?: Maybe<Scalars['String']['output']>;
  directors?: Maybe<Array<Maybe<Crew>>>;
  genres?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['String']['output']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  language?: Maybe<Scalars['String']['output']>;
  logAt?: Maybe<Scalars['DateTime']['output']>;
  movieId?: Maybe<Scalars['Long']['output']>;
  originalCountry?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  originalSynopsis?: Maybe<Scalars['String']['output']>;
  originalTagline?: Maybe<Scalars['String']['output']>;
  originalTitle?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  productions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  ratings?: Maybe<Scalars['Int']['output']>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  revenue?: Maybe<Scalars['Long']['output']>;
  runtime?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Status>;
  subImages?: Maybe<Array<Maybe<ImageEntity>>>;
  synopsis?: Maybe<Scalars['String']['output']>;
  tagline?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Long']['output']>;
};

export type MovieInput = {
  content: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  logAtStr?: InputMaybe<Scalars['String']['input']>;
  movieId: Scalars['Long']['input'];
  ratings: Scalars['Int']['input'];
  status?: InputMaybe<Status>;
};

export type MovieRaw = {
  __typename?: 'MovieRaw';
  adult?: Maybe<Scalars['Boolean']['output']>;
  backdropPath?: Maybe<Scalars['String']['output']>;
  genreIds?: Maybe<Array<Maybe<Scalars['Long']['output']>>>;
  id?: Maybe<Scalars['Long']['output']>;
  originalLanguage?: Maybe<Scalars['String']['output']>;
  originalTitle?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Scalars['Boolean']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Long']['output']>;
};

export type MovieRawPge = {
  __typename?: 'MovieRawPge';
  page?: Maybe<Scalars['Long']['output']>;
  results?: Maybe<Array<Maybe<MovieRaw>>>;
  totalPages?: Maybe<Scalars['Long']['output']>;
  totalResults?: Maybe<Scalars['Long']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addSubImage?: Maybe<Result>;
  createDrawLog?: Maybe<Result>;
  createEssayLog?: Maybe<Result>;
  createGalleryLog?: Maybe<Result>;
  createReadLog?: Maybe<Result>;
  createWalkLog?: Maybe<Result>;
  deleteLog?: Maybe<Result>;
  logMovie?: Maybe<Result>;
  updateDrawLog?: Maybe<Result>;
  updateEssayLog?: Maybe<Result>;
  updateGalleryLog?: Maybe<Result>;
  updateMovie?: Maybe<Result>;
  updateReadLog?: Maybe<Result>;
  updateStatus?: Maybe<Result>;
  updateWalkLog?: Maybe<Result>;
};


export type MutationAddSubImageArgs = {
  addSubImageInput?: InputMaybe<AddSubImageInput>;
};


export type MutationCreateDrawLogArgs = {
  drawInput?: InputMaybe<DrawInput>;
};


export type MutationCreateEssayLogArgs = {
  essayInput?: InputMaybe<EssayInput>;
};


export type MutationCreateGalleryLogArgs = {
  galleryInput?: InputMaybe<GalleryInput>;
};


export type MutationCreateReadLogArgs = {
  readInput?: InputMaybe<ReadInput>;
};


export type MutationCreateWalkLogArgs = {
  walkInput?: InputMaybe<WalkInput>;
};


export type MutationDeleteLogArgs = {
  category?: InputMaybe<Category>;
  flag?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLogMovieArgs = {
  movieInput?: InputMaybe<MovieInput>;
};


export type MutationUpdateDrawLogArgs = {
  drawInput?: InputMaybe<DrawInput>;
};


export type MutationUpdateEssayLogArgs = {
  essayInput?: InputMaybe<EssayInput>;
};


export type MutationUpdateGalleryLogArgs = {
  galleryInput?: InputMaybe<GalleryInput>;
};


export type MutationUpdateMovieArgs = {
  movieInput?: InputMaybe<MovieInput>;
};


export type MutationUpdateReadLogArgs = {
  readInput?: InputMaybe<ReadInput>;
};


export type MutationUpdateStatusArgs = {
  updateStatusInput?: InputMaybe<UpdateStatusInput>;
};


export type MutationUpdateWalkLogArgs = {
  walkInput?: InputMaybe<WalkInput>;
};

export type Query = {
  __typename?: 'Query';
  getOneDraw?: Maybe<Draw>;
  getOneEssay?: Maybe<Essay>;
  getOneGallery?: Maybe<Gallery>;
  getOneMovie?: Maybe<Movie>;
  getOneRead?: Maybe<Read>;
  getOneWalk?: Maybe<Walk>;
  monthHobby?: Maybe<Array<Maybe<Hobby>>>;
  monthNonActiveHobby?: Maybe<Array<Maybe<Hobby>>>;
  searchHobby?: Maybe<SearchPagination>;
  searchMovies?: Maybe<MovieRawPge>;
  searchSeries?: Maybe<Array<Maybe<Series>>>;
  sign?: Maybe<Auth>;
  yearByCategory?: Maybe<Array<Maybe<Hobby>>>;
};


export type QueryGetOneDrawArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetOneEssayArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetOneGalleryArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetOneMovieArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetOneReadArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetOneWalkArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMonthHobbyArgs = {
  mm?: InputMaybe<Scalars['String']['input']>;
  yyyy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMonthNonActiveHobbyArgs = {
  mm?: InputMaybe<Scalars['String']['input']>;
  yyyy?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchHobbyArgs = {
  category?: InputMaybe<Category>;
  page?: InputMaybe<Scalars['Long']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchMoviesArgs = {
  page?: InputMaybe<Scalars['Long']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchSeriesArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySignArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
};


export type QueryYearByCategoryArgs = {
  category?: InputMaybe<Category>;
  yyyy?: InputMaybe<Scalars['String']['input']>;
};

export type Read = BaseSchema & {
  __typename?: 'Read';
  category?: Maybe<Category>;
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  logAt?: Maybe<Scalars['DateTime']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  ratings?: Maybe<Scalars['Int']['output']>;
  readType?: Maybe<ReadType>;
  status?: Maybe<Status>;
  subImages?: Maybe<Array<Maybe<ImageEntity>>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  writer?: Maybe<Scalars['String']['output']>;
};

export type ReadInput = {
  content: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  logAtStr?: InputMaybe<Scalars['String']['input']>;
  overview: Scalars['String']['input'];
  ratings?: InputMaybe<Scalars['Int']['input']>;
  readType: ReadType;
  status?: InputMaybe<Status>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  writer?: InputMaybe<Scalars['String']['input']>;
};

export enum ReadType {
  Blog = 'BLOG',
  Book = 'BOOK',
  Etc = 'ETC',
  Newspaper = 'NEWSPAPER'
}

export type Result = {
  __typename?: 'Result';
  id?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export enum Role {
  RoleAdmin = 'ROLE_ADMIN',
  RoleGuest = 'ROLE_GUEST',
  RoleUser = 'ROLE_USER',
  RoleWriter = 'ROLE_WRITER'
}

export type SearchPagination = {
  __typename?: 'SearchPagination';
  hobbies?: Maybe<Array<Maybe<Hobby>>>;
  totalCount?: Maybe<Scalars['Long']['output']>;
};

export type Series = {
  __typename?: 'Series';
  id?: Maybe<Scalars['String']['output']>;
  logAt?: Maybe<Scalars['DateTime']['output']>;
  seriesKey?: Maybe<Scalars['String']['output']>;
  seriesName?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export enum Status {
  Active = 'ACTIVE',
  Deprecated = 'DEPRECATED',
  Draft = 'DRAFT'
}

export type UpdateStatusInput = {
  category?: InputMaybe<Category>;
  id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
};

export enum UsedAs {
  Main = 'MAIN',
  Sub = 'SUB'
}

export type Walk = BaseSchema & {
  __typename?: 'Walk';
  category?: Maybe<Category>;
  content?: Maybe<Scalars['String']['output']>;
  distance?: Maybe<Scalars['Float']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  logAt?: Maybe<Scalars['DateTime']['output']>;
  ratings?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Status>;
  steps?: Maybe<Scalars['Int']['output']>;
  subImages?: Maybe<Array<Maybe<ImageEntity>>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type WalkInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  distance?: InputMaybe<Scalars['Float']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  logAtStr?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
  steps?: InputMaybe<Scalars['Int']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum WritingType {
  Diary = 'DIARY',
  Essay = 'ESSAY',
  Etc = 'ETC',
  Etude = 'ETUDE',
  Novel = 'NOVEL',
  Poem = 'POEM'
}


export const addSubImageInput = {
  id: undefined,
  category: undefined,
  url: undefined,
  logAtStr: undefined,
  subId: undefined,
  width: undefined,
}

export const auth = {
  accessToken: undefined,
}

export const baseSchema = {
  id: undefined,
  userId: undefined,
  category: undefined,
  title: undefined,
  thumbnail: undefined,
  ratings: undefined,
  logAt: undefined,
  status: undefined,
  subImages: undefined,
}

export const casting = {
  id: undefined,
  adult: undefined,
  gender: undefined,
  department: undefined,
  name: undefined,
  originalName: undefined,
  popularity: undefined,
  profilePath: undefined,
  castId: undefined,
  character: undefined,
  creditId: undefined,
  order: undefined,
}

export const crew = {
  id: undefined,
  adult: undefined,
  gender: undefined,
  name: undefined,
  originalName: undefined,
  popularity: undefined,
  profilePath: undefined,
  creditId: undefined,
  department: undefined,
  job: undefined,
}

export const draw = {
  id: undefined,
  userId: undefined,
  category: undefined,
  title: undefined,
  thumbnail: undefined,
  ratings: undefined,
  logAt: undefined,
  status: undefined,
  content: undefined,
  mainImage: undefined,
  drawType: undefined,
  subImages: undefined,
}

export const drawInput = {
  id: undefined,
  title: undefined,
  content: undefined,
  thumbnail: undefined,
  logAtStr: undefined,
  status: undefined,
  mainImage: undefined,
  drawType: undefined,
}

export const essay = {
  id: undefined,
  userId: undefined,
  category: undefined,
  title: undefined,
  thumbnail: undefined,
  ratings: undefined,
  logAt: undefined,
  status: undefined,
  content: undefined,
  writingType: undefined,
  seriesKey: undefined,
  seriesName: undefined,
  series: undefined,
  subImages: undefined,
}

export const essayInput = {
  id: undefined,
  title: undefined,
  content: undefined,
  writingType: undefined,
  seriesName: undefined,
  seriesKey: undefined,
  thumbnail: undefined,
  logAtStr: undefined,
  status: undefined,
}

export const gallery = {
  id: undefined,
  userId: undefined,
  title: undefined,
  category: undefined,
  galleryType: undefined,
  location: undefined,
  thumbnail: undefined,
  overview: undefined,
  content: undefined,
  ratings: undefined,
  logAt: undefined,
  status: undefined,
  subImages: undefined,
}

export const galleryInput = {
  id: undefined,
  title: undefined,
  galleryType: undefined,
  location: undefined,
  thumbnail: undefined,
  overview: undefined,
  content: undefined,
  ratings: undefined,
  logAtStr: undefined,
  status: undefined,
}

export const hobby = {
  id: undefined,
  userId: undefined,
  category: undefined,
  title: undefined,
  thumbnail: undefined,
  ratings: undefined,
  logAt: undefined,
  status: undefined,
  subImages: undefined,
}

export const imageEntity = {
  id: undefined,
  path: undefined,
  usedBy: undefined,
  usedAs: undefined,
  flag: undefined,
}

export const movie = {
  id: undefined,
  movieId: undefined,
  userId: undefined,
  category: undefined,
  title: undefined,
  thumbnail: undefined,
  ratings: undefined,
  logAt: undefined,
  status: undefined,
  adult: undefined,
  originalTitle: undefined,
  budget: undefined,
  revenue: undefined,
  originalCountry: undefined,
  language: undefined,
  directors: undefined,
  actors: undefined,
  genres: undefined,
  keywords: undefined,
  synopsis: undefined,
  originalSynopsis: undefined,
  contents: undefined,
  popularity: undefined,
  voteAverage: undefined,
  voteCount: undefined,
  productions: undefined,
  releaseDate: undefined,
  runtime: undefined,
  tagline: undefined,
  originalTagline: undefined,
  subImages: undefined,
}

export const movieInput = {
  id: undefined,
  movieId: undefined,
  content: undefined,
  ratings: undefined,
  logAtStr: undefined,
  status: undefined,
}

export const movieRaw = {
  id: undefined,
  title: undefined,
  originalTitle: undefined,
  adult: undefined,
  video: undefined,
  backdropPath: undefined,
  posterPath: undefined,
  genreIds: undefined,
  originalLanguage: undefined,
  overview: undefined,
  popularity: undefined,
  releaseDate: undefined,
  voteAverage: undefined,
  voteCount: undefined,
}

export const movieRawPge = {
  page: undefined,
  results: undefined,
  totalPages: undefined,
  totalResults: undefined,
}

export const mutation = {
  addSubImage: undefined,
  createDrawLog: undefined,
  createEssayLog: undefined,
  createGalleryLog: undefined,
  createReadLog: undefined,
  createWalkLog: undefined,
  deleteLog: undefined,
  logMovie: undefined,
  updateDrawLog: undefined,
  updateEssayLog: undefined,
  updateGalleryLog: undefined,
  updateMovie: undefined,
  updateReadLog: undefined,
  updateStatus: undefined,
  updateWalkLog: undefined,
}

export const query = {
  getOneDraw: undefined,
  getOneEssay: undefined,
  getOneGallery: undefined,
  getOneMovie: undefined,
  getOneRead: undefined,
  getOneWalk: undefined,
  monthHobby: undefined,
  monthNonActiveHobby: undefined,
  searchHobby: undefined,
  searchMovies: undefined,
  searchSeries: undefined,
  sign: undefined,
  yearByCategory: undefined,
}

export const read = {
  id: undefined,
  userId: undefined,
  category: undefined,
  title: undefined,
  thumbnail: undefined,
  ratings: undefined,
  logAt: undefined,
  status: undefined,
  writer: undefined,
  overview: undefined,
  content: undefined,
  readType: undefined,
  subImages: undefined,
}

export const readInput = {
  id: undefined,
  title: undefined,
  thumbnail: undefined,
  ratings: undefined,
  logAtStr: undefined,
  status: undefined,
  writer: undefined,
  overview: undefined,
  content: undefined,
  readType: undefined,
}

export const result = {
  id: undefined,
  success: undefined,
  message: undefined,
  status: undefined,
}

export const searchPagination = {
  hobbies: undefined,
  totalCount: undefined,
}

export const series = {
  id: undefined,
  seriesName: undefined,
  seriesKey: undefined,
  title: undefined,
  logAt: undefined,
}

export const updateStatusInput = {
  category: undefined,
  id: undefined,
  status: undefined,
}

export const walk = {
  id: undefined,
  userId: undefined,
  category: undefined,
  title: undefined,
  thumbnail: undefined,
  ratings: undefined,
  logAt: undefined,
  status: undefined,
  content: undefined,
  steps: undefined,
  distance: undefined,
  duration: undefined,
  subImages: undefined,
}

export const walkInput = {
  id: undefined,
  title: undefined,
  content: undefined,
  thumbnail: undefined,
  logAtStr: undefined,
  status: undefined,
  steps: undefined,
  distance: undefined,
  duration: undefined,
}