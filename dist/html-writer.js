"use strict";var BaseWriter=require("./base-writer"),helpers=require("./helpers"),logger=require("./logger");class HtmlWriter extends BaseWriter{getExtension(){return"html"}write(){var a=this.buildHeader(),b=this.converter.getPages();return logger.debug("Generating html: %d pages to generate",b.length),this.converter.getPages().forEach(b=>{var c=helpers.getPageIdFromFilenameOrLink(b.file);a+=`<p class="page" id="${c}"></p><h1>${b.title}</h1>\n`+b.html},this),a+=this.buildFooter(),super.write(this.getFilename(),a)}buildHeader(){var a=`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${this.converter.getOption("title")}</title>
    ${this.getCssTags()}
    <style>${this.getExtraCss()}</style>
    ${this.getJsTags()}
  </head>
  <body id="page-top" class="html-doc">
    <!-- Fixed navbar -->
    <div class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand doc-title" href="#page-top">${this.converter.getOption("title")}</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
          ${this.getLogoImage()}
        </div><!--/.nav-collapse -->
      </div>
    </div>
    <div id="documentation-container" class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="nav-container">
            <div class="nav-inner" id="scroll-spy" style="width: min-content; overflow: auto; top: 60px; bottom: 0; padding 10px 0 10px 0;">
              <span class="toc"></span>
              ${this.converter.getToc().getHtml()}
              ${this.getFooter()}
            </div>
          </div>
        </div>


        <div class="col-md-9">
`;return a}buildFooter(){`
        </div> <!-- /div.col-md-9 -->
      </div> <!-- /div.row -->
    </div> <!-- /div.container -->
  </body>
  <script>
    $('body').scrollspy({ target: '#scroll-spy', offset: 40 })
  </script>
</html>`;return"\n        </div> <!-- /div.col-md-9 -->\n      </div> <!-- /div.row -->\n    </div> <!-- /div.container -->\n  </body>\n  <script>\n    $('body').scrollspy({ target: '#scroll-spy', offset: 40 })\n  </script>\n</html>"}createImageLogoTag(a){return`
              </ul>
                <ul class="nav navbar-nav navbar-right gwc-navbar-right">
                <li><img class="logo-img" src="${a}"></li>
              </ul>`}getFooter(){let a=this.converter.getOption("footer");return a?`<div class="footer">${a}</div>`:""}}module.exports=HtmlWriter;
//# sourceMappingURL=html-writer.js.map