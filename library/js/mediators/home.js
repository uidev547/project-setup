require(
    [
        'jquery',
        'vendors/owl.carousel'
    ],
    function( 
        $,
        owl
    ) {
         $(document).ready(function() {
 
            $( '#owl-demo' ).owlCarousel({
                items : 1,
                lazyLoad : true,
                navigation : true,
                
                'afterAction' : function() {
                    console.log( 'afterActone' );
                },
                'beforeUpdate' : function() {
                    console.log( 'beforeUpdate' );
                },
                'afterUpdate' : function() {
                    console.log( 'afterUpdate' );
                },
                'beforeMove' : function() {
                    console.log( 'beforeMove' );
                },
                'afterMove' : function() {
                    console.log( 'afterMove' );
                }
                

            }); 

        });  
    }
);