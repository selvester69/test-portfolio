"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { getNavItems, getPersonalInfo } from "@/lib/data"

export function PortfolioHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  const navItems = getNavItems()
  const personalInfo = getPersonalInfo()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Determine active section based on scroll position
      const sections = navItems.filter((item) => item.href.startsWith("#")).map((item) => item.href.substring(1))

      // If scrolled to top, set Home as active
      if (window.scrollY < 100) {
        setActiveSection("")
        return
      }

      // Find the current section in view
      let foundSection = ""
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if section is in the middle of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            foundSection = section
            break
          }
        }
      }

      // Fallback: find the section closest to the top
      if (!foundSection) {
        for (const section of sections.reverse()) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 150) {
              foundSection = section
              break
            }
          }
        }
      }

      setActiveSection(foundSection)
    }

    window.addEventListener("scroll", handleScroll)
    // Call once on mount to set initial state
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleNavClick = (href: string, isDownload?: boolean) => {
    if (href === "/") {
      // Scroll to top for home
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      setActiveSection("")
    } else if (isDownload) {
      // Handle resume download
      const link = document.createElement("a")
      link.href = personalInfo.resumeUrl
      link.download = `${personalInfo.name.replace(/\s+/g, "-")}-Resume.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        scrolled ? "bg-zinc-900/90 backdrop-blur-md shadow-md py-2" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo/Name */}
        <Link href="/" className="flex items-center group">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold text-xl relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
            {personalInfo.name}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </div>
          <span className="text-zinc-400 text-sm ml-2 hidden sm:inline-block transition-all duration-300 group-hover:text-zinc-300">
            / {personalInfo.title}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? activeSection === "" : activeSection === item.href.substring(1)
            const isDownload = item.isDownload

            if (isDownload) {
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href, isDownload)}
                  className="px-3 py-2 text-sm relative group transition-all duration-300 text-zinc-400 hover:text-white flex items-center"
                >
                  <Download className="w-3 h-3 mr-1" />
                  <span className="relative z-10">{item.label}</span>

                  {/* Hover effect - subtle background glow */}
                  <span className="absolute inset-0 bg-cyan-500/0 rounded-md group-hover:bg-cyan-500/10 transition-all duration-300"></span>

                  {/* Hover effect - bottom border */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-4/5"></span>
                </button>
              )
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(item.href, isDownload)}
                className={cn(
                  "px-3 py-2 text-sm relative group transition-all duration-300",
                  isActive ? "text-cyan-400" : "text-zinc-400 hover:text-white",
                )}
              >
                <span className="relative z-10">{item.label}</span>

                {/* Hover effect - subtle background glow */}
                <span className="absolute inset-0 bg-cyan-500/0 rounded-md group-hover:bg-cyan-500/10 transition-all duration-300"></span>

                {/* Hover effect - bottom border */}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-4/5",
                    isActive && "w-4/5",
                  )}
                ></span>
              </Link>
            )
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-zinc-400 hover:text-white transition-colors duration-300 relative overflow-hidden group"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="relative z-10">{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}</span>
          <span className="absolute inset-0 scale-0 rounded-full bg-zinc-700/50 group-hover:scale-100 transition-transform duration-300"></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-black/95 z-40 flex flex-col pt-20 px-4 md:hidden transition-all duration-500",
          mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none",
        )}
      >
        <nav className="flex flex-col space-y-4">
          {navItems.map((item, index) => {
            const isActive = item.href === "/" ? activeSection === "" : activeSection === item.href.substring(1)
            const isDownload = item.isDownload

            if (isDownload) {
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    handleNavClick(item.href, isDownload)
                    setMobileMenuOpen(false)
                  }}
                  className="px-3 py-4 text-lg border-b border-zinc-800 relative group transition-all duration-300 text-zinc-300 hover:text-white hover:pl-5 text-left flex items-center"
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    transform: mobileMenuOpen ? "translateX(0)" : "translateX(20px)",
                    opacity: mobileMenuOpen ? 1 : 0,
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="relative z-10">{item.label}</span>

                  {/* Hover effect - left border accent */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-1/2 bg-gradient-to-b from-cyan-400/20 to-blue-500/20 transition-all duration-300 group-hover:w-1"></span>
                </button>
              )
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "px-3 py-4 text-lg border-b border-zinc-800 relative group transition-all duration-300",
                  isActive ? "text-cyan-400 border-cyan-400/30" : "text-zinc-300 hover:text-white hover:pl-5",
                )}
                onClick={() => {
                  handleNavClick(item.href, isDownload)
                  setMobileMenuOpen(false)
                }}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  transform: mobileMenuOpen ? "translateX(0)" : "translateX(20px)",
                  opacity: mobileMenuOpen ? 1 : 0,
                }}
              >
                <span className="relative z-10">{item.label}</span>

                {/* Hover effect - left border accent */}
                <span
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 w-0 h-1/2 bg-gradient-to-b from-cyan-400/20 to-blue-500/20 transition-all duration-300 group-hover:w-1",
                    isActive && "w-1",
                  )}
                ></span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
