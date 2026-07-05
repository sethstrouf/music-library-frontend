import { useEffect } from 'react'

const About = () => {
  useEffect(() => {
    document.title = 'About — Songsemble'
  }, [])

  return (
    <div className="page-container">
      <h1 className="page-title">About Songsemble</h1>
      <div className="card mt-8 max-w-3xl">
        <p className="text-lg leading-relaxed text-slate-600">
          Songsemble is a music library and networking platform built for choir, band, and orchestra
          directors. It helps you catalog repertoire, track copies and performance history, and connect
          with colleagues to discover what others are programming.
        </p>
        <p className="mt-4 text-slate-600">
          Created by Seth Strouf for music directors who want a better way to manage repertoire.
        </p>
      </div>
    </div>
  )
}

export default About
