import Button from '@/components/Button'

export type Filter = 'all' | 'active' | 'completed'

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'active', label: '할 일' },
  { key: 'completed', label: '완료' }
]

interface FilterTabsProps {
  value: Filter
  onChange: (filter: Filter) => void
}

export default function FilterTabs({ value, onChange }: FilterTabsProps) {
  return (
    <>
      {filters.map(f => (
        <Button
          key={f.key}
          variant={value === f.key ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onChange(f.key)}>
          {f.label}
        </Button>
      ))}
    </>
  )
}
