import { useState, useEffect } from 'react'
import { loadApiKey, saveApiKey } from '../lib/storage'

export default function SettingsPage() {
  const [key, setKey] = useState('')
  const [saved, setSaved] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => { setKey(loadApiKey()) }, [])

  function handleSave() {
    saveApiKey(key.trim())
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '24px 16px 80px' }}>

      <div style={{
        background: 'var(--bg2)', borderRadius: 'var(--radius)',
        border: '1px solid var(--border)', padding: '16px', marginBottom: 20
      }}>
        <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Anthropic API 키</p>
        <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 12 }}>
          claude.ai에서 발급받은 API 키를 입력하세요. 기기에만 저장됩니다.
        </p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <input
            type={show ? 'text' : 'password'}
            value={key}
            onChange={e => setKey(e.target.value)}
            placeholder="sk-ant-..."
            style={{
              flex: 1, padding: '9px 12px', borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)', background: 'var(--bg)',
              color: 'var(--text)', fontSize: 13, outline: 'none', fontFamily: 'monospace'
            }}
          />
          <button onClick={() => setShow(!show)} style={{
            padding: '9px 12px', borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)', background: 'var(--bg)',
            color: 'var(--text2)', fontSize: 12, cursor: 'pointer'
          }}>{show ? '숨김' : '보기'}</button>
        </div>
        <button onClick={handleSave} style={{
          width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)',
          background: 'var(--accent)', color: 'var(--accent-text)',
          border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer'
        }}>
          {saved ? '저장됨 ✓' : '저장'}
        </button>
      </div>

      <div style={{
        background: 'var(--bg2)', borderRadius: 'var(--radius)',
        border: '1px solid var(--border)', padding: '16px'
      }}>
        <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>채널 가이드</p>
        {[
          { label: 'WordPress 블로그', badge: 'wp', desc: '1,500자 이상 · SEO 메타설명 · 소제목 포함 · 감성 에세이' },
          { label: 'X (트위터)', badge: 'x', desc: '280자 이내 · 핵심 한 문장 · 해시태그 2~3개' },
          { label: 'Instagram', badge: 'ig', desc: '감성 캡션 · 줄바꿈 · 해시태그 10개' }
        ].map(item => (
          <div key={item.badge} style={{ marginBottom: 10, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20, flexShrink: 0, marginTop: 2,
              background: `var(--${item.badge})`, color: `var(--${item.badge}-text)`
            }}>{item.label}</span>
            <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 20, textAlign: 'center', lineHeight: 1.7, fontStyle: 'italic' }}>
            시공간을 넘어, 가장 먼 곳에서<br />세상의 모든 이야기를 관찰하고 기록(遐錄)합니다.<br /><br /></p>
      <p style={{ fontSize: 11, color: 'var(--text3)', textAlign: 'center' }}>
        HanokWriter v1.4 · 하녹 · Double Y Space
      </p>
    </div>
  )
}
