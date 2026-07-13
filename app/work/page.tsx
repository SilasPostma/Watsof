import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Work } from "@/components/work"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Work — watsof",
  description: "Selected projects built by watsof.",
}

export default function WorkPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Work />
      </main>
      <Footer />
    </div>
  )
}
