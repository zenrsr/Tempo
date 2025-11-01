import { User, Org, Task, AuditLog, TemporalConnection } from '../types';
import { Role, TaskStatus } from '../constants';

export const ORGS: Org[] = [
  { id: 'org_1', name: 'Acme Inc.', slug: 'acme' },
  { id: 'org_2', name: 'Stark Industries', slug: 'stark' },
  { id: 'org_3', name: 'Wayne Enterprises', slug: 'wayne' },
];

export const USERS: User[] = [
  {
    id: 'user_1',
    name: 'Alice Johnson',
    email: 'alice@tempo.app',
    avatarUrl: 'https://i.pravatar.cc/150?u=user_1',
    memberships: [
      { orgId: 'org_1', role: Role.Owner },
      { orgId: 'org_2', role: Role.Viewer },
    ],
  },
  {
    id: 'user_2',
    name: 'Bob Williams',
    email: 'bob@tempo.app',
    avatarUrl: 'https://i.pravatar.cc/150?u=user_2',
    memberships: [
      { orgId: 'org_1', role: Role.Approver },
      { orgId: 'org_2', role: Role.Admin },
      { orgId: 'org_3', role: Role.Viewer },
    ],
  },
   {
    id: 'user_3',
    name: 'Charlie Brown',
    email: 'charlie@tempo.app',
    avatarUrl: 'https://i.pravatar.cc/150?u=user_3',
    memberships: [
      { orgId: 'org_1', role: Role.Viewer },
      { orgId: 'org_3', role: Role.Approver },
    ],
  },
];

const now = new Date();
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);


export const TASKS: Task[] = [
  {
    id: 'task_1',
    orgId: 'org_1',
    temporalWorkflowId: 'wf-expense-report-001',
    title: 'Approve expense report #ER-12345 for $5,430.12',
    status: TaskStatus.Pending,
    payload: {
      reportId: 'ER-12345',
      amount: 5430.12,
      currency: 'USD',
      submitter: 'David Lee',
      items: [
        { description: 'Flight to NYC', amount: 850.00 },
        { description: 'Hotel (4 nights)', amount: 1200.50 },
        { description: 'Client Dinner', amount: 350.62 },
        { description: 'Software Subscription', amount: 3029.00 },
      ],
    },
    createdAt: yesterday.toISOString(),
    updatedAt: yesterday.toISOString(),
    history: [
        { id: 'hist_1_1', action: 'created', user: { id: 'user_system', name: 'System' }, timestamp: yesterday.toISOString() }
    ]
  },
  {
    id: 'task_2',
    orgId: 'org_1',
    temporalWorkflowId: 'wf-new-hire-onboarding-002',
    title: 'Onboard new hire: Sarah Connor',
    status: TaskStatus.Approved,
    payload: {
      candidateId: 'CAND-9876',
      name: 'Sarah Connor',
      position: 'Senior Engineer',
      startDate: '2024-08-01',
      manager: 'Bob Williams'
    },
    createdAt: twoDaysAgo.toISOString(),
    updatedAt: yesterday.toISOString(),
    history: [
        { id: 'hist_2_1', action: 'created', user: { id: 'user_system', name: 'System' }, timestamp: twoDaysAgo.toISOString() },
        { id: 'hist_2_2', action: 'approved', user: { id: 'user_2', name: 'Bob Williams' }, timestamp: yesterday.toISOString(), comment: 'Looks good, welcome aboard!' }
    ]
  },
  {
    id: 'task_3',
    orgId: 'org_2',
    temporalWorkflowId: 'wf-po-approval-003',
    title: 'Purchase Order #PO-ACME-555 for new servers',
    status: TaskStatus.Rejected,
    payload: {
      poNumber: 'PO-ACME-555',
      vendor: 'Dell',
      amount: 85000.00,
      currency: 'USD',
      items: [
        { sku: 'POWEREDGE-R750', quantity: 10 },
      ]
    },
    createdAt: lastWeek.toISOString(),
    updatedAt: twoDaysAgo.toISOString(),
    history: [
        { id: 'hist_3_1', action: 'created', user: { id: 'user_system', name: 'System' }, timestamp: lastWeek.toISOString() },
        { id: 'hist_3_2', action: 'rejected', user: { id: 'user_2', name: 'Bob Williams' }, timestamp: twoDaysAgo.toISOString(), comment: 'Budget exceeded. Please re-submit with a revised quote.' }
    ]
  },
  {
    id: 'task_4',
    orgId: 'org_1',
    temporalWorkflowId: 'wf-access-request-004',
    title: 'Grant database access for `dev-team` to `customer_pii`',
    status: TaskStatus.Pending,
    payload: {
      team: 'dev-team',
      resource: 'customer_pii',
      requestedBy: 'Charlie Brown',
      justification: 'Need access for new feature development for Q3 roadmap.'
    },
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    history: [
        { id: 'hist_4_1', action: 'created', user: { id: 'user_system', name: 'System' }, timestamp: now.toISOString() }
    ]
  },
    {
    id: 'task_5',
    orgId: 'org_3',
    temporalWorkflowId: 'wf-content-publish-005',
    title: 'Publish blog post: "The Future of AI"',
    status: TaskStatus.Pending,
    payload: {
      title: 'The Future of AI',
      author: 'Jane Doe',
      publishDate: '2024-07-28',
      platform: 'Company Blog'
    },
    createdAt: yesterday.toISOString(),
    updatedAt: yesterday.toISOString(),
     history: [
        { id: 'hist_5_1', action: 'created', user: { id: 'user_system', name: 'System' }, timestamp: yesterday.toISOString() }
    ]
  }
];


