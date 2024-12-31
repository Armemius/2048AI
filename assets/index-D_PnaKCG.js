(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))n(u);new MutationObserver(u=>{for(const f of u)if(f.type==="childList")for(const c of f.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function t(u){const f={};return u.integrity&&(f.integrity=u.integrity),u.referrerPolicy&&(f.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?f.credentials="include":u.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function n(u){if(u.ep)return;u.ep=!0;const f=t(u);fetch(u.href,f)}})();const wt=!1;var fr=Array.isArray,or=Array.from,mt=Object.defineProperty,fe=Object.getOwnPropertyDescriptor,Et=Object.getOwnPropertyDescriptors,xt=Object.prototype,At=Array.prototype,qr=Object.getPrototypeOf;function St(e){return e()}function Xe(e){for(var r=0;r<e.length;r++)e[r]()}const H=2,Fr=4,Ce=8,ar=16,K=32,Ne=64,Je=128,ae=256,$e=512,q=1024,re=2048,Oe=4096,W=8192,ye=16384,Tt=32768,$r=65536,Ct=1<<17,Nt=1<<19,Vr=1<<20,oe=Symbol("$state"),Ot=Symbol("legacy props");function Ur(e){return e===this.v}function Dt(e,r){return e!=e?r==r:e!==r||e!==null&&typeof e=="object"||typeof e=="function"}function cr(e){return!Dt(e,this.v)}function It(e){throw new Error("https://svelte.dev/e/effect_in_teardown")}function Rt(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function kt(e){throw new Error("https://svelte.dev/e/effect_orphan")}function Lt(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Mt(e){throw new Error("https://svelte.dev/e/props_invalid_value")}function Pt(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function bt(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function Bt(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function qt(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let ge=!1;function Ft(){ge=!0}const vr=1,_r=2,Hr=4,$t=8,Vt=16,Ut=1,Ht=2,Kt=4,Yt=8,Wt=16,zt=2,F=Symbol();function U(e,r){var t={f:0,v:e,reactions:null,equals:Ur,version:0};return t}function dr(e,r=!1){var n;const t=U(e);return r||(t.equals=cr),ge&&N!==null&&N.l!==null&&((n=N.l).s??(n.s=[])).push(t),t}function se(e,r=!1){return Zt(dr(e,r))}function Zt(e){return T!==null&&T.f&H&&(z===null?un([e]):z.push(e)),e}function Nr(e,r){return R(e,pe(()=>E(e))),r}function R(e,r){return T!==null&&xr()&&T.f&(H|ar)&&(z===null||!z.includes(e))&&qt(),je(e,r)}function je(e,r){return e.equals(r)||(e.v=r,e.version=at(),Kr(e,re),xr()&&A!==null&&A.f&q&&!(A.f&K)&&(b!==null&&b.includes(e)?(G(A,re),ze(A)):ee===null?sn([e]):ee.push(e))),r}function Kr(e,r){var t=e.reactions;if(t!==null)for(var n=xr(),u=t.length,f=0;f<u;f++){var c=t[f],y=c.f;y&re||!n&&c===A||(G(c,r),y&(q|ae)&&(y&H?Kr(c,Oe):ze(c)))}}let Yr=!1;function de(e,r=null,t){if(typeof e!="object"||e===null||oe in e)return e;const n=qr(e);if(n!==xt&&n!==At)return e;var u=new Map,f=fr(e),c=U(0);f&&u.set("length",U(e.length));var y;return new Proxy(e,{defineProperty(v,o,a){(!("value"in a)||a.configurable===!1||a.enumerable===!1||a.writable===!1)&&Pt();var _=u.get(o);return _===void 0?(_=U(a.value),u.set(o,_)):R(_,de(a.value,y)),!0},deleteProperty(v,o){var a=u.get(o);if(a===void 0)o in v&&u.set(o,U(F));else{if(f&&typeof o=="string"){var _=u.get("length"),h=Number(o);Number.isInteger(h)&&h<_.v&&R(_,h)}R(a,F),Or(c)}return!0},get(v,o,a){var g;if(o===oe)return e;var _=u.get(o),h=o in v;if(_===void 0&&(!h||(g=fe(v,o))!=null&&g.writable)&&(_=U(de(h?v[o]:F,y)),u.set(o,_)),_!==void 0){var d=E(_);return d===F?void 0:d}return Reflect.get(v,o,a)},getOwnPropertyDescriptor(v,o){var a=Reflect.getOwnPropertyDescriptor(v,o);if(a&&"value"in a){var _=u.get(o);_&&(a.value=E(_))}else if(a===void 0){var h=u.get(o),d=h==null?void 0:h.v;if(h!==void 0&&d!==F)return{enumerable:!0,configurable:!0,value:d,writable:!0}}return a},has(v,o){var d;if(o===oe)return!0;var a=u.get(o),_=a!==void 0&&a.v!==F||Reflect.has(v,o);if(a!==void 0||A!==null&&(!_||(d=fe(v,o))!=null&&d.writable)){a===void 0&&(a=U(_?de(v[o],y):F),u.set(o,a));var h=E(a);if(h===F)return!1}return _},set(v,o,a,_){var I;var h=u.get(o),d=o in v;if(f&&o==="length")for(var g=a;g<h.v;g+=1){var x=u.get(g+"");x!==void 0?R(x,F):g in v&&(x=U(F),u.set(g+"",x))}h===void 0?(!d||(I=fe(v,o))!=null&&I.writable)&&(h=U(void 0),R(h,de(a,y)),u.set(o,h)):(d=h.v!==F,R(h,de(a,y)));var O=Reflect.getOwnPropertyDescriptor(v,o);if(O!=null&&O.set&&O.set.call(_,a),!d){if(f&&typeof o=="string"){var D=u.get("length"),k=Number(o);Number.isInteger(k)&&k>=D.v&&R(D,k+1)}Or(c)}return!0},ownKeys(v){E(c);var o=Reflect.ownKeys(v).filter(h=>{var d=u.get(h);return d===void 0||d.v!==F});for(var[a,_]of u)_.v!==F&&!(a in v)&&o.push(a);return o},setPrototypeOf(){bt()}})}function Or(e,r=1){R(e,e.v+r)}var er,Wr,zr;function Gt(){if(er===void 0){er=window;var e=Element.prototype,r=Node.prototype;Wr=fe(r,"firstChild").get,zr=fe(r,"nextSibling").get,e.__click=void 0,e.__className="",e.__attributes=null,e.__styles=null,e.__e=void 0,Text.prototype.__t=void 0}}function hr(e=""){return document.createTextNode(e)}function Se(e){return Wr.call(e)}function Ke(e){return zr.call(e)}function V(e,r){return Se(e)}function Dr(e,r){{var t=Se(e);return t instanceof Comment&&t.data===""?Ke(t):t}}function X(e,r=1,t=!1){let n=e;for(;r--;)n=Ke(n);return n}function Qt(e){e.textContent=""}function Ve(e){var r=H|re;A===null?r|=ae:A.f|=Vr;var t=T!==null&&T.f&H?T:null;const n={children:null,ctx:N,deps:null,equals:Ur,f:r,fn:e,reactions:null,v:null,version:0,parent:t??A};return t!==null&&(t.children??(t.children=[])).push(n),n}function Xt(e){const r=Ve(e);return r.equals=cr,r}function Zr(e){var r=e.children;if(r!==null){e.children=null;for(var t=0;t<r.length;t+=1){var n=r[t];n.f&H?pr(n):te(n)}}}function Jt(e){for(var r=e.parent;r!==null;){if(!(r.f&H))return r;r=r.parent}return null}function Gr(e){var r,t=A;Z(Jt(e));try{Zr(e),r=ct(e)}finally{Z(t)}return r}function Qr(e){var r=Gr(e),t=(ie||e.f&ae)&&e.deps!==null?Oe:q;G(e,t),e.equals(r)||(e.v=r,e.version=at())}function pr(e){Zr(e),Te(e,0),G(e,ye),e.v=e.children=e.deps=e.ctx=e.reactions=null}function Xr(e){A===null&&T===null&&kt(),T!==null&&T.f&ae&&Rt(),Er&&It()}function jt(e,r){var t=r.last;t===null?r.last=r.first=e:(t.next=e,e.prev=t,r.last=e)}function we(e,r,t,n=!0){var u=(e&Ne)!==0,f=A,c={ctx:N,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:e|re,first:null,fn:r,last:null,next:null,parent:u?null:f,prev:null,teardown:null,transitions:null,version:0};if(t){var y=he;try{Ir(!0),We(c),c.f|=Tt}catch(a){throw te(c),a}finally{Ir(y)}}else r!==null&&ze(c);var v=t&&c.deps===null&&c.first===null&&c.nodes_start===null&&c.teardown===null&&(c.f&Vr)===0;if(!v&&!u&&n&&(f!==null&&jt(c,f),T!==null&&T.f&H)){var o=T;(o.children??(o.children=[])).push(c)}return c}function Jr(e){const r=we(Ce,null,!1);return G(r,q),r.teardown=e,r}function rr(e){Xr();var r=A!==null&&(A.f&K)!==0&&N!==null&&!N.m;if(r){var t=N;(t.e??(t.e=[])).push({fn:e,effect:A,reaction:T})}else{var n=yr(e);return n}}function en(e){return Xr(),jr(e)}function rn(e){const r=we(Ne,e,!0);return(t={})=>new Promise(n=>{t.outro?ut(r,()=>{te(r),n(void 0)}):(te(r),n(void 0))})}function yr(e){return we(Fr,e,!1)}function jr(e){return we(Ce,e,!0)}function Be(e){return et(e)}function et(e,r=0){return we(Ce|ar|r,e,!0)}function gr(e,r=!0){return we(Ce|K,e,!0,r)}function rt(e){var r=e.teardown;if(r!==null){const t=Er,n=T;Rr(!0),ne(null);try{r.call(null)}finally{Rr(t),ne(n)}}}function tt(e){var r=e.deriveds;if(r!==null){e.deriveds=null;for(var t=0;t<r.length;t+=1)pr(r[t])}}function nt(e,r=!1){var t=e.first;for(e.first=e.last=null;t!==null;){var n=t.next;te(t,r),t=n}}function tn(e){for(var r=e.first;r!==null;){var t=r.next;r.f&K||te(r),r=t}}function te(e,r=!0){var t=!1;if((r||e.f&Nt)&&e.nodes_start!==null){for(var n=e.nodes_start,u=e.nodes_end;n!==null;){var f=n===u?null:Ke(n);n.remove(),n=f}t=!0}nt(e,r&&!t),tt(e),Te(e,0),G(e,ye);var c=e.transitions;if(c!==null)for(const v of c)v.stop();rt(e);var y=e.parent;y!==null&&y.first!==null&&lt(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.fn=e.nodes_start=e.nodes_end=null}function lt(e){var r=e.parent,t=e.prev,n=e.next;t!==null&&(t.next=n),n!==null&&(n.prev=t),r!==null&&(r.first===e&&(r.first=n),r.last===e&&(r.last=t))}function ut(e,r){var t=[];wr(e,t,!0),st(t,()=>{te(e),r&&r()})}function st(e,r){var t=e.length;if(t>0){var n=()=>--t||r();for(var u of e)u.out(n)}else r()}function wr(e,r,t){if(!(e.f&W)){if(e.f^=W,e.transitions!==null)for(const c of e.transitions)(c.is_global||t)&&r.push(c);for(var n=e.first;n!==null;){var u=n.next,f=(n.f&$r)!==0||(n.f&K)!==0;wr(n,r,f?t:!1),n=u}}}function it(e){ft(e,!0)}function ft(e,r){if(e.f&W){De(e)&&We(e),e.f^=W;for(var t=e.first;t!==null;){var n=t.next,u=(t.f&$r)!==0||(t.f&K)!==0;ft(t,u?r:!1),t=n}if(e.transitions!==null)for(const f of e.transitions)(f.is_global||r)&&f.in()}}let tr=!1,nr=[];function nn(){tr=!1;const e=nr.slice();nr=[],Xe(e)}function mr(e){tr||(tr=!0,queueMicrotask(nn)),nr.push(e)}function ln(e){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}let qe=!1,Ue=!1,He=null,he=!1,Er=!1;function Ir(e){he=e}function Rr(e){Er=e}let lr=[],Ae=0;let T=null;function ne(e){T=e}let A=null;function Z(e){A=e}let z=null;function un(e){z=e}let b=null,$=0,ee=null;function sn(e){ee=e}let ot=1,ie=!1,N=null;function at(){return++ot}function xr(){return!ge||N!==null&&N.l===null}function De(e){var c,y;var r=e.f;if(r&re)return!0;if(r&Oe){var t=e.deps,n=(r&ae)!==0;if(t!==null){var u;if(r&$e){for(u=0;u<t.length;u++)((c=t[u]).reactions??(c.reactions=[])).push(e);e.f^=$e}for(u=0;u<t.length;u++){var f=t[u];if(De(f)&&Qr(f),n&&A!==null&&!ie&&!((y=f==null?void 0:f.reactions)!=null&&y.includes(e))&&(f.reactions??(f.reactions=[])).push(e),f.version>e.version)return!0}}(!n||A!==null&&!ie)&&G(e,q)}return!1}function fn(e,r){for(var t=r;t!==null;){if(t.f&Je)try{t.fn(e);return}catch{t.f^=Je}t=t.parent}throw qe=!1,e}function on(e){return(e.f&ye)===0&&(e.parent===null||(e.parent.f&Je)===0)}function Ye(e,r,t,n){if(qe){if(t===null&&(qe=!1),on(r))throw e;return}t!==null&&(qe=!0);{fn(e,r);return}}function ct(e){var h;var r=b,t=$,n=ee,u=T,f=ie,c=z,y=N,v=e.f;b=null,$=0,ee=null,T=v&(K|Ne)?null:e,ie=!he&&(v&ae)!==0,z=null,N=e.ctx;try{var o=(0,e.fn)(),a=e.deps;if(b!==null){var _;if(Te(e,$),a!==null&&$>0)for(a.length=$+b.length,_=0;_<b.length;_++)a[$+_]=b[_];else e.deps=a=b;if(!ie)for(_=$;_<a.length;_++)((h=a[_]).reactions??(h.reactions=[])).push(e)}else a!==null&&$<a.length&&(Te(e,$),a.length=$);return o}finally{b=r,$=t,ee=n,T=u,ie=f,z=c,N=y}}function an(e,r){let t=r.reactions;if(t!==null){var n=t.indexOf(e);if(n!==-1){var u=t.length-1;u===0?t=r.reactions=null:(t[n]=t[u],t.pop())}}t===null&&r.f&H&&(b===null||!b.includes(r))&&(G(r,Oe),r.f&(ae|$e)||(r.f^=$e),Te(r,0))}function Te(e,r){var t=e.deps;if(t!==null)for(var n=r;n<t.length;n++)an(e,t[n])}function We(e){var r=e.f;if(!(r&ye)){G(e,q);var t=A,n=N;A=e;try{r&ar?tn(e):nt(e),tt(e),rt(e);var u=ct(e);e.teardown=typeof u=="function"?u:null,e.version=ot}catch(f){Ye(f,e,t,n||e.ctx)}finally{A=t}}}function cn(){if(Ae>1e3){Ae=0;try{Lt()}catch(e){if(He!==null)Ye(e,He,null);else throw e}}Ae++}function vn(e){var r=e.length;if(r!==0){cn();var t=he;he=!0;try{for(var n=0;n<r;n++){var u=e[n];u.f&q||(u.f^=q);var f=[];vt(u,f),_n(f)}}finally{he=t}}}function _n(e){var r=e.length;if(r!==0)for(var t=0;t<r;t++){var n=e[t];if(!(n.f&(ye|W)))try{De(n)&&(We(n),n.deps===null&&n.first===null&&n.nodes_start===null&&(n.teardown===null?lt(n):n.fn=null))}catch(u){Ye(u,n,null,n.ctx)}}}function dn(){if(Ue=!1,Ae>1001)return;const e=lr;lr=[],vn(e),Ue||(Ae=0,He=null)}function ze(e){Ue||(Ue=!0,queueMicrotask(dn)),He=e;for(var r=e;r.parent!==null;){r=r.parent;var t=r.f;if(t&(Ne|K)){if(!(t&q))return;r.f^=q}}lr.push(r)}function vt(e,r){var t=e.first,n=[];e:for(;t!==null;){var u=t.f,f=(u&K)!==0,c=f&&(u&q)!==0,y=t.next;if(!c&&!(u&W))if(u&Ce){if(f)t.f^=q;else try{De(t)&&We(t)}catch(_){Ye(_,t,null,t.ctx)}var v=t.first;if(v!==null){t=v;continue}}else u&Fr&&n.push(t);if(y===null){let _=t.parent;for(;_!==null;){if(e===_)break e;var o=_.next;if(o!==null){t=o;continue e}_=_.parent}}t=y}for(var a=0;a<n.length;a++)v=n[a],r.push(v),vt(v,r)}function E(e){var a;var r=e.f,t=(r&H)!==0;if(t&&r&ye){var n=Gr(e);return pr(e),n}if(T!==null){z!==null&&z.includes(e)&&Bt();var u=T.deps;b===null&&u!==null&&u[$]===e?$++:b===null?b=[e]:b.push(e),ee!==null&&A!==null&&A.f&q&&!(A.f&K)&&ee.includes(e)&&(G(A,re),ze(A))}else if(t&&e.deps===null)for(var f=e,c=f.parent,y=f;c!==null;)if(c.f&H){var v=c;y=v,c=v.parent}else{var o=c;(a=o.deriveds)!=null&&a.includes(y)||(o.deriveds??(o.deriveds=[])).push(y);break}return t&&(f=e,De(f)&&Qr(f)),e.v}function pe(e){const r=T;try{return T=null,e()}finally{T=r}}const hn=~(re|Oe|q);function G(e,r){e.f=e.f&hn|r}function _t(e,r=!1,t){N={p:N,c:null,e:null,m:!1,s:e,x:null,l:null},ge&&!r&&(N.l={s:null,u:null,r1:[],r2:U(!1)})}function dt(e){const r=N;if(r!==null){e!==void 0&&(r.x=e);const c=r.e;if(c!==null){var t=A,n=T;r.e=null;try{for(var u=0;u<c.length;u++){var f=c[u];Z(f.effect),ne(f.reaction),yr(f.fn)}}finally{Z(t),ne(n)}}N=r.p,r.m=!0}return e||{}}function pn(e){if(!(typeof e!="object"||!e||e instanceof EventTarget)){if(oe in e)ur(e);else if(!Array.isArray(e))for(let r in e){const t=e[r];typeof t=="object"&&t&&oe in t&&ur(t)}}}function ur(e,r=new Set){if(typeof e=="object"&&e!==null&&!(e instanceof EventTarget)&&!r.has(e)){r.add(e),e instanceof Date&&e.getTime();for(let n in e)try{ur(e[n],r)}catch{}const t=qr(e);if(t!==Object.prototype&&t!==Array.prototype&&t!==Map.prototype&&t!==Set.prototype&&t!==Date.prototype){const n=Et(t);for(let u in n){const f=n[u].get;if(f)try{f.call(e)}catch{}}}}}const yn=["touchstart","touchmove"];function gn(e){return yn.includes(e)}function wn(e){var r=T,t=A;ne(null),Z(null);try{return e()}finally{ne(r),Z(t)}}const mn=new Set,kr=new Set;function En(e,r,t,n){function u(f){if(n.capture||xe.call(r,f),!f.cancelBubble)return wn(()=>t.call(this,f))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?mr(()=>{r.addEventListener(e,u,n)}):r.addEventListener(e,u,n),u}function sr(e,r,t,n,u){var f={capture:n,passive:u},c=En(e,r,t,f);(r===document.body||r===window||r===document)&&Jr(()=>{r.removeEventListener(e,c,f)})}function xe(e){var k;var r=this,t=r.ownerDocument,n=e.type,u=((k=e.composedPath)==null?void 0:k.call(e))||[],f=u[0]||e.target,c=0,y=e.__root;if(y){var v=u.indexOf(y);if(v!==-1&&(r===document||r===window)){e.__root=r;return}var o=u.indexOf(r);if(o===-1)return;v<=o&&(c=v)}if(f=u[c]||e.target,f!==r){mt(e,"currentTarget",{configurable:!0,get(){return f||t}});var a=T,_=A;ne(null),Z(null);try{for(var h,d=[];f!==null;){var g=f.assignedSlot||f.parentNode||f.host||null;try{var x=f["__"+n];if(x!==void 0&&!f.disabled)if(fr(x)){var[O,...D]=x;O.apply(f,[e,...D])}else x.call(f,e)}catch(I){h?d.push(I):h=I}if(e.cancelBubble||g===r||g===null)break;f=g}if(h){for(let I of d)queueMicrotask(()=>{throw I});throw h}}finally{e.__root=r,delete e.currentTarget,ne(a),Z(_)}}}function ht(e){var r=document.createElement("template");return r.innerHTML=e,r.content}function Ar(e,r){var t=A;t.nodes_start===null&&(t.nodes_start=e,t.nodes_end=r)}function Ze(e,r){var t=(r&zt)!==0,n,u=!e.startsWith("<!>");return()=>{n===void 0&&(n=ht(u?e:"<!>"+e),n=Se(n));var f=t?document.importNode(n,!0):n.cloneNode(!0);return Ar(f,f),f}}function pt(e,r,t="svg"){var n=!e.startsWith("<!>"),u=`<${t}>${n?e:"<!>"+e}</${t}>`,f;return()=>{if(!f){var c=ht(u),y=Se(c);f=Se(y)}var v=f.cloneNode(!0);return Ar(v,v),v}}function Lr(){var e=document.createDocumentFragment(),r=document.createComment(""),t=hr();return e.append(r,t),Ar(r,t),e}function j(e,r){e!==null&&e.before(r)}function ir(e,r){var t=r==null?"":typeof r=="object"?r+"":r;t!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=t,e.nodeValue=t==null?"":t+"")}function xn(e,r){return An(e,r)}const _e=new Map;function An(e,{target:r,anchor:t,props:n={},events:u,context:f,intro:c=!0}){Gt();var y=new Set,v=_=>{for(var h=0;h<_.length;h++){var d=_[h];if(!y.has(d)){y.add(d);var g=gn(d);r.addEventListener(d,xe,{passive:g});var x=_e.get(d);x===void 0?(document.addEventListener(d,xe,{passive:g}),_e.set(d,1)):_e.set(d,x+1)}}};v(or(mn)),kr.add(v);var o=void 0,a=rn(()=>{var _=t??r.appendChild(hr());return gr(()=>{if(f){_t({});var h=N;h.c=f}u&&(n.$$events=u),o=e(_,n)||{},f&&dt()}),()=>{var g;for(var h of y){r.removeEventListener(h,xe);var d=_e.get(h);--d===0?(document.removeEventListener(h,xe),_e.delete(h)):_e.set(h,d)}kr.delete(v),_!==t&&((g=_.parentNode)==null||g.removeChild(_))}});return Sn.set(o,a),o}let Sn=new WeakMap;function Me(e,r){return r}function Tn(e,r,t,n){for(var u=[],f=r.length,c=0;c<f;c++)wr(r[c].e,u,!0);var y=f>0&&u.length===0&&t!==null;if(y){var v=t.parentNode;Qt(v),v.append(t),n.clear(),J(e,r[0].prev,r[f-1].next)}st(u,()=>{for(var o=0;o<f;o++){var a=r[o];y||(n.delete(a.k),J(e,a.prev,a.next)),te(a.e,!y)}})}function Pe(e,r,t,n,u,f=null){var c=e,y={flags:r,items:new Map,first:null},v=(r&Hr)!==0;if(v){var o=e;c=o.appendChild(hr())}var a=null,_=!1;et(()=>{var h=t(),d=fr(h)?h:h==null?[]:or(h),g=d.length;if(!(_&&g===0)){_=g===0;{var x=T;Cn(d,y,c,u,r,(x.f&W)!==0,n)}f!==null&&(g===0?a?it(a):a=gr(()=>f(c)):a!==null&&ut(a,()=>{a=null})),t()}})}function Cn(e,r,t,n,u,f,c,y){var me,Ee,Re,ke;var v=(u&$t)!==0,o=(u&(vr|_r))!==0,a=e.length,_=r.items,h=r.first,d=h,g,x=null,O,D=[],k=[],I,B,m,S;if(v)for(S=0;S<a;S+=1)I=e[S],B=c(I,S),m=_.get(B),m!==void 0&&((me=m.a)==null||me.measure(),(O??(O=new Set)).add(m));for(S=0;S<a;S+=1){if(I=e[S],B=c(I,S),m=_.get(B),m===void 0){var le=d?d.e.nodes_start:t;x=On(le,r,x,x===null?r.first:x.next,I,B,S,n,u),_.set(B,x),D=[],k=[],d=x.next;continue}if(o&&Nn(m,I,S,u),m.e.f&W&&(it(m.e),v&&((Ee=m.a)==null||Ee.unfix(),(O??(O=new Set)).delete(m))),m!==d){if(g!==void 0&&g.has(m)){if(D.length<k.length){var C=k[0],L;x=C.prev;var Q=D[0],ue=D[D.length-1];for(L=0;L<D.length;L+=1)Mr(D[L],C,t);for(L=0;L<k.length;L+=1)g.delete(k[L]);J(r,Q.prev,ue.next),J(r,x,Q),J(r,ue,C),d=C,x=ue,S-=1,D=[],k=[]}else g.delete(m),Mr(m,d,t),J(r,m.prev,m.next),J(r,m,x===null?r.first:x.next),J(r,x,m),x=m;continue}for(D=[],k=[];d!==null&&d.k!==B;)(f||!(d.e.f&W))&&(g??(g=new Set)).add(d),k.push(d),d=d.next;if(d===null)continue;m=d}D.push(m),x=m,d=m.next}if(d!==null||g!==void 0){for(var Y=g===void 0?[]:or(g);d!==null;)(f||!(d.e.f&W))&&Y.push(d),d=d.next;var ce=Y.length;if(ce>0){var Ie=u&Hr&&a===0?t:null;if(v){for(S=0;S<ce;S+=1)(Re=Y[S].a)==null||Re.measure();for(S=0;S<ce;S+=1)(ke=Y[S].a)==null||ke.fix()}Tn(r,Y,Ie,_)}}v&&mr(()=>{var Le;if(O!==void 0)for(m of O)(Le=m.a)==null||Le.apply()}),A.first=r.first&&r.first.e,A.last=x&&x.e}function Nn(e,r,t,n){n&vr&&je(e.v,r),n&_r?je(e.i,t):e.i=t}function On(e,r,t,n,u,f,c,y,v,o){var a=(v&vr)!==0,_=(v&Vt)===0,h=a?_?dr(u):U(u):u,d=v&_r?U(c):c,g={i:d,v:h,k:f,a:null,e:null,prev:t,next:n};try{return g.e=gr(()=>y(e,h,d),Yr),g.e.prev=t&&t.e,g.e.next=n&&n.e,t===null?r.first=g:(t.next=g,t.e.next=g.e),n!==null&&(n.prev=g,n.e.prev=g.e),g}finally{}}function Mr(e,r,t){for(var n=e.next?e.next.e.nodes_start:t,u=r?r.e.nodes_start:t,f=e.e.nodes_start;f!==n;){var c=Ke(f);u.before(f),f=c}}function J(e,r,t){r===null?e.first=t:(r.next=t,r.e.next=t&&t.e),t!==null&&(t.prev=r,t.e.prev=r&&r.e)}function Fe(e,r,t){var n=e.__className,u=Dn(r);(n!==u||Yr)&&(r==null&&!t?e.removeAttribute("class"):e.className=u,e.__className=u)}function Dn(e,r){return(e??"")+""}function In(e,r,t){var n=fe(e,r);n&&n.set&&(e[r]=t,Jr(()=>{e[r]=null}))}function Pr(e,r){return e===r||(e==null?void 0:e[oe])===r}function Rn(e={},r,t,n){return yr(()=>{var u,f;return jr(()=>{u=f,f=[],pe(()=>{e!==t(...f)&&(r(e,...f),u&&Pr(t(...u),e)&&r(null,...u))})}),()=>{mr(()=>{f&&Pr(t(...f),e)&&r(null,...f)})}}),e}function kn(e=!1){const r=N,t=r.l.u;if(!t)return;let n=()=>pn(r.s);if(e){let u=0,f={};const c=Ve(()=>{let y=!1;const v=r.s;for(const o in v)v[o]!==f[o]&&(f[o]=v[o],y=!0);return y&&u++,u});n=()=>E(c)}t.b.length&&en(()=>{br(r,n),Xe(t.b)}),rr(()=>{const u=pe(()=>t.m.map(St));return()=>{for(const f of u)typeof f=="function"&&f()}}),t.a.length&&rr(()=>{br(r,n),Xe(t.a)})}function br(e,r){if(e.l.s)for(const t of e.l.s)E(t);r()}let be=!1;function Ln(e){var r=be;try{return be=!1,[e(),be]}finally{be=r}}function Br(e){for(var r=A,t=A;r!==null&&!(r.f&(K|Ne));)r=r.parent;try{return Z(r),e()}finally{Z(t)}}function Qe(e,r,t,n){var le;var u=(t&Ut)!==0,f=!ge||(t&Ht)!==0,c=(t&Yt)!==0,y=(t&Wt)!==0,v=!1,o;c?[o,v]=Ln(()=>e[r]):o=e[r];var a=oe in e||Ot in e,_=((le=fe(e,r))==null?void 0:le.set)??(a&&c&&r in e?C=>e[r]=C:void 0),h=n,d=!0,g=!1,x=()=>(g=!0,d&&(d=!1,y?h=pe(n):h=n),h);o===void 0&&n!==void 0&&(_&&f&&Mt(),o=x(),_&&_(o));var O;if(f)O=()=>{var C=e[r];return C===void 0?x():(d=!0,g=!1,C)};else{var D=Br(()=>(u?Ve:Xt)(()=>e[r]));D.f|=Ct,O=()=>{var C=E(D);return C!==void 0&&(h=void 0),C===void 0?h:C}}if(!(t&Kt))return O;if(_){var k=e.$$legacy;return function(C,L){return arguments.length>0?((!f||!L||k||v)&&_(L?O():C),C):O()}}var I=!1,B=!1,m=dr(o),S=Br(()=>Ve(()=>{var C=O(),L=E(m);return I?(I=!1,B=!0,L):(B=!1,m.v=C)}));return u||(S.equals=cr),function(C,L){if(arguments.length>0){const Q=L?E(S):f&&c?de(C):C;return S.equals(Q)||(I=!0,R(m,Q),g&&h!==void 0&&(h=Q),pe(()=>E(S))),C}return E(S)}}function Mn(e){N===null&&ln(),ge&&N.l!==null?Pn(N).m.push(e):rr(()=>{const r=pe(e);if(typeof r=="function")return r})}function Pn(e){var r=e.l;return r.u??(r.u={a:[],b:[],m:[]})}const bn="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(bn);Ft();var Bn=Ze("<div> </div>"),qn=Ze("<div></div>"),Fn=Ze('<div class="board svelte-15zasm0"><!> <div>Игра окончена!</div> <div class="board-layout svelte-15zasm0"></div></div>');function $n(e,r){_t(r,!1);let t=Qe(r,"score",12,0),n=Qe(r,"best",12,0),u=Qe(r,"ai",8,!1),f=!0,c=se(!1),y=0,v=[],o=se();const a=4,_="best_score";let h=se(null);const d=(s,l)=>{var i;return(i=E(h))==null?void 0:i.children[s*a+l]},g=s=>new Promise(l=>setTimeout(l,s)),x=async()=>{if(v.length)for(;;){const s=v.shift();if(!s)break;if(s.type=="create"){const l=d(s.to.x,s.to.y);l.classList.add("cell-created"),setTimeout(()=>{l.classList.remove("cell-created")},210)}if(s.type=="move"){console.log("Animation",s);const l=d(s.from.x,s.from.y),i=(P,M)=>P.x===M.x?P.y>M.y?"left":"right":P.x>M.x?"up":"down",p=(P,M)=>Math.abs(P.x-M.x)+Math.abs(P.y-M.y),w=`cell-move-${i(s.from,s.to)}-${p(s.from,s.to)}`;l.classList.add(w),setTimeout(()=>{l.classList.remove(w)},210)}if(s.type=="upgrade"){const l=d(s.to.x,s.to.y);l.classList.add("cell-upgraded"),setTimeout(()=>{l.classList.remove("cell-upgraded")},210)}}},O=s=>{R(o,[...s])},D=s=>btoa(String(s<<7^3735928559)),k=s=>(Number(atob(s))^3735928559)>>7,I=()=>{localStorage.setItem(_,D(n()))},B=()=>{let s=localStorage.getItem(_);n(s?k(s):0)},m=()=>{t(0),R(o,new Array);for(let s=0;s<a;++s){Nr(o,E(o)[s]=new Array);for(let l=0;l<a;++l)Nr(o,E(o)[s][l]=null)}Y(E(o)),Y(E(o)),R(c,!1),y=0,v=[]},S=(s,l)=>{for(let i=0;i<a;++i)for(let p=0;p<a;++p)if(s[i][p]!==l[i][p])return!1;return!0};Mn(()=>{B(),m(),setInterval(()=>{if(!u()||E(c))return;const s=ue(E(o));let l=Math.random();l>.75?le(s):l>.5?C(s):l>.25?L(s):Q(s),!S(E(o),s)&&(Y(s),R(c,!Sr(s)),v=[],R(o,[...s]))},50)});const le=s=>{for(let l=0;l<a;++l)for(let i=0;i<a;++i)v.push(...ce(s,l,i)),s=[...s]},C=s=>{for(let l=a-1;l>=0;--l)for(let i=0;i<a;++i)v.push(...Ie(s,l,i)),s=[...s]},L=s=>{for(let l=0;l<a;++l)for(let i=0;i<a;++i)v.push(...me(s,i,l)),s=[...s]},Q=s=>{for(let l=a-1;l>=0;--l)for(let i=0;i<a;++i)v.push(...Ee(s,i,l)),s=[...s]},ue=s=>{const l=[];for(let i=0;i<a;++i)l[i]=[...s[i]];return l},Y=s=>{const l=[];for(let M=0;M<a;++M)for(let ve=0;ve<a;++ve)s[M][ve]||l.push([M,ve]);if(!l.length)return!1;const i=l.length*Math.random()|0;let p=Math.random()>.9?4:2,w=l[i][0],P=l[i][1];return s[w][P]=p,v.push({type:"create",from:{x:w,y:P,value:null},to:{x:w,y:P,value:p}}),!0},ce=(s,l,i,p)=>{if(!s[l][i]||l<=0)return p?[p]:[];p||(p={type:"move",from:{x:l,y:i,value:s[l][i]},to:{x:l,y:i,value:s[l][i]}});const w=s[l][i];return s[l-1][i]===null?(s[l][i]=null,s[l-1][i]=w,p.to={x:l-1,y:i,value:w},ce(s,l-1,i,p)):s[l-1][i]===w?(s[l][i]=null,t(t()+w*2),s[l-1][i]=w*2,p.to={x:l-1,y:i,value:w},[p,{type:"upgrade",from:{x:l-1,y:i,value:w},to:{x:l-1,y:i,value:w*2}}]):[p]},Ie=(s,l,i,p)=>{if(!s[l][i]||l>=a-1)return p?[p]:[];p||(p={type:"move",from:{x:l,y:i,value:s[l][i]},to:{x:l,y:i,value:s[l][i]}});const w=s[l][i];return s[l+1][i]===null?(s[l][i]=null,s[l+1][i]=w,p.to={x:l+1,y:i,value:w},Ie(s,l+1,i,p)):s[l+1][i]===w?(s[l][i]=null,t(t()+w*2),s[l+1][i]=w*2,p.to={x:l+1,y:i,value:w},[p,{type:"upgrade",from:{x:l+1,y:i,value:w},to:{x:l+1,y:i,value:w*2}}]):[p]},me=(s,l,i,p)=>{if(!s[l][i]||i<=0)return p?[p]:[];p||(p={type:"move",from:{x:l,y:i,value:s[l][i]},to:{x:l,y:i,value:s[l][i]}});const w=s[l][i];return s[l][i-1]===null?(s[l][i]=null,s[l][i-1]=w,p.to={x:l,y:i-1,value:w},me(s,l,i-1,p)):s[l][i-1]===w?(s[l][i]=null,t(t()+w*2),s[l][i-1]=w*2,p.to={x:l,y:i-1,value:w},[p,{type:"upgrade",from:{x:l,y:i-1,value:w},to:{x:l,y:i-1,value:w*2}}]):[p]},Ee=(s,l,i,p)=>{if(!s[l][i]||i>=a-1)return p?[p]:[];p||(p={type:"move",from:{x:l,y:i,value:s[l][i]},to:{x:l,y:i,value:s[l][i]}});const w=s[l][i];return s[l][i+1]===null?(s[l][i]=null,s[l][i+1]=w,p.to={x:l,y:i+1,value:w},Ee(s,l,i+1,p)):s[l][i+1]===w?(s[l][i]=null,t(t()+w*2),s[l][i+1]=w*2,p.to={x:l,y:i+1,value:w},[p,{type:"upgrade",from:{x:l,y:i+1,value:w},to:{x:l,y:i+1,value:w*2}}]):[p]},Re=s=>s==="Enter"&&E(c)?(m(),!0):!1,ke=(s,l)=>{if(s==="ArrowUp"||s==="KeyW")le(l);else if(s==="ArrowDown"||s==="KeyS")C(l);else if(s==="ArrowLeft"||s==="KeyA")L(l);else if(s==="ArrowRight"||s==="KeyD")Q(l);else return!1;return v=v.filter(i=>i.type!=="move"||i.type==="move"&&(i.from.x!==i.to.x||i.from.y!==i.to.y)),!0},Le=(s,l,i)=>s[l][i]===void 0?!1:s[l][i]===null||l>0&&s[l-1][i]===s[l][i]||l<a-1&&s[l+1][i]===s[l][i]||i>0&&s[l][i-1]===s[l][i]||i<a-1&&s[l][i+1]===s[l][i],Sr=s=>{let l=!1;for(let i=0;i<a;++i)for(let p=0;p<a;++p)l||(l=Le(s,i,p));return l},yt=async s=>{if(!f||Re(s.code)||u())return;f=!1;const l=ue(E(o));if(ke(s.code,l)){if(S(E(o),l)){f=!0;return}y+=1,console.log("Step:",y),console.log([...v]),await x(),await g(200),O(l);const i=ue(l);Y(i),O(i),setTimeout(async()=>{await x()}),await g(100),R(c,!Sr(i))}t()>n()&&(n(t()),I()),f=!0};kn();var Ge=Fn();sr("keydown",er,yt);var Tr=V(Ge);Pe(Tr,1,()=>E(o),Me,(s,l)=>{var i=Lr(),p=Dr(i);Pe(p,1,()=>E(l),Me,(w,P)=>{var M=Bn(),ve=V(M);Be(()=>{Fe(M,`${`board-cell ${E(P)?`cell-${E(P)}`:""}`??""} svelte-15zasm0`),ir(ve,E(P)??"")}),j(w,M)}),j(s,i)});var Cr=X(Tr,2),gt=X(Cr,2);return Pe(gt,5,()=>E(o),Me,(s,l)=>{var i=Lr(),p=Dr(i);Pe(p,1,()=>E(l),Me,(w,P)=>{var M=qn();Be(()=>Fe(M,`${`cell-${E(P)}`??""} svelte-15zasm0`)),j(w,M)}),j(s,i)}),Rn(Ge,s=>R(h,s),()=>E(h)),Be(()=>Fe(Cr,`${`msg-container ${E(c)?"active":"hidden"}`??""} svelte-15zasm0`)),j(e,Ge),In(r,"resetBoard",m),dt({resetBoard:m})}var Vn=pt('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g fill="none" stroke="#776E65" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"><path d="M15.5 13a3.5 3.5 0 0 0-3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1-7 0v-1.8"></path><path d="M17.5 16a3.5 3.5 0 0 0 0-7H17"></path><path d="M19 9.3V6.5a3.5 3.5 0 0 0-7 0M6.5 16a3.5 3.5 0 0 1 0-7H7"></path><path d="M5 9.3V6.5a3.5 3.5 0 0 1 7 0v10"></path></g></svg>');function Un(e){var r=Vn();j(e,r)}var Hn=pt('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="#776E65" d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2v2a8 8 0 1 1-5.135 1.865L9 8V2H3l2.446 2.447A9.98 9.98 0 0 0 2 12"></path></svg>');function Kn(e){var r=Hn();j(e,r)}var Yn=Ze('<main class="svelte-j0us8p"><div class="title svelte-j0us8p"><div class="header svelte-j0us8p"><h1>2048</h1></div> <div class="icon-container svelte-j0us8p"><button class="icon svelte-j0us8p"><!></button> <button><!></button></div> <div class="score-container svelte-j0us8p"><section class="score svelte-j0us8p"><div class="svelte-j0us8p">Счёт</div> <div class="svelte-j0us8p"> </div></section> <section class="score svelte-j0us8p"><div class="svelte-j0us8p">Лучший</div> <div class="svelte-j0us8p"> </div></section></div></div> <!></main>');function Wn(e){let r=se(0),t=se(0),n=se(!1),u=se();const f=()=>{R(n,!E(n))};var c=Yn(),y=V(c),v=X(V(y),2),o=V(v),a=V(o);Kn(a);var _=X(o,2),h=V(_);Un(h);var d=X(v,2),g=V(d),x=X(V(g),2),O=V(x),D=X(g,2),k=X(V(D),2),I=V(k),B=X(y,2);$n(B,{get score(){return E(r)},set score(m){R(r,m)},get best(){return E(t)},set best(m){R(t,m)},get resetBoard(){return E(u)},set resetBoard(m){R(u,m)},get ai(){return E(n)},set ai(m){R(n,m)},$$legacy:!0}),Be(()=>{Fe(_,`${`icon ${E(n)?"active":""}`??""} svelte-j0us8p`),ir(O,E(r)),ir(I,E(t))}),sr("click",o,function(...m){var S;(S=E(u))==null||S.apply(this,m)}),sr("click",_,f),j(e,c)}xn(Wn,{target:document.getElementById("app")});
