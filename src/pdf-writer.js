"use strict"

var wkhtmltopdf = require('wkhtmltopdf')
  , Promise = require("bluebird")
  , helpers = require('./helpers')
  , fs = require('fs-extra')
  , logger = require('./logger')
  , BaseWriter = require('./base-writer')

class PdfWriter extends BaseWriter {

  getExtension() {
    return 'pdf'
  }

  getPageBreaker(pageTitle, pageId) {
    return `<h1 id="${pageId}" style="page-break-before: always !important;">${pageTitle}</h1>`
  }

  write() {

    var html = this.buildHeader(),
        pages = this.converter.getPages(),
        filename = this.getFilename(),
        footer = this.converter.getOption('footer'),
        pdfPageCount = this.converter.getOption('pdfPageCount'),
        self = this

    logger.debug('Generating pdf: %d pages to generate', pages.length)

    pages.forEach(page => {
      var pageId = helpers.getPageIdFromFilenameOrLink(page.file)
      var pdfPage = this.getPageBreaker(page.title, pageId) + page.html
      html += pdfPage
    }, this)

    html += this.buildFooter()

    // @todo test html write
    let stream = fs.createWriteStream("temo_pdv.html");
    stream.once('open', function(fd) {
      stream.write(html);
      stream.end();
    });


    return new Promise(function (resolve, reject) {
      let options = {
        toc : false, outline: true,
        marginLeft: 10, marginRight: 10,
        footerLine: false, footerSpacing: 2.5,
        footerFontSize: 10, pageOffset: 0
      }

      if(footer){
        options.footerLeft = footer
      }

      if(pdfPageCount){
        options.footerRight = "[page]/[toPage]"
      }

      wkhtmltopdf(html, options)
        .on('end', function() {
          logger.info(self.getExtension() + ' file written: %s', filename)
          resolve(filename)
        })
        .on('error', reject)
        .pipe(fs.createWriteStream(filename))
    }.bind(this))
  }

  buildHeader() {

    var htmlHeader = `<!DOCTYPE html>
    ${this.getHeader()}
  <body id="page-top" class="pdf-doc">

    <!-- Cover page -->

    ${this.getLogoImage()}

    <div class='covertitle'>
      <h1>${this.converter.getOption('title')}</h1>
      <p>${this.converter.getOption('subtitle')}</p>
    </div>

    <!-- Cover page -->
    <div class='nav-container'>
      <h1 class='toc'>${this.converter.getOption('tocTitle')}</h1>
    ${this.converter.getToc().getHtml()}
    </div>
`
    return htmlHeader
  }


  buildFooter() {
    var footer = `
  </body>
</html>`

    return footer
  }
  createImageLogoTag(path) {
        return `<img class="coverimg" src="${path}"/>`
  }
}

module.exports = PdfWriter
