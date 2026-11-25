# FAVORES

PWA persoal para anotar favores e compromisos. Os datos gárdanse no navegador deste dispositivo mediante IndexedDB; non hai conta nin servidor de datos. A versión publicada con GitHub Pages non ofrece sincronización automática nin notificacións push coa aplicación pechada.

## Uso e transferencia entre dispositivos

1. En **Configuración → Transferencia manual entre dispositivos**, exporta o ficheiro JSON.
2. Pásao ao outro dispositivo mediante Arquivos, iCloud Drive, AirDrop ou outro método privado.
3. Abre Favores nese dispositivo e importa o JSON desde a mesma sección.
4. A importación fusiona por identificador: se un favor xa existe, os seus campos actualízanse cos valores do ficheiro. Exporta primeiro os dous dispositivos se queres conservar ambas as versións.

O ficheiro contén favores, contactos, categorías e actividade. **Non contén documentos anexos nin a configuración local de cifrado.** Os anexos deben transferirse por separado; os documentos cifrados só se poden abrir na instalación que conserva a súa chave. As subscricións e permisos tampouco se transfiren. Non importes copias de orixe descoñecida.

## Funcións

- Inicio con compromisos de hoxe, atrasados e próximos sete días.
- Favores con solicitante, ámbito, categoría, prazo, prioridade, estado, notas, subtarefas e datos necesarios.
- Axenda interna de contactos e categorías personalizables.
- Calendario mensual, filtros, busca e arquivo.
- Anexos locais, con cifrado AES-GCM opcional mediante un contrasinal que só conserva o usuario.
- Datas de recordatorio anotadas na ficha. GitHub Pages non pode programar nin enviar avisos co navegador pechado.
- Resumo compartible de texto, sen notas nin anexos.
- Atallos: `⌘/Ctrl+N` para novo favor, `⌘/Ctrl+F` para buscar e `Escape` para pechar.

## Desenvolvemento local

Necesitas Node.js 20.19+ ou 22.12+ e npm.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

O contido compilado xérase en `dist/`. A PWA require HTTPS para instalarse e usar o service worker (agás `localhost`).

## Publicación en GitHub Pages

O workflow de GitHub Actions deste repositorio compila e publica `dist/` en cada envío á rama `main`. No repositorio, abre **Settings → Pages** e selecciona **GitHub Actions** como fonte de publicación. Tamén se pode iniciar desde **Actions → Deploy to GitHub Pages → Run workflow**.

GitHub Pages gratuíto require que o repositorio sexa público. O código fonte publicarase, pero os datos locais non forman parte do repositorio nin se transmiten a GitHub. Non engadas ficheiros de datos, copias JSON, `.env` nin anexos ao repositorio. Para cambiar de dispositivo, usa a transferencia manual descrita arriba.

## Almacenamento e privacidade

Os datos e anexos gárdanse no almacenamento do navegador deste dispositivo. Borrar os datos do sitio, cambiar de navegador ou perder o dispositivo pode eliminar rexistros. Exporta transferencias con frecuencia e gárdaas nun lugar privado. O navegador pode eliminar datos locais se queda sen espazo. Non hai analítica nin publicidade.

Os anexos non se inclúen no JSON. Sen activar cifrado, gárdanse localmente sen cifrar. Co cifrado activo, Web Crypto AES-GCM protexe o contido; PBKDF2-SHA-256 deriva a chave do contrasinal. O contrasinal non se garda nin se transmite. Se o esqueces, os anexos cifrados non se recuperan. Os nomes e tamaños dos ficheiros seguen visibles localmente. A implementación non foi auditada externamente e non substitúe unha bóveda especializada.

## Esquema local

Dexie crea a base IndexedDB `favores-local`, versión 1, coas táboas de favores, contactos, anexos, actividade e configuración. As actualizacións futuras deben incrementar a versión e incluír unha migración sen borrar a base existente. Os anexos son blobs locais. A exportación JSON inclúe favores, contactos, categorías e actividade, pero non anexos nin configuración local.

## Limitacións

- A transferencia é manual e fusiona os datos mediante ficheiro; non existe sincronización en tempo real.
- Non hai notificacións push nin avisos programados pola plataforma; as datas quedan anotadas na ficha do favor.
- Os datos son independentes por navegador e dispositivo.
- Non se afirma compatibilidade física comprobada con iPhone, iPad ou Mac ata probalos neses dispositivos.
