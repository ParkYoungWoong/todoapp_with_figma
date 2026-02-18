import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useTodoStore } from '@/store/useTodoStore'

export default function AddTodoPage() {
  const navigate = useNavigate()
  const addTodo = useTodoStore(s => s.addTodo)

  const now = new Date()
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(now.toISOString().split('T')[0])
  const [time, setTime] = useState(now.toTimeString().slice(0, 5))
  const [memo, setMemo] = useState('')

  const handleSubmit = () => {
    if (!title.trim()) return
    addTodo({
      title: title.trim(),
      completed: false,
      date,
      time,
      memo
    })
    navigate('/')
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-5 pb-8 pt-4">
      <header className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-label-sub">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold">할 일 추가</h1>
      </header>

      <div className="mt-8 flex flex-1 flex-col gap-5">
        <div>
          <label className="mb-2 block text-sm text-label-sub">제목</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="할 일을 입력하세요"
            className="w-full rounded-xl bg-secondary px-4 py-3 outline-none placeholder:text-label-sub/50"
            autoFocus
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="mb-2 block text-sm text-label-sub">날짜</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full rounded-xl bg-secondary px-4 py-3 outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="mb-2 block text-sm text-label-sub">시간</label>
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="w-full rounded-xl bg-secondary px-4 py-3 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-label-sub">메모</label>
          <textarea
            value={memo}
            onChange={e => setMemo(e.target.value)}
            placeholder="메모를 입력하세요"
            rows={4}
            className="w-full resize-none rounded-xl bg-secondary px-4 py-3 outline-none placeholder:text-label-sub/50"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!title.trim()}
        className="mt-6 w-full rounded-xl bg-primary py-4 font-semibold text-label-on-primary transition-opacity disabled:opacity-40">
        추가하기
      </button>
    </div>
  )
}
