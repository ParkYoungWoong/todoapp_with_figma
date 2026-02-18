import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useTodoStore } from '@/store/useTodoStore'
import Checkbox from '@/components/Checkbox'
import Button from '@/components/Button'

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
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-5 pt-4 pb-8">
      <header className="flex items-center">
        <Button
          variant="secondary"
          icon="chevron_left"
          onClick={() => navigate('/')}
        />
        <h1 className="flex-1 text-center text-xl font-bold">
          할 일 상세 및 수정
        </h1>
        <div className="w-8" />
      </header>

      <div className="mt-8 flex flex-1 flex-col gap-5">
        <button
          type="button"
          onClick={() => setCompleted(!completed)}
          className="flex w-fit items-center gap-3 transition-opacity hover:opacity-80">
          <Checkbox
            checked={completed}
            onClick={() => setCompleted(!completed)}
          />
          <span className="text-label-sub text-sm">
            {completed ? '완료됨' : '미완료'}
          </span>
        </button>

        <div>
          <label className="text-label-sub mb-2 block text-sm">제목</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border-border bg-secondary w-full rounded-xl border px-4 py-3 outline-none"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-label-sub mb-2 block text-sm">날짜</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="border-border bg-secondary w-full rounded-xl border px-4 py-3 outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="text-label-sub mb-2 block text-sm">시간</label>
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="border-border bg-secondary w-full rounded-xl border px-4 py-3 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-label-sub mb-2 block text-sm">메모</label>
          <textarea
            value={memo}
            onChange={e => setMemo(e.target.value)}
            placeholder="메모를 입력하세요"
            rows={4}
            className="border-border bg-secondary placeholder:text-label-sub/50 w-full resize-none rounded-xl border px-4 py-3 outline-none"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button
          variant="danger"
          onClick={handleDelete}
          className="flex-1">
          삭제
        </Button>
        <Button
          icon="check"
          onClick={handleSave}
          disabled={!title.trim()}
          className="flex-1">
          저장
        </Button>
      </div>
    </div>
  )
}
