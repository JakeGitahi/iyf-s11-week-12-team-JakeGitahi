import Avatar from './Avatar'

export default function CommentItem({ comment }) {
  return (
    <div className="flex gap-3">
      <Avatar initial={comment.initial} size="sm" />
      <div className="flex-1 rounded-lg bg-surface px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-ink">{comment.author}</span>
          <span className="text-xs text-ink-muted">{comment.time}</span>
        </div>
        <p className="mt-0.5 text-sm text-ink">{comment.content}</p>
        <button className="mt-1 text-xs font-medium text-ink-muted hover:text-primary">Reply</button>
      </div>
    </div>
  )
}
