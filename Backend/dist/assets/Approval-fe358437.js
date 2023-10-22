import{j as r,C as j,w as v,r as d}from"./index-6b556b87.js";import{u as A}from"./useQuery-d20b0ea0.js";import{u as g}from"./useMutation-17f212aa.js";import{a as y,b as c,A as h,d as T}from"./config-3ad541f8.js";import{T as w}from"./Title-be952a78.js";import{S as E}from"./Space-d9777764.js";import{T as e}from"./Table-962be2c5.js";import{B as $}from"./Button-89a80ae3.js";import"./utils-73056672.js";import"./ScrollArea-8e8f695f.js";const p=`${T}/api/admin`,m={headers:{Authorization:`bearer ${y.get("token")}`}},C=async()=>{try{return(await c.get(`${p}/approve`,m)).data}catch(o){if(c.isAxiosError(o))throw h(o);console.log(o)}},S=async(o,t)=>{try{console.log(`${p}/approve/${o}/${t}`),await c.put(`${p}/approve/${o}/${t}`,m)}catch(n){if(c.isAxiosError(n))throw h(n);console.log(n)}},u={getAllApproval:C,ConfirmApprove:S},H=()=>{const{isLoading:o,error:t,isError:n,data:i}=A({queryKey:["approval"],queryFn:async()=>{try{const a=await u.getAllApproval();if(!a)throw new Error;return a.filter(l=>l.approved===!1)}catch(a){console.log(a)}}});return n||!i?r.jsxs(r.Fragment,{children:["'An error has occurred: ' + ",JSON.stringify(t)]}):r.jsxs(j,{p:"2rem",children:[r.jsx(w,{order:3,children:"REQUEST LIST"}),r.jsx(E,{h:"xl"}),r.jsx(b,{data:i,isLoading:o})]})},b=({data:o,isLoading:t})=>{const n=v(),i=g({mutationFn:async s=>{console.log(s),await u.ConfirmApprove(s.vendorId,s.applicationId)},onSuccess:()=>{n.invalidateQueries({queryKey:["approval"]})},onError:s=>{console.log(s)}}),[a,l]=d.useState(o);d.useEffect(()=>{l(o)},[o]);const x=a.map((s,f)=>r.jsxs(e.Tr,{children:[r.jsx(e.Td,{children:s.Application.potentialApplications}),r.jsx(e.Td,{children:s.Vendor.name}),r.jsx(e.Td,{children:r.jsx($,{onClick:()=>i.mutateAsync({vendorId:s.vendorId,applicationId:s.applicationId}),children:"Approve"})})]},f));return r.jsx(r.Fragment,{children:r.jsxs(e,{highlightOnHover:!0,withTableBorder:!0,children:[r.jsx(e.Thead,{children:r.jsxs(e.Tr,{children:[r.jsx(e.Th,{children:"Name"}),r.jsx(e.Th,{children:"ABN"}),r.jsx(e.Th,{})]})}),r.jsx(e.Tbody,{children:x})]})})};export{H as default};