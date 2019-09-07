'use strict';var dir=require('node-dir'),path=require('path'),fs=require('fs-extra'),util=require('util'),logger=require('./logger'),Promise=require('bluebird');/**
 * Finder class
 */class Finder{/**
   * Search for md files
   *
   * @param {string} wikiPath Path to wiki directory
   * @returns {Promise}
   */static searchMarkdownFiles(a){return new Promise(function(b,c){var d={},e={},f={match:/.md/,exclude:/^_/};dir.readFiles(a,f,function(a,b,c,f){if(!a){d[c]=b;var g=path.basename(c);e[g.substr(0,g.length-3)]=c}f()},function(a){return a?c(a):void(logger.debug(util.format('Found %d markdown files and %d links pointing to them in TOC',Object.keys(d).length,Object.keys(e).length)),b({files:d,aliases:e}))})})}/**
   * Search for a file among multiple directories, ordered by priority
   *
   * @returns {string|null}
   */static searchForFile(a,b){var c=null;return a.some(a=>{var d=path.join(b,a);try{return fs.statSync(d).isFile()&&(c=d)}catch(a){return!1}},this),c}}module.exports=Finder;
//# sourceMappingURL=finder.js.map