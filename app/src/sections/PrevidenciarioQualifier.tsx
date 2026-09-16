import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  FileText, 
  RotateCcw,
  Scale,
  Award,
  Lock,
  UserCheck
} from 'lucide-react';

interface FormData {
  benefitType: string;
  inssStatus: string;
  age: string;
  contributionTime: string;
  hasMedicalReport: string;
  incomePerPerson: string;
  fullName: string;
  whatsapp: string;
  city: string;
}

const initialForm: FormData = {
  benefitType: '',
  inssStatus: '',
  age: '',
  contributionTime: '',
  hasMedicalReport: '',
  incomePerPerson: '',
  fullName: '',
  whatsapp: '',
  city: 'Goiânia / Região',
};

const benefitOptions = [
  {
    id: 'aposentadoria',
    title: 'Aposentadoria',
    desc: 'Por Idade, Tempo de Contribuição, Especial ou Rural',
    icon: '🏛️',
  },
  {
    id: 'bpc_loas',
    title: 'BPC / LOAS',
    desc: 'Idoso 65+ ou Pessoa com Deficiência de baixa renda (não exige contribuição)',
    icon: '🤝',
  },
  {
    id: 'auxilio_doenca',
    title: 'Auxílio por Incapacidade / Doença',
    desc: 'Incapacidade temporária ou permanente para o trabalho / Acidente',
    icon: '🩺',
  },
  {
    id: 'pensao_morte',
    title: 'Pensão por Morte',
    desc: 'Direito de dependentes após falecimento de segurado',
    icon: '🕊️',
  },
  {
    id: 'planejamento_revisao',
    title: 'Planejamento / Revisão do INSS',
    desc: 'Cálculo de melhor valor de benefício ou correção de valor já recebido',
    icon: '📊',
  },
];

const inssStatusOptions = [
  {
    id: 'negado',
    title: 'Pedido foi NEGADO / Indeferido pelo INSS',
    tag: 'Prioridade Judicial',
    tagColor: 'bg-red-500/20 text-red-300 border-red-500/30',
    desc: 'Ideal para reverter na Justiça e cobrar valores retroativos acumulados',
  },
  {
    id: 'cortado',
    title: 'Benefício foi CORTADO ou Suspenso',
    tag: 'Urgente',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    desc: 'Ação rápida para restabelecimento imediato de pagamento',
  },
  {
    id: 'demorado',
    title: 'Dei entrada e está TRAVADO / Demorando meses',
    tag: 'Mandado de Segurança',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    desc: 'Medida judicial cabível para obrigar o INSS a analisar em prazo legal',
  },
  {
    id: 'novo',
    title: 'Ainda NÃO dei entrada (Quero orientação segura)',
    tag: 'Preventivo',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    desc: 'Protocolo estratégico com documentação completa para evitar indeferimento',
  },
  {
    id: 'calculo',
    title: 'Quero calcular tempo e saber quando me aposento',
    tag: 'Consultoria',
    tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    desc: 'Estudo prévio para obter o benefício no maior valor possível',
  },
];

