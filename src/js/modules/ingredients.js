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
                console.log("fixing dimensions");
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
        },

        fixDimensions: function() {
            $(".recipe__ingredients-wrapper").height($(".recipe__ingredients").outerHeight());
        }
    };

    return ingredients;
});