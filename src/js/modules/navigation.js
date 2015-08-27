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
            $(window).resize(function() {
                this.updateNavigation();
            }.bind(this));
            $(".recipe-navigation__link").click(function(e) {
                this.scrollToAnchor(e);
            }.bind(this));
        },

        updateNavigation: function() {
            scrollTop = $(window).scrollTop();
            $(".navigation__point").each(function(index) {
                if ($(this).offset().top + ($(this).height() / 2) > scrollTop) {
                    $(".recipe-navigation").removeClass("is-last");

                    var target = $(".navigation__point:eq(" + (index + 1) + ")");

                    if ($(window).width() > 980 && $(target).hasClass("navigation__point--mobile-only")) {
                        target = $(".navigation__point:eq(" + (index + 2) + ")");
                    }

                    var hash = $(target).attr("id");
                    if (!hash) {
                        $(".recipe-navigation").addClass("is-last");
                        return false;
                    }

                    $(".recipe-navigation__link").attr("href", "#" + $(target).attr("id"));
                    $(".recipe-navigation__point__title").text($(target).data("navigation-title"));
                    $(".recipe-navigation__point__subtitle").text($(target).data("navigation-subtitle"));
                    return false;
                }
            });
        },

        scrollToAnchor: function(e) {
            e.preventDefault();
            var scrollTo = Math.ceil($(e.currentTarget.hash).offset().top);
            if ($(window).width() < 980 && e.currentTarget.hash !== "#intro" && e.currentTarget.hash !== "#ingredients") {
                scrollTo -= $(".recipe__ingredients__label").height();
            }
            $("html, body").animate({
                scrollTop: scrollTo
            }, 'slow');
        }
    };

    return anchors;
});