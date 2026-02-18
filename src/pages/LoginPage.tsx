import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore, DEFAULT_USER } from '@/store/useAuthStore'
import Button from '@/components/Button'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore(s => s.login)

  const [email, setEmail] = useState(DEFAULT_USER.email)
  const [password, setPassword] = useState(DEFAULT_USER.password)
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (login(email, password)) {
      navigate('/')
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-5 pb-8">
      <h1 className="text-center text-2xl font-bold">로그인</h1>

      <div className="mt-8 flex flex-col gap-5">
        <div>
          <label className="text-label-sub mb-2 block text-sm">이메일</label>
          <input
            type="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value)
              setError('')
            }}
            className="border-border bg-secondary placeholder:text-label-sub/50 focus:border-primary w-full rounded-xl border px-4 py-3 outline-none"
          />
        </div>

        <div>
          <label className="text-label-sub mb-2 block text-sm">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value)
              setError('')
            }}
            className="border-border bg-secondary placeholder:text-label-sub/50 focus:border-primary w-full rounded-xl border px-4 py-3 outline-none"
          />
        </div>

        {error && <p className="text-danger text-center text-sm">{error}</p>}

        <Button
          onClick={handleSubmit}
          disabled={!email.trim() || !password}
          className="w-full">
          로그인
        </Button>

        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="text-label-sub text-sm hover:underline">
          계정이 없으신가요? 회원가입
        </button>
      </div>
    </div>
  )
}
