import { useEffect, useState } from 'react'
import Avatar from '../components/Avatar'
import Button from '../components/Button'
import PostCard from '../components/PostCard'
import { useAuth } from '../context/AuthContext'
import { getPosts } from '../services/postService'

export default function Profile() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts().then(setPosts).catch(() => setPosts([]))
  }, [])

  const myPosts = posts.filter((post) => post.author === user.name)
  const initial = user.name.charAt(0).toUpperCase()

  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="h-28 bg-gradient-to-r from-primary to-secondary sm:h-36" />
        <div className="flex flex-col items-center gap-1 px-6 pb-6">
          <div className="-mt-12"><Avatar initial={initial} size="lg" /></div>
          <h1 className="mt-2 text-lg font-bold text-ink">{user.name}</h1>
          <p className="text-sm text-ink-muted">CampusConnect Student</p>
          <p className="mt-2 max-w-md text-center text-sm text-ink-muted">{user.email}</p>
          <div className="mt-4"><Button variant="primary">Edit Profile</Button></div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-ink-muted">Posts</h2>
        {myPosts.length > 0 ? myPosts.map((post) => <PostCard key={post.id} post={post} />) : (
          <p className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-sm text-ink-muted">No posts yet. Share what you're learning with CampusConnect.</p>
        )}
      </div>
    </div>
  )
}
