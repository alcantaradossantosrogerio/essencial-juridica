import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  Send, 
  Zap, 
  ExternalLink 
} from 'lucide-react';
import { usePrevidenciarioModal } from '../context/PrevidenciarioModalContext';

export default function ApresentacaoPipeline() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { openModal } = usePrevidenciarioModal();

  const slides = [
    {
      id: 'capa',
      tag: 'Estratégia & Crescimento Previdenciário',
      title: 'Máquina de Captação Previdenciária Inteligente',
      subtitle: 'Como transformar pesquisas no Google em clientes qualificados e com honorários fechados no WhatsApp da Dra. Lorena Cristina Rios.',
      badge: 'Apresentação Executiva • Essencial Advocacia',
    },
    {
      id: 'diagnostico',
      tag: '1. O Cenário Atual',
      title: 'Onde Estava o Gargalo do Site Antigo?',
      subtitle: 'Por que sites convencionais trazem custos e curiosos, em vez de clientes reais.',
    },
    {
      id: 'jornada',
      tag: '2. A Nova Arquitetura',
      title: 'O Funil Previdenciário de Alta Conversão',
      subtitle: 'A jornada desenhada para atrair quem precisa de auxílio ou aposentadoria urgente e filtrar curiosos antes do WhatsApp.',
    },
    {
      id: 'triagem-demo',
      tag: '3. A Tecnologia em Ação',
      title: 'Sistema de Triagem & Diagnóstico por IA',
      subtitle: 'O cliente responde 4 perguntas rápidas e a Dra. Lorena recebe a Ficha de Atendimento pronta.',
    },
    {
      id: 'vantagens',
      tag: '4. Valor Gerado',
      title: 'Proteção do Tempo da Dra. Lorena & Alto ROI',
      subtitle: 'Mais tempo para audiências e peças, menos tempo respondendo quem não tem direito.',
    },
    {
      id: 'proposta',
      tag: '5. Planos de Ativação',
      title: 'Opções de Parceria & Investimento',
      subtitle: 'Modelos flexíveis para colocar a máquina no ar e escalar a captação de clientes.',
    },
    {
      id: 'cronograma',
      tag: '6. Próximos Passos',
      title: 'Cronograma de Lançamento em 5 Dias',
      subtitle: 'Passo a passo rápido para o sistema começar a gerar contatos este mês.',
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col justify-between select-none relative overflow-hidden font-sans">
      
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#C8AA82]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-emerald-500/5 blur-[160px] pointer-events-none rounded-full" />

      {/* Top Bar / Header do Deck */}
      <header className="px-6 sm:px-12 py-5 border-b border-white/10 flex items-center justify-between z-20 backdrop-blur-md bg-black/40">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-[#C8AA82]/20 border border-[#C8AA82]/40 flex items-center justify-center text-[#C8AA82] font-serif font-bold text-base">
            E
          </span>
          <div>
            <span className="font-semibold text-sm tracking-wider uppercase text-white">
              Essencial Advocacia
            </span>
            <span className="hidden sm:inline text-neutral-400 text-xs ml-2">
              • Dra. Lorena Cristina Rios
            </span>
          </div>
        </div>

        {/* Indicadores de slides */}
        <div className="flex items-center gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? 'w-8 bg-[#C8AA82]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              title={`Slide ${idx + 1}: ${s.tag}`}
            />
          ))}
          <span className="text-xs text-neutral-400 ml-3 font-mono">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>

        <a
          href="/"
          className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Ver Site
        </a>
      </header>

      {/* Slide Content Area */}
      <main className="flex-1 flex items-center justify-center px-6 sm:px-12 md:px-20 py-8 z-10 max-w-6xl mx-auto w-full">
        
        {/* ============================================================ */}
        {/* SLIDE 0: Capa                                                */}
        {/* ============================================================ */}
        {currentSlide === 0 && (
          <div className="text-center max-w-3xl space-y-8 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C8AA82]/10 border border-[#C8AA82]/30 text-[#C8AA82] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              {slides[0].badge}
            </div>

            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] tracking-tight text-white"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              Máquina de Captação Previdenciária com IA
            </h1>

            <p className="text-neutral-300 text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              Como posicionar a <strong className="text-[#C8AA82] font-semibold">Essencial Advocacia</strong> no topo das pesquisas do Google e receber casos de Aposentadoria e BPC/LOAS <strong className="text-white">pré-qualificados</strong> no seu WhatsApp.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={nextSlide}
                className="bg-gradient-to-r from-[#C8AA82] to-[#e4ccaa] hover:from-white hover:to-white text-black font-bold uppercase text-xs tracking-wider px-8 py-4 rounded-lg flex items-center gap-2 shadow-xl transition-all cursor-pointer"
              >
                Iniciar Apresentação <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SLIDE 1: Diagnóstico do Cenário Atual                        */}
        {/* ============================================================ */}
        {currentSlide === 1 && (
          <div className="w-full space-y-8 animate-fadeIn">
            <div>
              <span className="text-xs font-semibold text-[#C8AA82] uppercase tracking-widest">
                {slides[1].tag}
              </span>
              <h2
                className="text-3xl sm:text-5xl font-normal text-white mt-1"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                {slides[1].title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Problema Antigo */}
              <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-4">
                <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                  <XCircle className="w-5 h-5" /> Modelo Anterior (Site KingHost Estático)
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    Site instável, quebrado e sem apelo visual no celular.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    Botão de WhatsApp solto: atrai curiosos que tomam tempo e não fecham.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    Sem posicionamento estratégico no Google quando alguém busca auxílio.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    Custo mensal de hospedagem sem gerar um único cliente.
                  </li>
                </ul>
              </div>

              {/* Card Novo Modelo */}
              <div className="p-6 rounded-2xl bg-[#C8AA82]/10 border border-[#C8AA82]/30 space-y-4">
                <div className="flex items-center gap-2 text-[#C8AA82] font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5" /> Nova Estratégia Essencial (Funil Ativo)
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-neutral-200">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8AA82] font-bold">•</span>
                    Landing Page moderna, com autoridade e carregamento em 1 segundo.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8AA82] font-bold">•</span>
                    Triagem inteligente com IA: analisa requisitos do INSS antes do contato.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8AA82] font-bold">•</span>
                    Google Ads focado em quem teve benefício negado ou busca BPC/LOAS.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8AA82] font-bold">•</span>
                    Ficha do caso chega 100% pronta no WhatsApp da Dra. Lorena.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SLIDE 2: A Nova Arquitetura do Funil                         */}
        {/* ============================================================ */}
        {currentSlide === 2 && (
          <div className="w-full space-y-8 animate-fadeIn">
            <div>
              <span className="text-xs font-semibold text-[#C8AA82] uppercase tracking-widest">
                {slides[2].tag}
              </span>
              <h2
                className="text-3xl sm:text-5xl font-normal text-white mt-1"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                {slides[2].title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 text-left relative group hover:border-[#C8AA82]/50 transition-all">
                <span className="text-xs font-bold text-[#C8AA82] px-2 py-0.5 rounded bg-[#C8AA82]/10 border border-[#C8AA82]/20">ETAPA 1</span>
                <h3 className="font-semibold text-white text-base">Google Ads Focado</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Captação apenas de quem pesquisa por "Advogado BPC LOAS", "Aposentadoria negada", "Auxílio cortado".
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 text-left relative group hover:border-[#C8AA82]/50 transition-all">
                <span className="text-xs font-bold text-[#C8AA82] px-2 py-0.5 rounded bg-[#C8AA82]/10 border border-[#C8AA82]/20">ETAPA 2</span>
                <h3 className="font-semibold text-white text-base">Página da Essencial</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Design de alta autoridade jurídica. Transmite segurança e profissionalismo instantâneos.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 text-left relative group hover:border-[#C8AA82]/50 transition-all">
                <span className="text-xs font-bold text-[#C8AA82] px-2 py-0.5 rounded bg-[#C8AA82]/10 border border-[#C8AA82]/20">ETAPA 3</span>
                <h3 className="font-semibold text-white text-base">Triagem com IA</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Diagnóstico rápido: idade, tempo de contribuição, laudo médico, renda e negativa do INSS.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2 text-left relative group">
                <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40">ETAPA 4</span>
                <h3 className="font-semibold text-white text-base">WhatsApp Qualificado</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  A Dra. Lorena recebe a ficha completa do caso, sabendo exatamente a viabilidade e o que cobrar.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SLIDE 3: Demonstração da Triagem IA ao Vivo                 */}
        {/* ============================================================ */}
        {currentSlide === 3 && (
          <div className="w-full space-y-8 animate-fadeIn text-left">
            <div>
              <span className="text-xs font-semibold text-[#C8AA82] uppercase tracking-widest">
                {slides[3].tag}
              </span>
              <h2
                className="text-3xl sm:text-5xl font-normal text-white mt-1"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                {slides[3].title}
              </h2>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-black/60 border border-[#C8AA82]/30 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5" /> Disparador Direto no WhatsApp
                </div>
                <h3 className="text-xl sm:text-2xl font-medium text-white">
                  Veja como funciona na prática:
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Quando o visitante clica no WhatsApp para tirar dúvidas, o sistema abre a triagem de 4 cliques. Ao concluir, gera a ficha e abre a conversa da Dra. Lorena com tudo preenchido.
                </p>
                <div className="pt-2">
                  <button
                    onClick={openModal}
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold uppercase text-xs tracking-wider px-6 py-3.5 rounded-lg flex items-center gap-2 shadow-xl transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-black fill-black" /> Testar Triagem Ao Vivo Agora
                  </button>
                </div>
              </div>

              {/* Mockup da Ficha no WhatsApp */}
              <div className="w-full md:w-80 bg-[#121b22] border border-white/10 rounded-xl p-4 shadow-2xl space-y-2 text-xs">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-[#25D366] font-bold">
                  <span>📱 WhatsApp da Dra. Lorena</span>
                </div>
                <div className="bg-[#005c4b] p-3 rounded-lg text-white space-y-1 text-[11px] leading-relaxed">
                  <p className="font-bold text-amber-200">🏛️ TRIAGEM ESSENCIAL</p>
                  <p>👤 <strong>Nome:</strong> João Carlos (63 anos)</p>
                  <p>📌 <strong>Benefício:</strong> BPC/LOAS</p>
                  <p>⚠️ <strong>INSS:</strong> Negado há 15 dias</p>
                  <p>💰 <strong>Renda:</strong> Menos de 1/4 SM</p>
                  <p className="text-emerald-300 font-semibold">📊 Parecer: Alta Viabilidade Judicial</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SLIDE 4: Valor Gerado & Proteção de Tempo                   */}
        {/* ============================================================ */}
        {currentSlide === 4 && (
          <div className="w-full space-y-8 animate-fadeIn text-left">
            <div>
              <span className="text-xs font-semibold text-[#C8AA82] uppercase tracking-widest">
                {slides[4].tag}
              </span>
              <h2
                className="text-3xl sm:text-5xl font-normal text-white mt-1"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                {slides[4].title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <Clock className="w-8 h-8 text-[#C8AA82]" />
                <h3 className="text-lg font-semibold text-white">Economia de 30 Minutos</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Por atendimento: você já recebe idade, tempo de contribuição, tipo de negativa e laudos sem precisar perguntar do zero.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <ShieldCheck className="w-8 h-8 text-[#C8AA82]" />
                <h3 className="text-lg font-semibold text-white">100% Ético (CFOAB)</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Em total conformidade com o Provimento 205/2021 da OAB para publicidade informativa e captação ética de busca ativa.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <TrendingUp className="w-8 h-8 text-[#C8AA82]" />
                <h3 className="text-lg font-semibold text-white">Honorários Previdenciários</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Foco em ações de alto retorno (Concessão com retroativos acumulados de RPV e Precatórios + planejamento).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SLIDE 5: Proposta Comercial & Pacotes                        */}
        {/* ============================================================ */}
        {currentSlide === 5 && (
          <div className="w-full space-y-8 animate-fadeIn text-left">
            <div>
              <span className="text-xs font-semibold text-[#C8AA82] uppercase tracking-widest">
                {slides[5].tag}
              </span>
              <h2
                className="text-3xl sm:text-5xl font-normal text-white mt-1"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                {slides[5].title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pacote 1 */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">OPÇÃO 1</span>
                <h3 className="text-2xl font-serif text-white">Setup Funil Previdenciário</h3>
                <p className="text-xs text-neutral-400">Estrutura completa no ar pronta para uso.</p>
                <div className="text-2xl font-bold text-[#C8AA82]">R$ 2.500 <span className="text-xs font-normal text-neutral-400">à vista ou 3x</span></div>
                <ul className="space-y-2 text-xs text-neutral-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C8AA82]" /> Nova Landing Page Essencial ultrarrápida</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C8AA82]" /> Módulo de Triagem IA integrado ao WhatsApp</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C8AA82]" /> Ficha de Atendimento automatizada</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C8AA82]" /> Eliminação da mensalidade pesada da KingHost</li>
                </ul>
              </div>

              {/* Pacote 2 */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#C8AA82]/15 to-transparent border-2 border-[#C8AA82] space-y-4 relative">
                <span className="absolute -top-3 right-6 bg-[#C8AA82] text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  MAIOR RETORNO
                </span>
                <span className="text-xs font-bold text-[#C8AA82] uppercase tracking-wider">OPÇÃO 2</span>
                <h3 className="text-2xl font-serif text-white">Máquina de Clientes Contínua</h3>
                <p className="text-xs text-neutral-300">Setup Completo + Gestão Mensal do Google Ads.</p>
                <div className="text-2xl font-bold text-[#C8AA82]">Setup R$ 2.000 + R$ 1.200/mês</div>
                <ul className="space-y-2 text-xs text-neutral-200">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C8AA82]" /> Tudo do Setup Completo (Site + Triagem IA)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C8AA82]" /> Gestão e otimização semanal de Google Ads</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C8AA82]" /> Negativação constante de curiosos</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C8AA82]" /> Relatório mensal de leads qualificados gerados</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SLIDE 6: Cronograma de Ativação                              */}
        {/* ============================================================ */}
        {currentSlide === 6 && (
          <div className="w-full space-y-8 animate-fadeIn text-left">
            <div>
              <span className="text-xs font-semibold text-[#C8AA82] uppercase tracking-widest">
                {slides[6].tag}
              </span>
              <h2
                className="text-3xl sm:text-5xl font-normal text-white mt-1"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                {slides[6].title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-xs text-[#C8AA82] font-bold">DIA 1</span>
                <h3 className="font-semibold text-white text-sm">Alinhamento</h3>
                <p className="text-xs text-neutral-400">Coleta de dados da Dra. Lorena e foco de benefícios prioritários.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-xs text-[#C8AA82] font-bold">DIA 2 e 3</span>
                <h3 className="font-semibold text-white text-sm">Configuração</h3>
                <p className="text-xs text-neutral-400">Migração do domínio e ativação da Triagem IA.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-xs text-[#C8AA82] font-bold">DIA 4</span>
                <h3 className="font-semibold text-white text-sm">Testes no WhatsApp</h3>
                <p className="text-xs text-neutral-400">Validação prática de envio de fichas e pontuação.</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                <span className="text-xs text-emerald-400 font-bold">DIA 5</span>
                <h3 className="font-semibold text-white text-sm">Lançamento</h3>
                <p className="text-xs text-neutral-300">Campanhas no ar e recebimento dos primeiros contatos.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#C8AA82]/10 border border-[#C8AA82]/30 text-center space-y-3">
              <h3 className="text-lg font-serif text-white">
                "Qual das duas opções faz mais sentido para o momento atual da Essencial?"
              </h3>
              <p className="text-xs text-neutral-300">
                Podemos iniciar o setup hoje mesmo para colocar no ar nos próximos dias.
              </p>
            </div>
          </div>
        )}

      </main>

      {/* Bottom Controls / Navegação */}
      <footer className="px-6 sm:px-12 py-4 border-t border-white/10 flex items-center justify-between z-20 backdrop-blur-md bg-black/40">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-lg border transition-all ${
            currentSlide === 0
              ? 'opacity-30 border-white/10 cursor-not-allowed'
              : 'hover:bg-white/10 border-white/20 text-white cursor-pointer'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Anterior
        </button>

        <div className="text-xs text-neutral-400 hidden sm:block">
          Use as teclas <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">←</kbd> e <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">→</kbd> para navegar
        </div>

        {currentSlide < slides.length - 1 ? (
          <button
            onClick={nextSlide}
            className="flex items-center gap-2 bg-[#C8AA82] hover:bg-white text-black font-semibold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg transition-all shadow-lg cursor-pointer"
          >
            Próximo <ArrowRight className="w-4 h-4 text-black" />
          </button>
        ) : (
          <button
            onClick={() => setCurrentSlide(0)}
            className="flex items-center gap-2 bg-white hover:bg-[#C8AA82] text-black font-semibold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg transition-all shadow-lg cursor-pointer"
          >
            Reiniciar Deck
          </button>
        )}
      </footer>

    </div>
  );
}
