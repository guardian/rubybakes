define([
    'libs/jquery'
], function(
    jquery
){
    var scrollTop;

    var ingredients = {
        init: function() {
            this.bindings();
            this.fixDimensions();
        },

        bindings: function() {
            $(window).scroll(function() {
                this.snapIngredients();
            }.bind(this));
            $(window).resize(function() {
                this.fixDimensions();
            }.bind(this));
            $(".recipe__ingredients__label").click(function() {
                this.expandIngredients();
            }.bind(this));
        },

        snapIngredients: function() {
            scrollTop = $(window).scrollTop();
            if ($(".recipe__ingredients-wrapper").offset().top > scrollTop) {
                $(".recipe__ingredients").removeClass("is-sticky");
                $(".recipe__ingredient:eq(0)").css("padding-top", 0);
            } else {
                $(".recipe__ingredients").addClass("is-sticky");
                $(".recipe__ingredient:eq(0)").css("padding-top", $(".recipe__ingredients__label").outerHeight() + 2);
            }

            if (scrollTop > $(".recipe__ingredients-wrapper").offset().top + $(".recipe__ingredients-wrapper").height()) {
                $(".recipe__ingredients").addClass("is-expandable");
                setTimeout(function() {
                    $(".recipe__ingredients").addClass("is-transitionable");
                }, 300);
            } else {
                $(".recipe__ingredients").removeClass("is-expandable is-transitionable");
            }
        },

        fixDimensions: function() {
            $(".recipe__ingredients-wrapper").height($(".recipe__ingredients").outerHeight());
        },

        expandIngredients: function() {
            if ($(".recipe__ingredients").hasClass("is-expandable")) {
                $(".recipe__ingredients").toggleClass("is-expanded");
            }
        }
    };

    return ingredients;
});