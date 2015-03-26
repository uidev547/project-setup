
;( function ( root, factory ) {

    if ( typeof define === 'function' && define.amd ) {

        // AMD. Register as an anonymous module.
        define( [ 'jquery', 'modules/pubsub' ], factory );

    } else {

        // Browser global
        root.cookies = factory( root.jQuery, root.pubsub );
    }

} )( this, function ( $, pubsub ) {
    

    'use strict';

    var count
        , activeBulletScroll
        , bulletTemplate
        , windowEle
        , windowHeight
        , targetEle
        , selectorEle
        , bullets
        , settings
        , fnbc
        , bulletsTemplate
        , activeBulletEle
        ;
    settings = {
        selector:'[data-section-desc]',
        minslides:3,
        minwidth:600,
        target:'html,body'
    }

    /**
     * function : init
     * i/p: setting as usersetting
     * o/p : undefined
     * desription: 
     *     extend the user settings with settings variable
     *     initilize the variables with initVariables
     *     init the markup with initMarkup
     *     bind the events with bindEvents
     */

    var init = function init( usersetting ) {

        $.extend( true, settings, usersetting );
        initVariables();       
        initMarkup();
        bindEvents();
    };

    /**
     * function : initVariables
     * i/p: undfined
     * o/p : undefined
     * desription: 
     *     init count to 0
     *     activeBulletScroll to false
     *     bulletTemplate with $( '#bullet-template').html()
     *     windowEle with jquery element of window
     *     targetEle with jquery element of settings.target
     *     fnbc with $( '#fixed-nav-bullets-container' );
     */
    var initVariables = function initVariables(){

        count = 0;
        /*arrowTemplate=$( '#arrow-template' ).html();*/
        activeBulletScroll = false;
        bulletTemplate = $( '#bullet-template' ).html();
        windowEle = $( window );
        windowHeight = windowEle.height();
        targetEle = $( settings.target );
        selectorEle = $( settings.selector );
        fnbc = $( '#fixed-nav-bullets-container' );

    };

    var initMarkup = function initMarkup() {

        handleBullets();        

    };


    /**
     * function : handleBullets
     * i/p: undfined
     * o/p : undefined
     * desription: 
     *     loop thhrough the selector, create the bulletsTemplate  and append to fixed-nav-bullets
     *     initialize bullets with $( '#fixed-nav-bullets' ).find( '.fixed-section-bullet' );
     *     if count of selector is not satisfies the condition hide the fnbc
     */
    var handleBullets = function handleBullets() {
        var el;
        bulletsTemplate='';       
        selectorEle.each( function( index, ele ) {
            el = $(ele);
            bulletsTemplate +=  getBulletHtml( count, el );
            el.attr( 'counter', count );
            count++ ;
            
        });

        $( '#fixed-nav-bullets' ).html('').append( bulletsTemplate );
        
        bullets = $( '#fixed-nav-bullets' ).find( '.fixed-section-bullet' );
        activeBulletEle = bullets.eq(0);

        if( count <= settings.minslides ) {

            fnbc.hide();

        }

    };

    /**
     * function : getBulletHtml
     * i/p: ele as selector element 
     * counter = counter of the selector element 
     * o/p : string ( compiled template )
     */
    
    var getBulletHtml = function getBulletHtml( counter, ele ) {

        return bulletTemplate.replace( /{{counter}}/g, counter ).replace( /{{desc}}/g, ele.attr( 'data-section-desc' ) );

    };

    /**
     * function : bindEvents
     * i/p: undfined
     * o/p : undefined
     * desription: 
     *     bind the events
     */

    var bindEvents = function bindEvents(){
        
        if( fnbc ) {
            fnbc.on( 'click', '#fixed-nav-bullets .fixed-section-bullet', bulletClick );
            fnbc.on( 'click', '#fixed-section-bottom, #fixed-section-top', fnbcArrowClick );
        }

        pubsub( 'window/scroll' ).subscribe( windowScroll );
        $( 'body' ).bind( 'mousewheel', function( e ) {
            /*if(e.originalEvent.wheelDelta /120 > 0) {
                console.log("scrolling up");
            }
            else{
                console.log('scrolling down !');
            }*/
            targetEle.stop();
            activeBulletScroll=false;
        });

    };

    /**
     * function : fnbcArrowClick
     * i/p: event as e
     * o/p : undefined
     * desription: 
     *     event handler for arrow click
     */

    var fnbcArrowClick = function fnbcArrowClick( e ) {
       
        e.preventDefault();

        if( this.id==='fixed-section-top' ) {

            activeBulletEle.prev().trigger( 'click' );

        } else if( this.id === 'fixed-section-bottom' ) {

            activeBulletEle.next().trigger('click');

        }
           
    };
    
    /**
     * function : bulletClick
     * i/p: event as e
     * o/p : undefined
     * desription: 
     *     event handler for bulletClick
     *     scroll to the corresponding section
     *     
     */
    

    var bulletClick = function bulletClick( e )  {
        var self = $( this )
            , offset
            ;

        e.preventDefault();
        offset = 0;
        targetEle.stop();
        offset = $( '[counter=' + $(this).index() + ']' ).offset().top;
        activeBulletScroll=true;
        targetEle.animate( {

            scrollTop: offset

        }, 1500, function() {

            activeBulletScroll=false;

        } );

        bullets.removeClass( 'active' );
        self.addClass( 'active' );
        activeBulletEle = self;

    };

    var windowScroll = function windowScroll(){
        var topOffset
            , outerHeight
            , bottomOffset
            , scrolledAmount
            , bullet
            ;
        if( activeBulletScroll ) {
            return;
        }

        selectorEle.each( function( index, ele ) {
            topOffset = $( this ).offset().top;
            outerHeight = $(this).outerHeight();
            bottomOffset = topOffset + outerHeight - windowHeight + 100;
            bottomOffset = bottomOffset > topOffset ? bottomOffset : topOffset + outerHeight - 200 ;
            scrolledAmount= windowEle.scrollTop();
            bullet = fnbc.find( '[data-counter=' + $(ele).attr( 'counter' ) + ']' );

            if( scrolledAmount + 200 > topOffset && scrolledAmount < bottomOffset ) {
                bullets.removeClass("active");
                activeBulletEle = bullet;
                activeBulletEle.addClass("active");

            }
            if( scrolledAmount==0 ) {
                bullets.removeClass( "active" );
                activeBulletEle = bullets.eq( 0 );
                activeBulletEle.addClass("active");
                
            }
        });

    };

    var reinit =function reinit() {
        
        console.log( 'reinit' );

    };

    return{
        init:init,
        reinit:reinit
    }
} );

