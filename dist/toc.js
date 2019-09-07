'use strict';var path=require('path'),fs=require('fs-extra'),util=require('util'),marked=require('marked');class Toc{/**
   *
   * @param {GWC} gwc
   */constructor(a){this.converter=a,this.computeTocParts()}getMarkdown(){return this.toc.tocMd}getHtml(){return this.toc.tocHtml}getItems(){return this.toc.tocItems}/**
   * @private
   */computeTocParts(){this.toc={},this.toc.tocMd=this.getTocFileContents();let a=this.converter.getMarkdownConverter().convertTocMarkdownString(this.toc.tocMd);this.toc.tocHtml=a.tocHtml,this.toc.tocItems=a.tocItems}/**
   * @private
   * @returns {String}
   */getTocFileContents(){var a=this.converter.getTocFile();return a?fs.readFileSync(a,{encoding:'utf8'}):this.genTocFileContents();// if no toc file, generate contents from files
}/**
   * @private
   * @returns {string}
   */genTocFileContents(){return Object.keys(this.converter.getMarkdownFiles()).map(a=>{var b=path.basename(a);return util.format('- [%s](%s)',b,b)}).join('\n')}}module.exports=Toc;
//# sourceMappingURL=toc.js.map