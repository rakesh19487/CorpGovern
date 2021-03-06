var time = 0;
var node;
var e;
var switchobj;
jQuery.fn.center = function(parent) {
    if (parent) {
        parent = this.parent();
    } else {
        parent = window;
    }
    this.css({
        "position": "absolute",
        "zIndex":   2,
        "top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
        "left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
    });
    return this;
};

jQuery.fn.floatfromtop = function(duration,complete) {
    var top = $(this).css("top");
    $(this).css({top: "-20%",opacity: 0, display:"block"});
    $(this).animate({
            top: top,
            opacity: 1,
            display: "block"
        },
        {
            duration: duration,
            complete: complete
        });

    return this;
};

var launchpad, mainPage,leftPanel, switches, opacityState= 1,quesbank=[],count= 0,cagemargin="-304",victoryState,instruction;
var correctmessage;
$(function(){

   initGame();
    $("body").keydown(function(e){
        var keycode =  e.keyCode ? e.keyCode : e.which;

        if(keycode == 8)
            e.preventDefault();

        if(keycode == 46) 
            e.preventDefault();

    });

});
function initGame() {
    launchpad = new Environment("launchpad");
    instruction = new Environment("instruction");
    mainPage = new Environment("mainPage");
    leftPanel = new Environment("leftPanel");
    switches = new Environment("switches");
    victoryState = new Environment("victoryState");
    correctmessage = new Environment("correctmessage");

    loadConfig(launchpad);
    loadConfig(instruction);
    loadConfig(mainPage);
    loadConfig(leftPanel);
    loadConfig(switches);
    loadConfig(victoryState);
    loadConfig(correctmessage);
    initQuiz();
//    $('#instructions').show();

    $("img").mousedown(function(){
        return false;
    });

    $("#start").unbind('click').on("click", function() {
        gameTimer('start');
        $("#launchpad").fadeOut();
        $("#mainPage").fadeIn();
        paneldisplay();
    });
    $("#start").unbind('mouseover').on('mouseover', function() {
//        $(this).find('img').attr('src', 'assets/img/start_buttonhover.png');
        $(this).find('img').attr('src', '../../img/start_buttonhoverhunt.png');
    });
    $("#start").unbind('mouseout').on('mouseout', function() {
        $(this).find('img').attr('src', '../../img/start_buttonhunt.png');
    });

    $("#playagain-caveman").unbind('click').on("click", function() {
        $("#correctmessage").fadeOut();
        $("#start").trigger('click')
        //$("#correctmessage").fadeOut();
        //$("#mainPage").fadeOut();
        //$("#leftPanel").fadeOut();
        //$("#smokes").fadeIn();
        //
        ////$("#statusPanel").fadeOut();
        ////$("#gameDisplay").fadeOut();
        //$("#switches").fadeOut();
        //$("#quiz").fadeOut();
        //$("#launchpad").fadeIn();
    })

//    $("#end_game").unbind('click').on("click", function() {
//        getMessage();
//    });

}

function paneldisplay() {
    $("#leftPanel").show();
    $("#statements").show();
    $("#switches").show();
    $("#statement-area").show();


    quesbank=Question.getAllByWeight(3);
	shuffle(quesbank);
    leftPanel.statuspanel.setState("default");
    leftPanel.smokes.setState("default");
    playQuiz();

}


