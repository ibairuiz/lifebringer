!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.io=e():t.io=e()}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";function n(t,e){"object"===("undefined"==typeof t?"undefined":o(t))&&(e=t,t=void 0),e=e||{};var r,n=i(t),s=n.source,h=n.id,p=n.path,u=c[h]&&p in c[h].nsps,f=e.forceNew||e["force new connection"]||!1===e.multiplex||u;return f?r=a(s,e):(c[h]||(c[h]=a(s,e)),r=c[h]),n.query&&!e.query&&(e.query=n.query),r.socket(n.path,e)}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=r(1),s=r(4),a=r(10);r(3)("socket.io-client");t.exports=e=n;var c=e.managers={};e.protocol=s.protocol,e.connect=n,e.Manager=r(10),e.Socket=r(36)},function(t,e,r){(function(e){"use strict";function n(t,r){var n=t;r=r||e.location,null==t&&(t=r.protocol+"//"+r.host),"string"==typeof t&&("/"===t.charAt(0)&&(t="/"===t.charAt(1)?r.protocol+t:r.host+t),/^(https?|wss?):\/\//.test(t)||(t="undefined"!=typeof r?r.protocol+"//"+t:"https://"+t),n=o(t)),n.port||(/^(http|ws)$/.test(n.protocol)?n.port="80":/^(http|ws)s$/.test(n.protocol)&&(n.port="443")),n.path=n.path||"/";var i=n.host.indexOf(":")!==-1,s=i?"["+n.host+"]":n.host;return n.id=n.protocol+"://"+s+":"+n.port,n.href=n.protocol+"://"+s+(r&&r.port===n.port?"":":"+n.port),n}var o=r(2);r(3)("socket.io-client:url");t.exports=n}).call(e,function(){return this}())},function(t,e){var r=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,n=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];t.exports=function(t){var e=t,o=t.indexOf("["),i=t.indexOf("]");o!=-1&&i!=-1&&(t=t.substring(0,o)+t.substring(o,i).replace(/:/g,";")+t.substring(i,t.length));for(var s=r.exec(t||""),a={},c=14;c--;)a[n[c]]=s[c]||"";return o!=-1&&i!=-1&&(a.source=e,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,":"),a.authority=a.authority.replace("[","").replace("]","").replace(/;/g,":"),a.ipv6uri=!0),a}},function(t,e){"use strict";t.exports=function(){return function(){}}},function(t,e,r){function n(){}function o(t){var r=""+t.type;return e.BINARY_EVENT!==t.type&&e.BINARY_ACK!==t.type||(r+=t.attachments+"-"),t.nsp&&"/"!==t.nsp&&(r+=t.nsp+","),null!=t.id&&(r+=t.id),null!=t.data&&(r+=JSON.stringify(t.data)),r}function i(t,e){function r(t){var r=l.deconstructPacket(t),n=o(r.packet),i=r.buffers;i.unshift(n),e(i)}l.removeBlobs(t,r)}function s(){this.reconstructor=null}function a(t){var r=0,n={type:Number(t.charAt(0))};if(null==e.types[n.type])return p();if(e.BINARY_EVENT===n.type||e.BINARY_ACK===n.type){for(var o="";"-"!==t.charAt(++r)&&(o+=t.charAt(r),r!=t.length););if(o!=Number(o)||"-"!==t.charAt(r))throw new Error("Illegal attachments");n.attachments=Number(o)}if("/"===t.charAt(r+1))for(n.nsp="";++r;){var i=t.charAt(r);if(","===i)break;if(n.nsp+=i,r===t.length)break}else n.nsp="/";var s=t.charAt(r+1);if(""!==s&&Number(s)==s){for(n.id="";++r;){var i=t.charAt(r);if(null==i||Number(i)!=i){--r;break}if(n.id+=t.charAt(r),r===t.length)break}n.id=Number(n.id)}return t.charAt(++r)&&(n=c(n,t.substr(r))),n}function c(t,e){try{t.data=JSON.parse(e)}catch(t){return p()}return t}function h(t){this.reconPack=t,this.buffers=[]}function p(){return{type:e.ERROR,data:"parser error"}}var u=(r(3)("socket.io-parser"),r(5)),f=r(6),l=r(8),d=r(9);e.protocol=4,e.types=["CONNECT","DISCONNECT","EVENT","ACK","ERROR","BINARY_EVENT","BINARY_ACK"],e.CONNECT=0,e.DISCONNECT=1,e.EVENT=2,e.ACK=3,e.ERROR=4,e.BINARY_EVENT=5,e.BINARY_ACK=6,e.Encoder=n,e.Decoder=s,n.prototype.encode=function(t,r){if(t.type!==e.EVENT&&t.type!==e.ACK||!f(t.data)||(t.type=t.type===e.EVENT?e.BINARY_EVENT:e.BINARY_ACK),e.BINARY_EVENT===t.type||e.BINARY_ACK===t.type)i(t,r);else{var n=o(t);r([n])}},u(s.prototype),s.prototype.add=function(t){var r;if("string"==typeof t)r=a(t),e.BINARY_EVENT===r.type||e.BINARY_ACK===r.type?(this.reconstructor=new h(r),0===this.reconstructor.reconPack.attachments&&this.emit("decoded",r)):this.emit("decoded",r);else{if(!d(t)&&!t.base64)throw new Error("Unknown type: "+t);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");r=this.reconstructor.takeBinaryData(t),r&&(this.reconstructor=null,this.emit("decoded",r))}},s.prototype.destroy=function(){this.reconstructor&&this.reconstructor.finishedReconstruction()},h.prototype.takeBinaryData=function(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){var e=l.reconstructPacket(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null},h.prototype.finishedReconstruction=function(){this.reconPack=null,this.buffers=[]}},function(t,e,r){function n(t){if(t)return o(t)}function o(t){for(var e in n.prototype)t[e]=n.prototype[e];return t}t.exports=n,n.prototype.on=n.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},n.prototype.once=function(t,e){function r(){this.off(t,r),e.apply(this,arguments)}return r.fn=e,this.on(t,r),this},n.prototype.off=n.prototype.removeListener=n.prototype.removeAllListeners=n.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var r=this._callbacks["$"+t];if(!r)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var n,o=0;o<r.length;o++)if(n=r[o],n===e||n.fn===e){r.splice(o,1);break}return this},n.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),r=this._callbacks["$"+t];if(r){r=r.slice(0);for(var n=0,o=r.length;n<o;++n)r[n].apply(this,e)}return this},n.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},n.prototype.hasListeners=function(t){return!!this.listeners(t).length}},function(t,e,r){(function(e){function n(t){if(!t||"object"!=typeof t)return!1;if(o(t)){for(var r=0,i=t.length;r<i;r++)if(n(t[r]))return!0;return!1}if("function"==typeof e.Buffer&&e.Buffer.isBuffer&&e.Buffer.isBuffer(t)||"function"==typeof e.ArrayBuffer&&t instanceof ArrayBuffer||s&&t instanceof Blob||a&&t instanceof File)return!0;if(t.toJSON&&"function"==typeof t.toJSON&&1===arguments.length)return n(t.toJSON(),!0);for(var c in t)if(Object.prototype.hasOwnProperty.call(t,c)&&n(t[c]))return!0;return!1}var o=r(7),i=Object.prototype.toString,s="function"==typeof e.Blob||"[object BlobConstructor]"===i.call(e.Blob),a="function"==typeof e.File||"[object FileConstructor]"===i.call(e.File);t.exports=n}).call(e,function(){return this}())},function(t,e){var r={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==r.call(t)}},function(t,e,r){(function(t){function n(t,e){if(!t)return t;if(s(t)){var r={_placeholder:!0,num:e.length};return e.push(t),r}if(i(t)){for(var o=new Array(t.length),a=0;a<t.length;a++)o[a]=n(t[a],e);return o}if("object"==typeof t&&!(t instanceof Date)){var o={};for(var c in t)o[c]=n(t[c],e);return o}return t}function o(t,e){if(!t)return t;if(t&&t._placeholder)return e[t.num];if(i(t))for(var r=0;r<t.length;r++)t[r]=o(t[r],e);else if("object"==typeof t)for(var n in t)t[n]=o(t[n],e);return t}var i=r(7),s=r(9),a=Object.prototype.toString,c="function"==typeof t.Blob||"[object BlobConstructor]"===a.call(t.Blob),h="function"==typeof t.File||"[object FileConstructor]"===a.call(t.File);e.deconstructPacket=function(t){var e=[],r=t.data,o=t;return o.data=n(r,e),o.attachments=e.length,{packet:o,buffers:e}},e.reconstructPacket=function(t,e){return t.data=o(t.data,e),t.attachments=void 0,t},e.removeBlobs=function(t,e){function r(t,a,p){if(!t)return t;if(c&&t instanceof Blob||h&&t instanceof File){n++;var u=new FileReader;u.onload=function(){p?p[a]=this.result:o=this.result,--n||e(o)},u.readAsArrayBuffer(t)}else if(i(t))for(var f=0;f<t.length;f++)r(t[f],f,t);else if("object"==typeof t&&!s(t))for(var l in t)r(t[l],l,t)}var n=0,o=t;r(o),n||e(o)}}).call(e,function(){return this}())},function(t,e){(function(e){function r(t){return e.Buffer&&e.Buffer.isBuffer(t)||e.ArrayBuffer&&t instanceof ArrayBuffer}t.exports=r}).call(e,function(){return this}())},function(t,e,r){"use strict";function n(t,e){if(!(this instanceof n))return new n(t,e);t&&"object"===("undefined"==typeof t?"undefined":o(t))&&(e=t,t=void 0),e=e||{},e.path=e.path||"/socket.io",this.nsps={},this.subs=[],this.opts=e,this.reconnection(e.reconnection!==!1),this.reconnectionAttempts(e.reconnectionAttempts||1/0),this.reconnectionDelay(e.reconnectionDelay||1e3),this.reconnectionDelayMax(e.reconnectionDelayMax||5e3),this.randomizationFactor(e.randomizationFactor||.5),this.backoff=new f({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(null==e.timeout?2e4:e.timeout),this.readyState="closed",this.uri=t,this.connecting=[],this.lastPing=null,this.encoding=!1,this.packetBuffer=[];var r=e.parser||c;this.encoder=new r.Encoder,this.decoder=new r.Decoder,this.autoConnect=e.autoConnect!==!1,this.autoConnect&&this.open()}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=r(11),s=r(36),a=r(5),c=r(4),h=r(38),p=r(39),u=(r(3)("socket.io-client:manager"),r(34)),f=r(40),l=Object.prototype.hasOwnProperty;t.exports=n,n.prototype.emitAll=function(){this.emit.apply(this,arguments);for(var t in this.nsps)l.call(this.nsps,t)&&this.nsps[t].emit.apply(this.nsps[t],arguments)},n.prototype.updateSocketIds=function(){for(var t in this.nsps)l.call(this.nsps,t)&&(this.nsps[t].id=this.generateId(t))},n.prototype.generateId=function(t){return("/"===t?"":t+"#")+this.engine.id},a(n.prototype),n.prototype.reconnection=function(t){return arguments.length?(this._reconnection=!!t,this):this._reconnection},n.prototype.reconnectionAttempts=function(t){return arguments.length?(this._reconnectionAttempts=t,this):this._reconnectionAttempts},n.prototype.reconnectionDelay=function(t){return arguments.length?(this._reconnectionDelay=t,this.backoff&&this.backoff.setMin(t),this):this._reconnectionDelay},n.prototype.randomizationFactor=function(t){return arguments.length?(this._randomizationFactor=t,this.backoff&&this.backoff.setJitter(t),this):this._randomizationFactor},n.prototype.reconnectionDelayMax=function(t){return arguments.length?(this._reconnectionDelayMax=t,this.backoff&&this.backoff.setMax(t),this):this._reconnectionDelayMax},n.prototype.timeout=function(t){return arguments.length?(this._timeout=t,this):this._timeout},n.prototype.maybeReconnectOnOpen=function(){!this.reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()},n.prototype.open=n.prototype.connect=function(t,e){if(~this.readyState.indexOf("open"))return this;this.engine=i(this.uri,this.opts);var r=this.engine,n=this;this.readyState="opening",this.skipReconnect=!1;var o=h(r,"open",function(){n.onopen(),t&&t()}),s=h(r,"error",function(e){if(n.cleanup(),n.readyState="closed",n.emitAll("connect_error",e),t){var r=new Error("Connection error");r.data=e,t(r)}else n.maybeReconnectOnOpen()});if(!1!==this._timeout){var a=this._timeout,c=setTimeout(function(){o.destroy(),r.close(),r.emit("error","timeout"),n.emitAll("connect_timeout",a)},a);this.subs.push({destroy:function(){clearTimeout(c)}})}return this.subs.push(o),this.subs.push(s),this},n.prototype.onopen=function(){this.cleanup(),this.readyState="open",this.emit("open");var t=this.engine;this.subs.push(h(t,"data",p(this,"ondata"))),this.subs.push(h(t,"ping",p(this,"onping"))),this.subs.push(h(t,"pong",p(this,"onpong"))),this.subs.push(h(t,"error",p(this,"onerror"))),this.subs.push(h(t,"close",p(this,"onclose"))),this.subs.push(h(this.decoder,"decoded",p(this,"ondecoded")))},n.prototype.onping=function(){this.lastPing=new Date,this.emitAll("ping")},n.prototype.onpong=function(){this.emitAll("pong",new Date-this.lastPing)},n.prototype.ondata=function(t){this.decoder.add(t)},n.prototype.ondecoded=function(t){this.emit("packet",t)},n.prototype.onerror=function(t){this.emitAll("error",t)},n.prototype.socket=function(t,e){function r(){~u(o.connecting,n)||o.connecting.push(n)}var n=this.nsps[t];if(!n){n=new s(this,t,e),this.nsps[t]=n;var o=this;n.on("connecting",r),n.on("connect",function(){n.id=o.generateId(t)}),this.autoConnect&&r()}return n},n.prototype.destroy=function(t){var e=u(this.connecting,t);~e&&this.connecting.splice(e,1),this.connecting.length||this.close()},n.prototype.packet=function(t){var e=this;t.query&&0===t.type&&(t.nsp+="?"+t.query),e.encoding?e.packetBuffer.push(t):(e.encoding=!0,this.encoder.encode(t,function(r){for(var n=0;n<r.length;n++)e.engine.write(r[n],t.options);e.encoding=!1,e.processPacketQueue()}))},n.prototype.processPacketQueue=function(){if(this.packetBuffer.length>0&&!this.encoding){var t=this.packetBuffer.shift();this.packet(t)}},n.prototype.cleanup=function(){for(var t=this.subs.length,e=0;e<t;e++){var r=this.subs.shift();r.destroy()}this.packetBuffer=[],this.encoding=!1,this.lastPing=null,this.decoder.destroy()},n.prototype.close=n.prototype.disconnect=function(){this.skipReconnect=!0,this.reconnecting=!1,"opening"===this.readyState&&this.cleanup(),this.backoff.reset(),this.readyState="closed",this.engine&&this.engine.close()},n.prototype.onclose=function(t){this.cleanup(),this.backoff.reset(),this.readyState="closed",this.emit("close",t),this._reconnection&&!this.skipReconnect&&this.reconnect()},n.prototype.reconnect=function(){if(this.reconnecting||this.skipReconnect)return this;var t=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitAll("reconnect_failed"),this.reconnecting=!1;else{var e=this.backoff.duration();this.reconnecting=!0;var r=setTimeout(function(){t.skipReconnect||(t.emitAll("reconnect_attempt",t.backoff.attempts),t.emitAll("reconnecting",t.backoff.attempts),t.skipReconnect||t.open(function(e){e?(t.reconnecting=!1,t.reconnect(),t.emitAll("reconnect_error",e.data)):t.onreconnect()}))},e);this.subs.push({destroy:function(){clearTimeout(r)}})}},n.prototype.onreconnect=function(){var t=this.backoff.attempts;this.reconnecting=!1,this.backoff.reset(),this.updateSocketIds(),this.emitAll("reconnect",t)}},function(t,e,r){t.exports=r(12)},function(t,e,r){t.exports=r(13),t.exports.parser=r(20)},function(t,e,r){(function(e){function n(t,r){if(!(this instanceof n))return new n(t,r);r=r||{},t&&"object"==typeof t&&(r=t,t=null),t?(t=h(t),r.hostname=t.host,r.secure="https"===t.protocol||"wss"===t.protocol,r.port=t.port,t.query&&(r.query=t.query)):r.host&&(r.hostname=h(r.host).host),this.secure=null!=r.secure?r.secure:e.location&&"https:"===location.protocol,r.hostname&&!r.port&&(r.port=this.secure?"443":"80"),this.agent=r.agent||!1,this.hostname=r.hostname||(e.location?location.hostname:"localhost"),this.port=r.port||(e.location&&location.port?location.port:this.secure?443:80),this.query=r.query||{},"string"==typeof this.query&&(this.query=u.decode(this.query)),this.upgrade=!1!==r.upgrade,this.path=(r.path||"/engine.io").replace(/\/$/,"")+"/",this.forceJSONP=!!r.forceJSONP,this.jsonp=!1!==r.jsonp,this.forceBase64=!!r.forceBase64,this.enablesXDR=!!r.enablesXDR,this.timestampParam=r.timestampParam||"t",this.timestampRequests=r.timestampRequests,this.transports=r.transports||["polling","websocket"],this.transportOptions=r.transportOptions||{},this.readyState="",this.writeBuffer=[],this.prevBufferLen=0,this.policyPort=r.policyPort||843,this.rememberUpgrade=r.rememberUpgrade||!1,this.binaryType=null,this.onlyBinaryUpgrades=r.onlyBinaryUpgrades,this.perMessageDeflate=!1!==r.perMessageDeflate&&(r.perMessageDeflate||{}),!0===this.perMessageDeflate&&(this.perMessageDeflate={}),this.perMessageDeflate&&null==this.perMessageDeflate.threshold&&(this.perMessageDeflate.threshold=1024),this.pfx=r.pfx||null,this.key=r.key||null,this.passphrase=r.passphrase||null,this.cert=r.cert||null,this.ca=r.ca||null,this.ciphers=r.ciphers||null,this.rejectUnauthorized=void 0===r.rejectUnauthorized||r.rejectUnauthorized,this.forceNode=!!r.forceNode;var o="object"==typeof e&&e;o.global===o&&(r.extraHeaders&&Object.keys(r.extraHeaders).length>0&&(this.extraHeaders=r.extraHeaders),r.localAddress&&(this.localAddress=r.localAddress)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingIntervalTimer=null,this.pingTimeoutTimer=null,this.open()}function o(t){var e={};for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);return e}var i=r(14),s=r(5),a=(r(3)("engine.io-client:socket"),r(34)),c=r(20),h=r(2),p=r(35),u=r(28);t.exports=n,n.priorWebsocketSuccess=!1,s(n.prototype),n.protocol=c.protocol,n.Socket=n,n.Transport=r(19),n.transports=r(14),n.parser=r(20),n.prototype.createTransport=function(t){var e=o(this.query);e.EIO=c.protocol,e.transport=t;var r=this.transportOptions[t]||{};this.id&&(e.sid=this.id);var n=new i[t]({query:e,socket:this,agent:r.agent||this.agent,hostname:r.hostname||this.hostname,port:r.port||this.port,secure:r.secure||this.secure,path:r.path||this.path,forceJSONP:r.forceJSONP||this.forceJSONP,jsonp:r.jsonp||this.jsonp,forceBase64:r.forceBase64||this.forceBase64,enablesXDR:r.enablesXDR||this.enablesXDR,timestampRequests:r.timestampRequests||this.timestampRequests,timestampParam:r.timestampParam||this.timestampParam,policyPort:r.policyPort||this.policyPort,pfx:r.pfx||this.pfx,key:r.key||this.key,passphrase:r.passphrase||this.passphrase,cert:r.cert||this.cert,ca:r.ca||this.ca,ciphers:r.ciphers||this.ciphers,rejectUnauthorized:r.rejectUnauthorized||this.rejectUnauthorized,perMessageDeflate:r.perMessageDeflate||this.perMessageDeflate,extraHeaders:r.extraHeaders||this.extraHeaders,forceNode:r.forceNode||this.forceNode,localAddress:r.localAddress||this.localAddress,requestTimeout:r.requestTimeout||this.requestTimeout,protocols:r.protocols||void 0});return n},n.prototype.open=function(){var t;if(this.rememberUpgrade&&n.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1)t="websocket";else{if(0===this.transports.length){var e=this;return void setTimeout(function(){e.emit("error","No transports available")},0)}t=this.transports[0]}this.readyState="opening";try{t=this.createTransport(t)}catch(t){return this.transports.shift(),void this.open()}t.open(),this.setTransport(t)},n.prototype.setTransport=function(t){var e=this;this.transport&&this.transport.removeAllListeners(),this.transport=t,t.on("drain",function(){e.onDrain()}).on("packet",function(t){e.onPacket(t)}).on("error",function(t){e.onError(t)}).on("close",function(){e.onClose("transport close")})},n.prototype.probe=function(t){function e(){if(u.onlyBinaryUpgrades){var t=!this.supportsBinary&&u.transport.supportsBinary;p=p||t}p||(h.send([{type:"ping",data:"probe"}]),h.once("packet",function(t){if(!p)if("pong"===t.type&&"probe"===t.data){if(u.upgrading=!0,u.emit("upgrading",h),!h)return;n.priorWebsocketSuccess="websocket"===h.name,u.transport.pause(function(){p||"closed"!==u.readyState&&(c(),u.setTransport(h),h.send([{type:"upgrade"}]),u.emit("upgrade",h),h=null,u.upgrading=!1,u.flush())})}else{var e=new Error("probe error");e.transport=h.name,u.emit("upgradeError",e)}}))}function r(){p||(p=!0,c(),h.close(),h=null)}function o(t){var e=new Error("probe error: "+t);e.transport=h.name,r(),u.emit("upgradeError",e)}function i(){o("transport closed")}function s(){o("socket closed")}function a(t){h&&t.name!==h.name&&r()}function c(){h.removeListener("open",e),h.removeListener("error",o),h.removeListener("close",i),u.removeListener("close",s),u.removeListener("upgrading",a)}var h=this.createTransport(t,{probe:1}),p=!1,u=this;n.priorWebsocketSuccess=!1,h.once("open",e),h.once("error",o),h.once("close",i),this.once("close",s),this.once("upgrading",a),h.open()},n.prototype.onOpen=function(){if(this.readyState="open",n.priorWebsocketSuccess="websocket"===this.transport.name,this.emit("open"),this.flush(),"open"===this.readyState&&this.upgrade&&this.transport.pause)for(var t=0,e=this.upgrades.length;t<e;t++)this.probe(this.upgrades[t])},n.prototype.onPacket=function(t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(this.emit("packet",t),this.emit("heartbeat"),t.type){case"open":this.onHandshake(p(t.data));break;case"pong":this.setPing(),this.emit("pong");break;case"error":var e=new Error("server error");e.code=t.data,this.onError(e);break;case"message":this.emit("data",t.data),this.emit("message",t.data)}},n.prototype.onHandshake=function(t){this.emit("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this.upgrades=this.filterUpgrades(t.upgrades),this.pingInterval=t.pingInterval,this.pingTimeout=t.pingTimeout,this.onOpen(),"closed"!==this.readyState&&(this.setPing(),this.removeListener("heartbeat",this.onHeartbeat),this.on("heartbeat",this.onHeartbeat))},n.prototype.onHeartbeat=function(t){clearTimeout(this.pingTimeoutTimer);var e=this;e.pingTimeoutTimer=setTimeout(function(){"closed"!==e.readyState&&e.onClose("ping timeout")},t||e.pingInterval+e.pingTimeout)},n.prototype.setPing=function(){var t=this;clearTimeout(t.pingIntervalTimer),t.pingIntervalTimer=setTimeout(function(){t.ping(),t.onHeartbeat(t.pingTimeout)},t.pingInterval)},n.prototype.ping=function(){var t=this;this.sendPacket("ping",function(){t.emit("ping")})},n.prototype.onDrain=function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emit("drain"):this.flush()},n.prototype.flush=function(){"closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"))},n.prototype.write=n.prototype.send=function(t,e,r){return this.sendPacket("message",t,e,r),this},n.prototype.sendPacket=function(t,e,r,n){if("function"==typeof e&&(n=e,e=void 0),"function"==typeof r&&(n=r,r=null),"closing"!==this.readyState&&"closed"!==this.readyState){r=r||{},r.compress=!1!==r.compress;var o={type:t,data:e,options:r};this.emit("packetCreate",o),this.writeBuffer.push(o),n&&this.once("flush",n),this.flush()}},n.prototype.close=function(){function t(){n.onClose("forced close"),n.transport.close()}function e(){n.removeListener("upgrade",e),n.removeListener("upgradeError",e),t()}function r(){n.once("upgrade",e),n.once("upgradeError",e)}if("opening"===this.readyState||"open"===this.readyState){this.readyState="closing";var n=this;this.writeBuffer.length?this.once("drain",function(){this.upgrading?r():t()}):this.upgrading?r():t()}return this},n.prototype.onError=function(t){n.priorWebsocketSuccess=!1,this.emit("error",t),this.onClose("transport error",t)},n.prototype.onClose=function(t,e){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState){var r=this;clearTimeout(this.pingIntervalTimer),clearTimeout(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),this.readyState="closed",this.id=null,this.emit("close",t,e),r.writeBuffer=[],r.prevBufferLen=0}},n.prototype.filterUpgrades=function(t){for(var e=[],r=0,n=t.length;r<n;r++)~a(this.transports,t[r])&&e.push(t[r]);return e}}).call(e,function(){return this}())},function(t,e,r){(function(t){function n(e){var r,n=!1,a=!1,c=!1!==e.jsonp;if(t.location){var h="https:"===location.protocol,p=location.port;p||(p=h?443:80),n=e.hostname!==location.hostname||p!==e.port,a=e.secure!==h}if(e.xdomain=n,e.xscheme=a,r=new o(e),"open"in r&&!e.forceJSONP)return new i(e);if(!c)throw new Error("JSONP disabled");return new s(e)}var o=r(15),i=r(17),s=r(31),a=r(32);e.polling=n,e.websocket=a}).call(e,function(){return this}())},function(t,e,r){(function(e){var n=r(16);t.exports=function(t){var r=t.xdomain,o=t.xscheme,i=t.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!r||n))return new XMLHttpRequest}catch(t){}try{if("undefined"!=typeof XDomainRequest&&!o&&i)return new XDomainRequest}catch(t){}if(!r)try{return new(e[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(t){}}}).call(e,function(){return this}())},function(t,e){try{t.exports="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(e){t.exports=!1}},function(t,e,r){(function(e){function n(){}function o(t){if(c.call(this,t),this.requestTimeout=t.requestTimeout,this.extraHeaders=t.extraHeaders,e.location){var r="https:"===location.protocol,n=location.port;n||(n=r?443:80),this.xd=t.hostname!==e.location.hostname||n!==t.port,this.xs=t.secure!==r}}function i(t){this.method=t.method||"GET",this.uri=t.uri,this.xd=!!t.xd,this.xs=!!t.xs,this.async=!1!==t.async,this.data=void 0!==t.data?t.data:null,this.agent=t.agent,this.isBinary=t.isBinary,this.supportsBinary=t.supportsBinary,this.enablesXDR=t.enablesXDR,this.requestTimeout=t.requestTimeout,this.pfx=t.pfx,this.key=t.key,this.passphrase=t.passphrase,this.cert=t.cert,this.ca=t.ca,this.ciphers=t.ciphers,this.rejectUnauthorized=t.rejectUnauthorized,this.extraHeaders=t.extraHeaders,this.create()}function s(){for(var t in i.requests)i.requests.hasOwnProperty(t)&&i.requests[t].abort()}var a=r(15),c=r(18),h=r(5),p=r(29);r(3)("engine.io-client:polling-xhr");t.exports=o,t.exports.Request=i,p(o,c),o.prototype.supportsBinary=!0,o.prototype.request=function(t){return t=t||{},t.uri=this.uri(),t.xd=this.xd,t.xs=this.xs,t.agent=this.agent||!1,t.supportsBinary=this.supportsBinary,t.enablesXDR=this.enablesXDR,t.pfx=this.pfx,t.key=this.key,t.passphrase=this.passphrase,t.cert=this.cert,t.ca=this.ca,t.ciphers=this.ciphers,t.rejectUnauthorized=this.rejectUnauthorized,t.requestTimeout=this.requestTimeout,t.extraHeaders=this.extraHeaders,new i(t)},o.prototype.doWrite=function(t,e){var r="string"!=typeof t&&void 0!==t,n=this.request({method:"POST",data:t,isBinary:r}),o=this;n.on("success",e),n.on("error",function(t){o.onError("xhr post error",t)}),this.sendXhr=n},o.prototype.doPoll=function(){var t=this.request(),e=this;t.on("data",function(t){e.onData(t)}),t.on("error",function(t){e.onError("xhr poll error",t)}),this.pollXhr=t},h(i.prototype),i.prototype.create=function(){var t={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR};t.pfx=this.pfx,t.key=this.key,t.passphrase=this.passphrase,t.cert=this.cert,t.ca=this.ca,t.ciphers=this.ciphers,t.rejectUnauthorized=this.rejectUnauthorized;var r=this.xhr=new a(t),n=this;try{r.open(this.method,this.uri,this.async);try{if(this.extraHeaders){r.setDisableHeaderCheck&&r.setDisableHeaderCheck(!0);for(var o in this.extraHeaders)this.extraHeaders.hasOwnProperty(o)&&r.setRequestHeader(o,this.extraHeaders[o])}}catch(t){}if("POST"===this.method)try{this.isBinary?r.setRequestHeader("Content-type","application/octet-stream"):r.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(t){}try{r.setRequestHeader("Accept","*/*")}catch(t){}"withCredentials"in r&&(r.withCredentials=!0),this.requestTimeout&&(r.timeout=this.requestTimeout),this.hasXDR()?(r.onload=function(){n.onLoad()},r.onerror=function(){n.onError(r.responseText)}):r.onreadystatechange=function(){if(2===r.readyState){var t;try{t=r.getResponseHeader("Content-Type")}catch(t){}"application/octet-stream"===t&&(r.responseType="arraybuffer")}4===r.readyState&&(200===r.status||1223===r.status?n.onLoad():setTimeout(function(){n.onError(r.status)},0))},r.send(this.data)}catch(t){return void setTimeout(function(){n.onError(t)},0)}e.document&&(this.index=i.requestsCount++,i.requests[this.index]=this)},i.prototype.onSuccess=function(){this.emit("success"),this.cleanup()},i.prototype.onData=function(t){this.emit("data",t),this.onSuccess()},i.prototype.onError=function(t){this.emit("error",t),this.cleanup(!0)},i.prototype.cleanup=function(t){if("undefined"!=typeof this.xhr&&null!==this.xhr){if(this.hasXDR()?this.xhr.onload=this.xhr.onerror=n:this.xhr.onreadystatechange=n,t)try{this.xhr.abort()}catch(t){}e.document&&delete i.requests[this.index],this.xhr=null}},i.prototype.onLoad=function(){var t;try{var e;try{e=this.xhr.getResponseHeader("Content-Type")}catch(t){}t="application/octet-stream"===e?this.xhr.response||this.xhr.responseText:this.xhr.responseText}catch(t){this.onError(t)}null!=t&&this.onData(t)},i.prototype.hasXDR=function(){return"undefined"!=typeof e.XDomainRequest&&!this.xs&&this.enablesXDR},i.prototype.abort=function(){this.cleanup()},i.requestsCount=0,i.requests={},e.document&&(e.attachEvent?e.attachEvent("onunload",s):e.addEventListener&&e.addEventListener("beforeunload",s,!1))}).call(e,function(){return this}())},function(t,e,r){function n(t){var e=t&&t.forceBase64;h&&!e||(this.supportsBinary=!1),o.call(this,t)}var o=r(19),i=r(28),s=r(20),a=r(29),c=r(30);r(3)("engine.io-client:polling");t.exports=n;var h=function(){var t=r(15),e=new t({xdomain:!1});return null!=e.responseType}();a(n,o),n.prototype.name="polling",n.prototype.doOpen=function(){this.poll()},n.prototype.pause=function(t){function e(){r.readyState="paused",t()}var r=this;if(this.readyState="pausing",this.polling||!this.writable){var n=0;this.polling&&(n++,this.once("pollComplete",function(){--n||e()})),this.writable||(n++,this.once("drain",function(){--n||e()}))}else e()},n.prototype.poll=function(){this.polling=!0,this.doPoll(),this.emit("poll")},n.prototype.onData=function(t){var e=this,r=function(t,r,n){return"opening"===e.readyState&&e.onOpen(),"close"===t.type?(e.onClose(),!1):void e.onPacket(t)};s.decodePayload(t,this.socket.binaryType,r),"closed"!==this.readyState&&(this.polling=!1,this.emit("pollComplete"),"open"===this.readyState&&this.poll())},n.prototype.doClose=function(){function t(){e.write([{type:"close"}])}var e=this;"open"===this.readyState?t():this.once("open",t)},n.prototype.write=function(t){var e=this;this.writable=!1;var r=function(){e.writable=!0,e.emit("drain")};s.encodePayload(t,this.supportsBinary,function(t){e.doWrite(t,r)})},n.prototype.uri=function(){var t=this.query||{},e=this.secure?"https":"http",r="";!1!==this.timestampRequests&&(t[this.timestampParam]=c()),this.supportsBinary||t.sid||(t.b64=1),t=i.encode(t),this.port&&("https"===e&&443!==Number(this.port)||"http"===e&&80!==Number(this.port))&&(r=":"+this.port),t.length&&(t="?"+t);var n=this.hostname.indexOf(":")!==-1;return e+"://"+(n?"["+this.hostname+"]":this.hostname)+r+this.path+t}},function(t,e,r){function n(t){this.path=t.path,this.hostname=t.hostname,this.port=t.port,this.secure=t.secure,this.query=t.query,this.timestampParam=t.timestampParam,this.timestampRequests=t.timestampRequests,this.readyState="",this.agent=t.agent||!1,this.socket=t.socket,this.enablesXDR=t.enablesXDR,this.pfx=t.pfx,this.key=t.key,this.passphrase=t.passphrase,this.cert=t.cert,this.ca=t.ca,this.ciphers=t.ciphers,this.rejectUnauthorized=t.rejectUnauthorized,this.forceNode=t.forceNode,this.extraHeaders=t.extraHeaders,this.localAddress=t.localAddress}var o=r(20),i=r(5);t.exports=n,i(n.prototype),n.prototype.onError=function(t,e){var r=new Error(t);return r.type="TransportError",r.description=e,this.emit("error",r),this},n.prototype.open=function(){return"closed"!==this.readyState&&""!==this.readyState||(this.readyState="opening",this.doOpen()),this},n.prototype.close=function(){return"opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this},n.prototype.send=function(t){if("open"!==this.readyState)throw new Error("Transport not open");this.write(t)},n.prototype.onOpen=function(){this.readyState="open",
this.writable=!0,this.emit("open")},n.prototype.onData=function(t){var e=o.decodePacket(t,this.socket.binaryType);this.onPacket(e)},n.prototype.onPacket=function(t){this.emit("packet",t)},n.prototype.onClose=function(){this.readyState="closed",this.emit("close")}},function(t,e,r){(function(t){function n(t,r){var n="b"+e.packets[t.type]+t.data.data;return r(n)}function o(t,r,n){if(!r)return e.encodeBase64Packet(t,n);var o=t.data,i=new Uint8Array(o),s=new Uint8Array(1+o.byteLength);s[0]=v[t.type];for(var a=0;a<i.length;a++)s[a+1]=i[a];return n(s.buffer)}function i(t,r,n){if(!r)return e.encodeBase64Packet(t,n);var o=new FileReader;return o.onload=function(){t.data=o.result,e.encodePacket(t,r,!0,n)},o.readAsArrayBuffer(t.data)}function s(t,r,n){if(!r)return e.encodeBase64Packet(t,n);if(g)return i(t,r,n);var o=new Uint8Array(1);o[0]=v[t.type];var s=new w([o.buffer,t.data]);return n(s)}function a(t){try{t=d.decode(t,{strict:!1})}catch(t){return!1}return t}function c(t,e,r){for(var n=new Array(t.length),o=l(t.length,r),i=function(t,r,o){e(r,function(e,r){n[t]=r,o(e,n)})},s=0;s<t.length;s++)i(s,t[s],o)}var h,p=r(21),u=r(6),f=r(22),l=r(23),d=r(24);t&&t.ArrayBuffer&&(h=r(26));var y="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),m="undefined"!=typeof navigator&&/PhantomJS/i.test(navigator.userAgent),g=y||m;e.protocol=3;var v=e.packets={open:0,close:1,ping:2,pong:3,message:4,upgrade:5,noop:6},b=p(v),k={type:"error",data:"parser error"},w=r(27);e.encodePacket=function(e,r,i,a){"function"==typeof r&&(a=r,r=!1),"function"==typeof i&&(a=i,i=null);var c=void 0===e.data?void 0:e.data.buffer||e.data;if(t.ArrayBuffer&&c instanceof ArrayBuffer)return o(e,r,a);if(w&&c instanceof t.Blob)return s(e,r,a);if(c&&c.base64)return n(e,a);var h=v[e.type];return void 0!==e.data&&(h+=i?d.encode(String(e.data),{strict:!1}):String(e.data)),a(""+h)},e.encodeBase64Packet=function(r,n){var o="b"+e.packets[r.type];if(w&&r.data instanceof t.Blob){var i=new FileReader;return i.onload=function(){var t=i.result.split(",")[1];n(o+t)},i.readAsDataURL(r.data)}var s;try{s=String.fromCharCode.apply(null,new Uint8Array(r.data))}catch(t){for(var a=new Uint8Array(r.data),c=new Array(a.length),h=0;h<a.length;h++)c[h]=a[h];s=String.fromCharCode.apply(null,c)}return o+=t.btoa(s),n(o)},e.decodePacket=function(t,r,n){if(void 0===t)return k;if("string"==typeof t){if("b"===t.charAt(0))return e.decodeBase64Packet(t.substr(1),r);if(n&&(t=a(t),t===!1))return k;var o=t.charAt(0);return Number(o)==o&&b[o]?t.length>1?{type:b[o],data:t.substring(1)}:{type:b[o]}:k}var i=new Uint8Array(t),o=i[0],s=f(t,1);return w&&"blob"===r&&(s=new w([s])),{type:b[o],data:s}},e.decodeBase64Packet=function(t,e){var r=b[t.charAt(0)];if(!h)return{type:r,data:{base64:!0,data:t.substr(1)}};var n=h.decode(t.substr(1));return"blob"===e&&w&&(n=new w([n])),{type:r,data:n}},e.encodePayload=function(t,r,n){function o(t){return t.length+":"+t}function i(t,n){e.encodePacket(t,!!s&&r,!1,function(t){n(null,o(t))})}"function"==typeof r&&(n=r,r=null);var s=u(t);return r&&s?w&&!g?e.encodePayloadAsBlob(t,n):e.encodePayloadAsArrayBuffer(t,n):t.length?void c(t,i,function(t,e){return n(e.join(""))}):n("0:")},e.decodePayload=function(t,r,n){if("string"!=typeof t)return e.decodePayloadAsBinary(t,r,n);"function"==typeof r&&(n=r,r=null);var o;if(""===t)return n(k,0,1);for(var i,s,a="",c=0,h=t.length;c<h;c++){var p=t.charAt(c);if(":"===p){if(""===a||a!=(i=Number(a)))return n(k,0,1);if(s=t.substr(c+1,i),a!=s.length)return n(k,0,1);if(s.length){if(o=e.decodePacket(s,r,!1),k.type===o.type&&k.data===o.data)return n(k,0,1);var u=n(o,c+i,h);if(!1===u)return}c+=i,a=""}else a+=p}return""!==a?n(k,0,1):void 0},e.encodePayloadAsArrayBuffer=function(t,r){function n(t,r){e.encodePacket(t,!0,!0,function(t){return r(null,t)})}return t.length?void c(t,n,function(t,e){var n=e.reduce(function(t,e){var r;return r="string"==typeof e?e.length:e.byteLength,t+r.toString().length+r+2},0),o=new Uint8Array(n),i=0;return e.forEach(function(t){var e="string"==typeof t,r=t;if(e){for(var n=new Uint8Array(t.length),s=0;s<t.length;s++)n[s]=t.charCodeAt(s);r=n.buffer}e?o[i++]=0:o[i++]=1;for(var a=r.byteLength.toString(),s=0;s<a.length;s++)o[i++]=parseInt(a[s]);o[i++]=255;for(var n=new Uint8Array(r),s=0;s<n.length;s++)o[i++]=n[s]}),r(o.buffer)}):r(new ArrayBuffer(0))},e.encodePayloadAsBlob=function(t,r){function n(t,r){e.encodePacket(t,!0,!0,function(t){var e=new Uint8Array(1);if(e[0]=1,"string"==typeof t){for(var n=new Uint8Array(t.length),o=0;o<t.length;o++)n[o]=t.charCodeAt(o);t=n.buffer,e[0]=0}for(var i=t instanceof ArrayBuffer?t.byteLength:t.size,s=i.toString(),a=new Uint8Array(s.length+1),o=0;o<s.length;o++)a[o]=parseInt(s[o]);if(a[s.length]=255,w){var c=new w([e.buffer,a.buffer,t]);r(null,c)}})}c(t,n,function(t,e){return r(new w(e))})},e.decodePayloadAsBinary=function(t,r,n){"function"==typeof r&&(n=r,r=null);for(var o=t,i=[];o.byteLength>0;){for(var s=new Uint8Array(o),a=0===s[0],c="",h=1;255!==s[h];h++){if(c.length>310)return n(k,0,1);c+=s[h]}o=f(o,2+c.length),c=parseInt(c);var p=f(o,0,c);if(a)try{p=String.fromCharCode.apply(null,new Uint8Array(p))}catch(t){var u=new Uint8Array(p);p="";for(var h=0;h<u.length;h++)p+=String.fromCharCode(u[h])}i.push(p),o=f(o,c)}var l=i.length;i.forEach(function(t,o){n(e.decodePacket(t,r,!0),o,l)})}}).call(e,function(){return this}())},function(t,e){t.exports=Object.keys||function(t){var e=[],r=Object.prototype.hasOwnProperty;for(var n in t)r.call(t,n)&&e.push(n);return e}},function(t,e){t.exports=function(t,e,r){var n=t.byteLength;if(e=e||0,r=r||n,t.slice)return t.slice(e,r);if(e<0&&(e+=n),r<0&&(r+=n),r>n&&(r=n),e>=n||e>=r||0===n)return new ArrayBuffer(0);for(var o=new Uint8Array(t),i=new Uint8Array(r-e),s=e,a=0;s<r;s++,a++)i[a]=o[s];return i.buffer}},function(t,e){function r(t,e,r){function o(t,n){if(o.count<=0)throw new Error("after called too many times");--o.count,t?(i=!0,e(t),e=r):0!==o.count||i||e(null,n)}var i=!1;return r=r||n,o.count=t,0===t?e():o}function n(){}t.exports=r},function(t,e,r){var n;(function(t,o){!function(i){function s(t){for(var e,r,n=[],o=0,i=t.length;o<i;)e=t.charCodeAt(o++),e>=55296&&e<=56319&&o<i?(r=t.charCodeAt(o++),56320==(64512&r)?n.push(((1023&e)<<10)+(1023&r)+65536):(n.push(e),o--)):n.push(e);return n}function a(t){for(var e,r=t.length,n=-1,o="";++n<r;)e=t[n],e>65535&&(e-=65536,o+=k(e>>>10&1023|55296),e=56320|1023&e),o+=k(e);return o}function c(t,e){if(t>=55296&&t<=57343){if(e)throw Error("Lone surrogate U+"+t.toString(16).toUpperCase()+" is not a scalar value");return!1}return!0}function h(t,e){return k(t>>e&63|128)}function p(t,e){if(0==(4294967168&t))return k(t);var r="";return 0==(4294965248&t)?r=k(t>>6&31|192):0==(4294901760&t)?(c(t,e)||(t=65533),r=k(t>>12&15|224),r+=h(t,6)):0==(4292870144&t)&&(r=k(t>>18&7|240),r+=h(t,12),r+=h(t,6)),r+=k(63&t|128)}function u(t,e){e=e||{};for(var r,n=!1!==e.strict,o=s(t),i=o.length,a=-1,c="";++a<i;)r=o[a],c+=p(r,n);return c}function f(){if(b>=v)throw Error("Invalid byte index");var t=255&g[b];if(b++,128==(192&t))return 63&t;throw Error("Invalid continuation byte")}function l(t){var e,r,n,o,i;if(b>v)throw Error("Invalid byte index");if(b==v)return!1;if(e=255&g[b],b++,0==(128&e))return e;if(192==(224&e)){if(r=f(),i=(31&e)<<6|r,i>=128)return i;throw Error("Invalid continuation byte")}if(224==(240&e)){if(r=f(),n=f(),i=(15&e)<<12|r<<6|n,i>=2048)return c(i,t)?i:65533;throw Error("Invalid continuation byte")}if(240==(248&e)&&(r=f(),n=f(),o=f(),i=(7&e)<<18|r<<12|n<<6|o,i>=65536&&i<=1114111))return i;throw Error("Invalid UTF-8 detected")}function d(t,e){e=e||{};var r=!1!==e.strict;g=s(t),v=g.length,b=0;for(var n,o=[];(n=l(r))!==!1;)o.push(n);return a(o)}var y="object"==typeof e&&e,m=("object"==typeof t&&t&&t.exports==y&&t,"object"==typeof o&&o);m.global!==m&&m.window!==m||(i=m);var g,v,b,k=String.fromCharCode,w={version:"2.1.2",encode:u,decode:d};n=function(){return w}.call(e,r,e,t),!(void 0!==n&&(t.exports=n))}(this)}).call(e,r(25)(t),function(){return this}())},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}},function(t,e){!function(){"use strict";for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r=new Uint8Array(256),n=0;n<t.length;n++)r[t.charCodeAt(n)]=n;e.encode=function(e){var r,n=new Uint8Array(e),o=n.length,i="";for(r=0;r<o;r+=3)i+=t[n[r]>>2],i+=t[(3&n[r])<<4|n[r+1]>>4],i+=t[(15&n[r+1])<<2|n[r+2]>>6],i+=t[63&n[r+2]];return o%3===2?i=i.substring(0,i.length-1)+"=":o%3===1&&(i=i.substring(0,i.length-2)+"=="),i},e.decode=function(t){var e,n,o,i,s,a=.75*t.length,c=t.length,h=0;"="===t[t.length-1]&&(a--,"="===t[t.length-2]&&a--);var p=new ArrayBuffer(a),u=new Uint8Array(p);for(e=0;e<c;e+=4)n=r[t.charCodeAt(e)],o=r[t.charCodeAt(e+1)],i=r[t.charCodeAt(e+2)],s=r[t.charCodeAt(e+3)],u[h++]=n<<2|o>>4,u[h++]=(15&o)<<4|i>>2,u[h++]=(3&i)<<6|63&s;return p}}()},function(t,e){(function(e){function r(t){for(var e=0;e<t.length;e++){var r=t[e];if(r.buffer instanceof ArrayBuffer){var n=r.buffer;if(r.byteLength!==n.byteLength){var o=new Uint8Array(r.byteLength);o.set(new Uint8Array(n,r.byteOffset,r.byteLength)),n=o.buffer}t[e]=n}}}function n(t,e){e=e||{};var n=new i;r(t);for(var o=0;o<t.length;o++)n.append(t[o]);return e.type?n.getBlob(e.type):n.getBlob()}function o(t,e){return r(t),new Blob(t,e||{})}var i=e.BlobBuilder||e.WebKitBlobBuilder||e.MSBlobBuilder||e.MozBlobBuilder,s=function(){try{var t=new Blob(["hi"]);return 2===t.size}catch(t){return!1}}(),a=s&&function(){try{var t=new Blob([new Uint8Array([1,2])]);return 2===t.size}catch(t){return!1}}(),c=i&&i.prototype.append&&i.prototype.getBlob;t.exports=function(){return s?a?e.Blob:o:c?n:void 0}()}).call(e,function(){return this}())},function(t,e){e.encode=function(t){var e="";for(var r in t)t.hasOwnProperty(r)&&(e.length&&(e+="&"),e+=encodeURIComponent(r)+"="+encodeURIComponent(t[r]));return e},e.decode=function(t){for(var e={},r=t.split("&"),n=0,o=r.length;n<o;n++){var i=r[n].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}},function(t,e){t.exports=function(t,e){var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t}},function(t,e){"use strict";function r(t){var e="";do e=s[t%a]+e,t=Math.floor(t/a);while(t>0);return e}function n(t){var e=0;for(p=0;p<t.length;p++)e=e*a+c[t.charAt(p)];return e}function o(){var t=r(+new Date);return t!==i?(h=0,i=t):t+"."+r(h++)}for(var i,s="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),a=64,c={},h=0,p=0;p<a;p++)c[s[p]]=p;o.encode=r,o.decode=n,t.exports=o},function(t,e,r){(function(e){function n(){}function o(t){i.call(this,t),this.query=this.query||{},a||(e.___eio||(e.___eio=[]),a=e.___eio),this.index=a.length;var r=this;a.push(function(t){r.onData(t)}),this.query.j=this.index,e.document&&e.addEventListener&&e.addEventListener("beforeunload",function(){r.script&&(r.script.onerror=n)},!1)}var i=r(18),s=r(29);t.exports=o;var a,c=/\n/g,h=/\\n/g;s(o,i),o.prototype.supportsBinary=!1,o.prototype.doClose=function(){this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),this.form&&(this.form.parentNode.removeChild(this.form),this.form=null,this.iframe=null),i.prototype.doClose.call(this)},o.prototype.doPoll=function(){var t=this,e=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),e.async=!0,e.src=this.uri(),e.onerror=function(e){t.onError("jsonp poll error",e)};var r=document.getElementsByTagName("script")[0];r?r.parentNode.insertBefore(e,r):(document.head||document.body).appendChild(e),this.script=e;var n="undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent);n&&setTimeout(function(){var t=document.createElement("iframe");document.body.appendChild(t),document.body.removeChild(t)},100)},o.prototype.doWrite=function(t,e){function r(){n(),e()}function n(){if(o.iframe)try{o.form.removeChild(o.iframe)}catch(t){o.onError("jsonp polling iframe removal error",t)}try{var t='<iframe src="javascript:0" name="'+o.iframeId+'">';i=document.createElement(t)}catch(t){i=document.createElement("iframe"),i.name=o.iframeId,i.src="javascript:0"}i.id=o.iframeId,o.form.appendChild(i),o.iframe=i}var o=this;if(!this.form){var i,s=document.createElement("form"),a=document.createElement("textarea"),p=this.iframeId="eio_iframe_"+this.index;s.className="socketio",s.style.position="absolute",s.style.top="-1000px",s.style.left="-1000px",s.target=p,s.method="POST",s.setAttribute("accept-charset","utf-8"),a.name="d",s.appendChild(a),document.body.appendChild(s),this.form=s,this.area=a}this.form.action=this.uri(),n(),t=t.replace(h,"\\\n"),this.area.value=t.replace(c,"\\n");try{this.form.submit()}catch(t){}this.iframe.attachEvent?this.iframe.onreadystatechange=function(){"complete"===o.iframe.readyState&&r()}:this.iframe.onload=r}}).call(e,function(){return this}())},function(t,e,r){(function(e){function n(t){var e=t&&t.forceBase64;e&&(this.supportsBinary=!1),this.perMessageDeflate=t.perMessageDeflate,this.usingBrowserWebSocket=p&&!t.forceNode,this.protocols=t.protocols,this.usingBrowserWebSocket||(u=o),i.call(this,t)}var o,i=r(19),s=r(20),a=r(28),c=r(29),h=r(30),p=(r(3)("engine.io-client:websocket"),e.WebSocket||e.MozWebSocket);if("undefined"==typeof window)try{o=r(33)}catch(t){}var u=p;u||"undefined"!=typeof window||(u=o),t.exports=n,c(n,i),n.prototype.name="websocket",n.prototype.supportsBinary=!0,n.prototype.doOpen=function(){if(this.check()){var t=this.uri(),e=this.protocols,r={agent:this.agent,perMessageDeflate:this.perMessageDeflate};r.pfx=this.pfx,r.key=this.key,r.passphrase=this.passphrase,r.cert=this.cert,r.ca=this.ca,r.ciphers=this.ciphers,r.rejectUnauthorized=this.rejectUnauthorized,this.extraHeaders&&(r.headers=this.extraHeaders),this.localAddress&&(r.localAddress=this.localAddress);try{this.ws=this.usingBrowserWebSocket?e?new u(t,e):new u(t):new u(t,e,r)}catch(t){return this.emit("error",t)}void 0===this.ws.binaryType&&(this.supportsBinary=!1),this.ws.supports&&this.ws.supports.binary?(this.supportsBinary=!0,this.ws.binaryType="nodebuffer"):this.ws.binaryType="arraybuffer",this.addEventListeners()}},n.prototype.addEventListeners=function(){var t=this;this.ws.onopen=function(){t.onOpen()},this.ws.onclose=function(){t.onClose()},this.ws.onmessage=function(e){t.onData(e.data)},this.ws.onerror=function(e){t.onError("websocket error",e)}},n.prototype.write=function(t){function r(){n.emit("flush"),setTimeout(function(){n.writable=!0,n.emit("drain")},0)}var n=this;this.writable=!1;for(var o=t.length,i=0,a=o;i<a;i++)!function(t){s.encodePacket(t,n.supportsBinary,function(i){if(!n.usingBrowserWebSocket){var s={};if(t.options&&(s.compress=t.options.compress),n.perMessageDeflate){var a="string"==typeof i?e.Buffer.byteLength(i):i.length;a<n.perMessageDeflate.threshold&&(s.compress=!1)}}try{n.usingBrowserWebSocket?n.ws.send(i):n.ws.send(i,s)}catch(t){}--o||r()})}(t[i])},n.prototype.onClose=function(){i.prototype.onClose.call(this)},n.prototype.doClose=function(){"undefined"!=typeof this.ws&&this.ws.close()},n.prototype.uri=function(){var t=this.query||{},e=this.secure?"wss":"ws",r="";this.port&&("wss"===e&&443!==Number(this.port)||"ws"===e&&80!==Number(this.port))&&(r=":"+this.port),this.timestampRequests&&(t[this.timestampParam]=h()),this.supportsBinary||(t.b64=1),t=a.encode(t),t.length&&(t="?"+t);var n=this.hostname.indexOf(":")!==-1;return e+"://"+(n?"["+this.hostname+"]":this.hostname)+r+this.path+t},n.prototype.check=function(){return!(!u||"__initialize"in u&&this.name===n.prototype.name)}}).call(e,function(){return this}())},function(t,e){},function(t,e){var r=[].indexOf;t.exports=function(t,e){if(r)return t.indexOf(e);for(var n=0;n<t.length;++n)if(t[n]===e)return n;return-1}},function(t,e){(function(e){var r=/^[\],:{}\s]*$/,n=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,o=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,i=/(?:^|:|,)(?:\s*\[)+/g,s=/^\s+/,a=/\s+$/;t.exports=function(t){return"string"==typeof t&&t?(t=t.replace(s,"").replace(a,""),e.JSON&&JSON.parse?JSON.parse(t):r.test(t.replace(n,"@").replace(o,"]").replace(i,""))?new Function("return "+t)():void 0):null}}).call(e,function(){return this}())},function(t,e,r){"use strict";function n(t,e,r){this.io=t,this.nsp=e,this.json=this,this.ids=0,this.acks={},this.receiveBuffer=[],this.sendBuffer=[],this.connected=!1,this.disconnected=!0,r&&r.query&&(this.query=r.query),this.io.autoConnect&&this.open()}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=r(4),s=r(5),a=r(37),c=r(38),h=r(39),p=(r(3)("socket.io-client:socket"),r(28));t.exports=e=n;var u={connect:1,connect_error:1,connect_timeout:1,connecting:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1,ping:1,pong:1},f=s.prototype.emit;s(n.prototype),n.prototype.subEvents=function(){if(!this.subs){var t=this.io;this.subs=[c(t,"open",h(this,"onopen")),c(t,"packet",h(this,"onpacket")),c(t,"close",h(this,"onclose"))]}},n.prototype.open=n.prototype.connect=function(){return this.connected?this:(this.subEvents(),this.io.open(),"open"===this.io.readyState&&this.onopen(),this.emit("connecting"),this)},n.prototype.send=function(){var t=a(arguments);return t.unshift("message"),this.emit.apply(this,t),this},n.prototype.emit=function(t){if(u.hasOwnProperty(t))return f.apply(this,arguments),this;var e=a(arguments),r={type:i.EVENT,data:e};return r.options={},r.options.compress=!this.flags||!1!==this.flags.compress,"function"==typeof e[e.length-1]&&(this.acks[this.ids]=e.pop(),r.id=this.ids++),this.connected?this.packet(r):this.sendBuffer.push(r),delete this.flags,this},n.prototype.packet=function(t){t.nsp=this.nsp,this.io.packet(t)},n.prototype.onopen=function(){if("/"!==this.nsp)if(this.query){var t="object"===o(this.query)?p.encode(this.query):this.query;this.packet({type:i.CONNECT,query:t})}else this.packet({type:i.CONNECT})},n.prototype.onclose=function(t){this.connected=!1,this.disconnected=!0,delete this.id,this.emit("disconnect",t)},n.prototype.onpacket=function(t){if(t.nsp===this.nsp)switch(t.type){case i.CONNECT:this.onconnect();break;case i.EVENT:this.onevent(t);break;case i.BINARY_EVENT:this.onevent(t);break;case i.ACK:this.onack(t);break;case i.BINARY_ACK:this.onack(t);break;case i.DISCONNECT:this.ondisconnect();break;case i.ERROR:this.emit("error",t.data)}},n.prototype.onevent=function(t){var e=t.data||[];null!=t.id&&e.push(this.ack(t.id)),this.connected?f.apply(this,e):this.receiveBuffer.push(e)},n.prototype.ack=function(t){var e=this,r=!1;return function(){if(!r){r=!0;var n=a(arguments);e.packet({type:i.ACK,id:t,data:n})}}},n.prototype.onack=function(t){var e=this.acks[t.id];"function"==typeof e&&(e.apply(this,t.data),delete this.acks[t.id])},n.prototype.onconnect=function(){this.connected=!0,this.disconnected=!1,this.emit("connect"),this.emitBuffered()},n.prototype.emitBuffered=function(){var t;for(t=0;t<this.receiveBuffer.length;t++)f.apply(this,this.receiveBuffer[t]);for(this.receiveBuffer=[],t=0;t<this.sendBuffer.length;t++)this.packet(this.sendBuffer[t]);this.sendBuffer=[]},n.prototype.ondisconnect=function(){this.destroy(),this.onclose("io server disconnect")},n.prototype.destroy=function(){if(this.subs){for(var t=0;t<this.subs.length;t++)this.subs[t].destroy();this.subs=null}this.io.destroy(this)},n.prototype.close=n.prototype.disconnect=function(){return this.connected&&this.packet({type:i.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this},n.prototype.compress=function(t){return this.flags=this.flags||{},this.flags.compress=t,this}},function(t,e){function r(t,e){var r=[];e=e||0;for(var n=e||0;n<t.length;n++)r[n-e]=t[n];return r}t.exports=r},function(t,e){"use strict";function r(t,e,r){return t.on(e,r),{destroy:function(){t.removeListener(e,r)}}}t.exports=r},function(t,e){var r=[].slice;t.exports=function(t,e){if("string"==typeof e&&(e=t[e]),"function"!=typeof e)throw new Error("bind() requires a function");var n=r.call(arguments,2);return function(){return e.apply(t,n.concat(r.call(arguments)))}}},function(t,e){function r(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}t.exports=r,r.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),r=Math.floor(e*this.jitter*t);t=0==(1&Math.floor(10*e))?t-r:t+r}return 0|Math.min(t,this.max)},r.prototype.reset=function(){this.attempts=0},r.prototype.setMin=function(t){this.ms=t},r.prototype.setMax=function(t){this.max=t},r.prototype.setJitter=function(t){this.jitter=t}}])});

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.string = exports.object = exports.Disposable = exports.async = exports.array = undefined;

var _core = __webpack_require__(17);

Object.keys(_core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _core[key];
    }
  });
});

