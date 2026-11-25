const ITERATIONS = 310_000
const CHECK_TEXT = 'FAVORES-ATTACHMENT-KEY-v1'
export interface AttachmentCryptoConfig { version:1; salt:string; checkIv:string; checkCipher:string; iterations:number }
export interface EncryptedPayload { blob:Blob; iv:string }
const toBase64=(data:Uint8Array)=>{let binary='';for(let i=0;i<data.length;i+=0x8000)binary+=String.fromCharCode(...data.subarray(i,i+0x8000));return btoa(binary)}
const fromBase64=(text:string)=>Uint8Array.from(atob(text),c=>c.charCodeAt(0))

async function derive(password:string,salt:Uint8Array<ArrayBuffer>,iterations=ITERATIONS):Promise<CryptoKey>{
 const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveKey'])
 return crypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt,iterations},material,{name:'AES-GCM',length:256},false,['encrypt','decrypt'])
}
export async function createAttachmentKey(password:string){
 if(typeof crypto==='undefined'||!crypto.subtle)throw new Error('Web Crypto non está dispoñible neste navegador')
 const salt=crypto.getRandomValues(new Uint8Array(16)),key=await derive(password,salt),checkIv=crypto.getRandomValues(new Uint8Array(12))
 const check=await crypto.subtle.encrypt({name:'AES-GCM',iv:checkIv},key,new TextEncoder().encode(CHECK_TEXT))
 return {key,config:{version:1 as const,salt:toBase64(salt),checkIv:toBase64(checkIv),checkCipher:toBase64(new Uint8Array(check)),iterations:ITERATIONS}}
}
export async function unlockAttachmentKey(password:string,config:AttachmentCryptoConfig){
 try{const key=await derive(password,fromBase64(config.salt),config.iterations),plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:fromBase64(config.checkIv)},key,fromBase64(config.checkCipher));if(new TextDecoder().decode(plain)!==CHECK_TEXT)throw new Error();return key}
 catch{throw new Error('O contrasinal non é correcto ou a comprobación está danada')}
}
export async function encryptAttachment(blob:Blob,key:CryptoKey):Promise<EncryptedPayload>{
 const iv=crypto.getRandomValues(new Uint8Array(12)),clear=await blob.arrayBuffer(),cipher=await crypto.subtle.encrypt({name:'AES-GCM',iv},key,clear)
 return {blob:new Blob([cipher],{type:'application/octet-stream'}),iv:toBase64(iv)}
}
export async function decryptAttachment(blob:Blob,iv:string,key:CryptoKey,mimeType:string){
 try{const clear=await crypto.subtle.decrypt({name:'AES-GCM',iv:fromBase64(iv)},key,await blob.arrayBuffer());return new Blob([clear],{type:mimeType||'application/octet-stream'})}
 catch{throw new Error('Non se puido descifrar o anexo; comproba a chave e a integridade do ficheiro')}
}
