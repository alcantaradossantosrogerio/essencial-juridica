// ============================================================
// Site Configuration
// ============================================================

export interface SiteConfig {
  language: string;
  brandName: string;
}

export const siteConfig: SiteConfig = {
  language: "pt-BR",
  brandName: "Essencial Jurídica",
};

// ============================================================
// Navigation
// ============================================================

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  links: NavLink[];
  ctaText: string;
}

export const navigationConfig: NavigationConfig = {
  links: [
    { label: "Início", href: "#hero" },
    { label: "Atuação", href: "#curriculum" },
    { label: "Escritório", href: "#cinematic" },
    { label: "Destaques", href: "#alumni" },
  ],
  ctaText: "Fale Conosco",
};

// ============================================================
// Hero
// ============================================================

export interface HeroConfig {
  title: string;
  subtitleLine1: string;
  subtitleLine2: string;
  ctaText: string;
}

export const heroConfig: HeroConfig = {
  title: "Essencial",
  subtitleLine1: "Consultoria jurídica em Goiânia com atendimento humano, estratégico e personalizado.",
  subtitleLine2: "Segurança jurídica para você e sua empresa.",
  ctaText: "Agende uma consulta",
};

// ============================================================
// Capabilities (Áreas de Atuação)
// ============================================================

export interface CapabilityItem {
  title: string;
  slug: string;
  description: string;
  image: string;
}

export interface CapabilitiesConfig {
  sectionLabel: string;
  items: CapabilityItem[];
}

export const capabilitiesConfig: CapabilitiesConfig = {
  sectionLabel: "Áreas de Atuação",
  items: [
    {
      title: "Direito Civil",
      slug: "direito-civil",
      description:
        "Contratos, responsabilidade civil, indenizações e cobranças. Atuação preventiva e contenciosa para proteger seus direitos e seu patrimônio em qualquer situação.",
      image: "/images/direito-civil.png",
    },
    {
      title: "Direito Trabalhista",
      slug: "direito-trabalhista",
      description:
        "Defesa de empregados e empresas em reclamações trabalhistas, acordos, verbas rescisórias e assessoria preventiva em relações de trabalho.",
      image: "/images/direito-trabalhista.png",
    },
    {
      title: "Direito de Família",
      slug: "direito-de-familia",
      description:
        "Divórcio, guarda, pensão alimentícia, inventário e planejamento sucessório, conduzidos com sensibilidade, discrição e foco na melhor solução.",
      image: "/images/direito-familia.png",
    },
    {
      title: "Direito Empresarial",
      slug: "direito-empresarial",
      description:
        "Constituição de empresas, contratos comerciais, societário e consultoria contínua para o crescimento seguro do seu negócio.",
      image: "/images/direito-empresarial.png",
    },
  ],
};

// ============================================================
// Capability Detail (sub-pages)
// ============================================================

export interface CapabilityDetailData {
  title: string;
  subtitle: string;
  paragraphs: string[];
}

export interface CapabilityDetailConfig {
  sectionLabel: string;
  backLinkText: string;
  prevLabel: string;
  nextLabel: string;
  notFoundText: string;
  capabilities: Record<string, CapabilityDetailData>;
}

