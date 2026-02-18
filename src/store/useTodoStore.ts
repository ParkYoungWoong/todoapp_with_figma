import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Todo } from '@/types'

interface TodoStore {
  todos: Todo[]
  addTodo: (todo: Omit<Todo, 'id'>) => void
  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id'>>) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
  setCompleted: (ids: string[], completed: boolean) => void
  deleteCompleted: () => void
}

const sampleTodos: Todo[] = [
  { id: crypto.randomUUID(), title: '2분기 마케팅 전략 회의 자료 준비 및 팀원들에게 사전 공유하기', completed: false, date: '2026-02-19', time: '09:00', memo: '슬라이드 20장 이상' },
  { id: crypto.randomUUID(), title: '프로젝트 기획서 작성', completed: true, date: '2026-02-15', time: '10:00', memo: '마케팅팀과 협업 필요' },
  { id: crypto.randomUUID(), title: '주간 회의 참석', completed: true, date: '2026-02-17', time: '14:00', memo: '3층 대회의실' },
  { id: crypto.randomUUID(), title: '퇴근 후 마트에서 이번 주 식재료 장보기 및 부족한 생활용품 구매하기', completed: false, date: '2026-02-18', time: '18:30', memo: '우유, 계란, 양파, 당근, 두부' },
  { id: crypto.randomUUID(), title: '운동하기', completed: false, date: '2026-02-18', time: '07:00', memo: '상체 루틴' },
  { id: crypto.randomUUID(), title: '디자인 리뷰 미팅', completed: false, date: '2026-02-19', time: '11:00', memo: 'Figma 링크 미리 공유할 것' },
  { id: crypto.randomUUID(), title: '치과 예약', completed: true, date: '2026-02-14', time: '15:30', memo: '' },
  { id: crypto.randomUUID(), title: 'React 공식 문서 읽기', completed: false, date: '2026-02-19', time: '20:00', memo: 'Server Components 부분 집중' },
  { id: crypto.randomUUID(), title: '세탁소 옷 찾기', completed: false, date: '2026-02-20', time: '12:00', memo: '코트, 정장 바지' },
  { id: crypto.randomUUID(), title: '생일 선물 준비', completed: false, date: '2026-02-22', time: '17:00', memo: '친구 생일 2/25' },
  { id: crypto.randomUUID(), title: '월간 보고서 제출', completed: true, date: '2026-02-13', time: '09:00', memo: '팀장님께 이메일' },
  { id: crypto.randomUUID(), title: '독서 모임', completed: false, date: '2026-02-21', time: '19:00', memo: '이번 달 책: 사피엔스' },
  { id: crypto.randomUUID(), title: '은행 방문', completed: false, date: '2026-02-20', time: '10:30', memo: '체크카드 재발급' },
  { id: crypto.randomUUID(), title: 'API 문서 업데이트', completed: true, date: '2026-02-16', time: '14:00', memo: 'v2 엔드포인트 추가 반영' },
  { id: crypto.randomUUID(), title: '요가 수업', completed: false, date: '2026-02-19', time: '06:30', memo: '' },
  { id: crypto.randomUUID(), title: '택배 수령', completed: false, date: '2026-02-18', time: '13:00', memo: '경비실 보관 중' },
  { id: crypto.randomUUID(), title: '넷플릭스 구독 갱신', completed: true, date: '2026-02-12', time: '09:00', memo: '' },
  { id: crypto.randomUUID(), title: '이력서 수정', completed: false, date: '2026-02-23', time: '16:00', memo: '포트폴리오 링크 업데이트' },
  { id: crypto.randomUUID(), title: '부모님 전화', completed: false, date: '2026-02-18', time: '21:00', memo: '' },
  { id: crypto.randomUUID(), title: '코드 리뷰 피드백 반영', completed: false, date: '2026-02-19', time: '10:00', memo: 'PR #142 코멘트 확인' },
  { id: crypto.randomUUID(), title: '집 청소', completed: false, date: '2026-02-22', time: '11:00', memo: '화장실, 주방 집중' }
]

export const useTodoStore = create<TodoStore>()(
  persist(
    set => ({
      todos: sampleTodos,
      addTodo: todo =>
        set(state => ({
          todos: [...state.todos, { ...todo, id: crypto.randomUUID() }]
        })),
      updateTodo: (id, updates) =>
        set(state => ({
          todos: state.todos.map(t =>
            t.id === id ? { ...t, ...updates } : t
          )
        })),
      deleteTodo: id =>
        set(state => ({
          todos: state.todos.filter(t => t.id !== id)
        })),
      toggleTodo: id =>
        set(state => ({
          todos: state.todos.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
          )
        })),
      setCompleted: (ids, completed) =>
        set(state => ({
          todos: state.todos.map(t =>
            ids.includes(t.id) ? { ...t, completed } : t
          )
        })),
      deleteCompleted: () =>
        set(state => ({
          todos: state.todos.filter(t => !t.completed)
        }))
    }),
    { name: 'todo-store' }
  )
)
