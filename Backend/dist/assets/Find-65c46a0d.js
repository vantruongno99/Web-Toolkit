import{u as V,R as v,f as le,a as te,e as ae,B as ie,c as ne,g as oe,b,d as ce,r as P,j as e,C as pe,h as de}from"./index-6b556b87.js";import{C as ue,a as me,G as n,D as he,T as fe,M as ge,S as _}from"./application.service-3a4285aa.js";import{c as ve,u as T,a as xe,b as D}from"./use-form-fe48e6a4.js";import{T as x}from"./Title-be952a78.js";import{T as f}from"./Text-b1f6d07e.js";import{F as C}from"./Flex-4d345809.js";import{B as je}from"./Button-89a80ae3.js";import{S as be}from"./ScrollArea-8e8f695f.js";import{C as G,G as Ce}from"./Card-4b6546f1.js";import"./config-3ad541f8.js";import"./Paper-66511001.js";const[ye,Pe]=ve(),$e={};function F(s){const{value:l,defaultValue:r,onChange:t,multiple:o,children:d}=V("ChipGroup",$e,s),[c,g]=T({value:l,defaultValue:r,finalValue:o?[]:null,onChange:t}),i=p=>Array.isArray(c)?c.includes(p):p===c,u=p=>{const m=p.currentTarget.value;Array.isArray(c)?g(c.includes(m)?c.filter(S=>S!==m):[...c,m]):g(m)};return v.createElement(ye,{value:{isChipSelected:i,onChange:u,multiple:o}},d)}F.displayName="@mantine/core/ChipGroup";var Se={root:"m-f59ffda3",label:"m-be049a53","label--outline":"m-3904c1af","label--filled":"m-fa109255","label--light":"m-f7e165c3",iconWrapper:"m-9ac86df9",checkIcon:"m-d6d72580",input:"m-bde07329"};const B=Se;var Ie=Object.defineProperty,_e=Object.defineProperties,we=Object.getOwnPropertyDescriptors,$=Object.getOwnPropertySymbols,L=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable,A=(s,l,r)=>l in s?Ie(s,l,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[l]=r,h=(s,l)=>{for(var r in l||(l={}))L.call(l,r)&&A(s,r,l[r]);if($)for(var r of $(l))U.call(l,r)&&A(s,r,l[r]);return s},ze=(s,l)=>_e(s,we(l)),Oe=(s,l)=>{var r={};for(var t in s)L.call(s,t)&&l.indexOf(t)<0&&(r[t]=s[t]);if(s!=null&&$)for(var t of $(s))l.indexOf(t)<0&&U.call(s,t)&&(r[t]=s[t]);return r};const Ee={type:"checkbox"},ke=ne((s,{size:l,radius:r,variant:t,color:o})=>{const d=s.variantColorResolver({color:o||s.primaryColor,theme:s,variant:t});return{root:{"--chip-fz":oe(l),"--chip-size":b(l,"chip-size"),"--chip-radius":r===void 0?void 0:ce(r),"--chip-checked-padding":b(l,"chip-checked-padding"),"--chip-padding":b(l,"chip-padding"),"--chip-icon-size":b(l,"chip-icon-size"),"--chip-bg":o||t?d.background:void 0,"--chip-hover":o||t?d.hover:void 0,"--chip-color":o||t?d.color:void 0,"--chip-bd":o||t?d.border:void 0,"--chip-spacing":b(l,"chip-spacing")}}}),a=le((s,l)=>{const r=V("Chip",Ee,s),t=r,{classNames:o,className:d,style:c,styles:g,unstyled:i,vars:u,id:p,checked:m,defaultChecked:S,onChange:M,value:w,wrapperProps:W,type:q,disabled:z,children:H,size:J,variant:O,icon:K,rootRef:Q}=t,X=Oe(t,["classNames","className","style","styles","unstyled","vars","id","checked","defaultChecked","onChange","value","wrapperProps","type","disabled","children","size","variant","icon","rootRef"]),j=te({name:"Chip",classes:B,props:r,className:d,style:c,classNames:o,styles:g,unstyled:i,vars:u,varsResolver:ke}),y=Pe(),E=xe(p),{styleProps:Y,rest:Z}=ae(X),[ee,se]=T({value:m,defaultValue:S,finalValue:!1,onChange:M}),k=y?{checked:y.isChipSelected(w),onChange:y.onChange,type:y.multiple?"checkbox":"radio"}:{},I=k.checked||ee;return v.createElement(ie,h(h(h({size:J,variant:O,ref:Q},j("root")),Y),W),v.createElement("input",h(h(ze(h({type:q},j("input")),{checked:I,onChange:re=>se(re.currentTarget.checked),id:E,disabled:z,ref:l,value:w}),k),Z)),v.createElement("label",h({htmlFor:E,"data-checked":I||void 0,"data-disabled":z||void 0},j("label",{variant:O||"filled"})),I&&v.createElement("span",h({},j("iconWrapper")),K||v.createElement(ue,h({},j("checkIcon")))),H))});a.classes=B;a.displayName="@mantine/core/Chip";a.Group=F;const Ge="_app_txr6q_1",N={app:Ge},Ae="_cardSection_17oc7_1",Ne="_scrollbar_17oc7_17",R={cardSection:Ae,scrollbar:Ne},Je=()=>{const[s,l]=P.useState([]),[r,t]=P.useState([]);P.useEffect(()=>{d()},[]);const o=(i,u)=>u.length==0||i.length===0?!0:u.every(p=>i.includes(p)),d=async()=>{const i=await me.getAllApplication();console.log(i),l(i),t(i)},c=D({initialValues:{purpose:[],engagement:[],scale:[],budget:[]}}),g=i=>{const u=s==null?void 0:s.filter(p=>(i.engagement.length===0?!0:i.engagement.includes(p.levelOfEngagement))&&(i.budget.length===0?!0:i.budget.includes(p.budget))&&(i.scale.length===0?!0:i.scale.includes(p.scale))&&o(p.purposeOfEngagement.split(", ").map(m=>m==""?"":m[0].toUpperCase()+m.slice(1)),i.purpose));t(u)};return e.jsx("div",{children:e.jsx("form",{onSubmit:c.onSubmit(g),children:e.jsxs(n,{children:[e.jsxs(n.Col,{span:4,p:"3rem",children:[e.jsx(x,{order:3,children:"TOOLS"}),e.jsx(f,{mt:"1rem",children:"Use the filter below to identify the engagement tools that best suit your specific road safety engagement needs."}),e.jsx(x,{order:4,mt:"1rem",children:"Purpose (IAP2)"}),e.jsx(a.Group,{multiple:!0,...c.getInputProps("purpose"),children:e.jsxs(C,{mt:"1rem",gap:"sm",justify:"flex-start",align:"flex-start",direction:"row",wrap:"wrap",children:[e.jsx(a,{value:"Inform",size:"md",children:"Inform"}),e.jsx(a,{value:"Consult",size:"md",children:"Consult"}),e.jsx(a,{value:"Involve",size:"md",children:"Involve"}),e.jsx(a,{value:"Collaborate",size:"md",children:"Collaborate"}),e.jsx(a,{value:"Empower",size:"md",children:"Empower"})]})}),e.jsx(x,{order:4,mt:"1rem",children:"Level of Engagement"}),e.jsx(a.Group,{multiple:!0,...c.getInputProps("engagement"),children:e.jsxs(C,{mt:"1rem",gap:"sm",justify:"flex-start",align:"flex-start",direction:"row",wrap:"wrap",children:[e.jsx(a,{value:"Active",size:"md",children:"Active"}),e.jsx(a,{value:"Passive",size:"md",children:"Passive"}),e.jsx(a,{value:"Immersive",size:"md",children:"Immersive"})]})}),e.jsx(x,{order:4,mt:"1rem",children:"Scale"}),e.jsx(a.Group,{multiple:!0,...c.getInputProps("scale"),children:e.jsxs(C,{mt:"1rem",gap:"sm",justify:"flex-start",align:"flex-start",direction:"row",wrap:"wrap",children:[e.jsx(a,{value:"Invidual",size:"md",children:"Invidual"}),e.jsx(a,{value:"Small Group",size:"md",children:"Small Group"}),e.jsx(a,{value:"Large Group",size:"md",children:"Large Group"}),e.jsx(a,{value:"Public",size:"md",children:"Public"})]})}),e.jsx(x,{order:4,mt:"1rem",children:"Budget"}),e.jsx(a.Group,{multiple:!0,...c.getInputProps("budget"),children:e.jsxs(C,{mt:"1rem",gap:"sm",justify:"flex-start",align:"flex-start",direction:"row",wrap:"wrap",children:[e.jsx(a,{size:"md",value:"$",children:"$"}),e.jsx(a,{size:"md",value:"$$",children:"$$"}),e.jsx(a,{size:"md",value:"$$$",children:"$$$"}),e.jsx(a,{size:"md",value:"$$$$",children:"$$$$"})]})}),e.jsx(je,{mt:"1rem",type:"submit",children:"Search"})]}),e.jsx(n.Col,{span:8,className:R.cardSection,children:e.jsx(be,{className:R.scrollbar,scrollbarSize:2,scrollHideDelay:0,children:e.jsx(pe,{fluid:!0,p:"2rem",children:r==null?void 0:r.map((i,u)=>e.jsx(Re,{data:i},u))})})})]})})})},Re=({data:s})=>{const l=de(),r=D({initialValues:{potentialApplications:"",explanation:"",maturity:"",stageOfParticipation:"",purposeOfEngagement:[],levelOfEngagement:"",scale:"",budget:"",solutionFor:"",considerations:""}});return P.useEffect(()=>{const t={...s,purposeOfEngagement:s.purposeOfEngagement.split(",").map(o=>o.charAt(0).toUpperCase()+o.slice(1))};r.setValues(t)},[s]),e.jsx("div",{className:N.app,children:e.jsx(C,{gap:"md",children:e.jsx(G,{shadow:"sm",radius:"md",withBorder:!0,p:"2rem",className:N.insideCard,onClick:()=>l(`/application/${s.id}`),children:e.jsxs(G.Section,{children:[e.jsx(Ce,{justify:"apart",children:e.jsx(x,{order:2,children:s.potentialApplications})}),e.jsx(f,{fz:"sm",mt:"1rem",children:s.explanation}),e.jsx(f,{fz:"sm",children:s.maturity}),e.jsx(he,{mt:"1rem",size:"xs",color:"black"}),e.jsxs(n,{justify:"flex-start",align:"center",mt:"1rem",children:[e.jsx(n.Col,{span:3,children:e.jsx(f,{fz:"sm",children:"Stage of participation :"})}),e.jsx(n.Col,{span:9,children:e.jsx(fe,{...r.getInputProps("stageOfParticipation"),autosize:!0,minRows:1})})]}),e.jsxs(n,{justify:"flex-start",align:"center",mt:"1rem",children:[e.jsx(n.Col,{span:3,children:e.jsx(f,{fz:"sm",children:"Purpose :"})}),e.jsx(n.Col,{span:9,children:e.jsx(ge,{...r.getInputProps("purposeOfEngagement"),data:[{value:"Collaborate",label:"Collaborate"},{value:"Inform",label:"Inform"},{value:"Involve",label:"Involve"},{value:"Consult",label:"Consult"},{value:"Empower",label:"Empower"}]})})]}),e.jsxs(n,{justify:"flex-start",align:"center",mt:"1rem",children:[e.jsx(n.Col,{span:3,children:e.jsx(f,{fz:"sm",children:"Level :"})}),e.jsx(n.Col,{span:3,children:e.jsx(_,{...r.getInputProps("levelOfEngagement"),data:[{value:"Active",label:"Active"},{value:"Passive",label:"Passive"},{value:"Immersive",label:"Immersive"}]})})]}),e.jsxs(n,{justify:"flex-start",align:"center",mt:"1rem",children:[e.jsx(n.Col,{span:3,children:e.jsx(f,{fz:"sm",children:"Scale :"})}),e.jsx(n.Col,{span:3,children:e.jsx(_,{...r.getInputProps("scale"),data:[{value:"Individual",label:"Individual"},{value:"Small group",label:"Small group"},{value:"Large group",label:"Large group"},{value:"Public",label:"Public"}]})})]}),e.jsxs(n,{justify:"flex-start",align:"center",mt:"1rem",children:[e.jsx(n.Col,{span:3,children:e.jsx(f,{fz:"sm",children:"Budget :"})}),e.jsx(n.Col,{span:3,children:e.jsx(_,{...r.getInputProps("budget"),data:[{value:"$",label:"$"},{value:"$$",label:"$$"},{value:"$$$",label:"$$$"}]})})]})]})})})})};export{Je as default};
