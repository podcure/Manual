
export interface Model {
  id: string;
  name: string;
  modelCode: string;
  manufacturer: string;
  year: string;
  category: string;
  tags?: string[];
  description?: string;
  image?: string;
  manuals?: Manual[]; // This can be derived
}

export enum ManualType {
  Service = 'Service',
  Operator = 'Operator',
  Parts = 'Parts',
  Wiring = 'Wiring',
  Other = 'Other'
}

export enum Visibility {
  Public = 'Public',
  Restricted = 'Restricted',
  AdminOnly = 'Admin-only'
}

export interface Manual {
  id: string;
  title: string;
  type: ManualType;
  version: string;
  publishedDate: string;
  language: string;
  visibility: Visibility;
  mappedMachineIds: string[];
  toc: TocItem[];
}

export interface TocItem {
  id: string;
  title: string;
  pageId: string;
  children?: TocItem[];
}

export interface PageContent {
  title: string;
  html: string;
  type: 'content' | 'procedure' | 'troubleshooting' | 'diagram';
}

export interface ProcedureDetails {
    title: string;
    tools: string[];
    parts: string[];
    warnings: string[];
    steps: { step: number; description: string }[];
    torqueSpecs: { part: string; spec: string }[];
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}

export type SearchScope = 'index' | 'page' | 'manual' | 'all-manuals';

export interface SearchResult {
  pageId: string;
  tocItemTitle: string;
  snippet: string;
  manualId: string;
  manualTitle: string;
}

// Analytics Event Types
export type AnalyticsEventName = 'page_view' | 'search_query' | 'search_result_click' | 'manual_open' | 'admin_action';

export interface PageViewPayload {
    machine_id: string;
    manual_id: string;
    page_id: string;
    chapter_title: string;
}

export interface SearchQueryPayload {
    query_text: string;
    search_scope: SearchScope;
    is_searching_all_manuals: boolean;
    machine_id: string;
}

export interface SearchResultClickPayload {
    query_text: string;
    clicked_page_id: string;
    clicked_toc_title: string;
}

export interface ManualOpenPayload {
    machine_id: string;
    manual_id: string;
    manual_title: string;
}

export interface AdminActionPayload {
    action_type: 'machine_created' | 'manual_uploaded';
    target_id: string;
}

// Maps event names to payload types
export interface EventPayloadMap {
    'page_view': PageViewPayload;
    'search_query': SearchQueryPayload;
    'search_result_click': SearchResultClickPayload;
    'manual_open': ManualOpenPayload;
    'admin_action': AdminActionPayload;
}

export type EventPayload<T extends AnalyticsEventName> = EventPayloadMap[T];

export interface AnalyticsEvent {
    event_name: AnalyticsEventName;
    timestamp: string;
    user_id: string;
    session_id: string;
    context: {
        device: string;
        browser: string;
    };
    payload: EventPayload<AnalyticsEventName>;
}

// --- Admin / Settings Types ---

export type UserRole = 'Super Admin' | 'Billing Admin' | 'Technician' | 'Read-only';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: 'Active' | 'Invited' | 'Deactivated';
    lastLogin: string;
    avatar?: string;
}

export interface PlanFeature {
    name: string;
    included: boolean;
    limit?: string | number;
    tooltip?: string;
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    slug: 'basic' | 'standard' | 'enterprise';
    priceMonthly: number;
    priceYearly: number;
    description: string;
    features: PlanFeature[];
    machineLimit: number;
    userLimit: number;
    isPopular?: boolean;
}

export interface Invoice {
    id: string;
    number: string;
    date: string;
    amount: number;
    status: 'Paid' | 'Overdue' | 'Pending';
    pdfUrl: string;
    items: string[];
}

export interface AuditLogEntry {
    id: string;
    action: string;
    user: string;
    userRole: string;
    target: string;
    timestamp: string;
    ipAddress: string;
    status: 'Success' | 'Failed';
}

export interface BrandingConfig {
    productName: string;
    primaryColor: string;
    accentColor: string;
    logoUrl: string;
    faviconUrl?: string;
    loginBackgroundUrl?: string;
    customDomain?: string;
}
