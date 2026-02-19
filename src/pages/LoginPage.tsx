import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore, DEFAULT_USER } from '@/store/useAuthStore'
import Button from '@/components/Button'
import Input from '@/components/Input'

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

      <div className="mt-8 flex flex-col gap-4">
        <Input
          label="이메일"
          type="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value)
            setError('')
          }}
          placeholder="이메일을 입력하세요"
        />
        <Input
          label="비밀번호"
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value)
            setError('')
          }}
          placeholder="비밀번호를 입력하세요"
        />

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
          className="text-label-sub cursor-pointer text-sm hover:underline">
          계정이 없으신가요? 회원가입
        </button>
      </div>
    </div>
  )
}
