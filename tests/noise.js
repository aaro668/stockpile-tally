const {scanVolume}=require('./geom.js'); const pi=Math.PI;
let seed=3; const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
let base=[],surf=[];for(let i=0;i<20;i++){const t=i/20*2*pi;base.push([5*Math.cos(t),0,5*Math.sin(t)]);}
for(let x=-5;x<=5;x+=0.2)for(let z=-5;z<=5;z+=0.2){const q=x*x+z*z;if(q<25)surf.push([x,2*(1-q/25)+(rnd()-.5)*0.05,z]);}
const clean=scanVolume(base,surf).vol;
// pollution: 4% spikes up to +3 m, ground points inside, background points outside
const n=surf.length; for(let i=0;i<n*0.04;i++){const x=(rnd()-.5)*9,z=(rnd()-.5)*9; if(x*x+z*z<25) surf.push([x,2*(1-(x*x+z*z)/25)+1+rnd()*2,z]);}
for(let i=0;i<300;i++){surf.push([(rnd()-.5)*10,0.01,(rnd()-.5)*10]); surf.push([(rnd()-.5)*40,rnd()*5,(rnd()-.5)*40]);}
console.log('paraboloid clean',clean.toFixed(2),'polluted',scanVolume(base,surf).vol.toFixed(2),'expect',(pi*25).toFixed(2));
// depth unprojection round-trip: camera at (1,1.5,3) looking down -z, tilted; perspective matrix
const f=1/Math.tan(0.5),a=0.75,nr=0.1,fr=100;const P=[f*a,0,0,0, 0,f,0,0, 0.02,-0.03,-(fr+nr)/(fr-nr),-1, 0,0,-2*fr*nr/(fr-nr),0];
const c=Math.cos(0.3),s=Math.sin(0.3); const M=[1,0,0,0, 0,c,s,0, 0,-s,c,0, 1,1.5,3,1]; // cam->world (rotation about x, then translate)
const world=[1.4,0.7,-2.2]; // project
const inv=(v)=>{const t=[v[0]-M[12],v[1]-M[13],v[2]-M[14]];return [t[0]*M[0]+t[1]*M[1]+t[2]*M[2], t[0]*M[4]+t[1]*M[5]+t[2]*M[6], t[0]*M[8]+t[1]*M[9]+t[2]*M[10]];};
const vv=inv(world); const cl=[0,1,2,3].map(r=>P[r]*vv[0]+P[4+r]*vv[1]+P[8+r]*vv[2]+P[12+r]); const ndc=[cl[0]/cl[3],cl[1]/cl[3]];
const nx=(ndc[0]+1)/2, ny=(1-ndc[1])/2, d=-vv[2];
const x=(nx*2-1+P[8])*d/P[0], y=(1-ny*2+P[9])*d/P[5], z=-d;
const back=[M[0]*x+M[4]*y+M[8]*z+M[12], M[1]*x+M[5]*y+M[9]*z+M[13], M[2]*x+M[6]*y+M[10]*z+M[14]];
console.log('depth unproject', world.join(','),'->',back.map(v=>v.toFixed(4)).join(','));