var _core2 = _interopRequireDefault(_core);

var _array = __webpack_require__(48);

var _array2 = _interopRequireDefault(_array);

var _async = __webpack_require__(49);

var _async2 = _interopRequireDefault(_async);

var _Disposable = __webpack_require__(51);

var _Disposable2 = _interopRequireDefault(_Disposable);

var _object = __webpack_require__(52);

var _object2 = _interopRequireDefault(_object);

var _string = __webpack_require__(53);

var _string2 = _interopRequireDefault(_string);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.array = _array2.default;
exports.async = _async2.default;
exports.Disposable = _Disposable2.default;
exports.object = _object2.default;
exports.string = _string2.default;
exports.default = _core2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Class responsible for storing an object that will be printed as JSON
 * when the `toString` method is called.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Embodied = function () {
  /**
  * Constructs a Embodied instance.
  * @constructor
  */
  function Embodied() {
    _classCallCheck(this, Embodied);

    this.body_ = {};
  }

  /**
  * Gets the json object that represents this instance.
  * @return {!Object}
  */


  _createClass(Embodied, [{
    key: 'body',
    value: function body() {
      return this.body_;
    }

    /**
    * If the given object is an instance of Embodied, this will
    * return its body content. Otherwise this will return the
    * original object.
    * @param {*} obj
    * @return {*}
    * @static
    */

  }, {
    key: 'toString',


    /**
    * Gets the json string that represents this instance.
    * @return {string}
    */
    value: function toString() {
      return JSON.stringify(this.body());
    }
  }], [{
    key: 'toBody',
    value: function toBody(obj) {
      return obj instanceof Embodied ? obj.body() : obj;
    }
  }]);

  return Embodied;
}();

exports.default = Embodied;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeNode = exports.MultiMap = undefined;

var _MultiMap = __webpack_require__(43);

var _MultiMap2 = _interopRequireDefault(_MultiMap);

var _TreeNode = __webpack_require__(44);

