import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore, type Gender } from '@/store/useAuthStore'
import Button from '@/components/Button'
import Input from '@/components/Input'
import ListButton from '@/components/ListButton'

const genderOptions: { key: Gender; label: string; icon: string }[] = [
  { key: 'male', label: '남성', icon: 'male' },
  { key: 'female', label: '여성', icon: 'female' }
]

export default function SignupPage() {
  const navigate = useNavigate()
  const signup = useAuthStore(s => s.signup)
  const login = useAuthStore(s => s.login)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState<Gender | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !password || !gender) return
    if (signup(name.trim(), email.trim(), password, gender)) {
      login(email.trim(), password)
      navigate('/')
    } else {
      setError('이미 사용 중인 이메일입니다.')
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-5 pb-8">
      <h1 className="text-center text-2xl font-bold">회원가입</h1>

      <div className="mt-8 flex flex-col gap-4">
        <Input
          label="이름"
          type="text"
          value={name}
          onChange={e => {
            setName(e.target.value)
            setError('')
          }}
          placeholder="이름을 입력하세요"
          autoFocus
        />
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

        <div>
          <label className="text-label-sub mb-2 block text-sm">성별</label>
          <div className="flex flex-col gap-3">
            {genderOptions.map(g => (
              <ListButton
                key={g.key}
                variant={gender === g.key ? 'active' : 'default'}
                icon={g.icon}
                label={g.label}
                trailing={gender === g.key ? 'check' : undefined}
                onClick={() => setGender(g.key)}
              />
            ))}
          </div>
        </div>

        {error && <p className="text-danger text-center text-sm">{error}</p>}

        <Button
          onClick={handleSubmit}
          disabled={!name.trim() || !email.trim() || !password || !gender}
          className="w-full">
          가입하기
        </Button>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-label-sub cursor-pointer text-sm hover:underline">
          이미 계정이 있으신가요? 로그인
        </button>
      </div>
    </div>
  )
}
