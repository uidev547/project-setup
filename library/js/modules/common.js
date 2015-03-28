 ;( function ( root, factory ) {

    if ( typeof define === 'function' && define.amd ) {

        // AMD. Register as an anonymous module.
        define( [ 
                'jquery',
                'modules/pubsub',
                'modules/fixednav.jquery'
            ],

            factory );
        
    } else {

        // Browser global
        root.common = factory( root.jQuery, root.pubsub, root.fixednav );
    }

} )( this,function( $, pubsub, fixednav ) {
    
    var resizeTimer
        , innerWidth
        ;

    /*
     * on document ready publish pubsub( 'document/ready' )
     */
    
    pubsub( 'document/ready' ).subscribe( function() {

        fixednav.init( {
            selector: '[data-section-desc]:visible',
            minslides:3
        } ); 

    } );

    $( document ).ready( function() {

        pubsub( 'document/ready' ).publish();

    } );

    /*
     * on window ready publish pubsub( 'window/ready' )
     */
    $( window ).load( function() {

        pubsub( 'window/load' ).publish();

    } );


    /**
     * on document width change publish pubsub( 'window/resize' ) after 100 milli seconds
     * 
     */
    $( window ).resize( function() {

        clearTimeout( resizeTimer );

        resizeTimer = setTimeout( function() {

            if ( innerWidth !== window.innerWidth ) {
                innerWidth = window.innerWidth;
                pubsub( 'window/resize' ).publish();

            }

        }, 100 );

    } );

    /**
     * on document scroll publish pubsub( 'document/scroll' ) 
     */

    $( document ).scroll( function() {

        pubsub( 'window/scroll' ).publish();

    } );

    
    var init = function() {

         console.log( 'init' ); 

    };
    
    return {
        init: init
    };


} );