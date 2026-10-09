import type { User, Workspace, Session } from './types'

export interface AuthAdapter {
  /** Send OTP to phone or email */
  requestOtp(identifier: string, channel: 'sms' | 'email'): Promise<{ success: boolean; message: string }>
  /** Verify OTP code */
  verifyOtp(identifier: string, code: string): Promise<{ success: boolean; token?: string }>
  /** Sign up with verified OTP + profile info */
  signUp(data: SignUpData): Promise<{ success: boolean; user?: User; workspace?: Workspace }>
  /** Sign in with phone/email + password (for future OIDC) */
  signIn(identifier: string, password: string): Promise<{ success: boolean; session?: Session }>
  /** Sign out */
  signOut(): Promise<void>
  /** Get current session */
  getSession(): Promise<Session | null>
}

export interface SignUpData {
  identifier: string
  otp: string
  name: string
  businessType: 'restaurant' | 'school' | 'other'
  workspaceName: string
}

// ─── Mock adapter ─────────────────────────────────────────────
// TODO(auth-provider): Replace with real OIDC provider (Clerk, Auth0, Supabase, etc.)

const MOCK_DELAY = 600

const mockDb = {
  users: [] as (User & { password?: string })[],
  sessions: new Map<string, Session>(),
}

async function delay(ms = MOCK_DELAY) {
  return new Promise((r) => setTimeout(r, ms))
}

export const mockAdapter: AuthAdapter = {
  async requestOtp(identifier, _channel) {
    await delay()
    // In production: call actual OTP service
    console.info(`[mock] OTP requested for ${identifier}`)
    return { success: true, message: `OTP sent to ${identifier}` }
  },

  async verifyOtp(identifier, code) {
    await delay()
    // Demo: accept any 6-digit code
    if (code.length === 6 && /^\d{6}$/.test(code)) {
      return { success: true, token: 'mock-token-' + Date.now() }
    }
    return { success: false, message: 'Invalid code' }
  },

  async signUp(data) {
    await delay()
    const user: User = {
      id: 'usr_' + Math.random().toString(36).slice(2, 9),
      name: data.name,
      phone: data.identifier.includes('@') ? undefined : data.identifier,
      email: data.identifier.includes('@') ? data.identifier : undefined,
      vyapoId: 'vy_' + Math.random().toString(36).slice(2, 8),
      createdAt: new Date().toISOString(),
    }
    const workspace: Workspace = {
      id: 'ws_' + Math.random().toString(36).slice(2, 9),
      name: data.workspaceName,
      type: data.businessType,
      ownerId: user.id,
      createdAt: new Date().toISOString(),
    }
    mockDb.users.push({ ...user, password: undefined })
    return { success: true, user, workspace }
  },

  async signIn(_identifier, _password) {
    await delay()
    // Not implemented in mock
    return { success: false }
  },

  async signOut() {
    await delay()
    return
  },

  async getSession() {
    await delay(200)
    return null
  },
}
