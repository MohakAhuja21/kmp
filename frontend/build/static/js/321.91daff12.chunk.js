"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[321],{7321:function(e,s,t){t.r(s),t.d(s,{default:function(){return h}});var a=t(4942),r=t(1413),i=t(9439),n=t(2791),l=t(1087),o=t(3893),u=t(6030),c=t(7689),d=t(9616),m=t(6867),f=t(5218),g=t(184),h=function(){var e=(0,u.I0)(),s=(0,d.s0)(),t=(0,d.TH)(),h=(0,u.v9)((function(e){return e.user})),p=h.error,v=h.isAuthenticated,x=(0,n.useRef)(null),j=(0,n.useRef)(null),N=(0,n.useRef)(null),w=(0,n.useState)(""),b=(0,i.Z)(w,2),y=b[0],L=b[1],S=(0,n.useState)(""),T=(0,i.Z)(S,2),Z=T[0],C=T[1],R=(0,n.useState)({gst:"",email:"",password:""}),U=(0,i.Z)(R,2),E=U[0],F=U[1],P=E.gst,k=E.email,q=E.password,W=(0,n.useState)(o),A=(0,i.Z)(W,2),B=A[0],D=A[1],G=(0,n.useState)(o),I=(0,i.Z)(G,2),z=I[0],H=I[1],O=t.search?t.search.split("=")[1]:"/account";(0,n.useEffect)((function(){p&&(f.Am.error(p),e((0,c.b9)())),v&&s(O)}),[e,p,s,v,O]);var J=function(e,s){"login"===s&&(N.current.classList.add("shiftToNeutral"),N.current.classList.remove("shiftToRight"),j.current.classList.remove("shiftToNeutralForm"),x.current.classList.remove("shiftToLeft")),"register"===s&&(N.current.classList.add("shiftToRight"),N.current.classList.remove("shiftToNeutral"),j.current.classList.add("shiftToNeutralForm"),x.current.classList.add("shiftToLeft"))},K=function(e){if("avatar"===e.target.name){var s=new FileReader;s.onload=function(){2===s.readyState&&(H(s.result),D(s.result))},s.readAsDataURL(e.target.files[0])}else F((0,r.Z)((0,r.Z)({},E),{},(0,a.Z)({},e.target.name,e.target.value)))},M=(0,n.useState)(!1),Q=(0,i.Z)(M,2),V=Q[0];Q[1];return(0,g.jsx)(n.Fragment,{children:(0,g.jsx)("div",{className:"loginSignUp",children:(0,g.jsxs)("div",{className:"LoginSignUpBox",children:[(0,g.jsxs)("div",{children:[(0,g.jsxs)("div",{className:"loginSignToggle",children:[(0,g.jsx)("p",{onClick:function(e){return J(0,"login")},children:"LOGIN"}),(0,g.jsx)("p",{onClick:function(e){return J(0,"register")},children:"REGISTER"})]}),(0,g.jsx)("button",{ref:N})]}),(0,g.jsxs)("form",{className:"loginForm",ref:x,onSubmit:function(s){s.preventDefault(),e((0,c.x4)(y,Z))},children:[(0,g.jsx)("div",{className:"loginEmail",children:(0,g.jsx)(m.Z,{fullWidth:!0,label:"Email",type:"email",placeholder:"xyz@email.com",required:!0,value:y,onChange:function(e){return L(e.target.value)}})}),(0,g.jsx)("div",{className:"loginPasswordU",children:(0,g.jsx)(m.Z,{fullWidth:!0,label:"Password",type:V?"text":"password",required:!0,value:Z,onChange:function(e){return C(e.target.value)}})}),(0,g.jsx)(l.rU,{to:"/password/forgot",style:{marginBottom:"10px",marginTop:"10px"},children:"Forget Password ?"}),(0,g.jsx)("input",{type:"submit",value:"Login",className:"loginBtn"})]}),(0,g.jsxs)("form",{className:"signUpForm",ref:j,encType:"multipart/form-data",onSubmit:function(s){s.preventDefault();var t=new FormData;t.set("gst",P),t.set("email",k),t.set("password",q),t.set("avatar",B),e((0,c.z2)(t))},children:[(0,g.jsx)("div",{className:"signUpName",children:(0,g.jsx)(m.Z,{fullWidth:!0,label:"Gst",type:"text",placeholder:"Please Enter your GST Number",required:!0,name:"gst",value:P,onChange:K})}),(0,g.jsx)("div",{className:"signUpEmail",children:(0,g.jsx)(m.Z,{fullWidth:!0,label:"Email",type:"email",placeholder:"xyz@email.com",required:!0,name:"email",value:k,onChange:K})}),(0,g.jsx)("div",{className:"signUpPassword",children:(0,g.jsx)(m.Z,{fullWidth:!0,label:"Password",type:V?"text":"password",required:!0,name:"password",value:q,onChange:K})}),(0,g.jsxs)("div",{id:"registerImage",children:[(0,g.jsx)("img",{src:z,alt:"Avatar Preview"}),(0,g.jsx)("input",{type:"file",name:"avatar",accept:"image/*",onChange:K})]}),(0,g.jsx)("input",{type:"submit",value:"Register",className:"signUpBtn"})]})]})})})}}}]);
//# sourceMappingURL=321.91daff12.chunk.js.map