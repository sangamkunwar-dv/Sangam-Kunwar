import Image from "next/image"
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/sangam-kunwar-14b89834a/",
      label: "LinkedIn",
    },
    {
      icon: Github,
      href: "https://github.com/sangamkunwar-dv",
      label: "GitHub",
    },
    {
      icon: Mail,
      href: "mailto:info@sangamkunwar.com.np",
      label: "Email",
    },
  ]

  return (
    <footer id="contact" className="border-t border-border bg-muted/30 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-3 mb-10">

          {/* Brand + Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              
              {/* LOGO IMAGE (put your logo in /public/logo.png) */}
              <Image
                src="/sangamkunwarphoto.png"
                alt="Sangam Kunwar Logo"
                width={40}
                height={40}
                className="rounded-xl shadow-md"
              />

              {/* TEXT LOGO (fallback if no image) */}
              <h3 className="text-lg font-bold text-primary tracking-wide">
                Sangam Kunwar
              </h3>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Full-stack developer building modern, scalable, and beautiful digital experiences.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Contact</h4>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-muted-foreground hover:text-primary transition">
                <Mail size={16} />
                <a href="mailto:info@sangamkunwar.com.np">
                  info@sangamkunwar.com.np
                </a>
              </li>

              <li className="flex items-center gap-3 text-muted-foreground hover:text-primary transition">
                <Phone size={16} />
                <a href="https://wa.me/9779701024066">
                  +977 9701024066
                </a>
              </li>

              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin size={16} />
                <span>Tilottama-8, Rupandehi, Nepal</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Connect</h4>

            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-3 rounded-xl bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {currentYear} <span className="font-medium text-foreground">Sangam Kunwar</span>. All rights reserved.
          </p>.
        </div>
      </div>
    </footer>
  )
}