const {scanVolume}=require('./geom.js');
let seed=11; const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647; const n=()=> (rnd()+rnd()+rnd()-1.5)*0.03;
// 3 m x 1.5 m x 1 m box (4.5 m3), toe tapped at corners + mid-sides, noisy top + walls seen from outside
const L=3,Wd=1.5,H=1; const base=[[0,0,0],[1.5,0,0],[3,0,0],[3,0,0.75],[3,0,1.5],[1.5,0,1.5],[0,0,1.5],[0,0,0.75]].map(p=>[p[0]+n(),p[1]+n()/3,p[2]+n()]);
const surf=[];
for(let x=0.02;x<L;x+=0.05)for(let z=0.02;z<Wd;z+=0.05) surf.push([x+n(),H+n(),z+n()]);              // top
for(let x=0;x<L;x+=0.05)for(let y=0.1;y<H;y+=0.05){surf.push([x+n(),y,0+Math.abs(n())]);surf.push([x+n(),y,Wd-Math.abs(n())]);} // long walls, just inside
for(let z=0;z<Wd;z+=0.05)for(let y=0.1;y<H;y+=0.05){surf.push([0+Math.abs(n()),y,z+n()]);surf.push([L-Math.abs(n()),y,z+n()]);}
console.log('box with walls',scanVolume(base,surf).vol.toFixed(2),'expect 4.50');
const top=surf.filter(p=>p[1]>H-0.2); console.log('box top only',scanVolume(base,top).vol.toFixed(2));
