var Cn=Array.isArray,bn=Array.from,qn=Object.defineProperty,ct=Object.getOwnPropertyDescriptor,Xt=Object.getOwnPropertyDescriptors,Pn=Object.prototype,Ln=Array.prototype,tn=Object.getPrototypeOf;function Fn(t){return typeof t=="function"}const Mn=()=>{};function Hn(t){return t()}function yt(t){for(var n=0;n<t.length;n++)t[n]()}const y=2,Tt=4,j=8,st=16,T=32,J=64,R=128,G=256,p=512,g=1024,b=2048,x=4096,B=8192,nn=16384,wt=32768,rn=65536,en=1<<18,At=1<<19,vt=Symbol("$state"),Yn=Symbol("legacy props"),jn=Symbol("");function mt(t){return t===this.v}function sn(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function It(t){return!sn(t,this.v)}function an(t){throw new Error("effect_in_teardown")}function ln(){throw new Error("effect_in_unowned_derived")}function un(t){throw new Error("effect_orphan")}function on(){throw new Error("effect_update_depth_exceeded")}function Bn(){throw new Error("hydration_failed")}function Un(t){throw new Error("props_invalid_value")}function Vn(){throw new Error("state_descriptors_fixed")}function Gn(){throw new Error("state_prototype_fixed")}function fn(){throw new Error("state_unsafe_local_read")}function _n(){throw new Error("state_unsafe_mutation")}let Q=!1;function Kn(){Q=!0}function at(t){return{f:0,v:t,reactions:null,equals:mt,version:0}}function $n(t){return gt(at(t))}function cn(t,n=!1){var e;const r=at(t);return n||(r.equals=It),Q&&f!==null&&f.l!==null&&((e=f.l).s??(e.s=[])).push(r),r}function Zn(t,n=!1){return gt(cn(t,n))}function gt(t){return o!==null&&o.f&y&&(E===null?Sn([t]):E.push(t)),t}function pt(t,n){return St(t,ft(()=>Wt(t))),n}function St(t,n){return o!==null&&it()&&o.f&(y|st)&&(E===null||!E.includes(t))&&_n(),vn(t,n)}function vn(t,n){return t.equals(n)||(t.v=n,t.version=Kt(),Ot(t,g),it()&&u!==null&&u.f&p&&!(u.f&T)&&(_!==null&&_.includes(t)?(h(u,g),W(u)):I===null?On([t]):I.push(t))),n}function Ot(t,n){var r=t.reactions;if(r!==null)for(var e=it(),s=r.length,a=0;a<s;a++){var l=r[a],i=l.f;i&g||!e&&l===u||(h(l,n),i&(p|R)&&(i&y?Ot(l,b):W(l)))}}const zn=1,Jn=2,Qn=4,Wn=8,Xn=16,tr=1,nr=2,rr=4,er=8,sr=16,ar=1,lr=2,ur=4,or=1,ir=2,pn="[",dn="[!",hn="]",Rt={},fr=Symbol();function kt(t){console.warn("hydration_mismatch")}let C=!1;function _r(t){C=t}let A;function M(t){if(t===null)throw kt(),Rt;return A=t}function cr(){return M(q(A))}function vr(t){if(C){if(q(A)!==null)throw kt(),Rt;A=t}}function pr(){for(var t=0,n=A;;){if(n.nodeType===8){var r=n.data;if(r===hn){if(t===0)return n;t-=1}else(r===pn||r===dn)&&(t+=1)}var e=q(n);n.remove(),n=e}}var dt,Nt,Dt;function dr(){if(dt===void 0){dt=window;var t=Element.prototype,n=Node.prototype;Nt=ct(n,"firstChild").get,Dt=ct(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function X(t=""){return document.createTextNode(t)}function tt(t){return Nt.call(t)}function q(t){return Dt.call(t)}function hr(t,n){if(!C)return tt(t);var r=tt(A);if(r===null)r=A.appendChild(X());else if(n&&r.nodeType!==3){var e=X();return r==null||r.before(e),M(e),e}return M(r),r}function Er(t,n){if(!C){var r=tt(t);return r instanceof Comment&&r.data===""?q(r):r}return A}function yr(t,n=1,r=!1){let e=C?A:t;for(;n--;)e=q(e);if(!C)return e;var s=e.nodeType;if(r&&s!==3){var a=X();return e==null||e.before(a),M(a),a}return M(e),e}function Tr(t){t.textContent=""}function En(t){var n=y|g;u===null?n|=R:u.f|=At;const r={children:null,ctx:f,deps:null,equals:mt,f:n,fn:t,reactions:null,v:null,version:0,parent:u};if(o!==null&&o.f&y){var e=o;(e.children??(e.children=[])).push(r)}return r}function wr(t){const n=En(t);return n.equals=It,n}function xt(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&y?lt(e):L(e)}}}function Ct(t){var n,r=u;z(t.parent);try{xt(t),n=$t(t)}finally{z(r)}return n}function bt(t){var n=Ct(t),r=(k||t.f&R)&&t.deps!==null?b:p;h(t,r),t.equals(n)||(t.v=n,t.version=Kt())}function lt(t){xt(t),Y(t,0),h(t,B),t.v=t.children=t.deps=t.ctx=t.reactions=null}function qt(t){u===null&&o===null&&un(),o!==null&&o.f&R&&ln(),ot&&an()}function yn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function P(t,n,r,e=!0){var s=(t&J)!==0,a=u,l={ctx:f,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|g,first:null,fn:n,last:null,next:null,parent:s?null:a,prev:null,teardown:null,transitions:null,version:0};if(r){var i=N;try{ht(!0),U(l),l.f|=nn}catch(c){throw L(l),c}finally{ht(i)}}else n!==null&&W(l);var w=r&&l.deps===null&&l.first===null&&l.nodes_start===null&&l.teardown===null&&(l.f&At)===0;if(!w&&!s&&e&&(a!==null&&yn(l,a),o!==null&&o.f&y)){var m=o;(m.children??(m.children=[])).push(l)}return l}function Ar(t){const n=P(j,null,!1);return h(n,p),n.teardown=t,n}function mr(t){qt();var n=u!==null&&(u.f&T)!==0&&f!==null&&!f.m;if(n){var r=f;(r.e??(r.e=[])).push({fn:t,effect:u,reaction:o})}else{var e=Pt(t);return e}}function Ir(t){return qt(),ut(t)}function gr(t){const n=P(J,t,!0);return()=>{L(n)}}function Pt(t){return P(Tt,t,!1)}function Sr(t,n){var r=f,e={effect:null,ran:!1};r.l.r1.push(e),e.effect=ut(()=>{t(),!e.ran&&(e.ran=!0,St(r.l.r2,!0),ft(n))})}function Or(){var t=f;ut(()=>{if(Wt(t.l.r2)){for(var n of t.l.r1){var r=n.effect;r.f&p&&h(r,b),F(r)&&U(r),n.ran=!1}t.l.r2.v=!1}})}function ut(t){return P(j,t,!0)}function Rr(t){return Tn(t)}function Tn(t,n=0){return P(j|st|n,t,!0)}function kr(t,n=!0){return P(j|T,t,!0,n)}function Lt(t){var n=t.teardown;if(n!==null){const r=ot,e=o;Et(!0),Z(null);try{n.call(null)}finally{Et(r),Z(e)}}}function Ft(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)lt(n[r])}}function Mt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;L(r,n),r=e}}function wn(t){for(var n=t.first;n!==null;){var r=n.next;n.f&T||L(n),n=r}}function L(t,n=!0){var r=!1;if((n||t.f&en)&&t.nodes_start!==null){for(var e=t.nodes_start,s=t.nodes_end;e!==null;){var a=e===s?null:q(e);e.remove(),e=a}r=!0}Mt(t,n&&!r),Ft(t),Y(t,0),h(t,B);var l=t.transitions;if(l!==null)for(const w of l)w.stop();Lt(t);var i=t.parent;i!==null&&i.first!==null&&Ht(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.parent=t.fn=t.nodes_start=t.nodes_end=null}function Ht(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function Nr(t,n){var r=[];Yt(t,r,!0),An(r,()=>{L(t),n&&n()})}function An(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var s of t)s.out(e)}else n()}function Yt(t,n,r){if(!(t.f&x)){if(t.f^=x,t.transitions!==null)for(const l of t.transitions)(l.is_global||r)&&n.push(l);for(var e=t.first;e!==null;){var s=e.next,a=(e.f&wt)!==0||(e.f&T)!==0;Yt(e,n,a?r:!1),e=s}}}function Dr(t){jt(t,!0)}function jt(t,n){if(t.f&x){F(t)&&U(t),t.f^=x;for(var r=t.first;r!==null;){var e=r.next,s=(r.f&wt)!==0||(r.f&T)!==0;jt(r,s?n:!1),r=e}if(t.transitions!==null)for(const a of t.transitions)(a.is_global||n)&&a.in()}}const mn=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let K=!1,$=!1,nt=[],rt=[];function Bt(){K=!1;const t=nt.slice();nt=[],yt(t)}function Ut(){$=!1;const t=rt.slice();rt=[],yt(t)}function xr(t){K||(K=!0,queueMicrotask(Bt)),nt.push(t)}function Cr(t){$||($=!0,mn(Ut)),rt.push(t)}function In(){K&&Bt(),$&&Ut()}const Vt=0,gn=1;let V=Vt,H=!1,N=!1,ot=!1;function ht(t){N=t}function Et(t){ot=t}let O=[],D=0;let o=null;function Z(t){o=t}let u=null;function z(t){u=t}let E=null;function Sn(t){E=t}let _=null,d=0,I=null;function On(t){I=t}let Gt=0,k=!1,S=null,f=null;function Kt(){return++Gt}function it(){return!Q||f!==null&&f.l===null}function F(t){var l,i;var n=t.f;if(n&g)return!0;if(n&b){var r=t.deps,e=(n&R)!==0;if(r!==null){var s;if(n&G){for(s=0;s<r.length;s++)((l=r[s]).reactions??(l.reactions=[])).push(t);t.f^=G}for(s=0;s<r.length;s++){var a=r[s];if(F(a)&&bt(a),e&&u!==null&&!k&&!((i=a==null?void 0:a.reactions)!=null&&i.includes(t))&&(a.reactions??(a.reactions=[])).push(t),a.version>t.version)return!0}}e||h(t,p)}return!1}function Rn(t,n,r){throw t}function $t(t){var _t;var n=_,r=d,e=I,s=o,a=k,l=E,i=f,w=t.f;_=null,d=0,I=null,o=w&(T|J)?null:t,k=!N&&(w&R)!==0,E=null,f=t.ctx;try{var m=(0,t.fn)(),c=t.deps;if(_!==null){var v;if(Y(t,d),c!==null&&d>0)for(c.length=d+_.length,v=0;v<_.length;v++)c[d+v]=_[v];else t.deps=c=_;if(!k)for(v=d;v<c.length;v++)((_t=c[v]).reactions??(_t.reactions=[])).push(t)}else c!==null&&d<c.length&&(Y(t,d),c.length=d);return m}finally{_=n,d=r,I=e,o=s,k=a,E=l,f=i}}function kn(t,n){let r=n.reactions;if(r!==null){var e=r.indexOf(t);if(e!==-1){var s=r.length-1;s===0?r=n.reactions=null:(r[e]=r[s],r.pop())}}r===null&&n.f&y&&(_===null||!_.includes(n))&&(h(n,b),n.f&(R|G)||(n.f^=G),Y(n,0))}function Y(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)kn(t,r[e])}function U(t){var n=t.f;if(!(n&B)){h(t,p);var r=u;u=t;try{n&st?wn(t):Mt(t),Ft(t),Lt(t);var e=$t(t);t.teardown=typeof e=="function"?e:null,t.version=Gt}catch(s){Rn(s)}finally{u=r}}}function Zt(){D>1e3&&(D=0,on()),D++}function zt(t){var n=t.length;if(n!==0){Zt();var r=N;N=!0;try{for(var e=0;e<n;e++){var s=t[e];s.f&p||(s.f^=p);var a=[];Jt(s,a),Nn(a)}}finally{N=r}}}function Nn(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];!(e.f&(B|x))&&F(e)&&(U(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Ht(e):e.fn=null))}}function Dn(){if(H=!1,D>1001)return;const t=O;O=[],zt(t),H||(D=0)}function W(t){V===Vt&&(H||(H=!0,queueMicrotask(Dn)));for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(J|T)){if(!(r&p))return;n.f^=p}}O.push(n)}function Jt(t,n){var r=t.first,e=[];t:for(;r!==null;){var s=r.f,a=(s&T)!==0,l=a&&(s&p)!==0;if(!l&&!(s&x))if(s&j){a?r.f^=p:F(r)&&U(r);var i=r.first;if(i!==null){r=i;continue}}else s&Tt&&e.push(r);var w=r.next;if(w===null){let v=r.parent;for(;v!==null;){if(t===v)break t;var m=v.next;if(m!==null){r=m;continue t}v=v.parent}}r=w}for(var c=0;c<e.length;c++)i=e[c],n.push(i),Jt(i,n)}function Qt(t){var n=V,r=O;try{Zt();const s=[];V=gn,O=s,H=!1,zt(r);var e=t==null?void 0:t();return In(),(O.length>0||s.length>0)&&Qt(),D=0,e}finally{V=n,O=r}}async function br(){await Promise.resolve(),Qt()}function Wt(t){var i;var n=t.f,r=(n&y)!==0;if(r&&n&B){var e=Ct(t);return lt(t),e}if(S!==null&&S.add(t),o!==null){E!==null&&E.includes(t)&&fn();var s=o.deps;_===null&&s!==null&&s[d]===t?d++:_===null?_=[t]:_.push(t),I!==null&&u!==null&&u.f&p&&!(u.f&T)&&I.includes(t)&&(h(u,g),W(u))}else if(r&&t.deps===null){var a=t,l=a.parent;l!==null&&!((i=l.deriveds)!=null&&i.includes(a))&&(l.deriveds??(l.deriveds=[])).push(a)}return r&&(a=t,F(a)&&bt(a)),t.v}function qr(t){var n=S;S=new Set;var r=S,e;try{if(ft(t),n!==null)for(e of S)n.add(e)}finally{S=n}for(e of r)if(e.f&rn)for(const s of e.deps||[])s.f&y||pt(s,null);else pt(e,null)}function ft(t){const n=o;try{return o=null,t()}finally{o=n}}const xn=~(g|b|p);function h(t,n){t.f=t.f&xn|n}function Pr(t,n=!1,r){f={p:f,c:null,e:null,m:!1,s:t,x:null,l:null},Q&&!n&&(f.l={s:null,u:null,r1:[],r2:at(!1)})}function Lr(t){const n=f;if(n!==null){const l=n.e;if(l!==null){var r=u,e=o;n.e=null;try{for(var s=0;s<l.length;s++){var a=l[s];z(a.effect),Z(a.reaction),Pt(a.fn)}}finally{z(r),Z(e)}}f=n.p,n.m=!0}return{}}function Fr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(vt in t)et(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&vt in r&&et(r)}}}function et(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{et(t[e],n)}catch{}const r=tn(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Xt(r);for(let s in e){const a=e[s].get;if(a)try{a.call(t)}catch{}}}}}export{xr as $,at as A,Vn as B,St as C,ct as D,wt as E,u as F,Gn as G,tn as H,Cn as I,Dr as J,Nr as K,cr as L,dn as M,pr as N,M as O,_r as P,Q,X as R,vt as S,tt as T,fr as U,or as V,ir as W,Z as X,z as Y,o as Z,Ar as _,kr as a,qn as a0,dr as a1,pn as a2,q as a3,Rt as a4,hn as a5,kt as a6,Bn as a7,Tr as a8,bn as a9,Qn as aA,Wn as aB,Xn as aC,Cr as aD,jn as aE,Xt as aF,st as aG,nn as aH,Fn as aI,ur as aJ,ar as aK,lr as aL,it as aM,Zn as aN,qr as aO,Sr as aP,Or as aQ,gr as aa,cn as ab,Pt as ac,ut as ad,Un as ae,rn as af,rr as ag,It as ah,T as ai,J as aj,tr as ak,nr as al,er as am,Yn as an,wr as ao,sr as ap,S as aq,Qt as ar,br as as,$n as at,x as au,zn as av,vn as aw,Jn as ax,Yt as ay,An as az,Tn as b,A as c,L as d,Lr as e,Er as f,hr as g,C as h,yr as i,mr as j,f as k,ft as l,yt as m,Mn as n,Wt as o,Pr as p,Hn as q,vr as r,sn as s,Rr as t,Ir as u,Fr as v,En as w,Kn as x,Pn as y,Ln as z};