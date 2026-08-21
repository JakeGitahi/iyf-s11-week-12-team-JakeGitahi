import { api } from './api'

const relativeTime = (date) => {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 1000))
  if (seconds < 60) return 'now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
  return `${Math.floor(seconds / 86400)}d`
}

const authorName = (author) => (typeof author === 'object' ? author?.name : author) || 'CampusConnect Member'

// The UI has presentation-only fields that the API does not persist yet.
export const toPostCard = (post) => {
  const author = authorName(post.author)
  return {
    id: post.id || post._id,
    title: post.title,
    author,
    initial: author.charAt(0).toUpperCase(),
    role: post.category || 'CampusConnect Student',
    time: relativeTime(post.createdAt),
    content: post.content,
    image: false,
    likes: 0,
    comments: 0,
    liked: false,
    saved: false,
  }
}

export const toCommentItem = (comment) => {
  const author = authorName(comment.author)
  return {
    id: comment.id || comment._id,
    author,
    initial: author.charAt(0).toUpperCase(),
    time: relativeTime(comment.createdAt),
    content: comment.content,
  }
}

export async function getPosts() {
  const data = await api('/posts')
  const posts = Array.isArray(data) ? data : data.posts || []
  return posts.map(toPostCard)
}

export async function getPost(id) {
  const data = await api(`/posts/${id}`)
  return toPostCard(data.post || data)
}

export async function createPost({ content, author, token }) {
  const title = content.trim().replace(/\s+/g, ' ').slice(0, 80)
  const data = await api('/posts', {
    method: 'POST',
    token,
    body: JSON.stringify({ title, content: content.trim(), author, category: 'General' }),
  })
  return toPostCard(data.post || data)
}

export async function getComments(postId) {
  const data = await api(`/posts/${postId}/comments`)
  return (data.comments || []).map(toCommentItem)
}

export async function createComment({ postId, content, token }) {
  const data = await api(`/posts/${postId}/comments`, {
    method: 'POST',
    token,
    body: JSON.stringify({ content: content.trim() }),
  })
  return toCommentItem(data.comment)
}
