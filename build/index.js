/*!
 * express-route-fs
 * Copyright(c) 2015 Kristóf Poduszló
 * MIT Licensed
 */
function routeFs(e,r){r=r||{};var t=path.resolve(r.routerDir||"./routes");recursive(t,function(r,i){if(void 0===i)return void console.log("Warning: Routes could not be loaded by express-route-fs.");for(var o=i.length-1;o>=0;o--){var s=i[o],u=path.relative(t,s).split(path.sep).join("/"),n="/"+u.slice(0,-".js".length);if("/index"===n.toLowerCase().substr(-"/index".length)){var a=n.slice(0,-"/index".length);n=a.length>0?a:"/"}e.use(n,require(s))}})}var path=require("path"),recursive=require("recursive-readdir");module.exports=routeFs;