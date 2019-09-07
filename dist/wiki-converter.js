"use strict";var Promise=require("bluebird"),fs=require("fs-extra"),path=require("path"),defaults=require("defaults"),GWCMarkdown=require("./markdown"),GWCHtmlWriter=require("./html-writer"),GWCPdfWriter=require("./pdf-writer"),GWCToc=require("./toc"),GWCFinder=require("./finder"),helpers=require("./helpers"),logger=require("./logger");class WikiConverter{/**
   * GWC Constructor
   *
   * @param {string} wiki_path wiki path
   * @param {object} options options object
   * @constructor
   */constructor(a,b){if(!a||!1===fs.statSync(a).isDirectory())throw new TypeError("wiki_path is not a valid directory.");this.wikiPath=a,this.computePaths().computeOptions(b).computeCssFiles().computeJsFiles().checkTocLevel().checkOutputFormat()}generate(){var a=this;return new Promise(function(b,c){GWCFinder.searchMarkdownFiles(a.wikiPath).then(function(d){this.mdFiles=d.files,this.mdAliases=d.aliases,this.markdownConverter=new GWCMarkdown(this.wikiPath,this.mdAliases),this.toc=new GWCToc(a),this.copyAssets();var e=[];return 0<=this.getOption("format").indexOf("html")&&(this.htmlWriter=new GWCHtmlWriter(this),e.push(this.htmlWriter.write())),0<=this.getOption("format").indexOf("pdf")&&(this.pdfWriter=new GWCPdfWriter(this),e.push(this.pdfWriter.write())),Promise.all(e).then(b).catch(c)}.bind(this))}.bind(this))}/**
   * @private
   * @returns {wiki-converter}
   */computePages(){return this.pages=[],this.toc.getItems().forEach(a=>{this.pages.push({title:a.title,file:this.mdAliases[a.pageId],html:this.markdownConverter.convertMarkdownFile(this.mdAliases[a.pageId])})},this),this}getPages(){return this.pages||this.computePages(),this.pages}getMarkdownConverter(){return this.markdownConverter}getMarkdownFiles(){return this.mdFiles}getToc(){return this.toc}/**
   * @private
   * @returns {wiki-converter}
   */computePaths(){return this.assetsPath=path.resolve(path.join(__dirname,"..","assets")),this.cssPath=path.join(this.assetsPath,"css"),this.imagesPath=path.join(this.assetsPath,"images"),this.htmlPath=path.join(this.assetsPath,"html"),this}/**
   * @private
   * @returns {wiki-converter}
   */computeCssFiles(){return this.cssFiles=[path.join(__dirname,"..","node_modules","bootstrap","dist","css","bootstrap.min.css"),path.join(__dirname,"..","node_modules","highlight.js","styles","default.css"),path.join(__dirname,"..","node_modules","highlight.js","styles",this.options.highlightTheme+".css"),path.join(this.cssPath,"doc.css")],this.options.userCssFile&&this.cssFiles.push(path.resolve(this.options.userCssFile)),this}/**
   * @private
   * @returns {wiki-converter}
   */computeJsFiles(){return this.jsFiles=[path.join(__dirname,"..","node_modules","jquery","dist","jquery.min.js"),path.join(__dirname,"..","node_modules","bootstrap","dist","js","bootstrap.min.js")],this.options.userJsFile&&this.jsFiles.push(path.resolve(this.options.userJsFile)),this}copyAssets(){if(this.getOption("disableInlineAssets")){var a=this.getJsFiles().concat(this.getCssFiles());a.forEach(function(a){fs.copySync(a,path.join(this.getOption("output"),path.basename(a)))},this)}}computeOptions(a){var b={title:"Documentation",logoImage:null,footer:null,pdfPageCount:null,format:"html",filename:"documentation",output:path.resolve("./"),tocFile:GWCFinder.searchForFile(["_Toc.html","_Sidebar.html","_Toc.md","_Sidebar.md"],this.wikiPath),tocLevel:3,// between 1 and 4
highlightTheme:"github",userCssFile:null};return this.options=defaults(a,b),this.options.verbose&&(logger.transports.console.level="debug"),logger.debug("gwc launched with options",this.options),this}/**
   * Transform the format string into an array containing one to two elements
   *
   * @returns {string[]}
   */checkOutputFormat(){return"all"===this.options.format?this.options.format=["html","pdf"]:(this.options.format=[this.options.format],this)}checkTocLevel(){return this.options.tocLevel=parseInt(this.options.tocLevel,10),(1>this.options.tocLevel||4<this.options.tocLevel)&&(this.options.tocLevel=3),this}setOption(a,b){return this.options[a]=b,this}getOption(a){return this.options[a]}getTocFile(){return this.getOption("tocFile")}addCssFile(a){return this.cssFiles.push(path.resolve(a)),this}getCssFiles(){return this.cssFiles}getJsFiles(){return this.jsFiles}}Object.defineProperty(WikiConverter,"package",{value:require("../package")}),module.exports=WikiConverter;
//# sourceMappingURL=wiki-converter.js.map