var _TreeNode2 = _interopRequireDefault(_TreeNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.MultiMap = _MultiMap2.default;
exports.TreeNode = _TreeNode2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertUriWithNoPath = exports.assertUserSignedIn = exports.assertResponseSucceeded = exports.assertObject = exports.assertFunction = exports.assertNotNull = exports.assertDefAndNotNull = exports.assertBrowserEnvironment = undefined;

var _metal = __webpack_require__(0);

var _globals = __webpack_require__(5);

var _globals2 = _interopRequireDefault(_globals);

var _metalUri = __webpack_require__(6);

var _metalUri2 = _interopRequireDefault(_metalUri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Throws an exception if the current environment is not a browser.
 */
function assertBrowserEnvironment() {
  if (!_globals2.default.window) {
    throw new Error('Sign-in type not supported in this environment');
  }
}

/**
 * Throws an exception if given value is undefined or null.
 * @param {!*} value The value to be checked.
 * @param {!string} errorMessage The message to be provided to the exception.
 */
function assertDefAndNotNull(value, errorMessage) {
  if (!_metal.core.isDefAndNotNull(value)) {
    throw new Error(errorMessage);
  }
}

/**
 * Throws an exception if given value is null.
 * @param {!*} value The value to be checked.
 * @param {!string} errorMessage The message to be provided to the exception.
 */
function assertNotNull(value, errorMessage) {
  if (_metal.core.isNull(value)) {
    throw new Error(errorMessage);
  }
}

/**
 * Throws an exception if given value is not a function.
 * @param {!*} value The value to be checked.
 * @param {!string} errorMessage The message to be provided to the exception.
 */
function assertFunction(value, errorMessage) {
  if (!_metal.core.isFunction(value)) {
    throw new Error(errorMessage);
  }
}

/**
 * Throws an exception if given value is not an object.
 * @param {!*} value The value to be checked.
 * @param {!string} errorMessage The message to be provided to the exception.
 */
function assertObject(value, errorMessage) {
  if (!_metal.core.isObject(value)) {
    throw new Error(errorMessage);
  }
}

/**
 * Checks if a response has succeeded. The function checks if the `succeeded`
 * method of response object returns true. Throws an exception if the returned
 * value is false.
 * @param {!Object} response The response to be checked.
 * @return {Object} The response itself if valid. Otherwise throws an exception.
 */
function assertResponseSucceeded(response) {
  if (!response.succeeded()) {
    throw response.body();
  }
  return response;
}

/**
 * Checks if a valid user is provided to the function. Throws an exception
 * in case of an invalid user.
 * @param {!Object} user The user to be checked.
 */
function assertUserSignedIn(user) {
  if (!_metal.core.isDefAndNotNull(user)) {
    throw new Error('You must be signed-in to perform this operation');
  }
}

/**
 * Checks if an URL with a valid path is provided. Throws an exception
 * if the provided URL doesn't have a valid path.
 * @param {!string} url The URL to be checked.
 * @param {!string} errorMessage The message to be provided to the exception.
 */
function assertUriWithNoPath(url, errorMessage) {
  var uri = new _metalUri2.default(url);
  if (uri.getPathname().length > 1) {
    throw new Error(errorMessage);
  }
}

exports.assertBrowserEnvironment = assertBrowserEnvironment;
exports.assertDefAndNotNull = assertDefAndNotNull;
exports.assertNotNull = assertNotNull;
exports.assertFunction = assertFunction;
exports.assertObject = assertObject;
exports.assertResponseSucceeded = assertResponseSucceeded;
exports.assertUserSignedIn = assertUserSignedIn;
exports.assertUriWithNoPath = assertUriWithNoPath;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
		value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _metal = __webpack_require__(0);

var _Embodied2 = __webpack_require__(1);

var _Embodied3 = _interopRequireDefault(_Embodied2);

var _FilterBody = __webpack_require__(20);

var _FilterBody2 = _interopRequireDefault(_FilterBody);

var _Geo = __webpack_require__(15);

var _Geo2 = _interopRequireDefault(_Geo);

var _Range = __webpack_require__(8);

var _Range2 = _interopRequireDefault(_Range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class responsible for building filters.
 * @extends {Embodied}
 */
var Filter = function (_Embodied) {
		_inherits(Filter, _Embodied);

		/**
  * Constructs a {@link Filter} instance.
  * @param {string} field The name of the field to filter by.
  * @param {*} operatorOrValue If a third param is given, this should
  *   be the filter's operator (like ">="). Otherwise, this will be
  *   used as the filter's value, and the filter's operator will be "=".
  * @param {*=} opt_value The filter's value.
  * @constructor
  */
		function Filter(field, operatorOrValue, opt_value) {
				_classCallCheck(this, Filter);

				var _this = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this));

				_this.body_ = new _FilterBody2.default(field, operatorOrValue, opt_value);
				return _this;
		}

		/**
  * Adds a filter to be composed with this filter using the given operator.
  * @param {string} operator
  * @param {!Filter|string} fieldOrFilter Either a {@link Filter} instance or
  *   the name of the field to filter by.
  * @param {*=} opt_operatorOrValue Either the field's operator or its value.
  * @param {*=} opt_value The filter's value.
  * @return {Filter} Returns the {@link Filter} object itself, so calls can be
  *   chained.
  * @chainable
  */


		_createClass(Filter, [{
				key: 'add',
				value: function add(operator, fieldOrFilter, opt_operatorOrValue, opt_value) {
						var filter = fieldOrFilter ? Filter.toFilter(fieldOrFilter, opt_operatorOrValue, opt_value) : null;
						this.body_.add(operator, filter);
						return this;
				}

				/**
    * Adds filters to be composed with this filter using the given operator.
    * @param {string} operator
    * @param {...*} filters A variable amount of filters to be composed.
    * @return {Filter} Returns the {@link Filter} object itself, so calls can be
    *   chained.
    * @chainable
    */

		}, {
				key: 'addMany',
				value: function addMany(operator) {
						var _body_;

						for (var _len = arguments.length, filters = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
								filters[_key - 1] = arguments[_key];
						}

						(_body_ = this.body_).addMany.apply(_body_, [operator].concat(filters));
						return this;
				}

				/**
    * Adds a filter to be composed with this filter using the "and" operator.
    * @param {!Filter|string} fieldOrFilter Either a {@link Filter} instance or
    *   the name of the field to filter by.
    * @param {*=} opt_operatorOrValue Either the field's operator or its value.
    * @param {*=} opt_value The filter's value.
    * @return {Filter} Returns the {@link Filter} object itself, so calls can be
    *   chained.
    * @chainable
    */

		}, {
				key: 'and',
				value: function and(fieldOrFilter, opt_operatorOrValue, opt_value) {
						return this.add('and', fieldOrFilter, opt_operatorOrValue, opt_value);
				}

				/**
    * Returns a {@link Filter} instance that uses the "any" operator.
    * @param {string} field The name of the field to filter by.
    * @param {Array|*} values A variable amount of values to be used with
    *   the "any" operator. Can be passed either as a single array or as
    *   separate params.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'body',


				/**
    * Gets the json object that represents this filter.
    * @return {!Object}
    */
				value: function body() {
						return this.body_.getObject();
				}

				/**
    * Returns a {@link Filter} instance that uses the "gd" operator.
    * @param {string} field The field's name.
    * @param {*} locationOrCircle Either a `Geo.Circle` instance or a coordinate.
    * @param {Range|string=} opt_rangeOrDistance Either a `Range` instance or
    *   the distance value.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'or',


				/**
    * Adds a filter to be composed with this filter using the "or" operator.
    * @param {!Filter|string} fieldOrFilter Either a {@link Filter} instance or
    * the name of the field to filter by.
    * @param {*=} opt_operatorOrValue Either the field's operator or its value.
    * @param {*=} opt_value The filter's value.
    * @return {Filter} Returns the {@link Filter} object itself, so calls can be
    *   chained.
    * @chainable
    */
				value: function or(fieldOrFilter, opt_operatorOrValue, opt_value) {
						return this.add('or', fieldOrFilter, opt_operatorOrValue, opt_value);
				}

				/**
    * Converts the given arguments into a {@link Filter} instance.
    * @param {!Filter|string} fieldOrFilter Either a {@link Filter} instance or
    * the name of the field to filter by.
    * @param {*=} opt_operatorOrValue Either the field's operator or its value.
    * @param {*=} opt_value The filter's value.
    * @return {!Filter}
    */

		}], [{
				key: 'any',
				value: function any(field) {
						for (var _len2 = arguments.length, values = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
								values[_key2 - 1] = arguments[_key2];
						}

						if (values.length === 1 && Array.isArray(values[0])) {
								values = values[0];
						}
						return new Filter(field, 'any', values);
				}

				/**
    * Returns a {@link Filter} instance that uses the "gp" operator.
    * This is a special use case of `Filter.polygon` for bounding
    * boxes.
    * @param {string} field The field's name.
    * @param {*} boxOrUpperLeft Either a `Geo.BoundingBox` instance, or
    *   a bounding box's upper left coordinate.
    * @param {*=} opt_lowerRight A bounding box's lower right coordinate.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'boundingBox',
				value: function boundingBox(field, boxOrUpperLeft, opt_lowerRight) {
						if (boxOrUpperLeft instanceof _Geo2.default.BoundingBox) {
								return Filter.polygon.apply(Filter, [field].concat(_toConsumableArray(boxOrUpperLeft.getPoints())));
						} else {
								return Filter.polygon(field, boxOrUpperLeft, opt_lowerRight);
						}
				}
		}, {
				key: 'distance',
				value: function distance(field, locationOrCircle, opt_rangeOrDistance) {
						var location = locationOrCircle;
						var range = opt_rangeOrDistance;
						if (locationOrCircle instanceof _Geo2.default.Circle) {
								location = locationOrCircle.getCenter();
								range = _Range2.default.to(locationOrCircle.getRadius());
						} else if (!(opt_rangeOrDistance instanceof _Range2.default)) {
								range = _Range2.default.to(opt_rangeOrDistance);
						}
						return Filter.distanceInternal_(field, location, range);
				}

				/**
    * Returns a {@link Filter} instance that uses the "gd" operator. This
    * is just an internal helper used by `Filter.distance`.
    * @param {string} field The field's name.
    * @param {*} location A location coordinate.
    * @param {Range} range A `Range` instance.
    * @return {!Filter}
    * @protected
    * @static
    */

		}, {
				key: 'distanceInternal_',
				value: function distanceInternal_(field, location, range) {
						var value = {
								location: _Embodied3.default.toBody(location)
						};
						range = range.body();
						if (range.from) {
								value.min = range.from;
						}
						if (range.to) {
								value.max = range.to;
						}
						return Filter.field(field, 'gd', value);
				}

				/**
    * Returns a {@link Filter} instance that uses the "=" operator.
    * @param {string} field The name of the field to filter by.
    * @param {*} value The filter's value.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'equal',
				value: function equal(field, value) {
						return new Filter(field, '=', value);
				}

				/**
    * Returns a {@link Filter} instance that uses the "exists" operator.
    * @param {string} field The field's name.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'exists',
				value: function exists(field) {
						return Filter.field(field, 'exists', null);
				}

				/**
    * Returns a {@link Filter} instance that uses the "fuzzy" operator.
    * @param {string} fieldOrQuery If no second string argument is given, this
    *   should be the query string, in which case all fields will be matched.
    *   Otherwise, this should be the name of the field to match.
    * @param {string|number=} opt_queryOrFuzziness If this is a string, it should
    *   be the query, otherwise it should be the fuzziness value.
    * @param {number=} opt_fuzziness The fuzziness value.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'fuzzy',
				value: function fuzzy(fieldOrQuery, opt_queryOrFuzziness, opt_fuzziness) {
						return Filter.fuzzyInternal_('fuzzy', fieldOrQuery, opt_queryOrFuzziness, opt_fuzziness);
				}

				/**
    * Returns a {@link Filter} instance that uses the given fuzzy operator. This
    * is an internal implementation used by the `Filter.fuzzy` method.
    * @param {string} operator The fuzzy operator.
    * @param {string} fieldOrQuery If no second string argument is given, this
    *   should be the query string, in which case all fields will be matched.
    *   Otherwise, this should be the name of the field to match.
    * @param {string|number=} opt_queryOrFuzziness If this is a string, it should
    *   be the query, otherwise it should be the fuzziness value.
    * @param {number=} opt_fuzziness The fuzziness value.
    * @return {!Filter}
    * @protected
    * @static
    */

		}, {
				key: 'fuzzyInternal_',
				value: function fuzzyInternal_(operator, fieldOrQuery, opt_queryOrFuzziness, opt_fuzziness) {
						var arg2IsString = _metal.core.isString(opt_queryOrFuzziness);

						var value = {
								query: arg2IsString ? opt_queryOrFuzziness : fieldOrQuery
						};
						var fuzziness = arg2IsString ? opt_fuzziness : opt_queryOrFuzziness;
						if (fuzziness) {
								value.fuzziness = fuzziness;
						}

						var field = arg2IsString ? fieldOrQuery : Filter.ALL;
						return Filter.field(field, operator, value);
				}

				/**
    * Returns a {@link Filter} instance that uses the ">" operator.
    * @param {string} field The name of the field to filter by.
    * @param {*} value The filter's value.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'gt',
				value: function gt(field, value) {
						return new Filter(field, '>', value);
				}

				/**
    * Returns a {@link Filter} instance that uses the ">=" operator.
    * @param {string} field The name of the field to filter by.
    * @param {*} value The filter's value.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'gte',
				value: function gte(field, value) {
						return new Filter(field, '>=', value);
				}

				/**
    * Returns a {@link Filter} instance that uses the "match" operator.
    * @param {string} fieldOrQuery If no second string argument is given, this
    *   should be the query string, in which case all fields will be matched.
    *   Otherwise, this should be the name of the field to match.
    * @param {string=} opt_query The query string.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'match',
				value: function match(fieldOrQuery, opt_query) {
						var field = _metal.core.isString(opt_query) ? fieldOrQuery : Filter.ALL;
						var query = _metal.core.isString(opt_query) ? opt_query : fieldOrQuery;
						return Filter.field(field, 'match', query);
				}

				/**
    * Returns a {@link Filter} instance that uses the "missing" operator.
    * @param {string} field The field's name.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'missing',
				value: function missing(field) {
						return Filter.field(field, 'missing', null);
				}

				/**
    * Returns a {@link Filter} instance that uses the "phrase" operator.
    * @param {string} fieldOrQuery If no second string argument is given, this
    *   should be the query string, in which case all fields will be matched.
    *   Otherwise, this should be the name of the field to match.
    * @param {string=} opt_query The query string.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'phrase',
				value: function phrase(fieldOrQuery, opt_query) {
						var field = _metal.core.isString(opt_query) ? fieldOrQuery : Filter.ALL;
						var query = _metal.core.isString(opt_query) ? opt_query : fieldOrQuery;
						return Filter.field(field, 'phrase', query);
				}

				/**
    * Returns a {@link Filter} instance that uses the "gp" operator.
    * @param {string} field The name of the field.
    * @param {...!Object} points Objects representing points in the polygon.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'polygon',
				value: function polygon(field) {
						for (var _len3 = arguments.length, points = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
								points[_key3 - 1] = arguments[_key3];
						}

						points = points.map(function (point) {
								return _Embodied3.default.toBody(point);
						});
						return Filter.field(field, 'gp', points);
				}

				/**
    * Returns a {@link Filter} instance that uses the "prefix" operator.
    * @param {string} fieldOrQuery If no second argument is given, this should
    *   be the query string, in which case all fields will be matched. Otherwise,
    *   this should be the name of the field to match.
    * @param {string=} opt_query The query string.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'prefix',
				value: function prefix(fieldOrQuery, opt_query) {
						var field = _metal.core.isDefAndNotNull(opt_query) ? fieldOrQuery : Filter.ALL;
						var query = _metal.core.isDefAndNotNull(opt_query) ? opt_query : fieldOrQuery;
						return Filter.field(field, 'prefix', query);
				}

				/**
    * Returns a {@link Filter} instance that uses the "range" operator.
    * @param {string} field The field's name.
    * @param {*} rangeOrMin Either a `Range` instance or a the range's min value.
    * @param {*=} opt_max The range's max value.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'range',
				value: function range(field, rangeOrMin, opt_max) {
						var range = rangeOrMin;
						if (!(range instanceof _Range2.default)) {
								range = _Range2.default.range(rangeOrMin, opt_max);
						}
						return Filter.field(field, 'range', range);
				}

				/**
    * Returns a {@link Filter} instance that uses the "~" operator.
    * @param {string} field The name of the field to filter by.
    * @param {*} value The filter's value.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'regex',
				value: function regex(field, value) {
						return new Filter(field, '~', value);
				}

				/**
    * Returns a {@link Filter} instance that uses the "gs" operator.
    * @param {string} field The field's name.
    * @param {...!Object} shapes Objects representing shapes.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'shape',
				value: function shape(field) {
						for (var _len4 = arguments.length, shapes = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
								shapes[_key4 - 1] = arguments[_key4];
						}

						shapes = shapes.map(function (shape) {
								return _Embodied3.default.toBody(shape);
						});
						var value = {
								type: 'geometrycollection',
								geometries: shapes
						};
						return Filter.field(field, 'gs', value);
				}

				/**
    * Returns a {@link Filter} instance that uses the "similar" operator.
    * @param {string} fieldOrQuery If no second string argument is given, this
    *   should be the query string, in which case all fields will be matched.
    *   Otherwise, this should be the name of the field to match.
    * @param {?string} query The query string.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'similar',
				value: function similar(fieldOrQuery, query) {
						var field = _metal.core.isString(query) ? fieldOrQuery : Filter.ALL;
						var value = {
								query: _metal.core.isString(query) ? query : fieldOrQuery
						};
						return Filter.field(field, 'similar', value);
				}

				/**
    * Returns a {@link Filter} instance that uses the "<" operator.
    * @param {string} field The name of the field to filter by.
    * @param {*} value The filter's value.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'lt',
				value: function lt(field, value) {
						return new Filter(field, '<', value);
				}

				/**
    * Returns a {@link Filter} instance that uses the "<=" operator.
    * @param {string} field The name of the field to filter by.
    * @param {*} value The filter's value.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'lte',
				value: function lte(field, value) {
						return new Filter(field, '<=', value);
				}

				/**
    * Returns a {@link Filter} instance that uses the "none" operator.
    * @param {string} field The name of the field to filter by.
    * @param {!(Array|*)} value A variable amount of values to be used with
    * the "none" operator. Can be passed either as a single array or as
    * separate params.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'none',
				value: function none(field) {
						for (var _len5 = arguments.length, values = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
								values[_key5 - 1] = arguments[_key5];
						}

						if (values.length === 1 && Array.isArray(values[0])) {
								values = values[0];
						}
						return new Filter(field, 'none', values);
				}

				/**
    * Returns a {@link Filter} instance that uses the "!=" operator.
    * @param {string} field The name of the field to filter by.
    * @param {*} value The filter's value.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'notEqual',
				value: function notEqual(field, value) {
						return new Filter(field, '!=', value);
				}

				/**
    * Returns a {@link Filter} instance that uses the "not" operator.
    * @param {!Filter|string} fieldOrFilter Either a {@link Filter} instance or
    * the name of the field to filter by.
    * @param {*=} opt_operatorOrValue Either the field's operator or its value.
    * @param {*=} opt_value The filter's value.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'not',
				value: function not(fieldOrFilter, opt_operatorOrValue, opt_value) {
						return Filter.toFilter(fieldOrFilter, opt_operatorOrValue, opt_value).add('not');
				}

				/**
    * Returns a {@link Filter} instance.
    * @param {string} field The name of the field to filter by.
    * @param {*} operatorOrValue If a third param is given, this should be the
    * filter's operator (like ">="). Otherwise, this will be used as the
    * filter's value, and the filter's operator will be "=".
    * @param {*=} opt_value The filter's value.
    * @return {!Filter}
    * @static
    */

		}, {
				key: 'field',
				value: function field(_field, operatorOrValue, opt_value) {
						return new Filter(_field, operatorOrValue, opt_value);
				}
		}, {
				key: 'toFilter',
				value: function toFilter(fieldOrFilter, opt_operatorOrValue, opt_value) {
						var filter = fieldOrFilter;
						if (!(filter instanceof Filter)) {
								filter = Filter.field(fieldOrFilter, opt_operatorOrValue, opt_value);
						}
						return filter;
				}
		}]);

		return Filter;
}(_Embodied3.default);

/**
 * String constant that represents all fields.
 * @type {string}
 * @static
 */


Filter.ALL = '*';

exports.default = Filter;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var globals = {};

if (typeof window !== 'undefined') {
  globals.window = window;
}

if (typeof document !== 'undefined') {
  globals.document = document;
}

exports.default = globals;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Uri = __webpack_require__(45).default;

if (typeof URL === 'undefined' && "function" !== 'undefined') {
	// If there is no "document", then this should be running in NodeJS or in ReactNative env and
	// in this case we should use the "url" NPM module as the parse function.
	// In ReactNative env "path" will be replaced with "path-browserify".

	var path = __webpack_require__(54);
	var url = __webpack_require__(61);

	Uri.setParseFn(function(urlStr) {
		var parsed = url.parse(urlStr);
		parsed.pathname = path.normalize(parsed.pathname);
		return parsed;
	});
}

module.exports = Uri;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
		value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _metal = __webpack_require__(0);

var _Embodied2 = __webpack_require__(1);

var _Embodied3 = _interopRequireDefault(_Embodied2);

var _Filter = __webpack_require__(4);

var _Filter2 = _interopRequireDefault(_Filter);

var _Aggregation = __webpack_require__(19);

var _Aggregation2 = _interopRequireDefault(_Aggregation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class responsible for building queries.
 * @extends {Embodied}
 */
var Query = function (_Embodied) {
		_inherits(Query, _Embodied);

		function Query() {
				_classCallCheck(this, Query);

				return _possibleConstructorReturn(this, (Query.__proto__ || Object.getPrototypeOf(Query)).apply(this, arguments));
		}

		_createClass(Query, [{
				key: 'aggregate',


				/**
    * Adds an aggregation to this {@link Query} instance.
    * @param {string} name The aggregation name.
    * @param {!Aggregation|string} aggregationOrField Either an
    *   {@link Aggregation} instance or the name of the aggregation field.
    * @param {string=} opt_operator The aggregation operator.
    * @return {Query} Returns the {@link Query} object itself, so calls can be
    *   chained.
    * @chainnable
    */
				value: function aggregate(name, aggregationOrField, opt_operator) {
						var aggregation = aggregationOrField;
						if (!(aggregation instanceof _Aggregation2.default)) {
								aggregation = _Aggregation2.default.field(aggregationOrField, opt_operator);
						}

						var field = aggregation.getField();
						var value = {};
						value[field] = {
								name: name,
								operator: aggregation.getOperator()
						};
						if (_metal.core.isDefAndNotNull(aggregation.getValue())) {
								value[field].value = aggregation.getValue();
						}

						if (!this.body_.aggregation) {
								this.body_.aggregation = [];
						}
						this.body_.aggregation.push(value);
						return this;
				}

				/**
    * Sets this query's type to "count".
    * @return {Query} Returns the {@link Query} object itself, so calls can be
    *   chained.
    * @chainnable
    */

		}, {
				key: 'count',
				value: function count() {
						return this.type('count');
				}

				/**
    * Sets this query's type to "fetch".
    * @return {Query} Returns the {@link Query} object itself, so calls can be
    *   chained.
    * @chainnable
    */

		}, {
				key: 'fetch',
				value: function fetch() {
						return this.type('fetch');
				}

				/**
    * Adds a filter to this Query.
    * @param {!Filter|string} fieldOrFilter Either a {@link Filter} or the
    *   name of the field to filter by.
    * @param {*=} opt_operatorOrValue Either the field's operator or its value.
    * @param {*=} opt_value The filter's value.
    * @return {Query} Returns the {@link Query} object itself, so calls can be
    *   chained.
    * @chainnable
    */

		}, {
				key: 'filter',
				value: function filter(fieldOrFilter, opt_operatorOrValue, opt_value) {
						var filter = _Filter2.default.toFilter(fieldOrFilter, opt_operatorOrValue, opt_value);
						if (!this.body_.filter) {
								this.body_.filter = [];
						}
						this.body_.filter.push(filter.body());
						return this;
				}

				/**
    * Sets the query offset.
    * @param {number} offset The index of the first entry that should be returned
    *   by this query.
    * @return {Query} Returns the {@link Query} object itself, so calls can be
    *   chained.
    * @chainnable
    */

		}, {
				key: 'offset',
				value: function offset(_offset2) {
						this.body_.offset = _offset2;
						return this;
				}

				/**
    * Adds a highlight entry to this {@link Query} instance.
    * @param {string} field The field's name.
    * @return {Query} Returns the {@link Query} object itself, so calls can be
    *   chained.
    * @chainnable
    */

		}, {
				key: 'highlight',
				value: function highlight(field) {
						if (!this.body_.highlight) {
								this.body_.highlight = [];
						}

						this.body_.highlight.push(field);
						return this;
				}

				/**
    * Sets the query limit.
    * @param {number} limit The max amount of entries that this query should
    *   return.
    * @return {Query} Returns the {@link Query} object itself, so calls can be
    *   chained.
    * @chainnable
    */

		}, {
				key: 'limit',
				value: function limit(_limit2) {
						this.body_.limit = _limit2;
						return this;
				}

				/**
    * Adds a search to this {@link Query} instance.
    * @param {!Filter|string=} filterOrTextOrField If no other arguments
    *   are passed to this function, this should be either a {@link Filter}
    *   instance or a text to be used in a match filter. In both cases
    *   the filter will be applied to all fields. Another option is to
    *   pass this as a field name instead, together with other arguments
    *   so the filter can be created. If the value of this parameter is
    *   undefined or null, no filter will be provided to the search query.
    * @param {string=} opt_textOrOperator Either a text to be used in a
    *   match filter, or the operator that should be used.
    * @param {*=} opt_value The value to be used by the filter. Should
    *   only be passed if an operator was passed as the second argument.
    * @return {Query} Returns the {@link Query} object itself, so calls can be
    *   chained.
    * @chainnable
    */

		}, {
				key: 'search',
				value: function search(filterOrTextOrField, opt_textOrOperator, opt_value) {
						var filter = filterOrTextOrField;

						if (opt_value) {
								filter = _Filter2.default.field(filterOrTextOrField, opt_textOrOperator, opt_value);
						} else if (opt_textOrOperator) {
								filter = _Filter2.default.match(filterOrTextOrField, opt_textOrOperator);
						} else if (filter && !(filter instanceof _Filter2.default)) {
								filter = _Filter2.default.match(filterOrTextOrField);
						}

						this.type('search');

						if (filter) {
								this.filter(filter);
						}

						return this;
				}

				/**
    * Adds a sort entry to this query, specifying the field this query should be
    * sorted by and, optionally, the sort direction.
    * @param {string} field The field that the query should be sorted by.
    * @param {string=} opt_direction The direction the sort operation should use.
    *   If none is given, "asc" is used by default.
    * @return {Query} Returns the {@link Query} object itself, so calls can be
    *   chained.
    * @chainnable
    */

		}, {
				key: 'sort',
				value: function sort(field, opt_direction) {
						if (!this.body_.sort) {
								this.body_.sort = [];
						}
						var sortEntry = {};
						sortEntry[field] = opt_direction || 'asc';
						this.body_.sort.push(sortEntry);
						return this;
				}

				/**
    * Sets the query type.
    * @param {string} type The query's type. For example: "count", "fetch".
    * @return {Query} Returns the {@link Query} object itself, so calls can be
    *   chained.
    * @chainnable
    */

		}, {
				key: 'type',
				value: function type(_type2) {
						this.body_.type = _type2;
						return this;
				}
		}], [{
				key: 'aggregate',

				/**
    * Adds an aggregation to this {@link Query} instance.
    * @param {string} name The aggregation name.
    * @param {!Aggregation|string} aggregationOrField Either an
    *   {@link Aggregation} instance or the name of the aggregation field.
    * @param {string=} opt_operator The aggregation operator.
    * @return {!Query}
    * @static
    */
				value: function aggregate(name, aggregationOrField, opt_operator) {
						return new Query().aggregate(name, aggregationOrField, opt_operator);
				}

				/**
    * Sets this query's type to "count".
    * @return {!Query}
    * @static
    */

		}, {
				key: 'count',
				value: function count() {
						return new Query().type('count');
				}

				/**
    * Sets this query's type to "fetch".
    * @return {!Query}
    * @static
    */

		}, {
				key: 'fetch',
				value: function fetch() {
						return new Query().type('fetch');
				}

				/**
    * Adds a filter to this Query.
    * @param {!Filter|string} fieldOrFilter Either a {@link Filter} or the
    *   name of the field to filter by.
    * @param {*=} opt_operatorOrValue Either the field's operator or its value.
    * @param {*=} opt_value The filter's value.
    * @return {!Query}
    * @static
    */

		}, {
				key: 'filter',
				value: function filter(fieldOrFilter, opt_operatorOrValue, opt_value) {
						return new Query().filter(fieldOrFilter, opt_operatorOrValue, opt_value);
				}

				/**
    * Sets the query offset.
    * @param {number} offset The index of the first entry that should be returned
    *   by this query.
    * @return {!Query}
    * @static
    */

		}, {
				key: 'offset',
				value: function offset(_offset) {
						return new Query().offset(_offset);
				}

				/**
    * Adds a highlight entry to this {@link Query} instance.
    * @param {string} field The field's name.
    * @return {!Query}
    * @static
    */

		}, {
				key: 'highlight',
				value: function highlight(field) {
						return new Query().highlight(field);
				}

				/**
    * Sets the query limit.
    * @param {number} limit The max amount of entries that this query should
    *   return.
    * @return {!Query}
    * @static
    */

		}, {
				key: 'limit',
				value: function limit(_limit) {
						return new Query().limit(_limit);
				}

				/**
    * Adds a search to this {@link Query} instance.
    * @param {!Filter|string} filterOrTextOrField If no other arguments
    *   are passed to this function, this should be either a {@link Filter}
    *   instance or a text to be used in a match filter. In both cases
    *   the filter will be applied to all fields. Another option is to
    *   pass this as a field name instead, together with other arguments
    *   so the filter can be created.
    * @param {string=} opt_textOrOperator Either a text to be used in a
    *   match filter, or the operator that should be used.
    * @param {*=} opt_value The value to be used by the filter. Should
    *   only be passed if an operator was passed as the second argument.
    * @return {!Query}
    * @static
    */

		}, {
				key: 'search',
				value: function search(filterOrTextOrField, opt_textOrOperator, opt_value) {
						return new Query().search(filterOrTextOrField, opt_textOrOperator, opt_value);
				}

				/**
    * Adds a sort entry to this query, specifying the field this query should be
    * sorted by and, optionally, the sort direction.
    * @param {string} field The field that the query should be sorted by.
    * @param {string=} opt_direction The direction the sort operation should use.
    *   If none is given, "asc" is used by default.
    * @return {!Query}
    * @static
    */

		}, {
				key: 'sort',
				value: function sort(field, opt_direction) {
						return new Query().sort(field, opt_direction);
				}

				/**
    * Sets the query type.
    * @param {string} type The query's type. For example: "count", "fetch".
    * @return {!Query}
    * @static
    */

		}, {
				key: 'type',
				value: function type(_type) {
						return new Query().type(_type);
				}
		}]);

		return Query;
}(_Embodied3.default);

exports.default = Query;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _metal = __webpack_require__(0);

var _Embodied2 = __webpack_require__(1);

var _Embodied3 = _interopRequireDefault(_Embodied2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class responsible for building range objects to be used by `Filter`.
 * @extends {Embodied}
 */
var Range = function (_Embodied) {
  _inherits(Range, _Embodied);

  /**
  * Constructs a {@link Range} instance.
  * @param {*} from
  * @param {*} opt_to
  * @constructor
  */
  function Range(from, opt_to) {
    _classCallCheck(this, Range);

    var _this = _possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).call(this));

    if (_metal.core.isDefAndNotNull(from)) {
      _this.body_.from = from;
    }
    if (_metal.core.isDefAndNotNull(opt_to)) {
      _this.body_.to = opt_to;
    }
    return _this;
  }

  /**
  * Constructs a {@link Range} instance.
  * @param {*} from
  * @return {!Range}
  * @static
  */


  _createClass(Range, null, [{
    key: 'from',
    value: function from(_from) {
      return new Range(_from);
    }

    /**
    * Constructs a {@link Range} instance.
    * @param {*} from
    * @param {*} to
    * @return {!Range}
    * @static
    */

  }, {
    key: 'range',
    value: function range(from, to) {
      return new Range(from, to);
    }

    /**
    * Constructs a {@link Range} instance.
    * @param {*} to
    * @return {!Range}
    * @static
    */

  }, {
    key: 'to',
    value: function to(_to) {
      return new Range(null, _to);
    }
  }]);

  return Range;
}(_Embodied3.default);

exports.default = Range;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assertions = __webpack_require__(3);

var _metalStructs = __webpack_require__(2);

var _Auth = __webpack_require__(10);

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class responsible for encapsulating API calls.
 */
var ApiHelper = function () {
  /**
  * Constructs an {@link ApiHelper} instance.
  * @param {!WeDeploy} wedeployClient {@link WeDeploy} client reference.
  * @constructor
  */
  function ApiHelper(wedeployClient) {
    _classCallCheck(this, ApiHelper);

    (0, _assertions.assertDefAndNotNull)(wedeployClient, 'WeDeploy client reference must be specified');
    this.wedeployClient = wedeployClient;
    this.headers_ = new _metalStructs.MultiMap();
  }

  /**
  * Adds a header. If a header with the same name already exists, it will not
  * be overwritten, but the new value will be stored as well. The order is
  * preserved.
  * @param {string} name
  * @param {string} value
  * @return {!ClientMessage} Returns the {@link ClientMessage}
  *   object itself, so calls can be chained.
  * @chainable
  */


  _createClass(ApiHelper, [{
    key: 'header',
    value: function header(name, value) {
      if (arguments.length !== 2) {
        throw new Error('Invalid arguments');
      }
      this.headers_.set(name, value);
      return this;
    }

    /**
    * Adds authorization information to this request.
    * @param {!Auth|string} authOrTokenOrEmail Either an {@link Auth} instance,
    * an authorization token, or the email.
    * @param {string=} opt_password If a email is given as the first param,
    * this should be the password.
    * @return {ApiHelper}
    * @chainable
    */

  }, {
    key: 'auth',
    value: function auth(authOrTokenOrEmail, opt_password) {
      this.helperAuthScope = _Auth2.default.create(authOrTokenOrEmail, opt_password);
      this.helperAuthScope.wedeployClient = this.wedeployClient;
      return this;
    }
  }]);

  return ApiHelper;
}();

exports.default = ApiHelper;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _metal = __webpack_require__(0);

var _metalStructs = __webpack_require__(2);

var _assertions = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class responsible for storing authorization information.
 */
var Auth = function () {
  /**
  * Constructs an {@link Auth} instance.
  * @param {string} tokenOrEmail Either the authorization token, or
  *   the username.
  * @param {string=} opt_password If a username is given as the first param,
  *   this should be the password.
  * @constructor
  */
  function Auth(tokenOrEmail) {
    var opt_password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Auth);

    this.token = _metal.core.isString(opt_password) ? null : tokenOrEmail;
    this.email = _metal.core.isString(opt_password) ? tokenOrEmail : null;
    this.password = opt_password;

    this.createdAt = null;
    this.id = null;
    this.name = null;
    this.photoUrl = null;
    this.supportedScopes = [];
    this.wedeployClient = null;
    this.headers_ = new _metalStructs.MultiMap();
  }

  /**
  * Constructs an {@link Auth} instance.
  * @param {string} authOrTokenOrEmail Either an auth instance, the
  *   authorization token, or the username.
  * @param {string=} opt_password If a username is given as the first param,
  *   this should be the password.
  * @return {!Auth}
  */


  _createClass(Auth, [{
    key: 'getCreatedAt',


    /**
    * Gets the created at date.
    * @return {string}
    */
    value: function getCreatedAt() {
      return this.createdAt;
    }

    /**
    * Gets the email.
    * @return {string}
    */

  }, {
    key: 'getEmail',
    value: function getEmail() {
      return this.email;
    }

    /**
    * Gets the id.
    * @return {string}
    */

  }, {
    key: 'getId',
    value: function getId() {
      return this.id;
    }

    /**
    * Gets the name.
    * @return {string}
    */

  }, {
    key: 'getName',
    value: function getName() {
      return this.name;
    }

    /**
    * Gets the password.
    * @return {string}
    */

  }, {
    key: 'getPassword',
    value: function getPassword() {
      return this.password;
    }

    /**
    * Gets the photo url.
    * @return {string}
    */

  }, {
    key: 'getPhotoUrl',
    value: function getPhotoUrl() {
      return this.photoUrl;
    }

    /**
    * Gets the supported scopes.
    * @return {array.<string>}
    */

  }, {
    key: 'getSupportedScopes',
    value: function getSupportedScopes() {
      return this.supportedScopes;
    }

    /**
    * Gets the token.
    * @return {string}
    */

  }, {
    key: 'getToken',
    value: function getToken() {
      return this.token;
    }

    /**
    * Checks if created at is set.
    * @return {boolean}
    */

  }, {
    key: 'hasCreatedAt',
    value: function hasCreatedAt() {
      return _metal.core.isDefAndNotNull(this.createdAt);
    }

    /**
    * Checks if the email is set.
    * @return {boolean}
    */

  }, {
    key: 'hasEmail',
    value: function hasEmail() {
      return _metal.core.isDefAndNotNull(this.email);
    }

    /**
    * Checks if the id is set.
    * @return {boolean}
    */

  }, {
    key: 'hasId',
    value: function hasId() {
      return _metal.core.isDefAndNotNull(this.id);
    }

    /**
    * Checks if the name is set.
    * @return {boolean}
    */

  }, {
    key: 'hasName',
    value: function hasName() {
      return _metal.core.isDefAndNotNull(this.name);
    }

    /**
    * Checks if the password is set.
    * @return {boolean}
    */

  }, {
    key: 'hasPassword',
    value: function hasPassword() {
      return _metal.core.isDefAndNotNull(this.password);
    }

    /**
    * Checks if the photo url is set.
    * @return {boolean}
    */

  }, {
    key: 'hasPhotoUrl',
    value: function hasPhotoUrl() {
      return _metal.core.isDefAndNotNull(this.photoUrl);
    }

    /**
    * Checks if the user has scopes.
    * @param {string|array.<string>} scopes Scope or array of scopes to check.
    * @return {boolean}
    */

  }, {
    key: 'hasSupportedScopes',
    value: function hasSupportedScopes(scopes) {
      var _this = this;

      if (Array.isArray(scopes)) {
        return scopes.every(function (val) {
          return _this.supportedScopes.indexOf(val) > -1;
        });
      } else {
        return this.supportedScopes.indexOf(scopes) > -1;
      }
    }

    /**
    * Checks if the token is set.
    * @return {boolean}
    */

  }, {
    key: 'hasToken',
    value: function hasToken() {
      return _metal.core.isDefAndNotNull(this.token);
    }

    /**
    * Sets created at.
    * @param {string} createdAt
    */

  }, {
    key: 'setCreatedAt',
    value: function setCreatedAt(createdAt) {
      this.createdAt = createdAt;
    }

    /**
    * Sets the email.
    * @param {string} email
    */

  }, {
    key: 'setEmail',
    value: function setEmail(email) {
      this.email = email;
    }

    /**
    * Sets the headers.
    * @param {!MultiMap|Object} headers The headers to be set
    */

  }, {
    key: 'setHeaders',
    value: function setHeaders(headers) {
      var _this2 = this;

      if (!(headers instanceof _metalStructs.MultiMap)) {
        headers = _metalStructs.MultiMap.fromObject(headers);
      }

      headers.names().forEach(function (name) {
        var values = headers.getAll(name);

        values.forEach(function (value) {
          _this2.headers_.set(name, value);
        });
      });
    }

    /**
    * Sets the id.
    * @param {string} id
    */

  }, {
    key: 'setId',
    value: function setId(id) {
      this.id = id;
    }

    /**
    * Sets the name.
    * @param {string} name
    */

  }, {
    key: 'setName',
    value: function setName(name) {
      this.name = name;
    }

    /**
    * Sets the password.
    * @param {string} password
    */

  }, {
    key: 'setPassword',
    value: function setPassword(password) {
      this.password = password;
    }

    /**
    * Sets the photo url.
    * @param {string} photoUrl
    */

  }, {
    key: 'setPhotoUrl',
    value: function setPhotoUrl(photoUrl) {
      this.photoUrl = photoUrl;
    }

    /**
    * Sets supported scopes.
    * @param {array.<string>} supportedScopes
    */

  }, {
    key: 'setSupportedScopes',
    value: function setSupportedScopes(supportedScopes) {
      this.supportedScopes = supportedScopes;
    }

    /**
    * Sets the token.
    * @param {string} token
    */

  }, {
    key: 'setToken',
    value: function setToken(token) {
      this.token = token;
    }

    /**
    * Sets the WeDeploy client.
    * @param {Object} wedeployClient
    */

  }, {
    key: 'setWedeployClient',
    value: function setWedeployClient(wedeployClient) {
      this.wedeployClient = wedeployClient;
    }

    /**
    * Updates the user.
    * @param {!Object} data
    * @return {CompletableFuture}
    */

  }, {
    key: 'updateUser',
    value: function updateUser(data) {
      (0, _assertions.assertObject)(data, 'User data must be specified as object');
      return this.buildUrl_().path('/users', this.getId().toString()).auth(this).patch(data).then(function (response) {
        return (0, _assertions.assertResponseSucceeded)(response);
      });
    }

    /**
    * Deletes the current user.
    * @return {CompletableFuture}
    */

  }, {
    key: 'deleteUser',
    value: function deleteUser() {
      (0, _assertions.assertDefAndNotNull)(this.getId(), 'Cannot delete user without id');
      return this.buildUrl_().path('/users', this.getId().toString()).auth(this).delete().then(function (response) {
        return (0, _assertions.assertResponseSucceeded)(response);
      });
    }

    /**
    * Builds URL by joining the headers.
    * @return {WeDeploy} Returns the {@link WeDeploy} object itself, so calls can
    *   be chained.
    * @chainable
    */

  }, {
    key: 'buildUrl_',
    value: function buildUrl_() {
      return this.wedeployClient.url(this.wedeployClient.authUrl_).headers(this.headers_);
    }
  }], [{
    key: 'create',
    value: function create(authOrTokenOrEmail, opt_password) {
      if (authOrTokenOrEmail instanceof Auth) {
        return authOrTokenOrEmail;
      } else if ((0, _metal.isString)(authOrTokenOrEmail) && (0, _metal.isString)(opt_password)) {
        return new Auth(authOrTokenOrEmail, opt_password);
      } else if ((0, _metal.isString)(authOrTokenOrEmail) && !(0, _metal.isDef)(opt_password)) {
        return new Auth(authOrTokenOrEmail);
      } else if ((0, _metal.isDefAndNotNull)(authOrTokenOrEmail) && (0, _metal.isObject)(authOrTokenOrEmail)) {
        return Auth.createFromData(authOrTokenOrEmail);
      } else {
        return new Auth();
      }
    }

    /**
    * Makes user Auth from data object.
    * @param {Object} data
    * @return {Auth}
    * @protected
    */

  }, {
    key: 'createFromData',
    value: function createFromData(data) {
      var auth = new Auth();
      if ((0, _metal.isObject)(data)) {
        var properties = {};
        Object.keys(data).forEach(function (key) {
          properties[key] = {
            enumerable: true,
            value: data[key],
            writable: true
          };
        });
        Object.defineProperties(auth, properties);
      }
      auth.setWedeployClient(this.wedeployClient);
      return auth;
    }
  }]);

  return Auth;
}();

exports.default = Auth;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _metalUri = __webpack_require__(6);

var _metalUri2 = _interopRequireDefault(_metalUri);

var _metal = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class responsible for encapsulate provider information.
 */
var AuthProvider = function () {
  /**
  * Constructs an {@link AuthProvider} instance.
  * @constructor
  */
  function AuthProvider() {
    _classCallCheck(this, AuthProvider);

    this.provider = null;
    this.providerScope = null;
    this.redirectUri = null;
    this.scope = null;
  }

  /**
  * Checks if provider is defined and not null.
  * @return {boolean}
  */


  _createClass(AuthProvider, [{
    key: 'hasProvider',
    value: function hasProvider() {
      return _metal.core.isDefAndNotNull(this.provider);
    }

    /**
    * Checks if scope is defined and not null.
    * @return {boolean}
    */

  }, {
    key: 'hasProviderScope',
    value: function hasProviderScope() {
      return _metal.core.isDefAndNotNull(this.providerScope);
    }

    /**
    * Checks if redirect uri is defined and not null.
    * @return {boolean}
    */

  }, {
    key: 'hasRedirectUri',
    value: function hasRedirectUri() {
      return _metal.core.isDefAndNotNull(this.redirectUri);
    }

    /**
    * Checks if scope is defined and not null.
    * @return {boolean}
    */

  }, {
    key: 'hasScope',
    value: function hasScope() {
      return _metal.core.isDefAndNotNull(this.scope);
    }

    /**
    * Makes authorization url. An optional authorization URL might be provided.
    * @param {string} opt_authUrl Optional authorization URL.
    * @return {string} Normalized authorization URL.
    */

  }, {
    key: 'makeAuthorizationUrl',
    value: function makeAuthorizationUrl(opt_authUrl) {
      var uri = new _metalUri2.default(opt_authUrl);

      uri.setPathname('/oauth/authorize');

      if (this.hasProvider()) {
        uri.setParameterValue('provider', this.getProvider());
      }
      if (this.hasProviderScope()) {
        uri.setParameterValue('provider_scope', this.getProviderScope());
      }
      if (this.hasRedirectUri()) {
        uri.setParameterValue('redirect_uri', this.getRedirectUri());
      }
      if (this.hasScope()) {
        uri.setParameterValue('scope', this.getScope());
      }

      return uri.toString();
    }

    /**
    * Gets provider name.
    * @return {string} Provider name.
    */

  }, {
    key: 'getProvider',
    value: function getProvider() {
      return this.provider;
    }

    /**
    * Gets provider scope.
    * @return {string} String with scopes.
    */

  }, {
    key: 'getProviderScope',
    value: function getProviderScope() {
      return this.providerScope;
    }

    /**
    * Gets redirect uri.
    * @return {string}.
    */

  }, {
    key: 'getRedirectUri',
    value: function getRedirectUri() {
      return this.redirectUri;
    }

    /**
    * Gets scope.
    * @return {string} String with scopes.
    */

  }, {
    key: 'getScope',
    value: function getScope() {
      return this.scope;
    }

    /**
    * Sets provider scope.
    * @param {string=} providerScope Scope string. Separate by space for multiple
    *   scopes, e.g. "scope1 scope2".
    */

  }, {
    key: 'setProviderScope',
    value: function setProviderScope(providerScope) {
      assertStringIfDefAndNotNull(providerScope, 'Provider scope must be a string');
      this.providerScope = providerScope;
    }

    /**
    * Sets redirect uri.
    * @param {string} redirectUri The redirect URI to be set to the current
    *   instance.
    */

  }, {
    key: 'setRedirectUri',
    value: function setRedirectUri(redirectUri) {
      assertStringIfDefAndNotNull(redirectUri, 'Redirect uri must be a string');
      this.redirectUri = redirectUri;
    }

    /**
    * Sets scope.
    * @param {string=} scope Scope string. Separate by space for multiple
    *   scopes, e.g. "scope1 scope2".
    */

  }, {
    key: 'setScope',
    value: function setScope(scope) {
      assertStringIfDefAndNotNull(scope, 'Scope must be a string');
      this.scope = scope;
    }
  }]);

  return AuthProvider;
}();

