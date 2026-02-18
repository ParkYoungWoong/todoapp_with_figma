import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useTodoStore } from '@/store/useTodoStore'

export default function TodoDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const todo = useTodoStore(s => s.todos.find(t => t.id === id))
  const updateTodo = useTodoStore(s => s.updateTodo)
  const deleteTodo = useTodoStore(s => s.deleteTodo)

  const [title, setTitle] = useState(todo?.title ?? '')
  const [completed, setCompleted] = useState(todo?.completed ?? false)
  const [date, setDate] = useState(todo?.date ?? '')
  const [time, setTime] = useState(todo?.time ?? '')
  const [memo, setMemo] = useState(todo?.memo ?? '')

  if (!todo) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-label-sub">할 일을 찾을 수 없습니다</p>
      </div>
    )
  }

  const handleSave = () => {
    if (!title.trim()) return
    updateTodo(todo.id, {
      title: title.trim(),
      completed,
      date,
      time,
      memo
    })
    navigate('/')
  }

  const handleDelete = () => {
    deleteTodo(todo.id)
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
        <h1 className="text-xl font-bold">할 일 상세</h1>
      </header>

      <div className="mt-8 flex flex-1 flex-col gap-5">
        <button
          type="button"
          onClick={() => setCompleted(!completed)}
          className="flex items-center gap-3">
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
              completed ? 'border-primary bg-primary' : 'border-label-sub'
            }`}>
            {completed && (
              <svg
                className="h-3 w-3 text-label-on-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </span>
          <span className="text-sm text-label-sub">완료</span>
        </button>

        <div>
          <label className="mb-2 block text-sm text-label-sub">제목</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full rounded-xl bg-secondary px-4 py-3 outline-none"
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

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={handleDelete}
          className="flex-1 rounded-xl bg-danger-bg py-4 font-semibold text-danger">
          삭제
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={!title.trim()}
          className="flex-1 rounded-xl bg-primary py-4 font-semibold text-label-on-primary transition-opacity disabled:opacity-40">
          저장
        </button>
      </div>
    </div>
  )
}
