(this.webpackJsonpdomoticz_client=this.webpackJsonpdomoticz_client||[]).push([[9],{544:function(t,n,e){"use strict";var a=e(1),r=e(5),i=(e(0),e(25)),c=e.n(i),o=e(62),s=e.n(o),l=e(123);n.a=s()(l.a)((function(t){var n,e=Object.assign({},t),i=e.classes,o=e.children,s=e.center,l=e.className,u=e.color,d=e.bold,f=e.normal,g=e.light,x=e.style,p=e.small,h=c()((n={},Object(r.a)(n,i.defaultFontStyle,!0),Object(r.a)(n,i.title,!0),Object(r.a)(n,l,!0),Object(r.a)(n,i[u],u),Object(r.a)(n,i.center,s),Object(r.a)(n,i.bold,d),Object(r.a)(n,i.normal,f),Object(r.a)(n,i.light,g),Object(r.a)(n,i.smaller,p),n));return Object(a.jsx)("div",{className:h,style:x,children:o})}))},546:function(t,n,e){"use strict";var a=e(1),r=e(5),i=(e(0),e(505)),c=function(){return{root:{width:"100%",display:"flex"},button:{}}},o=e(25),s=e.n(o),l=e(186),u=e(61),d=e(26);n.a=Object(i.a)(c)((function(t){var n,e=t.classes,i=t.className,c=Object(d.g)(),o=s()((n={},Object(r.a)(n,e.button,!0),Object(r.a)(n,i,i),n));return Object(a.jsx)("div",{className:e.root,children:Object(a.jsxs)(l.a,{className:o,color:"transparent",onClick:function(){return c.goBack()},children:[Object(a.jsx)(u.a,{children:"Left"}),"Back"]})})}))},551:function(t,n,e){"use strict";e.d(n,"a",(function(){return r})),e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return d})),e.d(n,"f",(function(){return f})),e.d(n,"g",(function(){return v})),e.d(n,"e",(function(){return b})),e.d(n,"d",(function(){return m}));var a=[[.675,.322],[.4091,.518],[.167,.04]],r=function(t,n,e){var r=t/255,c=n/255,u=e/255,d=r>.04045?Math.pow((r+.055)/1.055,2.4000000953674316):r/12.92,f=c>.04045?Math.pow((c+.055)/1.055,2.4000000953674316):c/12.92,g=u>.04045?Math.pow((u+.055)/1.055,2.4000000953674316):u/12.92,x=.664511*d+.154324*f+.162028*g,p=.283881*d+.668433*f+.047685*g,h=88e-6*d+.07231*f+.986039*g,v=[x/(x+p+h),p/(x+p+h)];isNaN(v[0])&&(v[0]=0),isNaN(v[1])&&(v[1]=0);var b=a;if(!i(v,b)){var m=o(b[0],b[1],v),j=o(b[2],b[0],v),O=o(b[1],b[2],v),w=s(v,m),N=s(v,j),y=w,M=m;N<w&&(y=N,M=j),s(v,O)<y&&(M=O),v[0]=M[0],v[1]=M[1]}return v[0]=l(v[0]),v[1]=l(v[1]),v},i=function(t,n){if(null!=t&&null!=n){var e=n[0],a=n[1],r=n[2],i=[a[0]-e[0],a[1]-e[1]],o=[r[0]-e[0],r[1]-e[1]],s=[t[0]-e[0],t[1]-e[1]],l=c(s,o)/c(i,o),u=c(i,s)/c(i,o);return l>=0&&u>=0&&l+u<=1}return!1},c=function(t,n){return t[0]*n[1]-t[1]*n[0]},o=function(t,n,e){if(null!=t&&null!=n&&null!=e){var a=[e[0]-t[0],e[1]-t[1]],r=[n[0]-t[0],n[1]-t[1]],i=(a[0]*r[0]+a[1]*r[1])/(r[0]*r[0]+r[1]*r[1]);return i<0?i=0:i>1&&(i=1),[t[0]+r[0]*i,t[1]+r[1]*i]}return null},s=function(t,n){var e=t[0]-n[0],a=t[1]-n[1];return Math.sqrt(e*e+a*a)},l=function(t){return Math.round(1e4*t)/1e4},u=function(t,n){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:254,a=1-t-n,r=(e/254).toFixed(2),i=r/n*t,c=r/n*a,o=1.656492*i-.354851*r-.255038*c,s=.707196*-i+1.655397*r+.036152*c,l=.051713*i-.121364*r+1.01153*c;o>l&&o>s&&o>1?(s/=o,l/=o,o=1):s>l&&s>o&&s>1?(o/=s,l/=s,s=1):l>o&&l>s&&l>1&&(o/=l,s/=l,l=1),o=o<=.0031308?12.92*o:1.055*Math.pow(o,1/2.4)-.055,s=s<=.0031308?12.92*s:1.055*Math.pow(s,1/2.4)-.055,l=l<=.0031308?12.92*l:1.055*Math.pow(l,1/2.4)-.055,o=Math.round(255*o),s=Math.round(255*s),l=Math.round(255*l),isNaN(o)&&(o=0),isNaN(s)&&(s=0),isNaN(l)&&(l=0);var u=16777216+l+256*s+65536*o;return"#".concat(u.toString(16).substr(1))},d=function(t){var n,e,a,r=2e4/t;r<=66?(n=255,e=99.4708025861*Math.log(r)-161.1195681661,a=r<=19?0:138.5177312231*Math.log(r-10)-305.0447927307):(n=329.698727446*Math.pow(r-60,-.1332047592),e=288.1221695283*Math.pow(r-60,-.0755148492),a=255),n=n>255?255:n,e=e>255?255:e,a=a>255?255:a;var i=16777216+parseInt(a,10)+256*parseInt(e,10)+65536*parseInt(n,10);return"#".concat(i.toString(16).substr(1))},f=function(t,n,e){var a=t>.04045?Math.pow((t+.055)/1.055,2.4):t/12.92,r=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92,i=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92,c=.664511*a+.154324*r+.162028*i,o=.283881*a+.668433*r+.047685*i,s=88e-6*a+.07231*r+.986039*i,l=(c/(c+o+s)).toFixed(4),u=(o/(c+o+s)).toFixed(4);return isNaN(l)&&(l=0),isNaN(u)&&(u=0),[parseFloat(l),parseFloat(u)]},g=function(t){return t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(function(t,n,e,a){return n+n+e+e+a+a})).replace("#","")},x=function(t){return parseInt("".concat(t).replace(/[^a-f0-9]/gi,""),16)},p=function(t,n){var e;e="BT601"===n?[.299,.587,.114]:"BT709"===n?[.2126,.7152,.0722]:"BT2020"===n?[.2627,.678,.0593]:[.299,.587,.114];var a=g(t);return x(a[0]+a[1])*e[0]+x(a[2]+a[3])*e[1]+x(a[4]+a[5])*e[2]},h=function(t,n){var e,a=!1;return t.forEach((function(t){e=g(t),(!a||p(e,n)>p(a,n))&&(a=e)})),"#".concat(a)},v=function(t){for(var n=t.slice(0),e=[];n.length>0;){var a=h(n),r=n.indexOf(a);r>-1&&n.splice(r,1),e.push(a)}return e},b=function(t){var n=t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(function(t,n,e,a){return n+n+e+e+a+a})),e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n);return{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}},m=function(t){var n=b(t);return.299*n.r+.587*n.g+.114*n.b>180?"#2f2f2f":"white"}},552:function(t,n,e){"use strict";var a=e(10),r=e(2),i=e(0),c=(e(9),e(11)),o=e(16),s=[0,1,2,3,4,5,6,7,8,9,10],l=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12];function u(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,e=parseFloat(t);return"".concat(e/n).concat(String(t).replace(String(e),"")||"px")}var d=i.forwardRef((function(t,n){var e=t.alignContent,o=void 0===e?"stretch":e,s=t.alignItems,l=void 0===s?"stretch":s,u=t.classes,d=t.className,f=t.component,g=void 0===f?"div":f,x=t.container,p=void 0!==x&&x,h=t.direction,v=void 0===h?"row":h,b=t.item,m=void 0!==b&&b,j=t.justify,O=void 0===j?"flex-start":j,w=t.lg,N=void 0!==w&&w,y=t.md,M=void 0!==y&&y,S=t.sm,C=void 0!==S&&S,I=t.spacing,W=void 0===I?0:I,k=t.wrap,z=void 0===k?"wrap":k,B=t.xl,F=void 0!==B&&B,E=t.xs,T=void 0!==E&&E,D=t.zeroMinWidth,G=void 0!==D&&D,$=Object(a.a)(t,["alignContent","alignItems","classes","className","component","container","direction","item","justify","lg","md","sm","spacing","wrap","xl","xs","zeroMinWidth"]),H=Object(c.a)(u.root,d,p&&[u.container,0!==W&&u["spacing-xs-".concat(String(W))]],m&&u.item,G&&u.zeroMinWidth,"row"!==v&&u["direction-xs-".concat(String(v))],"wrap"!==z&&u["wrap-xs-".concat(String(z))],"stretch"!==l&&u["align-items-xs-".concat(String(l))],"stretch"!==o&&u["align-content-xs-".concat(String(o))],"flex-start"!==O&&u["justify-xs-".concat(String(O))],!1!==T&&u["grid-xs-".concat(String(T))],!1!==C&&u["grid-sm-".concat(String(C))],!1!==M&&u["grid-md-".concat(String(M))],!1!==N&&u["grid-lg-".concat(String(N))],!1!==F&&u["grid-xl-".concat(String(F))]);return i.createElement(g,Object(r.a)({className:H,ref:n},$))})),f=Object(o.a)((function(t){return Object(r.a)({root:{},container:{boxSizing:"border-box",display:"flex",flexWrap:"wrap",width:"100%"},item:{boxSizing:"border-box",margin:"0"},zeroMinWidth:{minWidth:0},"direction-xs-column":{flexDirection:"column"},"direction-xs-column-reverse":{flexDirection:"column-reverse"},"direction-xs-row-reverse":{flexDirection:"row-reverse"},"wrap-xs-nowrap":{flexWrap:"nowrap"},"wrap-xs-wrap-reverse":{flexWrap:"wrap-reverse"},"align-items-xs-center":{alignItems:"center"},"align-items-xs-flex-start":{alignItems:"flex-start"},"align-items-xs-flex-end":{alignItems:"flex-end"},"align-items-xs-baseline":{alignItems:"baseline"},"align-content-xs-center":{alignContent:"center"},"align-content-xs-flex-start":{alignContent:"flex-start"},"align-content-xs-flex-end":{alignContent:"flex-end"},"align-content-xs-space-between":{alignContent:"space-between"},"align-content-xs-space-around":{alignContent:"space-around"},"justify-xs-center":{justifyContent:"center"},"justify-xs-flex-end":{justifyContent:"flex-end"},"justify-xs-space-between":{justifyContent:"space-between"},"justify-xs-space-around":{justifyContent:"space-around"},"justify-xs-space-evenly":{justifyContent:"space-evenly"}},function(t,n){var e={};return s.forEach((function(a){var r=t.spacing(a);0!==r&&(e["spacing-".concat(n,"-").concat(a)]={margin:"-".concat(u(r,2)),width:"calc(100% + ".concat(u(r),")"),"& > $item":{padding:u(r,2)}})})),e}(t,"xs"),t.breakpoints.keys.reduce((function(n,e){return function(t,n,e){var a={};l.forEach((function(t){var n="grid-".concat(e,"-").concat(t);if(!0!==t)if("auto"!==t){var r="".concat(Math.round(t/12*1e8)/1e6,"%");a[n]={flexBasis:r,flexGrow:0,maxWidth:r}}else a[n]={flexBasis:"auto",flexGrow:0,maxWidth:"none"};else a[n]={flexBasis:0,flexGrow:1,maxWidth:"100%"}})),"xs"===e?Object(r.a)(t,a):t[n.breakpoints.up(e)]=a}(n,t,e),n}),{}))}),{name:"MuiGrid"})(d);n.a=f},636:function(t,n,e){"use strict";e.r(n);var a=e(1),r=e(65),i=e(151),c=(e(0),e(552)),o=e(16),s=e(4),l=e(7),u=function(t){return{root:{maxWidth:l.E,margin:"auto",padding:40},light:Object(s.a)(Object(s.a)({},l.r),{},{padding:"20px",minHeight:90,cursor:"pointer",flexDirection:"column","&:hover":{background:t.palette.background.light}}),lightHeader:Object(s.a)(Object(s.a)({},l.v),{},{width:"100%"}),lightIcon:{margin:20},lightTitle:{marginBottom:2},lightText:{marginBottom:8},lightEnd:{display:"flex",justifyContent:"flex-end",alignItems:"center",flex:1},title:{margin:"30px 16px",fontSize:"1.4rem"}}},d=e(187),f=e(61),g=e(544),x=e(82),p=e(546),h=e(27),v=e(186),b=e(75),m=e(551);n.default=Object(o.a)(u)((function(t){var n=t.classes,e=Object(h.c)((function(t){return t.devices.philipsHue})),o=Object(m.a)(183,29,170);return console.log(o),Object(a.jsxs)("div",{className:n.root,children:[Object(a.jsx)(p.a,{}),Object(a.jsx)(g.a,{className:n.title,bold:!0,children:"Configuration de la lumi\xe8re"}),Object(a.jsx)(c.a,{container:!0,children:function(){var t,n=[];if((null===e||void 0===e||null===(t=e.bridges)||void 0===t?void 0:t.length)>0){var a,c=Object(i.a)(e.bridges);try{for(c.s();!(a=c.n()).done;){var o=a.value;(null===o||void 0===o?void 0:o.lights)&&(n=[].concat(Object(r.a)(n),Object(r.a)(o.lights)))}}catch(s){c.e(s)}finally{c.f()}}return n}().map((function(t,e){var r;return Object(a.jsx)(c.a,{item:!0,lg:4,md:4,xs:12,children:Object(a.jsxs)(d.a,{className:n.light,children:[Object(a.jsx)(f.a,{size:40,className:n.lightIcon,children:t.productname}),Object(a.jsx)(b.a,{children:(null===t||void 0===t||null===(r=t.state)||void 0===r?void 0:r.on)?"ON":"OFF"}),Object(a.jsx)(x.a,{className:n.lightTitle,children:t.name}),Object(a.jsx)(v.a,{fullWidth:!0,children:"Configurer"})]})},"light/".concat(e))}))})]})}))}}]);