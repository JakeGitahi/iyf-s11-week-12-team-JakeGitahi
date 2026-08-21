import { Link } from 'react-router-dom'
import PostCard from '../components/PostCard'
import Button from '../components/Button'
import { posts } from '../data/mockData'

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink">CampusConnect Feed</h1>
        <Link to="/create">
          <Button variant="primary">Create Post</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
