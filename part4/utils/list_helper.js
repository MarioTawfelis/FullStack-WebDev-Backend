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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}