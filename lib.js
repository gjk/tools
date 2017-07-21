/*
* 
* 根据名称获取url参数
* 
*/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}


/*
*
* 对String对象添加toJson方法
* 
*/
String.prototype.toJson=function(){
    return (new Function("return " + this))();
};


/**
 * 日期格式转换
 * @param {[type]} val [description]
 */
function ChangeDateFormat(val) {
    if (val) {
        //if(val.indexOf('-')>-1){ return '';}
        //var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));

        var date = new Date(val);
        //如果是1900年，则代表数据库数据为空
        if (date.getFullYear() == 1900) {
            return '';
        }
        //月份为0-11，所以+1，月份小于10时补个0
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        if ((date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + min + ":" + s) == "1-01-01 08:00:00") {
            return '';
        }
        else {
            return date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + min + ":" + s;
        }
    }
    return '';
}


/**
 * 扩展原生Date对象，添加format方法
 * @param  {string} format [格式化类型]
 * @return {[type]}        [description]
 */
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "H+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

/**
 * 获取浏览器类型
 * @return {[type]} [description]
 */
function browser() {
    return ({
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                isNo: u.indexOf('Touch') > -1 || u.indexOf('PlayBook') > -1 //自定义扩展
            };
        },
        flatForm: function () {
            if (versions.mobile == true && ((versions.ios == true && versions.iPhone == true && versions.iPad == false) || versions.isNo == true || versions.android == true)) {
                location.href = "http://mobile.yun8s.com";
            }
        }
    });
}

/**
 * 数组去重
 * @param  {Array} arr 需要去重的数组
 * @return {Array}    去重后的数组
 */
function unique(arr) {
    var result = [];
    if(arr instanceof Array){
        var hash = {},
            len = arr.length;
        for (var i = 0; i < len; i++){
            if (!hash[arr[i]]){
                hash[arr[i]] = true;
                result.push(arr[i]);
            } 
        }
    }else{
        console.log('请输入一个数组');
    }
    return result;
}


/**
 * 正则验证
 * @param  {string/number} val  要验证的值
 * @param  {string} type 要验证的类型；email/url/mobile/phone/qq/ip/chinese/idcard/number/
 * @return {bool}      true/false
 */
