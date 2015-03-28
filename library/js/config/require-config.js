/*
 Set global dependency exclusion for template mediators.
 Global dependencies are included in `mediators/common.js.`
 Variable used in require.modules compile array.
*/
var globalExcludes = [
    'jquery'
];

var require = {

    // This is the main path to which our modules are relative.
    baseUrl: '../../library/js',

    // Time in seconds until timeout
    waitSeconds: 90,

    // Paths are relative to `baseUrl`.
    paths: {
        /*
         jquery.js defines its path as `jquery`. The following
         option allows us to locate it at a more logical path.
        */
        'jquery': 'vendors/jquery',
        'ui-bootstrap' : 'vendors/ui-bootstrap'
    },

    shim: {
        // The angular library does not implement AMD.
        'vendors/angular-custom': {
            exports: 'angular'
        },
        'bootstrap' : { 
            'deps' : ['jquery'] 
        },
        'ui-bootstrap' : {
            'deps' : [
                'jquery',
                'vendors/angular-custom'
            ] 
        }
    }

};