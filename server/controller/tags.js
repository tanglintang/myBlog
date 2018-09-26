const TagModel = require('../models/tags')

const getAllTags = async (ctx) => {
  // const token = ctx.request.header.authorization
  const tags = []
  await TagModel.findAll({
    attributes: ['tagName'],
    // raw: true 将取代并返回一个原始对象
    raw: true
  }).then(res => {
    for (const item of res) {
      tags.push(item['tagName'])
    }
  })
  // console.log(tags)
  if (tags) {
    ctx.body = {
      code: 200,
      tags
    }
  } else {
    ctx.body = {
      code: 304,
      message: 'error'
    }
  }
}

const addNewTag = async(ctx) => {
  const newTag = ctx.request.body.tagName
  await TagModel.findOrCreate({
    where: {
      tagName: newTag
    }
  }).then(res => {
    if (!res[1]) {
      ctx.body = {
        message: '该标签已存在'
      }
    } else {
      ctx.body = {
        code: 200,
        message: '添加新标签成功'
      }
    }
  })
}

const deleteTag = async(ctx) => {
  const tagName = ctx.request.header.tag
  await TagModel.destroy({
    where: {
      tagName
    }
  }).then(res => {
    if (res === 1) {
      ctx.body = {
        code: 200,
        message: '删除成功'
      }
    }
  })
}

module.exports = {
  getAllTags,
  addNewTag,
  deleteTag
}
