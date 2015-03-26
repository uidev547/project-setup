require(
    [
        'jquery',
		'modules/common',
        'vendors/owl.carousel',
        'modules/pubsub',
        'vendors/jquery.notebook'
    ],
    function( 
        $,
		common,
        owl,
        pubsub,
        fixednav,
        noteBook
    ) {
		
        common.init();
        $(document).ready( function() {
             $('[contenteditable]').notebook();

        } );

    }
);