var i;
var score= 0;
var nodeId;
var completedNode=[];
var e;
var time=0;
var currentNode = 0;
var a = window.parent["API"];


function initPage() {
    $("body").keydown(function(e){
        var keycode =  e.keyCode ? e.keyCode : e.which;

        if(keycode == 8){
            e.preventDefault();
        }

        if(keycode == 46){ // delete
            e.preventDefault();
        }

    });
	playMusic();
    initCommunications();
    initInstructions();

    if(typeof getAPI() !== "undefined" || getScore()!=="")
        score = parseInt(parseFloat(getScore())*100);

    //else
        //score=0;
    //score = parseFloat(getScore());
    time = scormGetValue("cmi.comments").split(",");
    time = parseInt(time[time.length-2]);
    if(isNaN(time))
        time  = 0;

    $("body").append('<div class="modal-main"></div>');
    $(".modal-main").hide();
    $('#story-wrapper').css('background-image', 'url(img/' + storyConfig.background + ')');
    $('#story-zone').css({
        backgroundImage: 'url(img/' + (platformData.formal ? storyConfig.zone.formalBack : storyConfig.zone.casualBack) + ')',
        left: storyConfig.zone.px + "%",
        top: storyConfig.zone.py + "%"
    });
    /* Set the Story Presenter */
    $('#story-presenter').css({
        left: storyConfig.presenter.px + "%",
        top: storyConfig.presenter.py + "%",
        width: storyConfig.presenter.width + "%"
    }).attr('src', 'img/' + storyConfig.presenter.image);

    /* Set the Story Nameplate */
    $('#story-nameplate').css({
        left: storyConfig.nameplate.px + "%",
        top: storyConfig.nameplate.py + "%",
        width: storyConfig.nameplate.width + "%"
    }).attr('src', 'img/' + storyConfig.nameplate.image);

    $('#story-compass').css({
        left: storyConfig.compass.px + "%",
        top: storyConfig.compass.py + "%",
        width: storyConfig.compass.width + "%"
    }).attr('src', 'img/' + storyConfig.compass.image);

    setTimeout(function () {
        $('#story-wrapper').fadeIn('slow', function() { $("#loadingMessage").fadeOut();})
        addNodes();
    }, 1000);


    initSideIcons();
    startPagebtn();

}


    function startPagebtn(){

        $("#story-wrapper").append("<div id='start_button' class=' start_button'></div>");
        $("#start_button").append("<img src='img/mountain.png' id='mountain_first' />");
        $("#start_button").append("<img src='img/cureach.png' id='canureach'/>");
        $("#start_button").append("<a href='#inst-backdrop' id='demo01'><img src='img/hop.png' id='instruction_first' /></a>");
        $("#start_button").append("<img src='img/start_button.png' id='start_first' />");

        $("#start_first").unbind('mouseover').on('mouseover', function() {
            $(this).attr('src', "img/Start1_hover.png");
        });
        $("#start_first").unbind('mouseout').on('mouseout', function() {
            $(this).attr('src', "img/start_button.png");
        });

        $("#instruction_first").unbind('mouseover').on('mouseover', function() {
            $(this).attr('src', "img/hopover.png");
        });
        $("#instruction_first").unbind('mouseout').on('mouseout', function() {
            $(this).attr('src', "img/hop.png");
        });
        $("#start_first").click(function (e){

            $(".loading").css({zIndex: 6});
            $(".modal-main").fadeIn(500).delay(500).fadeOut(500);
            $('#sideiconpanel').css('display','block');
            $("#story-nodes").fadeOut(1000).delay(3000).fadeIn(1000);
            $(".loading").fadeIn(500).delay(3000).fadeOut(1000);
            $("#loadingMessage").fadeOut(500).delay(500).fadeIn(500).delay(500).fadeOut(500).delay(500).fadeIn(500).delay(500).fadeOut(500);

            $('#story-wrapper').css('background-image', 'url(img/' + storyConfig.background1 + ')');

            initBackpack();
            initVideo();
            if(score === 0)
            {
                scoredisp = 0;
            }

            else

            scoredisp =(score*100);

        if(time==0)
            timedisp="00:00";
        else
            timedisp = formatTime(time)

        $("#story-wrapper").append("<div id='story-scoreboard-container'><img src='img/scoreboard.png' /><span class='score_hurdle-name' id='score_node_name'></span><span class='score_hurdle-time' id='score_node_time'>" + timedisp + "</span><span class='score_hurdle-score' id='score_node'>"+score+" / 100</span></div>");
        $("#start_button").css("display","none");
        $("#story-compass").css("display","none");
        $("#story-nodes").css("display","block");
        $("#score_node_name" ).html(storyConfig.nodes[0].name);
        if(parseInt(scormGetValue("cmi.objectives.0.id"))!=0 || scormGetValue("cmi.objectives.0.id") != "") {
            currentNode = parseInt(scormGetValue("cmi.objectives.0.id"));
            if(isNaN(currentNode))
                currentNode = 0;
            changeNodeState();
        }

		if(currentNode<6)
            // TODO:- Need to uncomment this later
            console.log("LMSSetValue");
			// a.LMSSetValue("cmi.core.lesson_status", "incomplete");
            // TODO:- Need to uncomment this later
    });

    instruction_click();
}
function instruction_click(){

    $("#instruction_first").click(function (e){
        var display_status_header=$('#instruction_table').css('display');
        //if(display_status_header=='none') {
        //$("#instruction_table").animate({'opacity':'1','left':'5%'}, 9500);;
        //$("#instruction_table").fadeToggle(1500);
        //$("#instruction_table").fadeTo('slow', 0.5);
        //}
        //else
        //{
        //    $("#instruction_table").fadeOut(200);
        //}

    });
}
function initBackpack() {
    $("#story-wrapper").append("<table id='backpack-icon-wrapper' style='display: none;margin-top:19px;margin-left:1%;'></table>");
    $("#backpack-icon-wrapper").append("<tr></tr><tr></tr>");
    for(i in back_pack) {
        $("#backpack-icon-wrapper tr:first-child").append("<td class='back_pack_img' id='back_pack_img-"+ parseInt(i)+"'><img class='back-pack-icon' src='img/" + back_pack[i].icon + "' currid='" + back_pack[i].id + "'  slideid='" + back_pack[i].slide_id + "' /></td>");
        $("#backpack-icon-wrapper tr:last-child").append("<td class='back-pack-icon-name'>" + back_pack[i].name + "</td>");
    }

    $("#story-wrapper").append('<div class="back_pack_content"  style="display: none" id="back_pack_table">' +'<h3 class="modal-heading">'+"BACKPACK"+' </h3>'  +
    '<div class="top-content-header"><div class="top-content"></div><div class="close-btn"><img src="img/close_grey.png" id="close_btn" class="slide_btn" width="60%" ></div></div>' +
    '<div class="left-slide"><div class="left-content"> <img src="img/circle_left.png" width="20px" height="25px" id="left_slide_btn" class="slide_btn"></div></div>' +
    '<div class="mid-slide"></div>' +
    '<div class="right-slide"><div class="right-content"><img src="img/circle_next_arrow.png" width="20px" height="25px" id="right_slide_btn" class="slide_btn"></div></div>' +
    '</div>');

    $(".back-pack-icon").unbind('click').on('click', function() {
        var display_status_header=$('#back_pack_table').css('display');
        //if(display_status_header=='none'){

        $(".side-icon-image:first-child").addClass('no-click');
        //var effect = 'slide';
        //// Set the options for the effect type chosen
        //var options = { direction:"up" };
        //// Set the duration (default: 400 milliseconds)
        //var duration = 500;
        //$('#back_pack_table').toggle(effect, options, duration);
        $('#back_pack_table').fadeIn('slow');
        var slidid = parseInt($(this).attr("currid"));
        for(var i=0;i<back_pack.length;i++) {
            $("#back_pack_img-"+i+" img").attr("src", 'img/' + back_pack[i].icon);
            $(this).attr("src", 'img/' + back_pack[slidid - 1].icon_active);
            $(".back-pack-icon-name").eq(i).removeClass("back-pack-icon-active");
        }
        $(".back-pack-icon-name").eq($(this).parent().index()).addClass("back-pack-icon-active");
        var data;
        $('.left-slide').css('visibility', 'hidden');
        $('.right-slide').css('visibility', 'visible');

        for(i in slide_config) {
            if(slide_config[i].slide_id==slidid){
                data=slide_config[i].sub_slide;
            }
        }

        $("#left_slide_btn").attr("sub_slide_id",data[0].id-1);
        $("#left_slide_btn").attr("slide_id",slidid);
        $("#right_slide_btn").attr("sub_slide_id",data[0].id+1);
        $("#right_slide_btn").attr("slide_id",slidid);
        $( ".top-content" ).empty();
        $( ".mid-slide" ).empty();
        $(".top-content").append('<img src="img/how_adventure.png" class="backpack-icon" style="float:left">'+'<b class="backpack-txt">'+data[0].sub_header+'</b>')
        $(".mid-slide").append(data[0].sub_contents);

        $("#left_slide_btn").unbind('click').on('click', function() {
            var slideid = parseInt($(this).attr("slide_id"));
            var subslideid = parseInt($(this).attr("sub_slide_id"));
            if(subslideid>1){
                $('.left-slide').css('visibility', 'visible');
            }
            else{
                $('.left-slide').css('visibility', 'hidden');
            }
            var slideid = parseInt($(this).attr("slide_id"));
            var subslideid = parseInt($(this).attr("sub_slide_id"));
            $("#left_slide_btn").attr("sub_slide_id",subslideid-1);
            $("#right_slide_btn").attr("sub_slide_id",subslideid+1);

            getSubSlide(subslideid,slideid);

        });
        $("#right_slide_btn").unbind('click').on('click', function() {

            $('.right-slide').css('visibility', 'visible');
            var slideid = parseInt($(this).attr("slide_id"));
            var subslideid = parseInt($(this).attr("sub_slide_id"));
            $("#right_slide_btn").attr("sub_slide_id",subslideid+1);
            $("#left_slide_btn").attr("sub_slide_id",subslideid-1);
            if(subslideid>1){
                $('.left-slide').css('visibility', 'visible');
            }
            getSubSlide(subslideid,slideid);
        });

        $("#close_btn").unbind('click').on('click', function() {
            $("#back_pack_table").fadeOut(200);
            $("#backpack-icon-wrapper").fadeOut(200);
            $(".side-icon-image:first-child").removeClass('no-click');
            for(var i=0;i<=back_pack.length;i++){
                $("#back_pack_img-"+i+" img").attr("src",'img/'+ back_pack[i].icon);
                $(".back-pack-icon-name").eq(i).removeClass("back-pack-icon-active");
            }
        });
        //}
        //else{
        //    var effect = 'slide';
        //    var options = { direction:"up" };
        //    var duration = 500;
        //    $('#back_pack_table').toggle(effect, options, duration);
        //    $(".side-icon-image:first-child").removeClass('no-click');
        //    for(var i=0;i<=back_pack.length;i++){
        //        $("#back_pack_img-"+i+" img").attr("src",'img/'+ back_pack[i].icon);
        //        $(".back-pack-icon-name").eq(i).removeClass("back-pack-icon-active");
        //    }
        //}

		$(".back-pack-icon-name").unbind("click").on("click", function(){
        	$(".back-pack-icon").eq($(this).index()).trigger("click");
    	});
    })

}