export const capabilityDetailConfig: CapabilityDetailConfig = {
  sectionLabel: "Área de Atuação",
  backLinkText: "Voltar ao início",
  prevLabel: "Anterior",
  nextLabel: "Próxima",
  notFoundText: "Área não encontrada.",
  capabilities: {
    "direito-civil": {
      title: "Direito Civil",
      subtitle: "Proteção patrimonial e segurança nas relações jurídicas",
      paragraphs: [
        "O Direito Civil atravessa praticamente todos os momentos da vida: a compra de um imóvel, a assinatura de um contrato, um dano sofrido ou uma dívida a cobrar. Na Essencial Consultoria Jurídica, analisamos cada caso de forma individual, buscando sempre a solução mais rápida e econômica para o cliente.",
        "Atuamos na elaboração e revisão de contratos, ações de cobrança e execução, indenizações por danos materiais e morais, responsabilidade civil, direito imobiliário e do consumidor. Nosso trabalho começa antes do conflito: orientamos o cliente para evitar litígios desnecessários.",
        "Quando o litígio é inevitável, conduzimos o processo com estratégia clara, prazos monitorados e comunicação constante. Você sabe exatamente em que pé está o seu caso, sem juridiquês e sem surpresas.",
      ],
    },
    "direito-trabalhista": {
      title: "Direito Trabalhista",
      subtitle: "Equilíbrio e segurança nas relações de trabalho",
      paragraphs: [
        "As relações de trabalho exigem atenção constante à legislação e à jurisprudência. Representamos empregados na defesa de direitos como verbas rescisórias, horas extras, adicionais, assédio moral e rescisão indireta, sempre com análise criteriosa dos documentos e da rotina de trabalho.",
        "Para empresas, oferecemos assessoria preventiva completa: revisão de contratos, políticas internas, jornada, terceirização e negociações coletivas. Prevenir passivo trabalhista é sempre mais barato do que litigar.",
        "Em reclamações trabalhistas, atuamos com estratégia negocial forte, buscando acordos vantajosos quando possível e defesa técnica rigorosa quando necessário, do juízo de primeiro grau aos tribunais superiores.",
      ],
    },
    "direito-de-familia": {
      title: "Direito de Família",
      subtitle: "Sensibilidade e técnica nos momentos mais delicados",
      paragraphs: [
        "Questões de família envolvem afeto, patrimônio e, muitas vezes, filhos. Por isso, conduzimos cada caso com escuta atenta e discrição absoluta, buscando soluções que preservem relações e reduzam o desgaste emocional de todos os envolvidos.",
        "Atuamos em divórcios consensuais e litigiosos, guarda e convivência, pensão alimentícia, investigação de paternidade, adoção, união estável e pactos antenupciais. Sempre que possível, priorizamos a composição amigável por meio de negociação e mediação.",
        "Também cuidamos do futuro da sua família: inventários judiciais e extrajudiciais, testamentos e planejamento sucessório, garantindo que o patrimônio construído ao longo da vida seja transmitido com segurança e economia tributária.",
      ],
    },
    "direito-empresarial": {
      title: "Direito Empresarial",
      subtitle: "O jurídico como alavanca de crescimento do negócio",
      paragraphs: [
        "Empresas crescem com segurança quando o jurídico participa das decisões desde o início. Auxiliamos na escolha do tipo societário, constituição e alteração de empresas, acordos de sócios e governança, alinhando a estrutura legal aos objetivos do negócio.",
        "Elaboramos e negociamos contratos comerciais de toda natureza: prestação de serviços, fornecimento, distribuição, franquia, locação comercial e parcerias estratégicas. Cada cláusula é pensada para prevenir conflitos e proteger o fluxo de caixa.",
        "Oferecemos consultoria contínua por assinatura, com resposta ágil às demandas do dia a dia: cobranças, recuperação de crédito, adequação à LGPD e suporte em negociações. Seu negócio com um departamento jurídico completo, sob medida.",
      ],
    },
  },
};

// ============================================================
// Architecture (O Escritório / CinematicVision)
// ============================================================

export interface ArchitectureConfig {
  sectionLabel: string;
  videoPath: string;
  title: string;
  description: string;
}

export const architectureConfig: ArchitectureConfig = {
  sectionLabel: "O Escritório",
  videoPath: "",
  title: "Advocacia com propósito, técnica e proximidade",
  description:
    "Na Av. Olinda, no Jardim Novo Mundo, a Essencial Consultoria Jurídica nasceu da convicção de que o Direito deve ser acessível e compreensível. Unimos rigor técnico a um atendimento próximo: cada cliente é ouvido, cada caso tem estratégia própria e cada etapa é explicada em linguagem clara. Profissionais confiáveis e de credibilidade — como dizem nossos clientes.",
};

// ============================================================
// Research (Destaques / AlumniArchives)
// ============================================================

export interface ResearchProject {
  title: string;
  year: string;
  discipline: string;
  image: string;
}

export interface ResearchConfig {
  sectionLabel: string;
  projects: ResearchProject[];
}

export const researchConfig: ResearchConfig = {
  sectionLabel: "Destaques da Atuação",
  projects: [
    {
      title: "Consultoria Preventiva",
      year: "2025",
      discipline: "Empresarial",
      image: "/images/destaque-consultoria.png",
    },
    {
      title: "Acordos e Mediação",
      year: "2025",
      discipline: "Resolução de Conflitos",
      image: "/images/destaque-mediacao.png",
    },
    {
      title: "Contencioso Estratégico",
      year: "2024",
      discipline: "Cível",
      image: "/images/destaque-contencioso.png",
    },
    {
      title: "Planejamento Sucessório",
      year: "2024",
      discipline: "Família e Sucessões",
      image: "/images/destaque-sucessorio.png",
    },
    {
      title: "Assessoria Trabalhista",
      year: "2023",
      discipline: "Trabalho",
      image: "/images/destaque-trabalhista.png",
    },
    {
      title: "Contratos sob Medida",
      year: "2023",
      discipline: "Negocial",
      image: "/images/destaque-contratos.png",
    },
    {
      title: "Recuperação de Crédito",
      year: "2022",
      discipline: "Cobrança",
      image: "/images/destaque-credito.png",
    },
    {
      title: "Atendimento Humanizado",
      year: "2022",
      discipline: "Relacionamento",
      image: "/images/destaque-atendimento.png",
    },
  ],
};

