import site from '../data/site'

export default function ContactButton({ label = 'تماس و مشاوره', className = 'price-cta-call' }) {
  return (
    <a className={className} href={site.telLink} aria-label="تماس تلفنی">
      📞 {label} — {site.phoneDisplay}
    </a>
  )
}