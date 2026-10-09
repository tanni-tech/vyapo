import { Hero } from '@/components/sections/Hero'
import { ClientMarquee } from '@/components/sections/ClientMarquee'
import { SectorPanels } from '@/components/sections/SectorPanels'
import { WorkStrip } from '@/components/sections/WorkStrip'
import { HowWeWork } from '@/components/sections/HowWeWork'
import { AllianceSection } from '@/components/sections/AllianceSection'
import { Proof } from '@/components/sections/Proof'
import { VyapoIDTeaser } from '@/components/sections/VyapoIDTeaser'
import { ContactSection } from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientMarquee />
      <SectorPanels />
      <WorkStrip />
      <HowWeWork />
      <AllianceSection />
      <Proof />
      <VyapoIDTeaser />
      <ContactSection />
    </>
  )
}