function validator(val,type){
    var regexStr= {
        //邮箱正则
        email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
        //密码
        loginpassword: /<[!/]/,
        registpassword: /^[~!@\#\$%\^&\*_\+\-=\da-z\.]*$/gi,
        //url 地址正则
        url: /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
        //移动手机号码
        mobile: /^(14[7]|13[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/,
        //座机电话号码
        phone: /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
        //QQ验证正则
        qq: /^[1-9]\d{4,9}$/,
        //ip地址验证
        ip: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        //汉字验证(有瑕疵，生僻字验证不全，努力更新中....)
        chinese: /^[\u4e00-\u9fa5]+$/,
        //身份证正则
        idcard: /^(\d{6})(18|19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X)?$/gi,
        //数字
        nodigits: /^\d+$/,
        //电话
        tel: /^(17[0-9]|14[7]|13[0-9]|15[0-9]|18[0-9])\d{8}$/i,
        number: /(^[1-9]\d*$)|(^([1-9]\d*|0)(\.\d*)?$)/,
        isInt: /^([1-9][0-9]*)|0$/,
        date: /Invalid|NaN/
    };

    return regexStr[type].test(val);
}

/*
* 金额格式化，四舍五入
* yqd.formatMoneyByComma("12345.675910", 2)，返回12,345.67
*/
function formatMoneyByComma(s, n){
   n = n > 0 && n <= 20 ? n : 0;
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
   var l = s.split(".")[0].split("").reverse(),
   r = s.split(".")[1];
   t = "";
   for(i = 0; i < l.length; i ++ )
   {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
   }
   if(r){r="." + r;}
   else{r='';}
   return t.split("").reverse().join("") + r;
}

/**
 * 货币转换大写
 * @param  {[type]} n [description]
 * @return {[type]}   [description]
 */
function toCurrency(n) {
    var fraction = ['角', '分'];
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
}


/**
 * 小tips
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
;(function($) {
    function ToolTips(elem, options){
        this.elem = elem;
        this.set = options;
        //this.obj = null;
    }
    ToolTips.prototype = {
        addAnimation: function(){
            switch(this.set.animation){
                case 'none':
                    break;
                case 'fadeIn':
                    this.obj.addClass('animated fadeIn');
                    break;
                case 'flipIn':
                    switch(this.set.gravity){
                        case 'top':
                            this.obj.addClass('animated flipInTop');
                            break;
                        case 'bottom':
                            this.obj.addClass('animated flipInBottom');
                            break;
                        case 'left':
                            this.obj.addClass('animated flipInLeft');
                            break;
                        case 'right':
                            this.obj.addClass('animated flipInRight');
                            break;
                    }
                    break;
                case 'moveInLeft':
                    this.obj.addClass('animated moveLeft');
                    break;
                case 'moveInTop':
                    this.obj.addClass('animated moveTop');
                    break;
                case 'moveInBottom':
                    this.obj.addClass('animated moveBottom');
                    break;
                case 'moveInRight':
                    this.obj.addClass('animated moveRight');
                    break;
            }
        },
        close:function(){
            this.obj.remove();
        },
        setPosition:function(){
            var setPos = {};
            var pos = { x: this.elem.offset().left, y: this.elem.offset().top };
            var wh = { w: this.elem.outerWidth(), h: this.elem.outerHeight() };
            var rightTmp = ( pos.x + wh.w / 2 ) + this.obj.outerWidth() / 2 ;
            var leftTmp = ( pos.x + wh.w / 2 ) - this.obj.outerWidth() / 2 ;
            switch(this.set.gravity){
                case 'top':
                    if(rightTmp > $(window).width() ){
                        setPos = {
                            x: pos.x + wh.w - this.obj.outerWidth(),
                            y: pos.y - this.obj.outerHeight() - this.set.distance
                        };
                        this.obj.find(".tips-" + this.set.gravity).css("left", this.obj.outerWidth() - wh.w/2 + "px")
                    }else if( leftTmp < 0 ){
                        setPos = {
                            x: pos.x,
                            y: pos.y - this.obj.outerHeight() - this.set.distance
                        };
                        this.obj.find(".tips-" + this.set.gravity).css("left", wh.w/2 + "px")
                    }else{
                        setPos = {
                            x: pos.x - (this.obj.outerWidth() - wh.w)/2,
                            y: pos.y - this.obj.outerHeight() - this.set.distance
                        };
                    }
                    break;
                case 'bottom':
                    if(rightTmp > $(window).width() ){
                        setPos = {
                            x: pos.x + wh.w - this.obj.outerWidth(),
                            y: pos.y + wh.h + this.set.distance
                        };
                        this.obj.find(".tips-" + this.set.gravity).css("left", this.obj.outerWidth() - wh.w/2 + "px")
                    }else if( leftTmp < 0 ){
                        setPos = {
                            x: pos.x,
                            y: pos.y + wh.h + this.set.distance
                        };
                        this.obj.find(".tips-" + this.set.gravity).css("left", wh.w/2 + "px")
                    }else{
                        setPos = {
                            x: pos.x - (this.obj.outerWidth() - wh.w)/2,
                            y: pos.y + wh.h + this.set.distance
                        };
                    }
                    break;
                case 'left':
                    setPos = {
                        x: pos.x - this.obj.outerWidth() - this.set.distance,
                        y: pos.y - (this.obj.outerHeight() - wh.h)/2
                    };
                    break;
                case 'right':
                    setPos = {
                        x: pos.x + wh.w + this.set.distance,
                        y: pos.y - (this.obj.outerHeight() - wh.h)/2
                    };
                    break;
            }
            this.obj.css({"left": setPos.x + "px", "top": setPos.y + "px"});
        },
        setEvent:function(){
            var self = this;
            if(self.set.events =="click" || self.set.events =="onclick"){
                self.obj.on("click", function(e){
                    e.stopPropagation();
                })
                $(document).click(function(){
                    self.obj.remove();
                });
            }
            if(self.set.events =="mouseover" || self.set.events =="onmouseover" || self.set.events =="mouseenter"){
                this.elem.on("mouseout, mouseleave",function(){
                    self.close();
                });
            }
        },
        setConfirmEvents:function(){
            var self = this;
            var yes = this.obj.find(".tips-yes");
            var no = this.obj.find(".tips-no");
            yes.click(function(){
                if(self.set.onYes(self)==true){
                    self.close();
                };
            });
            no.click(function(){
                self.close();
                self.set.onNo(self);
            });
        },
        addConfirm:function(){
            this.obj.append("<div class='tips-confirm'><button type='button' class='tips-yes'>"
                + this.set.yes +"</button><button type='button' class='tips-no'>" + this.set.no +"</button></div>");
            this.setConfirmEvents();
        },
        setContent:function(){
            this.obj = $("<div id=" + this.set.id + " class='tips-tooltip " + this.set.theme + "'" +
                "style='width:" + this.set.width + "'><div class='tips-con'>" + this.set.contents + "</div>" + "<span class='tips-" + this.set.gravity + "'></span></div>");
            $("body").append(this.obj);
            this.setEvent();
            this.addAnimation();
            if(this.set.confirm==true){
                this.addConfirm();
            }
        },
        init:function(){
            var e = arguments.callee.caller.caller.caller.caller.caller.arguments[0] || $.event.fix(event || window.event)
            this.set.events = e.type;
            var justToolObj = $(".tips-tooltip");
            if(justToolObj){
                justToolObj.remove();
            }
            e.stopPropagation();
            this.setContent();
            this.setPosition();
            var self = this;
            $(window).resize(function(){
                self.setPosition();
            });
        }
    }
    $.fn.ToolTips = function(options){
        var defaults = {
            height:"auto",
            width:"auto",
            contents:'',
            gravity: 'top',  //top, left, bottom, right
            theme: '',//className
            distance:10,
            //events: 'mouseover',
            animation: 'none', //none, fadeIn, flipIn, moveInLeft, moveInTop, moveInBottom, moveInRight
            confirm: false,
            yes: 'OK',
            no: 'Cancel',
            //delay: 1000,
            onYes: function(){},
            onNo: function(){}
        }
        this.each(function(){
            options = $.extend(defaults, options);
            options.id = new Date().getTime();
            var tooltip = new ToolTips($(this), options);
            tooltip.init();
        });
    }
})(jQuery);

/**
 * jquery插件
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
$.fn.extend({
    waterFall: function(options) {
        var
            //参数
            setting = {
                column_width: 238, //列宽
                column_className: 'waterfall_column', //列的类名
                column_space: 10, //列间距
                cell_selector: '.cell', //要排列的砖块的选择器，context为整个外部容器
                img_selector: 'img', //要加载的图片的选择器
                auto_imgHeight: true, //是否需要自动计算图片的高度
                fadein: true, //是否渐显载入
                fadein_speed: 600, //渐显速率，单位毫秒
                insert_type: 1, //单元格插入方式，1为插入最短那列，2为按序轮流插入
                getResource: function(index) {} //获取动态资源函数,必须返回一个砖块元素集合,传入参数为加载的次数
            },
            waterfall = $.waterfall = {}, //对外信息对象
            $container = null; //容器
        waterfall.load_index = 0; //加载次数
        // $.fn.extend({
        //     waterfall: function (options) {
        options = options || {};
        setting = $.extend(setting, options);
        $container = waterfall.$container = $(this);
        waterfall.$columns = creatColumn();
        render($(this).find(setting.cell_selector).detach(), false); //重排已存在元素时强制不渐显
        waterfall._scrollTimer2 = null;
        $(window).bind('scroll', function() {
            clearTimeout(waterfall._scrollTimer2);
            waterfall._scrollTimer2 = setTimeout(onScroll, 300);
        });
        waterfall._scrollTimer3 = null;
        $(window).bind('resize', function() {
            clearTimeout(waterfall._scrollTimer3);
            waterfall._scrollTimer3 = setTimeout(onResize, 300);
        });

        function creatColumn() { //创建列
            waterfall.column_num = calculateColumns(); //列数
            //循环创建列
            var html = '';
            for (var i = 0; i < waterfall.column_num; i++) {
                html += '<div class="' + setting.column_className + '" style="width:' + setting.column_width + 'px; display:inline-block; *display:inline;zoom:1; margin-left:' + setting.column_space / 2 + 'px;margin-right:' + setting.column_space / 2 + 'px; vertical-align:top; overflow:hidden"></div>';
            }
            $container.prepend(html); //插入列
            return $('.' + setting.column_className, $container); //列集合
        }

        function calculateColumns() { //计算需要的列数
            var num = Math.floor(($container.innerWidth()) / (setting.column_width + setting.column_space));
            if (num < 1) {
                num = 1;
            } //保证至少有一列
            return num;
        }

        function render(elements, fadein) { //渲染元素
            if (!$(elements).length) return; //没有元素
            var $columns = waterfall.$columns;
            $(elements).each(function(i) {
                if (!setting.auto_imgHeight || setting.insert_type == 2) { //如果给出了图片高度，或者是按顺序插入，则不必等图片加载完就能计算列的高度了
                    if (setting.insert_type == 1) {
                        insert($(elements).eq(i), setting.fadein && fadein); //插入元素
                    } else if (setting.insert_type == 2) {
                        insert2($(elements).eq(i), i, setting.fadein && fadein); //插入元素
                    }
                    return true; //continue
                }
                if ($(this)[0].nodeName.toLowerCase() == 'img' || $(this).find(setting.img_selector).length > 0) { //本身是图片或含有图片
                    var image = new Image;
                    var src = $(this)[0].nodeName.toLowerCase() == 'img' ? $(this).attr('src') : $(this).find(setting.img_selector).attr('src');
                    image.onload = function() { //图片加载后才能自动计算出尺寸
                        image.onreadystatechange = null;
                        if (setting.insert_type == 1) {
                            insert($(elements).eq(i), setting.fadein && fadein); //插入元素
                        } else if (setting.insert_type == 2) {
                            insert2($(elements).eq(i), i, setting.fadein && fadein); //插入元素
                        }
                        image = null;
                    }
                    image.onreadystatechange = function() { //处理IE等浏览器的缓存问题：图片缓存后不会再触发onload事件
                        if (image.readyState == "complete") {
                            image.onload = null;
                            if (setting.insert_type == 1) {
                                insert($(elements).eq(i), setting.fadein && fadein); //插入元素
                            } else if (setting.insert_type == 2) {
                                insert2($(elements).eq(i), i, setting.fadein && fadein); //插入元素
                            }
                            image = null;
                        }
                    }
                    image.src = src;
                } else { //不用考虑图片加载
                    if (setting.insert_type == 1) {
                        insert($(elements).eq(i), setting.fadein && fadein); //插入元素
                    } else if (setting.insert_type == 2) {
                        insert2($(elements).eq(i), i, setting.fadein && fadein); //插入元素
                    }
                }
            });
        }

        function public_render(elems) { //ajax得到元素的渲染接口
            render(elems, true);
        }

        function insert($element, fadein) { //把元素插入最短列
            if (fadein) { //渐显
                $element.css('opacity', 0).appendTo(waterfall.$columns.eq(calculateLowest())).fadeTo(setting.fadein_speed, 1);
            } else { //不渐显
                $element.appendTo(waterfall.$columns.eq(calculateLowest()));
            }
        }

        function insert2($element, i, fadein) { //按序轮流插入元素
            if (fadein) { //渐显
                $element.css('opacity', 0).appendTo(waterfall.$columns.eq(i % waterfall.column_num)).fadeTo(setting.fadein_speed, 1);
            } else { //不渐显
                $element.appendTo(waterfall.$columns.eq(i % waterfall.column_num));
            }
        }

        function calculateLowest() { //计算最短的那列的索引
            var min = waterfall.$columns.eq(0).outerHeight(), min_key = 0;
            waterfall.$columns.each(function(i) {
                if ($(this).outerHeight() < min) {
                    min = $(this).outerHeight();
                    min_key = i;
                }
            });
            return min_key;
        }

        function getElements() { //获取资源
            $.waterfall.load_index++;
            return setting.getResource($.waterfall.load_index, public_render);
        }

        waterfall._scrollTimer = null; //延迟滚动加载计时器
        function onScroll() { //滚动加载
            clearTimeout(waterfall._scrollTimer);
            waterfall._scrollTimer = setTimeout(function() {
                var $lowest_column = waterfall.$columns.eq(calculateLowest()); //最短列
                var bottom = $lowest_column.offset().top + $lowest_column.outerHeight(); //最短列底部距离浏览器窗口顶部的距离
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0; //滚动条距离
                var windowHeight = document.documentElement.clientHeight || document.body.clientHeight || 0; //窗口高度
                if (scrollTop >= bottom - windowHeight) {
                    render(getElements(), true);
                }
            }, 100);
        }

        function onResize() { //窗口缩放时重新排列
            if (calculateColumns() == waterfall.column_num) return; //列数未改变，不需要重排
            var $cells = waterfall.$container.find(setting.cell_selector);
            waterfall.$columns.remove();
            waterfall.$columns = creatColumn();
            render($cells, false); //重排已有元素时强制不渐显
        }

    },

    /*
    * 保持在顶部 2015-10-29 gjk add
    */
    keepTop: function(options) {
        var _this = this;
        var defaultVal = {
            distance: 0 //与place对应的距离
            ,
            place: 0 //0：top；1：left；2：right；3：bottom
            ,
            offsetTop: 0,
            Width: 0
        };
        defaultVal = $.extend(defaultVal, options);
        var top = $(_this).offset().top;
        if (defaultVal.offsetTop > 0)top = defaultVal.offsetTop;
        console.log(top);
        var place = ['top', 'left', 'right', 'bottom'];
        var w = defaultVal.Width != 0 ? ('width:' + defaultVal.Width + ';') : '';
        $(window).scroll(function() {
            if ($(window).scrollTop() >= top) {
                if (place[defaultVal.place] == 'top') {
                    $(_this).attr('style', 'position:fixed;top:' + defaultVal.distance + ';left:0;z-index:99;' + w);
                }
                if (place[defaultVal.place] == 'left') {
                    $(_this).attr('style', 'position:fixed;top:' + top + ';left:' + defaultVal.distance + ';z-index:99;' + w);
                }
                if (place[defaultVal.place] == 'right') {
                    $(_this).attr('style', 'position:fixed;top:' + top + ';right:' + defaultVal.distance + ';z-index:99;' + w);
                }
                if (place[defaultVal.place] == 'bottom') {
                    $(_this).attr('style', 'position:fixed;bottom:' + defaultVal.distance + ';z-index:99;' + w);
                }
            } else {
                $(_this).removeAttr("style");
            }
        }).trigger("scroll");
    },

    /*
    * 锚点 2015-11-02 gjk addS
    */
    anchorText: function(options) {
        var _this = this;
        if (!options) {
            return;
        }
        $(_this).click(function() {
            var docHeight = $(document).height(); //获取页面总高度
            var winHeight = $(window).height(); //获取页面显示区域高度
            var Top = $("#" + options.anchorId).offset().top - options.height; //获取所看区域距离上部的高
            if (docHeight == winHeight)
                return; //如果页面没有滚动条就退出
            if ((docHeight - winHeight) <= Top) {
                $(document).scrollTop(docHeight - winHeight);
            } else {
                $(document).scrollTop(Top);
            }
        });
    },
    
    /* 选项卡切换 */
    /* 调用示例：
     * $(selecter).tabsSwop({
     *     event:'click',
     *     listDoc:selecterList,
     *     animate:{argument:{property:value},speed:500,callback:function(obj){}},
     *     callback:function(obj){},
     *     attr:数字 或者 {property:'',value:''}
     * });
     */
    tabsSwop: function(options) {
        var _index = -1,
            defaultVal = {
                event: 'mouseover', //mouseover / click
                listDoc: '', //要显示/隐藏的元素
                selfCss: '', //自身样式变化
                animate: null, //切换的动画效果
                callback: null, //回调函数
                attr: 0 //默认选中项 如果是数字，则是下标，否则是自定义的属性
            },
            parentDoc = this.parent();

        defaultVal = $.extend(defaultVal, options);
        $(this).on(defaultVal.event, function() {
            _index = $(this).index();
            $(this).addClass(defaultVal.selfCss).siblings().removeClass(defaultVal.selfCss);
            if (defaultVal.callback && typeof defaultVal.callback == "function") {
                defaultVal.callback.call(this,defaultVal);
            }
            if (defaultVal.animate && typeof defaultVal.animate.callback == "function") {
                if($(defaultVal.listDoc).children().eq(_index).is(':visible')){return false;}
                $(defaultVal.listDoc).animate(defaultVal.animate.argument, defaultVal.animate.speed, function() {
                    defaultVal.animate.callback.call($(defaultVal.listDoc),_index);
                });
            }
            else{$(defaultVal.listDoc).children().eq(_index).show().siblings().hide();}
        });
        if (defaultVal.attr>=0){
            $(defaultVal.listDoc).children().hide();
            $(this).removeClass(defaultVal.selfCss);
            if ((typeof defaultVal.attr) == "number") {
                $(this).eq(defaultVal.attr).trigger(defaultVal.event);
            }
        }
    },

    //placeholder 兼容插件
    placeholder: function() {
        var spanAdd = function() {
            if (this.value == "") {
                if ($(this).siblings(".yqd-placeholder").length > 0)
                    placeholderRemome(this);
                var placeholdersStyle = $(this).attr("placeholder-style");
                if (placeholdersStyle == undefined)
                    placeholdersStyle = "";
                $(this).before("<label class='yqd-placeholder' style='line-height:" + ($(this).height()) + "px; " + placeholdersStyle + "'>" + $(this).attr("placeholder") + "</label>");
                $(this).parent().css("position", "relative");
                var _this=this;
                $(this).siblings(".yqd-placeholder").click(function() {
                    $(this).remove();
                    $(_this).focus();
                });
            }
        };
        var placeholderRemome = function() {
            $(this).siblings(".yqd-placeholder").remove();
        };
        var input = document.createElement('input');
        $(this).each(function() {
            if (this.value == 0)
                this.value = "";
            if (!("placeholder" in input)) {
                $(this).focus(function() {
                    placeholderRemome.call(this);
                }).blur(function() {
                    spanAdd.call(this);
                }).trigger("blur");
            }
        });
    },

    /* 数字滚动 */
    /* 调用示例：
     * $(selecter).numRoll({
     *     type:0, //0：减；1：加
     *     num:9527, //最终显示数字
     *     addNum:120,//累加/减数
     *     interTime:10,//单位：秒
     *     callback:function(){//do something....}
     * });
    */
    numRoll:function(options){
        var defaultVal={
            type:0, //0：减；1：加
            num:0, //最终显示数字
            addNum:1, //累加/减数
            interTime:10,//单位：秒
            callback:null
        };
        defaultVal=$.extend(defaultVal, options);
        var _this=this;
        var nr=setInterval(function (){
            var sNum=parseInt($(_this).html());
            if(sNum<parseInt(defaultVal.num)){
                $(_this).html(parseInt($(_this).html()) + defaultVal.addNum);
            }else{
                $(_this).html(defaultVal.num);
                clearInterval(nr);
            }
        },defaultVal.interTime);
        if(defaultVal.callback && typeof defaultVal.callback=="function"){
            defaultVal.callback();
        }
    },

    /* 数字滚动 */
    /* 调用示例：
     * $(selecter).picNumRoll({
     *     num:9527, //最终显示数字
     *     interTime:350,//单位：秒
     *     callback:function(){//do something....}
     * });
     */
    picNumRoll:function(options){
        var defaultVal={
            num:0, //最终显示数字
            interTime:350,//单位：秒
            callback:null
        };
        defaultVal=$.extend(defaultVal, options);
        var n = String(defaultVal.num),len = n.length;
        //如果新的数字短于当前的，要移除多余的i
        if($(this).find("i").length > len)
            $(this).find("i:gt(" + (len - 1) + ")").remove();
        //开始填充每一位
        for(var i=0;i<len;++i){
            //位数不足要补
            if($(this).find("i").length < len){
                $(this).append("<i></i>");
            }
            var obj = $(this).find("i").eq(i);
            var y = -40 * parseInt(n.charAt(i), 10);

            var isIE = /msie/.test(navigator.userAgent.toLowerCase());
            //利用动画变换数字
            if(isIE){
                obj.animate({'backgroundPositionY':y+'px'},defaultVal.interTime);
            }else{
                obj.animate({'backgroundPosition':'0px '+(y+'px')},defaultVal.interTime);
            }

            //obj.animate({'backgroundPosition':'0px '+(y+'px')},defaultVal.interTime);
        }
        if(defaultVal.callback && typeof defaultVal.callback=="function"){
            defaultVal.callback();
        }
    },

    /* 花样导航-魔法线 */
    /* 调用示例：
     * $(selecter).magicLine({
     *     event:'hover', //事件：hover、click
     *     activeCss:'', //被选中的样式
     *     callback:function(){//do something....}
     * });
     */
    magicLine:function(options){
        var defaultVal={
            event:'hover', //事件：hover、click
            activeCss:'', //被选中的样式
            callback:null
        };
        var _this=this;
        defaultVal = $.extend(defaultVal, options);
        if(!$(_this).find(defaultVal.activeCss).length) return;
        $(_this).append("<li id='magic-line'></li>");
        var $magicLine = $("#magic-line"),
            activeDoc=$(_this).find(defaultVal.activeCss);
        $magicLine
                .width($(activeDoc).width())
                .css("left", $(activeDoc).find("a").position().left)
                .data("origLeft", $magicLine.position().left)
                .data("origWidth", $magicLine.width());
        var mouseoverFun;
        if(defaultVal.event=='hover'){
            mouseoverFun=function() {
                $magicLine.stop().animate({
                    left: $magicLine.data("origLeft"),
                    width: $magicLine.data("origWidth")
                });
            }
        }
        var $el, leftPos, newWidth;
        $(_this).children().find("a").hover(function() {
            $el = $(this);
            leftPos = $el.position().left;
            newWidth = $el.parent().width();
            $magicLine.stop().animate({
                left: leftPos,
                width: newWidth
            });
        },mouseoverFun);
        if(defaultVal.callback){
            defaultVal.callback();
        }
    },

    //倒计时
    timeDown: function(options) {
        var defaultVal = {
            statTime: $(this).attr("data-starttime") || new Date(),
            endTime: $(this).attr("data-endtime") || new Date()
        };
        $.extend(defaultVal,options);
        var time_now_server, time_now_client, time_end, time_server_client, timerID,bojTime;
        time_end = new Date(defaultVal.endTime); //结束的时间
        time_end = time_end.getTime();
        time_now_server = new Date(defaultVal.statTime); //开始的时间
        time_now_server = time_now_server.getTime();
        time_now_client = new Date();
        time_now_client = time_now_client.getTime();
        time_server_client = time_now_server - time_now_client;
        timerID=setInterval(show_time, 1000);
        var int_day = 00, int_hour = 00, int_minute = 00, int_second = 00;
        var spanList = $(this).find("span");
        function show_time() {
            var time_now, time_distance;
            var time_now = new Date();
            time_now = time_now.getTime() + time_server_client;
            time_distance = time_end - time_now;
            if (time_distance > 0) {
                int_day = Math.floor(time_distance / 86400000);
                time_distance -= int_day * 86400000;
                int_hour = Math.floor(time_distance / 3600000);
                time_distance -= int_hour * 3600000;
                int_minute = Math.floor(time_distance / 60000);
                time_distance -= int_minute * 60000;
                int_second = Math.floor(time_distance / 1000);                   
                //setTimeout(show_time, 1000);
            } else {
                this.innerHTML = this.innerHTML;
                clearInterval(timerID);
            }
            bojTime = [
                int_day,
                int_hour,
                int_minute,
                int_second
            ];
            for (var s = 0; s < spanList.length; s++) {

                spanList[s].innerHTML = bojTime[s] < 10 ? "0 " + bojTime[s] : (bojTime[s].toString().charAt(0) + " " + bojTime[s].toString().charAt(1));
            }
        }
    },

    /* 滚动动态效果 */
    /* 调用示例
    * $(selecter).scrollLoading({
        marginTop:100,
        callback:function(){
            //do something....
        }
    * });
    *
    */
    scrollLoading: function(options) {
        var defaultVal = {
            callback: $.noop,
            marginTop:0
        };
        defaultVal=$.extend({}, defaultVal, options||{});
        var _this=this,
            container=$(window);
        var loading = function(){
            $.each(_this,function(i,data){
                var thisObj=$(_this[i]);
                if(!thisObj.data('over')){
                    var contHeight = container.height(),
                        contop=0;
                    if (container.get(0)===window) {
                        contop = $(window).scrollTop();
                    } else {
                        contop = container.offset().top;
                    }
                    var post = $(thisObj).offset().top - contop + defaultVal.marginTop,
                        posb = post + $(thisObj).height() + defaultVal.marginTop;
                    if ((post >= 0 && post < contHeight) || (posb > 0 && posb <= contHeight))
                    {
                        thisObj.data('over',1);
                        if ($.isFunction(defaultVal.callback)) {
                            defaultVal.callback.call($(thisObj));
                        }
                    }
                }
            });
        };
        //事件触发
        //加载完毕即执行
        loading();
        //滚动执行
        container.bind("scroll", loading);
    },

    /* 获取鼠标方向 */
    /*
    * $(selecter).getMouseDirection();
    *
    * return: 0:上；1:右；2:下；3：左；
    *
    */
    getMouseDirection:function(e){
        var w=$(this).width();
        var h=$(this).height();
        var x=(e.pageX-$(this).offset().left-(w/2))*(w>h?(h/w):1);
        var y=(e.pageY-$(this).offset().top-(h/2))*(h>w?(w/h):1);
        var direction=Math.round((((Math.atan2(y, x)*(180/Math.PI))+180)/90)+3)%4;
        return direction;
    }
});