export const AUDIT_LOGS: AuditLog[] = [
  {
    id: 'audit_1',
    orgId: 'org_1',
    actor: { id: 'user_1', name: 'Alice Johnson' },
    action: 'user.login',
    target: { type: 'user', id: 'user_1' },
    createdAt: now.toISOString(),
    meta: { ip: '192.168.1.1', userAgent: 'Chrome/125.0.0.0' }
  },
  {
    id: 'audit_2',
    orgId: 'org_2',
    actor: { id: 'user_2', name: 'Bob Williams' },
    action: 'task.rejected',
    target: { type: 'task', id: 'task_3' },
    createdAt: twoDaysAgo.toISOString(),
    meta: { comment: 'Budget exceeded. Please re-submit with a revised quote.' }
  },
  {
    id: 'audit_3',
    orgId: 'org_1',
    actor: { id: 'user_2', name: 'Bob Williams' },
    action: 'task.approved',
    target: { type: 'task', id: 'task_2' },
    createdAt: yesterday.toISOString(),
    meta: { comment: 'Looks good, welcome aboard!' }
  },
  {
    id: 'audit_4',
    orgId: 'org_1',
    actor: { id: 'user_1', name: 'Alice Johnson' },
    action: 'settings.updated',
    target: { type: 'org', id: 'org_1' },
    createdAt: yesterday.toISOString(),
    meta: { changes: { 'sso_provider': 'okta' } }
  },
];

export const TEMPORAL_CONNECTIONS: TemporalConnection[] = [
    {
        id: 'conn_1',
        orgId: 'org_1',
        displayName: 'Acme Production',
        target: 'acme-prod.tmprl.cloud:7233',
        clientType: 'cloud',
    },
    {
        id: 'conn_2',
        orgId: 'org_1',
        displayName: 'Acme Staging',
        target: 'acme-staging.tmprl.cloud:7233',
        clientType: 'cloud',
    },
    {
        id: 'conn_3',
        orgId: 'org_2',
        displayName: 'Stark Industries Mainframe',
        target: '10.0.1.23:7233',
        clientType: 'self_hosted',
    }
];
