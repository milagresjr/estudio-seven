// API Type Definitions matching Laravel Backend

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: number;
  user_id: number;
  avatar_url?: string;
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  social_links?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: number;
  user_id: number;
  role: 'admin' | 'moderator' | 'user';
  created_at: string;
  updated_at: string;
}

export interface Project {
  id?: number; 
  title: string;
  slug?: string;
  category: string;
  description?: string;
  partner?: string;
  genre?: string;
  format?: string;
  year?: number;
  thumbnail_url?: File | null;
  featured?: boolean;
  display_order?: number;
  status: 'draft' | 'published' | 'archived';
  is_published?: 0 | 1 ;
  created_at?: string;
  updated_at?: string;
  media?: ProjectMedia[];
}

export interface ProjectMedia {
  id: number;
  project_id: number;
  file_type: 'image' | 'video';
  file_url: string;
  title?: string;
  caption?: string;
  display_order: number;
  created_at: string;
  updated_at: string;   
}

export interface Message {
  id: string;
  sender_name: string;
  sender_email: string;
  phone?: string;
  subject?: string;
  content: string;
  is_read: boolean;
  is_starred: boolean;
  replied_at?: string;
  created_at: string;
  updated_at: string;
}

export interface StudioSettings {
  id: number;
  studio_name: string;
  tagline?: string;
  description?: string;
  bio?: string;
  contact_email?: string;
  phone?: string;
  address?: string;
  logo_url?: string;
  instagram?: string;
  youtube?: string;
  vimeo?: string;
  behance?: string;
  linkedin?: string;
  social_links?: {
    instagram?: string;
    youtube?: string;
    vimeo?: string;
    behance?: string;
    linkedin?: string;
    facebook?: string;
    twitter?: string;
  };
  email_notifications?: boolean;
  new_message_alert?: boolean;
  weekly_report?: boolean;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  created_at: string;
  updated_at: string;
}

// Request/Response types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface CreateProjectRequest {
  title: string;
  category: string;
  description?: string;
  thumbnail_url?: string;
  partner?: string;
  genre?: string;
  format?: string;
  year?: number;
  featured?: boolean;
  status?: 'draft' | 'published' | 'archived';
}

export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {
  display_order?: number;
}

export interface CreateMessageRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface UpdateMessageRequest {
  is_read?: boolean;
  is_starred?: boolean;
  replied_at?: string;
}

export interface CreateStudioSettingsRequest {
  studio_name?: string;
  tagline?: string;
  description?: string;
  bio?: string;
  email?: string;
  phone?: string;
  address?: string;
  instagram?: string;
  youtube?: string;
  vimeo?: string;
  behance?: string;
  linkedin?: string;
  social_links?: StudioSettings['social_links'];
  email_notifications?: boolean;
  new_message_alert?: boolean;
  weekly_report?: boolean;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
}

export interface CreateUserRoleRequest {
  user_id: number;
  role: 'admin' | 'moderator' | 'user';
}

export interface UpdateUserRoleRequest {
  role: 'admin' | 'moderator' | 'user';
}
