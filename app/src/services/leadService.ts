export type LeadStatus = 
  | 'qualificado_alto'        // Passou nos requisitos principais
  | 'requalificacao_pendente'   // Faltam laudos atualizados ou análise de CNIS
  | 'nao_qualificado'         // Não atinge critérios atuais (nutrição futura)
  | 'abandono_etapa';         // Fechou modal antes de enviar mensagem

export interface PrevidenciarioLead {
  id: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  whatsapp: string;
  city: string;
  benefitType: string;
  inssStatus: string;
  age: string;
  contributionTime: string;
  hasMedicalReport: string;
  incomePerPerson: string;
  status: LeadStatus;
  score: 'ALTO' | 'MÉDIO' | 'BAIXO' | 'INCOMPLETO';
  currentStep: number;
  sentToWhatsApp: boolean;
  origin: string;
  notes?: string;
}

const STORAGE_KEY = 'essencial_previdenciario_leads_v1';

// Dados de exemplo para enriquecer a demonstração se não houver leads salvos
const DEMO_LEADS: PrevidenciarioLead[] = [
  {
    id: 'lead-demo-1',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    fullName: 'Maria de Fátima Silva',
    whatsapp: '(62) 99812-3456',
    city: 'Goiânia / GO',
    benefitType: 'bpc_loas',
    inssStatus: 'negado',
    age: '66',
    contributionTime: '',
    hasMedicalReport: '',
    incomePerPerson: 'Menos de R$ 353 por pessoa (Até 1/4 SM)',
    status: 'qualificado_alto',
    score: 'ALTO',
    currentStep: 5,
    sentToWhatsApp: true,
    origin: 'Google Ads - Pesquisa BPC',
    notes: 'Indeferimento indevido do INSS por divergência de endereço no CadÚnico. Ação com retroativo.',
  },
  {
    id: 'lead-demo-2',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    fullName: 'Sebastião Nonato',
    whatsapp: '(62) 98455-7890',
    city: 'Aparecida de Goiânia / GO',
    benefitType: 'auxilio_doenca',
    inssStatus: 'cortado',
    age: '54',
    contributionTime: '',
    hasMedicalReport: 'Sim, mas preciso atualizar',
    incomePerPerson: '',
    status: 'requalificacao_pendente',
    score: 'MÉDIO',
    currentStep: 4,
    sentToWhatsApp: false,
    origin: 'Google Ads - Auxílio Cortado',
    notes: 'Benefício cortado na perícia médica pente-fino. Requer renovação de laudo ortopédico para liminar.',
  },
  {
    id: 'lead-demo-3',
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    fullName: 'Antônio Carlos Meireles',
    whatsapp: '(62) 99123-0011',
    city: 'Anápolis / GO',
    benefitType: 'aposentadoria',
    inssStatus: 'calculo',
    age: '61',
    contributionTime: 'Mais de 15 anos',
    hasMedicalReport: '',
    incomePerPerson: '',
    status: 'qualificado_alto',
    score: 'ALTO',
    currentStep: 5,
    sentToWhatsApp: true,
    origin: 'Acesso Direto Site',
    notes: 'Planejamento de regra de transição da EC 103/2019. Possui 28 anos de tempo e períodos insalubres.',
  },
  {
    id: 'lead-demo-4',
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    fullName: 'Ana Lúcia Barbosa',
    whatsapp: '(62) 99344-2233',
    city: 'Goiânia / GO',
    benefitType: 'bpc_loas',
    inssStatus: 'novo',
    age: '42',
    contributionTime: '',
    hasMedicalReport: 'Não possuo no momento',
    incomePerPerson: 'Mais de R$ 706 por pessoa',
    status: 'nao_qualificado',
    score: 'BAIXO',
    currentStep: 3,
    sentToWhatsApp: false,
    origin: 'Google Ads',
    notes: 'Renda per capita superior e sem laudo de deficiência grave no momento.',
  },
  {
    id: 'lead-demo-5',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    fullName: 'Valdemar Rodrigues',
    whatsapp: '(62) 98777-6543',
    city: 'Trindade / GO',
    benefitType: 'aposentadoria',
    inssStatus: 'negado',
    age: '64',
    contributionTime: 'Trabalho Rural ou Sem Registro na Carteira',
    hasMedicalReport: '',
    incomePerPerson: '',
    status: 'abandono_etapa',
    score: 'ALTO',
    currentStep: 3,
    sentToWhatsApp: false,
    origin: 'Google Ads - Aposentadoria Rural',
    notes: 'Fechou o formulário na etapa 3 antes de enviar a mensagem. Oportunidade de recuperação de contato.',
  },
];

