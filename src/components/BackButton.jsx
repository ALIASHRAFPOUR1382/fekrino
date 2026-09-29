export default function BackButton({ onClick }) {
  return (
    <button className="back-btn" onClick={onClick}>
      <span>↩</span> بازگشت
    </button>
  )
}