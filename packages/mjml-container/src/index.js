import { MJMLElement, helpers, elements } from 'mjml-core'
import React, { Component } from 'react'

const tagName = 'mj-container'
const defaultMJMLDefinition = {
  attributes: {
    'width': '600px'
  },
  inheritedAttributes: [
    'width'
  ]
}
const postRender = $ => {
  const containerWidth = $('.mj-container').data('width')

  $('.mj-container-outlook-open').each(function () {
    $(this).replaceWith(`<!--[if mso]>
      <table border="0" cellpadding="0" cellspacing="0" width="${containerWidth}" align="center" style="width:${containerWidth}px;"><tr><td>
      <![endif]-->`)
  })

  $('.mj-container-outlook-line').each(function () {
    $(this).replaceWith(`<!--[if mso]>
      </td></tr></table>
      <![endif]-->
      <!--[if mso]>
      <table border="0" cellpadding="0" cellspacing="0" width="${containerWidth}" align="center" style="width:${containerWidth}px;"><tr><td>
      <![endif]-->`)
  })

  $('.mj-container-outlook-close').each(function () {
    $(this).replaceWith(`<!--[if mso]>
      </td></tr></table>
      <![endif]-->`)
  })

  $('body')
    .css({ background: $('.mj-container').data('background-color') })
    .each(function () {
      if ($(this).attr('style') === '') {
        $(this).removeAttr('style')
      }
    })

  $('.mj-container')
    .removeAttr('data-background-color')
    .removeAttr('data-width')
    .removeAttr('class')
    .each(function () {
      if ($(this).attr('style') === '') {
        $(this).removeAttr('style')
      }
    })

  return $
}
const schemaXsd = () => (
  `<xs:complexType name="mj-body">
    <xs:sequence>
      <xs:element name="mj-container" type="mj-container" minOccurs="1" maxOccurs="1" />
    </xs:sequence>
  </xs:complexType>`
)

@MJMLElement
class Container extends Component {

  styles = this.getStyles()

  getStyles () {
    const { mjAttribute, defaultUnit } = this.props

    return {
      div: {
        backgroundColor: mjAttribute('background-color'),
        fontSize: defaultUnit(mjAttribute('font-size'), 'px')
      }
    }
  }

  render () {
    const { renderWrappedOutlookChildren, defaultUnit, mjAttribute, children } = this.props
    const { width } = helpers.widthParser(defaultUnit(mjAttribute('width'), 'px'))

    return (
      <div
        className="mj-container"
        data-background-color={mjAttribute('background-color')}
        data-width={width}
        style={this.styles.div}>
        {renderWrappedOutlookChildren(children)}
      </div>
    )
  }

}

Container.tagName = tagName
Container.defaultMJMLDefinition = defaultMJMLDefinition
Container.postRender = postRender
Container.schemaXsd = schemaXsd

// Support V1.X MJML mj-body
elements['mj-body'] = Container

export default Container