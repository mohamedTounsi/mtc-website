import {
  Facebook,
  Linkedin,
  Instagram,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-500/10 rounded-full blur-md animate-pulse delay-500"></div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-2">
                <h3 className="text-[2px] sm:text-[4px] font-dreams tracking-[0.3em] uppercase text-purple-300">
                  MICROSOFT
                </h3>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  TECH CLUB ISIM-SFAX
                </h2>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed max-w-md">
                Empowering students with cutting-edge technology skills and
                fostering innovation through collaborative learning and hands-on
                projects.
              </p>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400 mr-2">Follow us:</span>
                <a
                  href="https://www.facebook.com/microsoft.tech.club.isims"
                  className="group w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  aria-label="Facebook"
                  target="_blank"
                >
                  <Facebook
                    size={18}
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                </a>
                <a
                  href="https://www.instagram.com/mtc.isims/"
                  className="group w-10 h-10 bg-gradient-to-br from-pink-600 to-purple-700 rounded-xl flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
                  aria-label="Instagram"
                  target="_blank"
                >
                  <Instagram
                    size={18}
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/microsoft-tech-club-isims/"
                  className="group w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  aria-label="LinkedIn"
                  target="_blank"
                >
                  <Linkedin
                    size={18}
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-semibold text-purple-200 uppercase tracking-wide">
                Quick Links
              </h3>
              <nav className="flex flex-col space-y-3">
                {["Home", "Benefits", "Gallery", "About us", "Join us"].map(
                  (link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-sm text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group flex items-center"
                    >
                      <span className="w-0 h-0.5 bg-purple-500 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                      {link}
                    </a>
                  )
                )}
              </nav>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-sm font-semibold text-purple-200 uppercase tracking-wide">
                Contact Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <span>contact@mtcisims.tn</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <Phone size={16} />
                  </div>
                  <span>+216 55 581 375</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <MapPin size={16} />
                  </div>
                  <span>ISIM Sfax, Tunisia</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  Contact <span className="text-purple-300">us</span>
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Ready to join our community?
                </p>
                <button className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                  Get in Touch
                  <ArrowUpRight
                    size={18}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-gray-400">
              <span>© 2025 Microsoft Tech Club ISIM-Sfax</span>
              <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
              <span>All rights reserved</span>
            </div>

            <div className="flex items-center gap-6 text-xs text-gray-400">
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
