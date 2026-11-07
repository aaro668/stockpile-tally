const fs=require('fs');const s=JSON.parse(fs.readFileSync(process.argv[2]));
const {scanVolume}=require('../tests/geom.js');
console.log('depth',s.depth,'ua',s.ua.slice(0,90)); console.log('counts base',s.base.length,'surf',s.surf.length,'ref',s.ref.length,'cams',s.cams.length,'refTape',s.refTapeFt);
const FT=0.3048, f=v=>(v/FT).toFixed(2);
// fit plane
const r=scanVolume(s.base,s.surf); console.log('vol m3',r.vol.toFixed(2),'yd3',(r.vol/0.7646).toFixed(2),'area ft2',(r.area/FT/FT).toFixed(1),'maxH ft',f(r.maxH),'relief ft',f(r.relief),'nSurf',r.nSurf);
console.log('base (ft x,y,z):'); s.base.forEach(p=>console.log('  ',p.map(f).join(', ')));
// base edge lengths in plan order
const P=r.poly; for(let i=0;i<P.length;i++){const a=P[i],b=P[(i+1)%P.length]; console.log('  edge',i,f(Math.hypot(a.x-b.x,a.y-b.y)),'ft');}
// surface points: height above plane and plan location
const base=s.base; let A=0;
console.log('surf (x,z ft, h ft):');
// compute plane quickly
const n=base.length; let sx=0,sz=0,sy=0; base.forEach(p=>{sx+=p[0];sy+=p[1];sz+=p[2]}); 
s.surf.forEach(p=>console.log('  ',f(p[0]),f(p[2]),'h',f(p[1]-sy/n)));
console.log('cams y ft (phone height above base mean):', s.cams.slice(0,40).map(c=>f(c[1]-sy/n)).join(' '));
