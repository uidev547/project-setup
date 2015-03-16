/**
 * self executing function script loaded
 */
; ( function( pubsub ) {
    
    var resizeTimer
        , innerWidth
        ;

    /*
     * on document ready publish pubsub( 'document/ready' )
     */

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


} )( window.pubsub );


