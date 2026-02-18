import { useNavigate } from 'react-router'
import { useAuthStore } from '@/store/useAuthStore'
import { useThemeStore } from '@/store/useThemeStore'
import Button from '@/components/Button'
import ListButton from '@/components/ListButton'

export default function SettingsPage() {
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)
  const logout = useAuthStore(s => s.logout)
  const deleteAccount = useAuthStore(s => s.deleteAccount)
  const theme = useThemeStore(s => s.theme)
  const toggleTheme = useThemeStore(s => s.toggle)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleDeleteAccount = () => {
    if (!confirm('정말 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다.')) return
    deleteAccount()
    navigate('/login')
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-5 pt-4 pb-8">
      <header className="flex items-center gap-3">
        <Button
          variant="secondary"
          icon="chevron_left"
          onClick={() => navigate('/')}
        />
        <h1 className="text-xl font-bold">설정</h1>
      </header>

      <div className="mt-8 flex flex-col items-center">
        <img
          src={user?.profileImage}
          alt="프로필"
          className="h-20 w-20 rounded-full object-cover"
        />
        <p className="mt-3 text-lg font-bold">{user?.name}</p>
        <p className="text-label-sub text-sm">{user?.email}</p>
      </div>

      <ul className="mt-8 flex flex-col gap-3">
        <li>
          <ListButton
            icon={theme === 'dark' ? 'dark_mode' : 'light_mode'}
            label={theme === 'dark' ? '다크 모드' : '라이트 모드'}
            trailing="swap_horiz"
            onClick={toggleTheme}
          />
        </li>
        <li>
          <ListButton
            icon="logout"
            label="로그아웃"
            onClick={handleLogout}
          />
        </li>
        <li>
          <ListButton
            variant="danger"
            icon="person_remove"
            label="회원 탈퇴"
            onClick={handleDeleteAccount}
          />
        </li>
      </ul>
    </div>
  )
}
