import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  RotateCcw,
  Lock,
  X,
  MessageCircle
} from 'lucide-react';
import { usePrevidenciarioModal } from '../context/PrevidenciarioModalContext';
import { extraConfig } from '../config';

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

export default function PrevidenciarioModal() {
  const { isOpen, closeModal } = usePrevidenciarioModal();
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Fecha o modal ao pressionar tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

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
    }, 1500);
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
      `Olá, Dra. Lorena! Realizei a pré-triagem no site da Essencial e gostaria de uma análise jurídica do meu caso:`,
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
      `📊 *Resultado da Pré-Análise:* Caso pré-qualificado com viabilidade para atendimento com Dra. Lorena Cristina Rios.`,
      `Gostaria de agendar o atendimento para análise da minha documentação.`,
    ].filter(Boolean);

    return encodeURIComponent(lines.join('\n'));
  };

  const handleReset = () => {
    setForm(initialForm);
    setStep(1);
    setIsAnalyzing(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-fadeIn"
        onClick={closeModal}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-3xl bg-[#111113] border border-[#C8AA82]/30 rounded-2xl shadow-[0_0_50px_rgba(200,170,130,0.15)] overflow-hidden text-white my-auto animate-scaleUp">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-black/80 via-[#18181b] to-black/80">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#C8AA82]/10 border border-[#C8AA82]/30 flex items-center justify-center text-[#C8AA82]">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-medium text-white flex items-center gap-2">
                Pré-Atendimento Inteligente • Essencial Previdenciário
              </h3>
              <p className="text-[11px] text-[#C8AA82]">
                Dra. Lorena Cristina Rios • OAB/GO
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
            title="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 max-h-[80vh] overflow-y-auto">
          
          {/* Barra de Progresso */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span className="font-medium">
                {step === 5 ? 'Diagnóstico Concluído' : `Etapa ${step} de 4`}
              </span>
              <span className="text-[#C8AA82]">
                {step === 1 && '25% - Escolha do Benefício'}
                {step === 2 && '50% - Situação no INSS'}
                {step === 3 && '75% - Dados do Caso'}
                {step === 4 && '90% - Contato'}
                {step === 5 && '100% - Ficha Pronta'}
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
          {/* PASSO 1: Benefício                                           */}
          {/* ============================================================ */}
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="text-left">
                <h4 className="text-lg sm:text-xl text-white font-medium mb-1">
                  1. Qual benefício você deseja consultar com a Dra. Lorena?
                </h4>
                <p className="text-neutral-400 text-xs">
                  Selecione uma das opções abaixo para iniciarmos a pré-triagem do seu caso:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefitOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectBenefit(opt.id)}
                    className="flex items-start gap-3.5 p-4 rounded-xl text-left bg-white/[0.03] hover:bg-[#C8AA82]/10 border border-white/5 hover:border-[#C8AA82]/40 transition-all duration-200 group cursor-pointer"
                  >
                    <span className="text-2xl p-2 rounded-lg bg-black/40 border border-white/5 group-hover:scale-110 transition-transform">
                      {opt.icon}
                    </span>
                    <div>
                      <div className="text-white font-medium text-sm group-hover:text-[#C8AA82] transition-colors flex items-center gap-1.5">
                        {opt.title}
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#C8AA82]" />
                      </div>
                      <p className="text-neutral-400 text-[11px] mt-0.5 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-2 text-center">
                <a
                  href={extraConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-400 hover:text-[#C8AA82] underline transition-colors"
                >
                  Prefere falar direto no WhatsApp sem preencher a triagem? Clique aqui.
                </a>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* PASSO 2: Situação no INSS                                     */}
          {/* ============================================================ */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h4 className="text-lg sm:text-xl text-white font-medium mb-1">
                    2. Qual a sua situação perante o INSS?
                  </h4>
                  <p className="text-neutral-400 text-xs">
                    Benefício: <strong className="text-[#C8AA82]">{getBenefitName(form.benefitType)}</strong>
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Voltar
                </button>
              </div>

              <div className="space-y-2.5">
                {inssStatusOptions.map((status) => (
                  <button
                    key={status.id}
                    onClick={() => handleSelectStatus(status.id)}
                    className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl text-left bg-white/[0.03] hover:bg-[#C8AA82]/10 border border-white/5 hover:border-[#C8AA82]/40 transition-all duration-200 group cursor-pointer gap-2"
                  >
                    <div>
                      <div className="text-white font-medium text-xs sm:text-sm group-hover:text-[#C8AA82] transition-colors">
                        {status.title}
                      </div>
                      <p className="text-neutral-400 text-[11px] mt-0.5">
                        {status.desc}
                      </p>
                    </div>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-medium self-start sm:self-center ${status.tagColor}`}>
                      {status.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* PASSO 3: Detalhes do Caso                                     */}
          {/* ============================================================ */}
          {step === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h4 className="text-lg sm:text-xl text-white font-medium mb-1">
                    3. Detalhes rápidos do caso
                  </h4>
                  <p className="text-neutral-400 text-xs">
                    Informações essenciais para a Dra. Lorena analisar os requisitos:
                  </p>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Voltar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-medium text-neutral-300">
                    Idade da pessoa que necessita do benefício:
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 62"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#C8AA82] transition-colors"
                  />
                </div>

                {form.benefitType === 'bpc_loas' && (
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-medium text-neutral-300">
                      Renda média familiar por pessoa:
                    </label>
                    <select
                      value={form.incomePerPerson}
                      onChange={(e) => setForm({ ...form, incomePerPerson: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#C8AA82] transition-colors"
                    >
                      <option value="" className="bg-[#121214]">Selecione...</option>
                      <option value="Menos de R$ 353 por pessoa (Até 1/4 SM)" className="bg-[#121214]">Até R$ 353 por pessoa (Baixa renda comprovada)</option>
                      <option value="Entre R$ 353 e R$ 706 por pessoa" className="bg-[#121214]">Entre R$ 353 e R$ 706 por pessoa</option>
                      <option value="Mais de R$ 706 por pessoa" className="bg-[#121214]">Acima de meio salário mínimo</option>
                    </select>
                  </div>
                )}

                {(form.benefitType === 'aposentadoria' || form.benefitType === 'planejamento_revisao') && (
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-medium text-neutral-300">
                      Tempo aproximado de contribuição:
                    </label>
                    <select
                      value={form.contributionTime}
                      onChange={(e) => setForm({ ...form, contributionTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#C8AA82] transition-colors"
                    >
                      <option value="" className="bg-[#121214]">Selecione...</option>
                      <option value="Mais de 15 anos" className="bg-[#121214]">Mais de 15 anos</option>
                      <option value="Entre 10 e 15 anos" className="bg-[#121214]">Entre 10 e 15 anos</option>
                      <option value="Menos de 10 anos" className="bg-[#121214]">Menos de 10 anos</option>
                      <option value="Trabalho rural / sem carteira" className="bg-[#121214]">Trabalho rural ou sem carteira assinada</option>
                    </select>
                  </div>
                )}

                {(form.benefitType === 'auxilio_doenca' || form.benefitType === 'bpc_loas') && (
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-medium text-neutral-300">
                      Possui laudo ou atestado médico?
                    </label>
                    <select
                      value={form.hasMedicalReport}
                      onChange={(e) => setForm({ ...form, hasMedicalReport: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#C8AA82] transition-colors"
                    >
                      <option value="" className="bg-[#121214]">Selecione...</option>
                      <option value="Sim, atualizado" className="bg-[#121214]">Sim, tenho laudo e exames recentes</option>
                      <option value="Sim, mas antigo" className="bg-[#121214]">Sim, mas preciso atualizar</option>
                      <option value="Não tenho no momento" className="bg-[#121214]">Não possuo no momento</option>
                    </select>
                  </div>
                )}

                <div className="space-y-1 text-left">
                  <label className="text-xs font-medium text-neutral-300">
                    Sua cidade / Estado:
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Goiânia - GO"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#C8AA82] transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setStep(4)}
                  className="bg-[#C8AA82] hover:bg-white text-black font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 cursor-pointer"
                >
                  Continuar <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* PASSO 4: Contato & Envio                                      */}
          {/* ============================================================ */}
          {step === 4 && (
            <form onSubmit={handleRunAnalysis} className="space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h4 className="text-lg sm:text-xl text-white font-medium mb-1">
                    4. Onde a Dra. Lorena pode te retornar?
                  </h4>
                  <p className="text-neutral-400 text-xs">
                    Preencha seu nome e WhatsApp para gerar a sua ficha de atendimento:
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-medium text-neutral-300">
                    Seu nome completo:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Maria José de Oliveira"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#C8AA82] transition-colors"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-medium text-neutral-300">
                    Seu WhatsApp (com DDD):
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: (62) 99999-9999"
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#C8AA82] transition-colors"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-2.5 text-left">
                <Lock className="w-4 h-4 text-[#C8AA82] shrink-0" />
                <p className="text-[11px] text-neutral-400 leading-tight">
                  Seus dados estão protegidos sob sigilo ético da advocacia e LGPD.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#C8AA82] to-[#e4ccaa] hover:from-white hover:to-white text-black font-semibold text-xs uppercase tracking-wider px-7 py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  Gerar Parecer & Falar com Dra. Lorena
                </button>
              </div>
            </form>
          )}

          {/* ============================================================ */}
          {/* PASSO 5: Ficha Concluída                                      */}
          {/* ============================================================ */}
          {step === 5 && (
            <div className="text-center py-2 animate-fadeIn">
              {isAnalyzing ? (
                <div className="py-10 space-y-4">
                  <div className="w-12 h-12 border-3 border-[#C8AA82]/20 border-t-[#C8AA82] rounded-full animate-spin mx-auto" />
                  <h4 className="text-base font-medium text-white">
                    Cruzando dados com requisitos legais e jurisprudência do INSS...
                  </h4>
                </div>
              ) : (
                <div className="space-y-6 text-left animate-fadeIn">
                  
                  {/* Status Banner */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-transparent border border-emerald-500/30 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-semibold text-sm sm:text-base">
                          Caso Pré-Qualificado com Sucesso!
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                          VIABILIDADE ALTA
                        </span>
                      </div>
                      <p className="text-neutral-300 text-xs mt-0.5">
                        Ficha gerada pronta para análise da Dra. Lorena Cristina Rios.
                      </p>
                    </div>
                  </div>

                  {/* Resumo da Ficha */}
                  <div className="bg-black/50 border border-white/10 rounded-xl p-4 space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <div className="flex items-center gap-2 font-semibold text-[#C8AA82] uppercase tracking-wider">
                        <FileText className="w-3.5 h-3.5" /> Resumo do Atendimento
                      </div>
                      <span className="text-[10px] text-neutral-400">
                        Essencial Advocacia
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div><span className="text-neutral-400">Cliente:</span> <strong className="text-white">{form.fullName}</strong></div>
                      <div><span className="text-neutral-400">WhatsApp:</span> <strong className="text-[#C8AA82]">{form.whatsapp}</strong></div>
                      <div><span className="text-neutral-400">Benefício:</span> <strong className="text-white">{getBenefitName(form.benefitType)}</strong></div>
                      <div><span className="text-neutral-400">Situação:</span> <strong className="text-white">{getStatusName(form.inssStatus)}</strong></div>
                      {form.age && <div><span className="text-neutral-400">Idade:</span> <strong className="text-white">{form.age} anos</strong></div>}
                      {form.city && <div><span className="text-neutral-400">Cidade:</span> <strong className="text-white">{form.city}</strong></div>}
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 justify-between pt-1">
                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto text-xs text-neutral-400 hover:text-white flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Nova Simulação
                    </button>

                    <a
                      href={`https://wa.me/556283143967?text=${generateWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeModal}
                      className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-lg flex items-center justify-center gap-2 shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      <MessageCircle className="w-4 h-4 text-black fill-black" />
                      Enviar Ficha para Dra. Lorena no WhatsApp
                    </a>
                  </div>

                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
