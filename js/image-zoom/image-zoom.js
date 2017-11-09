(function ($) {
    function ImageZoom() {
    }

    ImageZoom.prototype = {
        constructor: ImageZoom,
        onInit: function () {
            if (this.options && typeof(this.options.onInit) == 'function') {
                this.options.onInit.call(this, this);
            }
        },
        init: function (options, image) {
            this.options = options;
            this.image = image;
            this.onInit();
        },
        getUrl: function () {
            if (this.image && this.image.url) {
                return this.image.src;
            } else {
                return null;
            }
        },
        setUrl: function (url) {
            this.image.src = url;
        }
    }

    function ImageZoomFactory() {
        return new ImageZoomFactory.fn.init(this);
    };
    ImageZoomFactory.fn = ImageZoomFactory.prototype = {
        constructor: ImageZoomFactory,
        init: function (element) {
            this.element = element;
        },
        build: function (options) {
            var imageZoom = new ImageZoom();
            var image = new Image();
            image.src = options.url || '';
            imageZoom.init(options, image);
            this.imageZoom = imageZoom;
            (function (element, imageZoom) {
                $(element).children('.image-zoom').append(imageZoom.image).children('img').addClass('normal').click(function () {
                    var class_normal = 'normal';
                    var class_max = 'max';
                    if ($(this).hasClass(class_normal)) {
                        $(this).removeClass(class_normal).addClass(class_max);
                    } else {
                        $(this).removeClass(class_max).addClass(class_normal);
                    }
                });
            })(this.element, imageZoom);
        }
    }
    ImageZoomFactory.fn.init.prototype = ImageZoomFactory.fn;
    $.fn.extend({
        imageZoom: ImageZoomFactory
    })
})(jQuery);