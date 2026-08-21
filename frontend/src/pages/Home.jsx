import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import Button from '../components/Button'
import { getPosts } from '../services/postService'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink">CampusConnect Feed</h1>
        <Link to="/create">
          <Button variant="primary">Create Post</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading && <p className="rounded-lg bg-card p-5 text-sm text-ink-muted">Loading posts...</p>}
        {error && <p className="rounded-lg border border-danger/30 bg-card p-5 text-sm text-danger">{error}</p>}
        {!isLoading && !error && posts.length === 0 && <p className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-sm text-ink-muted">No posts yet. Be the first to share something.</p>}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
