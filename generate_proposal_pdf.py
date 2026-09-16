import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm, mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        
        # Header (Pages 2+)
        if self._pageNumber > 1:
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(colors.HexColor("#1A1A1A"))
            self.drawString(1.8 * cm, 28.5 * cm, "ESSENCIAL ASSESSORIA JURÍDICA & CONSULTORIA")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#8C7355"))
            self.drawRightString(19.2 * cm, 28.5 * cm, "Proposta Comercial & Projeto Técnico")
            
            self.setStrokeColor(colors.HexColor("#C8AA82"))
            self.setLineWidth(0.75)
            self.line(1.8 * cm, 28.2 * cm, 19.2 * cm, 28.2 * cm)

        # Footer (All pages)
        self.setStrokeColor(colors.HexColor("#E5E0D8"))
        self.setLineWidth(0.5)
        self.line(1.8 * cm, 1.6 * cm, 19.2 * cm, 1.6 * cm)

        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#666666"))
        self.drawString(1.8 * cm, 1.1 * cm, "Confidencial • Elaborado para Dra. Lorena Cristina Araújo Rios")
        self.drawRightString(19.2 * cm, 1.1 * cm, f"Página {self._pageNumber} de {page_count}")
        self.restoreState()

def generate_proposal_pdf():
    pdf_filename = r"c:\Rogério\Rogério\Projetos\Essencial\Proposta_Comercial_Essencial_Advocacia.pdf"
    
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=A4,
        leftMargin=1.8 * cm,
        rightMargin=1.8 * cm,
        topMargin=2.2 * cm,
        bottomMargin=2.2 * cm,
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette
    PRIMARY = colors.HexColor("#0D1B2A")      # Navy Escuro Nobre
    ACCENT = colors.HexColor("#A88755")       # Ouro Queimado / Âmbar
    ACCENT_LIGHT = colors.HexColor("#F8F5F0") # Fundo Dourado Muito Suave
    DARK = colors.HexColor("#1E1E1E")         # Grafite Escuro
    MUTED = colors.HexColor("#555555")        # Texto Secundário
    BORDER = colors.HexColor("#D8CEBE")       # Borda Suave
    SUCCESS_BG = colors.HexColor("#EBF5EE")   # Verde suave
    SUCCESS_TXT = colors.HexColor("#1E5E3A")

    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=PRIMARY,
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=ACCENT,
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=PRIMARY,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=ACCENT,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=DARK,
        spaceAfter=6
    )

    body_bold = ParagraphStyle(
        'Body_Bold',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=14,
        textColor=DARK,
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        fontName='Helvetica',
        fontSize=9,
        leading=13.5,
        textColor=DARK,
        leftIndent=12,
        spaceAfter=4
    )

    callout_style = ParagraphStyle(
        'Callout_Text',
        fontName='Helvetica',
        fontSize=9,
        leading=13.5,
        textColor=PRIMARY
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=colors.white,
        alignment=1
    )

    table_body_style = ParagraphStyle(
        'TableBody',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=DARK
    )

    table_price_style = ParagraphStyle(
        'TablePrice',
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=PRIMARY,
        alignment=1
    )

    story = []

    # ============================================================
    # 1. CABEÇALHO & IDENTIFICAÇÃO DO PROJETO
    # ============================================================
    meta_table_data = [
        [
            Paragraph("<b>PROPOSTA COMERCIAL & PROJETO TÉCNICO</b>", title_style),
            Paragraph("<para align='right'><b>DATA:</b> 16/09/2026<br/><b>VALIDADE:</b> 10 dias</para>", table_body_style)
        ],
        [
            Paragraph("<b>Reestruturação do Site Institucional, Funil Previdenciário com IA & Aquisição de Clientes</b>", subtitle_style),
            ""
        ]
    ]
    meta_table = Table(meta_table_data, colWidths=[12.5*cm, 4.9*cm])
    meta_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('SPAN', (0,1), (1,1)),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(meta_table)
    story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceBefore=4, spaceAfter=12))

    # Identificação das Partes
    client_box_data = [
        [
            Paragraph("<b>CLIENTE / CONTRATANTE:</b>", h2_style),
            Paragraph("<b>CONSULTORIA & DESENVOLVIMENTO:</b>", h2_style)
        ],
        [
            Paragraph(
                "<b>Essencial Assessoria Jurídica e Consultoria</b><br/>"
                "<b>Dra. Lorena Cristina Araújo Rios</b> • OAB/GO<br/>"
                "Goiânia / GO • Foco: Direito Previdenciário & Civil",
                body_style
            ),
            Paragraph(
                "<b>Rogério Alcântara</b><br/>"
                "Especialista em Tecnologia, Funis Digitais e Tráfego Pago<br/>"
                "Contato: (62) 98314-3967",
                body_style
            )
        ]
    ]
    client_table = Table(client_box_data, colWidths=[8.7*cm, 8.7*cm])
    client_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), ACCENT_LIGHT),
        ('BOX', (0,0), (-1,-1), 1, BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(client_table)
    story.append(Spacer(1, 10))

    # ============================================================
    # 2. DIAGNÓSTICO & OBJETIVOS ESTRATÉGICOS
    # ============================================================
    story.append(Paragraph("1. Diagnóstico do Cenário Atual & Oportunidade", h1_style))
    story.append(Paragraph(
        "Conforme alinhado em nossa reunião presencial, o escritório <b>Essencial Advocacia</b> possui uma sólida reputação "
        "construída por meio de atendimentos e indicações (Pestalozzi, APAE, Igreja e clientes satisfeitos). Contudo, o site registrado "
        "em 2013 permaneceu inoperante e vinculado à KingHost primariamente para a manutenção de e-mails, gerando custo mensal "
        "sem retorno em captação de clientes.",
        body_style
    ))
    story.append(Paragraph(
        "<b>O Objetivo Deste Projeto:</b> Transformar o domínio da Essencial em um <b>ativo gerador de contratos</b>, "
        "implantando uma infraestrutura moderna, veloz e elegante com <b>triagem automática inteligente</b>, permitindo que a Dra. Lorena "
        "receba casos previdenciários altamente qualificados no WhatsApp, economizando tempo de atendimento e eliminando custos desnecessários.",
        body_style
    ))
    story.append(Spacer(1, 8))

    # ============================================================
    # 3. ESCOPO DO PROJETO TÉCNICO
    # ============================================================
    story.append(Paragraph("2. Escopo do Projeto & Soluções Entregues", h1_style))
    
    scope_items = [
        ("A. Novo Site & Landing Page Previdenciária de Alta Performance",
         "Desenvolvimento de página moderna e responsiva (adaptada para celular e computador), com identidade visual jurídica de luxo, carregamento em 1 segundo e selos de conformidade com a OAB."),
        ("B. Sistema de Triagem & Qualificador Previdenciário com IA",
         "Módulo interativo integrado que pré-qualifica o visitante em 4 passos rápidos (Aposentadorias, BPC/LOAS, Auxílio por Incapacidade, Pensão por Morte ou Planejamento). O sistema cruza os requisitos legais e entrega a ficha completa pronta no WhatsApp da Dra. Lorena."),
        ("C. Painel de Gestão & Requalificação de Leads (Sem Perda de Contatos)",
         "Mecanismo de salvamento progressivo: caso o visitante inicie a triagem e feche antes de enviar, o contato é gravado no painel do escritório para requalificação e reengajamento estratégico."),
        ("D. Adequação Geográfica & Google Meu Negócio",
         "Estruturação de SEO e presença local preparada para a localização atual no Jardim Goiás e com suporte completo para a futura transição de endereço para o setor Novo Mundo."),
        ("E. Conformidade Ética Total com o Provimento 205/2021 do CFOAB",
         "Comunicação 100% alinhada às normas do Conselho Federal da OAB para publicidade jurídica informativa de busca ativa."),
    ]

    for title, desc in scope_items:
        story.append(Paragraph(f"• <b>{title}</b>", body_bold))
        story.append(Paragraph(f"{desc}", bullet_style))
        story.append(Spacer(1, 3))

    story.append(Spacer(1, 6))

    # ============================================================
    # 4. BÔNUS ESPECIAL: MIGRAÇÃO & DESLIGAMENTO DA KINGHOST
    # ============================================================
    bonus_box_data = [
        [
            Paragraph("<b>★ BÔNUS EXCLUSIVO INCLUSO: MIGRAÇÃO COMPLETA & ELIMINAÇÃO DA KINGHOST</b>", ParagraphStyle('BonusTitle', fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=SUCCESS_TXT))
        ],
        [
            Paragraph(
                "• <b>Eliminação de Mensalidades:</b> Retiramos o seu domínio da KingHost, eliminando a mensalidade recorrente paga desde 2013.<br/>"
                "• <b>Preservação do Domínio:</b> O endereço oficial <code>www.essencialajc.com.br</code> permanece exatamente o mesmo.<br/>"
                "• <b>Continuidade dos E-mails da Equipe:</b> Garantia de funcionamento das 4 contas de e-mail institucionais do escritório sem interrupção.<br/>"
                "• <b>Hospedagem em Nuvem Gratuita & Rápida (Vercel):</b> Infraestrutura global de alta velocidade com certificado de segurança SSL (HTTPS) sem custos mensais de servidor.<br/>"
                "• <b>Propriedade Vitalícia:</b> O site e todo o código pertencem 100% à Dra. Lorena e ao escritório Essencial.",
                callout_style
            )
        ]
    ]
    bonus_table = Table(bonus_box_data, colWidths=[17.4*cm])
    bonus_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), SUCCESS_BG),
        ('BOX', (0,0), (-1,-1), 1.5, colors.HexColor("#72B08B")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(bonus_table)

    story.append(PageBreak())

    # ============================================================
    # 5. ESTRATÉGIA DE GOOGLE ADS (AQUISIÇÃO ATIVA)
    # ============================================================
    story.append(Paragraph("3. Estratégia de Tráfego Pago no Google Ads", h1_style))
    story.append(Paragraph(
        "A maioria das pessoas que necessita de aposentadoria ou benefício indeferido pesquisa diretamente no Google. "
        "Nossa estratégia posiciona o escritório Essencial no momento exato em que o cliente potencial está com a dor ativa.",
        body_style
    ))

    ads_points = [
        ("Palavras-Chave de Fundo de Funil (Alta Intenção):", "Anúncios específicos para buscas como <i>'advogado especialista em BPC LOAS Goiânia'</i>, <i>'aposentadoria indeferida pelo INSS'</i>, <i>'auxílio-doença cortado'</i>."),
        ("Negativação Rigorosa Anti-Curiosos:", "Bloqueio de termos como <i>'endereço do INSS'</i>, <i>'agendamento gratuito'</i>, <i>'tabela inss'</i>, garantindo que a verba seja gasta apenas com quem busca contratação."),
        ("Investimento em Anúncios:", "Recomendação de R$ 30,00 a R$ 50,00 por dia (verba paga diretamente pela Contratante ao Google, com total transparência e sem intermediação).")
    ]
    for p_title, p_desc in ads_points:
        story.append(Paragraph(f"• <b>{p_title}</b> {p_desc}", bullet_style))

    story.append(Spacer(1, 10))

    # ============================================================
    # 6. PLANOS DE INVESTIMENTO & CONDIÇÕES COMERCIAIS
    # ============================================================
    story.append(Paragraph("4. Opções de Investimento & Condições Comerciais", h1_style))
    story.append(Paragraph("Apresentamos duas opções transparentes para deliberação da equipe do escritório:", body_style))

    plans_data = [
        [
            Paragraph("<b>OPÇÃO 1: SETUP ESTRUTURAL</b><br/><font size='7.5'>ESTRUTURA & SITE NO AR</font>", table_header_style),
            Paragraph("<b>OPÇÃO 2: MÁQUINA DE CLIENTES (RECOMENDADA)</b><br/><font size='7.5'>SETUP + GESTÃO MENSAL DE TRÁFEGO</font>", table_header_style)
        ],
        [
            Paragraph(
                "• Desenvolvimento do Novo Site Essencial<br/>"
                "• Módulo de Triagem IA Previdenciário<br/>"
                "• Envio formatado de Fichas no WhatsApp<br/>"
                "• Painel de Gestão e Recuperação de Leads<br/>"
                "• <b>Migração e Desligamento da KingHost</b><br/>"
                "• Preservação dos 4 e-mails institucionais<br/>"
                "• Configuração de tags de conversão<br/>"
                "• Entrega completa e propriedade definitiva",
                table_body_style
            ),
            Paragraph(
                "• <b>Tudo incluso na Opção 1 (Site + Triagem + E-mails)</b><br/>"
                "• Criação e Gestão Estratégica de Campanhas Google Ads<br/>"
                "• Negativação semanal de termos e curiosos<br/>"
                "• Otimização contínua de conversão de anúncios<br/>"
                "• Ajustes de palavras-chave conforme novas demandas<br/>"
                "• Relatório mensal de leads qualificados gerados<br/>"
                "• Suporte contínuo de tecnologia e inteligência",
                table_body_style
            )
        ],
        [
            Paragraph("<b>INVESTIMENTO:</b><br/><b>R$ 2.500,00</b> à vista<br/><font size='8' color='#555555'>ou 3x de R$ 833,33 sem juros</font>", table_price_style),
            Paragraph("<b>INVESTIMENTO:</b><br/><b>Setup: R$ 2.000,00</b> (em até 3x)<br/><b>+ Gestão: R$ 1.200,00 / mês</b>", table_price_style)
        ]
    ]

    plans_table = Table(plans_data, colWidths=[8.7*cm, 8.7*cm])
    plans_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), PRIMARY),
        ('BACKGROUND', (1,0), (1,0), ACCENT),
        ('BACKGROUND', (0,1), (0,1), colors.HexColor("#FAFAFA")),
        ('BACKGROUND', (1,1), (1,1), ACCENT_LIGHT),
        ('BACKGROUND', (0,2), (0,2), colors.HexColor("#F0EFEA")),
        ('BACKGROUND', (1,2), (1,2), colors.HexColor("#EAE3D2")),
        ('BOX', (0,0), (-1,-1), 1, BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('ALIGN', (0,2), (-1,2), 'CENTER'),
    ]))
    story.append(plans_table)
    story.append(Spacer(1, 12))

    # ============================================================
    # 7. CRONOGRAMA DE IMPLEMENTAÇÃO & APROVAÇÃO
    # ============================================================
    story.append(Paragraph("5. Cronograma de Execução (5 a 7 Dias Úteis)", h1_style))
    
    timeline_data = [
        [
            Paragraph("<b>Etapa 1 (Dias 1-2):</b> Aprovação, alinhamento dos 4 e-mails e transição de DNS do domínio.", table_body_style),
            Paragraph("<b>Etapa 2 (Dias 3-4):</b> Publicação do site na Vercel e ativação da Triagem IA no WhatsApp.", table_body_style)
        ],
        [
            Paragraph("<b>Etapa 3 (Dia 5):</b> Testes práticos com a Dra. Lorena e validação das fichas de clientes.", table_body_style),
            Paragraph("<b>Etapa 4 (Dias 6-7):</b> Ativação das campanhas no Google Ads e início da captação.", table_body_style)
        ]
    ]
    timeline_table = Table(timeline_data, colWidths=[8.7*cm, 8.7*cm])
    timeline_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FAFAFA")),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(timeline_table)
    story.append(Spacer(1, 14))

    # ============================================================
    # 8. ASSINATURAS E ACEITE
    # ============================================================
    story.append(Paragraph("6. Concordância & Próximos Passos", h1_style))
    story.append(Paragraph(
        "Para darmos início ao desenvolvimento e à migração do domínio, basta confirmar a opção escolhida via WhatsApp.",
        body_style
    ))
    story.append(Spacer(1, 15))

    sign_data = [
        [
            Paragraph("____________________________________________<br/><b>ROGÉRIO ALCÂNTARA</b><br/>Consultor em Tecnologia & Estratégia Digital", ParagraphStyle('Sign1', fontName='Helvetica', fontSize=8.5, leading=12, alignment=1)),
            Paragraph("____________________________________________<br/><b>DRA. LORENA CRISTINA ARAÚJO RIOS</b><br/>Essencial Assessoria Jurídica e Consultoria", ParagraphStyle('Sign2', fontName='Helvetica', fontSize=8.5, leading=12, alignment=1))
        ]
    ]
    sign_table = Table(sign_data, colWidths=[8.7*cm, 8.7*cm])
    sign_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'BOTTOM'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(sign_table)

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF gerado com sucesso em: {pdf_filename}")

if __name__ == "__main__":
    generate_proposal_pdf()
