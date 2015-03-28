
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

                    $scope.data = {
                        pageTitle: 'Article title come here',
                        template: 'pageSettings.html',
                        modalHeader: 'page setting',

                    };



                    $scope.addNewSection = function(){
                        var section = {
                            shortDescription: 'short description',
                            arrowRequired : true,
                            template : 'sectionSettings.html'
                        };
                        $scope.sections = $scope.sections || [];

                        $scope.sections.push( section );
                    };



                    
                    $scope.openPageSettings = function ( ) {

                        var modalInstance = $modal.open( {
                            templateUrl: 'common-pop-up.html',
                            controller: 'commonPopupCtrl',
                            resolve: {
                            data: function () {
                                  return $scope.data;
                                }
                            }

                        } );

                        modalInstance.result.then( function ( pageData ) {
                            $scope.data = pageData.data;
                            $log.info( 'SectionSettingsModal closed at: ' + new Date() );

                        }, function () {
                          
                            $log.info( 'SectionSettings Modal dismissed at: ' + new Date() );

                        } );
                    };

                    $scope.lockComponent = function(  ) {

                    }

                } 
            ] 
        )
        .controller( 'sectionManagerCtrl',
            [ 
                '$scope',
                '$modal',
                '$log',

                function ( 
                
                    $scope,
                    $modal,
                    $log

                ) {



                    
                    $scope.openSectionSettings = function ( section ) {



                        var modalInstance = $modal.open( {
                            
                            templateUrl: 'common-pop-up.html',
                            controller: 'commonPopupCtrl',
                            resolve: {
                                data: function () {
                                  
                                    return section;

                                }
                            }

                        } );

                        modalInstance.result.then( function ( ) {

                            $log.info( 'SectionSettingsModal closed at: ' + new Date() );

                        }, function () {
                          
                            $log.info( 'SectionSettings Modal dismissed at: ' + new Date() );

                        } );
                    };

                    $scope.openComponets = function ( ) {

                        var modalInstance = $modal.open( {

                            templateUrl: 'common-pop-up.html',
                            controller: 'commonPopupCtrl',
                            resolve: {
                                data: function () {
                                    return {
                                        template: 'componets-list.html',
                                        modalHeader: 'Please select component..'
                                    }
                                }
                            }

                        });

                        modalInstance.result.then( function ( common ) {

                            var component;
                            switch( common.data.name ) {
                                case 'title-text-component': 
                                            component = {
                                                name: 'title-text-component',
                                                editorTemplate : 'editor-title-text-component.html',
                                            }
                                    break;
                            }
                            if( component ) {

                                $scope.components = $scope.components || [];
                                $scope.components.push( component );

                            }
                            

                            $log.info( 'componentsPopupCtrl Modal closed at: ' + new Date() );

                        }, function () {
                          
                          $log.info( 'componentsPopupCtrl Modal dismissed at: ' + new Date() );

                        } );
                    };

                    $scope.deleteComponent = function( section ) {

                        if( !$scope.componets ) {
                            var index = $scope.sections.indexOf( $scope.sections );
                            $scope.sections.splice( index, 1 );
                            $log.info( 'deleted ' + new Date() );
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
                            
                            var index = $scope.sections.indexOf( $scope.sections );
                            $scope.sections.splice( index, 1 );
                            $log.info( 'deleted ' + new Date() );


                        }, function () {
                          
                           $log.info( 'editorPopupCtrl Modal dismissed at: ' + new Date() );

                        } );

                    }

                    $scope.getComponetTemplate = function( component ) {

                        if( component.name === 'title-text-component' ) {

                            return 'title-text-component.html';

                        }
                        
                    }



                } 
            ] 
        )
        .controller('sectionSettingsPopupCtrl', 
            [   
                '$scope',
                '$modalInstance',
                'data',

                function ( 
                
                    $scope,
                    $modalInstance,
                    data

                ) {

                    $scope.ok = function () {

                        $modalInstance.close( component );

                    };

                    $scope.cancel = function () {

                        $modalInstance.dismiss( 'cancel' );

                    };

                }
            ]
        )
        .controller('componentsPopupCtrl', 
            [   
                '$scope',
                '$modalInstance',
                'data',

                function ( 
                
                    $scope,
                    $modalInstance,
                    data

                ) {

                    $scope.ok = function () {

                        

                        $modalInstance.close( component );

                    };

                    $scope.cancel = function () {

                        $modalInstance.dismiss( 'cancel' );

                    };

                }
            ]
        )
        .directive( 'sectionManager',

           function() {

                return {

                    restrict: 'A',
                    controller: 'sectionManagerCtrl'

                }

           }
        )
        .directive( 'editorManager',

           function() {

                return {

                    restrict: 'A',
                    controller: 'editorManagerCtrl'

                }

           }
        )
        .controller( 'editorManagerCtrl', 
            [   
                '$scope',
                '$modal',
                '$log',

                function ( 
                
                    $scope,
                    $modal,
                    $log

                ) { 

                    $scope.editComponent = function( component ) {
                       
                        var modalInstance = $modal.open( {

                            templateUrl: 'component-editor-popup.html',
                            controller: 'editorPopupCtrl',
                            resolve: {
                                data: function () {
                                    return component;
                                }
                            }

                        });

                        modalInstance.result.then( function ( component ) {
                            
                            $scope.component.data = component.data;
                            

                            $log.info( 'component is updated: ' + new Date() );

                        }, function () {
                          
                           $log.info( 'editorPopupCtrl Modal dismissed at: ' + new Date() );

                        } );

                    };
                    
                    $scope.deleteComponent = function( component ) {

                        if( !component.data ) {
                            var index = $scope.components.indexOf( $scope.component );
                            $scope.components.splice( index, 1 );
                            $log.info( 'deleted ' + new Date() );
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
                            
                            var index = $scope.components.indexOf( $scope.component );
                            $scope.components.splice( index, 1 );
                            $log.info( 'deleted ' + new Date() );


                        }, function () {
                          
                           $log.info( 'editorPopupCtrl Modal dismissed at: ' + new Date() );

                        } );

                    };

                    $scope.lockComponent  = function( component ) {
                        
                        console.log( 'lockComponent' + component );

                    };

                }
            ]
        )
        .controller( 'editorPopupCtrl', 
            [   
               '$scope',
                '$modalInstance',
                'data',

                function ( 
                
                    $scope,
                    $modalInstance,
                    data

                ) {

                    $scope.component = {
                        editorTemplate: data.editorTemplate,
                        data: angular.copy( data.data )
                    };



                    $scope.ok = function () {

                        $modalInstance.close( angular.copy( $scope.component ) );

                    };

                    $scope.cancel = function () {

                        $modalInstance.dismiss( 'cancel' );

                    };

                }
            ]
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

                        $modalInstance.close( angular.copy ( $scope.common ) );

                    };

                    $scope.cancel = function () {

                        $modalInstance.dismiss( 'cancel' );

                    };

                }
            ]
        );


    }

);
