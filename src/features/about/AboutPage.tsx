import { ExternalLink } from '../../components/ExternalLink'
import { loadResearchCatalog } from '../../research/catalog'
import type { Locale } from '../../research/schema'
import './about.css'

export function AboutPage({ locale }: { locale: Locale }) {
  const catalog = loadResearchCatalog()
  const tr = locale === 'tr'
  return (
    <article className="page research-page about-page">
      <header className="research-hero about-hero">
        <p className="eyebrow">{tr ? 'CTX · açık araştırma aracı' : 'CTX · open research instrument'}</p>
        <h1>{tr ? 'Bağlam bir altyapıdır.' : 'Context is infrastructure.'}</h1>
        <p>{tr ? 'CTX, modelden önce çalışan bilgi sistemini görünür ve denetlenebilir kılar.' : 'CTX makes the information system before the model visible and inspectable.'}</p>
      </header>
      <div className="about-grid">
        <aside><span className="mono-label">01—04</span><p>{tr ? 'Yöntem, sınırlar, lisans ve güncellik.' : 'Method, boundaries, licensing, and currency.'}</p></aside>
        <div className="about-sections">
          <section><span className="section-number">01</span><div><h2>{tr ? 'Kanıt politikası' : 'Evidence policy'}</h2><p>{tr ? 'Kanıt, yayımlanmış birincil kaynağın doğrudan desteklediği iddiadır. Sentez, kaynaklar arasında kurduğumuz açık bağlantıdır. Takip sinyali ise henüz kalıcı pratik saymadığımız yeni gelişmedir.' : 'Evidence is a claim directly supported by published primary material. Synthesis is an explicit connection we make across sources. A watch signal is a newer development that we do not yet treat as durable practice.'}</p><ul><li>{tr ? 'Kaynak bağlantıları iddia seviyesinde korunur.' : 'Source links are retained at claim level.'}</li><li>{tr ? 'İnceleme tarihi her kayıtta görünür.' : 'Every record exposes its review date.'}</li><li>{tr ? 'Kalite kapıları otomatik geçer sayılmaz.' : 'Quality gates never pass automatically.'}</li></ul></div></section>
          <section><span className="section-number">02</span><div><h2>{tr ? 'Araştırma yöntemi' : 'Research method'}</h2><p>{tr ? `${catalog.sources.length} birincil kaynak, ${catalog.claims.length} ayrıştırılmış iddia ve ${catalog.methods.length} teknik ${catalog.snapshot.cutoff} kesim tarihinde birlikte doğrulandı. Katalog, yalnız doğrulanmış kimlikler ve bağlantılarla derlenir.` : `${catalog.sources.length} primary sources, ${catalog.claims.length} separated claims, and ${catalog.methods.length} techniques were validated together at the ${catalog.snapshot.cutoff} cutoff. The catalog builds only when identifiers and references resolve.`}</p></div></section>
          <section><span className="section-number">03</span><div><h2>{tr ? 'Portföy sınırı' : 'Portfolio boundary'}</h2><p>{tr ? 'CTX, AIA ile LLM arasında seçilen kabiliyetleri güvenilir bağlama; HNS öncesinde ise öğrenme ve bellek akışına bağlar. Özel kullanıcı verisi, kişisel hatırlama veya gizli kaynak içeriği barındırmaz.' : 'CTX connects capabilities selected in AIA and LLM to reliable context, then hands the learning and memory flow toward HNS. It stores no private user data, personal recall, or confidential source content.'}</p><p className="portfolio-flow">AIA <span>→</span> LLM <span>→</span> <strong>CTX</strong> <span>→</span> HNS</p></div></section>
          <section><span className="section-number">04</span><div><h2>{tr ? 'Lisans ve katkı' : 'License and contribution'}</h2><p>{tr ? 'Kaynak kodu MIT lisanslıdır. Özgün editoryal içerik CC BY 4.0 koşullarıyla paylaşılır; bağlantılı kaynaklar kendi haklarına tabidir.' : 'Source code is MIT licensed. Original editorial content is shared under CC BY 4.0; linked material remains subject to its own rights.'}</p><ExternalLink href="https://github.com/aserdargun/ctx-aserdargun-com">{tr ? 'GitHub deposunu aç' : 'Open the GitHub repository'}</ExternalLink></div></section>
        </div>
      </div>
    </article>
  )
}