function playQuiz() {
    $("#cageimg").css({marginTop: cagemargin + "px"});

    $("#switches").removeClass("no-click");
    for(var i=1; i<=4; i++) {
        switches["switch" + i].setState("false");
    }
    
    var dataset1 = [];
    var dataset2 = [];


    var question=quesbank.pop();
	var answered = question.answered;
	if(answered!==false) {
		quesbank.unshift(question);
		question=quesbank.pop();
		answered = question.answered;
	}
    for(i in question.options)
        dataset1.push(question.options[i].correct.toString());

    var optionBlockAnimate = function(i) {
        setTimeout(function() {
            $("#option-block-" + i).fadeIn("slow");
            $("#switch"+(i+1)).fadeIn("slow");
        },i*200);
    };
    
    $('#quiz').ready(function () {

        Question.showQuizPanel(quiz, question);
        $(".option-block").hide();
        $("#switches .location").hide();
        $("#statement-area").hide();
    }).fadeIn(400,function() {
        $("#statement-area").floatfromtop(1500).show();
        setTimeout(function () {
            for (var i = 0; i <4; i++)
                optionBlockAnimate(i);
        }, 2000);
    });

    $(question).on('answered', function(e, data) {
        dataset2 = [];

        for(var i=0; i<switches.locations.length; i++)
            dataset2.push(switches["switch" + (i+1)].getState());

        cagemargin=$("#smokes img").css("marginTop");
        cagemargin=parseInt(cagemargin.split('px')[0]);

        var switchobj = switches["switch" + (data.optionId+1)];
        if(switchobj.getState() == (data.correct).toString()) {
            cagemargin+=43.42;
        }
        else {
        }

        $("#smokes img").animate({marginTop: cagemargin + "px"},{
            duration:500,
            complete:function(){
                $(this).css({marginTop: cagemargin + "px"});
            }
        });
    });


    $("#switches div").unbind('click').on("click",function(){
         switchobj = switches[$(this).attr("id")];
        if(switchobj.getState()=="true")
            switchobj.setState("false");
        else
            switchobj.setState("true");

        var index = $(this).index();
        $("#option-block-" + index).trigger("click");
        $("#cave_submit").trigger('click')
    });

    $("#cave_submit").unbind('click').on("click",function() {
        if(dataset1.join()==dataset2.join())
        {
			questionbank.questions[question._id].answered = true;
			Question.all[question._id].answered = true;
			window.parent.correctMusic();
            $(".correct-status").empty();
            $("#leftPanel").append('<div class="correct-status"><span class="correct-message">Correct!</span></div>');
            //$("#leftPanel").append('<div class="correct-status" style="color:#000000">that correct</div>');
            //$(".correct-word").css('z-index',10);
            $(".correct-status").fadeIn(1000).delay(1000).fadeOut(1000);
            //$("#correctmessage").fadeIn(500).delay(1000).fadeOut(500);
            count++;
            if(count==7) {
                setTimeout(function() {
                    //$("#victoryState").fadeIn();
                    $("#correctmessage").css('z-index',0);
                    $("#victoryState").addClass("slide-animation");
                    slideend();
                    victoryState.setState("default");
                }, 500);
                $("#switches").addClass("no-click");
                window.parent.setNodeCompleted(node);
                var timr=gameTimer('stop');
                window.parent.appendScore(sendScore());
                window.parent.appendTime(sendTime());
                window.parent.changeNodeState();
                window.parent.scormCommit();
            }
            else {
                $(".option-block").fadeOut("slow");
                $("#switches .location").fadeOut("slow");
                setTimeout(playQuiz,600);
            }
        }
        else{
			window.parent.inCorrectMusic();
            var sw=switchobj.name;
            $("#"+sw).find('img').attr('src', '../../img/incorrect_ans_caveman.png');
            wrong_ansanimationcaveman($this);
			for(var j in question.options)
                if(question.options[j].correct==="true")
                    switches["switch"+(parseInt(j)+1)].setState("true");
            $(".correct-status").empty();
            $("#leftPanel").append('<div class="correct-status"><span class="correct-message">Incorrect</span></div>');
            $(".correct-status").fadeIn(1000).delay(1000).fadeOut(1000);
            $("#correctmessage").addClass("slide-animation");
            slideend();
        }
    })
    $("#backpack").unbind('click').on('click', function() {
        console.log(question.slide);
        console.log(question.subslide);
        window.parent.openbackPack(question.slide, question.subslide);
    });

}

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function sendScore(){
    return 0.25;
}

function setNodeId(nodeId){
    node=nodeId;
}

function getNodeId () {
    return node;

}

function sendTime(){
    return time;
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

function getMessage() {
    parent.$("#story-zone-close").trigger('click').trigger('click');
}