'use strict';const path=require('path');class Helpers{static getPageIdFromFilenameOrLink(a){var b=path.basename(a);return'.md'===b.substr(-3)&&(b=b.substr(0,b.length-3)),b.replace(/([^a-z0-9\-_~.]+)/gi,'')}}module.exports=Helpers;
//# sourceMappingURL=helpers.js.map