function initVideo(){
    $("#story-wrapper").append('<div class="video_content"  style="display: none" id="video_table">' +
        '<div class="close-btn video-close"><img src="img/close_grey.png" id="close_btn" class="slide_btn" width="60%" ></div>' +
        '<video id="player1" src="http://techslides.com/demos/sample-videos/small.mp4" width=100% height=100%></video>' +
    '</div>');

    $('.video-close').unbind('click').on('click',function(){
        $('#video_table').fadeOut('200');
    })

}

function getSubSlide(sub_slide_id,slide_id){
    $('.right-slide').css('visibility', 'visible');

    var data;
    for(i in slide_config) {
        if(slide_config[i].slide_id==slide_id){
            data=slide_config[i].sub_slide;
        }
    }
    if(sub_slide_id==data.length){
        $('.right-slide').css('visibility', 'hidden');
    }
    $(".top-content" ).empty();
    $(".top-content").append('<img src="img/how_adventure.png" class="backpack-icon">'+'<b class="backpack-txt">'+data[sub_slide_id-1].sub_header+'</b>');
    $(".mid-slide" ).empty();
    $(".mid-slide").append(data[sub_slide_id-1].sub_contents);
}

function initInstructions(){
    $("#story-wrapper").append("<div id='inst-backdrop'></div>")
    $("#inst-backdrop").append('<div class="instruction_content"  id="instruction_table">'+

    '<h3 class="modal-heading">'+"HOW TO PLAY"+' </h3>'  +
    '<div class="inst-container"">'+
    '<img src="img/how_adventure.png" class="list-icons adventure-img-icon" />'+'<p>'+"You are in for an adventure! You will start at the base of Mount Everest and will have to make your way up to the top. You will face obstacles on the way. But that's no reason to worry!"+'</p>'+
    '<img src="img/backpack_icon.png" class="list-icons backpack-img-icon" />'+'<p>'+ "Your Backpack contains all the help that you may need. We suggest you go through it before you begin your journey; even though you will continue to have access to it through your journey." +'</p>' +
    '<img src="img/score_icon.png" class="list-icons score-img-icon" />'+'<p>' +'Your score and the time taken to get past a hurdle will be displayed at the bottom left corner of the screen. Remember, your score and time will be updated at the end of each level.' +'</p>' +
    '</div>'+

    '<div class="close-inst-backdrop">' +
    '<img src="img/close_grey.png" width="100%" />' +
    '</div>' +
    '</div>');
    setTimeout(function() {
        $("#demo01").animatedModal({
            modalTarget: "inst-backdrop",
            animatedIn: "bounceIn",
            animatedOut: "bounceOut"
        });
    }, 200);
}
function initSideIcons() {
    $("#story-wrapper").append("<table id='sideiconpanel' class='sideicons' style='display: none'></table>");
    $("#sideiconpanel").append("<tr><td class='side-icon-image'><img src='img/back_pack.png' id='back_pack_img'/></td></tr>");
    $("#sideiconpanel").append("<tr><td class='side-icon-text'>Backpack</td></tr>");
//    $("#sideiconpanel").append("<tr><td class='side-icon-image' style='display: none'><img src='img/instructions.png' id='instruction_img'/></td></tr>");
//    $("#sideiconpanel").append("<tr><td class='side-icon-text' style='display: none;'>How to Play</td></tr>");

//    On BackPack Click
    $("#back_pack_img").unbind('click').on('click', function (){
        var effect = 'slide';
        var options = { direction:"left" };
        var duration = 500;
        $('#backpack-icon-wrapper').toggle(effect, options, duration);
        //$('#backpack-icon-wrapper').fadeIn();
    });
}

