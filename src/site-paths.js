export function normalizeBasePath(value=''){
 const path=String(value).replace(/^\/+|\/+$/g,'');
 if(path&&!/^[a-zA-Z0-9_/-]+$/.test(path))throw new Error('Invalid site base path');
 return path?`/${path}`:'';
}
export function withBasePath(html,basePath=''){
 const base=normalizeBasePath(basePath);
 return base?html.replace(/\b(href|src)="\/(?!\/)/g,`$1="${base}/`):html;
}
export function routeFromPath(pathname,basePath=''){
 const base=normalizeBasePath(basePath);
 const path=base&&(pathname===base||pathname.startsWith(base+'/'))?pathname.slice(base.length):pathname;
 return path.replace(/^\/+|\/+$/g,'');
}
