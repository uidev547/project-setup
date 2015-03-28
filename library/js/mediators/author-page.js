require(
    [
        'jquery',

        'ui-bootstrap',
        'vendors/angular-custom',
        'modules/common',

        'ng-modules/common',
        'ng-modules/editor'
    ],
    function( 
        $,
        uiBootstrap,
        angular,
        common,
        ngCommon,
        editor
    ) {

        common.init();
        
        function init() {


            angular.module( 'App',
                [
                    'Editor',
                    'ng.common'
                ]
            );
            // Bootstrap application dynamically to `document` as there is no access to global header elements inside AEM.
            angular.bootstrap( document, [ 'App' ] );


        }

        init();

    }
);