import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useTodoStore } from '@/store/useTodoStore'
import Button from '@/components/Button'
import ListButton from '@/components/ListButton'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'

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
      <header className="flex items-center gap-3">
        <Button
          variant="secondary"
          icon="chevron_left"
          onClick={() => navigate('/')}
        />
        <h1 className="flex-1 text-xl font-bold">할 일 상세 및 수정</h1>
      </header>

      <div className="mt-8 flex flex-1 flex-col gap-4">
        <ListButton
          variant={completed ? 'active' : 'default'}
          icon={completed ? 'check_circle' : 'radio_button_unchecked'}
          label={completed ? '완료됨' : '미완료'}
          onClick={() => setCompleted(!completed)}
        />

        <Input
          label="제목"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Input
          label="날짜"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <Input
          label="시간"
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
        <Textarea
          label="메모"
          value={memo}
          onChange={e => setMemo(e.target.value)}
          placeholder="메모를 입력하세요"
          rows={4}
        />
      </div>

      <div className="mt-6 flex gap-3">
        <Button
          variant="danger"
          icon="delete"
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
