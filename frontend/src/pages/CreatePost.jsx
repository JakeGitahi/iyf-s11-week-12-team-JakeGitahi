import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { createPost } from '../services/postService'

export default function CreatePost() {
  const [content, setContent] = useState('')
  const navigate = useNavigate()
  const { user, token } = useAuth()
  const [error, setError] = useState('')
  const [isPublishing, setIsPublishing] = useState(false)

  const handlePublish = async () => {
    if (!content.trim()) return
    setError('')
    setIsPublishing(true)
    try {
      await createPost({ content, author: user.name, token })
      navigate('/')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold text-ink">Create a Post</h1>

      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          rows={6}
          className="w-full resize-none rounded-md border border-border bg-white px-3.5 py-3 text-sm text-ink placeholder:text-ink-muted outline-none transition-colors duration-150 focus:border-primary focus:ring-2 focus:ring-primary/15"
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <Button variant="secondary" type="button">
              Add Image
            </Button>
            <Button variant="secondary" type="button">
              Add Attachment
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" type="button" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button variant="primary" type="button" onClick={handlePublish} disabled={!content.trim() || isPublishing}>
              {isPublishing ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-danger">{error}</p>}
      </div>
    </div>
  )
}
