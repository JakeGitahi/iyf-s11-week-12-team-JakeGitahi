import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PostCard from '../components/PostCard'
import CommentItem from '../components/CommentItem'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { createComment, getComments, getPost } from '../services/postService'

export default function PostDetail() {
  const { id } = useParams()
  const { token } = useAuth()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [draft, setDraft] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setIsLoading(true)
    setError('')
    Promise.all([getPost(id), getComments(id)])
      .then(([nextPost, nextComments]) => {
        setPost({ ...nextPost, comments: nextComments.length })
        setComments(nextComments)
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsLoading(false))
  }, [id])

  const handleComment = async () => {
    if (!draft.trim()) return

    setIsSubmitting(true)
    setError('')
    try {
      const comment = await createComment({ postId: id, content: draft, token })
      setComments((previous) => [...previous, comment])
      setPost((previous) => ({ ...previous, comments: previous.comments + 1 }))
      setDraft('')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <Link to="/" className="text-sm font-medium text-ink-muted hover:text-primary">
        ← Back to feed
      </Link>

      {isLoading && <p className="rounded-lg bg-card p-5 text-sm text-ink-muted">Loading post...</p>}
      {error && <p className="rounded-lg border border-danger/30 bg-card p-5 text-sm text-danger">{error}</p>}
      {post && <PostCard post={post} />}

      {post && (
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-ink">Comments</h2>

          <div className="flex flex-col gap-3">
            {comments.length > 0 ? comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            )) : <p className="text-sm text-ink-muted">No comments yet. Start the conversation.</p>}
          </div>

          <div className="mt-4 flex gap-2 border-t border-border pt-4">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 rounded-md border border-border bg-white px-3.5 py-2 text-sm text-ink placeholder:text-ink-muted outline-none transition-colors duration-150 focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
            <Button variant="primary" onClick={handleComment} disabled={!draft.trim() || isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Comment'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