function addNodes() {
    var activeMarked = false;
    var nodeLength = storyConfig.nodes.length;
    for (i in storyConfig.nodes) {
        var nodeData = storyConfig.nodes[i];
        if (checkNodeInclusion(nodeData.sequence)) {
            var nodeStatus = checkNodeCompletion(nodeData.sequence);
            var nodePic, nodeClass;
            if (nodeStatus) {
                nodePic = storyConfig.nodepics.complete;
                nodeClass = "complete-node";
            } else {
                if (!activeMarked) {
                    nodePic = storyConfig.nodepics.active;
                    activeMarked = true;
                    nodeClass = "active-node";
                } else {
                    nodePic = storyConfig.nodepics.incomplete;
                    nodeClass = "incomplete-node";
                }
            }
            $('#story-nodes').append('<a href="#" tabindex="0" data-toggle="popover" class="story-node incomplete-node click_inactive" id="story-node-' + (parseInt(i) + 1) + '" style="top:' + nodeData.py + '%;left:' + nodeData.px + '%"><img src="img/' + (nodeData.icon == "" ? nodePic : nodeData.icon_inactive) + '" alt=""/></a>');
            $("#story-node-1 img").attr("src", 'img/1.png');
            $( "#story-node-1" ).addClass("click-active this-node").removeClass("click_inactive");
            $( "#story-node-1" ).click(function(){
                $("#arrow_first").css('display','none');
            })
        }
    }
    bindToNodes("click3", "click_inactive");
    bindToNodes("click1", "click-active");
    bindToNodes("hover", "story-node");

}

