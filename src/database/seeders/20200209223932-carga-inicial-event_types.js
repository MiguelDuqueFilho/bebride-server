"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("event_types", [
      {
        id: 1,
        event_type_name: "Assessoria do Dia",
        event_type_resumo:
          "Nossa Assessoria do Dia foi pensada com muito carinho para atender os noivos no dia do seu evento.",
        event_type_description: `
          Nossa **Assessoria do Dia** foi pensada com muito carinho para atender os noivos no dia do seu evento.
          Mas claro que, para tudo sair perfeito como o planejado, precisamos entender sobre seu casamento e tomar conta de alguns detalhes importantíssimos! 
          Nós **orientamos o casal** de 1 mês à 20 dias antes sobre alguns cuidados que precisam ter e nos inteiramos de todo o evento, 
          desenvolvendo junto com o casal todos cronogramas necessários. No Grande Dia estaremos desde o primeiro horário da montagem para garantir o perfeito andamento da cerimônia e festa.
          Itens que contemplam a Assessoria do Dia:
          \
          Acompanhamento na montagem do evento desde o primeiro horário:
          \
          * Verificação do perfeito estado do local antes da chegada do primeiro fornecedor.
          * Verificação do checklist contratado com os fornecedores. 
          * Acompanhamento para o cumprimento de horários de entregas.
          * Organização e auxílio de todo o cerimonial.
          * Verificação e supervisão da qualidade dos serviços prestados.
          * Resoluções de problemas e imprevistos.
          * Recepção e contagem de convidados.
          * Verificação da higiene e limpeza constante do local do evento.
          * Verificação do atendimento e da satisfação dos convidados.
          * Organizar os presentes entregues no dia e a lista de agradecimentos.
        `,
        event_type_icon: "umbrella",
        event_type_show: 1,
        event_type_url: "/advice_complete",
      },
      {
        id: 2,
        event_type_name: "Assessoria Final",
        event_type_resumo:
          "O serviço de assessoria final começa a 60 dias (2 meses) antes do evento.",
        event_type_description: `
          Nossa Assessoria Final é para o casal que deseja paz e sossego no final dos preparativos. Assumimos completamente o controle da organização 2 meses (60 dias) antes do evento, arrematando todo o casamento junto dos fornecedores, padrinhos e convidados com o RSVP.
          \
          Itens que contemplam a Assessoria do Final:
          \
          * Análise de todos os contratos já assinados.
          * Cobrança de prazos e certificação das informações relacionadas ao local e data do evento.
          * Contratação de algum serviço faltante e checklist dos itens essenciais para as últimas semanas
          * Mapear o local e arredores de forma que se conheça as rotas mais rápidas para estabelecimentos-chave (supermercados, farmácias, hospitais).
          * Fazer a análise de risco blindando o evento de imprevistos
          * RSVP – confirmação dos convidados ao evento.
          *  Elaborar os roteiros das cerimônias civil, religiosa e da festa, e assessorar no cerimonial e no receptivo.
          * Ensaio com os padrinhos para o cortejo.
          * Gerenciar todos os envolvidos dos diversos prestadores de serviço e fornecedores, deixando claro os limites de suas responsabilidades na montagem e desmontagem.
          * Elaboração dos cronogramas de serviço, festa, montagem e desmontagem da festa e cerimônia.
           
          \
          A Assessoria Final contempla TODOS OS ITENS da Assessoria do Dia:
          \
          Acompanhamento na montagem do evento desde o primeiro horário:
          * Verificação do perfeito estado do local antes da chegada do primeiro fornecedor.
          *  Verificação do checklist contratado com os fornecedores. 
          * Acompanhamento para o cumprimento de horários de entregas.
          * Organização e auxílio de todo o cerimonial.
          * Verificação e supervisão da qualidade dos serviços prestados.
          * Resoluções de problemas e imprevistos.
          * Recepção e contagem de convidados.
          * Verificação da higiene e limpeza constante do local do evento.
          * Verificação do atendimento e da satisfação dos convidados.
          * Organizar os presentes entregues no dia e a lista de agradecimentos.
          `,
        event_type_icon: "calendar-check-o",
        event_type_show: 1,
        event_type_url: "/advice_last",
      },
      {
        id: 3,
        event_type_name: "Assessoria Completa",
        event_type_resumo:
          "Sinônimo de tranquilidade. <br>Nossa Assessoria Completa é um serviço desenvolvido desde o início dos preparativos.",
        event_type_description: `
        Sinônimo de Tranquilidade
         
        A Assessoria Completa é um serviço desenvolvido especialmente pela Be Bride para trazer tranquilidade aos noivos. Nossa equipe planeja e organiza seu evento do início ao fim, deixando para vocês a melhor parte: a experiência incrível da trajetória até o Grande Dia. Nosso objetivo aqui é que vocês não tenham nenhuma preocupação e aproveitem cada detalhe.
         
        A Assessoria Completa é dividida em 3 partes:
         
        1. Primeiros Passos:
         
        • Identificar o perfil do cliente e fazer o briefing do evento/cerimônia.
        • Desenvolver o orçamento e planejamento financeiro do evento com os noivos.
        • Iniciar o planejamento do evento/cerimônia, respeitando todas as etapas.
        • Promover as parcerias entre os diversos segmentos envolvidos no casamento.
        • Elaborar cronograma geral das atividades pré e pós casamento.
        • Seguindo o orçamento e orientação dos noivos, fazer a curadoria de empresas e fornecedores que atendam as necessidades e porte do evento.
         
         
        2. O Sonho saindo do Papel
         
        • Mapear o local e arredores de forma que se conheça as rotas mais rápidas para estabelecimentos chave (supermercados, farmácias, hospitais).
        • Verificação de local para estacionamento durante a cerimônia e festa.
        • Verificar e elaborar a lista de itens de segurança necessários.
        • Organizar a lista de convidados e endereços com a finalidade de envio, produzir protocolos de entrega ou endereçamentos para o correio, e emitir lista final de convidados e de agradecimentos.
        • Verificar necessidades especiais de convidados (restrições alimentares, físicas...) para adequação do menu e acesso ao evento.
        • Providenciar reservas para hospedagem de convidados, caso necessário.
        • RSVP – confirmação dos convidados ao evento.
        • Elaborar os roteiros das cerimônias civil, religiosa e da festa, e assessorar no cerimonial e no receptivo.
        • Realizar reuniões prévias com todos os fornecedores, esclarecendo todos os detalhes e definindo responsabilidades.
        • Gerenciar todos os envolvidos dos diversos prestadores de serviço e fornecedores, deixando claro os limites de suas responsabilidades na montagem e desmontagem.
         
        3. Viva la Fiesta
         
        Acompanhamento na montagem do evento desde o primeiro horário:
        • Verificação do local antes da chegada do primeiro fornecedor.
        • Verificação do checklist contratado com os fornecedores.
        • Acompanhamento para o cumprimento de horários de entregas.
        • Verificação e supervisão da qualidade dos serviços prestados, seguindo protocolos de segurança.
        • Resoluções de problemas e imprevistos.
        • Recepção e contagem de convidados.
        • Organização e auxílio no Cerimonial
        • Verificação da higiene e limpeza constante do local do evento.
        • Verificação do atendimento e da satisfação dos convidados.
        • Organizar os presentes entregues no dia e a lista de agradecimentos.
        • Acompanhamento na desmontagem do evento.
         

        `,
        event_type_icon: "umbrella",
        event_type_show: 1,
        event_type_url: "/advice_complete",
      },
      {
        id: 4,
        event_type_name: "Consultoria",
        event_type_resumo:
          "Nossa Consultoria é o serviço ideal para o casal que deseja planejar e organizar seu próprio casamento.",
        event_type_description: `
        Nossa Consultoria é o serviço ideal para o casal que deseja planejar e organizar seu próprio casamento com tranquilidade. A Be Bride, após uma reunião com os noivos, desenvolve um material exclusivo, ministrado em uma consultoria de 5 horas, ensinando o casal passo a passo o que deve ser feito até o Grande Dia. Após a consultoria, nossa equipe se disponibiliza online para auxiliar o casal no que eles precisem ao longo de todo o processo até o casamento.
        *A consultoria pode ser adquirida junto com a Assessoria do Dia ou Assessoria Final – para mais informações, confira as abas desses serviços.
         
        Primeira reunião
        A primeira etapa é fazer o briefing. Nessa fase damos prioridade em entender as escolhas e preferências do casal, anseios e desejos, assim como seu perfil e personalidade que serão usados como base para o projeto final. Aqui todo detalhe conta.
         
        Montagem do Projeto
        Nessa etapa montamos um projeto detalhado dentro do estilo dos noivos e fazemos a curadoria de profissionais que mais combinam com o estilo proposto e baseado nas prioridades do casal, sempre seguindo o seu orçamento. Um material de apoio exclusivo é produzido em conjunto para auxiliar os noivos em cada etapa.
         
        Consultoria online ou presencial
        Em uma data pré-agendada com os noivos, fazemos a consultoria com duração de 5 (cinco) horas, em que ensinamos e orientamos sobre todo o planejamento do Grande Dia. Planejamento financeiro e controle dos gastos, análise de contratos e negociações, fornecedores essenciais e secundários, pontos sensíveis, análise de risco, tudo o que deve ser levado em conta em cada etapa com dicas valiosas.
        O material de apoio exclusivo é entregue ao casal.
         
        Reuniões e atendimento online
        Após a consultoria, ao longo de todo o planejamento, nossa equipe se disponibiliza online para atender e esclarecer as dúvidas dos noivos, os orientando e auxiliando no que for preciso.
         
        Material de Apoio
        1. Cronograma do Evento
        2. Planilha de Orçamentos
        3. Planilha de Convidados
        4. Planilha de Padrinhos
        5. Planilha de Presentes
        6. Checklist do Casamento
        7. Checklist do Chá de Cozinha
        8. Curadoria de Fornecedores

        `,
        event_type_icon: "calendar-o",
        event_type_show: 1,
        event_type_url: "/advice_consulting",
      },
      {
        id: 5,
        event_type_name: "Assessoria Pedido de Casamento",
        event_type_resumo:
          "Nossa Assessoria para Pedido de Casamento consiste em ouvir e executar sonhos.",
        event_type_description:
          "Nossa Assessoria para Pedido de Casamento consiste em ouvir e executar sonhos. Trazemos para o plano tangível a ideia, a tornando única e personalizada para momento do casal, tudo isso com o mais absoluto sigilo, para surpreender e encantar. Para garantir que o dia idealizado ocorra perfeitamente e com profissionalismo, esse serviço conta com 2 assessoras, acompanhando a montagem e execução.",
        event_type_icon: "calendar",
        event_type_show: 0,
        event_type_url: "/advice_requests",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("event_types", null, {});
  },
};
