export default function Header({ tab, setTab }) {
  return (
    <header style={{
      background: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 10
    }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 52 }}>
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-0.3px' }}>
            HanokWriter
          </span>
          <span style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: '0.05em' }}>온도(溫度)</span>
        </div>
        <div style={{ display: 'flex', gap: 0, marginBottom: -1 }}>
          {[['write', '글쓰기'], ['history', '히스토리'], ['settings', '설정']].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              flex: 1, padding: '8px 0', fontSize: 13, fontWeight: tab === key ? 600 : 400,
              color: tab === key ? 'var(--text)' : 'var(--text3)',
              background: 'none', border: 'none', borderBottom: tab === key ? '2px solid var(--text)' : '2px solid transparent',
              cursor: 'pointer', transition: 'all 0.15s'
            }}>{label}</button>
          ))}
        </div>
      </div>
    </header>
  )
}