export default function PrevidenciarioQualifier() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleSelectBenefit = (id: string) => {
    setForm({ ...form, benefitType: id });
    setStep(2);
  };

  const handleSelectStatus = (id: string) => {
    setForm({ ...form, inssStatus: id });
    setStep(3);
  };

  const handleRunAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.whatsapp) {
      alert('Por favor, informe seu nome e WhatsApp para gerar seu parecer.');
      return;
    }

    setIsAnalyzing(true);
    setStep(5);

    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1800);
  };

  const getBenefitName = (id: string) => {
    const item = benefitOptions.find((b) => b.id === id);
    return item ? item.title : id;
  };

  const getStatusName = (id: string) => {
    const item = inssStatusOptions.find((s) => s.id === id);
    return item ? item.title : id;
  };

  const generateWhatsAppMessage = () => {
    const lines = [
      `🏛️ *TRIAGEM PREVIDENCIÁRIA - ESSENCIAL ADVOCACIA*`,
      `Olá, Dra. Lorena! Realizei o diagnóstico preliminar no site da Essencial e gostaria de uma análise do meu caso:`,
      ``,
      `👤 *Nome:* ${form.fullName || 'Não informado'}`,
      `📍 *Cidade:* ${form.city || 'Goiânia/Região'}`,
      `📱 *WhatsApp:* ${form.whatsapp || 'Não informado'}`,
      `📌 *Benefício de Interesse:* ${getBenefitName(form.benefitType)}`,
      `⚠️ *Situação no INSS:* ${getStatusName(form.inssStatus)}`,
      form.age ? `🎂 *Idade:* ${form.age} anos` : null,
      form.contributionTime ? `⏳ *Tempo de Contribuição:* ~${form.contributionTime}` : null,
      form.hasMedicalReport ? `🩺 *Laudo/Atestado Médico:* ${form.hasMedicalReport}` : null,
      form.incomePerPerson ? `💰 *Renda por pessoa da família:* ${form.incomePerPerson}` : null,
      ``,
      `📊 *Resultado da Pré-Análise:* Caso com indícios favoráveis para atuação judicial/administrativa com Dra. Lorena Cristina Rios.`,
      `Gostaria de agendar o atendimento para análise detalhada da minha documentação.`,
    ].filter(Boolean);

    return encodeURIComponent(lines.join('\n'));
  };

  const handleReset = () => {
    setForm(initialForm);
    setStep(1);
    setIsAnalyzing(false);
  };

  return (
    <section
      id="triagem-previdenciaria"
      className="relative w-full py-24 px-4 sm:px-8 md:px-14 bg-gradient-to-b from-[#080808] via-[#0d0d0e] to-[#080808] text-white border-t border-b border-[#C8AA82]/20 overflow-hidden"
    >
      {/* Subtle background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#C8AA82]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header da Seção */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8AA82]/10 border border-[#C8AA82]/30 text-[#C8AA82] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Tecnologia de Triagem Inteligente • Essencial Advocacia
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-white font-normal mb-4 tracking-tight leading-tight"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Diagnóstico Previdenciário Automatizado
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Descubra a viabilidade do seu benefício junto ao INSS em menos de 1 minuto. 
            Nosso sistema inteligente faz a pré-qualificação do seu direito para análise da 
            <strong className="text-[#C8AA82] font-semibold"> Dra. Lorena Cristina Rios</strong>.
          </p>
        </div>

        {/* Card Principal da Triagem */}
        <div className="bg-[#121214]/90 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          
          {/* Barra de Progresso Superior */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span className="font-medium">
                {step === 5 ? 'Diagnóstico Concluído' : `Etapa ${step} de 4`}
              </span>
              <span className="text-[#C8AA82]">
                {step === 1 && '25% - Escolha do Benefício'}
                {step === 2 && '50% - Situação no INSS'}
                {step === 3 && '75% - Dados do Caso'}
                {step === 4 && '90% - Contato'}
                {step === 5 && '100% - Parecer Gerado'}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C8AA82] to-[#e4ccaa] transition-all duration-500 rounded-full"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* ============================================================ */}
          {/* PASSO 1: Seleção do Benefício                                 */}
          {/* ============================================================ */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-left">
                <h3 className="text-xl sm:text-2xl text-white font-medium mb-1">
                  1. Qual benefício você precisa solicitar ou resolver?
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm">
                  Selecione a opção que melhor descreve o seu objetivo hoje.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {benefitOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectBenefit(opt.id)}
                    className="flex items-start gap-4 p-4.5 rounded-xl text-left bg-white/[0.03] hover:bg-[#C8AA82]/10 border border-white/5 hover:border-[#C8AA82]/40 transition-all duration-200 group cursor-pointer"
                  >
                    <span className="text-3xl p-2 rounded-lg bg-black/40 border border-white/5 group-hover:scale-110 transition-transform">
                      {opt.icon}
                    </span>
                    <div>
                      <div className="text-white font-medium text-base group-hover:text-[#C8AA82] transition-colors flex items-center gap-2">
                        {opt.title}
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#C8AA82]" />
                      </div>
                      <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* PASSO 2: Situação no INSS                                     */}
          {/* ============================================================ */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl text-white font-medium mb-1">
                    2. Qual a situação atual perante o INSS?
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm">
                    Benefício selecionado: <span className="text-[#C8AA82] font-semibold">{getBenefitName(form.benefitType)}</span>
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Voltar
                </button>
              </div>

              <div className="space-y-3">
                {inssStatusOptions.map((status) => (
                  <button
                    key={status.id}
                    onClick={() => handleSelectStatus(status.id)}
                    className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl text-left bg-white/[0.03] hover:bg-[#C8AA82]/10 border border-white/5 hover:border-[#C8AA82]/40 transition-all duration-200 group cursor-pointer gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-white font-medium text-sm sm:text-base group-hover:text-[#C8AA82] transition-colors">
                          {status.title}
                        </span>
                      </div>
                      <p className="text-neutral-400 text-xs mt-1">
                        {status.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${status.tagColor}`}>
                        {status.tag}
                      </span>
                      <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-[#C8AA82] transition-colors hidden sm:block" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* PASSO 3: Perguntas Específicas do Caso                        */}
          {/* ============================================================ */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl text-white font-medium mb-1">
                    3. Detalhes rápidos para calibrar o diagnóstico
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm">
                    Preencha os campos abaixo para que o cálculo seja preciso.
                  </p>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Voltar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Idade */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-medium text-neutral-300">
                    Sua idade atual (ou da pessoa que precisa do benefício):
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 62"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#C8AA82] transition-colors"
                  />
                </div>

                {/* Se BPC / LOAS */}
                {form.benefitType === 'bpc_loas' && (
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-medium text-neutral-300">
                      Renda média por pessoa na residência:
                    </label>
                    <select
                      value={form.incomePerPerson}
                      onChange={(e) => setForm({ ...form, incomePerPerson: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#C8AA82] transition-colors"
                    >
                      <option value="" className="bg-[#121214]">Selecione uma faixa...</option>
                      <option value="Menos de R$ 353 por pessoa (Até 1/4 SM)" className="bg-[#121214]">Até R$ 353 por pessoa (Baixa renda comprovada)</option>
                      <option value="Entre R$ 353 e R$ 706 por pessoa" className="bg-[#121214]">Entre R$ 353 e R$ 706 por pessoa</option>
                      <option value="Mais de R$ 706 por pessoa" className="bg-[#121214]">Acima de meio salário mínimo</option>
                    </select>
                  </div>
                )}

                {/* Se Aposentadoria ou Planejamento */}
                {(form.benefitType === 'aposentadoria' || form.benefitType === 'planejamento_revisao') && (
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-medium text-neutral-300">
                      Tempo estimado de contribuição (Carteira / Carnê / Rural):
                    </label>
                    <select
                      value={form.contributionTime}
                      onChange={(e) => setForm({ ...form, contributionTime: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#C8AA82] transition-colors"
                    >
                      <option value="" className="bg-[#121214]">Selecione...</option>
                      <option value="Mais de 15 anos" className="bg-[#121214]">Mais de 15 anos de contribuição</option>
                      <option value="Entre 10 e 15 anos" className="bg-[#121214]">Entre 10 e 15 anos</option>
                      <option value="Menos de 10 anos" className="bg-[#121214]">Menos de 10 anos</option>
                      <option value="Trabalho rural / sem registro" className="bg-[#121214]">Trabalho Rural ou Sem Registro na Carteira</option>
                    </select>
                  </div>
                )}

                {/* Se Auxílio Doença / Incapacidade ou BPC Deficiência */}
                {(form.benefitType === 'auxilio_doenca' || form.benefitType === 'bpc_loas') && (
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-medium text-neutral-300">
                      Possui laudo, atestado ou exames médicos recentes?
                    </label>
                    <select
                      value={form.hasMedicalReport}
                      onChange={(e) => setForm({ ...form, hasMedicalReport: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#C8AA82] transition-colors"
                    >
                      <option value="" className="bg-[#121214]">Selecione...</option>
                      <option value="Sim, tenho laudos e exames atualizados" className="bg-[#121214]">Sim, tenho laudos e exames atualizados</option>
                      <option value="Sim, mas estão antigos" className="bg-[#121214]">Sim, mas preciso atualizar</option>
                      <option value="Não possuo laudos no momento" className="bg-[#121214]">Não possuo laudos no momento</option>
                    </select>
                  </div>
                )}

                {/* Cidade */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-medium text-neutral-300">
                    Sua cidade / Estado:
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Goiânia / GO ou região"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#C8AA82] transition-colors"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(4)}
                  className="bg-[#C8AA82] hover:bg-white text-black font-semibold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-lg cursor-pointer"
                >
                  Avançar para Etapa Final <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* PASSO 4: Contato & Ativação da Análise                       */}
          {/* ============================================================ */}
          {step === 4 && (
            <form onSubmit={handleRunAnalysis} className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl text-white font-medium mb-1">
                    4. Onde podemos entregar o seu parecer preliminar?
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm">
                    A <strong className="text-[#C8AA82]">Dra. Lorena Cristina Rios</strong> receberá o resumo do seu caso para análise prioritária.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Voltar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-medium text-neutral-300">
                    Seu nome completo:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Maria José de Oliveira"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#C8AA82] transition-colors"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-medium text-neutral-300">
                    Seu WhatsApp com DDD:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: (62) 99999-9999"
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#C8AA82] transition-colors"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 text-left">
                <Lock className="w-4 h-4 text-[#C8AA82] shrink-0" />
                <p className="text-[11px] text-neutral-400 leading-tight">
                  Seus dados estão 100% seguros sob sigilo profissional da OAB e protegidos pela LGPD. Não enviamos spam.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#C8AA82] to-[#e4ccaa] hover:from-white hover:to-white text-black font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-xl cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  Gerar Diagnóstico & Ver Viabilidade
                </button>
              </div>
            </form>
          )}

          {/* ============================================================ */}
          {/* PASSO 5: Carregamento IA e Parecer Final Gerado               */}
          {/* ============================================================ */}
          {step === 5 && (
            <div className="animate-fadeIn text-center py-4">
              {isAnalyzing ? (
                <div className="py-12 space-y-5">
                  <div className="w-16 h-16 border-4 border-[#C8AA82]/20 border-t-[#C8AA82] rounded-full animate-spin mx-auto" />
                  <h4 className="text-xl font-medium text-white">
                    Cruzando requisitos e jurisprudência com Inteligência Previdenciária...
                  </h4>
                  <p className="text-neutral-400 text-xs max-w-md mx-auto">
                    Verificando enquadramento legal, precedentes de reversão do INSS e cálculo de viabilidade...
                  </p>
                </div>
              ) : (
                <div className="space-y-8 animate-fadeIn text-left">
                  
                  {/* Status Banner */}
                  <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-transparent border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-white font-semibold text-lg">
                            Caso Pré-Qualificado com Sucesso!
                          </h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                            VIABILIDADE ALTA
                          </span>
                        </div>
                        <p className="text-neutral-300 text-xs mt-0.5">
                          Identificamos elementos jurídicos sólidos para atuação e cobrança de retroativos.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Resumo Formatado da Ficha de Atendimento */}
                  <div className="bg-black/50 border border-white/10 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#C8AA82] uppercase tracking-wider">
                        <FileText className="w-4 h-4" /> Ficha de Atendimento Previdenciário Gerada
                      </div>
                      <span className="text-[11px] text-neutral-400">
                        Essencial Advocacia & Consultoria
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-neutral-400">Cliente:</span>{' '}
                        <strong className="text-white">{form.fullName}</strong>
                      </div>
                      <div>
                        <span className="text-neutral-400">WhatsApp:</span>{' '}
                        <strong className="text-[#C8AA82]">{form.whatsapp}</strong>
                      </div>
                      <div>
                        <span className="text-neutral-400">Benefício:</span>{' '}
                        <strong className="text-white">{getBenefitName(form.benefitType)}</strong>
                      </div>
                      <div>
                        <span className="text-neutral-400">Situação no INSS:</span>{' '}
                        <strong className="text-white">{getStatusName(form.inssStatus)}</strong>
                      </div>
                      {form.age && (
                        <div>
                          <span className="text-neutral-400">Idade declarada:</span>{' '}
                          <strong className="text-white">{form.age} anos</strong>
                        </div>
                      )}
                      {form.contributionTime && (
                        <div>
                          <span className="text-neutral-400">Tempo de Contribuição:</span>{' '}
                          <strong className="text-white">{form.contributionTime}</strong>
                        </div>
                      )}
                      {form.hasMedicalReport && (
                        <div>
                          <span className="text-neutral-400">Documentação Médica:</span>{' '}
                          <strong className="text-white">{form.hasMedicalReport}</strong>
                        </div>
                      )}
                      {form.incomePerPerson && (
                        <div>
                          <span className="text-neutral-400">Renda por pessoa:</span>{' '}
                          <strong className="text-white">{form.incomePerPerson}</strong>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-white/5 text-neutral-300 text-xs leading-relaxed bg-[#C8AA82]/5 p-3 rounded-lg border border-[#C8AA82]/10">
                      <strong className="text-[#C8AA82]">Orientação Técnica da Dra. Lorena:</strong>{' '}
                      {form.inssStatus === 'negado'
                        ? 'A negativa indevida do INSS gera direito de ação judicial com cobrança de todos os meses retroativos desde o primeiro requerimento.'
                        : form.inssStatus === 'cortado'
                        ? 'Cortes de benefícios podem ser revertidos judicialmente com pedido de liminar para retorno imediato dos pagamentos.'
                        : 'Recomenda-se a análise estratégica do CNIS e laudos para montagem de processo sem risco de indeferimento.'}
                    </div>
                  </div>

                  {/* Ações de Conversão */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 justify-between pt-2">
                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto text-xs text-neutral-400 hover:text-white flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Fazer Nova Simulação de Teste
                    </button>

                    <a
                      href={`https://wa.me/556283143967?text=${generateWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-lg flex items-center justify-center gap-2 shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Send className="w-4 h-4 text-black" />
                      Enviar Ficha para Dra. Lorena no WhatsApp
                    </a>
                  </div>

                </div>
              )}
            </div>
          )}

        </div>

        {/* Rodapé de Confiança e Diferenciais da Triagem */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-left">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <UserCheck className="w-5 h-5 text-[#C8AA82] shrink-0" />
            <div className="text-xs">
              <strong className="text-white block font-medium">Filtro Anti-Curiosos</strong>
              <span className="text-neutral-400 text-[11px]">Receba apenas casos com perfil e documentação</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <Scale className="w-5 h-5 text-[#C8AA82] shrink-0" />
            <div className="text-xs">
              <strong className="text-white block font-medium">Conformidade OAB</strong>
              <span className="text-neutral-400 text-[11px]">Provimento 205/2021 de publicidade informativa</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <Award className="w-5 h-5 text-[#C8AA82] shrink-0" />
            <div className="text-xs">
              <strong className="text-white block font-medium">Conversão 3x Maior</strong>
              <span className="text-neutral-400 text-[11px]">Cliente chega decidido a contratar e agendar</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
