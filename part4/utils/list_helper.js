const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, post) => sum + post.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const mostLiked = blogs.reduce((curr, prev) => {
    return curr.likes > prev.likes ? curr : prev
  })

  return {
    title: mostLiked.title,
    author: mostLiked.author,
    url: mostLiked.url,
    likes: mostLiked.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const blogs_by_author = _(blogs)
    .groupBy('author')
    .map((blog, author) => ({
      author: author,
      blogs: Object.values(_.countBy(blog, 'author'))
    }))
    .value()

  const result = blogs_by_author.reduce((curr, prev) => {
    return curr.blogs[0] > prev.blogs[0] ? curr : prev
  })

  return {
    author: result.author,
    blogs: result.blogs[0]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const likes_by_author = _(blogs)
    .groupBy('author')
    .map((blog, author) => ({
      author: author,
      likes: _.sumBy(blog, 'likes')
    }))
    .value()

  const result = likes_by_author.reduce((curr, prev) => {
    return curr.likes > prev.likes ? curr : prev
  })

  return {
    author: result.author,
    likes: result.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}