export interface MemoryItem {
  id: string;
  date: string;
  title: string;
  text: string;
  imageUrl: string;
}

export interface CapsuleItem {
  id: string;
  title: string;
  dateStr: string;
  content: string;
  type: 'letter' | 'photo' | 'message';
  imageUrl?: string;
}

export const SYSTEM_CONFIG = {
  anniversaryDate: "2023-06-12T19:30:00", // Insira a data exata do início do relacionamento aqui
  musicUrl: "/audio/soundtrack.mp3", // Certifique-se de colocar o arquivo em public/audio/soundtrack.mp3
};

export const CHAPTER_DATA = {
  chapter1: {
    title: "Nós Antes do Nós",
    subtitle: "A fundação silenciosa do nosso destino",
    paragraphs: [
      "Tudo começou sob o disfarce de uma amizade comum. Duas órbitas distintas que se cruzavam casualmente, sem saber que a gravidade já estava agindo.",
      "Cada risada compartilhada, cada conversa fiada nas madrugadas de inverno, pavimentava secretamente o caminho para o que se tornaria a história mais linda da nossa vida. Nós éramos apenas amigos, mas o universo assistia com um sorriso cúmplice."
    ],
    images: ["/img/amizade1.jpg", "/img/amizade2.jpg"]
  },
  chapter2: {
    title: "Quando Tudo Começou a Mudar",
    subtitle: "O silêncio que passou a dizer tudo",
    paragraphs: [
      "De repente, o olhar mudou. O som da sua risada não era mais apenas reconfortante, tornara-se essencial. A mente começou a criar desculpas bobas só para estar perto de você.",
      "Foi o momento em que descobrimos que a verdadeira magia não acontece num estalar de dedos, mas na transição sutil onde o abraço de um amigo vira o porto seguro do amor da sua vida."
    ]
  },
  stats: {
    daysTogether: 1085, // Calculado de forma estática ou dinâmica
    hoursShared: "26.040+",
    memoriesCount: 500,
    favoriteSong: "Nossa Canção Eterna"
  },
  timeline: [
    {
      id: "tl1",
      date: "12 de Outubro de 2022",
      title: "O Primeiro Olhar Diferente",
      text: "Aquele café frio que se estendeu por quatro horas inteiras. Foi ali que o roteiro mudou.",
      imageUrl: "/img/timeline1.jpg"
    },
    {
      id: "tl2",
      date: "18 de Dezembro de 2022",
      title: "A Viagem Inesquecível",
      text: "Sob as luzes da cidade, dividindo o mesmo casaco e os mesmos medos do futuro.",
      imageUrl: "/img/timeline2.jpg"
    },
    {
      id: "tl3",
      date: "12 de Junho de 2023",
      title: "O Pedido",
      text: "O momento em que as palavras falharam, mas o coração respondeu com absoluta certeza.",
      imageUrl: "/img/timeline3.jpg"
    }
  ] as MemoryItem[],
  capsule: [
    {
      id: "cap1",
      title: "Bilhete Guardado de 2023",
      dateStr: "Guardado em Junho/23",
      content: "Eu sabia desde aquela noite que seria você. Não havia outro fim possível para nós.",
      type: "letter"
    },
    {
      id: "cap2",
      title: "A Primeira Foto Oculta",
      dateStr: "Registrado em Jan/24",
      content: "Você sorrindo distraído enquanto tentava aprender a cozinhar para mim.",
      type: "photo",
      imageUrl: "/img/capsule2.jpg"
    }
  ] as CapsuleItem[]
};