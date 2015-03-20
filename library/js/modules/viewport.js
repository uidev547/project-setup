
;(function ( root, factory ) {

    if ( typeof define === 'function' && define.amd ) {

        // AMD. Register as an anonymous module.
        define( [ 'modules/pubsub' ], factory );

    } else {

        // Browser global
        root.viewport = factory( root.pubsub );
    }

} )( this, function( pubsub ) {
    

    var vp = function ( input ) {
        
        var currentVp
            , innerWidth
            , oldVp
            , check
            , isVp
            ;
            
        var settings = [
            {
                name: 'small',
                width: 744
            },
            {
                name: 'medium',
                width: 924
            },
            {
                name: 'large',
                width: 1152
            },
            {
                name: 'xlarge',
                width: 40000
            }
        ];        

        if ( typeof input === 'object' ) {

            settings = input;

        }

        check = function() {

            var item
                , i
                , length
                ;

            innerWidth = window.innerWidth;

            for( i=0, length = settings.length; i < length; i++ ) {

                item = settings[ i ];

                if( item.width > innerWidth ) {

                    oldVp = currentVp ? currentVp : item.name;
                    currentVp = item.name;

                    /**
                     * publish viewport/change on viewport changes. i.e if oldVp !== currentVp
                     */
                    if( oldVp !== currentVp ) {

                        pubsub( 'viewport/change' ).publish();

                    }

                    return currentVp;

                }

            }

        };

        isVp = function() {

            return currentVp || check();

        };

        pubsub( 'window/resize' ).subscribe( check );

 
        return {
            is : isVp
        };

    };

    return vp;

} );
