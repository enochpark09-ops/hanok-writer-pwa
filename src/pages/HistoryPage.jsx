import { useState, useEffect } from 'react'
import { loadHistory, deleteHistory, clearHistory } from '../lib/storage'
import { CHANNEL_GUIDE, CATEGORY_LABEL } from '../lib/claude'

const BADGE_STYLE = {
  wp: { background: 'var(--wp)', color: 'var(--wp-text)' },
  x: { background: 'var(--x)', color: 'var(--x-text)' },
  ig: { background: 'var(--ig)', color: 'var(--ig-text)' }
}

export default function HistoryPage() {
  const [list, setList] = useState([])
  const [expanded, setExpanded] = useState(null)
  const [copied, setCopied] = useState(null)

  useEffect(() => { setList(loadHistory()) }, [])

  function handleDelete(id) {
    deleteHistory(id)
    setList(loadHistory())
  }

  function handleCopy(id, content) {
    navigator.clipboard.writeText(content)
    setCopied(id)
    setTimeout(() => setCopied(null), 1500)
  }

  function handleClear() {
    if (confirm('히스토리를 전체 삭제할까요?')) {
      clearHistory()
      setList([])
    }
  }

  if (list.length === 0) return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '60px 16px', textAlign: 'center' }}>
      <p style={{ color: 'var(--text3)', fontSize: 14 }}>아직 생성한 글이 없어요</p>
    </div>
  )

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <p style={{ fontSize: 13, color: 'var(--text3)' }}>총 {list.length}개</p>
        <button onClick={handleClear} style={{
          fontSize: 12, color: '#e24b4a', background: 'none', border: 'none', cursor: 'pointer'
        }}>전체 삭제</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.map(item => {
          const badge = CHANNEL_GUIDE[item.channel]?.badge || 'wp'
          const isOpen = expanded === item.id
          const date = new Date(item.createdAt).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
          const catLabel = item.category === 'lifestyle' ? '라이프스타일' : item.category === 'culture' ? '문화·예술' : '철학·에세이'

          return (
            <div key={item.id} style={{
              background: 'var(--bg2)', borderRadius: 'var(--radius)',
              border: '1px solid var(--border)', overflow: 'hidden'
            }}>
              <div onClick={() => setExpanded(isOpen ? null : item.id)}
                style={{ padding: '12px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  fontSize: 10, fontWeight: 600, padding: '2px 8px',
                  borderRadius: 20, flexShrink: 0, ...BADGE_STYLE[badge]
                }}>{CHANNEL_GUIDE[item.channel]?.label}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.keywords}
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{catLabel} · {date}</p>
                </div>
                <span style={{ fontSize: 12, color: 'var(--text3)', flexShrink: 0 }}>{isOpen ? '▲' : '▼'}</span>
              </div>

              {isOpen && (
                <div style={{ borderTop: '1px solid var(--border)', padding: '12px 14px' }}>
                  <p style={{ fontSize: 13, lineHeight: 1.8, whiteSpace: 'pre-wrap', color: 'var(--text)', marginBottom: 12 }}>
                    {item.content}
                  </p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleCopy(item.id, item.content)} style={{
                      fontSize: 12, padding: '5px 12px', borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)', background: 'var(--bg)',
                      color: 'var(--text2)', cursor: 'pointer'
                    }}>{copied === item.id ? '복사됨 ✓' : '복사'}</button>
                    <button onClick={() => handleDelete(item.id)} style={{
                      fontSize: 12, padding: '5px 12px', borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)', background: 'var(--bg)',
                      color: '#e24b4a', cursor: 'pointer'
                    }}>삭제</button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