function bindToNodes(str, nodecls) {
    var storyNodes = $('.' + nodecls);
    if(str=="hover")
        storyNodes.popover({
            placement: function () {
                var thisNode = getNodeConfig(getSequence(this.$element));
                var direction;
                switch (true) {
                    case (thisNode.py < 40):
                        direction = "bottom";
                        break;
                    case (thisNode.py > 40 && thisNode.py < 60 && thisNode.px < 50):
                        direction = "right";
                        break;
                    case (thisNode.py > 40 && thisNode.py < 60 && thisNode.px > 50):
                        direction = "top";
                        break;
                    default:
                        direction = "left";
                }
                return direction
            },
            trigger: "hover",
            html: true,
            title: function () {
                return getNodeConfig(getSequence(this)).name
            },
            content: function () {
                var seq = getSequence(this);
                var photo = (getNodeConfig(seq).photo == "") ? '' : '<img class="popover-photo" src="img/' + getNodeConfig(seq).photo + '"/>';
                var desc = getNodeConfig(seq).description;
                var status = $(this).attr("class").split(" ")[1].split("-")[0];
                if (status == "final" || !platformData.sequential) {
                    return photo + desc;
                } else {
                    return photo + desc + '<br/><div class="popover-content-block ' + status + '-popover-content">' + status.toUpperCase() + '</div>';
                }
            }
        });
    if(str=="click1")
        storyNodes.on('click', function () {
            $('[data-toggle="popover"]').popover('hide');
            var seq = getSequence(this);
            nodeId=seq;
            if (checkNodeAvailability(seq)) {
                showStoryZone(seq);
                $('#story-zone-close').on('click', function () {
                    var effect = 'slide';
                    var options = { direction:"down" };
                    var duration = 500;
                    $("#story-zone").toggle(effect, options, duration);

                    //$("#story-zone").effect("bounce", { times: 1 }, "2000").fadeOut();
                });
            }

        });

    if(str=="click2")

        $(".complete-node").unbind('click').on('click', function () {
            ShowDialog();
        })
    if(str=="click3"){

        $(".click_inactive").unbind('click').on('click', function () {
            ShowDialog1();
            //alert('you are not eligible for this game');
        });
    }
}

/* Show Story Zone */

function showStoryZone(sequence) {
    var thisNode = getNodeData(sequence);
    var thisNodeConfig = getNodeConfig(sequence);
    var $storyZone = $('#story-zone');
    $storyZone.empty();

    $('<a id="story-zone-close" href="#"><img src="img/close.png"/></a>').appendTo($storyZone);
    var $deck, $game, $video,$backpack,$video;
    var $d= "";
    if (platformData.formal) {

        var $zonePhoto = $('<img src="img/' + thisNodeConfig.photo + '" class="story-zone-photo"/>').appendTo($storyZone);
        var $zoneTale = $('<div class="story-zone-tale" id="zone-tale-' + sequence + '"><span>' + thisNode.description + '</span></div>').appendTo($storyZone);

        var $buttonBank = $('<div id="button-bank"></div>').appendTo($storyZone);

        for (i in thisNode.games) {
            var gameStatus = "";
            $game = $('<a href="#" class="zone-game zone-button ' + gameStatus + '" id="game-' + i + '-' + thisNode.games[i] + '">' + getGame(thisNode.games[i]).title + '</a>').appendTo($buttonBank);
            //$backpack = $('<a onclick="getbackpack(thisNode.games[i]).title)" class="zone-game zone-button " id="game-backpack' + i + '-' + thisNode.games[i] + '">' + getGame(thisNode.games[i]).backpack + '</a>').appendTo($buttonBank);
        }
        for (i in thisNode.backpack) {
            var backpackid=backpack[thisNode.backpack[i]].file;
            //$backpack = $('<div id="backpack_anchor" onclick="getbackpack(i)"><a href="#" class="zone-button ' + gameStatus + '" id="backpack-' + i + '-' + backpack[i].title + '">' + backpack[thisNode.backpack[i]].title + '</a></div>').appendTo($buttonBank);
            $backpack = $('<div id="backpack_anchor" onclick="getbackpack('+thisNode.backpack[i]+')"><a href="#" class="zone-button ' + gameStatus + '" id="backpack-' + i + '-' + thisNode.games[i] + '">' + backpack[thisNode.backpack[i]].title + '</a></div>').appendTo($buttonBank);
        }
        for (i in thisNode.videos) {
            $video = $('<div id="video-anchor"><a href="#" class="zone-button  video-zone"  id="'+ thisNode.videos[i]+'">' + videos[thisNode.videos[i]].title +'</a></div>').appendTo($buttonBank);
        }
        


        bindZoneSections("left");
    } else {
        for (i in thisNode.decks) {
            $deck = $('<div class="zone-deck zone-section" id="deck-' + i + '-' + thisNode.decks[i] + '"></div>').appendTo($storyZone);
            $deck.append('<img src="img/' + storyConfig.zone.zoneIcons[Math.floor(Math.random() * storyConfig.zone.zoneIcons.length)] + '" />')
        }
        for (i in thisNode.games) {
            $game = $('<div class="zone-game zone-section" id="game-' + i + '-' + thisNode.games[i] + '"></div>').appendTo($storyZone);
            $game.append('<img src="img/' + storyConfig.zone.zoneIcons[Math.floor(Math.random() * storyConfig.zone.zoneIcons.length)] + '" />')
        }
        bindZoneSections("left");
        randomScatter('.zone-section', '#story-zone');
    }
    var effect = 'slide';
    var options = { direction:"down" };
    var duration = 500;
    setTimeout(function() {
        $storyZone.toggle(effect, options, duration);
    }, 300);
}

