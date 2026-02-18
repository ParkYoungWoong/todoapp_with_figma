import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useTodoStore } from '@/store/useTodoStore'
import Button from '@/components/Button'

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
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-5 pt-4 pb-8">
      <header className="flex items-center">
        <Button
          variant="secondary"
          size="sm"
          icon="chevron_left"
          onClick={() => navigate('/')}
        />
        <h1 className="flex-1 text-center text-xl font-bold">할 일 추가</h1>
        <div className="w-8" />
      </header>

      <div className="mt-8 flex flex-1 flex-col gap-5">
        <div>
          <label className="text-label-sub mb-2 block text-sm">제목</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="할 일을 입력하세요"
            className="border-border bg-secondary placeholder:text-label-sub/50 w-full rounded-xl border px-4 py-3 outline-none"
            autoFocus
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

      <Button
        onClick={handleSubmit}
        disabled={!title.trim()}
        className="mt-6 w-full">
        추가하기
      </Button>
    </div>
  )
}
