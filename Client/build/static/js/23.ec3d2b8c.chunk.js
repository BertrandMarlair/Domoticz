(this.webpackJsonpdomoticz_client=this.webpackJsonpdomoticz_client||[]).push([[23],{545:function(e,t,r){"use strict";var n=r(1),i=r(5),a=(r(0),r(26)),o=r.n(a),c=r(62),l=r.n(c),d=r(124);t.a=l()(d.a)((function(e){var t,r=Object.assign({},e),a=r.classes,c=r.children,l=r.center,d=r.className,s=r.color,u=r.bold,j=r.normal,b=r.light,v=r.style,p=r.small,O=o()((t={},Object(i.a)(t,a.defaultFontStyle,!0),Object(i.a)(t,a.title,!0),Object(i.a)(t,d,!0),Object(i.a)(t,a[s],s),Object(i.a)(t,a.center,l),Object(i.a)(t,a.bold,u),Object(i.a)(t,a.normal,j),Object(i.a)(t,a.light,b),Object(i.a)(t,a.smaller,p),t));return Object(n.jsx)("div",{className:O,style:v,children:c})}))},546:function(e,t,r){"use strict";var n=r(1),i=r(4),a=r(82),o=(r(0),r(633)),c=r(641),l=r(506),d=function(e){return{root:{"& fieldset":{borderRadius:6},"& input + fieldset":{borderColor:"hsl(0,0%,80%)",borderWidth:1},"& input:hover + fieldset":{border:"1px solid ".concat(e.palette.grey[500]," !important")},"& input:focus + fieldset":{border:"2px solid ".concat(e.palette.link.main," !important")}},input:{padding:9.5,borderRadius:10},endAdornment:{minWidth:24,display:"flex"},marginRight:{marginRight:40}}};t.a=Object(l.a)(d)((function(e){var t=e.classes,r=e.onChange,l=e.value,d=e.endAdornment,s=e.placeholder,u=e.disabled,j=e.helperText,b=e.autoComplete,v=e.type,p=e.error,O=e.marginRight,m=e.minWidth,h=e.multiline,x=e.rows,f=e.autoFocus,g=Object(a.a)(e,["classes","onChange","value","endAdornment","placeholder","disabled","helperText","autoComplete","type","error","marginRight","minWidth","multiline","rows","autoFocus"]);return Object(n.jsx)(o.a,{className:t.root,fullWidth:!0,variant:"outlined",style:{marginRight:O?40:0,minWidth:m?230:0},children:Object(n.jsx)(c.a,{variant:"outlined",inputProps:Object(i.a)({style:{padding:"9.5px 15px",fontWeight:300,minHeight:35}},g),InputProps:{endAdornment:d?Object(n.jsx)("div",{className:t.endAdornment,children:d}):null},value:l,onChange:r,placeholder:s,disabled:u,autoComplete:b,type:v,helperText:j,error:p,multiline:h,rows:x,autoFocus:f})})}))},547:function(e,t,r){"use strict";var n=r(1),i=r(101),a=r(5),o=r(0),c=r(506),l=r(65),d=r(537),s=r(550),u=r(26),j=r.n(u),b=function(e){return{root:{boxShadow:e.palette.boxShadow.main,background:e.palette.background.default,padding:0,outline:"none",borderRadius:10,display:"flex"},header:{padding:15,display:"flex",alignItems:"center",background:e.palette.background.paper},body:{padding:15},iconButton:{marginLeft:10},headerTitle:{marginLeft:30,marginRight:80},maxWidth:{maxWidth:0},noScroll:{overflow:"initial !important"},backDrop:{backdropFilter:"blur(8px)"}}},v=r(569),p=r(61),O=r(545);t.a=Object(c.a)(b)((function(e){var t,r=e.classes,c=e.className,u=e.children,b=e.open,m=e.onClose,h=e.fullWidth,x=e.maxWidth,f=e.title,g=j()((t={},Object(a.a)(t,c,c),Object(a.a)(t,r[x],x),t)),N=Object(l.a)(),P=Object(d.a)(N.breakpoints.down("xs"));return Object(o.useEffect)((function(){setTimeout((function(){var e,t=document.querySelectorAll('div[tabindex*="-1"]'),r=Object(i.a)(t);try{for(r.s();!(e=r.n()).done;){e.value.removeAttribute("tabindex")}}catch(n){r.e(n)}finally{r.f()}}),100)}),[b]),Object(n.jsx)(v.a,{open:b,onClose:m,fullScreen:P||h,className:g,maxWidth:x,PaperProps:{classes:{root:r.root}},BackdropProps:{classes:{root:r.backDrop}},children:Object(n.jsxs)("div",{className:r.paper,children:[m&&Object(n.jsxs)("div",{className:r.header,children:[Object(n.jsx)(s.a,{className:r.iconButton,"aria-label":"Delete",onClick:m,children:Object(n.jsx)(p.a,{size:18,color:N.palette.text.contrasted,children:"Close"})}),f&&Object(n.jsx)(O.a,{normal:!0,className:r.headerTitle,children:f})]}),Object(n.jsx)("div",{className:r.body,children:u})]})})}))},643:function(e,t,r){"use strict";r.r(t);var n=r(41),i=r(1),a=r(4),o=r(56),c=r(20),l=r(0),d=r(632),s=r(550),u=r(543),j=r(544),b=r(536),v=r(17),p=r(5),O=r(7),m=function(){var e;return e={root:{maxWidth:O.y,margin:"auto",minHeight:"90vh",padding:10}},Object(p.a)(e,"@media (max-width: ".concat(O.y,"px)"),{container:{width:"100%",margin:"auto"}}),Object(p.a)(e,"gridItem",{padding:20}),Object(p.a)(e,"card",{maxWidth:400,minWidth:245,padding:30,flexGrow:1,display:"flex",flexDirection:"column",margin:"10px auto",height:"100%"}),Object(p.a)(e,"description",{marginTop:20,marginBottom:50,flexGrow:1}),Object(p.a)(e,"addProvider",Object(a.a)(Object(a.a)({},O.m),{},Object(p.a)({margin:20},"@media (max-width: ".concat(O.A,"px)"),{flexDirection:"column"}))),Object(p.a)(e,"addProviderHeader",Object(a.a)({},O.q)),Object(p.a)(e,"addProviderIcon",{margin:20}),Object(p.a)(e,"addProviderTitle",{marginBottom:2}),Object(p.a)(e,"addProviderText",{marginBottom:8}),Object(p.a)(e,"option",{height:44,display:"flex",flexDirection:"row-reverse"}),Object(p.a)(e,"installNewProviderText",{margin:"36px 25px 10px 25px"}),Object(p.a)(e,"newProviders",{marginTop:36}),e},h=r(42),x=r.n(h),f=r(53),g=r(63),N=r(122),P=r(187),S=r(545),y=r(75),C=r(547),T=r(186),_=r(61),w=r(100),W=r(81),k=function(){return{wrapper:{padding:20},description:{marginBottom:30},label:{margin:"5px 0"},input:{marginTop:20,marginBottom:10,width:"100%"},form:{width:"100%",padding:30,paddingTop:0},formFooter:{marginTop:30}}},I=r(280),E=r(506),z=r(546),F=r(76);function A(){var e=Object(n.a)(["\n    mutation editProvider($provider: editProviderInput!) {\n        editProvider(provider: $provider) {\n            _id\n            title\n            slug\n            button\n            icon\n            description\n        }\n    }\n"]);return A=function(){return e},e}function D(){var e=Object(n.a)(["\n    mutation createProvider($provider: createProviderInput!) {\n        createProvider(provider: $provider) {\n            _id\n            title\n            slug\n            button\n            icon\n            description\n        }\n    }\n"]);return D=function(){return e},e}var L=Object(E.a)(k)((function(e){var t,r,n,d,s,u=e.classes,j=e.history,b=e.onClose,v=e.setProviders,p=e.option,O=e.providers,m=Object(l.useState)(null!==(t=null===p||void 0===p?void 0:p.title)&&void 0!==t?t:""),h=Object(c.a)(m,2),x=h[0],g=h[1],P=Object(l.useState)(null),S=Object(c.a)(P,2),C=S[0],_=S[1],w=Object(l.useState)(null!==(r=null===p||void 0===p?void 0:p.description)&&void 0!==r?r:""),k=Object(c.a)(w,2),E=k[0],A=k[1],D=Object(l.useState)(null),L=Object(c.a)(D,2),H=L[0],$=L[1],q=Object(l.useState)(null!==(n=null===p||void 0===p?void 0:p.slug)&&void 0!==n?n:""),M=Object(c.a)(q,2),G=M[0],J=M[1],K=Object(l.useState)(null),Q=Object(c.a)(K,2),U=Q[0],V=Q[1],X=Object(l.useState)(null!==(d=null===p||void 0===p?void 0:p.icon)&&void 0!==d?d:""),Y=Object(c.a)(X,2),Z=Y[0],ee=Y[1],te=Object(l.useState)(null),re=Object(c.a)(te,2),ne=re[0],ie=re[1],ae=Object(l.useState)(null!==(s=null===p||void 0===p?void 0:p.button)&&void 0!==s?s:""),oe=Object(c.a)(ae,2),ce=oe[0],le=oe[1],de=Object(l.useState)(null),se=Object(c.a)(de,2),ue=se[0],je=se[1],be=null===p||void 0===p?void 0:p._id,ve=Object(I.a)().t,pe=Object(f.b)(B),Oe=Object(c.a)(pe,2),me=Oe[0],he=Oe[1],xe=Object(f.b)(R),fe=Object(c.a)(xe,2),ge=fe[0],Ne=fe[1];Object(l.useEffect)((function(){var e,t;(null===he||void 0===he||null===(e=he.data)||void 0===e||null===(t=e.createProvider)||void 0===t?void 0:t._id)&&(Object(F.a)("Success",{variant:"success"}),v((function(e){return[].concat(Object(o.a)(e),[Object(a.a)({},null===he||void 0===he?void 0:he.data.createProvider)])})),b())}),[he,j,ve]),Object(l.useEffect)((function(){var e,t;if(null===Ne||void 0===Ne||null===(e=Ne.data)||void 0===e||null===(t=e.editProvider)||void 0===t?void 0:t._id){Object(F.a)("Success",{variant:"success"});var r=Ne.data.editProvider,n=O.findIndex((function(e){return e._id===r._id}));v([].concat(Object(o.a)(O.slice(0,n)),[Object(a.a)({},r)],Object(o.a)(O.slice(n+1)))),b()}}),[Ne,j,ve]);return Object(i.jsxs)("div",{className:u.wrapper,children:[Object(i.jsx)("div",{className:u.description,children:Object(i.jsx)(y.a,{noWrap:!0,centered:!0,children:"Le provider est le point central d'un device domotique pour la maison. Ils sont centralis\xe9 par un provider. S\xe9lectionnez le provider correspondant \xe0 votre appareil. Faites attention lors de la creation. Si vous n'\xeates pas certain de ce que vous faite, contact\xe9 un admin"})}),Object(i.jsxs)("form",{className:u.form,onSubmit:function(e){return function(e){e.preventDefault();var t=!0;if(x.length<2?(_("Le titre est trop court"),t=!1):_(""),E.length<2?($("La description est trop courte"),t=!1):$(""),G.length<2?(V("Le slug est trop court"),t=!1):V(""),Z.length<2?(ie("L'icon est trop court"),t=!1):ie(""),ce.length<2?(je("Le bouton est trop court"),t=!1):je(""),t)if(be){var r={provider:{_id:p._id,title:x,description:E,slug:G,icon:Z,button:ce}};ge({variables:r})}else me({variables:{provider:{title:x,description:E,slug:G,icon:Z,button:ce}}})}(e)},children:[Object(i.jsxs)("div",{className:u.input,children:[Object(i.jsx)(W.a,{color:"label",className:u.label,children:"Titre"}),Object(i.jsx)(z.a,{autoFocus:!0,value:x,onChange:function(e){return g(e.target.value)},placeholder:"Entrez un titre",type:"text",helperText:ve(C),error:!!C})]}),Object(i.jsxs)("div",{className:u.input,children:[Object(i.jsx)(W.a,{color:"label",className:u.label,children:"Slug"}),Object(i.jsx)(z.a,{value:G,onChange:function(e){return J(e.target.value)},placeholder:"Entrez un slug",type:"text",helperText:ve(U),error:!!U})]}),Object(i.jsxs)("div",{className:u.input,children:[Object(i.jsx)(W.a,{color:"label",className:u.label,children:"Description"}),Object(i.jsx)(z.a,{value:E,onChange:function(e){return A(e.target.value)},placeholder:"Entrez une description",type:"text",helperText:ve(H),error:!!H})]}),Object(i.jsxs)("div",{className:u.input,children:[Object(i.jsx)(W.a,{color:"label",className:u.label,children:"Icon"}),Object(i.jsx)(z.a,{value:Z,onChange:function(e){return ee(e.target.value)},placeholder:"Entrez un icon",type:"text",helperText:ve(ne),error:!!ne})]}),Object(i.jsxs)("div",{className:u.input,children:[Object(i.jsx)(W.a,{color:"label",className:u.label,children:"Button"}),Object(i.jsx)(z.a,{value:ce,onChange:function(e){return le(e.target.value)},placeholder:"Entrez le nom du boutton",type:"text",helperText:ve(ue),error:!!ue})]}),Object(i.jsx)(N.a,{errorMessage:null===he||void 0===he?void 0:he.error}),Object(i.jsx)("div",{className:u.formFooter,children:Object(i.jsx)(T.a,{noMargin:!0,fullWidth:!0,size:"lg",type:"submit",loading:null===he||void 0===he?void 0:he.loading,children:be?"Editer le provider":"Cr\xe9er le provider"})})]})]})})),B=x()(D()),R=x()(A()),H=r(269);function $(){var e=Object(n.a)(["\n    mutation deleteProvider($_id: ID!) {\n        deleteProvider(_id: $_id) {\n            _id\n        }\n    }\n"]);return $=function(){return e},e}var q=Object(E.a)(k)((function(e){var t=e.classes,r=e.onClose,n=e.option,a=e.providers,d=e.setProviders,s=Object(I.a)().t,u=Object(l.useState)(),j=Object(c.a)(u,2),b=j[0],v=j[1],p=Object(l.useState)(),O=Object(c.a)(p,2),m=O[0],h=O[1],x=Object(f.b)(M),g=Object(c.a)(x,2),P=g[0],S=g[1];Object(l.useEffect)((function(){var e,t;if(null===S||void 0===S||null===(e=S.data)||void 0===e||null===(t=e.deleteProvider)||void 0===t?void 0:t._id){Object(F.a)("Success",{variant:"success"});var n=S.data.deleteProvider,i=a.findIndex((function(e){return e._id===n._id}));d([].concat(Object(o.a)(a.slice(0,i)),Object(o.a)(a.slice(i+1)))),r()}}),[S,history,s]);return Object(i.jsxs)("div",{className:t.wrapper,children:[Object(i.jsx)("div",{className:t.description,children:Object(i.jsx)(y.a,{noWrap:!0,centered:!0,children:"Si vous supprimer le provider vous devrez le reconfigurer si vous souhaiter le remettre \xe0 therme. Faite attention. Confirmer le avec le nom du provider."})}),Object(i.jsxs)("form",{className:t.form,onSubmit:function(e){return function(e){e.preventDefault();var t=!0;b!==n.title?(h("Les titres ne correspondent pas"),t=!1):h(""),t&&P({variables:{_id:n._id}})}(e)},children:[Object(i.jsxs)("div",{className:t.input,children:[Object(i.jsx)(W.a,{color:"label",className:t.label,children:"Titre du provider \xe0 supprimer"}),Object(i.jsx)(z.a,{autoFocus:!0,value:b,onChange:function(e){return v(e.target.value)},placeholder:"Titre du provider",type:"text",helperText:s(m),error:!!m})]}),Object(i.jsx)(N.a,{errorMessage:null===S||void 0===S?void 0:S.error}),Object(i.jsx)("div",{className:t.formFooter,children:Object(i.jsx)(T.a,{noMargin:!0,fullWidth:!0,size:"lg",type:"submit",color:"error",loading:null===S||void 0===S?void 0:S.loading,children:"Supprimer le provider"})})]})]})})),M=x()($());function G(){var e=Object(n.a)(["\n    mutation createProvider($provider: createProviderInput!) {\n        createProvider(provider: $provider) {\n            _id\n            title\n            slug\n            button\n            icon\n            description\n        }\n    }\n"]);return G=function(){return e},e}function J(){var e=Object(n.a)(["\n    query getAllProviders {\n        getAllProviders {\n            _id\n            title\n            icon\n            slug\n            button\n            description\n        }\n    }\n"]);return J=function(){return e},e}t.default=Object(v.a)(m)((function(e){var t=e.classes,r=e.history,n=Object(l.useState)(!1),v=Object(c.a)(n,2),p=v[0],O=v[1],m=Object(l.useState)([]),h=Object(c.a)(m,2),x=h[0],k=h[1],I=Object(l.useState)(!1),E=Object(c.a)(I,2),z=E[0],A=E[1],D=Object(l.useState)(!1),B=Object(c.a)(D,2),R=B[0],$=B[1],M=Object(l.useState)(null),G=Object(c.a)(M,2),J=G[0],U=G[1],V=Object(l.useState)(!1),X=Object(c.a)(V,2),Y=X[0],Z=X[1],ee=Object(w.a)(),te=Object(f.b)(Q),re=Object(c.a)(te,2),ne=re[0],ie=re[1];Object(l.useEffect)((function(){var e,t;(null===ie||void 0===ie||null===(e=ie.data)||void 0===e||null===(t=e.createProvider)||void 0===t?void 0:t._id)&&(Object(F.a)("Success",{variant:"success"}),k((function(e){return[].concat(Object(o.a)(e),[Object(a.a)({},null===ie||void 0===ie?void 0:ie.data.createProvider)])})))}),[ie]);var ae=Object(f.c)(K),oe=ae.data,ce=ae.loading,le=ae.error,de=function(){A(!1),U(null)},se=function(){$(!1),U(null)},ue=function(){Z(null)};Object(l.useEffect)((function(){ce||!1!==p||O(!0)}),[ce,p]),Object(l.useEffect)((function(){(null===oe||void 0===oe?void 0:oe.getAllProviders)&&k(oe.getAllProviders)}),[oe]);var je=[{title:"Philips Hue",description:"Faites de votre maison un endroit encore plus chaleureux gr\xe2ce \xe0 un \xe9clairage adapt\xe9.",slug:"philips_hue",icon:"Hue",button:"Hue"},{title:"Netatmo",description:"La bonne temp\xe9rature dans chaque pi\xe8ce de votre logement",slug:"netatmo",icon:"SmartTemperature",button:"Thermostat"},{title:"Sonoff",description:"Cr\xe9ez facilement votre propre syst\xe8me Smart Home avec Sonoff",slug:"sonoff",icon:"Plug",button:"Sonoff"}].filter((function(e){return!x.map((function(e){return e.slug})).includes(e.slug)}));return Object(i.jsxs)("div",{className:t.root,children:[Object(i.jsx)(P.a,{className:t.addProvider,children:Object(i.jsxs)("div",{className:t.addProviderHeader,children:[Object(i.jsx)(_.a,{color:ee.palette.primary.main,className:t.addProviderIcon,children:"Checked"}),Object(i.jsxs)("div",{children:[Object(i.jsx)(W.a,{className:t.addProviderTitle,children:"Cr\xe9er un nouveau provider"}),Object(i.jsx)(y.a,{className:t.addProviderText,color:"lightGrey",children:"Le provider est le point central d'un produit domotique pour la maison."})]})]})}),Object(i.jsxs)(d.a,{container:!0,className:t.container,children:[Object(i.jsx)(N.a,{errorMessage:le}),x.map((function(e){return Object(i.jsxs)(d.a,{item:!0,lg:4,md:4,xs:12,className:t.gridItem,children:[Object(i.jsxs)(P.a,{className:t.card,children:[Object(i.jsx)("div",{className:t.option,children:Object(i.jsx)(s.a,{onClick:function(t){return r=t,n=e._id,void Z({event:r.currentTarget,providerId:n});var r,n},children:Object(i.jsx)(_.a,{children:"More"})})}),Object(i.jsx)(_.a,{center:!0,size:60,children:e.icon}),Object(i.jsx)(S.a,{bold:!0,center:!0,children:e.title}),Object(i.jsx)(y.a,{center:!0,noWrap:!0,className:t.description,children:e.description}),Object(i.jsx)(T.a,{onClick:function(){return r.push("/provider/".concat(e.slug))},fullWidth:!0,children:e.button})]}),Object(i.jsx)(H.a,{placement:"bottom",anchorEl:(null===Y||void 0===Y?void 0:Y.providerId)===e._id&&Y.event,handleClose:ue,children:Object(i.jsxs)(u.a,{children:[Object(i.jsx)(j.a,{onClick:function(){return function(e){A(!0),U(e)}(e)},children:Object(i.jsx)(W.a,{normal:!0,children:"Edit provider"})}),Object(i.jsx)(j.a,{onClick:function(){return function(e){$(!0),U(e)}(e)},children:Object(i.jsx)(W.a,{normal:!0,children:"Delete provider"})})]})})]},"provider/".concat(e.slug))}))]}),je.length>0&&Object(i.jsxs)("div",{className:t.newProviders,children:[Object(i.jsx)(b.a,{}),Object(i.jsx)(W.a,{className:t.installNewProviderText,children:"Install new provider"}),Object(i.jsx)(N.a,{errorMessage:le}),Object(i.jsx)(d.a,{container:!0,className:t.container,children:je.map((function(e){return Object(i.jsx)(d.a,{item:!0,lg:4,md:4,xs:12,className:t.gridItem,children:Object(i.jsxs)(P.a,{className:t.card,children:[Object(i.jsx)("div",{className:t.option}),Object(i.jsx)(_.a,{center:!0,size:60,children:e.icon}),Object(i.jsx)(S.a,{bold:!0,center:!0,children:e.title}),Object(i.jsx)(y.a,{center:!0,noWrap:!0,className:t.description,children:e.description}),Object(i.jsxs)(T.a,{onClick:function(){return ne({variables:{provider:e}})},fullWidth:!0,children:["Install ",e.title]})]})},"provider/".concat(e.slug))}))})]}),ce&&Object(i.jsx)(g.a,{absolute:!0}),Object(i.jsx)(C.a,{open:z,onClose:function(){return de()},title:(null===J||void 0===J?void 0:J.title)?"Edition de ".concat(J.title):"Creation d'un provider",children:Object(i.jsx)(L,{onClose:function(){return de()},option:J,setProviders:k,providers:x})}),Object(i.jsx)(C.a,{open:R,onClose:function(){return se()},title:"Suppression de ".concat(null===J||void 0===J?void 0:J.title),children:Object(i.jsx)(q,{onClose:function(){return se()},option:J,setProviders:k,providers:x})})]})}));var K=x()(J()),Q=x()(G())}}]);