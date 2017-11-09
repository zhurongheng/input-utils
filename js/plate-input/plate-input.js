(function ($) {
    /**
     ********************************1、单个车牌号码模型,依赖于车牌Plate存在**********************************************
     * @param index
     * @param element
     * @param val
     * @param plate
     * @constructor
     */
    function PlateItem(index, element, val, plate) {
        //车牌号下标
        this.index = index;
        //车牌号对应元素
        this.element = element;
        /**
         * 车牌号字符
         */
        this.val = val;
        /**
         * 车牌号容器
         */
        this.plate = plate;
    }

    PlateItem.prototype = {
        constructor: PlateItem,
        /**
         * 车牌号发生改变
         * @param val
         */
        change: function (val) {
            this.val = val;
            this.plate.change(this);
        },
        /**
         * 车牌号被点击
         * @param val
         */
        focus: function (val) {
            this.plate.focus(this);
        },
        /**
         * 设置车牌号
         * @param val
         */
        setVal: function (val) {
            this.val = val;
            this.element.val(val);
            this.change(val);
        },
        /**
         * 获取车牌号
         */
        getVal: function () {
            return this.val;
        },
        /**
         * 设置焦点
         */
        setClick: function () {
            this.element.click();
        }
    }

    /**
     * **************************************2、整个车牌号模型，与号码项有一对多关系***************************************
     * @param plates
     * @constructor
     */
    function Plate(options) {
        this.options = options;
        /**
         * 车牌号数组
         */
        this.platenumber = [];
        /**
         * 车牌项
         */
        this.plateItems = [];
        /**
         * 当前选中的输入框
         * @type {number}
         */
        this.currentIndex=-1;
    }

    Plate.prototype = {
        constructor: Plate,
        onInit: function (inst) {
            if (this.options && typeof(this.options.onInit) == 'function') {
                this.options.onInit.call(this, inst);
            }
        },
        /**
         * 初始化车牌
         * @param plateItems
         */
        init: function (plateItems) {
            this.plateItems = plateItems;
            for (var index = 0; index < plateItems.length; index++) {
                this.platenumber[index] = plateItems[index].getVal() || '';
            }
            this.onInit(this);
        },
        onFocus: function (item) {
            if (this.options && typeof(this.options.onFocus) == 'function') {
                this.options.onFocus.call(this, item);
            }
        },
        /**
         * 某个车牌号获取焦点
         * @param item
         */
        focus: function (item) {
            this.currentIndex=item.index;
            this.onFocus(item);
        },
        onChange: function (inst, item) {
            if (this.options && typeof(this.options.onChange) == 'function') {
                this.options.onChange.call(this, this.platenumber);
            }
        },
        /**
         * 车牌发生变化
         * @param item
         */
        change: function (item) {
            this.onChange(item);
        },
        /**
         * 设置车牌号码
         * @param platenumber []
         */
        setPlatenumber: function (platenumber) {
            //最多支持plateItems长度个车牌号码
            if (platenumber && platenumber.length <= this.plateItems.length) {
                this.platenumber = platenumber;
                for (var index = 0; index < platenumber.length; index++) {
                    this.plateItems[index].setVal(platenumber[index]);
                }
            }
        },
        /**
         * 获取车牌号码
         * @returns []
         */
        getPlatenumber: function () {
            return this.platenumber;
        },
        /**
         * 输入框下标
         * @param index
         */
        setClick: function (index) {
            if (index < this.plateItems.length) {
                console.log('模拟点击...');
                this.plateItems[index].setClick();
            }
        }
    }

    /**
     * *************************************************3、车牌输入UI组件*************************************************
     * @param options
     */
    function PlateInputFactory() {
        //this->当前jQuery对象
        return new PlateInputFactory.fn.init(this);
    }

    PlateInputFactory.fn = PlateInputFactory.prototype = {
        constructor: PlateInputFactory,
        init: function (element) {
            this.element = element;
        },
        build: function (options) {
            /**
             * 进入主流程、开始初始化dom
             */
            this.options = options;
            this.plateItems = [];
            this.plate = new Plate(options);
            (function (element, plate, plateItems) {
                element.children('.plate-box')
                    .children('.plate-item')
                    .children('input')
                    .each(function (index, element) {
                        var item = new PlateItem(index, $(this), $(this).val(), plate);
                        $(this).change(function () {
                            item.change($(this).val());
                        }).click(function () {
                            $(this).parent().siblings().removeClass('active');
                            $(this).parent('.plate-item').addClass('active');
                            item.focus($(this).val());
                        }).focus(function () {
                            document.activeElement.blur();
                        });
                        plateItems.push(item);
                    });
                plate.init(plateItems);
            })(this.element, this.plate, this.plateItems);

        }
    }
    PlateInputFactory.fn.init.prototype = PlateInputFactory.fn;
    /**
     * 4、扩展jq
     */
    $.fn.extend({
        plateInput: PlateInputFactory
    })
})(jQuery);