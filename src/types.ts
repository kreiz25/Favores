export type Status = 'pending'|'doing'|'waiting'|'done'|'archived'
export type Scope = 'Persoal'|'Profesional'|'Outros'
export type Priority = 'Baixa'|'Normal'|'Alta'|'Urxente'
export interface Subtask { id:string; text:string; done:boolean; due?:string }
export interface NeededData { id:string; text:string; note?:string; received:boolean }
export interface Attachment { id:string; favorId:string; name:string; type:string; size:number; added:string; blob:Blob; encrypted?:boolean; iv?:string }
export type ReminderFrequency='daily'|'weekly'|'monthly'
export interface Reminder { id:string; dueAt:string; state:'scheduled'|'sent'|'cancelled'|'error'; created:string; seriesId?:string; sequence?:number; seriesTotal?:number; frequency?:ReminderFrequency }
export interface Favor { id:string; title:string; person:string; scope:Scope; category:string; requested:string; due:string; dueTime?:string; priority:Priority; status:Status; notes:string; subtasks:Subtask[]; needed:NeededData[]; created:string; updated:string; completed?:string; reminders:Reminder[] }
export interface Category { id:string; name:string; color:string; icon:string }
export interface Contact { id:string; name:string; organization?:string; phone?:string; email?:string; notes?:string }
export interface Activity { id:string; favorId:string; text:string; at:string }
export type Section='home'|'favores'|'calendar'|'archive'|'settings'
