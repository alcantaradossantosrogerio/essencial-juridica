import { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Download, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Trash2, 
  TrendingUp, 
  RotateCcw, 
  ExternalLink 
} from 'lucide-react';
import { leadService, type PrevidenciarioLead, type LeadStatus } from '../services/leadService';

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<PrevidenciarioLead[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<PrevidenciarioLead | null>(null);
  const [notesInput, setNotesInput] = useState<string>('');

  const loadLeads = () => {
    setLeads(leadService.getAllLeads());
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const metrics = leadService.getMetrics();

  const filteredLeads = leads.filter((lead) => {
    const matchesFilter = filterStatus === 'todos' ? true : lead.status === filterStatus;
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.whatsapp.includes(searchTerm) ||
      lead.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.benefitType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExportCSV = () => {
    const csvContent = leadService.exportToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_essencial_previdenciario_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveNotes = () => {
    if (selectedLead) {
      leadService.updateLeadNotes(selectedLead.id, notesInput);
      setSelectedLead({ ...selectedLead, notes: notesInput });
      loadLeads();
    }
  };

  const handleDeleteLead = (id: string) => {
    if (confirm('Deseja realmente remover este lead do painel?')) {
      leadService.deleteLead(id);
      if (selectedLead?.id === id) setSelectedLead(null);
      loadLeads();
    }
  };

  const handleResetDemo = () => {
    leadService.resetToDemoData();
    loadLeads();
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'qualificado_alto':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Qualificado (Viabilidade Alta)
          </span>
        );
      case 'requalificacao_pendente':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <Clock className="w-3 h-3" /> Requalificação Pendente
          </span>
        );
      case 'abandono_etapa':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <AlertTriangle className="w-3 h-3" /> Abandono (Recuperável)
          </span>
        );
      case 'nao_qualificado':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-neutral-800 text-neutral-400 border border-white/10">
            <XCircle className="w-3 h-3" /> Não Qualificado (Momento)
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-white flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="px-6 sm:px-12 py-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#0d0d10]">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-lg bg-[#C8AA82]/20 border border-[#C8AA82]/40 flex items-center justify-center text-[#C8AA82] font-serif font-bold text-lg">
            E
          </span>
          <div>
            <h1 className="font-semibold text-base tracking-wide text-white flex items-center gap-2">
              Painel de Leads & Requalificação Previdenciária
              <span className="text-[10px] bg-[#C8AA82]/20 text-[#C8AA82] px-2 py-0.5 rounded-full font-bold border border-[#C8AA82]/30">
                CRM ESSENCIAL
              </span>
            </h1>
            <p className="text-neutral-400 text-xs">
              Dra. Lorena Cristina Rios • Gestão Ativa de Clientes Previdenciários
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold px-4 py-2.5 rounded-lg border border-white/10 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#C8AA82]" /> Exportar CSV (Excel)
          </button>
          <button
            onClick={handleResetDemo}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white px-3 py-2 rounded-lg border border-white/5 transition-colors cursor-pointer"
            title="Restaurar dados de demonstração para a reunião"
          >
            <RotateCcw className="w-3 h-3" /> Reset Demo
          </button>
          <a
            href="/apresentacao"
            className="flex items-center gap-1.5 bg-[#C8AA82] hover:bg-white text-black font-bold text-xs uppercase px-4 py-2.5 rounded-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Deck Apresentação
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-10 space-y-8">
        
        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Total de Triagens</span>
              <Users className="w-4 h-4 text-[#C8AA82]" />
            </div>
            <div className="text-3xl font-bold text-white font-mono">{metrics.total}</div>
            <p className="text-[11px] text-neutral-400">Leads capturados no funil</p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between text-emerald-400 text-xs">
              <span>Casos Qualificados</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-emerald-300 font-mono">{metrics.qualificados}</div>
            <p className="text-[11px] text-neutral-400">Prontos para contrato judicial</p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2">
            <div className="flex items-center justify-between text-purple-300 text-xs">
              <span>Abandonos Recuperáveis</span>
              <AlertTriangle className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-purple-300 font-mono">{metrics.abandonos}</div>
            <p className="text-[11px] text-neutral-400">Fechou antes de enviar o WhatsApp</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#C8AA82]/10 border border-[#C8AA82]/30 space-y-2">
            <div className="flex items-center justify-between text-[#C8AA82] text-xs">
              <span>Honorários em Pipeline</span>
              <TrendingUp className="w-4 h-4 text-[#C8AA82]" />
            </div>
            <div className="text-3xl font-bold text-[#C8AA82] font-mono">
              R$ {metrics.valorPotencialHonorarios.toLocaleString('pt-BR')}
            </div>
            <p className="text-[11px] text-neutral-300">Estimativa com base nos qualificados</p>
          </div>
        </div>

        {/* Filtros e Barra de Pesquisa */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'todos', label: 'Todos os Leads' },
              { id: 'qualificado_alto', label: 'Qualificados' },
              { id: 'requalificacao_pendente', label: 'Requalificação' },
              { id: 'abandono_etapa', label: 'Abandonos' },
              { id: 'nao_qualificado', label: 'Não Qualificados' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filterStatus === tab.id
                    ? 'bg-[#C8AA82] text-black font-semibold shadow-sm'
                    : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nome, cidade ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#C8AA82]"
            />
          </div>
        </div>

        {/* Grid: Tabela de Leads + Painel de Detalhes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Tabela de Leads (2 colunas) */}
          <div className="lg:col-span-2 rounded-2xl bg-[#111113] border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-black/40 text-neutral-400 uppercase tracking-wider text-[10px]">
                    <th className="p-4">Cliente / Contato</th>
                    <th className="p-4">Benefício / INSS</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Ação Rápida</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-neutral-400">
                        Nenhum lead encontrado para este filtro.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        onClick={() => {
                          setSelectedLead(lead);
                          setNotesInput(lead.notes || '');
                        }}
                        className={`hover:bg-white/[0.04] transition-colors cursor-pointer ${
                          selectedLead?.id === lead.id ? 'bg-[#C8AA82]/10' : ''
                        }`}
                      >
                        <td className="p-4">
                          <div className="font-semibold text-white text-sm">{lead.fullName}</div>
                          <div className="text-neutral-400 text-[11px] mt-0.5 flex items-center gap-1.5">
                            <span>{lead.whatsapp || 'WhatsApp não informado'}</span>
                            <span>•</span>
                            <span>{lead.city}</span>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="text-neutral-200 capitalize font-medium">
                            {lead.benefitType.replace('_', ' ')}
                          </div>
                          <div className="text-neutral-400 text-[11px] mt-0.5">
                            Situação: <span className="text-[#C8AA82]">{lead.inssStatus}</span>
                          </div>
                        </td>

                        <td className="p-4">
                          {getStatusBadge(lead.status)}
                        </td>

                        <td className="p-4 text-right">
                          <a
                            href={leadService.getRequalificationWhatsAppUrl(lead)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black font-semibold px-3 py-1.5 rounded-lg border border-[#25D366]/30 transition-all text-xs"
                            title="Disparar mensagem no WhatsApp do lead"
                          >
                            <MessageSquare className="w-3 h-3" /> Reengajar
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Painel de Detalhes do Lead Selecionado (1 coluna) */}
          <div className="rounded-2xl bg-[#111113] border border-white/10 p-6 space-y-6 shadow-xl sticky top-6">
            {selectedLead ? (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-start justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{selectedLead.fullName}</h3>
                    <p className="text-xs text-neutral-400">{selectedLead.city}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteLead(selectedLead.id)}
                    className="text-neutral-500 hover:text-red-400 p-1.5 rounded-lg transition-colors"
                    title="Excluir lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-neutral-400 block mb-0.5">Status no Funil:</span>
                    {getStatusBadge(selectedLead.status)}
                  </div>

                  <div>
                    <span className="text-neutral-400 block mb-0.5">WhatsApp:</span>
                    <strong className="text-[#C8AA82] text-sm">{selectedLead.whatsapp}</strong>
                  </div>

                  <div>
                    <span className="text-neutral-400 block mb-0.5">Benefício Solicitado:</span>
                    <strong className="text-white capitalize">{selectedLead.benefitType.replace('_', ' ')}</strong>
                  </div>

                  <div>
                    <span className="text-neutral-400 block mb-0.5">Situação INSS:</span>
                    <strong className="text-white">{selectedLead.inssStatus}</strong>
                  </div>

                  {selectedLead.age && (
                    <div>
                      <span className="text-neutral-400 block mb-0.5">Idade:</span>
                      <strong className="text-white">{selectedLead.age} anos</strong>
                    </div>
                  )}

                  {selectedLead.contributionTime && (
                    <div>
                      <span className="text-neutral-400 block mb-0.5">Tempo de Contribuição:</span>
                      <strong className="text-white">{selectedLead.contributionTime}</strong>
                    </div>
                  )}

                  {selectedLead.incomePerPerson && (
                    <div>
                      <span className="text-neutral-400 block mb-0.5">Renda per capita:</span>
                      <strong className="text-white">{selectedLead.incomePerPerson}</strong>
                    </div>
                  )}

                  {selectedLead.hasMedicalReport && (
                    <div>
                      <span className="text-neutral-400 block mb-0.5">Laudos Médicos:</span>
                      <strong className="text-white">{selectedLead.hasMedicalReport}</strong>
                    </div>
                  )}
                </div>

                {/* Anotações Jurídicas */}
                <div className="space-y-2 pt-3 border-t border-white/10">
                  <label className="text-xs font-semibold text-neutral-300">
                    Anotações do Escritório (Dra. Lorena):
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Adicione notas sobre o processo, CNIS ou laudos..."
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#C8AA82]"
                  />
                  <button
                    onClick={handleSaveNotes}
                    className="w-full bg-white/10 hover:bg-[#C8AA82] hover:text-black text-white text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Salvar Anotações
                  </button>
                </div>

                {/* Botão de Disparo */}
                <div className="pt-2">
                  <a
                    href={leadService.getRequalificationWhatsAppUrl(selectedLead)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-black fill-black" />
                    Enviar WhatsApp de Requalificação
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-neutral-400 space-y-2">
                <Users className="w-8 h-8 mx-auto text-neutral-600" />
                <p className="text-xs">Selecione um lead na tabela ao lado para ver os detalhes e requalificar.</p>
              </div>
            )}
          </div>

        </div>

      </main>
    </div>
  );
}
