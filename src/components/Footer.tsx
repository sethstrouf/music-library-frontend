const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <div className="mt-8">
      <p data-testid="copyright" className="text-center text-base text-gray-500 pt-4">
        &copy; {year} Seth Strouf
      </p>
    </div>
  )
}

export default Footer
