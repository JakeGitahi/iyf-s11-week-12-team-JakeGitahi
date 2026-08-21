import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PostCard from '../components/PostCard'
import CommentItem from '../components/CommentItem'
import Button from '../components/Button'
import { posts, comments as initialComments } from '../data/mockData'

export default function PostDetail() {
  const { id } = useParams()
  const post = posts.find((p) => p.id === id) ?? posts[0]
  const [comments, setComments] = useState(initialComments)
  const [draft, setDraft] = useState('')

  const handleComment = () => {
    if (!draft.trim()) return
    setComments((prev) => [
      ...prev,
      { id: `c${prev.length + 1}`, author: 'You', initial: 'Y', time: 'now', content: draft },
    ])
    setDraft('')
  }

  return (
    <div className="flex flex-col gap-5">
      <Link to="/" className="text-sm font-medium text-ink-muted hover:text-primary">
        ← Back to feed
      </Link>

      <PostCard post={post} />

      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-ink">Comments</h2>

        <div className="flex flex-col gap-3">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>

        <div className="mt-4 flex gap-2 border-t border-border pt-4">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 rounded-md border border-border bg-white px-3.5 py-2 text-sm text-ink placeholder:text-ink-muted outline-none transition-colors duration-150 focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
          <Button variant="primary" onClick={handleComment} disabled={!draft.trim()}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  )
}
