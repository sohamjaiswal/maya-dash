export interface LimitedServer {
  name: string
  avatar: string
  banner: string
}
export interface PropahServa {
  id: string
  name: string
  avatar: string
  banner: string
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
  partner_status: boolean
  settings: {
    economy_type: 'global'
    log_actions_channel?: string
    log_enabled: boolean
    log_events_channel?: string
    log_traffic_channel?: string
    prefix: string
    welcome_channel?: string
    welcome_channel_enabled: boolean
    welcome_message?: string
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
  badges: any[];
  banner?: string;
  name: string;
  nickname?: string;
  position: number;
  roles: Record<string, MemberRole>;
  serverPermissions: string[];
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
  badges: any[];
  banner?: string;
  name: string;
  nickname?: string;
  position: number;
  roles: RoleData[];
  serverPermissions: string[];
}

export type MembersData = MemberData[];