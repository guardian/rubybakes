define([
    'libs/jquery'
], function(
    jquery
){
    var scrollTop, passedSteps, currentStep;

    var ingredients = {
        init: function() {
            this.bindings();
            this.fixDimensions();
        },

        bindings: function() {
            $(window).scroll(function() {
                this.snapIngredients();
                this.stepWatcher();
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
            var ingredientsPos = $(".recipe__ingredients-wrapper").offset().top;
            ingredientsPos -= parseInt($(".recipe__ingredients").css("padding-top").replace("px", ""));

            if (ingredientsPos > scrollTop) {
                $(".recipe__ingredients").removeClass("is-sticky");
                $(".recipe__ingredients__list").css("padding-top", 0);
            } else {
                $(".recipe__ingredients").addClass("is-sticky");
                $(".recipe__ingredients__list").css("padding-top", $(".recipe__ingredients__label").outerHeight());
            }

            if (scrollTop > $(".recipe__ingredients-wrapper").offset().top + $(".recipe__ingredients-wrapper").height()) {
                $(".recipe__ingredients").addClass("is-expandable");
                setTimeout(function() {
                    $(".recipe__ingredients").addClass("is-transitionable");
                }, 300);
            } else {
                $(".recipe__ingredients").removeClass("is-expandable is-transitionable");
            }

            if (scrollTop > $(".recipe-step").last().offset().top + ($(".recipe-step").last().height() / 3)) {
                $(".recipe__ingredients").addClass("is-done");
            } else {
                $(".recipe__ingredients").removeClass("is-done");
            }
        },

        stepWatcher: function() {
            var tempStep;
            $(".recipe-step").each(function(index) {
                if (scrollTop >= $(this).offset().top - ($(this).height() / 4)) {
                    tempStep = index;
                }
            });

            if (tempStep !== currentStep) {
                currentStep = tempStep;
                this.checkOffIngredients(currentStep);
            }
        },

        checkOffIngredients: function(lastStep) {
            $(".recipe__ingredient").removeClass("is-active is-used");
            for (var i = 0; i <= lastStep; i++) {
                var listOfIngredients = $(".recipe-step--" + (i + 1)).data("ingredients");
                if (typeof listOfIngredients !== "undefined") {
                    listOfIngredients = listOfIngredients.split(" ");
                    $.each(listOfIngredients, function(index, value) {
                        if (lastStep === i) {
                            $(".recipe__ingredient--" + value).removeClass("is-active is-used").addClass("is-active");
                        } else {
                            $(".recipe__ingredient--" + value).removeClass("is-active is-used").addClass("is-used");
                        }
                    });
                }
            }
        },

        fixDimensions: function() {
            if ($(".recipe__ingredients").hasClass("is-expandable")) {
                $(".recipe__ingredients-wrapper").height($(".recipe__ingredients__list").outerHeight());
            } else {
                $(".recipe__ingredients-wrapper").height($(".recipe__ingredients").outerHeight());
            }
        },

        expandIngredients: function() {
            if ($(".recipe__ingredients").hasClass("is-expandable")) {
                $(".recipe__ingredients").toggleClass("is-expanded");
            }
        }
    };

    return ingredients;
});