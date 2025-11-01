
import { Role, TaskStatus } from './constants';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  memberships: OrgMembership[];
}

export interface Org {
  id: string;
  name: string;
  slug: string;
}

export interface OrgMembership {
  orgId: string;
  role: Role;
}

export interface Task {
  id: string;
  orgId: string;
  temporalWorkflowId: string;
  title: string;
  status: TaskStatus;
  payload: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  history: TaskHistoryItem[];
}

export interface TaskHistoryItem {
    id: string;
    action: 'created' | 'approved' | 'rejected';
    user: { id: string, name: string };
    timestamp: string;
    comment?: string;
}

export interface AuditLog {
  id: string;
  orgId: string;
  actor: { id: string; name: string };
  action: string;
  target: { type: string; id: string };
  meta?: Record<string, any>;
  createdAt: string;
}

export type Page = 'inbox' | 'audit' | 'settings';

export type ClientType = 'cloud' | 'self_hosted';

export interface TemporalConnection {
  id: string;
  orgId: string;
  displayName: string;
  target: string;
  clientType: ClientType;
}
