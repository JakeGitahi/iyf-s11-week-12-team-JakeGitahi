export const currentUser = {
  id: 'u1',
  name: 'Amara Wanjiru',
  role: 'Computer Science Student',
  initial: 'A',
  bio: 'Building small tools, breaking bigger ones, and learning out loud.',
}

export const posts = [
  {
    id: 'p1',
    author: 'Amara Wanjiru',
    role: 'Computer Science Student',
    initial: 'A',
    time: '2h',
    content: "I just completed my first full-stack project — a class attendance tracker. Three weeks of debugging finally paid off!",
    image: true,
    likes: 24,
    comments: 8,
    liked: false,
    saved: false,
  },
  {
    id: 'p2',
    author: 'Brian Otieno',
    role: 'Electrical Engineering Student',
    initial: 'B',
    time: '5h',
    content: 'Study group for circuits theory this Thursday at the library, 4pm. Bring your multimeters and your patience.',
    image: false,
    likes: 11,
    comments: 3,
    liked: true,
    saved: false,
  },
  {
    id: 'p3',
    author: 'Faith Njeri',
    role: 'Statistics Student',
    initial: 'F',
    time: '1d',
    content: 'Presented my regression analysis project today and actually enjoyed the Q&A. Growth.',
    image: true,
    likes: 42,
    comments: 15,
    liked: false,
    saved: true,
  },
]

export const comments = [
  { id: 'c1', author: 'Brian Otieno', initial: 'B', time: '1h', content: 'This is really impressive, well done!' },
  { id: 'c2', author: 'Faith Njeri', initial: 'F', time: '45m', content: 'What stack did you use for the backend?' },
]
