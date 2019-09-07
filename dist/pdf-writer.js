"use strict";var wkhtmltopdf=require("wkhtmltopdf"),Promise=require("bluebird"),helpers=require("./helpers"),fs=require("fs-extra"),logger=require("./logger"),BaseWriter=require("./base-writer");class PdfWriter extends BaseWriter{getExtension(){return"pdf"}getPageBreaker(a,b){return`<h1 id="${b}" style="page-break-before: always !important;">${a}</h1>`}write(){var a=this.buildHeader(),b=this.converter.getPages(),c=this.getFilename(),d=this.converter.getOption("footer"),e=this.converter.getOption("pdfPageCount"),f=this;return logger.debug("Generating pdf: %d pages to generate",b.length),b.forEach(b=>{var c=helpers.getPageIdFromFilenameOrLink(b.file),d=this.getPageBreaker(b.title,c)+b.html;a+=d},this),a+=this.buildFooter(),new Promise(function(b,g){let h={toc:!1,outline:!0,marginLeft:10,marginRight:10,footerLine:!1,footerSpacing:2.5,footerFontSize:10,pageOffset:0};d&&(h.footerLeft=d),e&&(h.footerRight="[page]/[toPage]"),wkhtmltopdf(a,h).on("end",function(){logger.info(f.getExtension()+" file written: %s",c),b(c)}).on("error",g).pipe(fs.createWriteStream(c))}.bind(this))}buildHeader(){var a=`<!DOCTYPE html>
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
  <body id="page-top" class="pdf-doc">

    <!-- Cover page -->

    ${this.getLogoImage()}

    <div class='covertitle'>
      <b>${this.converter.getOption("title")}</b>
    </div>

    <!-- Cover page -->
    <div class='nav-container'>
      <h1 class='toc'></h1>
    ${this.converter.getToc().getHtml()}
    </div>
`;return a}buildFooter(){`
  </body>
</html>`;return"\n  </body>\n</html>"}createImageLogoTag(a){return`<img class="coverimg" src="${a}"/>`}}module.exports=PdfWriter;
//# sourceMappingURL=pdf-writer.js.map