function bindZoneSections(direction) {
    var zoneDecks = $('.zone-deck');
    var zoneGames = $('.zone-game');
    var zoneVideos = $('.zone-video');
    zoneDecks.popover({
        placement: direction,
        trigger: "hover",
        html: true,
        title: function () {
//            return getDeck($(this).attr("id").split("-")[2]).title;
        },
        content: function () {
            var deckId = $(this).attr("id").split("-")[2];
            var desc = getDeck(deckId).html;
            return desc;
        }
    });
    zoneGames.popover({
        placement: direction,
        trigger: "hover",
        html: true,
        title: function () {
        },
        content: function () {
            var gameId = $(this).attr("id").split("-")[2];
            var desc = getGame(gameId).html;
//            var status = checkGame(deckId) ? "complete" : "incomplete";
            return desc;
//            return desc + '<br/><div class="popover-content-block ' + status + '-popover-content">' + status.toUpperCase() + '</div>';
        }
    });

    zoneDecks.on('click', function () {
        showDeck($(this).attr("id").split("-")[2]);
    });
    zoneGames.on('click', function () {
        console.log ("nodeId: " + nodeId);
        showGame($(this).attr("id").split("-")[2]);
        setTimeout(function () {
            var frm = $('.projector iFrame')[0].contentWindow;

            frm.setNodeId(nodeId);
            
        }, 2500);
    });
    zoneVideos.on('click', function () {
        showVideo($(this).attr("id").split("-")[2]);
    });

    $('.video-zone').unbind('click').on('click',function (){
        $('#video_table').fadeIn('slow');
        $('#video_table').find('#player1').attr('src',videos[$(this).attr('id')].file);
        setTimeout(function(){
            $('#player1').mediaelementplayer({
                    success: function(player, node) {
                        player.addEventListener('ended', function(e){
                        });
                    }
            });
        },500)
    });
}


/* Get Sequence Number of node where event happens */

function getSequence(obj) {
    return parseInt($(obj).attr("id").split("-")[2]);
}

/* Get Configuration for a given Node  */

function getNodeConfig(sequence) {
    return jQuery.grep(storyConfig.nodes, function (a) {
        return ( a.sequence == sequence );
    })[0];
}

/* Get Author Customizations (description, decks and games) for a given Node  */

function getNodeData(sequence) {
    return jQuery.grep(platformData.nodes, function (a) {
        return ( a.sequence == sequence );
    })[0];
}

/* Check if a particular node has decks and games assigned to it in the Author Customization */

function checkNodeInclusion(sequence) {
    var obj = jQuery.grep(platformData.nodes, function (a) {
        return ( a.sequence == sequence );
    })[0];
    return (obj != undefined);
}

/* Check if a particular Node has been completed */

function checkNodeCompletion(sequence) {
    var thisNode = getNodeData(sequence);
    var requiredDecks = thisNode.decks;
    var nodeStatus = true;
    for (deck in requiredDecks) {
        if (!checkDeck(requiredDecks[deck])) nodeStatus = false;
    }
    var requiredGames = thisNode.games;
    for (game in requiredGames) {
        if (!checkGame(requiredGames[game])) nodeStatus = false;
    }
    return nodeStatus;
}

function checkNodeAvailability(sequence) {
    var sequence_array = [];
    for (i in platformData.nodes) {
        sequence_array.push(parseInt(platformData.nodes[i].sequence));
    }
    sequence_array.sort();
    return (sequence == 1 || !platformData.sequential) ? true : checkNodeCompletion(sequence_array[sequence_array.indexOf(sequence) - 1]);
}

