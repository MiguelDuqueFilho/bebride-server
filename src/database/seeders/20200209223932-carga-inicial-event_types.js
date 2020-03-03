"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("event_types", [
      {
        id: 1,
        event_type_name: "Assessoria Completa",
        event_type_resumo:
          "Nossa Assessoria Completa é um serviço desenvolvido desde o início dos preparativos.",
        event_type_description:
          "Nossa Assessoria Completa é um serviço desenvolvido desde o início dos preparativos. Após a primeira reunião com os noivos, elaboramos um briefing para atendermos à todas necessidades, organizamos os custos, definimos um cronograma, indicamos os fornecedores (auxiliando em todas as etapas: visitação, fechamento de contrato e, também, assumindo a comunicação com os mesmos) e montamos a festa, garantindo que tudo saia perfeito no grande dia. Para que o evento ocorra com segurança e profissionalismo, contaremos com uma equipe de 4 pessoas, desde o primeiro horário até o final, para acompanhamento da montagem, festa e desmontagem.",
        event_type_icon: "umbrella",
        event_type_show: 1,
        event_type_url: "/advice_complete"
      },
      {
        id: 2,
        event_type_name: "Assessoria Final",
        event_type_resumo:
          "O serviço de assessoria final começa a 60 dias (2 meses) antes do evento.",
        event_type_description:
          "O serviço de assessoria final começa a 60 dias (2 meses) antes do evento. É a fase em que os noivos, com todos os fornecedores já contratados, passam a responsabilidade para nós, que assumimos a cobrança de prazos, organização das entregas, conferir e desmontagem do evento. Para que o evento ocorra com segurança e profissionalismo, contamos com uma equipe de 4 pessoas, desde o primeiro horário até o final, para acompanhamento da montagem, festa e desmontagem.",
        event_type_icon: "calendar-check-o",
        event_type_show: 1,
        event_type_url: "/advice_last"
      },
      {
        id: 3,
        event_type_name: "Assessoria Pedido de Casamento",
        event_type_resumo:
          "Nossa Assessoria para Pedido de Casamento consiste em ouvir e executar sonhos.",
        event_type_description:
          "Nossa Assessoria para Pedido de Casamento consiste em ouvir e executar sonhos. Trazemos para o plano tangível a ideia, a tornando única e personalizada para momento do casal, tudo isso com o mais absoluto sigilo, para surpreender e encantar. Para garantir que o dia idealizado ocorra perfeitamente e com profissionalismo, esse serviço conta com 2 assessoras, acompanhando a montagem e execução.",
        event_type_icon: "calendar",
        event_type_show: 1,
        event_type_url: "/advice_requests"
      },
      {
        id: 4,
        event_type_name: "Consultoria",
        event_type_resumo:
          "Nossa Consultoria é o serviço ideal para o casal que deseja planejar e organizar seu próprio casamento.",
        event_type_description:
          "Nossa Consultoria é o serviço ideal para o casal que deseja planejar e organizar seu próprio casamento. A Be Bride, após uma reunião com os noivos, desenvolve um material exclusivo, ministrado em uma consultoria de 3 horas, ensinando o casal passo a passo o que deve ser feito até o Grande Dia. Esse serviço pode ou não ser associado à Assessoria do Dia em que contaremos com uma equipe de até 4 pessoas, no dia do evento, garantindo que tudo saia perfeito nos mais mínimos detalhes.",
        event_type_icon: "calendar-o",
        event_type_show: 1,
        event_type_url: "/advice_consulting"
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("event_types", null, {});
  }
};
