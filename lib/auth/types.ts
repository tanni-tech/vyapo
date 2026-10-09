export interface User {
  id: string
  name: string
  email?: string
  phone?: string
  vyapoId: string
  createdAt: string
}

export interface Workspace {
  id: string
  name: string
  type: 'restaurant' | 'school' | 'other'
  ownerId: string
  createdAt: string
}

export type MembershipRole = 'owner' | 'staff' | 'viewer'

export interface Membership {
  id: string
  userId: string
  workspaceId: string
  role: MembershipRole
  joinedAt: string
}

export interface Session {
  user: User
  activeWorkspace: Workspace
  memberships: Membership[]
}