/* Get Deck by Id */

function getDeck(id) {
    return jQuery.grep(decks, function (a) {
        return ( a.id == id );
    })[0];
}
function getGame(id) {
    return jQuery.grep(games, function (a) {
        return ( a.id == id );
    })[0];
}
function getbackpack(id) {
    $("#back_pack_img").trigger('click');

    $(".back-pack-icon").eq(id).trigger('click');
}
function getVideo(id) {
    return jQuery.grep(videos, function (a) {
        return ( a.id == id );
    })[0];
}

function checkDeck(id) {close
    var userDataDeck = jQuery.grep(userdata.decks, function (a) {
        return ( a.deckId == id );
    })[0];
    if (userDataDeck.complete) return true;
}

function checkGame(id) {
    var userDataGame = jQuery.grep(userdata.games, function (a) {
        return ( a.gameId == id );
    })[0];
    if (userDataGame.complete) return true;
}

function randomScatter(objects, plane) {
    var planeWidth = $(plane).width() * 0.6;
    var planeHeight = $(plane).height();
    var objectCount = $(objects).length;
    var hStep = parseInt(planeWidth / objectCount);
    $.each($(objects), function (index, elm) {
        $(elm).css({
            left: Math.floor(index * hStep + 0.33 * planeWidth),
            top: Math.floor(Math.random() * 0.4 * planeHeight) + 0.3 * planeHeight
        });
    });
}

function showDeck(deckId) {
    var thisDeck = getDeck(deckId);
    var $storyZone = $('#story-zone');

    $storyZone.append('<div class="projector-title projection">' + thisDeck.title + '<img src="img/fullscreen.png" class="fullscreener pull-right" title="Go FullScreen"/></div>');
    $storyZone.append('<div class="projector-nav projection"></div>');

    var $projector = $('<div class="projector projection"></div>').appendTo($storyZone);
    $('#story-zone-close').unbind().on('click', function () {

        $('.projection').remove();
        $('#story-nameplate').fadeIn();
        $(this).on('click', function () {
            $("#story-zone").fadeOut();
        });
    });
    for (var j = 1; j < thisDeck.slides + 1; j++) {
        $projector.append('<div><img src="img/decks/' + deckId + '/Slide' + j + '.JPG"/></div>')
    }
    $projector.slick({
        autoplay: false,
        arrows: true,
        infinite: false,
        appendArrows: $('.projector-nav'),
        prevArrow: '<button type="button" class="btn btn-warning btn-lg" style="color: black">Previous</button>',
        nextArrow: '<button type="button" class="btn btn-warning btn-lg pull-right" style="color: black">Next</button>'
    });

    $('.fullscreener').click(function () {
        $('#story-wrapper').fadeOut();
        $('#full-wrapper').slideDown(function () {
            var $fullProjector = $('<div class="fullprojector fullprojection"></div>').appendTo($(this));
            var $fullCloser = $('<div class="fullcloser fullprojection"><button type="button" class="btn btn-danger btn-lg" style="color: black"> Close </button></div>').appendTo($(this));

            for (var j = 1; j < thisDeck.slides + 1; j++) {
                $fullProjector.append('<div><img src="img/decks/' + deckId + '/Slide' + j + '.JPG"/></div>')
            }
            $fullProjector.slick({
                autoplay: false,
                arrows: true,
                infinite: false,
                prevArrow: '<button type="button" class="btn btn-warning btn-lg" style="color: black"> Previous </button>',
                nextArrow: '<button type="button" class="btn btn-warning btn-lg pull-right" style="color: black"> Next </button>'
            });

            $fullCloser.on('click', function () {
                $('#full-wrapper').fadeOut();
                $('#story-wrapper').fadeIn();
                $('.fullprojection').remove();
            })

        });
    })

}

function HideDialog(){
    $("#overlay").hide();
    $("#dialog").fadeOut(300);
}
function HideDialog1(){
    $("#overlay").hide();
    $("#dialog1").fadeOut(300);
}
$("#btnClose").click(function (e){
    HideDialog();
    e.preventDefault();
});
$("#btnClose1").click(function (e){
    HideDialog1();
    e.preventDefault();
});
$("#btnSubmit").click(function (e){
    HideDialog();

// TODO:- Need to uncomment this later
    // scormSetValue("cmi.comments", " , ");
    // scormSetValue("cmi.objectives.0.id", 0);
	// a.LMSSetValue("cmi.core.score.raw", 0);
    // a.LMSCommit("");
	// a.LMSFinish("");
// TODO:- Need to uncomment this later    
    window.location.reload();
    e.preventDefault();
});
function ShowDialog(modal){
    $("#overlay").show();
    $("#dialog").fadeIn(300);
    if (modal)
    {
        $("#overlay").unbind("click");
    }
    else
    {
        $("#overlay").click(function (e)
        {
            HideDialog();
        });
    }
}
function ShowDialog1(modal){
    $("#overlay").show();
    $("#dialog1").fadeIn(300);
    if (modal)
    {
        $("#overlay").unbind("click");
    }
    else
    {
        $("#overlay").click(function (e)
        {
            HideDialog();
        });
    }
}


