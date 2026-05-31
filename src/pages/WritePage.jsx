import { useState } from 'react'
import { generateContent, CHANNEL_GUIDE, CATEGORY_LABEL } from '../lib/claude'
import { loadApiKey, saveHistory } from '../lib/storage'

const CATEGORIES = Object.keys(CATEGORY_LABEL)
const CHANNELS = Object.keys(CHANNEL_GUIDE)

const BADGE_STYLE = {
  wp: { background: 'var(--wp)', color: 'var(--wp-text)' },
  x: { background: 'var(--x)', color: 'var(--x-text)' },
  ig: { background: 'var(--ig)', color: 'var(--ig-text)' }
}

function Chip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '6px 14px', borderRadius: 20, border: '1px solid',
      borderColor: active ? 'var(--text)' : 'var(--border)',
      background: active ? 'var(--accent)' : 'var(--bg)',
      color: active ? 'var(--accent-text)' : 'var(--text2)',
      fontSize: 13, fontWeight: active ? 600 : 400, cursor: 'pointer',
      transition: 'all 0.15s'
    }}>{label}</button>
  )
}

export default function WritePage() {
  const [category, setCategory] = useState('lifestyle')
  const [channel, setChannel] = useState('wordpress')
  const [keywords, setKeywords] = useState('')
  const [memo, setMemo] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  async function handleGenerate() {
    const apiKey = loadApiKey()
    if (!apiKey) { setError('설정에서 API 키를 먼저 입력해줘'); return }
    if (!keywords.trim()) { setError('키워드/경험을 입력해줘'); return }
    setError('')
    setLoading(true)
    setResult('')

    await generateContent({
      category, channel, keywords, memo, apiKey,
      onChunk: (text) => setResult(text),
      onDone: (text) => {
        setLoading(false)
        saveHistory({ category, channel, keywords, content: text })
      },
      onError: (msg) => { setLoading(false); setError(msg) }
    })
  }

  function handleCopy() {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const badge = CHANNEL_GUIDE[channel].badge

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px 80px' }}>

      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 8 }}>카테고리</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {CATEGORIES.map(c => (
            <Chip key={c}
              label={c === 'lifestyle' ? '라이프스타일' : c === 'culture' ? '문화·예술' : '철학·에세이'}
              active={category === c} onClick={() => setCategory(c)} />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 8 }}>채널</p>
        <div style={{ display: 'flex', gap: 6 }}>
          {CHANNELS.map(c => (
            <Chip key={c} label={CHANNEL_GUIDE[c].label} active={channel === c} onClick={() => setChannel(c)} />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>키워드 / 경험 <span style={{ color: '#e24b4a' }}>*</span></p>
        <textarea
          value={keywords}
          onChange={e => setKeywords(e.target.value)}
          placeholder="예: 판교 카페 몽, 어린이 놀이터, 아메리카노, 친환경 분위기"
          rows={3}
          style={{
            width: '100%', padding: '10px 12px', borderRadius: 'var(--radius)',
            border: '1px solid var(--border)', background: 'var(--bg2)',
            color: 'var(--text)', fontSize: 14, resize: 'none', outline: 'none',
            fontFamily: 'inherit', lineHeight: 1.6
          }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>추가 메모 (선택)</p>
        <input
          value={memo}
          onChange={e => setMemo(e.target.value)}
          placeholder="예: 아이와 함께 간 날, 비 오는 평일 오전"
          style={{
            width: '100%', padding: '10px 12px', borderRadius: 'var(--radius)',
            border: '1px solid var(--border)', background: 'var(--bg2)',
            color: 'var(--text)', fontSize: 14, outline: 'none', fontFamily: 'inherit'
          }}
        />
      </div>

      {error && (
        <p style={{ fontSize: 13, color: '#e24b4a', marginBottom: 12 }}>{error}</p>
      )}

      <button onClick={handleGenerate} disabled={loading} style={{
        width: '100%', padding: '13px', borderRadius: 'var(--radius)',
        background: 'var(--accent)', color: 'var(--accent-text)',
        border: 'none', fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1, transition: 'opacity 0.15s'
      }}>
        {loading ? '글 쓰는 중...' : '글 생성'}
      </button>

      {result && (
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{
              fontSize: 11, fontWeight: 600, padding: '3px 10px',
              borderRadius: 20, ...BADGE_STYLE[badge]
            }}>
              {CHANNEL_GUIDE[channel].label}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleCopy} style={{
                fontSize: 12, padding: '5px 12px', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)', background: 'var(--bg2)',
                color: 'var(--text2)', cursor: 'pointer'
              }}>
                {copied ? '복사됨 ✓' : '복사'}
              </button>
              <button onClick={handleGenerate} disabled={loading} style={{
                fontSize: 12, padding: '5px 12px', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)', background: 'var(--bg2)',
                color: 'var(--text2)', cursor: 'pointer'
              }}>다시 쓰기</button>
            </div>
          </div>
          <div style={{
            background: 'var(--bg2)', borderRadius: 'var(--radius)',
            border: '1px solid var(--border)', padding: '16px',
            fontSize: 14, lineHeight: 1.8, color: 'var(--text)',
            whiteSpace: 'pre-wrap', wordBreak: 'break-word'
          }}>
            {result}
            {loading && <span style={{ animation: 'blink 1s infinite', color: 'var(--text3)' }}>▊</span>}
          </div>
          <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 8, textAlign: 'right' }}>
            {result.length.toLocaleString()}자
          </p>
        </div>
      )}

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  )
}
