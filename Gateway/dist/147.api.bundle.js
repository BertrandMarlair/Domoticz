exports.id=147,exports.ids=[147],exports.modules={18967:e=>{function t(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}t.keys=()=>[],t.resolve=t,t.id=18967,e.exports=t},27156:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>ee});var o=r(63395),n=r.n(o),s=r(98605),a=r.n(s),c=r(34061),i=r.n(c),l=r(54005),h=r.n(l),p=r(99268),u=r.n(p),d=r(95692),$=r(8777),g=r.n($),f=r(31803),m=r(80678),w=r(26260),y=r(92088),E=r(26004);class v extends Error{constructor(...e){super(...e),Error.captureStackTrace&&Error.captureStackTrace(this,v),this.name="Warning"}}var S=r(83574);const{DOMOTICZ_PORT:T,DOMOTICZ_HOST:x,AUTH_PORT:O,AUTH_HOST:R}=process.env,k=e=>{switch(e){case"domoticz":return`http://${x}:${T}/explore`;case"auth":return`http://${R}:${O}/explore`;default:return null}};var q=r(38137),A=r(49704),b=r(28687);const C=async e=>{try{if(!e)throw new q.AuthenticationError("You must supply a JWT for authorization.");const t=await(async()=>{const{SECRET_REGISTER:e}=process.env,t=`\n        query keyRing {\n            keyRing (token: "${e}") {\n                accessPublicKey\n            }\n        }\n    `,{AUTH_HOST:r,AUTH_PORT:o}=process.env,n=await(0,b.request)(`http://${r}:${o}/graphql`,t).then((e=>e)).catch((e=>e));if(n.keyRing&&n.keyRing.accessPublicKey)return n.keyRing.accessPublicKey;throw new Error("Failed to get access token")})();try{return(0,A.verify)(e.replace("Bearer ",""),t,{algorithm:["RS256"]})}catch(e){throw console.log(e),new q.AuthenticationError("Invalid JWT")}}catch(e){throw console.log(e),new q.AuthenticationError("invalid jwt")}};var P=r(25144);const{REFRESH_TOKEN:_,ACCESS_TOKEN:H}=process.env,N=async(e,t)=>{const r=JSON.parse(t.body);if(console.log(r.operationName),"IntrospectionQuery"===r.operationName)return await(0,S.default)(e,t).then((e=>e)).catch((e=>e));const o=t.headers[_],n=t.headers[H];if(o){if(k("auth")!==e)throw new q.AuthenticationError("When you send refresh, it's only for get new access token.");if("refreshTokens"===r.operationName)return await(0,S.default)(e,t).then((e=>e)).catch((e=>e))}if(n)return await C(n.replace("Bearer ","")),await(0,S.default)(e,t).then((e=>e)).catch((e=>e));if(!n&&!o){if(k("auth")===e){if(P.Us.includes(r.operationName))return await(0,S.default)(e,t).then((e=>e)).catch((e=>e));throw new q.AuthenticationError("You can't access to this request if you are not authentified.")}if(k("domoticz")===e&&P.Ks.includes(r.operationName))return await(0,S.default)(e,t).then((e=>e)).catch((e=>e));throw new q.AuthenticationError("You can't access to this request if you are not authentified.")}};var D=r(65509),I=r(17975),U=r(34156),z=r.n(U);class F{constructor(){this.store=new Map,this.mems=new Map}memoize(e,...t){this.mems.has(e)||this.mems.set(e,z()(e,{normalizer:e=>JSON.stringify(e)}));const r=this.mems.get(e),o=JSON.stringify(t);return this.store.set(r,this.store.has(r)?[...this.store.get(r),o]:[o]),r(...t)}clear(){Array.from(this.store.entries()).forEach((([e,t])=>t.forEach((t=>e.delete(...JSON.parse(t))))))}}var J=r(97280),L=r.n(J);const M=e=>{if(e.extensions.exception){const t=e.extensions.exception;if(t.result&&t.result.errors&&t.result.errors.length>0)return t.result.errors;if(e.message){if(e.message.startsWith("Unexpected error value: ")){const t=e.message.replace("Expected Iterable,","Expected Iterable").replace("'","\\'");console.log(t);const r=t.indexOf("message"),o=t.substring(r,t.substring(r,t.length).indexOf("locations")+r-2).replace("message",'"message"'),n=t.indexOf("path"),s=`{${o}, ${t.substring(n,t.substring(n,t.length).indexOf("],")+n).replace("path",'"path"')+"]"}}`;return/^[\],:{}\s]*$/.test(s.replace(/\\["\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))?JSON.parse(s):o}return{message:e.message,path:e.path}}if(t.stacktrace.length>0){const e=t.stacktrace[0].split('"')[1];return e&&t.stacktrace[0].includes("message")?e:t.stacktrace[0]}return t.stacktrace}},W=(e,{context:t})=>(t.memoizer.clear(),e),Y=e=>{let t;const r=e.req&&e.req.headers,o=e.connection;if(r){const e=r["access-token"];e&&(t=e.replace("Bearer ",""))}if(o){const e=o.context["access-token"];e&&(t=e.replace("Bearer ",""))}return{headers:r||o,token:t,memoizer:new F}},B=[];var K=r(18597),G=r.n(K),Q=r(17846),j=r.n(Q);const Z=[{path:"/health",controller:async(e,t)=>{try{return t.status(200).send("Health check success")}catch(e){return t.status(400).send(e.message)}},type:"get"}];var V=r(10046),X=r.n(V);const ee=async()=>{const{GATEWAY_HOST:e,GATEWAY_PORT:t,REDIS_PORT:o,REDIS_HOST:s,NODE_ENV:c,DOMAIN:l,CORS:p}=process.env,$=n()(),T=await r.e(613).then(r.bind(r,2613));try{$.start();const r=new(h())({port:o,host:s});r.subscribe("updateServer"),r.on("message",(async()=>{console.log("Restart Gateway in 2 seconds"),await(0,d.D)(2e3),n(!0)}));const n=async r=>{try{if(r)console.info("Reloading HTTP server"),process.httpServer.removeAllListeners("upgrade"),process.httpServer.removeAllListeners("request"),x(process.httpServer),console.info("HTTP server reloaded");else{if(console.info("Creating HTTP server"),process.httpServer=a().createServer(),!x(process.httpServer))throw"Fail to configure";process.httpServer.listen(t,(()=>{console.info(i().green("✓"),`Server ready. -> start on ${e}:${t}/`)})).setTimeout(5e5),process.httpServer.timeout=10*P.yR}}catch(e){$.fail(),console.log("💣","reconnecting in 5 seconds"),console.log("💣",e.message),await(0,d.D)(5e3),n(!1)}},x=async e=>{console.info("Creating Express app");const t=u()();Z.forEach((e=>{t[e.type](e.path,((t,r)=>{e.controller(t,r)}))}));const r={origin:"false"!==p?l:"*",credentials:!0,optionsSuccessStatus:200};t.use(j()(r)),t.use(X().text({type:"application/graphql"})),console.info("Creating Apollo server");const o=await Promise.all(T.default.map((e=>(e=>{let t=!1;return new Promise(((r,o)=>{const n=setTimeout((()=>{t=!0,o({...e,connected:!1})}),5e3);(0,S.default)(`http://${e.domain}/${e.httpLocation}`).then((()=>{clearTimeout(n),t||r({...e,connected:!0})})).catch((()=>{t||o({...e,connected:!1})}))})).then((e=>e)).catch((e=>e))})(e))));o.filter((e=>!e.connected)).map((e=>console.log("💣",`Fail to connect to ${e.domain}`)));const n=o.filter((e=>e.connected));if(n.length){const r=await Promise.all(n.filter((e=>e.connected)).map((e=>(async e=>{const t=`http://${e.domain}/${e.httpLocation}`;let r=(0,I.q)((({networkError:e,graphQLErrors:t})=>{console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"),console.log(e,t),console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"),t&&t.forEach((e=>{Object.setPrototypeOf(e,Error.prototype)}))}));try{const o=new m.u({uri:t,fetch:N});let n;if(e.subscription){const t=t=>{const r=t.getContext().graphqlContext||{};return new w.A({uri:`ws://${e.domain}/${e.wsLocation}`,options:{reconnect:!0,connectionParams:r},webSocketImpl:g()}).request(t)};n=(0,f.split)((({query:e,setContext:t})=>{t((e=>{if(e.graphqlContext&&e.graphqlContext.headers)return{...e.graphqlContext}}));const r=(0,E.p$)(e);return"OperationDefinition"===r.kind&&"subscription"===r.operation}),t,o,r)}else n=(0,y.v)(((e,t)=>{if(t.graphqlContext&&t.graphqlContext.headers)return{...t.graphqlContext}})).concat(r).concat(o);const s=await(0,D.introspectSchema)(o);return(0,D.makeRemoteExecutableSchema)({schema:s,link:n})}catch(t){throw console.log(t),new v(`Failed to create the remote. ${e.domain}`)}})(e)))),o=((e=!0,t)=>{const{GRAPHQL_QUERY_MAX_DEPTH:r}=process.env;return new q.ApolloServer({schema:(0,D.mergeSchemas)({schemas:t}),validationRules:[L()(r)],playground:e,introspection:!0,tracing:!0,context:Y,formatError:M,formatResponse:W})})("development"===c,r);return console.info("Express app created with Apollo middleware"),B.forEach((({domain:e,httpRedirection:r,authorization:o,httpFrom:n,originalUrl:s})=>{t.use(n,G()(e,{proxyReqOptDecorator:async(e,t)=>{if(o){let r=null;if(t.headers&&t.headers["access-token"]?r=t.headers["access-token"].replace("Bearer ",""):t.query&&t.query["access-token"]&&(r=t.query["access-token"].replace("Bearer ","")),r)return await C(r),e.headers["access-token"]=r,e;throw new Error("You must supply a JWT for authorization")}return e},proxyReqPathResolver:async e=>{const t=s?e.originalUrl:r;try{return t}catch(e){throw console.log(e),new Error(e.message)}},timeout:10*P.yR,limit:P.aF}))})),o.applyMiddleware({app:t,path:"/explore"}),e.on("request",t),o.installSubscriptionHandlers(e),$.succeed(),!0}};n()}catch(e){$.fail(),console.log("💣",e.message),console.log("💣","reconnecting in 5 seconds"),startServer(!1)}}}};