function showGame(gameId) {
    var thisGame = getGame(gameId);
    var $storyZone = $('#story-zone');

    if (thisGame.fullscreen) {
        $('#story-wrapper').fadeOut();
        $('#full-wrapper').slideDown(function () {
            var $fullProjector = $('<div class="fullprojector fullprojection"></div>').appendTo($(this));
            $fullProjector.append(' <iframe style:"border:none" src="games/' + thisGame.name + '/index.html" width="1080px" height="640px" ></iframe>')

            var $fullCloser = $('<div class="fullcloser fullprojection"><button type="button" class="btn btn-danger btn-lg" style="color: black"> Close </button></div>').appendTo($(this));
            $fullCloser.on('click', function () {
                $('#full-wrapper').fadeOut();
                $('#story-wrapper').fadeIn();
                $('.fullprojection').remove();
            })
        });
    }
    else {

        var $projector = $('<div class="projector projection" style="top:48px"></div>').appendTo($storyZone);
        $('#story-zone-close').unbind('click').on('click', function () {
//            if($('.projector iFrame').length>0) {
//            }

            $('.projection').remove();
            $('#story-nameplate').fadeIn();
            $(this).on('click', function () {
                $(this).unbind('click');
                $("#story-zone").fadeOut();
            });
        });
        $projector.append(' <iframe style="border:none"; src="games/' + thisGame.name + '/index.html" width="640" height="480"></iframe>')
    }




}

function showVideo(videoId) {
    var thisVideo = getVideo(videoId);
    var $storyZone = $('#story-zone');
    $storyZone.append('<div class="projector-title projection">' + thisVideo.title + '<img src="img/fullscreen.png" class="fullscreener pull-right" title="Go FullScreen"/></div>');
    var $projector = $('<div class="projector projection"></div>').appendTo($storyZone);
    $('#story-zone-close').unbind().on('click', function () {
        $('.projection').remove();
        $('#story-nameplate').fadeIn();
        $(this).on('click', function () {
            $("#story-zone").fadeOut();
        });
    });
    $projector.append('<video id="bgvid"><source src="' + thisVideo.file + '" poster="img/poster.jpg" type="video/mp4"></video><div id="buttonbar" class="video-nav projection"><button id="story-video-restart" class="btn btn-warning btn-lg" onclick="restart();">Restart</button><button id="story-video-play" class="btn btn-danger btn-lg pull-right" onclick="vidplay()">Play</button></div>');
    $('.fullscreener').click(function () {
        var video = document.getElementById("bgvid");
        video.pause();
        $('#story-wrapper').fadeOut();
        $('#full-wrapper').slideDown(function () {
            var $fullProjector = $('<div class="fullprojector fullprojection"></div>').appendTo($(this));
            var $fullCloser = $('<div class="fullcloser fullprojection"><button type="button" class="btn btn-danger btn-lg" style="color: black"> Close </button></div>').appendTo($(this));

            $fullProjector.append('<video id="bgvidFull"><source src="' + thisVideo.file + '" type="video/mp4"></video><div id="buttonbar" class="video-nav projection"><button id="story-video-restart-full" class="btn btn-warning btn-lg" onclick="fullrestart();">Restart</button><button id="story-video-play-full" class="btn btn-danger btn-lg pull-right" onclick="fullvidplay()">Play</button></div>');

            $fullCloser.on('click', function () {
                $('#full-wrapper').fadeOut();
                $('#story-wrapper').fadeIn();
                $('.fullprojection').remove();
            })

        });
    })
}

function vidplay() {
    var video = document.getElementById("bgvid");
    var button = document.getElementById("story-video-play");
    if (video.paused) {
        video.play();
        button.textContent = "Pause";
    } else {
        video.pause();
        button.textContent = "Play";
    }
}

function restart() {
    var video = document.getElementById("bgvid");
    video.currentTime = 0;
}

function fullvidplay() {
    var video = document.getElementById("bgvidFull");
    var button = document.getElementById("story-video-play-full");
    if (video.paused) {
        video.play();
        button.textContent = "Pause";
    } else {
        video.pause();
        button.textContent = "Play";
    }
}

function fullrestart() {
    var video = document.getElementById("bgvidFull");
    video.currentTime = 0;
}

function setNodeCompleted(n){
    scormSetValue("cmi.objectives.0.id", n);
    scormCommit();
}

