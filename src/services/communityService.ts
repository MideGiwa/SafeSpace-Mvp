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
    console.log('[communityService] getPosts → GET /posts', { page, limit });
    try {
      const response = await api.get<PaginatedPosts>(`/posts?page=${page}&limit=${limit}`);
      console.log('[communityService] getPosts ← response', response.data);
      return response.data;
    } catch (err) {
      console.error('[communityService] getPosts ← error', err);
      throw err;
    }
  },

  getPost: async (id: string): Promise<Post> => {
    console.log(`[communityService] getPost → GET /posts/${id}`);
    try {
      const response = await api.get<Post>(`/posts/${id}`);
      console.log('[communityService] getPost ← response', response.data);
      return response.data;
    } catch (err) {
      console.error('[communityService] getPost ← error', err);
      throw err;
    }
  },

  createPost: async (data: { content: string; destination: string; isAnonymous: boolean; commentsEnabled: boolean }): Promise<Post> => {
    console.log('[communityService] createPost → POST /posts', data);
    try {
      const response = await api.post<Post>('/posts', data);
      console.log('[communityService] createPost ← response', response.data);
      return response.data;
    } catch (err) {
      console.error('[communityService] createPost ← error', err);
      throw err;
    }
  },

  updatePost: async (id: string, data: Partial<Post>): Promise<Post> => {
    const response = await api.patch<Post>(`/posts/${id}`, data);
    return response.data;
  },

  deletePost: async (id: string): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },

  supportPost: async (id: string): Promise<void> => {
    console.log(`[communityService] supportPost → POST /posts/${id}/support`);
    try {
      await api.post(`/posts/${id}/support`);
      console.log(`[communityService] supportPost ← ok`);
    } catch (err) {
      console.error(`[communityService] supportPost ← error`, err);
      throw err;
    }
  },

  toggleComments: async (id: string, commentsEnabled: boolean): Promise<void> => {
    await api.patch(`/posts/${id}/toggle-comments`, { commentsEnabled });
  },

  reportPost: async (id: string, reason: string): Promise<void> => {
    await api.post(`/posts/${id}/report`, { reason });
  },

  // Comments
  getComments: async (postId: string): Promise<Comment[]> => {
    console.log(`[communityService] getComments → GET /posts/${postId}/comments`);
    try {
      const response = await api.get<Comment[]>(`/posts/${postId}/comments`);
      console.log('[communityService] getComments ← response', response.data);
      return response.data;
    } catch (err) {
      console.error('[communityService] getComments ← error', err);
      throw err;
    }
  },

  createComment: async (postId: string, data: { content: string; isAnonymous: boolean }): Promise<Comment> => {
    console.log(`[communityService] createComment → POST /posts/${postId}/comments`, data);
    try {
      const response = await api.post<Comment>(`/posts/${postId}/comments`, data);
      console.log('[communityService] createComment ← response', response.data);
      return response.data;
    } catch (err) {
      console.error('[communityService] createComment ← error', err);
      throw err;
    }
  },

  deleteComment: async (postId: string, commentId: string): Promise<void> => {
    await api.delete(`/posts/${postId}/comments/${commentId}`);
  },

  reportComment: async (postId: string, commentId: string, reason: string): Promise<void> => {
    await api.post(`/posts/${postId}/comments/${commentId}/report`, { reason });
  }
};
