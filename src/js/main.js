define([
    'libs/jquery',
    'modules/navigation'
], function(
    jQuery,
    Navigation
) {
    'use strict';

    function init(el) {
        var muted =  false;
        var voiceoverplaying = false;
        var voiceoverLoaded = false;
        var voiceoverAudio;

        @@template@@
        $(".content--interactive, .article--feature").html(template["index.html"]);

        $(window).ready(function() {
            Navigation.init();
        });
    }

    return {
        init: init
    };
});