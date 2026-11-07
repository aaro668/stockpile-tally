const {scanVolume}=require('./geom.js'); const pi=Math.PI;
// paraboloid pile (R=5 m, H=2 m, true V = 25π = 78.54 m³) sitting on different grounds
const run=(name,g)=>{const base=[],surf=[];for(let i=0;i<24;i++){const t=i/24*2*pi,x=5*Math.cos(t),z=5*Math.sin(t);base.push([x,g(x,z),z]);}
 for(let x=-5;x<=5;x+=0.2)for(let z=-5;z<=5;z+=0.2){const q=x*x+z*z;if(q<25)surf.push([x,g(x,z)+2*(1-q/25),z]);}
 const r=scanVolume(base,surf);console.log(name.padEnd(28),r.vol.toFixed(2),'m³  expect 78.54   toe relief',r.relief.toFixed(2),'m');};
run('level',()=>0);
run('15° slope',(x)=>Math.tan(15*pi/180)*x);
run('slope both ways 8°+5°',(x,z)=>0.14*x+0.09*z);
run('rolling (unknown inside)',(x,z)=>0.4*Math.sin(x/3)+0.2*Math.cos(z/2));
// one toe tap on a rock 8 in high, level ground
{const base=[],surf=[];for(let i=0;i<16;i++){const t=i/16*2*pi;base.push([5*Math.cos(t),i===3?0.2:0,5*Math.sin(t)]);}
 for(let x=-5;x<=5;x+=0.2)for(let z=-5;z<=5;z+=0.2){const q=x*x+z*z;if(q<25)surf.push([x,2*(1-q/25),z]);}
 console.log('level, one bad toe tap +8 in'.padEnd(28),scanVolume(base,surf).vol.toFixed(2),'m³');}
// toe tapped in a random order (should fall back to angle ordering)
{const base=[],surf=[];const idx=[0,5,2,9,7,1,11,4,8,3,10,6];for(const i of idx){const t=i/12*2*pi;base.push([5*Math.cos(t),0,5*Math.sin(t)]);}
 for(let x=-5;x<=5;x+=0.2)for(let z=-5;z<=5;z+=0.2){const q=x*x+z*z;if(q<25)surf.push([x,2*(1-q/25),z]);}
 console.log('toe tapped out of order'.padEnd(28),scanVolume(base,surf).vol.toFixed(2),'m³');}
