import{r as h,f as k,u as $,s as C,a as A,R as _,B as D,c as F,m as rr,p as W}from"./index-6b556b87.js";import{P as er}from"./Paper-66511001.js";function tr(r){return h.Children.toArray(r).filter(Boolean)}var ar={root:"m-4081bf90"};const q=ar;var sr=Object.defineProperty,or=Object.defineProperties,nr=Object.getOwnPropertyDescriptors,y=Object.getOwnPropertySymbols,H=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable,G=(r,e,t)=>e in r?sr(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,R=(r,e)=>{for(var t in e||(e={}))H.call(e,t)&&G(r,t,e[t]);if(y)for(var t of y(e))J.call(e,t)&&G(r,t,e[t]);return r},lr=(r,e)=>or(r,nr(e)),ir=(r,e)=>{var t={};for(var a in r)H.call(r,a)&&e.indexOf(a)<0&&(t[a]=r[a]);if(r!=null&&y)for(var a of y(r))e.indexOf(a)<0&&J.call(r,a)&&(t[a]=r[a]);return t};const cr={preventGrowOverflow:!0,gap:"md",align:"center",justify:"flex-start",wrap:"wrap"},pr=F((r,{grow:e,preventGrowOverflow:t,gap:a,align:o,justify:n,wrap:l},{childWidth:i})=>({root:{"--group-child-width":e&&t?i:void 0,"--group-gap":C(a),"--group-align":o,"--group-justify":n,"--group-wrap":l}})),K=k((r,e)=>{const t=$("Group",cr,r),a=t,{classNames:o,className:n,style:l,styles:i,unstyled:p,children:f,gap:c,align:w,justify:d,wrap:P,grow:v,preventGrowOverflow:S,vars:s,variant:m,__size:U}=a,X=ir(a,["classNames","className","style","styles","unstyled","children","gap","align","justify","wrap","grow","preventGrowOverflow","vars","variant","__size"]),b=tr(f),E=b.length,x=C(c??"md"),Y={childWidth:`calc(${100/E}% - (${x} - ${x} / ${E}))`},Z=A({name:"Group",props:t,stylesCtx:Y,className:n,style:l,classes:q,classNames:o,styles:i,unstyled:p,vars:s,varsResolver:pr});return _.createElement(D,R(lr(R({},Z("root")),{ref:e,variant:m,mod:{grow:v},size:U}),X),b)});K.classes=q;K.displayName="@mantine/core/Group";const[fr,dr]=rr("Card component was not found in tree");var vr={root:"m-e615b15f",section:"m-599a2148"};const N=vr;var mr=Object.defineProperty,u=Object.getOwnPropertySymbols,L=Object.prototype.hasOwnProperty,M=Object.prototype.propertyIsEnumerable,I=(r,e,t)=>e in r?mr(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,B=(r,e)=>{for(var t in e||(e={}))L.call(e,t)&&I(r,t,e[t]);if(u)for(var t of u(e))M.call(e,t)&&I(r,t,e[t]);return r},_r=(r,e)=>{var t={};for(var a in r)L.call(r,a)&&e.indexOf(a)<0&&(t[a]=r[a]);if(r!=null&&u)for(var a of u(r))e.indexOf(a)<0&&M.call(r,a)&&(t[a]=r[a]);return t};const yr={},O=W((r,e)=>{const a=$("CardSection",yr,r),{classNames:o,className:n,style:l,styles:i,vars:p,withBorder:f,inheritPadding:c}=a,w=_r(a,["classNames","className","style","styles","vars","withBorder","inheritPadding"]),d=dr();return _.createElement(D,B(B({ref:e,mod:{"with-border":f,"inherit-padding":c}},d.getStyles("section",{className:n,style:l,styles:i,classNames:o})),w))});O.classes=N;O.displayName="@mantine/core/CardSection";var ur=Object.defineProperty,g=Object.getOwnPropertySymbols,Q=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable,V=(r,e,t)=>e in r?ur(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,z=(r,e)=>{for(var t in e||(e={}))Q.call(e,t)&&V(r,t,e[t]);if(g)for(var t of g(e))T.call(e,t)&&V(r,t,e[t]);return r},gr=(r,e)=>{var t={};for(var a in r)Q.call(r,a)&&e.indexOf(a)<0&&(t[a]=r[a]);if(r!=null&&g)for(var a of g(r))e.indexOf(a)<0&&T.call(r,a)&&(t[a]=r[a]);return t};const Or={},wr=F((r,{padding:e})=>({root:{"--card-padding":C(e)}})),j=W((r,e)=>{const t=$("Card",Or,r),a=t,{classNames:o,className:n,style:l,styles:i,unstyled:p,vars:f,children:c,padding:w}=a,d=gr(a,["classNames","className","style","styles","unstyled","vars","children","padding"]),P=A({name:"Card",props:t,classes:N,className:n,style:l,classNames:o,styles:i,unstyled:p,vars:f,varsResolver:wr}),v=h.Children.toArray(c),S=v.map((s,m)=>typeof s=="object"&&s&&"type"in s&&s.type===O?h.cloneElement(s,{"data-first-section":m===0||void 0,"data-last-section":m===v.length-1||void 0}):s);return _.createElement(fr,{value:{getStyles:P}},_.createElement(er,z(z({ref:e,unstyled:p},P("root")),d),S))});j.classes=N;j.displayName="@mantine/core/Card";j.Section=O;export{j as C,K as G};