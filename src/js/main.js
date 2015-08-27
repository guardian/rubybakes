define([
    'libs/jquery',
    'libs/nosleep',
    'modules/navigation',
    'modules/ingredients'
], function(
    jQuery,
    noSleep,
    Navigation,
    Ingredients
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
            Ingredients.init();
            document.addEventListener('touchstart', function() {
                noSleep.enable();
                document.removeEventListener('touchstart', enableNoSleep, false);
            }, false);
        });
    }

    return {
        init: init
    };
});