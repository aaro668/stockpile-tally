const {Tape,scanVolume,sampleScan}=require('./geom.js');
const pi=Math.PI;
// cone r=5,h=3 => slant sqrt(34)
let r=Tape.cone({method:'ott',C:2*pi*5,O:2*Math.sqrt(34)}); console.log('cone ott',r.vol.toFixed(3),'expect',(pi*25*3/3).toFixed(3));
r=Tape.cone({method:'dh',D:10,H:3}); console.log('cone dh',r.vol.toFixed(3));
r=Tape.windrow({L:9,W:9,method:'h',H:3}); console.log('windrow L=W (cone)',r.vol.toFixed(3),'expect',(pi*20.25*3/3).toFixed(3));
r=Tape.flat({L:10,W:10,l:0,w:0,H:3}); console.log('flat pyramid',r.vol.toFixed(3),'expect 100');
r=Tape.flat({L:10,W:6,l:10,w:6,H:2}); console.log('flat box',r.vol.toFixed(3),'expect 120');
const s=sampleScan(); const S=(p,k)=>p.map(q=>q.map(v=>v*k));
const ar=Math.hypot(...s.ref[0].map((v,i)=>v-s.ref[1][i])); const k=5/ar;
console.log('sample raw',scanVolume(s.base,s.surf).vol.toFixed(2),'scaled',scanVolume(S(s.base,k),S(s.surf,k)).vol.toFixed(2),'expect',(pi*4*3*2.5/3).toFixed(2),'ar ref',ar.toFixed(3));
// hemisphere-ish dense test: paraboloid h=H(1-r^2/R^2), V=pi R^2 H/2
let base=[],surf=[];for(let i=0;i<24;i++){const t=i/24*2*pi;base.push([5*Math.cos(t),0,5*Math.sin(t)]);}
for(let x=-5;x<=5;x+=0.25)for(let z=-5;z<=5;z+=0.25){const q=x*x+z*z;if(q<25)surf.push([x,2*(1-q/25),z]);}
console.log('paraboloid',scanVolume(base,surf).vol.toFixed(2),'expect',(pi*25*2/2).toFixed(2));
