/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId =
  | 'home'
  | 'committee'
  | 'meeting-notes'
  | 'become-member'
  | 'about-sumner'
  | 'news-events'
  | 'civil-defence'
  | 'sumner-hub'
  | 'community-van';

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  email?: string;
  image?: string;
  imagePosition?: string;
}

export interface MeetingMinutes {
  id: string;
  date: string; // e.g. "May 2025"
  summary: string;
  pdfUrl?: string;
}

export interface CommunityEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  time: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
}

export interface NewsItem {
  id: string;
  headline: string;
  publishedDate: string;
  summary: string;
  linkText?: string;
}

export interface HubActivity {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface VanBooking {
  name: string;
  groupName: string;
  email: string;
  phone: string;
  kms: number;
  overnight: boolean;
  startDate: string;
  notes: string;
}
