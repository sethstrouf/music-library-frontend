const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <div className="footer-shell">
      <p data-testid="copyright">&copy; {year} Songsemble</p>
    </div>
  )
}

export default Footer
