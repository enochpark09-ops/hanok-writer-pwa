import { useState } from 'react'
import Header from './components/Header'
import WritePage from './pages/WritePage'
import HistoryPage from './pages/HistoryPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  const [tab, setTab] = useState('write')

  return (
    <div>
      <Header tab={tab} setTab={setTab} />
      {tab === 'write' && <WritePage />}
      {tab === 'history' && <HistoryPage />}
      {tab === 'settings' && <SettingsPage />}
    </div>
  )
}
