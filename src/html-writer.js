"use strict"

var BaseWriter = require("./base-writer")
  , helpers = require('./helpers')
  , logger = require('./logger')

class HtmlWriter extends BaseWriter {

// https://codepen.io/ncerminara/pen/eKNROb
// https://github.com/ravishankarsrrav/bootstrap4-responsive-sidebar

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

    <nav id="sidebar">
      <div class="sidebar-header">
        ${this.getLogoImage()}
      </div>

      <ul class="list-unstyled components">
        <li>
            <a href="#">Dashboard</a>
        </li>
        <li>
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Menu</a>
            <ul class="collapse list-unstyled" id="homeSubmenu">
                <li>
                    <a href="#">sub-menu1</a>
                </li>
                <li>
                    <a href="#">sub-menu2</a>
                </li>
                <li>
                    <a href="#">sub-menu3</a>
                </li>
            </ul>
        </li>
        <li>
            <a href="#">Settings</a>
        </li>
        
        <li>
            <a href="#">Documentation</a>
        </li>
        <li>
            <a href="#">Contact Us</a>
        </li>
        <li>
            <a href="#">Logout</a>
        </li>
      </ul>
    </nav>

    <div class="container" id="content">

`

/*
        <div class="navbar navbar-default navbar-fixed-top">
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
        */

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
