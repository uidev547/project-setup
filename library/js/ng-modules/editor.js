
define( [ 
        
        'jquery',
        'vendors/angular-custom',
        'vendors/textAngular.min',
        'directives/angular-notebook',
        'modules/fixednav.jquery'

    ],
    function(
        $,
        angular,
        ngRichtext,
        ngNotebook,
        fixednav
    ) {

        function reinitFixedNav() {
            setTimeout( function(){

                fixednav.reinit( {
                    selector: '[data-section-desc]:visible',
                    minslides:1
                } );

            }, 100 ); 
        }
        return angular.module( 'Editor', [ 'ng.notebook', 'textAngular' ] )
        .controller( 'pageCtrl',
            [ 
                '$scope',
                '$modal',
                '$log',

                function ( 
                
                    $scope,
                    $modal,
                    $log

                ) {

                    $scope.component = {

                        data: {
                            pageTitle: 'Article title come here',
                        },
                        name: 'page-component',
                        popUpBodytemplate : 'editor-page-component.html',
                        modalHeader: 'page level setitings',
                        level: 1
                        
                    };


                } 
            ] 
        )
        .directive( 'componentManager',

           function() {

                return {

                    restrict: 'A',
                    scope: {
                        component : '=',
                        parentComponent : '='
                    },
                    template:'<div class="component-manager-class" ng-dblclick="editComponent( $event, component )" ng-include="getComponentTemplate( component )" ng-class="{\'locked\':component.locked}"></div>',
                    controller: [   
                        
                        '$scope',
                        '$modal',
                        '$log',

                        function ( 
                        
                            $scope,
                            $modal,
                            $log

                        ) { 
                            //console.log( $scope.component );

                            $scope.addNewComponent = function() {
                               
                                var modalInstance = $modal.open( {
                                    templateUrl: 'common-pop-up.html',
                                    controller: 'commonPopupCtrl',
                                    resolve: {
                                        data: function () {
                                                  return {
                                                        popUpBodytemplate: 'pick-componets-list.html',
                                                        modalHeader: 'Please select component..',
                                                        level: $scope.component.level 
                                                  };
                                            }
                                    }

                                } );

                                modalInstance.result.then( function ( data ) {

                                    var component;

                                    switch( data.name ) {

                                        case 'title-text-component': 
                                            component = {
                                                name: 'title-text-component',
                                                popUpBodytemplate : 'editor-title-text-component.html',
                                                modalHeader: 'Please fill the details',
                                                level: $scope.component.level + 1
                                            };
                                            break;
                                        case 'section-component': 
                                            component = {
                                                name: 'section-component',
                                                popUpBodytemplate : 'editor-section-component.html',
                                                //template : 'section-component.html',
                                                modalHeader: 'section component settings',
                                                level: $scope.component.level + 1
                                            };

                                            reinitFixedNav();


                                            break;
                                    }

                                    if( component ) {

                                        $scope.component.components = $scope.component.components || [];
                                        $scope.component.components.push( component );




                                    }
                                    
                                    $log.info( 'componentsPopupCtrl Modal closed at: ' + new Date() );

                                }, function () {
                                  
                                  $log.info( 'componentsPopupCtrl Modal dismissed at: ' + new Date() );

                                } );

                            };

                            $scope.editComponent = function( event, component ) {
                                event.preventDefault();
                                event.stopPropagation();

                                if( component.locked ) {

                                    var modalInstance = $modal.open( {

                                        templateUrl: 'common-pop-up.html',
                                        controller: 'commonPopupCtrl',
                                        resolve: {
                                            data: function () {
                                                return {
                                                    modalHeader : 'Are you sure to onlock the component?'
                                                }
                                            }
                                        }

                                    });

                                    modalInstance.result.then( function () {
                                        
                                        $scope.component.locked = false;
                                        $scope.editComponent( $scope.component );

                                    }, function () {
                                      
                                       $log.info( 'editorPopupCtrl Modal dismissed at: ' + new Date() );

                                    } )
                                    return;
                                }
                               
                                var modalInstance = $modal.open( {

                                    templateUrl: 'common-pop-up.html',
                                    controller: 'commonPopupCtrl',
                                    resolve: {
                                        data: function () {
                                            return component;
                                        }
                                    }

                                });

                                modalInstance.result.then( function ( data ) {
                                    
                                    $scope.component.data = data;
                                    $log.info( 'component is updated: ' + new Date() );

                                }, function () {
                                  
                                   $log.info( 'editorPopupCtrl Modal dismissed at: ' + new Date() );

                                } );

                            };
                            
                            $scope.deleteComponent = function( component ) {

                                if( !component.data && (!component.components || !component.components.length )  ) {
                                    var index = $scope.parentComponent.indexOf( $scope.component );
                                    $scope.parentComponent.splice( index, 1 );
                                    $log.info( 'deleted ' + new Date() );

                                    if( $scope.component.name === 'section-component' ) {
                                        reinitFixedNav();
                                    }

                                    return;
                                }
                                
                                var modalInstance = $modal.open( {

                                    templateUrl: 'common-pop-up.html',
                                    controller: 'commonPopupCtrl',

                                    resolve: {

                                        data: function () {
                                            return {
                                                modalHeader: 'Are you sure to delete?',
                                                modalBody : 'you can not get back data if you delete.... !'
                                            };
                                        }
                                        
                                    }

                                });

                                modalInstance.result.then( function () {
                                    
                                    var index = $scope.parentComponent.indexOf( $scope.component );
                                    $scope.parentComponent.splice( index, 1 );
                                    if( $scope.component.name === 'section-component' ) {
                                        reinitFixedNav();
                                    }
                                    $log.info( 'deleted ' + new Date() );


                                }, function () {
                                  
                                   $log.info( 'editorPopupCtrl Modal dismissed at: ' + new Date() );

                                } );

                            };

                            $scope.getComponentTemplate = function( component ) {

                                return component.name + '.html';

                            }

                            $scope.lockComponent  = function( component ) {
                                
                                component.locked = !component.locked;

                            };

                        }
                    ]
                };

           }
        )
        .controller( 'commonPopupCtrl', 
            [   
                '$scope',
                '$modalInstance',
                'data',

                function ( 
                
                    $scope,
                    $modalInstance,
                    data

                ) {

                    $scope.common = angular.copy( data );

                    $scope.ok = function () {

                        $modalInstance.close( angular.copy ( $scope.common.data ) );

                    };

                    $scope.cancel = function () {

                        $modalInstance.dismiss( 'cancel' );

                    };

                }
            ]
        )
        .directive( 'addAttr',

           function() {

                return {

                    restrict: 'A',
                    link: function( scope, element) {
                        scope.$watch( 'component.data.shortDescription', function(){
                            if( scope.component.data && scope.component.data.shortDescription ) {
                                element.attr( 'data-section-desc', scope.component.data.shortDescription  );
                                reinitFixedNav();
                            } else {
                                element.removeAttr( 'data-section-desc' );
                                reinitFixedNav();
                            }    
                        } )
                        
                    }
                };

           }
        )
        ;


    }

);