/**
 * Throws an exception if the provided value is defined and not null, but not a
 *   string.
 * @param {!*} value The value to be checked.
 * @param {!string} errorMessage The message to be provided to the exception.
 */


function assertStringIfDefAndNotNull(value, errorMessage) {
  if (_metal.core.isDefAndNotNull(value) && !_metal.core.isString(value)) {
    throw new Error(errorMessage);
  }
}

exports.default = AuthProvider;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* jshint ignore:start */

/**
 * Abstract interface for storing and retrieving data using some persistence
 * mechanism.
 * @constructor
 */

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StorageMechanism = function () {
	function StorageMechanism() {
		_classCallCheck(this, StorageMechanism);
	}

	_createClass(StorageMechanism, [{
		key: 'clear',

		/**
   * Clear all items from the data storage.
   */
		value: function clear() {
			throw Error('Unimplemented abstract method');
		}

		/**
   * Sets an item in the data storage.
   * @param {string} key The key to set.
   * @param {*} value The value to serialize to a string and save.
   */

	}, {
		key: 'set',
		value: function set(key, value) {
			throw Error('Unimplemented abstract method');
		}

		/**
   * Gets an item from the data storage.
   * @param {string} key The key to get.
   * @return {*} Deserialized value or undefined if not found.
   */

	}, {
		key: 'get',
		value: function get(key) {
			throw Error('Unimplemented abstract method');
		}

		/**
   * Checks if this mechanism is supported in the current environment.
   * Subclasses should override this when necessary.
   */

	}, {
		key: 'keys',


		/**
   * Returns the list of keys stored in the Storage object.
   * @param {!Array<string>} keys
   */
		value: function keys() {
			throw Error('Unimplemented abstract method');
		}

		/**
   * Removes an item from the data storage.
   * @param {string} key The key to remove.
   */

	}, {
		key: 'remove',
		value: function remove(key) {
			throw Error('Unimplemented abstract method');
		}

		/**
   * Returns the number of data items stored in the Storage object.
   * @return {number}
   */

	}, {
		key: 'size',
		value: function size() {
			throw Error('Unimplemented abstract method');
		}
	}], [{
		key: 'isSupported',
		value: function isSupported() {
			return true;
		}
	}]);

	return StorageMechanism;
}();

exports.default = StorageMechanism;

/* jshint ignore:end */

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Embodied6 = __webpack_require__(1);

var _Embodied7 = _interopRequireDefault(_Embodied6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class responsible for building different types of geometric
 * shapes.
 */
var Geo = function () {
  function Geo() {
    _classCallCheck(this, Geo);
  }

  _createClass(Geo, null, [{
    key: 'boundingBox',

    /**
    * Creates a new {@link BoundingBox} instance.
    * @param {*} upperLeft The upper left point.
    * @param {*} lowerRight The lower right point.
    * @return {!BoundingBox}
    * @static
    */
    value: function boundingBox(upperLeft, lowerRight) {
      return new Geo.BoundingBox(upperLeft, lowerRight);
    }

    /**
    * Creates a new {@link Circle} instance.
    * @param {*} center The circle's center coordinate.
    * @param {string} radius The circle's radius.
    * @return {!Circle}
    * @static
    */

  }, {
    key: 'circle',
    value: function circle(center, radius) {
      return new Geo.Circle(center, radius);
    }

    /**
    * Creates a new {@link Line} instance.
    * @param {...*} points This line's points.
    * @return {!Line}
    * @static
    */

  }, {
    key: 'line',
    value: function line() {
      for (var _len = arguments.length, points = Array(_len), _key = 0; _key < _len; _key++) {
        points[_key] = arguments[_key];
      }

      return new (Function.prototype.bind.apply(Geo.Line, [null].concat(points)))();
    }

    /**
    * Creates a new {@link Point} instance.
    * @param {number} lat The latitude coordinate
    * @param {number} lon The longitude coordinate
    * @return {!Point}
    * @static
    */

  }, {
    key: 'point',
    value: function point(lat, lon) {
      return new Geo.Point(lat, lon);
    }

    /**
    * Creates a new {@link Polygon} instance.
    * @param {...*} points This polygon's points.
    * @return {!Polygon}
    * @static
    */

  }, {
    key: 'polygon',
    value: function polygon() {
      for (var _len2 = arguments.length, points = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        points[_key2] = arguments[_key2];
      }

      return new (Function.prototype.bind.apply(Geo.Polygon, [null].concat(points)))();
    }
  }]);

  return Geo;
}();

/**
 * Class that represents a point coordinate.
 * @extends {Embodied}
 */


var Point = function (_Embodied) {
  _inherits(Point, _Embodied);

  /**
  * Constructs a {@link Point} instance.
  * @param {number} lat The latitude coordinate
  * @param {number} lon The longitude coordinate
  * @constructor
  */
  function Point(lat, lon) {
    _classCallCheck(this, Point);

    var _this = _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this));

    _this.body_ = [lat, lon];
    return _this;
  }

  return Point;
}(_Embodied7.default);

Geo.Point = Point;

/**
 * Class that represents a line.
 * @extends {Embodied}
 */

var Line = function (_Embodied2) {
  _inherits(Line, _Embodied2);

  /**
  * Constructs a {@link Line} instance.
  * @param {...*} points This line's points.
  * @constructor
  */
  function Line() {
    _classCallCheck(this, Line);

    var _this2 = _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this));

    for (var _len3 = arguments.length, points = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      points[_key3] = arguments[_key3];
    }

    _this2.body_ = {
      type: 'linestring',
      coordinates: points.map(function (point) {
        return _Embodied7.default.toBody(point);
      })
    };
    return _this2;
  }

  return Line;
}(_Embodied7.default);

Geo.Line = Line;

/**
 * Class that represents a bounding box.
 * @extends {Embodied}
 */

var BoundingBox = function (_Embodied3) {
  _inherits(BoundingBox, _Embodied3);

  /**
  * Constructs a {@link BoundingBox} instance.
  * @param {*} upperLeft The upper left point.
  * @param {*} lowerRight The lower right point.
  * @constructor
  */
  function BoundingBox(upperLeft, lowerRight) {
    _classCallCheck(this, BoundingBox);

    var _this3 = _possibleConstructorReturn(this, (BoundingBox.__proto__ || Object.getPrototypeOf(BoundingBox)).call(this));

    _this3.body_ = {
      type: 'envelope',
      coordinates: [_Embodied7.default.toBody(upperLeft), _Embodied7.default.toBody(lowerRight)]
    };
    return _this3;
  }

  /**
  * Gets this bounding box's points.
  * @return {!Array}
  */


  _createClass(BoundingBox, [{
    key: 'getPoints',
    value: function getPoints() {
      return this.body_.coordinates;
    }
  }]);

  return BoundingBox;
}(_Embodied7.default);

Geo.BoundingBox = BoundingBox;

/**
 * Class that represents a circle.
 * @extends {Embodied}
 */

var Circle = function (_Embodied4) {
  _inherits(Circle, _Embodied4);

  /**
  * Constructs a {@link Circle} instance.
  * @param {*} center The circle's center coordinate.
  * @param {string} radius The circle's radius.
  * @constructor
  */
  function Circle(center, radius) {
    _classCallCheck(this, Circle);

    var _this4 = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this));

    _this4.body_ = {
      type: 'circle',
      coordinates: _Embodied7.default.toBody(center),
      radius: radius
    };
    return _this4;
  }

  /**
  * Gets this circle's center coordinate.
  * @return {*}
  */


  _createClass(Circle, [{
    key: 'getCenter',
    value: function getCenter() {
      return this.body_.coordinates;
    }

    /**
    * Gets this circle's radius.
    * @return {string}
    */

  }, {
    key: 'getRadius',
    value: function getRadius() {
      return this.body_.radius;
    }
  }]);

  return Circle;
}(_Embodied7.default);

Geo.Circle = Circle;

/**
 * Class that represents a polygon.
 * @extends {Embodied}
 */

var Polygon = function (_Embodied5) {
  _inherits(Polygon, _Embodied5);

  /**
  * Constructs a {@link Polygon} instance.
  * @param {...*} points This polygon's points.
  * @constructor
  */
  function Polygon() {
    _classCallCheck(this, Polygon);

    var _this5 = _possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).call(this));

    _this5.body_ = {
      type: 'polygon',
      coordinates: []
    };
    _this5.addCoordinates_.apply(_this5, arguments);
    return _this5;
  }

  /**
  * Adds the given points as coordinates for this polygon.
  * @param {...*} points
  * @protected
  */


  _createClass(Polygon, [{
    key: 'addCoordinates_',
    value: function addCoordinates_() {
      for (var _len4 = arguments.length, points = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        points[_key4] = arguments[_key4];
      }

      this.body_.coordinates.push(points.map(function (point) {
        return _Embodied7.default.toBody(point);
      }));
    }

    /**
    * Adds the given points as a hole inside this polygon.
    * @param {...*} points
    * @return {Polygon} Returns the {@link Polygon} object itself, so calls can
    *   be chained.
    * @chainable
    */

  }, {
    key: 'hole',
    value: function hole() {
      this.addCoordinates_.apply(this, arguments);
      return this;
    }
  }]);

  return Polygon;
}(_Embodied7.default);

Geo.Polygon = Polygon;

exports.default = Geo;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _metal = __webpack_require__(0);

var _metalStructs = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents a client message (e.g. a request or a response).
 */
var ClientMessage = function () {
  /**
  * Constructs an {@link ClientMessage} instance.
  * @constructor
  */
  function ClientMessage() {
    _classCallCheck(this, ClientMessage);

    this.headers_ = new _metalStructs.MultiMap();
  }

  /**
  * Fluent getter and setter for request body.
  * @param {*=} opt_body Request body to be set. If none is given,
  *   the current value of the body will be returned.
  * @return {*} Returns request body if no body value was given. Otherwise
  *   returns the {@link ClientMessage} object itself, so calls can be chained.
  * @chainable Chainable when used as setter.
  */


  _createClass(ClientMessage, [{
    key: 'body',
    value: function body(opt_body) {
      if (_metal.core.isDef(opt_body)) {
        this.body_ = opt_body;
        return this;
      }
      return this.body_;
    }

    /**
    * Adds a header. If a header with the same name already exists, it will not
    * be overwritten, but the new value will be stored as well. The order is
    * preserved.
    * @param {string} name
    * @param {string} value
    * @return {!ClientMessage} Returns the {@link ClientMessage}
    *   object itself, so calls can be chained.
    * @chainable
    */

  }, {
    key: 'header',
    value: function header(name, value) {
      if (arguments.length !== 2) {
        throw new Error('Invalid arguments');
      }
      this.headers_.set(name, value);
      return this;
    }

    /**
    * Fluent getter and setter for request headers.
    * @param {MultiMap|Object=} opt_headers Request headers list to
    *   be set. If none is given the current value of the headers will
    *   be returned.
    * @return {!MultiMap|ClientMessage} Returns map of request headers
    *   if no new value was given. Otherwise returns the {@link ClientMessage}
    *   object itself, so calls can be chained.
    * @chainable Chainable when used as setter.
    */

  }, {
    key: 'headers',
    value: function headers(opt_headers) {
      if (_metal.core.isDef(opt_headers)) {
        if (opt_headers instanceof _metalStructs.MultiMap) {
          this.headers_ = opt_headers;
        } else {
          this.headers_.values = opt_headers;
        }
        return opt_headers;
      }
      return this.headers_;
    }

    /**
    * Removes the body.
    */

  }, {
    key: 'removeBody',
    value: function removeBody() {
      this.body_ = undefined;
    }
  }]);

  return ClientMessage;
}();

exports.default = ClientMessage;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This file exists just for backwards compatibility, making sure that old
// default imports for this file still work. It's best to use the named exports
// for each function instead though, since that allows bundlers like Rollup to
// reduce the bundle size by removing unused code.

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.core = undefined;

var _coreNamed = __webpack_require__(50);

Object.keys(_coreNamed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _coreNamed[key];
    }
  });
});

var core = _interopRequireWildcard(_coreNamed);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = core;
exports.core = core;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _globals = __webpack_require__(5);

var _globals2 = _interopRequireDefault(_globals);

var _metal = __webpack_require__(0);

var _Auth = __webpack_require__(10);

var _Auth2 = _interopRequireDefault(_Auth);

var _AuthApiHelper = __webpack_require__(25);

var _AuthApiHelper2 = _interopRequireDefault(_AuthApiHelper);

var _DataApiHelper = __webpack_require__(30);

var _DataApiHelper2 = _interopRequireDefault(_DataApiHelper);

var _EmailApiHelper = __webpack_require__(31);

var _EmailApiHelper2 = _interopRequireDefault(_EmailApiHelper);

var _Base = __webpack_require__(32);

var _Base2 = _interopRequireDefault(_Base);

var _Embodied = __webpack_require__(1);

var _Embodied2 = _interopRequireDefault(_Embodied);

var _Query = __webpack_require__(7);

var _Query2 = _interopRequireDefault(_Query);

var _Filter = __webpack_require__(4);

var _Filter2 = _interopRequireDefault(_Filter);

var _TransportFactory = __webpack_require__(24);

var _TransportFactory2 = _interopRequireDefault(_TransportFactory);

var _ClientRequest = __webpack_require__(21);

var _ClientRequest2 = _interopRequireDefault(_ClientRequest);

var _metalStructs = __webpack_require__(2);

var _metalUri = __webpack_require__(6);

var _metalUri2 = _interopRequireDefault(_metalUri);

var _assertions = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var io = void 0;
var FormDataImpl = void 0;

// Optimistic initialization of `io` reference from global `globals.window.io`.
if (typeof _globals2.default.window !== 'undefined') {
  io = _globals2.default.window.io;
}

// Optimistic initialization of `FormData` reference from global
// `globals.window.FormData`.
if (typeof _globals2.default.window !== 'undefined') {
  FormDataImpl = _globals2.default.window.FormData;
}

/**
 * The main class for making api requests. Sending requests returns a promise
 * that is resolved when the response arrives. Usage example:
 * ```javascript
 * WeDeploy
 *   .url('/data/tasks')
 *   .post({desc: 'Buy milk'})
 *   .then(function(response) {
 *     // Handle response here.
 *     console.log(response.body())
 *   });
 * ```
 */

var WeDeploy = function () {
  /**
  * WeDeploy constructor function.
  * @param {string} url The base url.
  * @param {...string} paths Any amount of paths to be appended to the base
  * url.
  * @constructor
  */
  function WeDeploy(url) {
    for (var _len = arguments.length, paths = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      paths[_key - 1] = arguments[_key];
    }

    _classCallCheck(this, WeDeploy);

    if (arguments.length === 0) {
      throw new Error('Invalid arguments, try `new WeDeploy(baseUrl, url)`');
    }

    this.auth_ = null;
    this.data_ = null;
    this.body_ = null;
    this.url_ = _metalUri2.default.joinPaths.apply(_metalUri2.default, [url || ''].concat(paths));
    this.headers_ = new _metalStructs.MultiMap();
    this.params_ = new _metalStructs.MultiMap();
    this.withCredentials_ = true;

    this.header('Content-Type', 'application/json');
    this.header('X-Requested-With', 'XMLHttpRequest');
  }

  /**
  * Static factory for creating WeDeploy data for the given url.
  * @param {string=} opt_dataUrl The url that points to the data services.
  * @return {data} WeDeploy data instance.
  */


  _createClass(WeDeploy, [{
    key: 'auth',


    /**
    * Adds authorization information to this request.
    * @param {!Auth|string} authOrTokenOrEmail Either an {@link Auth} instance,
    * an authorization token, or the email.
    * @param {string=} opt_password If a email is given as the first param,
    * this should be the password.
    * @return {WeDeploy} Returns the {@link WeDeploy} object itself, so calls can
    *   be chained.
    * @chainable
    */
    value: function auth(authOrTokenOrEmail, opt_password) {
      this.auth_ = _Auth2.default.create(authOrTokenOrEmail, opt_password);
      this.auth_.setWedeployClient(WeDeploy);
      return this;
    }

    /**
    * Static factory for creating WeDeploy auth for the given url.
    * @param {string=} opt_authUrl The url that points to the auth service.
    * @return {!Auth} Returns an {@link Auth} instance.
    */

  }, {
    key: 'body',


    /**
    * Sets the body that will be sent with this request.
    * @param {*} body
    * @return {WeDeploy} Returns the {@link WeDeploy} object itself, so calls can
    *   be chained.
    * @chainable
    */
    value: function body(_body) {
      this.body_ = _body;
      return this;
    }

    /**
    * Converts the given body object to query params.
    * @param {!ClientRequest} clientRequest Client request.
    * @param {*} body
    * @protected
    */

  }, {
    key: 'convertBodyToParams_',
    value: function convertBodyToParams_(clientRequest, body) {
      if (_metal.core.isString(body)) {
        body = {
          body: body
        };
      } else if (body instanceof _Embodied2.default) {
        body = body.body();
      }
      Object.keys(body || {}).forEach(function (name) {
        return clientRequest.param(name, body[name]);
      });
    }

    /**
    * Creates client request and encode.
    * @param {string} method
    * @param {*} body
    * @return {!ClientRequest} Client request.
    * @protected
    */

  }, {
    key: 'createClientRequest_',
    value: function createClientRequest_(method, body) {
      var clientRequest = new _ClientRequest2.default();

      clientRequest.body(body || this.body_);

      if (!_metal.core.isDefAndNotNull(clientRequest.body())) {
        if (this.formData_) {
          clientRequest.body(this.formData_);
        }
      }

      clientRequest.method(method);
      clientRequest.headers(this.headers());
      clientRequest.params(this.params());
      clientRequest.url(this.url());
      clientRequest.withCredentials(this.withCredentials_);

      this.encode(clientRequest);

      return clientRequest;
    }

    /**
    * Decodes clientResponse body, parsing the body for example.
    * @param {!ClientResponse} clientResponse The response object to be
    * decoded.
    * @return {!ClientResponse} The decoded response.
    */

  }, {
    key: 'decode',
    value: function decode(clientResponse) {
      if (WeDeploy.isContentTypeJson(clientResponse)) {
        try {
          clientResponse.body(JSON.parse(clientResponse.body()));
        } catch (err) {}
      }
      return clientResponse;
    }

    /**
    * Sends message with the DELETE http verb.
    * @param {string=} opt_body Content to be sent as the request's body.
    * @return {!CancellablePromise}
    */

  }, {
    key: 'delete',
    value: function _delete(opt_body) {
      return this.sendAsync('DELETE', opt_body);
    }

    /**
    * Encodes the given {@link ClientRequest}, converting its body to an
    * appropriate format for example.
    * @param {!ClientRequest} clientRequest The request object to encode.
    * @return {!ClientRequest} The encoded request.
    */

  }, {
    key: 'encode',
    value: function encode(clientRequest) {
      var body = clientRequest.body();

      if (_metal.core.isElement(body)) {
        body = new FormDataImpl(body);
        clientRequest.body(body);
      }

      body = this.maybeWrapWithQuery_(body);
      if (clientRequest.method() === 'GET') {
        this.convertBodyToParams_(clientRequest, body);
        clientRequest.removeBody();
        body = null;
      }

      if (typeof FormDataImpl !== 'undefined' && body instanceof FormDataImpl) {
        clientRequest.headers().remove('content-type');
      } else if (body instanceof _Embodied2.default) {
        clientRequest.body(body.toString());
      } else if (WeDeploy.isContentTypeJson(clientRequest)) {
        var _body2 = clientRequest.body();
        if (_metal.core.isDefAndNotNull(_body2)) {
          _body2 = JSON.stringify(_body2);
          clientRequest.body(_body2);
        }
      }

      this.encodeParams_(clientRequest);
      this.resolveAuthentication_(clientRequest);

      return clientRequest;
    }

    /**
    * Encodes the params for the given request, according to their types.
    * @param {!ClientRequest} clientRequest
    * @protected
    */

  }, {
    key: 'encodeParams_',
    value: function encodeParams_(clientRequest) {
      var params = clientRequest.params();
      params.names().forEach(function (name) {
        var values = params.getAll(name);
        values.forEach(function (value, index) {
          if (value instanceof _Embodied2.default) {
            value = value.toString();
          } else if (_metal.core.isObject(value) || value instanceof Array) {
            value = JSON.stringify(value);
          }
          values[index] = value;
        });
      });
    }

    /**
    * Adds a key/value pair to be sent via the body in a `multipart/form-data`
    * format.
    * If the body is set by other means (for example, through the `body` method),
    * this will be ignored.
    * @param {string} name
    * @param {*} value
    * @return {WeDeploy} Returns the {@link WeDeploy} object itself, so calls can
    *   be chained.
    * @chainable
    */

  }, {
    key: 'form',
    value: function form(name, value) {
      if (typeof FormDataImpl === 'undefined') {
        throw new Error('form() is only available when FormData API is available.');
      }

      if (!this.formData_) {
        this.formData_ = new FormDataImpl();
      }
      this.formData_.append(name, value);
      return this;
    }

    /**
    * Sends message with the GET http verb.
    * @param {*=} opt_params Params to be added to the request url.
    * @return {!CancellablePromise}
    */

  }, {
    key: 'get',
    value: function get(opt_params) {
      return this.sendAsync('GET', opt_params);
    }

    /**
    * Adds a header. If the header with the same name already exists, it will
    * not be overwritten, but new value will be stored. The order is preserved.
    * @param {string} name Header key.
    * @param {*} value Header value.
    * @return {WeDeploy} Returns the {@link WeDeploy} object itself, so calls can
    *   be chained.
    * @chainable
    */

  }, {
    key: 'header',
    value: function header(name, value) {
      if (arguments.length !== 2) {
        throw new Error('Invalid arguments');
      }
      this.headers_.set(name, value);
      return this;
    }

    /**
    * Gets or sets the headers. If headers are passed to the function as
     * parameter, they will be set as internal headers, overwriting the existing
     * ones. Otherwise, the currently set headers will be returned.
     * @param {MultiMap|Object=} opt_headers Headers to be set
    * @return {WeDeploy|MultiMap} If headers were passed to te function,
     *   the returned result will be the {@link WeDeploy} object itself, so calls
     *   can be chained. If headers were not passed to the function, the returned
     *   result will be the current headers.
     * @chainable Chainable when used as setter.
     */

  }, {
    key: 'headers',
    value: function headers(opt_headers) {
      var _this = this;

      if (_metal.core.isDefAndNotNull(opt_headers)) {
        if (!(opt_headers instanceof _metalStructs.MultiMap)) {
          opt_headers = _metalStructs.MultiMap.fromObject(opt_headers);
        }

        opt_headers.names().forEach(function (name) {
          var values = opt_headers.getAll(name);

          values.forEach(function (value) {
            _this.headers_.set(name, value);
          });
        });

        return this;
      } else {
        return this.headers_;
      }
    }

    /**
    * Check if clientMessage content type is application/json.
    * @param {ClientMessage} clientMessage Client message.
    * @return {boolean}
    */

  }, {
    key: 'maybeWrapWithQuery_',


    /**
    * Wraps the given `Embodied` instance with a {@link Query} instance if
    * needed.
    * @param {Embodied} embodied
    * @return {Embodied}
    * @protected
    */
    value: function maybeWrapWithQuery_(embodied) {
      if (embodied instanceof _Filter2.default) {
        embodied = _Query2.default.filter(embodied);
      }
      return embodied;
    }

    /**
    * Adds a query. If the query with the same name already exists, it will not
    * be overwritten, but new value will be stored. The order is preserved.
    * @param {string} name Param key.
    * @param {*} value Param value.
    * @return {WeDeploy} Returns the {@link WeDeploy} object itself, so calls can
    *   be chained.
    * @chainable
    */

  }, {
    key: 'param',
    value: function param(name, value) {
      if (arguments.length !== 2) {
        throw new Error('Invalid arguments');
      }
      this.params_.set(name, value);
      return this;
    }

    /**
    * Gets the query strings map.
    * @return {!MultiMap}
    */

  }, {
    key: 'params',
    value: function params() {
      return this.params_;
    }

    /**
    * Sends message with the PATCH http verb.
    * @param {string=} opt_body Content to be sent as the request's body.
    * @return {!CancellablePromise}
    */

  }, {
    key: 'patch',
    value: function patch(opt_body) {
      return this.sendAsync('PATCH', opt_body);
    }

    /**
    * Creates a new {@link WeDeploy} instance for handling the url resulting in
    * the union of the current url with the given paths.
    * @param {...string} paths Any number of paths.
    * @return {!WeDeploy} A new {@link WeDeploy} instance for handling the given
    *   paths.
    */

  }, {
    key: 'path',
    value: function path() {
      for (var _len2 = arguments.length, paths = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        paths[_key2] = arguments[_key2];
      }

      var wedeployClient = new (Function.prototype.bind.apply(WeDeploy, [null].concat([this.url()], paths)))();

      if (_metal.core.isDefAndNotNull(this.auth_)) {
        wedeployClient.auth(this.auth_);
      }

      wedeployClient.headers(this.headers_);

      return wedeployClient.use(this.customTransport_);
    }

    /**
    * Sends message with the POST http verb.
    * @param {string=} opt_body Content to be sent as the request's body.
    * @return {!CancellablePromise}
    */

  }, {
    key: 'post',
    value: function post(opt_body) {
      return this.sendAsync('POST', opt_body);
    }

    /**
    * Sends message with the PUT http verb.
    * @param {string=} opt_body Content to be sent as the request's body.
    * @return {!CancellablePromise}
    */

  }, {
    key: 'put',
    value: function put(opt_body) {
      return this.sendAsync('PUT', opt_body);
    }

    /**
    * Adds the authentication information to the request.
    * @param {!ClientRequest} clientRequest
    * @protected
    */

  }, {
    key: 'resolveAuthentication_',
    value: function resolveAuthentication_(clientRequest) {
      if (!this.auth_) {
        return;
      }
      if (this.auth_.hasToken()) {
        clientRequest.header('Authorization', 'Bearer ' + this.auth_.token);
      } else if (this.auth_.hasEmail() && this.auth_.hasPassword()) {
        var credentials = this.auth_.email + ':' + this.auth_.password;
        clientRequest.header('Authorization', 'Basic ' + _Base2.default.encodeString(credentials));
      }
    }

    /**
    * Uses transport to send request with given method name and body
    * asynchronously.
    * @param {string} method The HTTP method to be used when sending data.
    * @param {string} body Content to be sent as the request's body.
    * @return {!CancellablePromise} Deferred request.
    */

  }, {
    key: 'sendAsync',
    value: function sendAsync(method, body) {
      var transport = this.customTransport_ || _TransportFactory2.default.instance().getDefault();

      var clientRequest = this.createClientRequest_(method, body);

      return transport.send(clientRequest).then(this.decode);
    }

    /**
    * Sets the socket transport
    * @param {Object} socket implementation object.
    */

  }, {
    key: 'url',


    /**
    * Returns the URL used by this client.
    * @return {!string}
    */
    value: function url() {
      return this.url_;
    }

    /**
    * Specifies {@link Transport} implementation.
    * @param {!Transport} transport The transport implementation that should be
    * used.
    * @return {WeDeploy} Returns the {@link WeDeploy} object itself, so calls can
    *   be chained.
    */

  }, {
    key: 'use',
    value: function use(transport) {
      this.customTransport_ = transport;
      return this;
    }

    /**
    * Creates new socket.io instance. The parameters passed to socket.io
    * constructor will be provided:
    *
    * ```javascript
    * WeDeploy.url('http://domain:8080/path/a').watch({id: 'myId'}, {foo: true});
    * // Equals:
    * io('domain:8080/?url=path%2Fa%3Fid%3DmyId', {foo: true});
    * ```
    *
    * @param {Object=} opt_params Params to be sent with the Socket IO request.
    * @param {Object=} opt_options Object with Socket IO options.
    * @return {!io} Socket IO reference. Server events can be listened on it.
    */

  }, {
    key: 'watch',
    value: function watch(opt_params, opt_options) {
      if (typeof io === 'undefined') {
        throw new Error('Socket.io client not loaded');
      }

      var clientRequest = this.createClientRequest_('GET', opt_params);
      var uri = new _metalUri2.default(clientRequest.url());
      uri.addParametersFromMultiMap(clientRequest.params());

      var jsonp = typeof navigator === 'undefined' || navigator.product !== 'ReactNative';

      opt_options = opt_options || {
        forceNew: true,
        jsonp: jsonp
      };
      opt_options.query = 'url=' + encodeURIComponent(uri.getPathname() + uri.getSearch());
      opt_options.path = opt_options.path || uri.getPathname();

      return io(uri.getProtocol() + '//' + uri.getHost(), opt_options);
    }

    /**
    * Assigns the passed value to the internal with credentials option.
    * @param {boolean} withCredentials
    * @return {WeDeploy} Returns the {@link WeDeploy} object itself, so calls can
    *   be chained.
    */

  }, {
    key: 'withCredentials',
    value: function withCredentials(_withCredentials) {
      this.withCredentials_ = !!_withCredentials;
      return this;
    }
  }], [{
    key: 'data',
    value: function data(opt_dataUrl) {
      (0, _assertions.assertUriWithNoPath)(opt_dataUrl, 'The data url should not have a path');

      if (_metal.core.isString(opt_dataUrl)) {
        WeDeploy.dataUrl_ = opt_dataUrl;
      }
      if (!WeDeploy.data_) {
        WeDeploy.data_ = new _DataApiHelper2.default(WeDeploy);
      }
      WeDeploy.data_.auth(WeDeploy.auth().currentUser);
      return WeDeploy.data_;
    }

    /**
    * Static factory for creating WeDeploy email for the given url.
    * @param {string=} opt_emailUrl The url that points to the email services.
    * @return {data} WeDeploy email instance.
    */

  }, {
    key: 'email',
    value: function email(opt_emailUrl) {
      (0, _assertions.assertUriWithNoPath)(opt_emailUrl, 'The email url should not have a path');

      if (_metal.core.isString(opt_emailUrl)) {
        WeDeploy.emailUrl_ = opt_emailUrl;
      }
      if (!WeDeploy.email_) {
        WeDeploy.email_ = new _EmailApiHelper2.default(WeDeploy);
      }
      WeDeploy.email_.auth(WeDeploy.auth().currentUser);
      return WeDeploy.email_;
    }
  }, {
    key: 'auth',
    value: function auth(opt_authUrl) {
      if (_metal.core.isString(opt_authUrl)) {
        WeDeploy.authUrl_ = opt_authUrl;
      }
      if (!WeDeploy.auth_) {
        WeDeploy.auth_ = new _AuthApiHelper2.default(WeDeploy);
      }
      return WeDeploy.auth_;
    }
  }, {
    key: 'isContentTypeJson',
    value: function isContentTypeJson(clientMessage) {
      var contentType = clientMessage.headers().get('content-type') || '';
      return contentType.indexOf('application/json') === 0;
    }
  }, {
    key: 'socket',
    value: function socket(_socket) {
      io = _socket;
    }

    /**
    * Sets the FormData
    * @param {Object} formData implementation object.
    */

  }, {
    key: 'formData',
    value: function formData(_formData) {
      FormDataImpl = _formData;
    }

    /**
    * Static factory for creating WeDeploy client for the given url.
    * @param {string} url The url that the client should use for sending
    *   requests.
    * @return {WeDeploy} Returns the {@link WeDeploy} object itself, so calls can
    *   be chained.
    */

  }, {
    key: 'url',
    value: function url(_url) {
      return new WeDeploy(_url).use(this.customTransport_);
    }
  }]);

  return WeDeploy;
}();

WeDeploy.auth_ = null;
WeDeploy.data_ = null;
WeDeploy.email_ = null;
WeDeploy.authUrl_ = '';
WeDeploy.dataUrl_ = '';
WeDeploy.emailUrl_ = '';

exports.default = WeDeploy;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
		value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Embodied = __webpack_require__(1);

var _Embodied2 = _interopRequireDefault(_Embodied);

var _Range = __webpack_require__(8);

