import{f as R,u as I,a as b,x as A,y as C,z as T,R as l,I as B,B as D,A as L}from"./index-6b556b87.js";const $={gap:{type:"spacing",property:"gap"},rowGap:{type:"spacing",property:"rowGap"},columnGap:{type:"spacing",property:"columnGap"},align:{type:"identity",property:"alignItems"},justify:{type:"identity",property:"justifyContent"},wrap:{type:"identity",property:"flexWrap"},direction:{type:"identity",property:"flexDirection"}};var z={root:"m-8bffd616"};const y=z;var M=Object.defineProperty,n=Object.getOwnPropertySymbols,c=Object.prototype.hasOwnProperty,m=Object.prototype.propertyIsEnumerable,p=(e,s,t)=>s in e?M(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t,i=(e,s)=>{for(var t in s||(s={}))c.call(s,t)&&p(e,t,s[t]);if(n)for(var t of n(s))m.call(s,t)&&p(e,t,s[t]);return e},V=(e,s)=>{var t={};for(var a in e)c.call(e,a)&&s.indexOf(a)<0&&(t[a]=e[a]);if(e!=null&&n)for(var a of n(e))s.indexOf(a)<0&&m.call(e,a)&&(t[a]=e[a]);return t};const W={},f=R((e,s)=>{const t=I("Flex",W,e),a=t,{classNames:d,className:u,style:_,styles:g,unstyled:v,vars:P,gap:w,rowGap:O,columnGap:S,align:x,justify:N,wrap:G,direction:j}=a,E=V(a,["classNames","className","style","styles","unstyled","vars","gap","rowGap","columnGap","align","justify","wrap","direction"]),F=b({name:"Flex",classes:y,props:t,className:u,style:_,classNames:d,styles:g,unstyled:v,vars:P}),h=A(),o=C(),r=T({styleProps:{gap:w,rowGap:O,columnGap:S,align:x,justify:N,wrap:G,direction:j},theme:h,data:$});return l.createElement(l.Fragment,null,r.hasResponsiveStyles&&l.createElement(B,{selector:`.${o}`,styles:r.styles,media:r.media}),l.createElement(D,i(i({ref:s},F("root",{className:o,style:L(r.inlineStyles)})),E)))});f.classes=y;f.displayName="@mantine/core/Flex";export{f as F};
