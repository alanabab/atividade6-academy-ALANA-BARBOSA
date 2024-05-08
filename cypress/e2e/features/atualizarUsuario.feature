# language: pt

Funcionalidade: Atualizar Usuário

Contexto: Usuário deseja atualizar dados
  Dado que já existe um usuário cadastrado

Cenário: Deve permitir atualizar um usuário com sucesso
  Dado que acessei a página de detalhes de usuário
  Quando clicar em Editar
  E informar um novo nome e um novo email para o usuário
  E clicar em Salvar
  Então visualizarei a mensagem "Informações atualizadas com sucesso!" na tela
  E os dados do usuário serão atualizados na lista

Cenário: Não permitir atualização caso nenhum usuário seja localizado
  Quando tentar acessar a página de detalhes de um usuário inexistente
  Então visualizarei o aviso "Usuário não encontrado" na tela
  E serei redirecionado a lista de usuários

Cenário: Não deve ser possível atualizar um usuário sem informar um nome
  Dado que acessei a página de detalhes de usuário
  Quando clicar em Editar
  E limpar o campo Nome
  E clicar em Salvar
  Então visualizarei o alerta "O campo nome é obrigatório." na tela

Cenário: Não deve ser possível atualizar um usuário sem informar um email
  Dado que acessei a página de detalhes de usuário
  Quando clicar em Editar
  E limpar o campo Email
  E clicar em Salvar
  Então visualizarei o alerta "O campo e-mail é obrigatório." na tela

Esquema do Cenário: Não deve ser possível atualizar um usuário com e-mail em formato inválido
  Dado que acessei a página de detalhes de usuário
  Quando clicar em Editar
  E limpar o campo Email
  E informar um novo e-mail "<email>" para o usuário
  E clicar em Salvar
  Então visualizarei o alerta "Formato de e-mail inválido" na tela
  Exemplos:
    |     email      |
    | emailinvalido  |
    | email@invalido |
    |  invalido.com  |
    |     @.com      |

Cenário: Não permitir atualizar usuário com nome com mais de 100 caracteres
  Dado que acessei a página de detalhes de usuário
  Quando clicar em Editar
  E limpar o campo Nome
  E informar um nome com mais de 100 caracteres para o usuário
  E clicar em Salvar
  Então visualizarei o alerta "Informe no máximo 100 caracteres para o nome" na tela

Cenário: Não permitir atualizar usuário com email com mais de 60 caracteres
  Dado que acessei a página de detalhes de usuário
  Quando clicar em Editar
  E limpar o campo Email
  E informar um e-mail com mais de 60 caracteres para o usuário
  E clicar em Salvar
  Então visualizarei o alerta "Informe no máximo 60 caracteres para o e-mail" na tela

Cenário: Não permitir atualizar usuário com um email que já estiver em uso 
  Dado que existe outro usuário cadastrado com determinado email
  Dado que acessei a página de detalhes de usuário
  Quando clicar em Editar
  E informar o mesmo e-mail usado pelo outro usuário
  E confirmar a operação
  Então visualizarei o erro "Este e-mail já é utilizado por outro usuário." na tela