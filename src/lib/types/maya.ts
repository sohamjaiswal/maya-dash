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
  advertisement_toggle: boolean
  logs_toggle: boolean
  log_traffic_channel?: string
  log_events_channel?: string
  log_actions_channel?: string
  prefix: string
  server_id: string
  tags: string[]
  welcome_channel?: string
  welcome_banner_toggle: boolean
  welcome_message?: string,
  welcome_message_toggle: boolean
  welcome_thumbnail_toggle: boolean
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

export type AdvertisedServer = {
  avatar: string;
  banner: string;
  id: string;
  name: string;
  members: number;
  time: number;
  time_display: string;
  upvotes: number;
  url: string;
};