angular.module('CentralCadastro', ['ngRoute', 'ngNotify', 'meusServicos', 'ui.mask', 'ngMask'])
    .config(function ($routeProvider) {

        $routeProvider
            .when('/painel', {
                templateUrl: '/AngularTemplates/Painel.html',
                //controller: 'PainelController'

            });

        $routeProvider
            .when('/BuscaCadastros', {
                templateUrl: '/AngularTemplates/BuscaCadastros.html',
                controller: 'BuscaCadastroController'

            });

        $routeProvider.otherwise({ redirectTo: '/painel' });
    })

.config(['uiMask.ConfigProvider', function (uiMaskConfigProvider) {
    uiMaskConfigProvider.clearOnBlur(false);
    uiMaskConfigProvider.clearOnBlurPlaceholder(true);
    uiMaskConfigProvider.addDefaultPlaceholder(false);
    uiMaskConfigProvider.allowInvalidValue(true);
}]);