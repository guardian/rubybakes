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
            isDesktop = this.isDesktop();
            $(".navigation__point").each(function(index) {
                if ($(this).offset().top + ($(window).height() / 2) > scrollTop) {
                    $(".recipe-navigation").removeClass("is-last");

                    var target = $(".navigation__point:eq(" + (index + 1) + ")");

                    if (isDesktop && $(target).hasClass("navigation__point--mobile-only")) {
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

            if (this.isDesktop() === false && e.currentTarget.hash !== "#intro" && e.currentTarget.hash !== "#ingredients") {
                scrollTo -= $(".recipe__ingredients__label").outerHeight();
            }

            $("html, body").animate({
                scrollTop: scrollTo
            }, 'slow');
        },

        isDesktop: function() {
            var isDesktop = window.getComputedStyle(document.querySelector('.recipe'), ':before').content.replace(/"/g, "") ;
            if (isDesktop === "desktop") {
                return true;
            } else {
                return false;
            }
        }
    };

    return anchors;
});