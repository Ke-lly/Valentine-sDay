export const storyData = {
  couple: {
    giver: "Kelly",
    receiver: "Gustavo",
    surname: "Rank",
  },
  relationship: {
    startDate: new Date("YYYY-MM-DD"), // ← Data real do relacionamento
    friendshipStartDate: new Date("YYYY-MM-DD"), // ← Data da amizade
  },
  openingLetter: {
    sealText: "G & K",
    letterLines: [
      "Para o homem que transformou minha amizade em amor...",
      "Para aquele que me faz querer escrever cartas às três da manhã...",
      // adicionar linhas reais aqui
    ],
    ctaText: "Entrar na nossa história",
  },
  chapters: {
    I: {
      title: "Nós antes do Nós",
      subtitle: "A amizade que virou tudo",
      epigraph: "Às vezes a maior história de amor começa com 'olá, amigo'.",
    },
    II: {
      title: "Quando Tudo Começou a Mudar",
      subtitle: "O exato momento em que você deixou de ser só meu amigo",
      epigraph: "Você deve ter percebido antes de mim.",
    },
    // ... demais capítulos
  },
}