export const leadService = {
  // Busca todos os leads armazenados
  getAllLeads(): PrevidenciarioLead[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Inicializa com dados de demonstração
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_LEADS));
        return DEMO_LEADS;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.error('Erro ao ler leads do storage:', e);
      return DEMO_LEADS;
    }
  },

  // Salva ou atualiza um lead automaticamente a cada etapa preenchida
  saveOrUpdateLead(data: Partial<PrevidenciarioLead>): PrevidenciarioLead {
    const leads = this.getAllLeads();
    const now = new Date().toISOString();

    // Determina o Score e Status Jurídico com base nas respostas
    let score: 'ALTO' | 'MÉDIO' | 'BAIXO' | 'INCOMPLETO' = 'INCOMPLETO';
    let status: LeadStatus = 'abandono_etapa';

    if (data.inssStatus === 'negado' || data.inssStatus === 'cortado') {
      score = 'ALTO';
      status = 'qualificado_alto';
    } else if (data.benefitType === 'bpc_loas' && data.incomePerPerson?.includes('Mais de R$ 706')) {
      score = 'BAIXO';
      status = 'nao_qualificado';
    } else if (data.hasMedicalReport?.includes('preciso atualizar') || data.inssStatus === 'demorado') {
      score = 'MÉDIO';
      status = 'requalificacao_pendente';
    } else if (data.currentStep && data.currentStep >= 4) {
      score = 'ALTO';
      status = 'qualificado_alto';
    }

    let targetLead: PrevidenciarioLead;

    if (data.id) {
      const index = leads.findIndex((l) => l.id === data.id);
      if (index >= 0) {
        targetLead = {
          ...leads[index],
          ...data,
          status: data.status || status,
          score: data.score || score,
          updatedAt: now,
        };
        leads[index] = targetLead;
      } else {
        targetLead = {
          id: data.id,
          createdAt: now,
          updatedAt: now,
          fullName: data.fullName || 'Lead em Andamento',
          whatsapp: data.whatsapp || '',
          city: data.city || 'Goiânia / GO',
          benefitType: data.benefitType || '',
          inssStatus: data.inssStatus || '',
          age: data.age || '',
          contributionTime: data.contributionTime || '',
          hasMedicalReport: data.hasMedicalReport || '',
          incomePerPerson: data.incomePerPerson || '',
          status: data.status || status,
          score: data.score || score,
          currentStep: data.currentStep || 1,
          sentToWhatsApp: data.sentToWhatsApp || false,
          origin: data.origin || 'Google Ads / Web',
          notes: data.notes || '',
        };
        leads.unshift(targetLead);
      }
    } else {
      const newId = `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      targetLead = {
        id: newId,
        createdAt: now,
        updatedAt: now,
        fullName: data.fullName || 'Lead em Andamento',
        whatsapp: data.whatsapp || '',
        city: data.city || 'Goiânia / GO',
        benefitType: data.benefitType || '',
        inssStatus: data.inssStatus || '',
        age: data.age || '',
        contributionTime: data.contributionTime || '',
        hasMedicalReport: data.hasMedicalReport || '',
        incomePerPerson: data.incomePerPerson || '',
        status: data.status || status,
        score: data.score || score,
        currentStep: data.currentStep || 1,
        sentToWhatsApp: data.sentToWhatsApp || false,
        origin: data.origin || 'Google Ads / Web',
        notes: data.notes || '',
      };
      leads.unshift(targetLead);
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error('Erro ao salvar lead:', e);
    }

    return targetLead;
  },

  // Marca um lead como enviado para o WhatsApp
  markAsSentToWhatsApp(leadId: string) {
    const leads = this.getAllLeads();
    const index = leads.findIndex((l) => l.id === leadId);
    if (index >= 0) {
      leads[index].sentToWhatsApp = true;
      leads[index].status = 'qualificado_alto';
      leads[index].updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    }
  },

  // Atualiza anotações do lead
  updateLeadNotes(leadId: string, notes: string, status?: LeadStatus) {
    const leads = this.getAllLeads();
    const index = leads.findIndex((l) => l.id === leadId);
    if (index >= 0) {
      leads[index].notes = notes;
      if (status) leads[index].status = status;
      leads[index].updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    }
  },

  // Exclui um lead
  deleteLead(leadId: string) {
    const leads = this.getAllLeads().filter((l) => l.id !== leadId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  },

  // Restaura dados de exemplo
  resetToDemoData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_LEADS));
  },

  // Limpa todos os leads
  clearAll() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  },

  // Calcula estatísticas e métricas de conversão para o painel
  getMetrics() {
    const leads = this.getAllLeads();
    const total = leads.length;
    const qualificados = leads.filter((l) => l.status === 'qualificado_alto').length;
    const pendentesRequalificacao = leads.filter((l) => l.status === 'requalificacao_pendente').length;
    const abandonos = leads.filter((l) => l.status === 'abandono_etapa').length;
    const naoQualificados = leads.filter((l) => l.status === 'nao_qualificado').length;
    const enviadosWhatsApp = leads.filter((l) => l.sentToWhatsApp).length;

    // Estimativa de Honorários Potenciais em pipeline (média previdenciária R$ 4.500 por causa)
    const valorPotencialHonorarios = qualificados * 4500;

    return {
      total,
      qualificados,
      pendentesRequalificacao,
      abandonos,
      naoQualificados,
      enviadosWhatsApp,
      valorPotencialHonorarios,
      taxaConversao: total > 0 ? Math.round((qualificados / total) * 100) : 0,
    };
  },

  // Gera texto de mensagem para requalificação/recuperação no WhatsApp
  getRequalificationWhatsAppUrl(lead: PrevidenciarioLead): string {
    const rawNumber = lead.whatsapp.replace(/\D/g, '');
    const cleanNumber = rawNumber.startsWith('55') ? rawNumber : `55${rawNumber}`;

    let msg = '';
    if (lead.status === 'abandono_etapa') {
      msg = `Olá ${lead.fullName}, tudo bem? Sou da equipe da Dra. Lorena (Essencial Advocacia). Vi que você iniciou o cálculo do seu benefício previdenciário no nosso site mas não concluiu. Gostaria de uma ajuda rápida para saber se você já tem direito à aposentadoria ou BPC?`;
    } else if (lead.status === 'requalificacao_pendente') {
      msg = `Olá ${lead.fullName}! A Dra. Lorena Cristina Rios analisou os dados preliminares da sua solicitação previdenciária. Vimos que é possível reverter a sua situação no INSS com a atualização de alguns documentos. Gostaria de agendar uma consulta para analisarmos seus laudos?`;
    } else {
      msg = `Olá ${lead.fullName}, sou da Essencial Advocacia. Estamos entrando em contato a respeito da sua consulta previdenciária com a Dra. Lorena. Podemos falar agora?`;
    }

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
  },

  // Exporta leads para formato CSV
  exportToCSV(): string {
    const leads = this.getAllLeads();
    const headers = [
      'Data',
      'Nome Completo',
      'WhatsApp',
      'Cidade',
      'Benefício',
      'Situação no INSS',
      'Idade',
      'Tempo de Contribuição',
      'Laudo Médico',
      'Renda per Capita',
      'Status',
      'Score',
      'Enviou WhatsApp',
      'Anotações',
    ];

    const rows = leads.map((l) => [
      new Date(l.createdAt).toLocaleDateString('pt-BR'),
      `"${l.fullName}"`,
      `"${l.whatsapp}"`,
      `"${l.city}"`,
      `"${l.benefitType}"`,
      `"${l.inssStatus}"`,
      l.age || '',
      `"${l.contributionTime || ''}"`,
      `"${l.hasMedicalReport || ''}"`,
      `"${l.incomePerPerson || ''}"`,
      l.status,
      l.score,
      l.sentToWhatsApp ? 'SIM' : 'NÃO',
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },
};
