export interface PaginationInfo {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
  total: number;
}

export interface User {
  _id: string;
  name: string;
  photo: string;
}

export interface Comments {
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  createdAt: string;
}

export interface Post {
  _id: string;
  body: string;
  image: string;
  user: User;
  createdAt: string;
  comments: Comments[];
  id: string;
}

export interface ApiResponse {
  message: string;
  paginationInfo: PaginationInfo;
  posts: Post[];
}
