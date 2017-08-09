angular.module('CentralCadastro').controller('BuscaCadastroController', function ($scope, $resource, notificacao, tratarData, recursoBuscaCadastro) {

    $scope.CADASTRO_CLIENTE = {};
    $scope.cadastroExcluir = {};
    $scope.cadastroClientes = [];

    $scope.divLista = true;
    $scope.divCadastro = false;

    $scope.AbrirCadastro = function () {
        $scope.CADASTRO_CLIENTE = {};
        $scope.formulario.$setPristine();
        $scope.formulario.$setUntouched();

        $scope.divCadastro = true;
        $scope.divLista = false;
    };

    $scope.FechaCadastro = function () {
        $scope.divCadastro = false;
        $scope.divLista = true;

        $scope.formulario.$setPristine();
        $scope.formulario.$setUntouched();
    };

    $scope.FechaDialog = function () {
        $scope.ModalExcluir = false;
    };

    //Realiza a busca de todos os dados
    $scope.buscarTodos = function () {

        recursoBuscaCadastro.query(function (cad) {
            $scope.cadastroClientes = cad;
        }, function (erro) {
            notificacao.alerta(erro.cad.Message);
        });
    };
    $scope.buscarTodos();

    // Salva o objeto inteiro
    $scope.salvar = function () {

        //$scope.CADASTRO_CLIENTE.DATA_NASC = $scope.CADASTRO_CLIENTE.DATA_NASC != null ? moment($scope.CADASTRO_CLIENTE.DATA_NASC).format('YYYYMMDD') : null

        if ($scope.CADASTRO_CLIENTE.ID) {

            recursoBuscaCadastro.atualizar({ cadastroId: $scope.CADASTRO_CLIENTE.ID }, $scope.CADASTRO_CLIENTE, function (retorno) {
                $scope.buscarTodos();
            }, function (erro) {
                notificacao.alerta(erro.Message);
            });

        }
        else {

            recursoBuscaCadastro.salvar($scope.CADASTRO_CLIENTE, function (retorno) {
                $scope.buscarTodos();

            }, function (erro) {
                notificacao.alerta(erro.Message);
            });
        }

        $scope.FechaCadastro();
    }

    // Edita o registro selecionado
    $scope.editar = function (data) {

        $scope.AbrirCadastro();

        recursoBuscaCadastro.get({ cadastroId: data.ID }, function (cadastros) {
            $scope.CADASTRO_CLIENTE = cadastros;

            //$scope.CADASTRO_CLIENTE.DATA_NASC = $scope.CADASTRO_CLIENTE.DATA_NASC != null ? new Date($scope.CADASTRO_CLIENTE.DATA_NASC.substring(0, 4), $scope.CADASTRO_CLIENTE.DATA_NASC.substring(4, 6) - 1, $scope.CADASTRO_CLIENTE.DATA_NASC.substring(6, 8)) : null
            console.log($scope.CADASTRO_CLIENTE.DATA_NASC)

        }, function (erro) {
            notificacao.alerta(erro.data.Message);
        });
    }

    // Deleta o registro selecionado
    $scope.deletar = function () {

        recursoBuscaCadastro.excluir({ cadastroId: $scope.cadastroExcluir.ID }, function (retorno) {
            var indice = 0;
            angular.forEach($scope.CADASTRO_CLIENTE, function (valor, chave) {
                if (valor.ID == $scope.cadastroExcluir.ID) {
                    $scope.CADASTRO_CLIENTE.splice(indice, 1);
                }
                indice++;
            })

        }, function (erro) {
            notificacao.alerta(erro.Message);
        });

        $scope.ModalExcluir = false;
    };

    // Informa a mensagem de exclusão
    $scope.excluir = function (pro) {

        $scope.cadastroExcluir = pro;
        $scope.ModalExcluir = true;
    };

});