const jwt = require('jsonwebtoken')
const mdToc = require('markdown-toc')
const marked = require('marked')
const { markdownToHtmlRender, blogFields } = require('../utils')
const BlogModel = require('../models/blogs')

// 新增博客
const createBlog = async (ctx) => {
  const {
    token,
    title,
    tags,
    categories,
    markdownContent
  } = ctx.request.body
  const playload = jwt.decode(token)
  const account = playload.account

  // markdownContent => toc 目录
  const toc = marked(
    mdToc(markdownContent, { slugify: str => str }).content
  )

  // markdownContent => htmlContent
  const htmlContent = marked(markdownContent, {
    renderer: markdownToHtmlRender
  })

  await BlogModel.create({
    title,
    author: account,
    toc,
    markdownContent,
    htmlContent,
    tags: tags.join(),
    categories
  }).then((result) => {
    console.log('插入成功')
    ctx.body = {
      code: 200,
      message: '新增博客成功'
    }
  }).catch((err) => {
    console.log('插入失败' + err)
    ctx.body = {
      code: 403,
      message: '新增博客失败'
    }
  })

}

// 获取所有博客
const getAllBlogs = async(ctx) => {
  const { page, pageSize } = ctx.query
  await BlogModel.findAndCountAll({
    where: '', //为空，获取全部
    limit: Number(pageSize), //每页限制返回的数据条数
    offset: (page - 1) * pageSize, //开始的数据索引，比如当page=2 时offset=10 ，而pagesize我们定义为10，则现在为索引为10，也就是从第11条开始返回数据条目
    raw: true
  }).then(blogs => {
    const list = blogs.rows
    const count = blogs.count
    ctx.body = {
      code: 200,
      list,
      count
    }
  })
}

// 删除博客
const deleteBlog = async(ctx) => {
  const id = ctx.query.id
  await BlogModel.destroy({
    where: {
      id
    }
  }).then(res => {
    // console.log(res)
    if (res === 1) {
      ctx.body = {
        code: 200,
        message: '删除成功'
      }
    }
  })
}

// 更新博客
const updateBlog = async(ctx) => {
  const { id, tags, ...blog } = ctx.request.body.blog
  await BlogModel.update({
    ...blog,
    tags: tags.join()
  },{
    where: {
      id
    }
  }).then(res => {
    // console.log(res)
    ctx.body = {
      code: 200,
      message: '更新成功'
    }
  }).catch(error => {
    ctx.body = {
      message: '文章更新失败'
    }
  })
}

module.exports = {
  createBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog
}