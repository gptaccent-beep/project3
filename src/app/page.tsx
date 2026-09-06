import BeeNature from "@/components/site/BeeNature"
import Benefits from "@/components/site/Benefits"
import FinalCta from "@/components/site/FinalCta"
import Hero from "@/components/site/Hero"
import Motion from "@/components/site/Motion"
import Products from "@/components/site/Products"
import SiteFooter from "@/components/site/SiteFooter"
import SiteHeader from "@/components/site/SiteHeader"
import Story from "@/components/site/Story"
import Testimonials from "@/components/site/Testimonials"

/**
 * BOUZID home page.
 *
 * Every section reads from its own typed defaults, so this page renders with no
 * props at all. To wire it back to a CMS / admin panel, pass the loaded section
 * content down as props (see README section 3).
 */
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <Products />
        <Story />
        <Benefits />
        <BeeNature />
        <Testimonials />
        <FinalCta />
      </main>

      <SiteFooter />

      {/* Boots the dependency-free scroll/parallax/counter engine */}
      <Motion />
    </>
  )
}
