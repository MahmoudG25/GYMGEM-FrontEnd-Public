import {
  Facebook,
  Twitter,
  Github,
  Instagram,
  Linkedin,
  Youtube,
  Home,
  Mail,
  Phone,
  PhoneCall,
  Briefcase,
} from "lucide-react";
import { FaGem } from "react-icons/fa";

function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40 text-muted-foreground w-full">
      <div className="mx-auto w-[80%]  px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 border-b border-border/60 pb-8 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3 text-foreground">
            <FaGem className="text-xl text-secondary" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Stay in sync with GymGem
              </p>
              <p className="text-xs text-muted-foreground">
                Follow along for new programs, community highlights, and product
                updates.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-foreground">
            {[Facebook, Twitter, Instagram, Youtube, Github, Linkedin].map(
              (Icon, index) => (
                <a
                  key={`social-${index}`}
                  href="#!"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground transition hover:-translate-y-0.5 hover:border-ring hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            )}
          </div>
        </div>

        <div className="grid gap-8 py-12 text-center text-sm sm:grid-cols-2 sm:text-left lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 font-semibold text-foreground sm:justify-start">
              <FaGem className="text-base text-secondary" />
              GYMGEM
            </div>
            <p>
              We bring trainers, gyms, stores, and trainees together through
              calm, purposeful experiences that keep the focus on progress.
            </p>
          </div>

          <div className="space-y-3">
            <h6 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Explore
            </h6>
            <ul className="space-y-2">
              <li>
                <a href="#!" className="transition hover:text-foreground">
                  Programs
                </a>
              </li>
              <li>
                <a href="#!" className="transition hover:text-foreground">
                  Trainers
                </a>
              </li>
              <li>
                <a href="#!" className="transition hover:text-foreground">
                  Nutrition
                </a>
              </li>
              <li>
                <a href="#!" className="transition hover:text-foreground">
                  Partnerships
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h6 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Resources
            </h6>
            <ul className="space-y-2">
              <li>
                <a href="#!" className="transition hover:text-foreground">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#!" className="transition hover:text-foreground">
                  Support
                </a>
              </li>
              <li>
                <a href="#!" className="transition hover:text-foreground">
                  Guides
                </a>
              </li>
              <li>
                <a href="#!" className="transition hover:text-foreground">
                  Updates
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h6 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Contact
            </h6>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <Home className="h-4 w-4" />
                Cairo, Egypt
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <Mail className="h-4 w-4" />
                hello@gymgem.com
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <Phone className="h-4 w-4" />
                +20 101 234 5678
              </li>
              <li className="flex items-center justify-center gap-2 sm:justify-start">
                <PhoneCall className="h-4 w-4" />
                +20 101 876 5432
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} GymGem. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#!" className="transition hover:text-foreground">
              Privacy
            </a>
            <a href="#!" className="transition hover:text-foreground">
              Terms
            </a>
            <a href="#!" className="transition hover:text-foreground">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
