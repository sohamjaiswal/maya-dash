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