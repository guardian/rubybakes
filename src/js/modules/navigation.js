define([
    'libs/jquery'
], function(
    jquery
){
    var scrollTop;

    var anchors = {
        init: function() {
            this.updateNavigation();
            this.bindings();
        },

        bindings: function() {
            $(window).scroll(function() {
                this.updateNavigation();
            }.bind(this));
        },

        updateNavigation: function() {
            scrollTop = $(window).scrollTop();
            $(".navigation__point").each(function(index) {
                if ($(this).offset().top > scrollTop) {
                    console.log(index);
                    $(".recipe-navigation__point__title").text($(this).data("navigation-title"));
                    $(".recipe-navigation__point__subtitle").text($(this).data("navigation-subtitle"));
                    console.log($(".navigation__point")[2]);
                    $(".recipe-navigation__link").attr("href", "#" + $(".navigation__point:eq(" + (index + 1) + ")").attr("id"));
                    return false;
                }
            });
        }
    };

    return anchors;
});