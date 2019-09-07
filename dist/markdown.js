'use strict';var marked=require('marked'),highlight=require('highlight.js'),fs=require('fs'),path=require('path'),util=require('util'),datauri=require('datauri').sync,helpers=require('./helpers');class Markdown{constructor(a,b){this.wikiPath=a,this.wikiFileAliases=b,this.tocItems=[],this.firstTocLiClassProcessed=!1,this.setupMainRenderer().setupTocRenderer()}setupMainRenderer(){var a=this;return this.mainRenderer=new marked.Renderer,this.mainRenderer.code=function(a,b){return a=b&&highlight.getLanguage(b)?highlight.highlight(b,a,!0):highlight.highlightAuto(a),`<pre class="hljs">${a.value}</pre>`},this.mainRenderer.link=function(b,c,d){return(!b.match(/^https?:\/\//)||a.isTocLink(b))&&(b='#'+helpers.getPageIdFromFilenameOrLink(b)),`<a href="${b}">${d}</a>`},this.mainRenderer.image=function(b){return b.match(/^https?:\/\//)?util.format('<img src="%s" />',b):(b=path.resolve(a.wikiPath,b),util.format('<img src="%s" />',datauri(b)))},this}setupTocRenderer(){var a=this;return this.tocRenderer=new marked.Renderer,this.tocRenderer.list=function(a,b){var c=b?'ol':'ul';return`<${c} class="nav">${a}</${c}>`},this.tocRenderer.listitem=function(b){a.tocLiCounter+=1;var c=b.match(/^([^<]+)/);return c&&(b='<span>'+b.substr(0,c[0].length)+'</span>'+b.substr(c[0].length)),a.firstTocLiClassProcessed||'<a'!==b.substr(0,2)?`<li>${b}</li>`:(a.firstTocLiClassProcessed=!0,`<li class="active">${b}</li>`)},this.tocRenderer.link=function(b,c,d){let e=helpers.getPageIdFromFilenameOrLink(b);return a.wikiFileAliases[e]&&(a.tocItems.push({title:d,link:b,pageId:e}),b=`#${e}`),`<a href="${b}">${d}</a>`},this}convertTocMarkdownString(a){return{tocHtml:this.convertMarkdownString(a,this.tocRenderer),tocItems:this.tocItems}}convertMarkdownString(a,b){return b=b||this.mainRenderer,marked(this.replaceGithubWikiLinks(a),{renderer:b})}convertMarkdownFile(a){return this.convertMarkdownString(fs.readFileSync(a,{encoding:'utf8'}))}/**
   * @private
   * @returns {Boolean}
   */isTocLink(a){for(let b of this.tocItems)if(b.link==a)return!0;return!1}/**
   * @private
   * @returns {String}
   */replaceGithubWikiLinks(a){// github supports [[...]] declaration of links. find all of them
return a.replace(/\[\[([^\]]+)\]\]/g,function(a,b){// inside of brekets link can be added as:
// - page name only [[Calls]], [[Call-Log]];
// - link title only [[Call Log]];
// - link title and page name [[Call Log|Call-Log]], [[Log|Call Log]].
// search for link title
let c=b.replace(/\|([^\|]+)/,''),d=b.replace(/([^\|]+)\|/,'');// search for page name
return c||(c=b),d||(d=b),d=d.replace(/ /g,'-'),b=`[${c}](${d})`,b})}}module.exports=Markdown;
//# sourceMappingURL=markdown.js.map