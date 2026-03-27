import { api } from './api';

export interface Post {
  id: string;
  authorId?: string;
  authorName?: string;
  authorImage?: string;
  content: string;
  destination: 'WALL' | 'BOARD' | 'BOTH';
  isAnonymous: boolean;
  commentsEnabled: boolean;
  supportCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedPosts {
  data: Post[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface Comment {
  id: string;
  postId: string;
  authorId?: string;
  authorName?: string;
  content: string;
  isAnonymous: boolean;
  createdAt: string;
}

export const communityService = {
  getPosts: async (page = 1, limit = 10): Promise<PaginatedPosts> => {
    const response = await api.get<PaginatedPosts>(`/posts?page=${page}&limit=${limit}`);
    return response.data;
  },

  getPost: async (id: string): Promise<Post> => {
    const response = await api.get<Post>(`/posts/${id}`);
    return response.data;
  },

  createPost: async (data: { content: string; destination: string; isAnonymous: boolean; commentsEnabled: boolean }): Promise<Post> => {
    const response = await api.post<Post>('/posts', data);
    return response.data;
  },

  updatePost: async (id: string, data: Partial<Post>): Promise<Post> => {
    const response = await api.patch<Post>(`/posts/${id}`, data);
    return response.data;
  },

  deletePost: async (id: string): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },

  supportPost: async (id: string): Promise<void> => {
    await api.post(`/posts/${id}/support`);
  },

  toggleComments: async (id: string, commentsEnabled: boolean): Promise<void> => {
    await api.patch(`/posts/${id}/toggle-comments`, { commentsEnabled });
  },

  reportPost: async (id: string, reason: string): Promise<void> => {
    await api.post(`/posts/${id}/report`, { reason });
  },

  // Comments
  getComments: async (postId: string): Promise<Comment[]> => {
    const response = await api.get<Comment[]>(`/posts/${postId}/comments`);
    return response.data;
  },

  createComment: async (postId: string, data: { content: string; isAnonymous: boolean }): Promise<Comment> => {
    const response = await api.post<Comment>(`/posts/${postId}/comments`, data);
    return response.data;
  },

  deleteComment: async (postId: string, commentId: string): Promise<void> => {
    await api.delete(`/posts/${postId}/comments/${commentId}`);
  },

  reportComment: async (postId: string, commentId: string, reason: string): Promise<void> => {
    await api.post(`/posts/${postId}/comments/${commentId}/report`, { reason });
  }
};
