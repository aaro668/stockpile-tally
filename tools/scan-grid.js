const fs=require('fs');const s=JSON.parse(fs.readFileSync(process.argv[2]));const FT=0.3048;
const b=s.base; const o=b[0]; const ux=[b[1][0]-o[0],b[1][2]-o[2]],L=Math.hypot(...ux),u=[ux[0]/L,ux[1]/L];
const g=b.reduce((a,p)=>a+p[1],0)/b.length;
const pts=s.surf.map(p=>{const d=[p[0]-o[0],p[2]-o[2]];return {a:(d[0]*u[0]+d[1]*u[1])/FT,c:(-d[0]*u[1]+d[1]*u[0])/FT,h:(p[1]-g)/FT};});
const sg=Math.sign(pts.reduce((s,p)=>s+p.c,0));pts.forEach(p=>p.c*=sg);
// height histogram
const hb={};pts.forEach(p=>{const k=Math.floor(p.h);hb[k]=(hb[k]||0)+1;});console.log('height histogram (ft: count)',JSON.stringify(hb));
// grid of 75th pct heights, 2ft cells
const cells={};pts.forEach(p=>{const k=Math.floor(p.a/2)+','+Math.floor(p.c/2);(cells[k]=cells[k]||[]).push(p.h);});
const pct=(a,q)=>{a=[...a].sort((x,y)=>x-y);return a[Math.floor((a.length-1)*q)];};
const A=Object.keys(cells).map(k=>k.split(',').map(Number));const amin=Math.min(...A.map(x=>x[0])),amax=Math.max(...A.map(x=>x[0])),cmin=Math.min(...A.map(x=>x[1])),cmax=Math.max(...A.map(x=>x[1]));
console.log('75th pct height (ft) on 2 ft grid; rows = across width, cols = along length; n=count');
for(let c=cmin;c<=cmax;c++){let row=String(c*2).padStart(4)+' |';for(let a=amin;a<=amax;a++){const v=cells[a+','+c];row+=v?(pct(v,.75).toFixed(1)+'/'+v.length).padStart(9):'        .';}console.log(row);}
// how many points on each side's wall plane vs elsewhere
console.log('points:',pts.length);
