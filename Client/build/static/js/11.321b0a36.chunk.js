(this.webpackJsonpdomoticz_client=this.webpackJsonpdomoticz_client||[]).push([[11],{544:function(e,t,n){"use strict";var i=n(1),a=n(5),c=(n(0),n(25)),r=n.n(c),s=n(62),o=n.n(s),l=n(123);t.a=o()(l.a)((function(e){var t,n=Object.assign({},e),c=n.classes,s=n.children,o=n.center,l=n.className,d=n.color,g=n.bold,x=n.normal,u=n.light,f=n.style,b=n.small,m=r()((t={},Object(a.a)(t,c.defaultFontStyle,!0),Object(a.a)(t,c.title,!0),Object(a.a)(t,l,!0),Object(a.a)(t,c[d],d),Object(a.a)(t,c.center,o),Object(a.a)(t,c.bold,g),Object(a.a)(t,c.normal,x),Object(a.a)(t,c.light,u),Object(a.a)(t,c.smaller,b),t));return Object(i.jsx)("div",{className:m,style:f,children:s})}))},546:function(e,t,n){"use strict";var i=n(1),a=n(5),c=(n(0),n(505)),r=function(){return{root:{width:"100%",display:"flex"},button:{}}},s=n(25),o=n.n(s),l=n(186),d=n(61),g=n(26);t.a=Object(c.a)(r)((function(e){var t,n=e.classes,c=e.className,r=Object(g.g)(),s=o()((t={},Object(a.a)(t,n.button,!0),Object(a.a)(t,c,c),t));return Object(i.jsx)("div",{className:n.root,children:Object(i.jsxs)(l.a,{className:s,color:"transparent",onClick:function(){return r.goBack()},children:[Object(i.jsx)(d.a,{children:"Left"}),"Back"]})})}))},552:function(e,t,n){"use strict";var i=n(10),a=n(2),c=n(0),r=(n(9),n(11)),s=n(16),o=[0,1,2,3,4,5,6,7,8,9,10],l=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12];function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=parseFloat(e);return"".concat(n/t).concat(String(e).replace(String(n),"")||"px")}var g=c.forwardRef((function(e,t){var n=e.alignContent,s=void 0===n?"stretch":n,o=e.alignItems,l=void 0===o?"stretch":o,d=e.classes,g=e.className,x=e.component,u=void 0===x?"div":x,f=e.container,b=void 0!==f&&f,m=e.direction,j=void 0===m?"row":m,p=e.item,v=void 0!==p&&p,h=e.justify,O=void 0===h?"flex-start":h,w=e.lg,y=void 0!==w&&w,S=e.md,C=void 0!==S&&S,N=e.sm,W=void 0!==N&&N,k=e.spacing,z=void 0===k?0:k,I=e.wrap,B=void 0===I?"wrap":I,M=e.xl,E=void 0!==M&&M,D=e.xs,G=void 0!==D&&D,H=e.zeroMinWidth,T=void 0!==H&&H,F=Object(i.a)(e,["alignContent","alignItems","classes","className","component","container","direction","item","justify","lg","md","sm","spacing","wrap","xl","xs","zeroMinWidth"]),J=Object(r.a)(d.root,g,b&&[d.container,0!==z&&d["spacing-xs-".concat(String(z))]],v&&d.item,T&&d.zeroMinWidth,"row"!==j&&d["direction-xs-".concat(String(j))],"wrap"!==B&&d["wrap-xs-".concat(String(B))],"stretch"!==l&&d["align-items-xs-".concat(String(l))],"stretch"!==s&&d["align-content-xs-".concat(String(s))],"flex-start"!==O&&d["justify-xs-".concat(String(O))],!1!==G&&d["grid-xs-".concat(String(G))],!1!==W&&d["grid-sm-".concat(String(W))],!1!==C&&d["grid-md-".concat(String(C))],!1!==y&&d["grid-lg-".concat(String(y))],!1!==E&&d["grid-xl-".concat(String(E))]);return c.createElement(u,Object(a.a)({className:J,ref:t},F))})),x=Object(s.a)((function(e){return Object(a.a)({root:{},container:{boxSizing:"border-box",display:"flex",flexWrap:"wrap",width:"100%"},item:{boxSizing:"border-box",margin:"0"},zeroMinWidth:{minWidth:0},"direction-xs-column":{flexDirection:"column"},"direction-xs-column-reverse":{flexDirection:"column-reverse"},"direction-xs-row-reverse":{flexDirection:"row-reverse"},"wrap-xs-nowrap":{flexWrap:"nowrap"},"wrap-xs-wrap-reverse":{flexWrap:"wrap-reverse"},"align-items-xs-center":{alignItems:"center"},"align-items-xs-flex-start":{alignItems:"flex-start"},"align-items-xs-flex-end":{alignItems:"flex-end"},"align-items-xs-baseline":{alignItems:"baseline"},"align-content-xs-center":{alignContent:"center"},"align-content-xs-flex-start":{alignContent:"flex-start"},"align-content-xs-flex-end":{alignContent:"flex-end"},"align-content-xs-space-between":{alignContent:"space-between"},"align-content-xs-space-around":{alignContent:"space-around"},"justify-xs-center":{justifyContent:"center"},"justify-xs-flex-end":{justifyContent:"flex-end"},"justify-xs-space-between":{justifyContent:"space-between"},"justify-xs-space-around":{justifyContent:"space-around"},"justify-xs-space-evenly":{justifyContent:"space-evenly"}},function(e,t){var n={};return o.forEach((function(i){var a=e.spacing(i);0!==a&&(n["spacing-".concat(t,"-").concat(i)]={margin:"-".concat(d(a,2)),width:"calc(100% + ".concat(d(a),")"),"& > $item":{padding:d(a,2)}})})),n}(e,"xs"),e.breakpoints.keys.reduce((function(t,n){return function(e,t,n){var i={};l.forEach((function(e){var t="grid-".concat(n,"-").concat(e);if(!0!==e)if("auto"!==e){var a="".concat(Math.round(e/12*1e8)/1e6,"%");i[t]={flexBasis:a,flexGrow:0,maxWidth:a}}else i[t]={flexBasis:"auto",flexGrow:0,maxWidth:"none"};else i[t]={flexBasis:0,flexGrow:1,maxWidth:"100%"}})),"xs"===n?Object(a.a)(e,i):e[t.breakpoints.up(n)]=i}(t,e,n),t}),{}))}),{name:"MuiGrid"})(g);t.a=x},634:function(e,t,n){"use strict";n.r(t);var i=n(1),a=n(65),c=n(151),r=(n(0),n(552)),s=n(16),o=n(4),l=n(7),d=function(e){return{root:{maxWidth:l.E,margin:"auto",padding:40},bridge:Object(o.a)(Object(o.a)({},l.r),{},{padding:"20px",minHeight:90,cursor:"pointer",flexDirection:"column","&:hover":{background:e.palette.background.light}}),bridgeHeader:Object(o.a)(Object(o.a)({},l.v),{},{width:"100%"}),bridgeIcon:{margin:20},bridgeTitle:{marginBottom:2},bridgeText:{marginBottom:8},bridgeEnd:{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:1},title:{margin:"30px 16px",fontSize:"1.4rem"}}},g=n(187),x=n(61),u=n(544),f=n(82),b=n(546),m=n(27),j=n(186);t.default=Object(s.a)(d)((function(e){var t=e.classes,n=Object(m.c)((function(e){return e.devices.philipsHue}));return Object(i.jsxs)("div",{className:t.root,children:[Object(i.jsx)(b.a,{}),Object(i.jsx)(u.a,{className:t.title,bold:!0,children:"Configuration des bridges"}),Object(i.jsx)(r.a,{container:!0,children:function(){var e,t=[];if((null===n||void 0===n||null===(e=n.bridges)||void 0===e?void 0:e.length)>0){var i,r=Object(c.a)(n.bridges);try{for(r.s();!(i=r.n()).done;){var s=i.value;(null===s||void 0===s?void 0:s.config)&&(t=[].concat(Object(a.a)(t),[s.config]))}}catch(o){r.e(o)}finally{r.f()}}return t}().map((function(e,n){return Object(i.jsx)(r.a,{item:!0,lg:4,md:4,xs:12,children:Object(i.jsxs)(g.a,{className:t.bridge,children:[Object(i.jsx)(x.a,{size:40,className:t.bridgeIcon,children:"Bridge"}),Object(i.jsx)(f.a,{center:!0,className:t.bridgeTitle,children:e.name}),Object(i.jsx)(j.a,{fullWidth:!0,children:"Configurer"})]})},"bridge/".concat(n))}))})]})}))}}]);