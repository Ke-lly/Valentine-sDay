export interface CapsuleItem {
  id: string
  label: string          // "Bilhete secreto", "Promessa selada"
  icon: string           // emoji ou nome do ícone
  revealText: string     // Texto revelado ao abrir
  animationType: "unfold" | "shatter" | "bloom" | "float"
}

export const capsuleItems: CapsuleItem[] = [
  {
    id: "capsule-001",
    label: "Uma promessa",
    icon: "🔮",
    revealText: "Prometo que...",
    animationType: "bloom",
  },
  // adicionar itens
]
