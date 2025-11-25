// Exportar caminhos das logos para fácil manutenção
export const LOGOS = {
  // Logo principal (colorida)
  primary: '/Guia-Lafaiete-02.svg',
  
  // Logo branca (para fundos escuros)
  white: '/Guia-Lafaiete-06.svg',
  
  // Logo preta (para fundos claros)
  black: '/Guia-Lafaiete-04.svg',
  
  // Favicon
  favicon: '/Guia-Lafaiete-favicon.svg',
  
  // Outras variações
  variant1: '/Guia-Lafaiete-01.svg',
  variant3: '/Guia-Lafaiete-03.svg',
  variant5: '/Guia-Lafaiete-05.svg',
} as const

// Tipos para TypeScript
export type LogoKey = keyof typeof LOGOS