// ============================================================
// Footer
// ============================================================

export interface FooterLinkColumn {
  title: string;
  links: string[];
}

export interface FooterBottomLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  heading: string;
  columns: FooterLinkColumn[];
  copyright: string;
  bottomLinks: FooterBottomLink[];
}

export const footerConfig: FooterConfig = {
  heading: "Vamos conversar?",
  columns: [
    {
      title: "Contato",
      links: [
        "Av. Olinda, 165 - Sl 101",
        "Jardim Novo Mundo, Goiânia - GO",
        "CEP 74715-350",
        "(62) 3921-3933",
      ],
    },
    {
      title: "Horário de Atendimento",
      links: [
        "Segunda a sexta",
        "08:00 às 18:00",
        "Sábado e domingo: fechado",
        "Atendimento mediante agendamento",
      ],
    },
  ],
  copyright: "© 2025 Essencial Consultoria Jurídica — Goiânia, Goiás",
  bottomLinks: [
    { label: "Início", href: "#hero" },
    { label: "Atuação", href: "#curriculum" },
    { label: "Contato", href: "#footer" },
  ],
};

// ============================================================
// WhatsApp & Extra Config
// ============================================================

export interface ExtraConfig {
  whatsappNumber: string;
  whatsappUrl: string;
}

export const extraConfig: ExtraConfig = {
  whatsappNumber: "+55 (62) 3921-3933",
  whatsappUrl: "https://wa.me/556239213933?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20jur%C3%ADdica.",
};

// ============================================================
// O Método Essencial (Method Section)
// ============================================================

export interface MethodStep {
  number: string;
  title: string;
  description: string;
}

export interface MethodConfig {
  sectionLabel: string;
  title: string;
  subtitle: string;
  steps: MethodStep[];
}

export const methodConfig: MethodConfig = {
  sectionLabel: "O Método Essencial",
  title: "Estratégia e Técnica Impenetráveis",
  subtitle: "Como protegemos os seus interesses e o seu patrimônio com excelência",
  steps: [
    {
      number: "01",
      title: "Diagnóstico Preventivo",
      description: "Análise profunda de riscos e direitos antes de qualquer ação. Mapeamos os caminhos mais seguros e eficientes para evitar litígios desnecessários ou preparar uma defesa robusta."
    },
    {
      number: "02",
      title: "Planejamento Estratégico",
      description: "Desenvolvimento de estratégias jurídicas personalizadas para cada caso, com foco em resultados céleres, redução de passivos e proteção de ativos."
    },
    {
      number: "03",
      title: "Execução Técnica Rigorosa",
      description: "Condução do caso com precisão processual absoluta, prazos monitorados e negociações firmes, mantendo você sempre informado em linguagem clara e direta."
    }
  ]
};

// ============================================================
// Depoimentos (Vozes de Sucesso)
// ============================================================

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export interface TestimonialsConfig {
  sectionLabel: string;
  title: string;
  items: TestimonialItem[];
}

export const testimonialsConfig: TestimonialsConfig = {
  sectionLabel: "Depoimentos",
  title: "Vozes de Sucesso e Confiança",
  items: [
    {
      quote: "A Essencial nos atendeu em um momento crítico de reestruturação de contratos. O rigor técnico e a clareza nas explicações nos deram a segurança que precisávamos.",
      author: "Carlos E. Silva",
      role: "Diretor da Alpha Tech"
    },
    {
      quote: "Atendimento humano, extremamente profissional e com retorno rápido. Resolveram nosso inventário de forma muito ágil e consensual.",
      author: "Mariana R. de Souza",
      role: "Cliente de Direito de Família"
    },
    {
      quote: "Excelente assessoria jurídica empresarial. Preveniram passivos trabalhistas que poderiam comprometer nosso caixa. Recomendo muito.",
      author: "Roberto Albuquerque",
      role: "Sócio do Grupo Albuquerque"
    }
  ]
};

