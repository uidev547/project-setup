
define( [ 
    'jquery',
    'vendors/angular-custom',
    'modules/pubsub'
    ],
    function(
        $,
        angular,
        pubsub
    ) {

        var ismodified = false;

        var bindNotebook = function bindNotebook( ele ) {

            bindModifyCheck( ele );
            /*ele.notebook();*/

        };

        var bindModifyCheck = function bindModifyCheck( ele ) {

            if( !ismodified ) {

                ele.one( function() {

                    ismodified = true;

                } );

            }

        };

        $( document ).ready( function() {

            $( '[contenteditable=true]' ).each( function() {

                bindNotebook( $(this) );

            } )
        

        } );

        


        return {

            isModified : function() {
                return ismodified;
            },
            bindModifyCheck : bindModifyCheck,
            bind: bindNotebook

        }


    }
)
