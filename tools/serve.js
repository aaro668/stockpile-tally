const http=require('http'),fs=require('fs'),path=require('path');const root=process.argv[2]||path.join(__dirname,'..');
http.createServer((q,r)=>{let f=path.join(root,decodeURIComponent(q.url.split('?')[0]));if(f.endsWith(path.sep)||f===root)f=path.join(f,'index.html');
fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end();}r.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});r.end(d);});}).listen(8765,()=>console.log('ready'));
