import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white py-12 mt-2">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Adaba Farm</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Sustainable coconut farming for a better future. Invest with us and grow your wealth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#plans" className="hover:text-secondary transition-colors">
                  Investment Plans
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-secondary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-secondary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-secondary" />
                <span>+234 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-secondary" />
                <span>info@adabafarm.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-secondary" />
                <span>Nigeria</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <p className="text-center text-white/70 text-sm">
            © {currentYear} Adaba Coconut Farm & Resort. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
