window.Adios=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,u){function i(e){try{s(r.next(e))}catch(e){u(e)}}function c(e){try{s(r.throw(e))}catch(e){u(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,c)}s((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,u,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function c(u){return function(c){return function(u){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&u[0]?r.return:u[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,u[1])).done)return o;switch(r=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return i.label++,{value:u[1],done:!1};case 5:i.label++,r=u[1],u=[0];continue;case 7:u=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===u[0]||2===u[0])){i=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){i.label=u[1];break}if(6===u[0]&&i.label<o[1]){i.label=o[1],o=u;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(u);break}o[2]&&i.ops.pop(),i.trys.pop();continue}u=t.call(e,i)}catch(e){u=[6,e],r=0}finally{n=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,c])}}};t.__esModule=!0;var u={data:{},headers:{},method:"post",timeout:4e3},i={headers:{},timeout:4e3},c=function(){function e(){}return e.get=function(t,n){return r(this,void 0,void 0,(function(){var r;return o(this,(function(o){return(r=n?Object.assign({url:t},i,n,{url:t}):Object.assign({url:t},i,{url:t})).method="get",r.url=t,[2,e.request(r)]}))}))},e.put=function(t,n){return r(this,void 0,void 0,(function(){var r;return o(this,(function(o){return r=Object.assign({url:t},n,{method:"PUT"}),[2,e.request(r)]}))}))},e.delete=function(t,n){return r(this,void 0,void 0,(function(){var r;return o(this,(function(o){return r=Object.assign({url:t},n,{method:"DELETE"}),[2,e.request(r)]}))}))},e.patch=function(t,n){return r(this,void 0,void 0,(function(){var r;return o(this,(function(o){return r=Object.assign({url:t},n,{method:"PATCH"}),[2,e.request(r)]}))}))},e.request=function(t){return r(this,void 0,void 0,(function(){var n,r,u,c;return o(this,(function(o){switch(o.label){case 0:return n=Object.assign({},i,t),r={body:"object"==typeof n.data?JSON.stringify(n.data):n.data,cache:"no-cache",credentials:"same-origin",headers:n.headers,method:n.method,mode:"cors",redirect:"follow",referrerPolicy:"no-referrer"},n.credentials&&(r.credentials=n.credentials),e._interceptors[n.method||"request"].length&&e._interceptors[n.method||"request"].filter((function(e){return e})).forEach((function(e){e(r)})),n.timeout&&(c=new AbortController,n.signal=c.signal,u=setTimeout((function(){return c.abort()}),n.timeout)),[4,fetch(n.url||"",r).then((function(e){return clearTimeout(u),e.json()}))];case 1:return[2,o.sent()]}}))}))},e.post=function(t,n){return r(this,void 0,void 0,(function(){var r;return o(this,(function(o){return r=n?Object.assign({url:t},u,n):Object.assign({url:t},u),[2,e.request(r)]}))}))},e.interceptors={delete:{use:function(t){return e._interceptors.delete.push(t)},remove:function(t){e._interceptors.delete[t]=null}},get:{use:function(t){return e._interceptors.get.push(t)},remove:function(t){e._interceptors.get[t]=null}},patch:{use:function(t){return e._interceptors.patch.push(t)},remove:function(t){e._interceptors.patch[t]=null}},post:{use:function(t){return e._interceptors.post.push(t)},remove:function(t){e._interceptors.post[t]=null}},put:{use:function(t){return e._interceptors.put.push(t)},remove:function(t){e._interceptors.put[t]=null}},request:{use:function(t){return e._interceptors.request.push(t)},remove:function(t){e._interceptors.request[t]=null}}},e.controllers={abort:function(t){return!!e.handles[t]&&(e.handles[t].handle.abort(),delete e.handles[t],!0)}},e.handles={},e._interceptors={delete:[],get:[],patch:[],post:[],put:[],request:[]},e}();t.default=c}]).default;