var _Range2 = _interopRequireDefault(_Range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class that represents a search aggregation.
 */
var Aggregation = function () {
		/**
  * Constructs an {@link Aggregation} instance.
  * @param {string} field The aggregation field.
  * @param {string} operator The aggregation operator.
  * @param {*=} opt_value The aggregation value.
  * @constructor
  */
		function Aggregation(field, operator, opt_value) {
				_classCallCheck(this, Aggregation);

				this.field_ = field;
				this.operator_ = operator;
				this.value_ = opt_value;
		}

		/**
  * Creates an {@link Aggregation} instance with the "avg" operator.
  * @param {string} field The aggregation field.
  * @return {!Aggregation}
  * @static
  */


		_createClass(Aggregation, [{
				key: 'getField',


				/**
    * Gets this aggregation's field.
    * @return {string}
    */
				value: function getField() {
						return this.field_;
				}

				/**
    * Gets this aggregation's operator.
    * @return {string}
    */

		}, {
				key: 'getOperator',
				value: function getOperator() {
						return this.operator_;
				}

				/**
    * Gets this aggregation's value.
    * @return {*}
    */

		}, {
				key: 'getValue',
				value: function getValue() {
						return this.value_;
				}

				/**
    * Creates an {@link Aggregation} instance with the "histogram" operator.
    * @param {string} field The aggregation field.
    * @param {number} interval The histogram's interval.
    * @return {!Aggregation}
    * @static
    */

		}], [{
				key: 'avg',
				value: function avg(field) {
						return Aggregation.field(field, 'avg');
				}

				/**
    * Creates an {@link Aggregation} instance with the "count" operator.
    * @param {string} field The aggregation field.
    * @return {!Aggregation}
    * @static
    */

		}, {
				key: 'count',
				value: function count(field) {
						return Aggregation.field(field, 'count');
				}

				/**
    * Creates an {@link DistanceAggregation} instance with the "geoDistance"
    * operator.
    * @param {string} field The aggregation field.
    * @param {*} location The aggregation location.
    * @param {...!Range} ranges The aggregation ranges.
    * @return {!DistanceAggregation}
    * @static
    */

		}, {
				key: 'distance',
				value: function distance(field, location) {
						for (var _len = arguments.length, ranges = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
								ranges[_key - 2] = arguments[_key];
						}

						return new (Function.prototype.bind.apply(Aggregation.DistanceAggregation, [null].concat([field, location], ranges)))();
				}

				/**
    * Creates an {@link Aggregation} instance with the "extendedStats" operator.
    * @param {string} field The aggregation field.
    * @return {!Aggregation}
    * @static
    */

		}, {
				key: 'extendedStats',
				value: function extendedStats(field) {
						return Aggregation.field(field, 'extendedStats');
				}
		}, {
				key: 'histogram',
				value: function histogram(field, interval) {
						return new Aggregation(field, 'histogram', interval);
				}

				/**
    * Creates an {@link Aggregation} instance with the "max" operator.
    * @param {string} field The aggregation field.
    * @return {!Aggregation}
    * @static
    */

		}, {
				key: 'max',
				value: function max(field) {
						return Aggregation.field(field, 'max');
				}

				/**
    * Creates an {@link Aggregation} instance with the "min" operator.
    * @param {string} field The aggregation field.
    * @return {!Aggregation}
    * @static
    */

		}, {
				key: 'min',
				value: function min(field) {
						return Aggregation.field(field, 'min');
				}

				/**
    * Creates an {@link Aggregation} instance with the "missing" operator.
    * @param {string} field The aggregation field.
    * @return {!Aggregation}
    * @static
    */

		}, {
				key: 'missing',
				value: function missing(field) {
						return Aggregation.field(field, 'missing');
				}

				/**
    * Creates a new {@link Aggregation} instance.
    * @param {string} field The aggregation field.
    * @param {string} operator The aggregation operator.
    * @return {!Aggregation}
    * @static
    */

		}, {
				key: 'field',
				value: function field(_field, operator) {
						return new Aggregation(_field, operator);
				}

				/**
    * Creates an {@link RangeAggregation} instance with the "range" operator.
    * @param {string} field The aggregation field.
    * @param {...!Range} ranges The aggregation ranges.
    * @return {!RangeAggregation}
    * @static
    */

		}, {
				key: 'range',
				value: function range(field) {
						for (var _len2 = arguments.length, ranges = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
								ranges[_key2 - 1] = arguments[_key2];
						}

						return new (Function.prototype.bind.apply(Aggregation.RangeAggregation, [null].concat([field], ranges)))();
				}

				/**
    * Creates an {@link Aggregation} instance with the "stats" operator.
    * @param {string} field The aggregation field.
    * @return {!Aggregation}
    * @static
    */

		}, {
				key: 'stats',
				value: function stats(field) {
						return Aggregation.field(field, 'stats');
				}

				/**
    * Creates an {@link Aggregation} instance with the "sum" operator.
    * @param {string} field The aggregation field.
    * @return {!Aggregation}
    * @static
    */

		}, {
				key: 'sum',
				value: function sum(field) {
						return Aggregation.field(field, 'sum');
				}

				/**
    * Creates an {@link Aggregation} instance with the "terms" operator.
    * @param {string} field The aggregation field.
    * @return {!Aggregation}
    * @static
    */

		}, {
				key: 'terms',
				value: function terms(field) {
						return Aggregation.field(field, 'terms');
				}
		}]);

		return Aggregation;
}();

/**
 * Class that represents a distance aggregation.
 * @extends {Aggregation}
 */


var DistanceAggregation = function (_Aggregation) {
		_inherits(DistanceAggregation, _Aggregation);

		/**
  * Constructs an {@link DistanceAggregation} instance.
  * @param {string} field The aggregation field.
  * @param {*} location The aggregation location.
  * @param {...!Range} ranges The aggregation ranges.
  * @constructor
  */
		function DistanceAggregation(field, location) {
				_classCallCheck(this, DistanceAggregation);

				var _this = _possibleConstructorReturn(this, (DistanceAggregation.__proto__ || Object.getPrototypeOf(DistanceAggregation)).call(this, field, 'geoDistance', {}));

				_this.value_.location = _Embodied2.default.toBody(location);

				for (var _len3 = arguments.length, ranges = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
						ranges[_key3 - 2] = arguments[_key3];
				}

				_this.value_.ranges = ranges.map(function (range) {
						return range.body();
				});
				return _this;
		}

		/**
  * Adds a range to this aggregation.
  * @param {*} rangeOrFrom
  * @param {*=} opt_to
  * @return {Aggregation} Returns the {@link Aggregation} object itself, so
  *   calls can be chained.
  * @chainable
  */


		_createClass(DistanceAggregation, [{
				key: 'range',
				value: function range(rangeOrFrom, opt_to) {
						var range = rangeOrFrom;
						if (!(range instanceof _Range2.default)) {
								range = _Range2.default.range(rangeOrFrom, opt_to);
						}
						this.value_.ranges.push(range.body());
						return this;
				}

				/**
    * Sets this aggregation's unit.
    * @param {string} unit
    * @return {Aggregation} Returns the {@link Aggregation} object itself, so
    *   calls can be chained.
    * @chainable
    */

		}, {
				key: 'unit',
				value: function unit(_unit) {
						this.value_.unit = _unit;
						return this;
				}
		}]);

		return DistanceAggregation;
}(Aggregation);

Aggregation.DistanceAggregation = DistanceAggregation;

/**
 * Class that represents a range aggregation.
 * @extends {Aggregation}
 */

var RangeAggregation = function (_Aggregation2) {
		_inherits(RangeAggregation, _Aggregation2);

		/**
  * Constructs an {@link RangeAggregation} instance.
  * @param {string} field The aggregation field.
  * @param {...!Range} ranges The aggregation ranges.
  * @constructor
  */
		function RangeAggregation(field) {
				_classCallCheck(this, RangeAggregation);

				var _this2 = _possibleConstructorReturn(this, (RangeAggregation.__proto__ || Object.getPrototypeOf(RangeAggregation)).call(this, field, 'range'));

				for (var _len4 = arguments.length, ranges = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
						ranges[_key4 - 1] = arguments[_key4];
				}

				_this2.value_ = ranges.map(function (range) {
						return range.body();
				});
				return _this2;
		}

		/**
  * Adds a range to this aggregation.
  * @param {*} rangeOrFrom
  * @param {*=} opt_to
  * @return {Aggregation} Returns the {@link Aggregation} object itself, so
  *   calls can be chained.
  * @chainable
  */


		_createClass(RangeAggregation, [{
				key: 'range',
				value: function range(rangeOrFrom, opt_to) {
						var range = rangeOrFrom;
						if (!(range instanceof _Range2.default)) {
								range = _Range2.default.range(rangeOrFrom, opt_to);
						}
						this.value_.push(range.body());
						return this;
				}
		}]);

		return RangeAggregation;
}(Aggregation);

Aggregation.RangeAggregation = RangeAggregation;

exports.default = Aggregation;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _metal = __webpack_require__(0);

var _Embodied = __webpack_require__(1);

var _Embodied2 = _interopRequireDefault(_Embodied);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class responsible for storing and handling the body contents
 * of a Filter instance.
 */
var FilterBody = function () {
  /**
  * Constructs a {@link FilterBody} instance.
  * @param {string} field The name of the field to filter by.
  * @param {*} operatorOrValue If a third param is given, this should
  *   be the filter's operator (like ">="). Otherwise, this will be
  *   used as the filter's value, and the filter's operator will be "=".
  * @param {*=} opt_value The filter's value.
  * @constructor
  */
  function FilterBody(field, operatorOrValue, opt_value) {
    _classCallCheck(this, FilterBody);

    var obj = {
      operator: _metal.core.isDef(opt_value) ? operatorOrValue : '='
    };

    var value = _metal.core.isDef(opt_value) ? opt_value : operatorOrValue;

    if (_metal.core.isDefAndNotNull(value)) {
      if (value instanceof _Embodied2.default) {
        value = value.body();
      }
      obj.value = value;
    }

    if (_metal.core.isDefAndNotNull(field)) {
      this.createBody_(field, obj);
    } else {
      this.createBody_('and', []);
    }
  }

  /**
  * Composes the current filter with the given operator.
  * @param {string} operator
  * @param {Filter=} opt_filter Another filter to compose this filter with,
  *   if the operator is not unary.
  */


  _createClass(FilterBody, [{
    key: 'add',
    value: function add(operator, opt_filter) {
      if (opt_filter) {
        this.addArrayOperator_(operator, opt_filter);
      } else {
        this.createBody_(operator, this.body_);
      }
    }

    /**
    * Composes the current filter with an operator that stores its values in an
    * array.
    * @param {string} operator
    * @param {!Filter} filter
    * @protected
    */

  }, {
    key: 'addArrayOperator_',
    value: function addArrayOperator_(operator, filter) {
      if (!(this.body_[operator] instanceof Array)) {
        this.createBody_(operator, [this.body_]);
      }
      this.body_[operator].push(filter.body());
    }

    /**
    * Adds filters to be composed with this filter body using the given operator.
    * @param {string} operator
    * @param {...*} filters A variable amount of filters to be composed.
    */

  }, {
    key: 'addMany',
    value: function addMany(operator) {
      for (var _len = arguments.length, filters = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        filters[_key - 1] = arguments[_key];
      }

      for (var i = 0; i < filters.length; i++) {
        this.add(operator, filters[i]);
      }
    }

    /**
    * Creates a new body object, setting the requested key to the given value.
    * @param {string} key The key to set in the new body object
    * @param {*} value The value the requested key should have in the new body
    *   object.
    * @protected
    */

  }, {
    key: 'createBody_',
    value: function createBody_(key, value) {
      this.body_ = {};
      this.body_[key] = value;
    }

    /**
    * Gets the json object that represents this filter's body.
    * @return {!Object}
    */

  }, {
    key: 'getObject',
    value: function getObject() {
      return this.body_;
    }
  }]);

  return FilterBody;
}();

exports.default = FilterBody;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _metal = __webpack_require__(0);

var _ClientMessage2 = __webpack_require__(16);

var _ClientMessage3 = _interopRequireDefault(_ClientMessage2);

var _metalStructs = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents a client request object.
 * @extends {ClientMessage}
 */
var ClientRequest = function (_ClientMessage) {
  _inherits(ClientRequest, _ClientMessage);

  /**
  * Constructs an {@link ClientRequest} instance.
  * @constructor
  */
  function ClientRequest() {
    _classCallCheck(this, ClientRequest);

    var _this = _possibleConstructorReturn(this, (ClientRequest.__proto__ || Object.getPrototypeOf(ClientRequest)).call(this));

    _this.params_ = new _metalStructs.MultiMap();
    _this.withCredentials_ = true;
    return _this;
  }

  /**
  * Fluent getter and setter for with credentials option.
  * @param {boolean=} opt_withCredentials
  * @return {!ClientRequest|boolean} Returns the {@link ClientMessage} object
  *   itself when used as setter, otherwise returns the current value of with
  *   credentials option.
  * @chainable Chainable when used as setter.
  */


  _createClass(ClientRequest, [{
    key: 'withCredentials',
    value: function withCredentials(opt_withCredentials) {
      if (_metal.core.isDef(opt_withCredentials)) {
        this.withCredentials_ = !!opt_withCredentials;
        return this;
      }
      return this.withCredentials_;
    }

    /**
    * Fluent getter and setter for request method.
    * @param {string=} opt_method Request method to be set. If none is given,
    *   the current method value will be returned.
    * @return {!ClientMessage|string} Returns request method if no new value was
    *   given. Otherwise returns the {@link ClientMessage} object itself, so
    *   calls can be chained.
    * @chainable Chainable when used as setter.
    */

  }, {
    key: 'method',
    value: function method(opt_method) {
      if (_metal.core.isDef(opt_method)) {
        this.method_ = opt_method;
        return this;
      }
      return this.method_ || ClientRequest.DEFAULT_METHOD;
    }

    /**
    * Adds a query. If a query with the same name already exists, it will not
    * be overwritten, but new value will be stored as well. The order is
    * preserved.
    * @param {string} name
    * @param {string} value
    * @return {!ClientMessage} Returns the {@link ClientMessage} object itself,
    *   so calls can be chained.
    * @chainable
    */

  }, {
    key: 'param',
    value: function param(name, value) {
      if (arguments.length !== 2) {
        throw new Error('Invalid arguments');
      }
      this.params_.set(name, value);
      return this;
    }

    /**
    * Fluent getter and setter for request querystring.
    * @param {MultiMap|Object=} opt_params Request querystring map to be set.
    *   If none is given the current value of the params will be returned.
    * @return {!MultiMap|ClientMessage} Returns map of request querystring if
    *   no new value was given. Otherwise returns the {@link ClientMessage}
    *   object itself, so calls can be chained.
    */

  }, {
    key: 'params',
    value: function params(opt_params) {
      if (_metal.core.isDef(opt_params)) {
        if (opt_params instanceof _metalStructs.MultiMap) {
          this.params_ = opt_params;
        } else {
          this.params_.values = opt_params;
        }
        return opt_params;
      }
      return this.params_;
    }

    /**
    * Fluent getter and setter for request url.
    * @param {string=} opt_url Request url to be set. If none is given,
    *   the current value of the url will be returned.
    * @return {!ClientMessage|string} Returns request url if no new value was
    *  given.
    *  Otherwise returns the {@link ClientMessage} object itself, so calls can be
    *  chained.
    * @chainable Chainable when used as setter.
    */

  }, {
    key: 'url',
    value: function url(opt_url) {
      if (_metal.core.isDef(opt_url)) {
        this.url_ = opt_url;
        return this;
      }
      return this.url_;
    }
  }]);

  return ClientRequest;
}(_ClientMessage3.default);

ClientRequest.DEFAULT_METHOD = 'GET';

exports.default = ClientRequest;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _metal = __webpack_require__(0);

var _ClientMessage2 = __webpack_require__(16);

var _ClientMessage3 = _interopRequireDefault(_ClientMessage2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents a client response object.
 * @extends {ClientMessage}
 */
var ClientResponse = function (_ClientMessage) {
  _inherits(ClientResponse, _ClientMessage);

  /**
  * Constructs an {@link ClientResponse} instance.
  * @param {!ClientRequest} clientRequest Instance of {@link ClientRequest}
  *   object.
  * @constructor
  */
  function ClientResponse(clientRequest) {
    _classCallCheck(this, ClientResponse);

    var _this = _possibleConstructorReturn(this, (ClientResponse.__proto__ || Object.getPrototypeOf(ClientResponse)).call(this));

    if (!clientRequest) {
      throw new Error('Can\'t create response without request');
    }
    _this.clientRequest_ = clientRequest;
    return _this;
  }

  /**
  * Returns request that created this response.
  * @return {!ClientRequest}
  */


  _createClass(ClientResponse, [{
    key: 'request',
    value: function request() {
      return this.clientRequest_;
    }

    /**
    * Fluent getter and setter for response status code.
    * @param {number=} opt_statusCode Request status code to be set. If none is
    *  given, the current status code value will be returned.
    * @return {!ClientMessage|number} Returns response status code if no new
    *   value was given. Otherwise returns the {@link ClientMessage} object
    *   itself, so calls can be chained.
    * @chainable Chainable when used as setter.
    */

  }, {
    key: 'statusCode',
    value: function statusCode(opt_statusCode) {
      if (_metal.core.isDef(opt_statusCode)) {
        this.statusCode_ = opt_statusCode;
        return this;
      }
      return this.statusCode_;
    }

    /**
    * Fluent getter and setter for response status text.
    * @param {string=} opt_statusText Request status text to be set. If none is
    *   given, the current status text value will be returned.
    * @return {!ClientMessage|number} Returns response status text if no new
    *   value was given. Otherwise returns the {@link ClientMessage} object
    *   itself, so calls can be chained.
    * @chainable Chainable when used as setter.
    */

  }, {
    key: 'statusText',
    value: function statusText(opt_statusText) {
      if (_metal.core.isDef(opt_statusText)) {
        this.statusText_ = opt_statusText;
        return this;
      }
      return this.statusText_;
    }

    /**
    * Checks if response succeeded. Any status code 2xx or 3xx is considered
    * valid.
    * @return {boolean}
    */

  }, {
    key: 'succeeded',
    value: function succeeded() {
      return this.statusCode() >= 200 && this.statusCode() <= 399;
    }
  }]);

  return ClientResponse;
}(_ClientMessage3.default);

exports.default = ClientResponse;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Provides a convenient interface for data transport.
 * @interface
 */

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transport = function Transport() {
	_classCallCheck(this, Transport);
};

exports.default = Transport;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AjaxTransport = __webpack_require__(29);

var _AjaxTransport2 = _interopRequireDefault(_AjaxTransport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides a factory for data transport.
 */
var TransportFactory = function () {
  /**
  * Constructs an {@link TransportFactory} instance.
  * @constructor
  */
  function TransportFactory() {
    _classCallCheck(this, TransportFactory);

    this.transports = {};
    this.transports[TransportFactory.DEFAULT_TRANSPORT_NAME] = TransportFactory[TransportFactory.DEFAULT_TRANSPORT_NAME];
  }

  /**
  * Returns {@link TransportFactory} instance.
  * @return {!TransportFactory} Instance of TransportFactory
  */


  _createClass(TransportFactory, [{
    key: 'get',


    /**
    * Gets an instance of the transport implementation with the given name.
    * @param {string} implementationName
    * @return {!Transport}
    */
    value: function get(implementationName) {
      var TransportClass = this.transports[implementationName];

      if (!TransportClass) {
        throw new Error('Invalid transport name: ' + implementationName);
      }

      try {
        return new TransportClass();
      } catch (err) {
        throw new Error('Can\'t create transport', err);
      }
    }

    /**
    * Returns the default transport implementation.
    * @return {!Transport}
    */

  }, {
    key: 'getDefault',
    value: function getDefault() {
      return this.get(TransportFactory.DEFAULT_TRANSPORT_NAME);
    }
  }], [{
    key: 'instance',
    value: function instance() {
      if (!TransportFactory.instance_) {
        TransportFactory.instance_ = new TransportFactory();
      }
      return TransportFactory.instance_;
    }
  }]);

  return TransportFactory;
}();

TransportFactory.DEFAULT_TRANSPORT_NAME = 'default';

TransportFactory[TransportFactory.DEFAULT_TRANSPORT_NAME] = _AjaxTransport2.default;

exports.default = TransportFactory;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Auth = __webpack_require__(10);

var _Auth2 = _interopRequireDefault(_Auth);

var _ApiHelper2 = __webpack_require__(9);

var _ApiHelper3 = _interopRequireDefault(_ApiHelper2);

var _FacebookAuthProvider = __webpack_require__(26);

var _FacebookAuthProvider2 = _interopRequireDefault(_FacebookAuthProvider);

var _GithubAuthProvider = __webpack_require__(27);

var _GithubAuthProvider2 = _interopRequireDefault(_GithubAuthProvider);

var _globals = __webpack_require__(5);

var _globals2 = _interopRequireDefault(_globals);

var _GoogleAuthProvider = __webpack_require__(28);

var _GoogleAuthProvider2 = _interopRequireDefault(_GoogleAuthProvider);

var _metalStorage = __webpack_require__(41);

var _assertions = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class responsible for encapsulating auth API calls.
 */
var AuthApiHelper = function (_ApiHelper) {
  _inherits(AuthApiHelper, _ApiHelper);

  /**
  * Constructs an {@link AuthApiHelper} instance.
  * @param {!string} wedeployClient
  * @constructor
  */
  function AuthApiHelper(wedeployClient) {
    _classCallCheck(this, AuthApiHelper);

    var _this = _possibleConstructorReturn(this, (AuthApiHelper.__proto__ || Object.getPrototypeOf(AuthApiHelper)).call(this, wedeployClient));

    _this.currentUser = null;
    _this.onSignInCallback = null;
    _this.onSignOutCallback = null;

    if (_metalStorage.LocalStorageMechanism.isSupported()) {
      _this.storage = new _metalStorage.Storage(new _metalStorage.LocalStorageMechanism());
    }

    _this.processSignIn_();

    _this.provider = {
      Facebook: _FacebookAuthProvider2.default,
      Google: _GoogleAuthProvider2.default,
      Github: _GithubAuthProvider2.default
    };
    return _this;
  }

  /**
  * Creates access token cookie.
  * @param {string} accessToken
  */


  _createClass(AuthApiHelper, [{
    key: 'createAccessTokenCookie',
    value: function createAccessTokenCookie(accessToken) {
      if (_globals2.default.document && _globals2.default.window) {
        _globals2.default.document.cookie = 'access_token=' + accessToken + '; Domain=' + _globals2.default.window.location.hostname + ';';
      }
    }

    /**
     * @param {Object} data
     * @return {Auth}
     */

  }, {
    key: 'createAuthFromData',
    value: function createAuthFromData(data) {
      var auth = _Auth2.default.createFromData(data);
      auth.setWedeployClient(this.wedeployClient);
      return auth;
    }

    /**
    * Creates user.
    * @param {!Object} data The data to be used to create the user.
    * @return {CancellablePromise}
    */

  }, {
    key: 'createUser',
    value: function createUser(data) {
      var _this2 = this;

      (0, _assertions.assertObject)(data, 'User data must be specified as object');

      var request = this.buildUrl_().path('/users');

      var authScope = this.resolveAuthScope();
      if (authScope) {
        request.auth(authScope.token);
      }

      return request.post(data).then(function (response) {
        return (0, _assertions.assertResponseSucceeded)(response);
      }).then(function (response) {
        return _this2.createAuthFromData(response.body());
      });
    }

    /**
    * Deletes access token cookie.
    */

  }, {
    key: 'deleteAccessTokenCookie',
    value: function deleteAccessTokenCookie() {
      if (_globals2.default.document && _globals2.default.window) {
        _globals2.default.document.cookie = 'access_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;Domain=' + _globals2.default.window.location.hostname + ';';
      }
    }

    /**
    * Gets the current browser url without the fragment part.
    * @return {!string}
    * @protected
    */

  }, {
    key: 'getHrefWithoutFragment_',
    value: function getHrefWithoutFragment_() {
      var location = _globals2.default.window.location;
      return location.protocol + '//' + location.host + location.pathname + (location.search ? location.search : '');
    }

    /**
    * Gets the access token from the url fragment and removes it.
    * @return {?string}
    * @protected
    */

  }, {
    key: 'getRedirectAccessToken_',
    value: function getRedirectAccessToken_() {
      if (_globals2.default.window && _globals2.default.window.location) {
        var fragment = _globals2.default.window.location.hash;
        if (fragment.indexOf('#access_token=') === 0) {
          return fragment.substring(14);
        }
      }
      return null;
    }

    /**
    * Gets user by id.
    * @param {!string} userId
    * @return {CancellablePromise}
    */

  }, {
    key: 'getUser',
    value: function getUser(userId) {
      var _this3 = this;

      (0, _assertions.assertDefAndNotNull)(userId, 'User userId must be specified');
      (0, _assertions.assertUserSignedIn)(this.currentUser);
      return this.buildUrl_().path('/users', userId).auth(this.resolveAuthScope().token).get().then(function (response) {
        return (0, _assertions.assertResponseSucceeded)(response);
      }).then(function (response) {
        return _this3.createAuthFromData(response.body());
      });
    }

    /**
    * Loads current user. Requires a user token as argument.
    * @param {!string} token
    * @return {CancellablePromise}
    */

  }, {
    key: 'loadCurrentUser',
    value: function loadCurrentUser(token) {
      var _this4 = this;

      return this.verifyUser(token).then(function (currentUser) {
        _this4.currentUser = currentUser;
        if (_this4.storage) {
          _this4.storage.set('currentUser', currentUser);
        }
        if (_this4.currentUser.hasToken()) {
          _this4.createAccessTokenCookie(_this4.currentUser.getToken());
        }
        return _this4.currentUser;
      });
    }

    /**
    * Calls the on sign in callback if set.
    * @protected
    */

  }, {
    key: 'maybeCallOnSignInCallback_',
    value: function maybeCallOnSignInCallback_() {
      if (this.onSignInCallback) {
        this.onSignInCallback.call(this, this.currentUser);
      }
    }

    /**
    * Calls the on sign out callback if set.
    * @protected
    */

  }, {
    key: 'maybeCallOnSignOutCallback_',
    value: function maybeCallOnSignOutCallback_() {
      if (this.onSignOutCallback) {
        this.onSignOutCallback.call(this, this.currentUser);
      }
    }

    /**
    * Fires passed callback when a user sign-in. Note that it keeps only the
    * last callback passed.
    * @param {!Function} callback
    */

  }, {
    key: 'onSignIn',
    value: function onSignIn(callback) {
      (0, _assertions.assertFunction)(callback, 'Sign-in callback must be a function');
      this.onSignInCallback = callback;
    }

    /**
    * Fires passed callback when a user sign-out. Note that it keeps only the
    * last callback passed.
    * @param {!Function} callback
    */

  }, {
    key: 'onSignOut',
    value: function onSignOut(callback) {
      (0, _assertions.assertFunction)(callback, 'Sign-out callback must be a function');
      this.onSignOutCallback = callback;
    }

    /**
    * Processes sign-in by detecting a presence of a fragment
    * <code>#access_token=</code> in the url or, alternatively, by local
    * storage current user.
    */

  }, {
    key: 'processSignIn_',
    value: function processSignIn_() {
      var _this5 = this;

      var redirectAccessToken = this.getRedirectAccessToken_();
      if (redirectAccessToken) {
        this.removeUrlFragmentCompletely_();
        this.loadCurrentUser(redirectAccessToken).then(function () {
          return _this5.maybeCallOnSignInCallback_();
        });
        return;
      }
      var currentUser = this.storage && this.storage.get('currentUser');
      if (currentUser) {
        this.currentUser = this.createAuthFromData(currentUser);
      }
    }

    /**
    * Removes fragment from url by performing a push state to the current path.
    * @protected
    */

  }, {
    key: 'removeUrlFragmentCompletely_',
    value: function removeUrlFragmentCompletely_() {
      _globals2.default.window.history.pushState({}, '', window.location.pathname + window.location.search);
    }

    /**
    * Resolves auth scope from last login or api helper.
    * @return {Auth}
    */

  }, {
    key: 'resolveAuthScope',
    value: function resolveAuthScope() {
      if (this.helperAuthScope) {
        return this.helperAuthScope;
      }
      return this.currentUser;
    }

    /**
    * Sends password reset email to the specified email if found in database.
    * For security reasons call do not fail if email not found.
    * @param {!string} email
    * @return {CancellablePromise}
    */

  }, {
    key: 'sendPasswordResetEmail',
    value: function sendPasswordResetEmail(email) {
      (0, _assertions.assertDefAndNotNull)(email, 'Send password reset email must be specified');
      return this.buildUrl_().path('/user/recover').param('email', email).post().then(function (response) {
        return (0, _assertions.assertResponseSucceeded)(response);
      });
    }

    /**
    * Signs in using email and password.
    * @param {!string} email
    * @param {!string} password
    * @return {CancellablePromise}
    */

  }, {
    key: 'signInWithEmailAndPassword',
    value: function signInWithEmailAndPassword(email, password) {
      var _this6 = this;

      (0, _assertions.assertDefAndNotNull)(email, 'Sign-in email must be specified');
      (0, _assertions.assertDefAndNotNull)(password, 'Sign-in password must be specified');

      return this.buildUrl_().path('/oauth/token').param('grant_type', 'password').param('username', email).param('password', password).get().then(function (response) {
        return (0, _assertions.assertResponseSucceeded)(response);
      }).then(function (response) {
        return _this6.loadCurrentUser(response.body().access_token);
      }).then(function (user) {
        _this6.maybeCallOnSignInCallback_();
        return user;
      });
    }

    /**
    * Signs in with redirect. Some providers and environment may not support
    * this flow.
    * @param {AuthProvider} provider
    */

  }, {
    key: 'signInWithRedirect',
    value: function signInWithRedirect(provider) {
      (0, _assertions.assertBrowserEnvironment)();
      (0, _assertions.assertDefAndNotNull)(provider, 'Sign-in provider must be defined');
      assertSupportedProvider(provider);

      if (!provider.hasRedirectUri()) {
        provider.setRedirectUri(this.getHrefWithoutFragment_());
      }
      _globals2.default.window.location.href = provider.makeAuthorizationUrl(this.wedeployClient.authUrl_);
    }

    /**
    * Signs out <code>currentUser</code> and removes from
    *   <code>localStorage</code>.
    * @return {CancellablePromise}
    */

  }, {
    key: 'signOut',
    value: function signOut() {
      var _this7 = this;

      (0, _assertions.assertUserSignedIn)(this.currentUser);
      return this.buildUrl_().path('/oauth/revoke').param('token', this.currentUser.token).get().then(function (response) {
        return (0, _assertions.assertResponseSucceeded)(response);
      }).then(function (response) {
        _this7.maybeCallOnSignOutCallback_();
        _this7.unloadCurrentUser_();
        return response;
      });
    }

    /**
     * Builds URL by joining the headers.
     * @return {WeDeploy} Returns the {@link WeDeploy} object itself, so calls can
     *   be chained.
     * @chainable
     */

  }, {
    key: 'buildUrl_',
    value: function buildUrl_() {
      return this.wedeployClient.url(this.wedeployClient.authUrl_).headers(this.headers_);
    }

    /**
    * Unloads all information for <code>currentUser</code> and removes from
    * <code>localStorage</code> if present.
    */

  }, {
    key: 'unloadCurrentUser_',
    value: function unloadCurrentUser_() {
      this.currentUser = null;
      if (this.storage) {
        this.storage.remove('currentUser');
      }
      this.deleteAccessTokenCookie();
    }

    /**
    * Method for verifying tokens. If the provided token has the correct
    * format, is not expired, and is properly signed, the method returns the
    * decoded token.
    * @param {!string} token
    * @return {CancellablePromise}
    */

  }, {
    key: 'verifyToken',
    value: function verifyToken(token) {
      (0, _assertions.assertDefAndNotNull)(token, 'Token must be specified');
      return this.buildUrl_().path('/oauth/tokeninfo').param('token', token).get().then(function (response) {
        return (0, _assertions.assertResponseSucceeded)(response);
      }).then(function (response) {
        return response.body();
      });
    }

    /**
    * Method for verifying user by token. If the provided token has the correct
    * format, is not expired, and is properly signed, the method returns the
    * user payload.
    * @param {!string} tokenOrEmail Either an authorization token,
    * or the email.
    * @param {string=} opt_password If a email is given as the first param,
    * this should be the password.
    * @return {CancellablePromise}
    */

  }, {
    key: 'verifyUser',
    value: function verifyUser(tokenOrEmail, opt_password) {
      var _this8 = this;

      (0, _assertions.assertDefAndNotNull)(tokenOrEmail, 'Token or email must be specified');
      return this.buildUrl_().path('/user').auth(tokenOrEmail, opt_password).get().then(function (response) {
        return (0, _assertions.assertResponseSucceeded)(response);
      }).then(function (response) {
        var data = response.body();
        if (opt_password) {
          data.token = null;
          data.email = tokenOrEmail;
          data.password = opt_password;
        } else {
          data.token = tokenOrEmail;
        }
        return _this8.createAuthFromData(data);
      });
    }
  }]);

  return AuthApiHelper;
}(_ApiHelper3.default);

/**
 * Asserts a passed sign-in provider is supported.
 * Throws an exception if the passed provider is not one of:
 * - FacebookAuthProvider.PROVIDER
 * - GithubAuthProvider.PROVIDER
 * - GoogleAuthProvider.PROVIDER
 * @param {!string} provider
 */


function assertSupportedProvider(provider) {
  switch (provider.constructor.PROVIDER) {
    case _FacebookAuthProvider2.default.PROVIDER:
    case _GithubAuthProvider2.default.PROVIDER:
    case _GoogleAuthProvider2.default.PROVIDER:
      break;
    default:
      throw new Error('Sign-in provider not supported');
  }
}

exports.default = AuthApiHelper;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AuthProvider2 = __webpack_require__(11);

var _AuthProvider3 = _interopRequireDefault(_AuthProvider2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Facebook auth provider implementation.
 */
var FacebookAuthProvider = function (_AuthProvider) {
  _inherits(FacebookAuthProvider, _AuthProvider);

  /**
  * Constructs an {@link FacebookAuthProvider} instance.
  * @constructor
  */
  function FacebookAuthProvider() {
    _classCallCheck(this, FacebookAuthProvider);

    var _this = _possibleConstructorReturn(this, (FacebookAuthProvider.__proto__ || Object.getPrototypeOf(FacebookAuthProvider)).call(this));

    _this.provider = FacebookAuthProvider.PROVIDER;
    return _this;
  }

  return FacebookAuthProvider;
}(_AuthProvider3.default);

FacebookAuthProvider.PROVIDER = 'facebook';

exports.default = FacebookAuthProvider;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AuthProvider2 = __webpack_require__(11);

var _AuthProvider3 = _interopRequireDefault(_AuthProvider2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Github auth provider implementation.
 */
var GithubAuthProvider = function (_AuthProvider) {
  _inherits(GithubAuthProvider, _AuthProvider);

  /**
  * Constructs an {@link GithubAuthProvider} instance.
  * @constructor
  */
  function GithubAuthProvider() {
    _classCallCheck(this, GithubAuthProvider);

    var _this = _possibleConstructorReturn(this, (GithubAuthProvider.__proto__ || Object.getPrototypeOf(GithubAuthProvider)).call(this));

    _this.provider = GithubAuthProvider.PROVIDER;
    return _this;
  }

  return GithubAuthProvider;
}(_AuthProvider3.default);

GithubAuthProvider.PROVIDER = 'github';

exports.default = GithubAuthProvider;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AuthProvider2 = __webpack_require__(11);

var _AuthProvider3 = _interopRequireDefault(_AuthProvider2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Google auth provider implementation.
 */
var GoogleAuthProvider = function (_AuthProvider) {
  _inherits(GoogleAuthProvider, _AuthProvider);

  /**
  * Constructs an {@link GoogleAuthProvider} instance.
  * @constructor
  */
  function GoogleAuthProvider() {
    _classCallCheck(this, GoogleAuthProvider);

    var _this = _possibleConstructorReturn(this, (GoogleAuthProvider.__proto__ || Object.getPrototypeOf(GoogleAuthProvider)).call(this));

    _this.provider = GoogleAuthProvider.PROVIDER;
    return _this;
  }

  return GoogleAuthProvider;
}(_AuthProvider3.default);

GoogleAuthProvider.PROVIDER = 'google';

exports.default = GoogleAuthProvider;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _metalAjax = __webpack_require__(38);

var _metalAjax2 = _interopRequireDefault(_metalAjax);

var _Transport2 = __webpack_require__(23);

var _Transport3 = _interopRequireDefault(_Transport2);

var _ClientResponse = __webpack_require__(22);

var _ClientResponse2 = _interopRequireDefault(_ClientResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The implementation of an ajax transport to be used with {@link WeDeploy}.
 * @extends {Transport}
 */
var AjaxTransport = function (_Transport) {
  _inherits(AjaxTransport, _Transport);

  function AjaxTransport() {
    _classCallCheck(this, AjaxTransport);

    return _possibleConstructorReturn(this, (AjaxTransport.__proto__ || Object.getPrototypeOf(AjaxTransport)).apply(this, arguments));
  }

  _createClass(AjaxTransport, [{
    key: 'send',

    /**
    * @inheritDoc
    */
    value: function send(clientRequest) {
      var deferred = _metalAjax2.default.request(clientRequest.url(), clientRequest.method(), clientRequest.body(), clientRequest.headers(), clientRequest.params(), null, false, clientRequest.withCredentials());

      return deferred.then(function (response) {
        var clientResponse = new _ClientResponse2.default(clientRequest);
        clientResponse.body(response.responseText);
        clientResponse.statusCode(response.status);
        clientResponse.statusText(response.statusText);
        _metalAjax2.default.parseResponseHeaders(response.getAllResponseHeaders()).forEach(function (header) {
          clientResponse.header(header.name, header.value);
        });
        return clientResponse;
      });
    }
  }]);

  return AjaxTransport;
}(_Transport3.default);

exports.default = AjaxTransport;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
		value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ApiHelper2 = __webpack_require__(9);

var _ApiHelper3 = _interopRequireDefault(_ApiHelper2);

var _Query = __webpack_require__(7);

var _Query2 = _interopRequireDefault(_Query);

var _Filter = __webpack_require__(4);

var _Filter2 = _interopRequireDefault(_Filter);

var _assertions = __webpack_require__(3);

var _metal = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class responsible for encapsulate data api calls.
 */
var DataApiHelper = function (_ApiHelper) {
		_inherits(DataApiHelper, _ApiHelper);

		/**
  * Constructs an {@link DataApiHelper} instance.
  * @param {!WeDeploy} wedeployClient {@link WeDeploy} client reference.
  * @constructor
  */
		function DataApiHelper(wedeployClient) {
				_classCallCheck(this, DataApiHelper);

				var _this = _possibleConstructorReturn(this, (DataApiHelper.__proto__ || Object.getPrototypeOf(DataApiHelper)).call(this, wedeployClient));

				_this.isSearch_ = false;
				return _this;
		}

		/**
  * Adds a filter to this request's {@link Query}.
  * @param {!Filter|string} fieldOrFilter Either a Filter instance or the
  *   name of the field to filter by.
  * @param {*=} opt_operatorOrValue Either the field's operator or its value.
  * @param {*=} opt_value The filter's value.
  * @return {DataApiHelper} Returns the {@link DataApiHelper} object itself, so
  *   calls can be chained.
  * @chainable
  */


		_createClass(DataApiHelper, [{
				key: 'where',
				value: function where(fieldOrFilter, opt_operatorOrValue, opt_value) {
						this.getOrCreateFilter_().and(fieldOrFilter, opt_operatorOrValue, opt_value);
						return this;
				}

				/**
    * Adds a filter to be composed with this filter using the "or" operator.
    * @param {!Filter|string} fieldOrFilter Either a {@link Filter} instance or
    *   the name of the field to filter by.
    * @param {*=} opt_operatorOrValue Either the field's operator or its value.
    * @param {*=} opt_value The filter's value.
    * @return {DataApiHelper} Returns the {@link DataApiHelper} object itself, so
    *   calls can be chained.
    * @chainnable
    */

		}, {
				key: 'or',
				value: function or(fieldOrFilter, opt_operatorOrValue, opt_value) {
						if (this.getOrCreateFilter_().body().and.length === 0) {
								throw Error('It\'s required to have a condition before using an \'or()\' ' + 'for the first time.');
						}
						this.getOrCreateFilter_().or(fieldOrFilter, opt_operatorOrValue, opt_value);
						return this;
				}

				/**
    * Adds a filter to be compose with this filter using "none" operator.
    * @param {string} field The name of the field to filter by.
    * @param {!(Array|*)} args A variable amount of values to be used with
    * the "none" operator. Can be passed either as a single array or as
    * separate params.
    * @return {DataApiHelper} Returns the {@link DataApiHelper} object itself, so
    *   calls can be chained.
    * @chainnable
    */

		}, {
				key: 'none',
				value: function none(field) {
						for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
								args[_key - 1] = arguments[_key];
						}

						return this.where(_Filter2.default.none(field, args));
				}

				/**
    * Adds a filter to be compose with this filter using "match" operator.
    * @param {string} field If no second string argument is given, this
    *   should be the query string, in which case all fields will be matched.
    *   Otherwise, this should be the name of the field to match.
    * @param {string=} opt_query The query string.
    * @return {DataApiHelper} Returns the {@link DataApiHelper} object itself, so
    *   calls can be chained.
    * @chainnable
    */

		}, {
				key: 'match',
				value: function match(field, opt_query) {
						return this.where(_Filter2.default.match(field, opt_query));
				}

				/**
    * Adds a filter to be compose with this filter using "prefix" operator.
    * @param {string} field The name of the field to filter by.
    * @param {string=} opt_query The query string.
    * @return {DataApiHelper} Returns the {@link DataApiHelper} object itself, so
    *   calls can be chained.
    * @chainnable
    */

		}, {
				key: 'prefix',
				value: function prefix(field, opt_query) {
						return this.where(_Filter2.default.prefix(field, opt_query));
				}

				/**
    * Adds a filter to be compose with this filter using "similar" operator.
    * @param {string} fieldOrQuery If no second string argument is given, this
    * should be the query string, in which case all fields will be matched.
    * Otherwise, this should be the name of the field to match.
    * @param {?string} query The query string.
    * @return {DataApiHelper} Returns the {@link DataApiHelper} object itself, so
    *   calls can be chained.
    * @chainnable
    */

		}, {
				key: 'similar',
				value: function similar(fieldOrQuery, query) {
						return this.where(_Filter2.default.similar(fieldOrQuery, query));
				}

				/**
    * Returns a {@link Filter} instance that uses the "<" operator.
    * @param {string} field The name of the field to filter by.
    * @param {*} value The filter's value.
    * @return {DataApiHelper} Returns the {@link DataApiHelper} object itself, so
    *   calls can be chained.
    * @chainnable
    */

		}, {
				key: 'lt',
				value: function lt(field, value) {
						return this.where(_Filter2.default.lt(field, value));
				}

				/**
    * Returns a {@link Filter} instance that uses the "<=" operator.
    * @param {string} field The name of the field to filter by.
    * @param {*} value The filter's value.
    * @return {DataApiHelper} Returns the {@link DataApiHelper} object itself, so
    *   calls can be chained.
    * @chainnable
    */

		}, {
				key: 'lte',
				value: function lte(field, value) {
						return this.where(_Filter2.default.lte(field, value));
				}

				/**
    * Adds a filter to be compose with this filter using "any" operator.
    * @param {string} field The name of the field to filter by.
    * @param {!(Array|*)} args A variable amount of values to be used with
    * the "none" operator. Can be passed either as a single array or as
    * separate params.
    * @return {DataApiHelper} Returns the {@link DataApiHelper} object itself, so
    *   calls can be chained.
    * @chainnable
    */

		}, {
				key: 'any',
				value: function any(field) {
						for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
								args[_key2 - 1] = arguments[_key2];
						}

						return this.where(_Filter2.default.any(field, args));
				}

				/**
    * Adds a filter to be compose with this filter using "gp" operator. This is a
    * special use case of `Filter.polygon` for bounding boxes.
    * @param {string} field The field's name.
    * @param {*} boxOrUpperLeft Either a `Geo.BoundingBox` instance, or a
    * bounding box's upper left coordinate.
    * @param {*=} opt_lowerRight A bounding box's lower right coordinate.
    * @return {DataApiHelper} Returns the {@link DataApiHelper} object itself, so
    *   calls can be chained.
    * @chainnable
    */

		}, {
				key: 'boundingBox',
				value: function boundingBox(field, boxOrUpperLeft, opt_lowerRight) {
						return this.where(_Filter2.default.boundingBox(field, boxOrUpperLeft, opt_lowerRight));
				}

				/**
    * Adds a filter to be compose with this filter using "gd" operator.
    * @param {string} field The field's name.
    * @param {*} locationOrCircle Either a `Geo.Circle` instance or a
    * coordinate.
    * @param {Range|string=} opt_rangeOrDistance Either a `Range` instance or
    * the distance value.
    * @return {DataApiHelper} Returns the {@link DataApiHelper} object itself, so
    *   calls can be chained.
    * @chainnable
    */

		}, {
				key: 'distance',
				value: function distance(field, locationOrCircle, opt_rangeOrDistance) {
						return this.where(_Filter2.default.distance(field, locationOrCircle, opt_rangeOrDistance));
				}

				/**
    * Adds a filter to be compose with this filter using "range" operator.
    * @param {string} field The field's name.
    * @param {*} rangeOrMin Either a `Range` instance or a the range's min
    * value.
    * @param {*=} opt_max The range's max value.
    * @return {DataApiHelper} Returns the {@link DataApiHelper} object itself, so
    *   calls can be chained.
    * @chainnable
    */

		}, {
				key: 'range',
				value: function range(field, rangeOrMin, opt_max) {
						return this.where(_Filter2.default.range(field, rangeOrMin, opt_max));
				}

				/**
    * Sets the limit for this request's {@link Query}.
    * @param {number} limit The max amount of entries that this request should
    *   return.
    * @return {DataApiHelper} Returns the {@link DataApiHelper} object itself, so
    *   calls can be chained.
    * @chainnable
    */

		}, {
				key: 'limit',
				value: function limit(_limit) {
						this.getOrCreateQuery_().limit(_limit);
						return this;
				}

				/**
    * Sets the offset for this request's {@link Query}.
    * @param {number} offset The index of the first entry that should be
    * returned by this query.
    * @return {DataApiHelper} Returns the {@link DataApiHelper} object itself, so
    *   calls can be chained.
    * @chainnable
    */

		}, {
				key: 'offset',
				value: function offset(_offset) {
						this.getOrCreateQuery_().offset(_offset);
						return this;
				}

				/**
    * Adds a highlight entry to this request's {@link Query} instance.
    * @param {string} field The field's name.
    * @return {DataApiHelper} Returns the {@link DataApiHelper} object itself, so
    *   calls can be chained.
    * @chainnable
    */

		}, {
				key: 'highlight',
				value: function highlight(field) {
						this.getOrCreateQuery_().highlight(field);
						return this;
				}

				/**
    * Adds an aggregation to this {@link Query} instance.
    * @param {string} name The aggregation name.
    * @param {!Aggregation|string} aggregationOrField Either an {@link
    * Aggregation} instance or the name of the aggregation field.
    * @param {string=} opt_operator The aggregation operator.
    * @return {DataApiHelper} Returns the {@link DataApiHelper} object itself, so
    *   calls can be chained.
    * @chainnable
    */

		}, {
				key: 'aggregate',
				value: function aggregate(name, aggregationOrField, opt_operator) {
						this.getOrCreateQuery_().aggregate(name, aggregationOrField, opt_operator);
						return this;
				}

				/**
    * Sets this request's query type to 'count'.
    * @return {DataApiHelper} Returns the {@link DataApiHelper} object itself, so
    *   calls can be chained.
    * @chainnable
    */

		}, {
				key: 'count',
				value: function count() {
						this.getOrCreateQuery_().type('count');
						return this;
				}

				/**
    * Adds a sort query to this request's body.
    * @param {string} field The field that the query should be sorted by.
    * @param {string=} opt_direction The direction the sort operation should
    * use. If none is given, 'asc' is used by default.
    * @return {DataApiHelper} Returns the {@link DataApiHelper} object itself, so
    *   calls can be chained.
    * @chainnable
    */

		}, {
				key: 'orderBy',
				value: function orderBy(field, opt_direction) {
						this.getOrCreateQuery_().sort(field, opt_direction);
						return this;
				}

				/**
    * Creates an object (or multiple objects) and saves it to WeDeploy data. If
    * there's a validation registered in the collection and the request is
    * successful, the resulting object (or array of objects) is returned. The
    * data parameter can be either an Object or an Array of Objects.
    * These Objects describe the attributes on the objects that are to be
    *   created.
    * ```javascript
    * var data = WeDeploy.data('http://demodata.wedeploy.io');
    *
    * data.create(
    *   'movies', {'title'=> 'Star Wars: Episode I – The Phantom Menace'})
    * 	 .then(function(movie){
    *     console.log(movie)
    *   });
    *
    * data.create(
    *   'movies', [{'title'=> 'Star Wars: Episode II – Attack of the Clones'},
    * 						  {'title'=> 'Star Wars: Episode III – Revenge of the Sith'})
    * 		 .then(function(movies){
    * 			 console.log(movies)
    *     });
    * ```
    * @param {string} collection Collection (key) used to create the new data.
    * @param {Object} data Attributes on the object that is to be created.
    * @return {!CancellablePromise}
    */

		}, {
				key: 'create',
				value: function create(collection, data) {
						(0, _assertions.assertDefAndNotNull)(collection, 'Collection key must be specified.');
						(0, _assertions.assertObject)(data, 'Data can\'t be empty.');

						return this.buildUrl_().path(collection).post(data).then(function (response) {
								return (0, _assertions.assertResponseSucceeded)(response);
						}).then(function (response) {
								return response.body();
						});
				}

				/**
    * Replaces the attributes of a document form the passed-in object and saves
    * the record. If the object is invalid, the saving will fail and an error
    * object will be returned.
    *
    * ```javascript
    * var data = WeDeploy.data('http://demodata.wedeploy.io');
    *
    * data.replace('movies/1019112353', {'title'=> 'Star Wars: Episode I'})
    * 		 .then(function(movie){
    * 			 console.log(movie)
    *     });
    * ```
    * @param {string} doc Key used to update the document.
    * @param {Object} data Attributes on the object that is to be updated.
    * @return {!CancellablePromise}
    */

		}, {
				key: 'replace',
				value: function replace(doc, data) {
						(0, _assertions.assertDefAndNotNull)(doc, 'Document key must be specified.');
						(0, _assertions.assertObject)(data, 'Data must be specified.');

						return this.buildUrl_().path(doc).put(data).then(function (response) {
								return (0, _assertions.assertResponseSucceeded)(response);
						}).then(function (response) {
								return response.body();
						});
				}

				/**
    * Update the attributes of a document form the passed-in object and saves
    * the record. If the object is invalid, the saving will fail and an error
    * object will be returned.
    *
    * ```javascript
    * var data = WeDeploy.data('http://demodata.wedeploy.io');
    *
    * data.update('movies/1019112353', {'title'=> 'Star Wars: Episode I'})
    * 		 .then(function(movie){
    * 			 console.log(movie)
    *     });
    * ```
    * @param {string} doc Key used to update the document.
    * @param {Object} data Attributes on the object that is to be updated.
    * @return {!CancellablePromise}
    */

		}, {
				key: 'update',
				value: function update(doc, data) {
						(0, _assertions.assertDefAndNotNull)(doc, 'Document key must be specified.');
						(0, _assertions.assertObject)(data, 'Data must be specified.');

						return this.buildUrl_().path(doc).patch(data).then(function (response) {
								return (0, _assertions.assertResponseSucceeded)(response);
						}).then(function (response) {
								return response.body();
						});
				}

				/**
    * Deletes a [document/field/collection].
    * @param {string} key Key used to delete the
    * document/field/collection.
    * @return {!CancellablePromise}
    */

		}, {
				key: 'delete',
				value: function _delete(key) {
						(0, _assertions.assertDefAndNotNull)(key, 'Document/Field/Collection key must be specified');

						return this.buildUrl_().path(key).delete().then(function (response) {
								return (0, _assertions.assertResponseSucceeded)(response);
						}).then(function () {
								return undefined;
						});
				}

				/**
    * Retrieve data from a [document/field/collection].
    * @param {string} key Key used to delete the document/field/collection.
    * @return {!CancellablePromise}
    */

		}, {
				key: 'get',
				value: function get(key) {
						(0, _assertions.assertDefAndNotNull)(key, 'Document/Field/Collection key must be specified');

						return this.buildUrl_().path(key).get(this.processAndResetQueryState()).then(function (response) {
								return (0, _assertions.assertResponseSucceeded)(response);
						}).then(function (response) {
								return response.body();
						});
				}

				/**
    * Retrieve data from a [document/field/collection] and put it in a search
    * format.
    * @param {string} key Key used to delete the document/field/collection.
    * @return {!CancellablePromise}
    */

		}, {
				key: 'search',
				value: function search(key) {
						(0, _assertions.assertDefAndNotNull)(key, 'Document/Field/Collection key must be specified');

						this.isSearch_ = true;

						return this.buildUrl_().path(key).get(this.processAndResetQueryState()).then(function (response) {
								return (0, _assertions.assertResponseSucceeded)(response);
						}).then(function (response) {
								return response.body();
						});
				}

				/**
    * Creates new socket.io instance. Monitor the arrival of new broadcasted
    * data.
    * @param  {string} collection key/collection used to find organized data.
    * @param  {Object=} opt_options Object with Socket IO options.
    * @return {!io} Socket IO reference. Server events can be listened on it.
    */

		}, {
				key: 'watch',
				value: function watch(collection, opt_options) {
						(0, _assertions.assertDefAndNotNull)(collection, 'Collection key must be specified');

						return this.buildUrl_().path(collection).watch(this.processAndResetQueryState(), opt_options);
				}

				/**
    * Builds URL by joining the headers and auth.
    * @return {WeDeploy} Returns the {@link WeDeploy} object itself, so calls can
    *   be chained.
    * @chainable
    */

		}, {
				key: 'buildUrl_',
				value: function buildUrl_() {
						return this.wedeployClient.url(this.wedeployClient.dataUrl_).headers(this.headers_).auth(this.helperAuthScope);
				}

				/**
    * Gets the currently used main {@link Filter} object. If none exists yet, a
    * new one is created.
    * @return {!Query}
    * @protected
    */

		}, {
				key: 'getOrCreateFilter_',
				value: function getOrCreateFilter_() {
						if (!this.filter_) {
								this.filter_ = new _Filter2.default();
						}
						return this.filter_;
				}

				/**
    * Gets the currently used {@link Query} object. If none exists yet,
    * a new one is created.
    * @return {!Query}
    * @protected
    */

		}, {
				key: 'getOrCreateQuery_',
				value: function getOrCreateQuery_() {
						if (!this.query_) {
								this.query_ = new _Query2.default();
						}
						return this.query_;
				}

				/**
    * Aggregate filters into query and return its latest value. Query and
    * filters are cleaned after aggregation.
    * @return {Query}
    * @protected
    */

		}, {
				key: 'processAndResetQueryState',
				value: function processAndResetQueryState() {
						var filter = void 0;

						if (_metal.core.isDefAndNotNull(this.filter_)) {
								filter = this.getOrCreateFilter_();
						}

						if (this.isSearch_) {
								this.getOrCreateQuery_().search(filter);
						} else if (filter) {
								this.getOrCreateQuery_().filter(filter);
						}

						var query = this.query_;
						this.headers_.clear();
						this.filter_ = null;
						this.isSearch_ = false;
						this.query_ = null;
						return query;
				}
		}]);

		return DataApiHelper;
}(_ApiHelper3.default);

exports.default = DataApiHelper;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assertions = __webpack_require__(3);

var _metalStructs = __webpack_require__(2);

var _ApiHelper2 = __webpack_require__(9);

var _ApiHelper3 = _interopRequireDefault(_ApiHelper2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class responsible for encapsulate email api calls.
 */
var EmailApiHelper = function (_ApiHelper) {
  _inherits(EmailApiHelper, _ApiHelper);

  /**
  * Constructs an {@link EmailApiHelper} instance.
  * @param {!WeDeploy} wedeployClient {@link WeDeploy} client reference.
  * @constructor
  */
  function EmailApiHelper(wedeployClient) {
    _classCallCheck(this, EmailApiHelper);

    var _this = _possibleConstructorReturn(this, (EmailApiHelper.__proto__ || Object.getPrototypeOf(EmailApiHelper)).call(this, wedeployClient));

    _this.params = new _metalStructs.MultiMap();
    return _this;
  }

  /**
  * Set from attribute on params to be send on email request.
  * @param  {string} from
  * @return {EmailApiHelper} Returns the {@link EmailApiHelper} object itself,
  *   so calls can be chained.
  * @chainable
  */


  _createClass(EmailApiHelper, [{
    key: 'from',
    value: function from(_from) {
      (0, _assertions.assertDefAndNotNull)(_from, 'Parameter "from" must be specified');

      this.params.set('from', _from);

      return this;
    }

    /**
    * Set bcc attribute on params to be send on email request.
    * @param  {string} bcc
    * @return {EmailApiHelper} Returns the {@link EmailApiHelper} object itself,
    *   so calls can be chained.
    * @chainable
    */

  }, {
    key: 'bcc',
    value: function bcc(_bcc) {
      (0, _assertions.assertDefAndNotNull)(_bcc, 'Parameter "bcc" must be specified');

      this.params.add('bcc', _bcc);

      return this;
    }

    /**
    * Set cc attribute on params to be send on email request.
    * @param  {string} cc
    * @return {EmailApiHelper} Returns the {@link EmailApiHelper} object itself,
    *   so calls can be chained.
    * @chainable
    */

  }, {
    key: 'cc',
    value: function cc(_cc) {
      (0, _assertions.assertDefAndNotNull)(_cc, 'Parameter "cc" must be specified');

      this.params.add('cc', _cc);

      return this;
    }

    /**
    * Set message attribute on params to be send on email request.
    * @param  {string} message
    * @return {EmailApiHelper} Returns the {@link EmailApiHelper} object itself,
    *   so calls can be chained.
    * @chainable
    */

  }, {
    key: 'message',
    value: function message(_message) {
      (0, _assertions.assertDefAndNotNull)(_message, 'Parameter "message" must be specified');

      this.params.set('message', _message);

      return this;
    }

    /**
    * Set priority attribute on params to be send on email request.
    * @param  {string} priority
    * @return {EmailApiHelper} Returns the {@link EmailApiHelper} object itself,
    *   so calls can be chained.
    * @chainable
    */

  }, {
    key: 'priority',
    value: function priority(_priority) {
      (0, _assertions.assertDefAndNotNull)(_priority, 'Parameter "priority" must be specified');

      this.params.set('priority', _priority);

      return this;
    }

    /**
    * Set replyTo attribute on params to be send on email request.
    * @param  {string} replyTo
    * @return {EmailApiHelper} Returns the {@link EmailApiHelper} object itself,
    *   so calls can be chained.
    * @chainable
    */

  }, {
    key: 'replyTo',
    value: function replyTo(_replyTo) {
      (0, _assertions.assertDefAndNotNull)(_replyTo, 'Parameter "replyTo" must be specified');

      this.params.set('replyTo', _replyTo);

      return this;
    }

    /**
    * Set to attribute on params to be send on email request.
    * @param  {string} to
    * @return {EmailApiHelper} Returns the {@link EmailApiHelper} object itself,
    *   so calls can be chained.
    * @chainable
    */

  }, {
    key: 'to',
    value: function to(_to) {
      (0, _assertions.assertDefAndNotNull)(_to, 'Parameter "to" must be specified');

      this.params.add('to', _to);

      return this;
    }

    /**
    * Set subject attribute on params to be send on email request.
    * @param  {string} subject
    * @return {EmailApiHelper} Returns the {@link EmailApiHelper} object itself,
    *   so calls can be chained.
    * @chainable
    */

  }, {
    key: 'subject',
    value: function subject(_subject) {
      (0, _assertions.assertDefAndNotNull)(_subject, 'Parameter "subject" must be specified');

      this.params.set('subject', _subject);

      return this;
    }

    /**
    * Sends an email based on given params.
    * @return {!CancellablePromise}
    */

  }, {
    key: 'send',
    value: function send() {
      var _this2 = this;

      var client = this.buildUrl_().path('emails');

      this.params.names().forEach(function (name) {
        var values = _this2.params.getAll(name);

        values.forEach(function (value) {
          client.form(name, value);
        });
      });

      this.params.clear();
      this.headers_.clear();

      return client.post().then(function (response) {
        return (0, _assertions.assertResponseSucceeded)(response);
      }).then(function (response) {
        return response.body();
      });
    }

    /**
    * Checks the status of an email.
    * @param  {string} emailId
    * @return {!CancellablePromise}
    */

  }, {
    key: 'status',
    value: function status(emailId) {
      (0, _assertions.assertDefAndNotNull)(emailId, 'Parameter "emailId" param must be specified');

      return this.buildUrl_().path('emails', emailId, 'status').get().then(function (response) {
        return (0, _assertions.assertResponseSucceeded)(response);
      }).then(function (response) {
        return response.body();
      });
    }

    /**
     * Builds URL by joining the headers and auth.
     * @return {WeDeploy} Returns the {@link WeDeploy} object itself, so calls can
     *   be chained.
     * @chainable
     */

  }, {
    key: 'buildUrl_',
    value: function buildUrl_() {
      return this.wedeployClient.url(this.wedeployClient.emailUrl_).headers(this.headers_).auth(this.helperAuthScope);
    }
  }]);

  return EmailApiHelper;
}(_ApiHelper3.default);

exports.default = EmailApiHelper;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

/**
 * Abstraction layer for string to base64 conversion
 * reference: https://github.com/nodejs/node/issues/3462
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base64 = function () {
  function Base64() {
    _classCallCheck(this, Base64);
  }

  _createClass(Base64, null, [{
    key: 'encodeString',

    /**
    * Creates a base-64 encoded ASCII string from a "string" of binary data.
    * @param {string} string to be encoded.
    * @return {string}
    * @static
    */
    value: function encodeString(string) {
      if (typeof btoa === 'function') {
        return btoa(string);
      }

      return new Buffer(string.toString(), 'binary').toString('base64');
    }
  }]);

  return Base64;
}();

exports.default = Base64;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35).Buffer))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeDeploy = exports.Range = exports.Query = exports.Geo = exports.Filter = undefined;

