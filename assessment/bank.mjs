import {wedge} from '../diagrams.mjs';
export const tasks=[
  {
    "id": "r1",
    "skill": "relation",
    "title": "세 배가 된 중심각",
    "prompt": "반지름이 같은 두 부채꼴에서 중심각이 40°일 때 호의 길이는 3 cm예요. 중심각이 120°인 부채꼴의 호 길이를 구하세요.",
    "fields": [
      {
        "label": "호의 길이 (cm)"
      }
    ],
    "expected": [
      9
    ],
    "hint": "같은 원에서 중심각이 몇 배가 되었는지 생각해요."
  },
  {
    "id": "r2",
    "skill": "relation",
    "title": "호에서 중심각으로",
    "prompt": "한 원에서 60°에 대응하는 호 길이는 5 cm예요. 호 길이가 15 cm이면 중심각은 몇 도인가요?",
    "fields": [
      {
        "label": "중심각 (도)"
      }
    ],
    "expected": [
      180
    ],
    "hint": "호가 세 배이면 같은 원에서 중심각도 세 배예요."
  },
  {
    "id": "l1",
    "skill": "arc",
    "title": "호에 두르는 실",
    "prompt": "반지름 3 cm, 중심각 80°인 부채꼴의 호 길이를 구하세요. 답은 π 앞의 수만 쓰세요. 분수는 4/3처럼 쓸 수 있어요.",
    "figure": "sector3-80",
    "fields": [
      {
        "label": "호 길이의 π 앞의 수 (cm)"
      }
    ],
    "expected": [
      1.3333333333333333
    ],
    "hint": "원주 6π cm의 80/360만큼이에요."
  },
  {
    "id": "l2",
    "skill": "arc",
    "title": "넓게 열린 호",
    "prompt": "반지름 5 cm, 중심각 216°인 부채꼴의 호 길이는 몇 π cm인가요?",
    "figure": "sector5-216",
    "fields": [
      {
        "label": "호 길이의 π 앞의 수 (cm)"
      }
    ],
    "expected": [
      6
    ],
    "hint": "원주 10π cm의 216/360만큼이에요. 반지름 두 변은 더하지 않아요."
  },
  {
    "id": "a1",
    "skill": "area",
    "title": "빛이 채우는 넓이",
    "prompt": "반지름 3 cm, 중심각 100°인 부채꼴의 넓이는 몇 π cm²인가요?",
    "figure": "sector3-100",
    "fields": [
      {
        "label": "넓이의 π 앞의 수 (cm²)"
      }
    ],
    "expected": [
      2.5
    ],
    "hint": "원 넓이 9π cm²의 100/360만큼이에요."
  },
  {
    "id": "a2",
    "skill": "area",
    "title": "반지름과 호로",
    "prompt": "반지름 5 cm, 호 길이 8π cm인 부채꼴의 넓이는 몇 π cm²인가요?",
    "fields": [
      {
        "label": "넓이의 π 앞의 수 (cm²)"
      }
    ],
    "expected": [
      20
    ],
    "hint": "넓이는 반지름과 호 길이를 곱한 값의 절반이에요."
  },
  {
    "id": "c1",
    "skill": "compare",
    "title": "반지름이 세 배면",
    "prompt": "중심각이 같은 두 부채꼴에서 반지름을 세 배로 하면 호의 길이와 넓이는 각각 몇 배가 되나요? 이유도 적어 보세요.",
    "fields": [
      {
        "label": "호의 길이는 몇 배?"
      },
      {
        "label": "넓이는 몇 배?"
      }
    ],
    "expected": [
      3,
      9
    ],
    "hint": "호 길이에는 반지름이 한 번, 넓이에는 반지름의 제곱이 들어가요."
  },
  {
    "id": "c2",
    "skill": "compare",
    "title": "넓이가 같은 두 조각",
    "prompt": "A는 반지름 3 cm, 중심각 160°이고, B는 반지름 6 cm, 중심각 40°예요. 두 넓이는 모두 4π cm²입니다. 호의 길이는 A가 B의 몇 배인가요?",
    "fields": [
      {
        "label": "A의 호 길이 ÷ B의 호 길이"
      }
    ],
    "expected": [
      2
    ],
    "hint": "각각 2πr×중심각/360으로 호의 길이를 구해 비교해요."
  }
];
for(const t of tasks){if(t.figure?.startsWith('sector')){const [r,a]=t.figure.slice(6).split('-').map(Number);t.figure='<svg viewBox="0 0 320 320" role="img" aria-label="반지름 '+r+' cm, 중심각 '+a+'도인 부채꼴">'+wedge(r,a,-a/2,160,190,22)+'<text x="160" y="280" text-anchor="middle">r = '+r+' cm · '+a+'°</text></svg>';}}
export function number(v){const t=String(v).trim();if(!t)return NaN;if(/^-?\d+(?:\.\d+)?\/-?\d+(?:\.\d+)?$/.test(t)){const [a,b]=t.split('/').map(Number);return b?a/b:NaN}return Number(t);}
export function check(t,a){return a.length===t.expected.length&&a.every((v,i)=>String(v).trim()!==''&&(typeof t.expected[i]==='number'?Number.isFinite(number(v))&&Math.abs(number(v)-t.expected[i])<1e-9:Array.isArray(t.expected[i])?String(v).replaceAll(' ','').split(',').sort().join(',')===[...t.expected[i]].sort().join(','):v===t.expected[i]));}
export function submit(log,t,answers,explanation,helped,elapsedMs=0){const previous=log.filter(r=>r.task===t.id),correct=check(t,answers);return{version:'2026.11.04.1',task:t.id,skill:t.skill,answers:[...answers],explanation,helped:Boolean(helped),attempt:previous.length+1,first:previous.length===0,correct,independent:!previous.length&&!helped&&correct,at:new Date().toISOString(),elapsedMs};}
export function summary(log,skill){return new Set(log.filter(r=>r.skill===skill&&r.independent).map(r=>r.task)).size;}
