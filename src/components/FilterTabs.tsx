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
        <button
          key={f.key}
          type="button"
          onClick={() => onChange(f.key)}
          className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
            value === f.key
              ? 'bg-primary text-label-on-primary'
              : 'bg-secondary text-label-sub hover:brightness-95 dark:hover:brightness-110'
          }`}>
          {f.label}
        </button>
      ))}
    </>
  )
}