var _globals = __webpack_require__(5);

var _globals2 = _interopRequireDefault(_globals);

var _Filter = __webpack_require__(4);

var _Filter2 = _interopRequireDefault(_Filter);

var _Geo = __webpack_require__(15);

var _Geo2 = _interopRequireDefault(_Geo);

var _WeDeploy = __webpack_require__(18);

var _WeDeploy2 = _interopRequireDefault(_WeDeploy);

var _Query = __webpack_require__(7);

var _Query2 = _interopRequireDefault(_Query);

var _Range = __webpack_require__(8);

var _Range2 = _interopRequireDefault(_Range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_globals2.default.window.Filter = _Filter2.default;
_globals2.default.window.Geo = _Geo2.default;
_globals2.default.window.Query = _Query2.default;
_globals2.default.window.Range = _Range2.default;
_globals2.default.window.WeDeploy = _WeDeploy2.default;

exports.Filter = _Filter2.default;
exports.Geo = _Geo2.default;
exports.Query = _Query2.default;
exports.Range = _Range2.default;
exports.WeDeploy = _WeDeploy2.default;
exports.default = _WeDeploy2.default;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(34)
var ieee754 = __webpack_require__(36)
var isArray = __webpack_require__(37)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 36 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 37 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _metal = __webpack_require__(0);

var _metalUri = __webpack_require__(6);

var _metalUri2 = _interopRequireDefault(_metalUri);

var _metalPromise = __webpack_require__(39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ajax = function () {
	function Ajax() {
		_classCallCheck(this, Ajax);
	}

	_createClass(Ajax, null, [{
		key: 'parseResponseHeaders',


		/**
   * XmlHttpRequest's getAllResponseHeaders() method returns a string of
   * response headers according to the format described on the spec:
   * {@link http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders-method}.
   * This method parses that string into a user-friendly name/value pair
   * object.
   * @param {string} allHeaders All headers as string.
   * @return {!Array.<Object<string, string>>}
   */
		value: function parseResponseHeaders(allHeaders) {
			var headers = [];
			if (!allHeaders) {
				return headers;
			}
			var pairs = allHeaders.split('\r\n');
			for (var i = 0; i < pairs.length; i++) {
				var index = pairs[i].indexOf(': ');
				if (index > 0) {
					var name = pairs[i].substring(0, index);
					var value = pairs[i].substring(index + 2);
					headers.push({
						name: name,
						value: value
					});
				}
			}
			return headers;
		}

		/**
   * Requests the url using XMLHttpRequest.
   * @param {!string} url
   * @param {!string} method
   * @param {?string} body
   * @param {MultiMap=} opt_headers
   * @param {MultiMap=} opt_params
   * @param {number=} opt_timeout
   * @param {boolean=} opt_sync
   * @param {boolean=} opt_withCredentials
   * @return {Promise} Deferred ajax request.
   * @protected
   */

	}, {
		key: 'request',
		value: function request(url, method, body, opt_headers, opt_params, opt_timeout, opt_sync, opt_withCredentials) {
			url = url || '';
			method = method || 'GET';

			var request = new XMLHttpRequest();

			var promise = new _metalPromise.CancellablePromise(function (resolve, reject) {
				request.onload = function () {
					if (request.aborted) {
						request.onerror();
						return;
					}
					resolve(request);
				};
				request.onerror = function () {
					var error = new Error('Request error');
					error.request = request;
					reject(error);
				};
			}).thenCatch(function (reason) {
				request.abort();
				throw reason;
			}).thenAlways(function () {
				clearTimeout(timeout);
			});

			url = new _metalUri2.default(url);

			if (opt_params) {
				url.addParametersFromMultiMap(opt_params).toString();
			}

			url = url.toString();

			request.open(method, url, !opt_sync);

			if (opt_withCredentials) {
				request.withCredentials = true;
			}

			if (opt_headers) {
				opt_headers.names().forEach(function (name) {
					request.setRequestHeader(name, opt_headers.getAll(name).join(', '));
				});
			}

			request.send((0, _metal.isDef)(body) ? body : null);

			if ((0, _metal.isDefAndNotNull)(opt_timeout)) {
				var timeout = setTimeout(function () {
					promise.cancel('Request timeout');
				}, opt_timeout);
			}

			return promise;
		}
	}]);

	return Ajax;
}();

exports.default = Ajax;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * Promises polyfill from Google's Closure Library.
 *
 *      Copyright 2013 The Closure Library Authors. All Rights Reserved.
 *
 * NOTE(eduardo): Promise support is not ready on all supported browsers,
 * therefore metal-promise is temporarily using Google's promises as polyfill.
 * It supports cancellable promises and has clean and fast implementation.
 */



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CancellablePromise = undefined;

var _metal = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Provides a more strict interface for Thenables in terms of
 * http://promisesaplus.com for interop with {@see CancellablePromise}.
 *
 * @interface
 * @extends {IThenable.<TYPE>}
 * @template TYPE
 */
var Thenable = function Thenable() {};

/**
 * Adds callbacks that will operate on the result of the Thenable, returning a
 * new child Promise.
 *
 * If the Thenable is fulfilled, the {@code onFulfilled} callback will be
 * invoked with the fulfillment value as argument, and the child Promise will
 * be fulfilled with the return value of the callback. If the callback throws
 * an exception, the child Promise will be rejected with the thrown value
 * instead.
 *
 * If the Thenable is rejected, the {@code onRejected} callback will be invoked
 * with the rejection reason as argument, and the child Promise will be rejected
 * with the return value of the callback or thrown value.
 *
 * @param {?(function(this:THIS, TYPE):
 *             (RESULT|IThenable.<RESULT>|Thenable))=} opt_onFulfilled A
 *     function that will be invoked with the fulfillment value if the Promise
 *     is fullfilled.
 * @param {?(function(*): *)=} opt_onRejected A function that will be invoked
 *     with the rejection reason if the Promise is rejected.
 * @param {THIS=} opt_context An optional context object that will be the
 *     execution context for the callbacks. By default, functions are executed
 *     with the default this.
 * @return {!CancellablePromise.<RESULT>} A new Promise that will receive the
 *     result of the fulfillment or rejection callback.
 * @template RESULT,THIS
 */
Thenable.prototype.then = function () {};

/**
 * An expando property to indicate that an object implements
 * {@code Thenable}.
 *
 * {@see addImplementation}.
 *
 * @const
 */
Thenable.IMPLEMENTED_BY_PROP = '$goog_Thenable';

/**
 * Marks a given class (constructor) as an implementation of Thenable, so
 * that we can query that fact at runtime. The class must have already
 * implemented the interface.
 * Exports a 'then' method on the constructor prototype, so that the objects
 * also implement the extern {@see Thenable} interface for interop with
 * other Promise implementations.
 * @param {function(new:Thenable,...[?])} ctor The class constructor. The
 *     corresponding class must have already implemented the interface.
 */
Thenable.addImplementation = function (ctor) {
  ctor.prototype.then = ctor.prototype.then;
  ctor.prototype.$goog_Thenable = true;
};

/**
 * @param {*} object
 * @return {boolean} Whether a given instance implements {@code Thenable}.
 *     The class/superclass of the instance must call {@code addImplementation}.
 */
Thenable.isImplementedBy = function (object) {
  if (!object) {
    return false;
  }
  try {
    return !!object.$goog_Thenable;
  } catch (e) {
    // Property access seems to be forbidden.
    return false;
  }
};

/**
 * Like bind(), except that a 'this object' is not required. Useful when the
 * target function is already bound.
 *
 * Usage:
 * var g = partial(f, arg1, arg2);
 * g(arg3, arg4);
 *
 * @param {Function} fn A function to partially apply.
 * @param {...*} var_args Additional arguments that are partially applied to fn.
 * @return {!Function} A partially-applied form of the function bind() was
 *     invoked as a method of.
 */
var partial = function partial(fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    // Clone the array (with slice()) and append additional arguments
    // to the existing arguments.
    var newArgs = args.slice();
    newArgs.push.apply(newArgs, arguments);
    return fn.apply(this, newArgs);
  };
};

/**
 * Promises provide a result that may be resolved asynchronously. A Promise may
 * be resolved by being fulfilled or rejected with a value, which will be known
 * as the fulfillment value or the rejection reason. Whether fulfilled or
 * rejected, the Promise result is immutable once it is set.
 *
 * Promises may represent results of any type, including undefined. Rejection
 * reasons are typically Errors, but may also be of any type. Closure Promises
 * allow for optional type annotations that enforce that fulfillment values are
 * of the appropriate types at compile time.
 *
 * The result of a Promise is accessible by calling {@code then} and registering
 * {@code onFulfilled} and {@code onRejected} callbacks. Once the Promise
 * resolves, the relevant callbacks are invoked with the fulfillment value or
 * rejection reason as argument. Callbacks are always invoked in the order they
 * were registered, even when additional {@code then} calls are made from inside
 * another callback. A callback is always run asynchronously sometime after the
 * scope containing the registering {@code then} invocation has returned.
 *
 * If a Promise is resolved with another Promise, the first Promise will block
 * until the second is resolved, and then assumes the same result as the second
 * Promise. This allows Promises to depend on the results of other Promises,
 * linking together multiple asynchronous operations.
 *
 * This implementation is compatible with the Promises/A+ specification and
 * passes that specification's conformance test suite. A Closure Promise may be
 * resolved with a Promise instance (or sufficiently compatible Promise-like
 * object) created by other Promise implementations. From the specification,
 * Promise-like objects are known as "Thenables".
 *
 * @see http://promisesaplus.com/
 *
 * @param {function(
 *             this:RESOLVER_CONTEXT,
 *             function((TYPE|IThenable.<TYPE>|Thenable)),
 *             function(*)): void} resolver
 *     Initialization function that is invoked immediately with {@code resolve}
 *     and {@code reject} functions as arguments. The Promise is resolved or
 *     rejected with the first argument passed to either function.
 * @param {RESOLVER_CONTEXT=} opt_context An optional context for executing the
 *     resolver function. If unspecified, the resolver function will be executed
 *     in the default scope.
 * @constructor
 * @struct
 * @final
 * @implements {Thenable.<TYPE>}
 * @template TYPE,RESOLVER_CONTEXT
 */
var CancellablePromise = function CancellablePromise(resolver, opt_context) {
  /**
   * The internal state of this Promise. Either PENDING, FULFILLED, REJECTED, or
   * BLOCKED.
   * @private {CancellablePromise.State_}
   */
  this.state_ = CancellablePromise.State_.PENDING;

  /**
   * The resolved result of the Promise. Immutable once set with either a
   * fulfillment value or rejection reason.
   * @private {*}
   */
  this.result_ = undefined;

  /**
   * For Promises created by calling {@code then()}, the originating parent.
   * @private {CancellablePromise}
   */
  this.parent_ = null;

  /**
   * The list of {@code onFulfilled} and {@code onRejected} callbacks added to
   * this Promise by calls to {@code then()}.
   * @private {Array.<CancellablePromise.CallbackEntry_>}
   */
  this.callbackEntries_ = null;

  /**
   * Whether the Promise is in the queue of Promises to execute.
   * @private {boolean}
   */
  this.executing_ = false;

  if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
    /**
     * A timeout ID used when the {@code UNHANDLED_REJECTION_DELAY} is greater
     * than 0 milliseconds. The ID is set when the Promise is rejected, and
     * cleared only if an {@code onRejected} callback is invoked for the
     * Promise (or one of its descendants) before the delay is exceeded.
     *
     * If the rejection is not handled before the timeout completes, the
     * rejection reason is passed to the unhandled rejection handler.
     * @private {number}
     */
    this.unhandledRejectionId_ = 0;
  } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
    /**
     * When the {@code UNHANDLED_REJECTION_DELAY} is set to 0 milliseconds, a
     * boolean that is set if the Promise is rejected, and reset to false if an
     * {@code onRejected} callback is invoked for the Promise (or one of its
     * descendants). If the rejection is not handled before the next timestep,
     * the rejection reason is passed to the unhandled rejection handler.
     * @private {boolean}
     */
    this.hadUnhandledRejection_ = false;
  }

  try {
    var self = this;
    resolver.call(opt_context, function (value) {
      self.resolve_(CancellablePromise.State_.FULFILLED, value);
    }, function (reason) {
      self.resolve_(CancellablePromise.State_.REJECTED, reason);
    });
  } catch (e) {
    this.resolve_(CancellablePromise.State_.REJECTED, e);
  }
};

/**
 * The delay in milliseconds before a rejected Promise's reason is passed to
 * the rejection handler. By default, the rejection handler rethrows the
 * rejection reason so that it appears in the developer console or
 * {@code window.onerror} handler.
 * Rejections are rethrown as quickly as possible by default. A negative value
 * disables rejection handling entirely.
 * @type {number}
 */
CancellablePromise.UNHANDLED_REJECTION_DELAY = 0;

/**
 * The possible internal states for a Promise. These states are not directly
 * observable to external callers.
 * @enum {number}
 * @private
 */
CancellablePromise.State_ = {
  /** The Promise is waiting for resolution. */
  PENDING: 0,

  /** The Promise is blocked waiting for the result of another Thenable. */
  BLOCKED: 1,

  /** The Promise has been resolved with a fulfillment value. */
  FULFILLED: 2,

  /** The Promise has been resolved with a rejection reason. */
  REJECTED: 3
};

/**
 * Typedef for entries in the callback chain. Each call to {@code then},
 * {@code thenCatch}, or {@code thenAlways} creates an entry containing the
 * functions that may be invoked once the Promise is resolved.
 *
 * @typedef {{
 *   child: CancellablePromise,
 *   onFulfilled: function(*),
 *   onRejected: function(*)
 * }}
 * @private
 */
CancellablePromise.CallbackEntry_ = null;

/**
 * @param {(TYPE|Thenable.<TYPE>|Thenable)=} opt_value
 * @return {!CancellablePromise.<TYPE>} A new Promise that is immediately resolved
 *     with the given value.
 * @template TYPE
 */
CancellablePromise.resolve = function (opt_value) {
  return new CancellablePromise(function (resolve) {
    resolve(opt_value);
  });
};

/**
 * @param {*=} opt_reason
 * @return {!CancellablePromise} A new Promise that is immediately rejected with the
 *     given reason.
 */
CancellablePromise.reject = function (opt_reason) {
  return new CancellablePromise(function (resolve, reject) {
    reject(opt_reason);
  });
};

/**
 * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
 * @return {!CancellablePromise.<TYPE>} A Promise that receives the result of the
 *     first Promise (or Promise-like) input to complete.
 * @template TYPE
 */
CancellablePromise.race = function (promises) {
  return new CancellablePromise(function (resolve, reject) {
    if (!promises.length) {
      resolve(undefined);
    }
    for (var i = 0, promise; promise = promises[i]; i++) {
      promise.then(resolve, reject);
    }
  });
};

/**
 * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
 * @return {!CancellablePromise.<!Array.<TYPE>>} A Promise that receives a list of
 *     every fulfilled value once every input Promise (or Promise-like) is
 *     successfully fulfilled, or is rejected by the first rejection result.
 * @template TYPE
 */
