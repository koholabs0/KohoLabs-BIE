

export type Platform = 'tiktok' | 'instagram' | 'youtube';
export type CampaignStatus = 'draft' | 'open' | 'paused' | 'closed';
export type JoinStatus = 'joined' | 'window_assigned' | 'proof_submitted' | 'pending_review' | 'qualified' | 'extended' | 'disqualified' | 'payout_requested' | 'paid';
export type SubmissionStatus = 'pending_review' | 'qualified' | 'extended' | 'disqualified' | 'paid';
export type Role = 'creator' | 'brand' | 'admin';

export interface User {
  user_id: string;
  email: string;
  name: string;
  role: Role;
  created_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Campaign {
  campaign_id: string;
  owner_id: string; // Added for ownership
  title: string;
  brand_name: string;
  platforms: Platform[];
  target_url: string; // The destination for the affiliate link
  budget_total: number;
  slots_total: number;
  slots_filled: number;
  total_clicks: number; // Aggregate impact
  base_pay_min: number;
  base_pay_max: number;
  starts_at: string;
  ends_at: string;
  status: CampaignStatus;
  brief: {
    objective: string;
    content_instructions: string;
    cta: string;
    hashtags: string[];
    do_not: string[];
  };
  payout_policy: {
    base_pay_amount: number;
    extension_policy: { enabled: boolean; extension_hours: number };
  };
  posting_windows: Array<{ date: string; start: string; end: string }>;
}

export interface CampaignJoin {
  join_id: string;
  campaign_id: string;
  user_id: string; // Added for ownership
  title: string;
  brand_name: string;
  status: JoinStatus;
  assigned_window?: {
    date: string;
    start: string;
    end: string;
  };
  ends_at: string;
  extension_count: number;
  affiliate_link: string;
  clicks: number; // Individual impact
}

export interface Submission {
  submission_id: string;
  join_id: string;
  campaign_id: string;
  user_id: string; // Added for ownership
  clipper_handle: string;
  post_url: string;
  status: SubmissionStatus;
  views_24h_claimed: number;
  views_24h_verified?: number;
  admin_notes?: string; // Added for rejection/extension reasons
  proof_screenshot_path: string;
  assigned_window_text: string;
  created_at: string;
}

export interface PayoutRequest {
  payout_request_id: string;
  join_id: string;
  campaign_id: string;
  user_id: string; // Added for ownership
  amount: number;
  status: 'queued' | 'paid' | 'rejected';
  created_at: string;
}

export interface ApiResponse<T> {
  ok: boolean;
  data: T | null;
  error: { code: string; message: string } | null;
}
