"use strict"

var BaseWriter = require("./base-writer")
  , helpers = require('./helpers')
  , logger = require('./logger')

class HtmlWriter extends BaseWriter {

  getExtension() {
    return 'html'
  }

  write () {
    var html = this.buildHeader(),
        pages = this.converter.getPages()

    logger.debug('Generating html: %d pages to generate', pages.length)

    this.converter.getPages().forEach(page => {
      var pageId = helpers.getPageIdFromFilenameOrLink(page.file)
      html += `<div class="row page"><div class="col" id="${pageId}"><h1>${page.title}</h1>\n` + page.html + "</div></div>"
    }, this)

    html += this.buildFooter()
    return super.write(this.getFilename(), html)
  }

  buildHeader() {

    var htmlHeader = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${this.converter.getOption('title')}</title>
    ${this.getCssTags()}
    <style>${this.getExtraCss()}</style>
    ${this.getJsTags()}
  </head>
  <body>
    <div id="app" class="wrapper">
      <div class="jumbotron">
        <h1>${this.converter.getOption('title')}</h1>
        ${this.getSubtitle()}
      </div>

      <nav class="navbar navbar-dark bg-dark">
        <div class="sidebar-header">
          ${this.getLogoImage()}
        </div>
        ${this.converter.getToc().getHtml()}
      </nav>

      <div class="container-fluid" id="content">

`
   return htmlHeader
  }

  buildFooter() {
    var footer = `
      </div>
    </div>
  </body>
</html>`
    return footer
  }

  createImageLogoTag(path) {
        return `<a class="navbar-brand" href="#"><img class="logo-img" src="${path}" /></a>`
  }

  createSubtitleTag(subtitle) {
    return `<p>${subtitle}</p>`;
  }

  getFooter() {
    let footerOption = this.converter.getOption('footer')
    return footerOption ? `<div class="footer">${footerOption}</div>` : ''
  }

}

module.exports = HtmlWriter
