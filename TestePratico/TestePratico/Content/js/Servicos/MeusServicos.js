angular.module('meusServicos', ['ngResource'])
    .factory('recursoBuscaCadastro', function ($resource) {
        return $resource('api/CADASTRO_CLIENTE/:cadastroId', null, {
            salvar: {
                method: 'POST'
            },
            atualizar: {
                method: 'PUT'
            },
            get: {
                method: 'GET'
            },
            excluir: {
                method: 'DELETE'
            }
        })
    })

.factory('tratarData', function () {

    function viewProDao(data) {
        return new Date(data.substring(0, 4), data.substring(4, 6) - 1, data.substring(6, 8))
    }

    function daoProView(data) {
        return data.substring(6, 8) + '/' + data.substring(4, 6) + '/' + data.substring(0, 4);
    }

    function horaDaoProView(data) {
        let horas = data.getHours() < 10 ? '0' + data.getHours() : data.getHours();
        let minutos = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes();

        return horas + ':' + minutos;
    }

    function horaViewProDao(data) {
        return new Date(0, 0, 0, data.split(':')[0], data.split(':')[1], 0, 0);
    }

    return {
        viewProDao: viewProDao,
        daoProView: daoProView,
        horaDaoProView: horaDaoProView,
        horaViewProDao: horaViewProDao
    };
})

.factory('notificacao', function (ngNotify) {

    function informacao(m) {
        ngNotify.set(m);
    }

    function alerta(m) {
        ngNotify.set(m, "error");
    }

    return {
        informacao: informacao,
        alerta: alerta
    };
});
