/**
 * xmas-snow
 * @author caibaojian
 * @site http://caibaojian.com
 * @github https://github.com/kujian/xmas-snow
 * @demo http://caibaojian.com/demo/2016/10/snow.html
 * @license MIT
 */
/**
 * @param {Object}      [options]
 *
 * usage:
 * 
 * var snow = new Snow({
    snowmax:50,
    snowcolor:["#FFDA65", "#00AADD", "#aaaacc", "#ddddff", "#ccccdd", "#f3f3f3", "#f0ffff", "#bbf7f9"],
    snowtype:["Times", "Arial", "Times", "Verdana"],
    snowletter:"*",
    sinkspeed: 0.6,
    snowmaxsize:30,
    snowminsize:8,
    snowingzone:1
});
 */
(function SnowModule(factory) {
    "use strict";

    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if (typeof module != "undefined" && typeof module.exports != "undefined") {
        module.exports = factory();
    } else if (typeof Package !== "undefined") {
        //noinspection JSUnresolvedVariable
        Snow = factory(); // export for Meteor.js
    } else {
        /* jshint sub:true */
        window["Snow"] = factory();
    }
})(function SnowFactory() {
    "use strict";
    function Snow(option) {

        option = option || {};
        // Set the number of snowflakes (more than 30 - 40 not recommended)
        this.snowmax = option.snowmax || 50;
        // Set the colors for the snow. Add as many colors as you like
        this.snowcolor = option.snowcolor || new Array("#FFDA65", "#00AADD", "#aaaacc", "#ddddff", "#ccccdd", "#f3f3f3", "#f0ffff", "#bbf7f9");
        // Set the fonts, that create the snowflakes. Add as many fonts as you like
        this.snowtype = option.snowtype || new Array("Times", "Arial", "Times", "Verdana");
        // Set the letter that creates your snowflake (recommended: * )
        this.snowletter = option.snowletter || "*";
        // Set the speed of sinking (recommended values range from 0.3 to 2)
        this.sinkspeed = option.sinkspeed || 0.6;
        // Set the maximum-size of your snowflakes
        this.snowmaxsize = option.snowmaxsize || 30;
        // Set the minimal-size of your snowflakes
        this.snowminsize = option.snowminsize || 8;
        // Set the snowing-zone
        // Set 1 for all-over-snowing, set 2 for left-side-snowing
        // Set 3 for center-snowing, set 4 for right-side-snowing
        this.snowingzone = option.snowingzone || 1;
        ///////////////////////////////////////////////////////////////////////////
        this.snow = new Array();
        this.marginbottom;
        this.marginright;
        this.timer;
        this.i_snow = 0;
        this.x_mv = new Array();
        this.crds = new Array();
        this.lftrght = new Array();
        this.browserinfos = window.navigator.userAgent;
        this.ie5 = document.all && document.getElementById && !this.browserinfos.match(/Opera/);
        this.ns6 = document.getElementById && !document.all;
        this.opera = this.browserinfos.match(/Opera/);
        this.browserok = this.ie5 || this.ns6 || this.opera;

        //start snow
        this.startSnow();
    }

    Snow.prototype.randommaker = function(range) {
        var rand = Math.floor(range * Math.random());
        return rand;
    }

    Snow.prototype.initsnow = function() {
        if (this.ie5 || this.opera) {
            this.marginbottom = document.body.scrollHeight;
            this.marginright = document.body.clientWidth - 15;
        } else if (this.ns6) {
            this.marginbottom = document.body.scrollHeight;
            this.marginright = window.innerWidth - 15;
        }
        this.snowsizerange = this.snowmaxsize - this.snowminsize;
        for (var i = 0; i <= this.snowmax; i++) {
            this.crds[i] = 0;
            this.lftrght[i] = Math.random() * 15;
            this.x_mv[i] = 0.03 + Math.random() / 10;
            this.snow[i] = document.getElementById("s" + i);
            this.snow[i].style.fontFamily = this.snowtype[this.randommaker(this.snowtype.length)];
            this.snow[i].size = this.randommaker(this.snowsizerange) + this.snowminsize;
            this.snow[i].style.fontSize = this.snow[i].size + 'px';
            this.snow[i].style.color = this.snowcolor[this.randommaker(this.snowcolor.length)];
            this.snow[i].style.zIndex = 1000;
            this.snow[i].sink = this.sinkspeed * this.snow[i].size / 5;
            if (this.snowingzone == 1) {
                this.snow[i].posx = this.randommaker(this.marginright - this.snow[i].size)
            }
            if (this.snowingzone == 2) {
                this.snow[i].posx = this.randommaker(this.marginright / 2 - this.snow[i].size)
            }
            if (this.snowingzone == 3) {
                this.snow[i].posx = this.randommaker(this.marginright / 2 - this.snow[i].size) + this.marginright / 4
            }
            if (this.snowingzone == 4) {
                this.snow[i].posx = this.randommaker(this.marginright / 2 - this.snow[i].size) + this.marginright / 2
            }
            this.snow[i].posy = this.randommaker(2 * this.marginbottom - this.marginbottom - 2 * this.snow[i].size);
            this.snow[i].style.left = this.snow[i].posx + 'px';
            this.snow[i].style.top = this.snow[i].posy + 'px';
        }
        this.movesnow();
    }

    Snow.prototype.movesnow = function() {
        for (var i = 0; i <= this.snowmax; i++) {
            this.crds[i] += this.x_mv[i];
            this.snow[i].posy += this.snow[i].sink;
            this.snow[i].style.left = this.snow[i].posx + this.lftrght[i] * Math.sin(this.crds[i]) + 'px';
            this.snow[i].style.top = this.snow[i].posy + 'px';

            if (this.snow[i].posy >= this.marginbottom - 2 * this.snow[i].size || parseInt(this.snow[i].style.left) > (this.marginright - 3 * this.lftrght[i])) {
                if (this.snowingzone == 1) {
                    this.snow[i].posx = this.randommaker(this.marginright - this.snow[i].size)
                }
                if (this.snowingzone == 2) {
                    this.snow[i].posx = this.randommaker(this.marginright / 2 - this.snow[i].size)
                }
                if (this.snowingzone == 3) {
                    this.snow[i].posx = this.randommaker(this.marginright / 2 - this.snow[i].size) + this.marginright / 4
                }
                if (this.snowingzone == 4) {
                    this.snow[i].posx = this.randommaker(this.marginright / 2 - this.snow[i].size) + this.marginright / 2
                }
                this.snow[i].posy = 0;
            }
        }
        // var timer=setTimeout("movesnow()",50);
        var that = this;
        var timer = window.setTimeout(function() {
            that.movesnow();
        },
        50);
    }
    Snow.prototype.createSnow = function() {
        var body = document.getElementsByTagName('body')[0];
        for (var i = 0; i <= this.snowmax; i++) {
            var content = document.createElement("span");
            content.id = 's' + i;
            content.style.position = "absolute";
            content.style.top = "-" + this.snowmaxsize;
            content.innerHTML = this.snowletter;
            body.appendChild(content);
            // document.write("<span id='s"+i+"' style='position:absolute;top:-"+snowmaxsize+"'>"+snowletter+"</span>")
        }
    }
    Snow.prototype.startSnow = function() {
        this.createSnow();
        if (this.browserok) {
            this.initsnow();
        }
    }

    /**
     * Create snow instance
     * @param {Object}      [options]
     */
    Snow.create = function(options) {
        return new Snow(options);
    };

    // Export
    Snow.version = '1.0.1';
    return Snow;
});
