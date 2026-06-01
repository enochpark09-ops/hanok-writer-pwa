import { HANOK_BIBLE } from './bible'

const CHANNEL_GUIDE = {
  wordpress: {
    label: 'WordPress 블로그',
    badge: 'wp',
    guide: `- 글자 수: 1,500자 이상
- 소제목(H2) 2~3개 포함
- SEO 메타설명(160자 이내) 별도 출력
- 추천 태그 4~5개 출력
- 마지막에 짧은 여운 문장으로 마무리
- 감성 에세이 스타일, 1인칭`
  },
  x: {
    label: 'X (트위터)',
    badge: 'x',
    guide: `- 280자 이내 (한글 기준)
- 첫 문장이 핵심 — 스크롤을 멈추게 해야 함
- 여운이 남는 마지막 문장
- 해시태그 2~3개 (마지막에)
- 줄바꿈 1~2회 허용`
  },
  instagram: {
    label: 'Instagram',
    badge: 'ig',
    guide: `- 감성 캡션, 3~5문단
- 각 문단 2~3줄, 줄바꿈으로 호흡 조절
- 이모지 최소화 (문단 시작에 1개 정도)
- 해시태그 10개 (마지막 줄에 별도)
- 브랜드 톤: 따뜻하고 진솔한`
  }
}

const CATEGORY_LABEL = {
  lifestyle: '라이프스타일 (커피·인테리어·일상)',
  culture: '문화·예술 (카페·공간·전시)',
  essay: '철학·에세이 (단상·사유)'
}

export function buildPrompt({ category, channel, keywords, memo }) {
  const ch = CHANNEL_GUIDE[channel]
  return `${HANOK_BIBLE}

---

위 바이블에 따라 hanok의 글을 작성해줘.

[글쓰기 요청]
카테고리: ${CATEGORY_LABEL[category]}
채널: ${ch.label}
키워드/경험: ${keywords}
${memo ? `추가 메모: ${memo}` : ''}

[채널 가이드]
${ch.guide}

설명이나 전문 없이 글 본문부터 바로 시작해줘.`
}

export async function generateContent({ category, channel, keywords, memo, apiKey, onChunk, onDone, onError }) {
  const prompt = buildPrompt({ category, channel, keywords, memo })

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        stream: true,
        messages: [{ role: 'user', content: prompt }]
      })
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error?.message || '오류가 발생했어요')
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let full = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const chunk = decoder.decode(value)
      const lines = chunk.split('\n').filter(l => l.startsWith('data: '))
      for (const line of lines) {
        const data = line.slice(6)
        if (data === '[DONE]') continue
        try {
          const json = JSON.parse(data)
          const text = json.delta?.text || ''
          if (text) {
            full += text
            onChunk(full)
          }
        } catch {}
      }
    }
    onDone(full)
  } catch (e) {
    onError(e.message)
  }
}

export { CHANNEL_GUIDE, CATEGORY_LABEL }
