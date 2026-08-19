import { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(post.liked)
  const [saved, setSaved] = useState(post.saved)
  const [likeCount, setLikeCount] = useState(post.likes)

  const toggleLike = () => {
    setLiked((prev) => !prev)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar initial={post.initial} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold text-ink">{post.author}</h3>
            <span className="text-ink-muted">•</span>
            <span className="shrink-0 text-sm text-ink-muted">{post.time}</span>
          </div>
          <p className="text-sm text-ink-muted">{post.role}</p>
        </div>
      </div>

      <Link to={`/post/${post.id}`} className="mt-3 block">
        <p className="text-ink">{post.content}</p>

        {post.image && (
          <div className="mt-3 flex h-48 items-center justify-center rounded-md border border-border bg-primary-light text-sm font-medium text-primary sm:h-64">
            Project Image
          </div>
        )}
      </Link>

      <div className="mt-4 flex items-center gap-1 border-t border-border pt-3">
        <button
          onClick={toggleLike}
          aria-pressed={liked}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
            liked ? 'text-danger' : 'text-ink-muted hover:bg-primary-light hover:text-primary'
          }`}
        >
          <span aria-hidden="true">{liked ? '❤️' : '♡'}</span>
          {likeCount}
        </button>

        <Link
          to={`/post/${post.id}`}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-ink-muted transition-colors duration-150 hover:bg-primary-light hover:text-primary"
        >
          <span aria-hidden="true">💬</span>
          {post.comments}
        </Link>

        <button className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-ink-muted transition-colors duration-150 hover:bg-primary-light hover:text-primary">
          <span aria-hidden="true">↗</span>
          Share
        </button>

        <button
          onClick={() => setSaved((prev) => !prev)}
          aria-pressed={saved}
          className={`ml-auto flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
            saved ? 'text-primary' : 'text-ink-muted hover:bg-primary-light hover:text-primary'
          }`}
        >
          <span aria-hidden="true">🔖</span>
        </button>
      </div>
    </article>
  )
}
