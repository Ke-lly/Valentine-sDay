// app/layout.tsx
import type { Metadata } from "next"
import "@/styles/globals.css"
import { StoryProvider } from "@/context/StoryContext"

export const metadata: Metadata = {
  title: "Para Gustavo",
  description: "Uma história escrita para você.",
  robots: { index: false, follow: false }, // experiência privada
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <StoryProvider>{children}</StoryProvider>
      </body>
    </html>
  )
}