CancellablePromise.all = function (promises) {
  return new CancellablePromise(function (resolve, reject) {
    var toFulfill = promises.length;
    var values = [];

    if (!toFulfill) {
      resolve(values);
      return;
    }

    var onFulfill = function onFulfill(index, value) {
      toFulfill--;
      values[index] = value;
      if (toFulfill === 0) {
        resolve(values);
      }
    };

    var onReject = function onReject(reason) {
      reject(reason);
    };

    for (var i = 0, promise; promise = promises[i]; i++) {
      promise.then(partial(onFulfill, i), onReject);
    }
  });
};

/**
 * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
 * @return {!CancellablePromise.<TYPE>} A Promise that receives the value of
 *     the first input to be fulfilled, or is rejected with a list of every
 *     rejection reason if all inputs are rejected.
 * @template TYPE
 */
CancellablePromise.firstFulfilled = function (promises) {
  return new CancellablePromise(function (resolve, reject) {
    var toReject = promises.length;
    var reasons = [];

    if (!toReject) {
      resolve(undefined);
      return;
    }

    var onFulfill = function onFulfill(value) {
      resolve(value);
    };

    var onReject = function onReject(index, reason) {
      toReject--;
      reasons[index] = reason;
      if (toReject === 0) {
        reject(reasons);
      }
    };

    for (var i = 0, promise; promise = promises[i]; i++) {
      promise.then(onFulfill, partial(onReject, i));
    }
  });
};

/**
 * Adds callbacks that will operate on the result of the Promise, returning a
 * new child Promise.
 *
 * If the Promise is fulfilled, the {@code onFulfilled} callback will be invoked
 * with the fulfillment value as argument, and the child Promise will be
 * fulfilled with the return value of the callback. If the callback throws an
 * exception, the child Promise will be rejected with the thrown value instead.
 *
 * If the Promise is rejected, the {@code onRejected} callback will be invoked
 * with the rejection reason as argument, and the child Promise will be rejected
 * with the return value (or thrown value) of the callback.
 *
 * @override
 */
CancellablePromise.prototype.then = function (opt_onFulfilled, opt_onRejected, opt_context) {
  return this.addChildPromise_((0, _metal.isFunction)(opt_onFulfilled) ? opt_onFulfilled : null, (0, _metal.isFunction)(opt_onRejected) ? opt_onRejected : null, opt_context);
};
Thenable.addImplementation(CancellablePromise);

/**
 * Adds a callback that will be invoked whether the Promise is fulfilled or
 * rejected. The callback receives no argument, and no new child Promise is
 * created. This is useful for ensuring that cleanup takes place after certain
 * asynchronous operations. Callbacks added with {@code thenAlways} will be
 * executed in the same order with other calls to {@code then},
 * {@code thenAlways}, or {@code thenCatch}.
 *
 * Since it does not produce a new child Promise, cancellation propagation is
 * not prevented by adding callbacks with {@code thenAlways}. A Promise that has
 * a cleanup handler added with {@code thenAlways} will be canceled if all of
 * its children created by {@code then} (or {@code thenCatch}) are canceled.
 *
 * @param {function(this:THIS): void} onResolved A function that will be invoked
 *     when the Promise is resolved.
 * @param {THIS=} opt_context An optional context object that will be the
 *     execution context for the callbacks. By default, functions are executed
 *     in the global scope.
 * @return {!CancellablePromise.<TYPE>} This Promise, for chaining additional calls.
 * @template THIS
 */
CancellablePromise.prototype.thenAlways = function (onResolved, opt_context) {
  var callback = function callback() {
    try {
      // Ensure that no arguments are passed to onResolved.
      onResolved.call(opt_context);
    } catch (err) {
      CancellablePromise.handleRejection_.call(null, err);
    }
  };

  this.addCallbackEntry_({
    child: null,
    onRejected: callback,
    onFulfilled: callback
  });
  return this;
};

/**
 * Adds a callback that will be invoked only if the Promise is rejected. This
 * is equivalent to {@code then(null, onRejected)}.
 *
 * @param {!function(this:THIS, *): *} onRejected A function that will be
 *     invoked with the rejection reason if the Promise is rejected.
 * @param {THIS=} opt_context An optional context object that will be the
 *     execution context for the callbacks. By default, functions are executed
 *     in the global scope.
 * @return {!CancellablePromise} A new Promise that will receive the result of the
 *     callback.
 * @template THIS
 */
CancellablePromise.prototype.thenCatch = function (onRejected, opt_context) {
  return this.addChildPromise_(null, onRejected, opt_context);
};

/**
 * Alias of {@link CancellablePromise.prototype.thenCatch}
 */
CancellablePromise.prototype.catch = CancellablePromise.prototype.thenCatch;

/**
 * Cancels the Promise if it is still pending by rejecting it with a cancel
 * Error. No action is performed if the Promise is already resolved.
 *
 * All child Promises of the canceled Promise will be rejected with the same
 * cancel error, as with normal Promise rejection. If the Promise to be canceled
 * is the only child of a pending Promise, the parent Promise will also be
 * canceled. Cancellation may propagate upward through multiple generations.
 *
 * @param {string=} opt_message An optional debugging message for describing the
 *     cancellation reason.
 */
CancellablePromise.prototype.cancel = function (opt_message) {
  if (this.state_ === CancellablePromise.State_.PENDING) {
    _metal.async.run(function () {
      var err = new CancellablePromise.CancellationError(opt_message);
      err.IS_CANCELLATION_ERROR = true;
      this.cancelInternal_(err);
    }, this);
  }
};

/**
 * Cancels this Promise with the given error.
 *
 * @param {!Error} err The cancellation error.
 * @private
 */
CancellablePromise.prototype.cancelInternal_ = function (err) {
  if (this.state_ === CancellablePromise.State_.PENDING) {
    if (this.parent_) {
      // Cancel the Promise and remove it from the parent's child list.
      this.parent_.cancelChild_(this, err);
    } else {
      this.resolve_(CancellablePromise.State_.REJECTED, err);
    }
  }
};

/**
 * Cancels a child Promise from the list of callback entries. If the Promise has
 * not already been resolved, reject it with a cancel error. If there are no
 * other children in the list of callback entries, propagate the cancellation
 * by canceling this Promise as well.
 *
 * @param {!CancellablePromise} childPromise The Promise to cancel.
 * @param {!Error} err The cancel error to use for rejecting the Promise.
 * @private
 */
CancellablePromise.prototype.cancelChild_ = function (childPromise, err) {
  if (!this.callbackEntries_) {
    return;
  }
  var childCount = 0;
  var childIndex = -1;

  // Find the callback entry for the childPromise, and count whether there are
  // additional child Promises.
  for (var i = 0, entry; entry = this.callbackEntries_[i]; i++) {
    var child = entry.child;
    if (child) {
      childCount++;
      if (child === childPromise) {
        childIndex = i;
      }
      if (childIndex >= 0 && childCount > 1) {
        break;
      }
    }
  }

  // If the child Promise was the only child, cancel this Promise as well.
  // Otherwise, reject only the child Promise with the cancel error.
  if (childIndex >= 0) {
    if (this.state_ === CancellablePromise.State_.PENDING && childCount === 1) {
      this.cancelInternal_(err);
    } else {
      var callbackEntry = this.callbackEntries_.splice(childIndex, 1)[0];
      this.executeCallback_(callbackEntry, CancellablePromise.State_.REJECTED, err);
    }
  }
};

/**
 * Adds a callback entry to the current Promise, and schedules callback
 * execution if the Promise has already been resolved.
 *
 * @param {CancellablePromise.CallbackEntry_} callbackEntry Record containing
 *     {@code onFulfilled} and {@code onRejected} callbacks to execute after
 *     the Promise is resolved.
 * @private
 */
CancellablePromise.prototype.addCallbackEntry_ = function (callbackEntry) {
  if ((!this.callbackEntries_ || !this.callbackEntries_.length) && (this.state_ === CancellablePromise.State_.FULFILLED || this.state_ === CancellablePromise.State_.REJECTED)) {
    this.scheduleCallbacks_();
  }
  if (!this.callbackEntries_) {
    this.callbackEntries_ = [];
  }
  this.callbackEntries_.push(callbackEntry);
};

/**
 * Creates a child Promise and adds it to the callback entry list. The result of
 * the child Promise is determined by the state of the parent Promise and the
 * result of the {@code onFulfilled} or {@code onRejected} callbacks as
 * specified in the Promise resolution procedure.
 *
 * @see http://promisesaplus.com/#the__method
 *
 * @param {?function(this:THIS, TYPE):
 *          (RESULT|CancellablePromise.<RESULT>|Thenable)} onFulfilled A callback that
 *     will be invoked if the Promise is fullfilled, or null.
 * @param {?function(this:THIS, *): *} onRejected A callback that will be
 *     invoked if the Promise is rejected, or null.
 * @param {THIS=} opt_context An optional execution context for the callbacks.
 *     in the default calling context.
 * @return {!CancellablePromise} The child Promise.
 * @template RESULT,THIS
 * @private
 */
CancellablePromise.prototype.addChildPromise_ = function (onFulfilled, onRejected, opt_context) {

  var callbackEntry = {
    child: null,
    onFulfilled: null,
    onRejected: null
  };

  callbackEntry.child = new CancellablePromise(function (resolve, reject) {
    // Invoke onFulfilled, or resolve with the parent's value if absent.
    callbackEntry.onFulfilled = onFulfilled ? function (value) {
      try {
        var result = onFulfilled.call(opt_context, value);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    } : resolve;

    // Invoke onRejected, or reject with the parent's reason if absent.
    callbackEntry.onRejected = onRejected ? function (reason) {
      try {
        var result = onRejected.call(opt_context, reason);
        if (!(0, _metal.isDef)(result) && reason.IS_CANCELLATION_ERROR) {
          // Propagate cancellation to children if no other result is returned.
          reject(reason);
        } else {
          resolve(result);
        }
      } catch (err) {
        reject(err);
      }
    } : reject;
  });

  callbackEntry.child.parent_ = this;
  this.addCallbackEntry_(
  /** @type {CancellablePromise.CallbackEntry_} */callbackEntry);
  return callbackEntry.child;
};

/**
 * Unblocks the Promise and fulfills it with the given value.
 *
 * @param {TYPE} value
 * @private
 */
CancellablePromise.prototype.unblockAndFulfill_ = function (value) {
  if (this.state_ !== CancellablePromise.State_.BLOCKED) {
    throw new Error('CancellablePromise is not blocked.');
  }
  this.state_ = CancellablePromise.State_.PENDING;
  this.resolve_(CancellablePromise.State_.FULFILLED, value);
};

/**
 * Unblocks the Promise and rejects it with the given rejection reason.
 *
 * @param {*} reason
 * @private
 */
CancellablePromise.prototype.unblockAndReject_ = function (reason) {
  if (this.state_ !== CancellablePromise.State_.BLOCKED) {
    throw new Error('CancellablePromise is not blocked.');
  }
  this.state_ = CancellablePromise.State_.PENDING;
  this.resolve_(CancellablePromise.State_.REJECTED, reason);
};

/**
 * Attempts to resolve a Promise with a given resolution state and value. This
 * is a no-op if the given Promise has already been resolved.
 *
 * If the given result is a Thenable (such as another Promise), the Promise will
 * be resolved with the same state and result as the Thenable once it is itself
 * resolved.
 *
 * If the given result is not a Thenable, the Promise will be fulfilled or
 * rejected with that result based on the given state.
 *
 * @see http://promisesaplus.com/#the_promise_resolution_procedure
 *
 * @param {CancellablePromise.State_} state
 * @param {*} x The result to apply to the Promise.
 * @private
 */
CancellablePromise.prototype.resolve_ = function (state, x) {
  if (this.state_ !== CancellablePromise.State_.PENDING) {
    return;
  }

  if (this === x) {
    state = CancellablePromise.State_.REJECTED;
    x = new TypeError('CancellablePromise cannot resolve to itself');
  } else if (Thenable.isImplementedBy(x)) {
    x = /** @type {!Thenable} */x;
    this.state_ = CancellablePromise.State_.BLOCKED;
    x.then(this.unblockAndFulfill_, this.unblockAndReject_, this);
    return;
  } else if ((0, _metal.isObject)(x)) {
    try {
      var then = x.then;
      if ((0, _metal.isFunction)(then)) {
        this.tryThen_(x, then);
        return;
      }
    } catch (e) {
      state = CancellablePromise.State_.REJECTED;
      x = e;
    }
  }

  this.result_ = x;
  this.state_ = state;
  this.scheduleCallbacks_();

  if (state === CancellablePromise.State_.REJECTED && !x.IS_CANCELLATION_ERROR) {
    CancellablePromise.addUnhandledRejection_(this, x);
  }
};

/**
 * Attempts to call the {@code then} method on an object in the hopes that it is
 * a Promise-compatible instance. This allows interoperation between different
 * Promise implementations, however a non-compliant object may cause a Promise
 * to hang indefinitely. If the {@code then} method throws an exception, the
 * dependent Promise will be rejected with the thrown value.
 *
 * @see http://promisesaplus.com/#point-70
 *
 * @param {Thenable} thenable An object with a {@code then} method that may be
 *     compatible with the Promise/A+ specification.
 * @param {!Function} then The {@code then} method of the Thenable object.
 * @private
 */
CancellablePromise.prototype.tryThen_ = function (thenable, then) {
  this.state_ = CancellablePromise.State_.BLOCKED;
  var promise = this;
  var called = false;

  var resolve = function resolve(value) {
    if (!called) {
      called = true;
      promise.unblockAndFulfill_(value);
    }
  };

  var reject = function reject(reason) {
    if (!called) {
      called = true;
      promise.unblockAndReject_(reason);
    }
  };

  try {
    then.call(thenable, resolve, reject);
  } catch (e) {
    reject(e);
  }
};

/**
 * Executes the pending callbacks of a resolved Promise after a timeout.
 *
 * Section 2.2.4 of the Promises/A+ specification requires that Promise
 * callbacks must only be invoked from a call stack that only contains Promise
 * implementation code, which we accomplish by invoking callback execution after
 * a timeout. If {@code startExecution_} is called multiple times for the same
 * Promise, the callback chain will be evaluated only once. Additional callbacks
 * may be added during the evaluation phase, and will be executed in the same
 * event loop.
 *
 * All Promises added to the waiting list during the same browser event loop
 * will be executed in one batch to avoid using a separate timeout per Promise.
 *
 * @private
 */
CancellablePromise.prototype.scheduleCallbacks_ = function () {
  if (!this.executing_) {
    this.executing_ = true;
    _metal.async.run(this.executeCallbacks_, this);
  }
};

/**
 * Executes all pending callbacks for this Promise.
 *
 * @private
 */
CancellablePromise.prototype.executeCallbacks_ = function () {
  while (this.callbackEntries_ && this.callbackEntries_.length) {
    var entries = this.callbackEntries_;
    this.callbackEntries_ = [];

    for (var i = 0; i < entries.length; i++) {
      this.executeCallback_(entries[i], this.state_, this.result_);
    }
  }
  this.executing_ = false;
};

/**
 * Executes a pending callback for this Promise. Invokes an {@code onFulfilled}
 * or {@code onRejected} callback based on the resolved state of the Promise.
 *
 * @param {!CancellablePromise.CallbackEntry_} callbackEntry An entry containing the
 *     onFulfilled and/or onRejected callbacks for this step.
 * @param {CancellablePromise.State_} state The resolution status of the Promise,
 *     either FULFILLED or REJECTED.
 * @param {*} result The resolved result of the Promise.
 * @private
 */
CancellablePromise.prototype.executeCallback_ = function (callbackEntry, state, result) {
  if (state === CancellablePromise.State_.FULFILLED) {
    callbackEntry.onFulfilled(result);
  } else {
    this.removeUnhandledRejection_();
    callbackEntry.onRejected(result);
  }
};

/**
 * Marks this rejected Promise as having being handled. Also marks any parent
 * Promises in the rejected state as handled. The rejection handler will no
 * longer be invoked for this Promise (if it has not been called already).
 *
 * @private
 */
CancellablePromise.prototype.removeUnhandledRejection_ = function () {
  var p;
  if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
    for (p = this; p && p.unhandledRejectionId_; p = p.parent_) {
      clearTimeout(p.unhandledRejectionId_);
      p.unhandledRejectionId_ = 0;
    }
  } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
    for (p = this; p && p.hadUnhandledRejection_; p = p.parent_) {
      p.hadUnhandledRejection_ = false;
    }
  }
};

/**
 * Marks this rejected Promise as unhandled. If no {@code onRejected} callback
 * is called for this Promise before the {@code UNHANDLED_REJECTION_DELAY}
 * expires, the reason will be passed to the unhandled rejection handler. The
 * handler typically rethrows the rejection reason so that it becomes visible in
 * the developer console.
 *
 * @param {!CancellablePromise} promise The rejected Promise.
 * @param {*} reason The Promise rejection reason.
 * @private
 */
CancellablePromise.addUnhandledRejection_ = function (promise, reason) {
  if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
    promise.unhandledRejectionId_ = setTimeout(function () {
      CancellablePromise.handleRejection_.call(null, reason);
    }, CancellablePromise.UNHANDLED_REJECTION_DELAY);
  } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
    promise.hadUnhandledRejection_ = true;
    _metal.async.run(function () {
      if (promise.hadUnhandledRejection_) {
        CancellablePromise.handleRejection_.call(null, reason);
      }
    });
  }
};

/**
 * A method that is invoked with the rejection reasons for Promises that are
 * rejected but have no {@code onRejected} callbacks registered yet.
 * @type {function(*)}
 * @private
 */
CancellablePromise.handleRejection_ = _metal.async.throwException;

/**
 * Sets a handler that will be called with reasons from unhandled rejected
 * Promises. If the rejected Promise (or one of its descendants) has an
 * {@code onRejected} callback registered, the rejection will be considered
 * handled, and the rejection handler will not be called.
 *
 * By default, unhandled rejections are rethrown so that the error may be
 * captured by the developer console or a {@code window.onerror} handler.
 *
 * @param {function(*)} handler A function that will be called with reasons from
 *     rejected Promises. Defaults to {@code async.throwException}.
 */
CancellablePromise.setUnhandledRejectionHandler = function (handler) {
  CancellablePromise.handleRejection_ = handler;
};

/**
 * Error used as a rejection reason for canceled Promises.
 *
 * @param {string=} opt_message
 * @constructor
 * @extends {Error}
 * @final
 */
CancellablePromise.CancellationError = function (_Error) {
  _inherits(_class, _Error);

  function _class(opt_message) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, _Error.call(this, opt_message));

    if (opt_message) {
      _this.message = opt_message;
    }
    return _this;
  }

  return _class;
}(Error);

/** @override */
CancellablePromise.CancellationError.prototype.name = 'cancel';

exports.CancellablePromise = CancellablePromise;
exports.default = CancellablePromise;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _metal = __webpack_require__(0);

var _metal2 = _interopRequireDefault(_metal);

var _StorageMechanism = __webpack_require__(12);

var _StorageMechanism2 = _interopRequireDefault(_StorageMechanism);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {

	/**
  * Provides a convenient API for data persistence using a selected data
  * storage mechanism.
  * @param {!StorageMechanism} mechanism The underlying storage mechanism.
  * @constructor
  */
	function Storage(mechanism) {
		_classCallCheck(this, Storage);

		assertMechanismDefAndNotNull(mechanism);
		assertMechanismInstanceOf(mechanism);

		/**
   * The mechanism used to persist key-value pairs.
   * @type {StorageMechanism}
   * @protected
   */
		this.mechanism = mechanism;
	}

	/**
  * Clear all items from the data storage.
  */


	_createClass(Storage, [{
		key: 'clear',
		value: function clear() {
			this.mechanism.clear();
		}

		/**
   * Sets an item in the data storage.
   * @param {string} key The key to set.
   * @param {*} value The value to serialize to a string and save.
   */

	}, {
		key: 'set',
		value: function set(key, value) {
			if (!_metal2.default.isDef(value)) {
				this.mechanism.remove(key);
				return;
			}
			this.mechanism.set(key, JSON.stringify(value));
		}

		/**
   * Gets an item from the data storage.
   * @param {string} key The key to get.
   * @return {*} Deserialized value or undefined if not found.
   */

	}, {
		key: 'get',
		value: function get(key) {
			var json;
			try {
				json = this.mechanism.get(key);
			} catch (e) {
				return undefined;
			}
			if (_metal2.default.isNull(json)) {
				return undefined;
			}
			try {
				return JSON.parse(json);
			} catch (e) {
				throw Storage.ErrorCode.INVALID_VALUE;
			}
		}

		/**
   * Returns the list of keys stored in the Storage object.
   * @param {!Array<string>} keys
   */

	}, {
		key: 'keys',
		value: function keys() {
			return this.mechanism.keys();
		}

		/**
   * Removes an item from the data storage.
   * @param {string} key The key to remove.
   */

	}, {
		key: 'remove',
		value: function remove(key) {
			this.mechanism.remove(key);
		}

		/**
   * Returns the number of data items stored in the Storage object.
   * @return {number}
   */

	}, {
		key: 'size',
		value: function size() {
			return this.mechanism.size();
		}

		/**
   * Returns the list of values stored in the Storage object.
   * @param {!Array<string>} values
   */

	}, {
		key: 'values',
		value: function values() {
			var _this = this;

			return this.keys().map(function (key) {
				return _this.get(key);
			});
		}
	}]);

	return Storage;
}();

/**
 * Errors thrown by the storage.
 * @enum {string}
 */


Storage.ErrorCode = {
	INVALID_VALUE: 'Storage: Invalid value was encountered'
};

function assertMechanismDefAndNotNull(mechanism) {
	if (!_metal2.default.isDefAndNotNull(mechanism)) {
		throw Error('Storage mechanism is required');
	}
}

function assertMechanismInstanceOf(mechanism) {
	if (!(mechanism instanceof _StorageMechanism2.default)) {
		throw Error('Storage mechanism must me an implementation of StorageMechanism');
	}
}

exports.default = Storage;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalStorageMechanism = exports.StorageMechanism = exports.Storage = undefined;

var _Storage = __webpack_require__(40);

var _Storage2 = _interopRequireDefault(_Storage);

var _StorageMechanism = __webpack_require__(12);

var _StorageMechanism2 = _interopRequireDefault(_StorageMechanism);

var _LocalStorageMechanism = __webpack_require__(42);

var _LocalStorageMechanism2 = _interopRequireDefault(_LocalStorageMechanism);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Storage = _Storage2.default;
exports.StorageMechanism = _StorageMechanism2.default;
exports.LocalStorageMechanism = _LocalStorageMechanism2.default;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StorageMechanism2 = __webpack_require__(12);

