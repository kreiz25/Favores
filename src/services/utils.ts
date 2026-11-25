import type { Favor } from '../types'
export const id=()=>crypto.randomUUID()
export const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())
export const dateLabel=(v:string)=>v?new Intl.DateTimeFormat('gl-ES',{timeZone:'Europe/Madrid',day:'numeric',month:'short',year:'numeric'}).format(new Date(v+'T12:00:00Z')):'Sen prazo'
export const isOpen=(f:Favor)=>!['done','archived'].includes(f.status)
export const isLate=(f:Favor)=>isOpen(f)&&!!f.due&&f.due<today()
export const daysLeft=(f:Favor)=>f.due?Math.ceil((new Date(f.due+'T12:00:00').getTime()-new Date(today()+'T12:00:00').getTime())/86400000):9999
export const progress=(f:Favor)=>f.subtasks.length?Math.round(f.subtasks.filter(x=>x.done).length/f.subtasks.length*100):0
export const statusLabel=(s:Favor['status'])=>({pending:'Pendente',doing:'En curso',waiting:'Agardando',done:'Finalizado',archived:'Arquivado'}[s])
export function download(name:string,blob:Blob){const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
