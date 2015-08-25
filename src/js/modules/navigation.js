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
                if ($(this).offset().top + ($(this).height() / 2) > scrollTop) {
                    $(".recipe-navigation").removeClass("is-last");

                    var hash = $(".navigation__point:eq(" + (index + 1) + ")").attr("id");
                    if (hash) {
                        $(".recipe-navigation__link").attr("href", "#" + $(".navigation__point:eq(" + (index + 1) + ")").attr("id"));
                    } else {
                        $(".recipe-navigation").addClass("is-last");
                        return false;
                    }

                    $(".recipe-navigation__point__title").text($(this).data("navigation-title"));
                    $(".recipe-navigation__point__subtitle").text($(this).data("navigation-subtitle"));
                    return false;
                }
            });
        },

        scrollToAnchor: function(e) {
            e.preventDefault();
            var scrollTo = Math.ceil($(e.currentTarget.hash).offset().top);
            console.log(scrollTo);
            console.log(e.currentTarget.hash);
            if ($(window).width() < 980 && e.currentTarget.hash !== "#intro") {
                console.log("offset");
                scrollTo -= $(".recipe__ingredients__label").height();
            }
            $("html, body").animate({
                scrollTop: scrollTo
            }, 'slow');
        }
    };

    return anchors;
});