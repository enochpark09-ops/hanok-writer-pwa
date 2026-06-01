const VERSION = 'v1.3'

export default function Header({ tab, setTab }) {
  return (
    <header style={{
      background: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 10
    }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingTop: 12, paddingBottom: 8 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-0.3px' }}>HanokWriter</span>
              <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'monospace' }}>{VERSION}</span>
            </div>
            <p style={{
              fontSize: 11, color: 'var(--text3)', marginTop: 3,
              lineHeight: 1.5, maxWidth: 260
            }}>
              시공간을 넘어, 가장 먼 곳에서<br />
              세상의 모든 이야기를 관찰하고 기록(遐錄)합니다.
            </p>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', marginTop: 2 }}>하녹</span>
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