function changeNodeState(){

	if($("#arrow_pointer").length>0)
		$("#arrow_pointer").remove();

	for(var i=1;i<=currentNode;i++){
        var nodeData = storyConfig.nodes[i-1];
        $("#story-node-"+ i +" img").attr("src",'img/'+ nodeData.icon_complete);
        $("#story-node-"+ i).removeClass( "click_inactive")
        $("#story-node-"+ i).removeClass( "incomplete-node this-node").addClass("complete-node");
        if(i<6) {
            var curnode = storyConfig.nodes[i];
            $("#story-node-" + (i + 1) + " img").attr("src", 'img/' + curnode.icon_active);
            $("#story-node-"+ (i + 1)).removeClass( "click_inactive")
            $("#story-node-" + (i + 1)).removeClass("incomplete-node click_inactive").addClass("click-active this-node");
        }
    }

    if(currentNode<6)
        currentNode++;

    if(currentNode<=6) {
        $(".story-node").unbind('click')
        $("#score_node_name" ).html(storyConfig.nodes[currentNode-1].name);
    }

	var pos = $(".this-node").position();
	if(typeof pos!=="undefined") {
		$("#story-wrapper").append("<img src='img/arrow.gif' id='arrow_pointer' />");
		$("#arrow_pointer").css({
			top: pos.top-110,
			left: pos.left-25,
			position: "absolute"
		})
	}

	if(currentNode>=6 || getCompletionStatus()==="completed") {
        $("#score_node_name" ).html(storyConfig.nodes[currentNode-1].name);
        $(".story-node").unbind('click');
        bindToNodes("click2", "completed-node");
    }


    bindToNodes("click1", "click-active");
    bindToNodes("click2", "complete-node");
    bindToNodes("click3", "click-inactive this-node");

}

function gameTimer(n){
    if(n=="start"){
        e=setInterval(function(){
            time++
        }, 1000);
    }
    else{
        clearInterval(e);
        return time;
    }
}


function appendScore(gamescore){

    score+=gamescore*100;
    $("#score_node").html(score + " / 100");
    console.log(gamescore);

// TODO:- Need to uncomment this later
    // a.LMSSetValue("cmi.core.score.raw", score);
    // a.LMSCommit("");
// TODO:- Need to uncomment this later    
}

function appendTime(gametime){
    time+=gametime;



    var tmpTime = time;
    var hh = Math.floor(time / 3600);
    tmpTime -= hh * 3600;
    var mm = Math.floor(time / 60);
    tmpTime -= mm * 60;
    var ss = tmpTime;

    if (mm<10) mm = "0" + mm;
    if (ss<10) ss = "0" + ss;

    $("#score_node_time").html(mm +":" + ss);
    scormSetValue("cmi.comments", time+",");
    scormCommit();
}

function modale_last()
{
    $(".modal-main").empty();
    $("body").css("backgroundColor", "black");
    $("#story-wrapper").css({opacity: 0.3, filter: "alpha(opacity=30)"});
    $(".modal-main").fadeIn();
    var  d = new Date();
    d = d.toLocaleDateString();
    $(".modal-main").empty().append("<img src='img/final.jpg' />");
	$(".modal-main").append("<div id='left-firework'><img src='img/left-firework.gif' /></div><div id='right-firework'><img src='img/right-firework.gif' /></div>");

    setTimeout(function() {
        $(".modal-main").fadeOut(500);

        setTimeout(function() {
            $(".modal-main").empty();
            $(".modal-main").append("<img src='img/acknowledgement.jpg'/>");
            $(".modal-main").append("<div id='ack-btn'></div>");
            $(".modal-main").append("<span id='ack-date'>" + d + "</span>");

            $("#ack-btn").unbind('click').on('click', function() {
                $("#story-wrapper").css({opacity: 1, filter: "alpha(opacity=100)"});
                $('.modal-main').fadeOut(500);
                $("#dialog2").fadeIn();
                $("#dialog2 #btnClose").unbind('click').on('click', function(){
                    $("#dialog2").fadeOut();
                })
                // TODO:- Need to uncomment this later
               	// a.LMSSetValue("cmi.core.lesson_status", "completed");
                // a.LMSCommit("");
				// a.LMSFinish("");
                // TODO:- Need to uncomment this later
                //show completion text
               


            });

            $(".modal-main").fadeIn(500);
        },500);
    }, 2500);
}


function openbackPack(n,sub){
    $("#back_pack_img").trigger('click');
    $(".back-pack-icon").eq(n-1).trigger('click');
    $("#right_slide_btn").attr("sub_slide_id",sub);
    $("#right_slide_btn").trigger('click');
}

function playMusic(){
//    setHalfVolume(document.getElementById("retro"));
//    $(".backgroundMusic").trigger('load');
    $(".correctMusic").trigger('load');
    $(".incorrectMusic").trigger('load');
//    $(".backgroundMusic").trigger('play');
};

function setHalfVolume(obj) {
    obj.volume = 0.4;
}

function fullVolume() {
    $('#correct').volume = 0.9;
    $('#incorrect').volume = 0.9;
}
function correctMusic(){
    // TODO: Commented this temporary don't delete it
        // jwplayer("correct").setup({
        // sources: [{
        //   file: "audio/correct.mp3"
        // }],
        // autostart:true,
        //       width: 0,
        //       height: 0

        //   });
    // TODO: Commented this temporary don't delete it

};
function inCorrectMusic(){
    // TODO: Commented this temporary don't delete it
        // jwplayer("incorrect").setup({
        // sources: [{
        //   file: "audio/incorrect.mp3"
        // }],
        // autostart:true,
        //       width: 0,
        //       height: 0

        //   });
    // TODO: Commented this temporary don't delete it    

};

function stopMusic(str){
    if(str=='correct'){
        // $("#correct").trigger('pause');
        // $("#correct").prop("currentTime", 0);
    }
    if(str=='incorrect'){
        // $("#incorrect").trigger('pause');
        // $("#incorrect").prop("currentTime", 0);
    }

}
