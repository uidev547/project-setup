define(
    [
       'vendor/angular-custom'
    ],

    function(

        angular

    ) {

        'use strict';
        
        return angular.module( 'httpSerivice', [] )

        .config( ['$httpProvider', function( $httpProvider ) {

                // Override $http service's default transformRequest
                $httpProvider.defaults.transformRequest = [ function( data ) {

                    console.log( 'all requests will go through this even and this is final' ) ;
                    return data;

                }];

                $httpProvider.interceptors.push( function( $q ) {

                    return {

                        request: function( config ) {

                            console.log( 'all requests will go through this..' );
                            return config;
                        },

                        requestError: function( response ) {

                            console.log( 'all requestError will go through this..' );
                            return $q.reject( response );
                        },

                        response: function( response ) {

                            console.log( 'all response will go through this..' );
                            return response;
                        },

                        responseError: function( response ) {

                            console.log( 'all responseError will go through this..' );
                            return $q.reject( response );
                        },
                    };
                });
                
            } ]
        )

        .factory( 'http',
            [
                '$http',
                '$q',

                function (

                    $http,
                    $q


                ) {

                    return {

                        get: function( url ) {
						
                            var defer = $q.defer();
                            console.log( 'get call' );
                            $http.get( url )
                            .success( function( response) {
                                console.log( 'inside success' );
                                defer.resolve( response );
                            } )
                            .error(function( error ){
                                console.log( 'inside error' );
                                defer.reject( error );
                            });
                            return defer.promise;
                        },
                        post: function( url, data ) {
						
                            var defer = $q.defer();
                            console.log( 'post call' );
                            $http.post( url, data )
                            .success( function(response,success){
                                console.log( 'inside success' );
                                defer.resolve( response,success );
                            } )
                            .error( function(error){
                                console.log( 'inside error' );
                                defer.reject(error);
                            } );

                            return defer.promise;
                        }

                    };
                }
            ]
        );
    }
);