import Dexie, { type Table } from 'dexie'
import type { Activity, Attachment, Contact, Favor } from '../types'
export class FavoresDB extends Dexie {
  favors!:Table<Favor,string>; contacts!:Table<Contact,string>; attachments!:Table<Attachment,string>; activity!:Table<Activity,string>; settings!:Table<{key:string;value:unknown},string>
  constructor(){super('favores-local');this.version(1).stores({favors:'id,status,due,person,category,priority,updated',contacts:'id,name,email',attachments:'id,favorId,added',activity:'id,favorId,at',settings:'key'})}
}
export const db=new FavoresDB()
