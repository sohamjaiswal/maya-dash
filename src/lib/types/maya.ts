export interface LimitedServer {
  name: string
  avatar: string
  banner: string
  url: string
}
export interface PropahServa {
  id: string
  name: string
  avatar: string
  banner: string
  url: string
}
export type ServersRecord = {
  [key: string]: LimitedServer
}
export interface LimitedUser {
  name: string
  avatar: string
  banner: string
}
export type UsersRecord = {
  [key: string]: LimitedUser  
}
export interface ServerSettings {
  dashboard_data: {
    bump_count: number
    bump_enabled: boolean
    bump_position?: number
    bump_tags: string[]
    bump_time: number
    upvotes: number
  },
  partner_status: boolean
  economy_type: 'global'
  log_actions_channel?: string
  log_enabled: boolean
  log_events_channel?: string
  log_traffic_channel?: string
  prefix: string
  welcome_channel?: string
  welcome_channel_enabled: boolean
  welcome_message?: string,
  welcome_banner_enabled: boolean
  channels: {
    [key: string]: {
      name: string
    }
  }
}

export interface AuditElement {
  action: "Kick" | "Ban"
  time: number
  user: {
    avatar: string
    id: string
    name: string
  }
  victim: {
    avatar: string
    id: string
    name: string
  }
}

export type AuditRecords = {
  [key: number]: AuditElement
}

export interface MemberRole {
  name: string;
  position: number;
}

export interface MemberRecord {
  avatar?: string;
  name: string;
}

export type MembersRecord = {
  [key: string]: MemberRecord;
}

export interface RoleData {
  roleId: string;
  name: string;
  position: number;
}

export interface MemberData {
  id: string;
  avatar?: string;
  name: string;
}

export type MembersData = MemberData[];

export interface StaffResData {
  avatar: string;
  name: string;
  bio: string;
  banner: string;
}
export interface StaffRecord {
  [key: string]: StaffResData;
}
export interface StaffResRec {
  devs: StaffRecord;
  managers: StaffRecord;
  staff: StaffRecord;
}
export interface StaffData {
  id: string;
  avatar: string;
  name: string;
  bio: string;
  banner: string;
}