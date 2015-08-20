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
            $(".recipe-navigation__link").click(function(e) {
                this.scrollToAnchor(e);
            }.bind(this));
        },

        updateNavigation: function() {
            scrollTop = $(window).scrollTop();
            $(".navigation__point").each(function(index) {
                if ($(this).offset().top >= scrollTop) {
                    console.log($(".navigation__point:eq(" + (index + 1) + ")").attr("id"));
                    $(".recipe-navigation__point__title").text($(this).data("navigation-title"));
                    $(".recipe-navigation__point__subtitle").text($(this).data("navigation-subtitle"));
                    $(".recipe-navigation__link").attr("href", "#" + $(".navigation__point:eq(" + (index + 1) + ")").attr("id"));
                    return false;
                }
            });
        },

        scrollToAnchor: function(e) {
            e.preventDefault();
            var scrollTo = $(e.currentTarget.hash).offset().top;
            if (e.currentTarget.hash !== "#intro") {
                scrollTo -= $(".recipe__ingredients__label").height();
            }
            $("html, body").animate({
                scrollTop: scrollTo
            }, 'slow');
        }
    };

    return anchors;
});