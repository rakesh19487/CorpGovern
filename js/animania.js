/*----------------------------------
*       ___   __   _   _       ___  ___       ___   __   _   _       ___  
*      /   | |  \ | | | |     /   |/   |     /   | |  \ | | | |     /   | 
*     / /| | |   \| | | |    / /|   /| |    / /| | |   \| | | |    / /| | 
*    / /_| | | |\   | | |   / / |__/ | |   / /_| | | |\   | | |   / /_| | 
*   / ___  | | | \  | | |  / /       | |  / ___  | | | \  | | |  / ___  | 
*  /_/   |_| |_|  \_| |_| /_/        |_| /_/   |_| |_|  \_| |_| /_/   |_| 
*
* Author: Samrith Shankar
* Version: 1.0.0
* Created at: 18th March, 2015
* Built for: jQuery
* Website: http://animatron
* Functions offered:
*   1) Float -> left, right, up, down
*   2) Puff-> in, out
*   3) Move from one div to another
*   4) Fade in sequentially, by taking in a class
*   5) credits animation -> up, down
----------------------------------*/

$.fn.animania = function(value, options, callback) {
    var this_ = $(this);
    var settings = $.extend(true, {
        animation: "float",
        duration: 400,
        transition: "entry",
        float: {
            offset:100,
            direction: "down"
        },
        puff: {
            offset:100,
            direction: "in"
        }
    }, options);
    
    if(typeof(value)==="undefined")
        value = options.animation || "float";
    else {
        if(typeof value !== "string") {
            if(typeof value != "object") 
                if(typeof value == "function") callback = value; 
            if(typeof(options)!=="undefined" && options.length<1) callback = options;
            options = value;
            settings = $.extend(options);
        }
        else
            if(typeof options !== "object")
                callback = options;
    }
    
    var floatanim = function(options, callback) {
        this_.show();
        var pos;
        var offsetpos;
        var trans = 0;
        
        pos = this_.position();
        
        if(options.transition==="entry") trans = 0;
        else if(options.transition==="exit") trans=1;
        else trans=0;
        
        if(options.float.direction=="up") 
            offsetpos= {top: pos.top+options.float.offset, left: pos.left};
        if(options.float.direction=="down") 
            offsetpos= {top: pos.top-options.float.offset, left: pos.left};
        if(options.float.direction=="left")
            offsetpos= {left: pos.left-options.float.offset, top: pos.top};
        if(options.float.direction=="right") 
            offsetpos= {left: pos.left+options.float.offset, top:pos.top};
        
        if(options.transition=="entry")
            this_.css({top: offsetpos.top, left:offsetpos.left, opacity: trans});
        if(options.transition=="exit")
            this_.css({top: pos.top, left:pos.left, opacity: trans});
        
        if(trans===0) trans=1;
        else trans=0;
        
        if(options.transition==="entry")
            this_.animate({
                top: pos.top,
                left: pos.left,
                opacity: trans
            }, {
                duration: options.duration,
                complete: callback || null
            }).show();
        if(options.transition==="exit")
            this_.animate({
                top: offsetpos.top,
                left: offsetpos.left,
                opacity: trans,
            }, {
                duration: options.duration,
                complete: callback || null
            });
    };
    
    var puffanim = function(options, callback) {
        var size={};
        this_.show(); 
        var offsize={};
        var pos = this_.position();
        size = {height: this_.outerHeight(true), width: this_.outerWidth(true)};
        offsize = {height: size.height + options.puff.offset, width: size.width + options.puff.offset};
        var animData = [
            {width: size.width, height: size.height, top: pos.top, left: pos.left, opacity:1},
            {width: offsize.width, height: offsize.height, top: pos.top-options.puff.offset, left: pos.top-options.puff.offset, opacity:0}
        ];
        if(options.puff.direction=="in") {
            this_.css({width:offsize.width, height:offsize.height, top: pos.top - options.puff.offset, left: pos.left - options.puff.offset, opacity: 0});
            this_.animate(animData[0], {
                duration: options.duration,
                complete: callback || null
            }).show();
        }
        if(options.puff.direction=="out") {
            this_.css({opacity: 1});
            this_.animate({width: offsize.width, height: offsize.height, top: pos.top-options.puff.offset, left: pos.top-options.puff.offset, opacity:0}, {
                duration: options.duration,
                complete: callback || null
            }).show();
        }
    };
    
    var moveanim = function(options, callback) {
    };
    
    var fadeanim = function(options, callback) {
    };
    
    var creditsanim = function(options, callback){
    };
    
    switch(value) {
            case "float":
                floatanim(settings, callback);
                break;
            
            case "puff":
                puffanim(settings, callback);
                break;
            
            case "move":
                moveanim(settings,callback);
                break;
            
            case "fade":
                fadeanim(settings,callback);
                break;
            
            case "credits":
                creditsanim(settings,callback);
                break;
            
            default:
                alert("Animation '" + value + "' is not available.");
                break;
    }
};