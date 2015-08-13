define([
    'libs/jquery',
    'modules/scroll'
], function(
    jQuery,
    Scroll
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
            Scroll.init();
        });
    }

    return {
        init: init
    };
});