var _StorageMechanism3 = _interopRequireDefault(_StorageMechanism2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Abstract interface for storing and retrieving data using some persistence
 * mechanism.
 * @constructor
 */
var LocalStorageMechanism = function (_StorageMechanism) {
	_inherits(LocalStorageMechanism, _StorageMechanism);

	function LocalStorageMechanism() {
		_classCallCheck(this, LocalStorageMechanism);

		return _possibleConstructorReturn(this, (LocalStorageMechanism.__proto__ || Object.getPrototypeOf(LocalStorageMechanism)).apply(this, arguments));
	}

	_createClass(LocalStorageMechanism, [{
		key: 'storage',

		/**
   * Returns reference for global local storage. by default
   */
		value: function storage() {
			return LocalStorageMechanism.globals.localStorage;
		}

		/**
   * @inheritDoc
   */

	}, {
		key: 'clear',
		value: function clear() {
			this.storage().clear();
		}

		/**
   * @inheritDoc
   */

	}, {
		key: 'keys',
		value: function keys() {
			return Object.keys(this.storage());
		}

		/**
   * @inheritDoc
   */

	}, {
		key: 'get',
		value: function get(key) {
			return this.storage().getItem(key);
		}

		/**
   * @inheritDoc
   */

	}, {
		key: 'remove',


		/**
   * @inheritDoc
   */
		value: function remove(key) {
			this.storage().removeItem(key);
		}

		/**
   * @inheritDoc
   */

	}, {
		key: 'set',
		value: function set(key, value) {
			this.storage().setItem(key, value);
		}

		/**
   * @inheritDoc
   */

	}, {
		key: 'size',
		value: function size() {
			return this.storage().length;
		}
	}], [{
		key: 'isSupported',
		value: function isSupported() {
			return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
		}
	}]);

	return LocalStorageMechanism;
}(_StorageMechanism3.default);

if (LocalStorageMechanism.isSupported()) {
	LocalStorageMechanism.globals = {
		localStorage: window.localStorage
	};
}

exports.default = LocalStorageMechanism;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _metal = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A cached reference to the create function.
 */
var create = Object.create;

/**
 * Case insensitive string Multimap implementation. Allows multiple values for
 * the same key name.
 * @extends {Disposable}
 */

var MultiMap = function (_Disposable) {
	_inherits(MultiMap, _Disposable);

	function MultiMap() {
		_classCallCheck(this, MultiMap);

		var _this = _possibleConstructorReturn(this, _Disposable.call(this));

		_this.keys = create(null);
		_this.values = create(null);
		return _this;
	}

	/**
  * Adds value to a key name.
  * @param {string} name
  * @param {*} value
  * @chainable
  */


	MultiMap.prototype.add = function add(name, value) {
		this.keys[name.toLowerCase()] = name;
		this.values[name.toLowerCase()] = this.values[name.toLowerCase()] || [];
		this.values[name.toLowerCase()].push(value);
		return this;
	};

	/**
  * Clears map names and values.
  * @chainable
  */


	MultiMap.prototype.clear = function clear() {
		this.keys = create(null);
		this.values = create(null);
		return this;
	};

	/**
  * Checks if map contains a value to the key name.
  * @param {string} name
  * @return {boolean}
  * @chainable
  */


	MultiMap.prototype.contains = function contains(name) {
		return name.toLowerCase() in this.values;
	};

	/**
  * @inheritDoc
  */


	MultiMap.prototype.disposeInternal = function disposeInternal() {
		this.values = null;
	};

	/**
  * Creates a `MultiMap` instance from the given object.
  * @param {!Object} obj
  * @return {!MultiMap}
  */


	MultiMap.fromObject = function fromObject(obj) {
		var map = new MultiMap();
		var keys = Object.keys(obj);
		for (var i = 0; i < keys.length; i++) {
			map.set(keys[i], obj[keys[i]]);
		}
		return map;
	};

	/**
  * Gets the first added value from a key name.
  * @param {string} name
  * @return {*}
  * @chainable
  */


	MultiMap.prototype.get = function get(name) {
		var values = this.values[name.toLowerCase()];
		if (values) {
			return values[0];
		}
	};

	/**
  * Gets all values from a key name.
  * @param {string} name
  * @return {Array.<*>}
  */


	MultiMap.prototype.getAll = function getAll(name) {
		return this.values[name.toLowerCase()];
	};

	/**
  * Returns true if the map is empty, false otherwise.
  * @return {boolean}
  */


	MultiMap.prototype.isEmpty = function isEmpty() {
		return this.size() === 0;
	};

	/**
  * Gets array of key names.
  * @return {Array.<string>}
  */


	MultiMap.prototype.names = function names() {
		var _this2 = this;

		return Object.keys(this.values).map(function (key) {
			return _this2.keys[key];
		});
	};

	/**
  * Removes all values from a key name.
  * @param {string} name
  * @chainable
  */


	MultiMap.prototype.remove = function remove(name) {
		delete this.keys[name.toLowerCase()];
		delete this.values[name.toLowerCase()];
		return this;
	};

	/**
  * Sets the value of a key name. Relevant to replace the current values with
  * a new one.
  * @param {string} name
  * @param {*} value
  * @chainable
  */


	MultiMap.prototype.set = function set(name, value) {
		this.keys[name.toLowerCase()] = name;
		this.values[name.toLowerCase()] = [value];
		return this;
	};

	/**
  * Gets the size of the map key names.
  * @return {number}
  */


	MultiMap.prototype.size = function size() {
		return this.names().length;
	};

	/**
  * Returns the parsed values as a string.
  * @return {string}
  */


	MultiMap.prototype.toString = function toString() {
		return JSON.stringify(this.values);
	};

	return MultiMap;
}(_metal.Disposable);

exports.default = MultiMap;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _metal = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Generic tree node data structure with arbitrary number of child nodes.
 * @param {V} value Value.
 * @constructor
 */
var TreeNode = function () {
	function TreeNode(value) {
		_classCallCheck(this, TreeNode);

		/**
   * The value.
   * @private {V}
   */
		this.value_ = value;

		/**
   * Reference to the parent node or null if it has no parent.
   * @private {TreeNode}
   */
		this.parent_ = null;

		/**
   * Child nodes or null in case of leaf node.
   * @private {Array<!TreeNode>}
   */
		this.children_ = null;
	}

	/**
  * Appends a child node to this node.
  * @param {!TreeNode} child Orphan child node.
  */


	TreeNode.prototype.addChild = function addChild(child) {
		assertChildHasNoParent(child);
		child.setParent(this);
		this.children_ = this.children_ || [];
		this.children_.push(child);
	};

	/**
  * Tells whether this node is the ancestor of the given node.
  * @param {!TreeNode} node A node.
  * @return {boolean} Whether this node is the ancestor of {@code node}.
  */


	TreeNode.prototype.contains = function contains(node) {
		var current = node.getParent();
		while (current) {
			if (current === this) {
				return true;
			}
			current = current.getParent();
		}
		return false;
	};

	/**
  * @return {!Array<TreeNode>} All ancestor nodes in bottom-up order.
  */


	TreeNode.prototype.getAncestors = function getAncestors() {
		var ancestors = [];
		var node = this.getParent();
		while (node) {
			ancestors.push(node);
			node = node.getParent();
		}
		return ancestors;
	};

	/**
  * Gets the child node of this node at the given index.
  * @param {number} index Child index.
  * @return {?TreeNode} The node at the given index
  * or null if not found.
  */


	TreeNode.prototype.getChildAt = function getChildAt(index) {
		return this.getChildren()[index] || null;
	};

	/**
  * @return {?Array<!TreeNode>} Child nodes or null in case of leaf node.
  */


	TreeNode.prototype.getChildren = function getChildren() {
		return this.children_ || TreeNode.EMPTY_ARRAY;
	};

	/**
  * @return {number} The number of children.
  */


	TreeNode.prototype.getChildCount = function getChildCount() {
		return this.getChildren().length;
	};

	/**
  * @return {number} The number of ancestors of the node.
  */


	TreeNode.prototype.getDepth = function getDepth() {
		var depth = 0;
		var node = this;
		while (node.getParent()) {
			depth++;
			node = node.getParent();
		}
		return depth;
	};

	/**
  * @return {?TreeNode} Parent node or null if it has no parent.
  */


	TreeNode.prototype.getParent = function getParent() {
		return this.parent_;
	};

	/**
  * @return {!TreeNode} The root of the tree structure, i.e. the farthest
  * ancestor of the node or the node itself if it has no parents.
  */


	TreeNode.prototype.getRoot = function getRoot() {
		var root = this;
		while (root.getParent()) {
			root = root.getParent();
		}
		return root;
	};

	/**
  * Gets the value.
  * @return {V} The value.
  */


	TreeNode.prototype.getValue = function getValue() {
		return this.value_;
	};

	/**
  * @return {boolean} Whether the node is a leaf node.
  */


	TreeNode.prototype.isLeaf = function isLeaf() {
		return !this.getChildCount();
	};

	/**
  * Removes the given child node of this node.
  * @param {TreeNode} child The node to remove.
  * @return {TreeNode} The removed node if any, null otherwise.
  */


	TreeNode.prototype.removeChild = function removeChild(child) {
		if (_metal.array.remove(this.getChildren(), child)) {
			return child;
		}
		return null;
	};

	/**
  * Sets the parent node of this node. The callers must ensure that the
  * parent node and only that has this node among its children.
  * @param {TreeNode} parent The parent to set. If null, the node will be
  * detached from the tree.
  * @protected
  */


	TreeNode.prototype.setParent = function setParent(parent) {
		this.parent_ = parent;
	};

	/**
  * Traverses the subtree. The first callback starts with this node,
  * and visits the descendant nodes depth-first, in preorder.
  * The second callback, starts with deepest child then visits
  * the ancestor nodes depth-first, in postorder. E.g.
  *
  *  	 A
  *    / \
  *   B   C
  *  /   / \
  * D   E   F
  *
  * preorder -> ['A', 'B', 'D', 'C', 'E', 'F']
  * postorder -> ['D', 'B', 'E', 'F', 'C', 'A']
  *
  * @param {function=} opt_preorderFn The callback to execute when visiting a node.
  * @param {function=} opt_postorderFn The callback to execute before leaving a node.
  */


	TreeNode.prototype.traverse = function traverse(opt_preorderFn, opt_postorderFn) {
		if (opt_preorderFn) {
			opt_preorderFn(this);
		}
		this.getChildren().forEach(function (child) {
			return child.traverse(opt_preorderFn, opt_postorderFn);
		});
		if (opt_postorderFn) {
			opt_postorderFn(this);
		}
	};

	return TreeNode;
}();

/**
 * Constant for empty array to avoid unnecessary allocations.
 * @private
 */


TreeNode.EMPTY_ARRAY = [];

/**
 * Asserts that child has no parent.
 * @param {TreeNode} child A child.
 * @private
 */
var assertChildHasNoParent = function assertChildHasNoParent(child) {
	if (child.getParent()) {
		throw new Error('Cannot add child with parent.');
	}
};

exports.default = TreeNode;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _metal = __webpack_require__(0);

var _parse = __webpack_require__(46);

var _parse2 = _interopRequireDefault(_parse);

var _metalStructs = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parseFn_ = _parse2.default;

var Uri = function () {

	/**
  * This class contains setters and getters for the parts of the URI.
  * The following figure displays an example URIs and their component parts.
  *
  *                                  path
  *	                             ┌───┴────┐
  *	  abc://example.com:123/path/data?key=value#fragid1
  *	  └┬┘   └────┬────┘ └┬┘           └───┬───┘ └──┬──┘
  * protocol  hostname  port            search    hash
  *          └──────┬───────┘
  *                host
  *
  * @param {*=} opt_uri Optional string URI to parse
  * @constructor
  */
	function Uri() {
		var opt_uri = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

		_classCallCheck(this, Uri);

		this.url = Uri.parse(this.maybeAddProtocolAndHostname_(opt_uri));
	}

	/**
  * Adds parameters to uri from a <code>MultiMap</code> as source.
  * @param {MultiMap} multimap The <code>MultiMap</code> containing the
  *   parameters.
  * @protected
  * @chainable
  */


	_createClass(Uri, [{
		key: 'addParametersFromMultiMap',
		value: function addParametersFromMultiMap(multimap) {
			var _this = this;

			multimap.names().forEach(function (name) {
				multimap.getAll(name).forEach(function (value) {
					_this.addParameterValue(name, value);
				});
			});
			return this;
		}

		/**
   * Adds the value of the named query parameters.
   * @param {string} key The parameter to set.
   * @param {*} value The new value. Will be explicitly casted to String.
   * @chainable
   */

	}, {
		key: 'addParameterValue',
		value: function addParameterValue(name, value) {
			this.ensureQueryInitialized_();
			if ((0, _metal.isDef)(value)) {
				value = String(value);
			}
			this.query.add(name, value);
			return this;
		}

		/**
   * Adds the values of the named query parameter.
   * @param {string} key The parameter to set.
   * @param {*} value The new value.
   * @chainable
   */

	}, {
		key: 'addParameterValues',
		value: function addParameterValues(name, values) {
			var _this2 = this;

			values.forEach(function (value) {
				return _this2.addParameterValue(name, value);
			});
			return this;
		}

		/**
   * Ensures query internal map is initialized and synced with initial value
   * extracted from URI search part.
   * @protected
   */

	}, {
		key: 'ensureQueryInitialized_',
		value: function ensureQueryInitialized_() {
			var _this3 = this;

			if (this.query) {
				return;
			}
			this.query = new _metalStructs.MultiMap();
			var search = this.url.search;
			if (search) {
				search.substring(1).split('&').forEach(function (param) {
					var _param$split = param.split('='),
					    _param$split2 = _slicedToArray(_param$split, 2),
					    key = _param$split2[0],
					    value = _param$split2[1];

					if ((0, _metal.isDef)(value)) {
						value = Uri.urlDecode(value);
					}
					_this3.addParameterValue(key, value);
				});
			}
		}

		/**
   * Gets the hash part of uri.
   * @return {string}
   */

	}, {
		key: 'getHash',
		value: function getHash() {
			return this.url.hash || '';
		}

		/**
   * Gets the host part of uri. E.g. <code>[hostname]:[port]</code>.
   * @return {string}
   */

	}, {
		key: 'getHost',
		value: function getHost() {
			var host = this.getHostname();
			if (host) {
				var port = this.getPort();
				if (port && port !== '80') {
					host += ':' + port;
				}
			}
			return host;
		}

		/**
   * Gets the hostname part of uri without protocol and port.
   * @return {string}
   */

	}, {
		key: 'getHostname',
		value: function getHostname() {
			var hostname = this.url.hostname;
			if (hostname === Uri.HOSTNAME_PLACEHOLDER) {
				return '';
			}
			return hostname;
		}

		/**
   * Gets the origin part of uri. E.g. <code>http://[hostname]:[port]</code>.
   * @return {string}
   */

	}, {
		key: 'getOrigin',
		value: function getOrigin() {
			var host = this.getHost();
			if (host) {
				return this.getProtocol() + '//' + host;
			}
			return '';
		}

		/**
   * Returns the first value for a given parameter or undefined if the given
   * parameter name does not appear in the query string.
   * @param {string} paramName Unescaped parameter name.
   * @return {string|undefined} The first value for a given parameter or
   *   undefined if the given parameter name does not appear in the query
   *   string.
   */

	}, {
		key: 'getParameterValue',
		value: function getParameterValue(name) {
			this.ensureQueryInitialized_();
			return this.query.get(name);
		}

		/**
   * Returns the value<b>s</b> for a given parameter as a list of decoded
   * query parameter values.
   * @param {string} name The parameter to get values for.
   * @return {!Array<?>} The values for a given parameter as a list of decoded
   *   query parameter values.
   */

	}, {
		key: 'getParameterValues',
		value: function getParameterValues(name) {
			this.ensureQueryInitialized_();
			return this.query.getAll(name);
		}

		/**
   * Returns the name<b>s</b> of the parameters.
   * @return {!Array<string>} The names for the parameters as a list of
   *   strings.
   */

	}, {
		key: 'getParameterNames',
		value: function getParameterNames() {
			this.ensureQueryInitialized_();
			return this.query.names();
		}

		/**
   * Gets the function currently being used to parse URIs.
   * @return {!function()}
   */

	}, {
		key: 'getPathname',


		/**
   * Gets the pathname part of uri.
   * @return {string}
   */
		value: function getPathname() {
			return this.url.pathname;
		}

		/**
   * Gets the port number part of uri as string.
   * @return {string}
   */

	}, {
		key: 'getPort',
		value: function getPort() {
			return this.url.port;
		}

		/**
   * Gets the protocol part of uri. E.g. <code>http:</code>.
   * @return {string}
   */

	}, {
		key: 'getProtocol',
		value: function getProtocol() {
			return this.url.protocol;
		}

		/**
   * Gets the search part of uri. Search value is retrieved from query
   * parameters.
   * @return {string}
   */

	}, {
		key: 'getSearch',
		value: function getSearch() {
			var _this4 = this;

			var search = '';
			var querystring = '';
			this.getParameterNames().forEach(function (name) {
				_this4.getParameterValues(name).forEach(function (value) {
					querystring += name;
					if ((0, _metal.isDef)(value)) {
						querystring += '=' + encodeURIComponent(value);
					}
					querystring += '&';
				});
			});
			querystring = querystring.slice(0, -1);
			if (querystring) {
				search += '?' + querystring;
			}
			return search;
		}

		/**
   * Checks if uri contains the parameter.
   * @param {string} name
   * @return {boolean}
   */

	}, {
		key: 'hasParameter',
		value: function hasParameter(name) {
			this.ensureQueryInitialized_();
			return this.query.contains(name);
		}

		/**
   * Makes this URL unique by adding a random param to it. Useful for avoiding
   * cache.
   */

	}, {
		key: 'makeUnique',
		value: function makeUnique() {
			this.setParameterValue(Uri.RANDOM_PARAM, _metal.string.getRandomString());
			return this;
		}

		/**
   * Maybe adds protocol and a hostname placeholder on a parial URI if needed.
   * Relevent for compatibility with <code>URL</code> native object.
   * @param {string=} opt_uri
   * @return {string} URI with protocol and hostname placeholder.
   */

	}, {
		key: 'maybeAddProtocolAndHostname_',
		value: function maybeAddProtocolAndHostname_(opt_uri) {
			var url = opt_uri;
			if (opt_uri.indexOf('://') === -1 && opt_uri.indexOf('javascript:') !== 0) {
				// jshint ignore:line

				url = Uri.DEFAULT_PROTOCOL;
				if (opt_uri[0] !== '/' || opt_uri[1] !== '/') {
					url += '//';
				}

				switch (opt_uri.charAt(0)) {
					case '.':
					case '?':
					case '#':
						url += Uri.HOSTNAME_PLACEHOLDER;
						url += '/';
						url += opt_uri;
						break;
					case '':
					case '/':
						if (opt_uri[1] !== '/') {
							url += Uri.HOSTNAME_PLACEHOLDER;
						}
						url += opt_uri;
						break;
					default:
						url += opt_uri;
				}
			}
			return url;
		}

		/**
   * Parses the given uri string into an object.
   * @param {*=} opt_uri Optional string URI to parse
   */

	}, {
		key: 'removeParameter',


		/**
   * Removes the named query parameter.
   * @param {string} name The parameter to remove.
   * @chainable
   */
		value: function removeParameter(name) {
			this.ensureQueryInitialized_();
			this.query.remove(name);
			return this;
		}

		/**
   * Removes uniqueness parameter of the uri.
   * @chainable
   */

	}, {
		key: 'removeUnique',
		value: function removeUnique() {
			this.removeParameter(Uri.RANDOM_PARAM);
			return this;
		}

		/**
   * Sets the hash.
   * @param {string} hash
   * @chainable
   */

	}, {
		key: 'setHash',
		value: function setHash(hash) {
			this.url.hash = hash;
			return this;
		}

		/**
   * Sets the hostname.
   * @param {string} hostname
   * @chainable
   */

	}, {
		key: 'setHostname',
		value: function setHostname(hostname) {
			this.url.hostname = hostname;
			return this;
		}

		/**
   * Sets the value of the named query parameters, clearing previous values
   * for that key.
   * @param {string} key The parameter to set.
   * @param {*} value The new value.
   * @chainable
   */

	}, {
		key: 'setParameterValue',
		value: function setParameterValue(name, value) {
			this.removeParameter(name);
			this.addParameterValue(name, value);
			return this;
		}

		/**
   * Sets the values of the named query parameters, clearing previous values
   * for that key.
   * @param {string} key The parameter to set.
   * @param {*} value The new value.
   * @chainable
   */

	}, {
		key: 'setParameterValues',
		value: function setParameterValues(name, values) {
			var _this5 = this;

			this.removeParameter(name);
			values.forEach(function (value) {
				return _this5.addParameterValue(name, value);
			});
			return this;
		}

		/**
   * Sets the pathname.
   * @param {string} pathname
   * @chainable
   */

	}, {
		key: 'setPathname',
		value: function setPathname(pathname) {
			this.url.pathname = pathname;
			return this;
		}

		/**
   * Sets the port number.
   * @param {*} port Port number.
   * @chainable
   */

	}, {
		key: 'setPort',
		value: function setPort(port) {
			this.url.port = port;
			return this;
		}

		/**
   * Sets the function that will be used for parsing the original string uri
   * into an object.
   * @param {!function()} parseFn
   */

	}, {
		key: 'setProtocol',


		/**
   * Sets the protocol. If missing <code>http:</code> is used as default.
   * @param {string} protocol
   * @chainable
   */
		value: function setProtocol(protocol) {
			this.url.protocol = protocol;
			if (this.url.protocol[this.url.protocol.length - 1] !== ':') {
				this.url.protocol += ':';
			}
			return this;
		}

		/**
   * @return {string} The string form of the url.
   * @override
   */

	}, {
		key: 'toString',
		value: function toString() {
			var href = '';
			var host = this.getHost();
			if (host) {
				href += this.getProtocol() + '//';
			}
			href += host + this.getPathname() + this.getSearch() + this.getHash();
			return href;
		}

		/**
   * Joins the given paths.
   * @param {string} basePath
   * @param {...string} ...paths Any number of paths to be joined with the base url.
   * @static
   */

	}], [{
		key: 'getParseFn',
		value: function getParseFn() {
			return parseFn_;
		}
	}, {
		key: 'parse',
		value: function parse(opt_uri) {
			return parseFn_(opt_uri);
		}
	}, {
		key: 'setParseFn',
		value: function setParseFn(parseFn) {
			parseFn_ = parseFn;
		}
	}, {
		key: 'joinPaths',
		value: function joinPaths(basePath) {
			for (var _len = arguments.length, paths = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				paths[_key - 1] = arguments[_key];
			}

			if (basePath.charAt(basePath.length - 1) === '/') {
				basePath = basePath.substring(0, basePath.length - 1);
			}
			paths = paths.map(function (path) {
				return path.charAt(0) === '/' ? path.substring(1) : path;
			});
			return [basePath].concat(paths).join('/').replace(/\/$/, '');
		}

		/**
   * URL-decodes the string. We need to specially handle '+'s because
   * the javascript library doesn't convert them to spaces.
   * @param {string} str The string to url decode.
   * @return {string} The decoded {@code str}.
   */

	}, {
		key: 'urlDecode',
		value: function urlDecode(str) {
			return decodeURIComponent(str.replace(/\+/g, ' '));
		}
	}]);

	return Uri;
}();

/**
 * Default protocol value.
 * @type {string}
 * @default http:
 * @static
 */


var isSecure = function isSecure() {
	return typeof window !== 'undefined' && window.location && window.location.protocol && window.location.protocol.indexOf('https') === 0;
};

Uri.DEFAULT_PROTOCOL = isSecure() ? 'https:' : 'http:';

/**
 * Hostname placeholder. Relevant to internal usage only.
 * @type {string}
 * @static
 */
Uri.HOSTNAME_PLACEHOLDER = 'hostname' + Date.now();

/**
 * Name used by the param generated by `makeUnique`.
 * @type {string}
 * @static
 */
Uri.RANDOM_PARAM = 'zx';

exports.default = Uri;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _metal = __webpack_require__(0);

var _parseFromAnchor = __webpack_require__(47);

var _parseFromAnchor2 = _interopRequireDefault(_parseFromAnchor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parses the given uri string into an object. The URL function will be used
 * when present, otherwise we'll fall back to the anchor node element.
 * @param {*=} opt_uri Optional string URI to parse
 */
function parse(opt_uri) {
	if ((0, _metal.isFunction)(URL) && URL.length) {
		var url = new URL(opt_uri);

		// Safari Browsers will cap port to the max 16-bit unsigned integer (65535) instead
		// of throwing a TypeError as per spec. It will still keep the port number in the
		// href attribute, so we can use this mismatch to raise the expected exception.
		if (url.port && url.href.indexOf(url.port) === -1) {
			throw new TypeError(opt_uri + ' is not a valid URL');
		}

		return url;
	} else {
		return (0, _parseFromAnchor2.default)(opt_uri);
	}
}

exports.default = parse;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Parses the given uri string into an object.
 * @param {*=} opt_uri Optional string URI to parse
 */

Object.defineProperty(exports, "__esModule", {
	value: true
});
function parseFromAnchor(opt_uri) {
	var link = document.createElement('a');
	link.href = opt_uri;

	if (link.protocol === ':' || !/:/.test(link.href)) {
		throw new TypeError(opt_uri + ' is not a valid URL');
	}

	return {
		hash: link.hash,
		hostname: link.hostname,
		password: link.password,
		pathname: link.pathname[0] === '/' ? link.pathname : '/' + link.pathname,
		port: link.port,
		protocol: link.protocol,
		search: link.search,
		username: link.username
	};
}

exports.default = parseFromAnchor;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(17);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var array = function () {
	function array() {
		_classCallCheck(this, array);
	}

	_createClass(array, null, [{
		key: 'equal',

		/**
   * Checks if the given arrays have the same content.
   * @param {!Array<*>} arr1
   * @param {!Array<*>} arr2
   * @return {boolean}
   */
		value: function equal(arr1, arr2) {
			if (arr1 === arr2) {
				return true;
			}
			if (arr1.length !== arr2.length) {
				return false;
			}
			for (var i = 0; i < arr1.length; i++) {
				if (arr1[i] !== arr2[i]) {
					return false;
				}
			}
			return true;
		}

		/**
   * Returns the first value in the given array that isn't undefined.
   * @param {!Array} arr
   * @return {*}
   */

	}, {
		key: 'firstDefinedValue',
		value: function firstDefinedValue(arr) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] !== undefined) {
					return arr[i];
				}
			}
		}

		/**
   * Transforms the input nested array to become flat.
   * @param {Array.<*|Array.<*>>} arr Nested array to flatten.
   * @param {Array.<*>} opt_output Optional output array.
   * @return {Array.<*>} Flat array.
   */

	}, {
		key: 'flatten',
		value: function flatten(arr, opt_output) {
			var output = opt_output || [];
			for (var i = 0; i < arr.length; i++) {
				if (Array.isArray(arr[i])) {
					array.flatten(arr[i], output);
				} else {
					output.push(arr[i]);
				}
			}
			return output;
		}

		/**
   * Removes the first occurrence of a particular value from an array.
   * @param {Array.<T>} arr Array from which to remove value.
   * @param {T} obj Object to remove.
   * @return {boolean} True if an element was removed.
   * @template T
   */

	}, {
		key: 'remove',
		value: function remove(arr, obj) {
			var i = arr.indexOf(obj);
			var rv = void 0;
			if (rv = i >= 0) {
				array.removeAt(arr, i);
			}
			return rv;
		}

		/**
   * Removes from an array the element at index i
   * @param {Array} arr Array or array like object from which to remove value.
   * @param {number} i The index to remove.
   * @return {boolean} True if an element was removed.
   */

	}, {
		key: 'removeAt',
		value: function removeAt(arr, i) {
			return Array.prototype.splice.call(arr, i, 1).length === 1;
		}

		/**
   * Slices the given array, just like Array.prototype.slice, but this
   * is faster and working on all array-like objects (like arguments).
   * @param {!Object} arr Array-like object to slice.
   * @param {number} start The index that should start the slice.
   * @param {number=} opt_end The index where the slice should end, not
   *   included in the final array. If not given, all elements after the
   *   start index will be included.
   * @return {!Array}
   */

	}, {
		key: 'slice',
		value: function slice(arr, start, opt_end) {
			var sliced = [];
			var end = (0, _core.isDef)(opt_end) ? opt_end : arr.length;
			for (var i = start; i < end; i++) {
				sliced.push(arr[i]);
			}
			return sliced;
		}
	}]);

	return array;
}();

exports.default = array;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {/*!
 * Polyfill from Google's Closure Library.
 * Copyright 2013 The Closure Library Authors. All Rights Reserved.
 */



Object.defineProperty(exports, "__esModule", {
	value: true
});
var async = {};

/**
 * Throw an item without interrupting the current execution context.  For
 * example, if processing a group of items in a loop, sometimes it is useful
 * to report an error while still allowing the rest of the batch to be
 * processed.
 * @param {*} exception
 */
async.throwException = function (exception) {
	// Each throw needs to be in its own context.
	async.nextTick(function () {
		throw exception;
	});
};

/**
 * Fires the provided callback just before the current callstack unwinds, or as
 * soon as possible after the current JS execution context.
 * @param {function(this:THIS)} callback
 * @param {THIS=} opt_context Object to use as the "this value" when calling
 *     the provided function.
 * @template THIS
 */
async.run = function (callback, opt_context) {
	if (!async.run.workQueueScheduled_) {
		// Nothing is currently scheduled, schedule it now.
		async.nextTick(async.run.processWorkQueue);
		async.run.workQueueScheduled_ = true;
	}

	async.run.workQueue_.push(new async.run.WorkItem_(callback, opt_context));
};

/** @private {boolean} */
async.run.workQueueScheduled_ = false;

/** @private {!Array.<!async.run.WorkItem_>} */
async.run.workQueue_ = [];

/**
 * Run any pending async.run work items. This function is not intended
 * for general use, but for use by entry point handlers to run items ahead of
 * async.nextTick.
 */
async.run.processWorkQueue = function () {
	// NOTE: additional work queue items may be pushed while processing.
	while (async.run.workQueue_.length) {
		// Don't let the work queue grow indefinitely.
		var workItems = async.run.workQueue_;
		async.run.workQueue_ = [];
		for (var i = 0; i < workItems.length; i++) {
			var workItem = workItems[i];
			try {
				workItem.fn.call(workItem.scope);
			} catch (e) {
				async.throwException(e);
			}
		}
	}

	// There are no more work items, reset the work queue.
	async.run.workQueueScheduled_ = false;
};

/**
 * @constructor
 * @final
 * @struct
 * @private
 *
 * @param {function()} fn
 * @param {Object|null|undefined} scope
 */
async.run.WorkItem_ = function (fn, scope) {
	/** @const */
	this.fn = fn;
	/** @const */
	this.scope = scope;
};

/**
 * Fires the provided callbacks as soon as possible after the current JS
 * execution context. setTimeout(…, 0) always takes at least 5ms for legacy
 * reasons.
 * @param {function(this:SCOPE)} callback Callback function to fire as soon as
 *     possible.
 * @param {SCOPE=} opt_context Object in whose scope to call the listener.
 * @template SCOPE
 */
async.nextTick = function (callback, opt_context) {
	var cb = callback;
	if (opt_context) {
		cb = callback.bind(opt_context);
	}
	cb = async.nextTick.wrapCallback_(cb);
	// Introduced and currently only supported by IE10.
	// Verify if variable is defined on the current runtime (i.e., node, browser).
	// Can't use typeof enclosed in a function (such as core.isFunction) or an
	// exception will be thrown when the function is called on an environment
	// where the variable is undefined.
	if (typeof setImmediate === 'function') {
		setImmediate(cb);
		return;
	}
	// Look for and cache the custom fallback version of setImmediate.
	if (!async.nextTick.setImmediate_) {
		async.nextTick.setImmediate_ = async.nextTick.getSetImmediateEmulator_();
	}
	async.nextTick.setImmediate_(cb);
};

/**
 * Cache for the setImmediate implementation.
 * @type {function(function())}
 * @private
 */
async.nextTick.setImmediate_ = null;

/**
 * Determines the best possible implementation to run a function as soon as
 * the JS event loop is idle.
 * @return {function(function())} The "setImmediate" implementation.
 * @private
 */
async.nextTick.getSetImmediateEmulator_ = function () {
	// Create a private message channel and use it to postMessage empty messages
	// to ourselves.
	var Channel = void 0;

	// Verify if variable is defined on the current runtime (i.e., node, browser).
	// Can't use typeof enclosed in a function (such as core.isFunction) or an
	// exception will be thrown when the function is called on an environment
	// where the variable is undefined.
	if (typeof MessageChannel === 'function') {
		Channel = MessageChannel;
	}

	// If MessageChannel is not available and we are in a browser, implement
	// an iframe based polyfill in browsers that have postMessage and
	// document.addEventListener. The latter excludes IE8 because it has a
	// synchronous postMessage implementation.
	if (typeof Channel === 'undefined' && typeof window !== 'undefined' && window.postMessage && window.addEventListener) {
		/** @constructor */
		Channel = function Channel() {
			// Make an empty, invisible iframe.
			var iframe = document.createElement('iframe');
			iframe.style.display = 'none';
			iframe.src = '';
			document.documentElement.appendChild(iframe);
			var win = iframe.contentWindow;
			var doc = win.document;
			doc.open();
			doc.write('');
			doc.close();
			var message = 'callImmediate' + Math.random();
			var origin = win.location.protocol + '//' + win.location.host;
			var onmessage = function (e) {
				// Validate origin and message to make sure that this message was
				// intended for us.
				if (e.origin !== origin && e.data !== message) {
					return;
				}
				this.port1.onmessage();
			}.bind(this);
			win.addEventListener('message', onmessage, false);
			this.port1 = {};
			this.port2 = {
				postMessage: function postMessage() {
					win.postMessage(message, origin);
				}
			};
		};
	}
	if (typeof Channel !== 'undefined') {
		var channel = new Channel();
		// Use a fifo linked list to call callbacks in the right order.
		var head = {};
		var tail = head;
		channel.port1.onmessage = function () {
			head = head.next;
			var cb = head.cb;
			head.cb = null;
			cb();
		};
		return function (cb) {
			tail.next = {
				cb: cb
			};
			tail = tail.next;
			channel.port2.postMessage(0);
		};
	}
	// Implementation for IE6-8: Script elements fire an asynchronous
	// onreadystatechange event when inserted into the DOM.
	if (typeof document !== 'undefined' && 'onreadystatechange' in document.createElement('script')) {
		return function (cb) {
			var script = document.createElement('script');
			script.onreadystatechange = function () {
				// Clean up and call the callback.
				script.onreadystatechange = null;
				script.parentNode.removeChild(script);
				script = null;
				cb();
				cb = null;
			};
			document.documentElement.appendChild(script);
		};
	}
	// Fall back to setTimeout with 0. In browsers this creates a delay of 5ms
	// or more.
	return function (cb) {
		setTimeout(cb, 0);
	};
};

/**
 * Helper function that is overrided to protect callbacks with entry point
 * monitor if the application monitors entry points.
 * @param {function()} callback Callback function to fire as soon as possible.
 * @return {function()} The wrapped callback.
 * @private
 */
async.nextTick.wrapCallback_ = function (opt_returnValue) {
	return opt_returnValue;
};

exports.default = async;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60).setImmediate))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

/**
 * A collection of core utility functions.
 * @const
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.abstractMethod = abstractMethod;
exports.disableCompatibilityMode = disableCompatibilityMode;
exports.enableCompatibilityMode = enableCompatibilityMode;
exports.getCompatibilityModeData = getCompatibilityModeData;
exports.getFunctionName = getFunctionName;
exports.getStaticProperty = getStaticProperty;
exports.getUid = getUid;
exports.identityFunction = identityFunction;
exports.isBoolean = isBoolean;
exports.isDef = isDef;
exports.isDefAndNotNull = isDefAndNotNull;
exports.isDocument = isDocument;
exports.isDocumentFragment = isDocumentFragment;
exports.isElement = isElement;
exports.isFunction = isFunction;
exports.isNull = isNull;
exports.isNumber = isNumber;
exports.isWindow = isWindow;
exports.isObject = isObject;
exports.isPromise = isPromise;
exports.isString = isString;
exports.isServerSide = isServerSide;
exports.nullFunction = nullFunction;
var compatibilityModeData_ = void 0;

/**
 * Counter for unique id.
 * @type {Number}
 * @private
 */
var uniqueIdCounter_ = 1;

/**
 * Unique id property prefix.
 * @type {String}
 * @protected
 */
var UID_PROPERTY = exports.UID_PROPERTY = 'core_' + (Math.random() * 1e9 >>> 0);

/**
 * When defining a class Foo with an abstract method bar(), you can do:
 * Foo.prototype.bar = abstractMethod
 *
 * Now if a subclass of Foo fails to override bar(), an error will be thrown
 * when bar() is invoked.
 *
 * @type {!Function}
 * @throws {Error} when invoked to indicate the method should be overridden.
 */
function abstractMethod() {
  throw Error('Unimplemented abstract method');
}

/**
 * Disables Metal.js's compatibility mode.
 */
function disableCompatibilityMode() {
  compatibilityModeData_ = undefined;
}

/**
 * Enables Metal.js's compatibility mode with the following features from rc
 * and 1.x versions:
 *     - Using "key" to reference component instances. In the current version
 *       this should be done via "ref" instead. This allows old code still
 *       using "key" to keep working like before. NOTE: this may cause
 *       problems, since "key" is meant to be used differently. Only use this
 *       if it's not possible to upgrade the code to use "ref" instead.
 * @param {Object=} opt_data Optional object with data to specify more
 *     details, such as:
 *         - renderers {Array} the template renderers that should be in
 *           compatibility mode, either their constructors or strings
 *           representing them (e.g. 'soy' or 'jsx'). By default, all the ones
 *           that extend from IncrementalDomRenderer.
 * @type {Object}
 */
function enableCompatibilityMode() {
  var opt_data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  compatibilityModeData_ = opt_data;
}

/**
 * Returns the data used for compatibility mode, or nothing if it hasn't been
 * enabled.
 * @return {Object}
 */
function getCompatibilityModeData() {
  // Compatibility mode can be set via the __METAL_COMPATIBILITY__ global var.
  if (compatibilityModeData_ === undefined) {
    if (typeof window !== 'undefined' && window.__METAL_COMPATIBILITY__) {
      enableCompatibilityMode(window.__METAL_COMPATIBILITY__);
    }
  }
  return compatibilityModeData_;
}

/**
 * Returns the first argument if it's truthy, or the second otherwise.
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @protected
 */
function getFirstTruthy_(a, b) {
  return a || b;
}

/**
 * Gets the name of the given function. If the current browser doesn't
 * support the `name` property, this will calculate it from the function's
 * content string.
 * @param {!function()} fn
 * @return {string}
 */
function getFunctionName(fn) {
  if (!fn.name) {
    var str = fn.toString();
    fn.name = str.substring(9, str.indexOf('('));
  }
  return fn.name;
}

/**
 * Gets the value of a static property in the given class. The value will be
 * inherited from ancestors as expected, unless a custom merge function is given,
 * which can change how the super classes' value for that property will be merged
 * together.
 * The final merged value will be stored in another property, so that it won't
 * be recalculated even if this function is called multiple times.
 * @param {!function()} ctor Class constructor.
 * @param {string} propertyName Property name to be merged.
 * @param {function(*, *):*=} opt_mergeFn Function that receives the merged
 *     value of the property so far and the next value to be merged to it.
 *     Should return these two merged together. If not passed the final property
 *     will be the first truthy value among ancestors.
 */
function getStaticProperty(ctor, propertyName, opt_mergeFn) {
  var mergedName = propertyName + '_MERGED';
  if (!ctor.hasOwnProperty(mergedName)) {
    var merged = ctor.hasOwnProperty(propertyName) ? ctor[propertyName] : null;
    if (ctor.__proto__ && !ctor.__proto__.isPrototypeOf(Function)) {
      var mergeFn = opt_mergeFn || getFirstTruthy_;
      merged = mergeFn(merged, getStaticProperty(ctor.__proto__, propertyName, mergeFn));
    }
    ctor[mergedName] = merged;
  }
  return ctor[mergedName];
}

/**
 * Gets an unique id. If `opt_object` argument is passed, the object is
 * mutated with an unique id. Consecutive calls with the same object
 * reference won't mutate the object again, instead the current object uid
 * returns. See {@link UID_PROPERTY}.
 * @param {Object=} opt_object Optional object to be mutated with the uid. If
 *     not specified this method only returns the uid.
 * @param {boolean=} opt_noInheritance Optional flag indicating if this
 *     object's uid property can be inherited from parents or not.
 * @throws {Error} when invoked to indicate the method should be overridden.
 */
function getUid(opt_object, opt_noInheritance) {
  if (opt_object) {
    var id = opt_object[UID_PROPERTY];
    if (opt_noInheritance && !opt_object.hasOwnProperty(UID_PROPERTY)) {
      id = null;
    }
    return id || (opt_object[UID_PROPERTY] = uniqueIdCounter_++);
  }
  return uniqueIdCounter_++;
}

/**
 * The identity function. Returns its first argument.
 * @param {*=} opt_returnValue The single value that will be returned.
 * @return {?} The first argument.
 */
function identityFunction(opt_returnValue) {
  return opt_returnValue;
}

/**
 * Returns true if the specified value is a boolean.
 * @param {?} val Variable to test.
 * @return {boolean} Whether variable is boolean.
 */
function isBoolean(val) {
  return typeof val === 'boolean';
}

/**
 * Returns true if the specified value is not undefined.
 * @param {?} val Variable to test.
 * @return {boolean} Whether variable is defined.
 */
function isDef(val) {
  return val !== undefined;
}

/**
 * Returns true if value is not undefined or null.
 * @param {*} val
 * @return {boolean}
 */
function isDefAndNotNull(val) {
  return isDef(val) && !isNull(val);
}

/**
 * Returns true if value is a document.
 * @param {*} val
 * @return {boolean}
 */
function isDocument(val) {
  return val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val.nodeType === 9;
}

/**
 * Returns true if value is a document-fragment.
 * @param {*} val
 * @return {boolean}
 */
function isDocumentFragment(val) {
  return val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val.nodeType === 11;
}

/**
 * Returns true if value is a dom element.
 * @param {*} val
 * @return {boolean}
 */
function isElement(val) {
  return val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val.nodeType === 1;
}

/**
 * Returns true if the specified value is a function.
 * @param {?} val Variable to test.
 * @return {boolean} Whether variable is a function.
 */
function isFunction(val) {
  return typeof val === 'function';
}

/**
 * Returns true if value is null.
 * @param {*} val
 * @return {boolean}
 */
function isNull(val) {
  return val === null;
}

/**
 * Returns true if the specified value is a number.
 * @param {?} val Variable to test.
 * @return {boolean} Whether variable is a number.
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Returns true if value is a window.
 * @param {*} val
 * @return {boolean}
 */
function isWindow(val) {
  return val !== null && val === val.window;
}

/**
 * Returns true if the specified value is an object. This includes arrays
 * and functions.
 * @param {?} val Variable to test.
 * @return {boolean} Whether variable is an object.
 */
function isObject(val) {
  var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
  return type === 'object' && val !== null || type === 'function';
}

/**
 * Returns true if value is a Promise.
 * @param {*} val
 * @return {boolean}
 */
function isPromise(val) {
  return val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && typeof val.then === 'function';
}

/**
 * Returns true if value is a string.
 * @param {*} val
 * @return {boolean}
 */
function isString(val) {
  return typeof val === 'string' || val instanceof String;
}

/**
 * Sets to true if running inside Node.js environment with extra check for
 * `process.browser` to skip Karma runner environment. Karma environment has
 * `process` defined even though it runs on the browser.
 * @return {boolean}
 */
function isServerSide() {
  return typeof process !== 'undefined' && typeof process.env !== 'undefined' && process.env.NODE_ENV !== 'test' && !process.browser;
}

/**
 * Null function used for default values of callbacks, etc.
 * @return {void} Nothing.
 */
function nullFunction() {}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Disposable utility. When inherited provides the `dispose` function to its
 * subclass, which is responsible for disposing of any object references
 * when an instance won't be used anymore. Subclasses should override
 * `disposeInternal` to implement any specific disposing logic.
 * @constructor
 */

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Disposable = function () {
	function Disposable() {
		_classCallCheck(this, Disposable);

		/**
   * Flag indicating if this instance has already been disposed.
   * @type {boolean}
   * @protected
   */
		this.disposed_ = false;
	}

	/**
  * Disposes of this instance's object references. Calls `disposeInternal`.
  */


	_createClass(Disposable, [{
		key: 'dispose',
		value: function dispose() {
			if (!this.disposed_) {
				this.disposeInternal();
				this.disposed_ = true;
			}
		}

		/**
   * Subclasses should override this method to implement any specific
   * disposing logic (like clearing references and calling `dispose` on other
   * disposables).
   */

	}, {
		key: 'disposeInternal',
		value: function disposeInternal() {}

		/**
   * Checks if this instance has already been disposed.
   * @return {boolean}
   */

	}, {
		key: 'isDisposed',
		value: function isDisposed() {
			return this.disposed_;
		}
	}]);

	return Disposable;
}();

exports.default = Disposable;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var object = function () {
	function object() {
		_classCallCheck(this, object);
	}

	_createClass(object, null, [{
		key: 'mixin',

		/**
   * Copies all the members of a source object to a target object.
   * @param {Object} target Target object.
   * @param {...Object} var_args The objects from which values will be copied.
   * @return {Object} Returns the target object reference.
   */
		value: function mixin(target) {
			var key = void 0,
			    source = void 0;
			for (var i = 1; i < arguments.length; i++) {
				source = arguments[i];
				for (key in source) {
					target[key] = source[key];
				}
			}
			return target;
		}

		/**
   * Returns an object based on its fully qualified external name.
   * @param {string} name The fully qualified name.
   * @param {object=} opt_obj The object within which to look; default is
   *     <code>window</code>.
   * @return {?} The value (object or primitive) or, if not found, undefined.
   */

	}, {
		key: 'getObjectByName',
		value: function getObjectByName(name, opt_obj) {
			var scope = opt_obj || window;
			var parts = name.split('.');
			return parts.reduce(function (part, key) {
				return part[key];
			}, scope);
		}

		/**
   * Returns a new object with the same keys as the given one, but with
   * their values set to the return values of the specified function.
   * @param {!Object} obj
   * @param {!function(string, *)} fn
   * @return {!Object}
   */

	}, {
		key: 'map',
		value: function map(obj, fn) {
			var mappedObj = {};
			var keys = Object.keys(obj);
			for (var i = 0; i < keys.length; i++) {
				mappedObj[keys[i]] = fn(keys[i], obj[keys[i]]);
			}
			return mappedObj;
		}

		/**
   * Checks if the two given objects are equal. This is done via a shallow
   * check, including only the keys directly contained by the 2 objects.
   * @return {boolean}
   */

	}, {
		key: 'shallowEqual',
		value: function shallowEqual(obj1, obj2) {
			if (obj1 === obj2) {
				return true;
			}

			var keys1 = Object.keys(obj1);
			var keys2 = Object.keys(obj2);
			if (keys1.length !== keys2.length) {
				return false;
			}

			for (var i = 0; i < keys1.length; i++) {
				if (obj1[keys1[i]] !== obj2[keys1[i]]) {
					return false;
				}
			}
			return true;
		}
	}]);

	return object;
}();

exports.default = object;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var string = function () {
	function string() {
		_classCallCheck(this, string);
	}

	_createClass(string, null, [{
		key: 'caseInsensitiveCompare',

		/**
   * Compares the given strings without taking the case into account.
   * @param {string|number} str1
   * @param {string|number} str2
   * @return {number} Either -1, 0 or 1, according to if the first string is
   *     "smaller", equal or "bigger" than the second given string.
   */
		value: function caseInsensitiveCompare(str1, str2) {
			var test1 = String(str1).toLowerCase();
			var test2 = String(str2).toLowerCase();

			if (test1 < test2) {
				return -1;
			} else if (test1 === test2) {
				return 0;
			} else {
				return 1;
			}
		}

		/**
   * Removes the breaking spaces from the left and right of the string and
   * collapses the sequences of breaking spaces in the middle into single spaces.
   * The original and the result strings render the same way in HTML.
   * @param {string} str A string in which to collapse spaces.
   * @return {string} Copy of the string with normalized breaking spaces.
   */

	}, {
		key: 'collapseBreakingSpaces',
		value: function collapseBreakingSpaces(str) {
			return str.replace(/[\t\r\n ]+/g, ' ').replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, '');
		}

		/**
  * Escapes characters in the string that are not safe to use in a RegExp.
  * @param {*} str The string to escape. If not a string, it will be casted
  *     to one.
  * @return {string} A RegExp safe, escaped copy of {@code s}.
  */

	}, {
		key: 'escapeRegex',
		value: function escapeRegex(str) {
			return String(str).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08');
		}

		/**
  * Returns a string with at least 64-bits of randomness.
  * @return {string} A random string, e.g. sn1s7vb4gcic.
  */

	}, {
		key: 'getRandomString',
		value: function getRandomString() {
			var x = 2147483648;
			return Math.floor(Math.random() * x).toString(36) + Math.abs(Math.floor(Math.random() * x) ^ Date.now()).toString(36);
		}

		/**
   * Calculates the hashcode for a string. The hashcode value is computed by
   * the sum algorithm: s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]. A nice
   * property of using 31 prime is that the multiplication can be replaced by
   * a shift and a subtraction for better performance: 31*i == (i<<5)-i.
   * Modern VMs do this sort of optimization automatically.
   * @param {String} val Target string.
   * @return {Number} Returns the string hashcode.
   */

	}, {
		key: 'hashCode',
		value: function hashCode(val) {
			var hash = 0;
			for (var i = 0, len = val.length; i < len; i++) {
				hash = 31 * hash + val.charCodeAt(i);
				hash %= 0x100000000;
			}
			return hash;
		}

		/**
   * Replaces interval into the string with specified value, e.g.
   * `replaceInterval("abcde", 1, 4, "")` returns "ae".
   * @param {string} str The input string.
   * @param {Number} start Start interval position to be replaced.
   * @param {Number} end End interval position to be replaced.
   * @param {string} value The value that replaces the specified interval.
   * @return {string}
   */

	}, {
		key: 'replaceInterval',
		value: function replaceInterval(str, start, end, value) {
			return str.substring(0, start) + value + str.substring(end);
		}
	}]);

	return string;
}();

exports.default = string;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.3.2 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)(module), __webpack_require__(14)))

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(56);
exports.encode = exports.stringify = __webpack_require__(57);


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14), __webpack_require__(13)))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(59);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(55);
var util = __webpack_require__(62);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(58);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
});
