define(
    [
        'jquery',
        'vendors/angular-custom',
        'ui-bootstrap'
    ],
    function( 
        $,
        angular,
        uiBootstrap
    ) {

        return angular.module( 'ng.common', [ 'ui.bootstrap' ] );

    }
);