define(
    [
        'vendors/angular-custom',
        'vendors/jquery.notebook',
        'modules/editor'
    ],

    function(

        angular,
        notebook,
        editor

    ) {

        /*
         * Scott Jehl's AngularJS Picturefill directive
         * https://github.com/tinacious/angular-picturefill
         */

        'use strict';

        return angular.module( 'ng.notebook', [] )

        .directive( 'angularContenteditable', function() {

            return {


                link: function ( scope, elem, attrs ) {

                    elem.attr( 'contenteditable', 'true' );
                    editor.bind( elem );

                }
            };
        });
    }
);