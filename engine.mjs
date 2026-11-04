export const measures=c=>({angle:c.a*30,area:c.r*c.r*c.a,arc:2*c.r*c.a});
export const total=(cards,ids)=>ids.reduce((s,id)=>{const m=measures(cards[id]);return {angle:s.angle+m.angle,area:s.area+m.area,arc:s.arc+m.arc}}, {angle:0,area:0,arc:0});
export const win=(l,ids)=>{const t=total(l.cards,ids);return t.angle===360&&t.area===l.area&&t.arc<=l.thread};
export const initial=()=>({ids:[],status:'playing',attempts:0});
export function add(l,s,id){if(s.status!=='playing'||!Number.isInteger(id)||!l.cards[id]||s.ids.includes(id)||total(l.cards,s.ids).angle+measures(l.cards[id]).angle>360)return s;return {...s,ids:[...s.ids,id]};}
export function undo(s){return {...s,ids:s.ids.slice(0,-1),status:'playing'};}
export function seal(l,s){return {...s,status:win(l,s.ids)?'won':'lost',attempts:s.attempts+1};}
export function solve(l,required=[]){const solutions=[];for(let mask=1;mask<2**l.cards.length;mask++){const ids=l.cards.flatMap((_,i)=>mask&(1<<i)?[i]:[]);if(required.every(i=>ids.includes(i))&&win(l,ids))solutions.push(ids)}return solutions;}
export function restore(l,x){if(!x||!Array.isArray(x.ids)||x.ids.some(i=>!Number.isInteger(i)||!l.cards[i])||new Set(x.ids).size!==x.ids.length)return initial();return {...initial(),ids:x.ids,status:x.status==='won'&&win(l,x.ids)?'won':x.status==='lost'?'lost':'playing',attempts:Number.isInteger(x.attempts)&&x.attempts>=0?x.attempts:0};}
export function fraction(n,d=12){const gcd=(a,b)=>b?gcd(b,a%b):a;const g=gcd(Math.abs(n),d);return d/g===1?String(n/g):(n/g)+'/'+(d/g);}
