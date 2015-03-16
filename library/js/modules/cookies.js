
;( function ( root, factory ) {

    if ( typeof define === 'function' && define.amd ) {

        // AMD. Register as an anonymous module.
        define( factory );

    } else {

        // Browser global
        root.cookies = factory();
    }

} )( this, function() {

	// https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
	return {

	    get: function ( key ) {

	        if ( !key ) { return null; }

	        return decodeURIComponent( document.cookie.replace( new RegExp( '(?:(?:^|.*;)\\s*' + encodeURIComponent( key ).replace( /[\-\.\+\*]/g, '\\$&' ) + '\\s*\\=\\s*([^;]*).*$)|^.*$' ), '$1' ) ) || '';
	    
	    },
	    set: function ( key, value, path, end, domain, secure ) {

	        if ( !key || /^(?:expires|max\-age|path|domain|secure)$/i.test( key ) ) { return false; }

	        var cookie
	            , expires = ''
	            ;

	        if ( end ) {

	            switch ( end.constructor ) {
	                
	                case Number:
	                    expires = end === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + end;
	                    break;
	                
	                case String:
	                    expires = '; expires=' + end;
	                    break;
	                
	                case Date:
	                    expires = '; expires=' + end.toUTCString();
	                    break;
	            }
	        }

	        cookie  = encodeURIComponent( key ) + '=' + encodeURIComponent( value );
	        cookie += expires;
	        cookie += ( domain ) ? '; domain=' + domain : '';
	        cookie += ( path ) ? '; path=' + path : '';
	        cookie += ( secure ) ? '; secure' : '';

	        document.cookie = cookie;
	        
	        return true;

	    },
	    remove: function ( key, path, domain ) {

	        if ( !this.hasItem( key ) ) { return false; }

	        var cookie = encodeURIComponent( key );
	        cookie += '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
	        cookie += ( path )  ? '; path=' + path : '';
	        cookie += ( domain ) ? '; domain=' + domain : '';

	        document.cookie = cookie;

	        return true;

	    },
	    hasItem: function ( key ) {

	        if ( !key ) { return false; }

	        return ( new RegExp( '(?:^|;\\s*)' + encodeURIComponent( key ).replace( /[\-\.\+\*]/g, '\\$&' ) + '\\s*\\=') ).test( document.cookie );

	    },
	    keys: function () {

	        var keys = document.cookie.replace( /((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '' ).split( /\s*(?:\=[^;]*)?;\s*/ );

	        for ( var len = keys.length, i = 0; i < len; ++i ) {
	            
	            keys[ i ] = decodeURIComponent( keys[ i ] );

	        }

	        return keys;
	    }
	};	
} );


