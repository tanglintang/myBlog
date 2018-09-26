const markdownToHtmlRender = require('./markdownToHtmlRender')

const blogFields = [
  '_id',
  'title',
  'summary',
  'toc',
  'markdownContent',
  'htmlContent',
  'createTime',
  'viewTimes',
  'tags',
  'category'
]

module.exports = {
  blogFields,
  markdownToHtmlRender
}