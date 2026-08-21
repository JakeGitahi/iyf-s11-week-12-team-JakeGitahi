import Avatar from '../components/Avatar'
import Button from '../components/Button'
import PostCard from '../components/PostCard'
import { currentUser, posts } from '../data/mockData'

export default function Profile() {
  const myPosts = posts.filter((p) => p.author === currentUser.name)

  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="h-28 bg-gradient-to-r from-primary to-secondary sm:h-36" />
        <div className="flex flex-col items-center gap-1 px-6 pb-6">
          <div className="-mt-12">
            <Avatar initial={currentUser.initial} size="lg" />
          </div>
          <h1 className="mt-2 text-lg font-bold text-ink">{currentUser.name}</h1>
          <p className="text-sm text-ink-muted">{currentUser.role}</p>
          <p className="mt-2 max-w-md text-center text-sm text-ink-muted">{currentUser.bio}</p>
          <div className="mt-4">
            <Button variant="primary">Edit Profile</Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-ink-muted">Posts</h2>
        {myPosts.length > 0 ? (
          myPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-sm text-ink-muted">
            No posts yet. Share what you're learning with CampusConnect.
          </p>
        )}
      </div>
    </div>
  )
}
