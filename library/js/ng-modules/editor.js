
define( [ 
        
        'jquery',
        'vendors/angular-custom',
        'directives/angular-notebook'

    ],
    function(
        $,
        angular,
        ngNotebook
    ) {

        return angular.module( 'Editor', [ 'ng.notebook' ] )
        .controller( 'editorController',
            [ 
                '$scope',

                function( 
                
                    $scope

                 ) {
                    
                    console.log( 'hiii' );

                } 
            ] 
        );
    }

);
