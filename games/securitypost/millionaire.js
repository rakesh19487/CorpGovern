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

jQuery.fn.flowerpop = function(duration,complete) {
    $(this).css({height: 0, width: 0});
    $(this).center(true);
    $(this).animate({
        height:"100%",
        width:"100%"
    },
    {
        duration: duration,
        complete: complete,
        step: function() {
            $(this).center(true);
        }
    });

    return this;
};

jQuery.fn.floatfromtop = function(duration,complete) {
    var top = $(this).css("top");
    $(this).css({top: "-20%", opacity: 0});
    $(this).animate({
            top: top,
            opacity: 1
        },
        {
            duration: duration,
            complete: complete
        });

    return this
};



var node;
var base;
var messagebox;
var qholder;
var ladder;
var lifelinepanel;
var lifelines;
var player;
var time = 0;
var pollSelected = false;
var halfSelected = false;
var changeSelected = false;
var flag=0;
var pointsEarned;
var answered;
var e;
var quesbank=[];
var correctmessage;
var question;
var gcount = 1;
var correct_option;
//var poolcount= 0,fiftycount= 0,changecount=0;;

$(function () {
    window.ondragstart = function() {return false}
    initVariables();
    $("body").keydown(function(e){
        var keycode =  e.keyCode ? e.keyCode : e.which;

        if(keycode == 8)
            e.preventDefault();

        if(keycode == 46) 
            e.preventDefault();

    });
});

function initVariables() {
    $(".environment").remove();
    base = new Environment("base");

    messagebox = new Environment("messagebox");
    qholder = new Environment("qholder")
    ladder = new Environment("ladder");
    lifelinepanel = new Environment("lifelinepanel");
    lifelines = new Environment("lifelines");
    player = new Entity("player");
    correctmessage = new Environment("correctmessage");

    initTheme();
}

function initTheme() {
    loadConfig(base);

    $("#help").find('img').attr('src', getImg("kbc-button-know-more"));
    loadConfig(qholder);
    initQuiz();
    $("#knowmore").find('img').attr('src', getImg("kbc-button-know-more"));
    loadConfig(ladder);
    loadConfig(player);

    loadConfig(lifelinepanel);
    loadConfig(lifelines);

    loadConfig(messagebox);
    loadConfig(correctmessage);

    runGlobalObservers();


//    player.setState('1');
    player.location(ladder.ladder1);
    var lives = new Currency("lives");
    player.createWallet(lives, 0, 1, 1);
    initGame();


}

function runGlobalObservers() {

    $("#lifeline1img").unbind('mouseover').on('mouseover', function() {
        //if(poolcount>0){

        //}
        lifelines.text.setState('lifeline1');
        //$(this).find("img").attr('src', getImg("pollover"));
    });
    //$("#lifeline1img").unbind('mouseout').on('mouseout', function() {
    //    $(this).find('img').attr('src', getImg("kbc-lifeline1-img"))
    //});
    //$("#lifeline1img").mouseover(function() {
    //
    //    //jQuery('#lifeline1img .default').css("background-image", "url(../../img/pollhover.png)");
    //
    //});

    $("#lifeline2img").mouseover(function() {


        lifelines.text.setState('lifeline2');
        //$(this).find("img").attr('src', getImg("50over"));
    });
    //$("#lifeline2img").unbind('mouseout').on('mouseout', function() {
    //    $(this).find('img').attr('src', getImg("kbc-lifeline2-img"))
    //});

    $("#lifeline3img").mouseover(function() {

        lifelines.text.setState('lifeline3');
        //$(this).find("img").attr('src', getImg("changeover"));
    });

    //$("#lifeline3img").unbind('mouseout').on('mouseout', function() {
    //    $(this).find('img').attr('src', getImg("kbc-lifeline3-img"))
    //});
    $("#lifelines .location").mouseout(function() {
        lifelines.text.setState('default');
    });

    $("#help").unbind('click').on('click', function(e) {
        initHowto(config.howtoData);
    });

}

function initGame() {
    if(!pollSelected)
        pollSelected = false;
    if(!halfSelected)
        halfSelected = false;
    if(!changeSelected)
        changeSelected = false;
    pointsEarned = 0;
    answered = false;
    gameOn = true;
    showStartPage();
	quesbank = [];
    if(flag===0) {
        quesbank=Question.getAllByWeight(1, 0);
        shuffle(quesbank);
    }
    else {
        for(var i=flag; i<5; i++) {
            if(i==flag)
                quesbank.push(Question.getBySubCat(1, question.category));
            else
                quesbank.unshift(Question.getByWeightExSubcat(1,question.category));
        }
    }
}

function showStartPage() {
    messagebox.setState('instructions');

    showInstructions();
    $("#startgame").mouseover(function() {
        $(this).find('img').attr('src', getImg("kbc-button-start-hover"));
    });
    $("#startgame").mouseout(function() {
        $(this).find('img').attr('src', getImg("kbc-button-start"));
    });

    $("#showinst").mouseover(function() {
        $(this).find('img').attr('src', getImg("kbc-button-instruction-hover"));
    });
    $("#showinst").mouseout(function() {
        $(this).find('img').attr('src', getImg("kbc-button-instruction"));
    });

    $("#startgame").unbind('click').on('click', function() {


        messagebox.setState('default');
        $("#messagebox").fadeOut();
//        parent.setGameAttempt(parent.currentIntegratedGame,parent.currentUid);
        playGame();
    });

//    $("#showinst").unbind('click').on('click', function() {
//        messagebox.setState('instructions');
//
//        showInstructions();
//    });

}

function showInstructions() {
    messagebox.setState('instruction');

    $("#messagebox").show();

    $("#startgame-inst").unbind('mouseover').on('mouseover', function() {
        $(this).find('img').attr('src', getImg("kbc-button-start-hover"));
    });
    $("#startgame-inst").unbind('mouseout').on('mouseout', function() {
        $(this).find('img').attr('src', getImg("kbc-button-start"))
    });
    $("#startgame-inst").unbind('click').on('click', function() {
        $( "#kbc-back" ).attr( "src", getImg("kbc-background1"));
        messagebox.setState('default');
        $("#messagebox").fadeOut();
        gameTimer('start');
        playGame();
    });
}

function answerHover() {
    $(".answer-block").mouseover(function() {
        if(answered == false)
            //$(this).css('background-color',"red");
            $(this).find('img').attr('src', getImg("kbc-answer-hover-back"));
    }
    );
    $(".answer-block").mouseout(function() {
        if(answered == false)
            $(this).find('img').attr('src', getImg("kbc-answer-back"));
            //$(".this").attr('src', getImg("kbc-answer-back"));
            //$(this).css('background-color',"#6EA8CC");
    });

    $("#knowmore").mouseover(function() {
        $("#knowmore").find('img').attr('src', getImg("kbc-button-know-more-hover"));
        $("#knowmore").css({color: "white"});
    });
    $("#knowmore").mouseout(function() {
        $("#knowmore").find('img').attr('src', getImg("kbc-button-know-more"));
        $("#knowmore").css({color: "#3d2510"});
    });

    $("#help").mouseover(function() {
        $("#help").find('img').attr('src', getImg("kbc-button-know-more-hover"));
        $("#help").css({color: "white"});
    });
    $("#help").mouseout(function() {
        $("#help").find('img').attr('src', getImg("kbc-button-know-more"));
        $("#help").css({color: "#3d2510"});
    });
}

function changecolor(){

}
function playGame() {

    $(".answer-block div:last-child").center(true);
    $("#player").find('img').attr('src', getImg("kbc-ladder-current"));
    lifelinepanel.setState('default');
    if(pollSelected)
        lifelines.lifeline1img.setState("complete");
    if(halfSelected)
        lifelines.lifeline2img.setState("complete");
    if(changeSelected)
        lifelines.lifeline3img.setState("complete");

    //$("#lifelines .location").css({'pointer-events': "auto", 'cursor': "pointer"});
    question=quesbank.pop();
	var answered = question.answered;
	while(answered!==false) {
		quesbank.unshift(question);
		question=quesbank.pop();
		answered = question.answered;
	}
	
	for(var i=0;i<question.options.length;i++){
		if(question.options[i].correct=="true"){
			correct_option=i;
		}
	}


        var optionBlockAnimate = function(i) {
            setTimeout(function() {
                $("#answer-block-" + i).fadeIn("slow");
            },i*200)
        }
        $('#quiz').ready(function () {
            Question.showQuizPanel(quiz, question);
            $("#options").append('<div class="correct-word"></div>');
            answered = false;
            var queno="Question No:"+gcount;
            $("#options").append('<div class="question-text">'+queno+'</div>');
            $(".answer-block-back").attr('src', getImg("kbc-answer-back"));
            //$(".answer-block-back").css('background-color', "#6EA8CC");
            $(".answer-block").hide();
            $("#question").hide();
            answerHover();
            $("#question").floatfromtop(1500).show();
        }).fadeIn(400,function() {
            count = 0;

            setTimeout(function() {
                for(var i =count; i<4; i++)
                    optionBlockAnimate(i);
            },2000)
            });


    $(question).unbind('answered').on('answered', function (e, data) {

        flag++;
        if(answered == false) {
            answered = true;
            if(gcount==8)
                gameOn = false;
            if (data.correct == "true")
            {
				window.parent.correctMusic();
                gcount++;
				questionbank.questions[question._id].answered = true;
				Question.all[question._id].answered = true;
                correct_ansanimation($this);
                //$("#correctmessage").fadeIn(500).delay(2000).fadeOut(500);
                //$(data.$this).find('img').attr('src', getImg("kbc-answer-correct-back"));
				questionbank.questions[question._id].answered = true;
                setTimeout(function() {
                    player.location(ladder.nextLocation(player.location()));
                    ladder[ladder.prevLocation(player.location()).name].setState('complete');
                    if (gameOn)
                        playGame();
                    else {
                        endGame("Good going! You may now proceed to the next checkpoint!", question);
                        
                        window.parent.setNodeCompleted(node);
                        var timr=gameTimer('stop');
                        window.parent.appendScore(sendScore());
                        window.parent.appendTime(sendTime());
                        window.parent.changeNodeState();
                        window.parent.scormCommit();
                        window.parent.modale_last(); 
                    }
                }, 500)

            }
            else {
				window.parent.inCorrectMusic();
                $(".question-text").empty();
                $("#options").append('<div class="wrong-text" style="text-align:center;">Incorrect!</div>');
                //$("#answer-block-"+correct_option).find('img').attr('src', getImg("correct"));
                //$("#options").append('<div class="wrong-text">'+"InCorrect!! Answer is"+'</br>'+correct_option.name+'</div>');

                wrong_ansanimation($this);
                for(i in question.options)
                    if(question.options[i].correct==="true")
                        $("#answer-block-"+i).find("img").attr('src', getImg("correct"));
                setTimeout(function() {
                    player.lives.is(-1);
                }, 500);
                flag = gcount;
            }
        }
    });

    $(player.lives).unbind('min').on('min', function () {
        endGame("Nah! That was incorrect! You aren't ready yet.Refer to the backpack and try again!", question);
        var timr=gameTimer('stop');
    });


    //---------------lifeline function----------------------


    $("#lifeline1img").unbind('click').on('click', function () {
        $("#lifelinepanel").css('z-index',3);
        if(pollSelected == false) {
            $("#lifelinepanel").fadeIn();
            lifelinepanel.setState('lifeline1');
            $("#close").hide();

            $("#ok").unbind('click').on('click', function() {
                //$("#lifelinepanel").css('z-index',-1);
                pollSelected = true;
                $("#poll-text").hide();
                $("#poll-chart").show();
                $(".button").hide();
                $("#close").show();
                lifelines.lifeline1img.setState('complete');
                $("#lifelines #lifeline1img").css({'pointer-events': "none", 'cursor': "default"});
                usePoll(question);
            });

            $("#cancel").unbind('click').on('click', function() {
                $("#lifelinepanel").css('z-index',-1);
                lifelinepanel.setState('default');
            });

            $("#close").unbind('click').on('click', function() {
                lifelinepanel.setState('default');
                $("#lifelinepanel").hide();
                $("#lifelines .location").css({'pointer-events': "auto", 'cursor': "pointer"});
            });
        }
    });

    $("#lifeline2img").unbind('click').on('click', function () {
        $("#lifelinepanel").css('z-index',3);
        //$(this).find("img").attr('src', getImg("50click"));
        if(halfSelected == false) {
            $("#lifelinepanel").fadeIn();
            lifelinepanel.setState('lifeline2');

            $("#ok").unbind('click').on('click', function() {
                $("#lifelinepanel").css('z-index',-1);
                halfSelected = true;
                useHalf(question);
                lifelines.lifeline2img.setState('complete');
               $("#lifelines #lifeline2img").css({'pointer-events': "none", 'cursor': "default"});
                lifelinepanel.setState('default');
            });

            $("#cancel").unbind('click').on('click', function() {
                $("#lifelinepanel").css('z-index',-1);
                lifelinepanel.setState('default');
            });
        }
    });

    $("#lifeline3img").unbind('click').on('click', function () {
        $("#lifelinepanel").css('z-index',3);
        //$(this).find("img").attr('src', getImg("changeclick"));
        if(changeSelected == false) {
            $("#lifelinepanel").fadeIn();
            lifelinepanel.setState('lifeline3');

            $("#ok").unbind('click').on('click', function() {
                $("#lifelinepanel").css('z-index',-1);
                changeSelected = true;
                playGame();
                lifelines.lifeline3img.setState('complete');
                $("#lifelines #lifeline3img").css({'pointer-events': "none", 'cursor': "default"});
                lifelinepanel.setState('default');
            });

            $("#cancel").unbind('click').on('click', function() {
                $("#lifelinepanel").css('z-index',-1);
                lifelinepanel.setState('default');
            });
        }
    });
}

function usePoll(question) {
    var sum = 0;
    var opt;
    var pollData = [];
    if(halfSelected==2){
        opt=2;
    }
    else{
        opt=4;
    }
    for(var i = 0; i < opt; i++) {
        if(i != opt-1) {

            if(question.options[i].correct == "true") {
                var random = randBetween(30, 100);
                if((sum+random) > 100)
                    random -= ((sum+random)-100);
                sum += random;
                pollData.push(random);
            } else {
                var random = randBetween(0, 25);
                if((sum+random) > 100)
                    random -= ((sum+random)-100);
                sum += random;
                pollData.push(random);
            }
        } else {
            random = (100-sum);
            pollData.push(random);
        }
    }

    var chartData = [];
    var opts = ['A', 'B', 'C', 'D'];
    chartData.push(['Option', 'Votes', { role: 'style' }]);    
    
    $('.answer-block').each(function() {
        var indx = $(this).index();
        if($(this).css('visibility')==="visible")
            chartData.push([opts[indx], pollData[indx], '#222']);
    });
    
    var data = google.visualization.arrayToDataTable(chartData);

    var options = {
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        legend: { position: "none" },
        hAxis: {
            title: 'Option'
        },
        vAxis: {
            title: 'Votes (%)',
            minValue: 0,
            maxValue: 100
        }
    };

    var chart = new google.visualization.ColumnChart(
        document.getElementById('poll-chart'));

    chart.draw(data, options);
}

function useHalf(question) {
    while(true) {
        var random1 = randBetween(0,100)%4;
        var random2 = randBetween(0,100)%4;
        while(random1 == random2) {
            random2 = randBetween(0,100)%4;
        }

        if((question.options[random1].correct == "false") && (question.options[random2].correct == "false")) {
            $(".answer-block").eq(random1).css({visibility: "hidden"});
            $(".answer-block").eq(random2).css({visibility: "hidden"});
            break;
        }
    }
}

function endGame(message, question) {
    messagebox.setState('endgame');
    if (message == "Good going! You may now proceed to the next checkpoint!") {
        $("#playagain").css("visibility", "hidden");
        $("#backpack").css("visibility", "hidden");
        $("#messagebox").append("<input type='button' value='Continue' class='btn-ok'>");
        $(".btn-ok").css({
            top: "62%",
            left: "59%",
            "background": "url(../../img/active_instructionbuttonsecurity.png)",
            //"background-color": "#6EA8CC",
            width: "30%",
            height: "13%",
            border: "none",
            cursor:"pointer",
            color:"white",
            "font-size":"20px",
            "background-size":"100% 100%",
            "background-repeat":"no-repeat"
        });
        $(".btn-ok").unbind('click').on('click', function () {
            
            window.parent.modale_last();
            setTimeout(function(){
                parent.$("#story-zone-close").trigger('click').trigger('click');
            },1500);
            
        });
    }
    else
        $("#backpack").show().css({display: "table"});

    $("#messagebox").addClass("slide-animation");
    slideend();
    $("#endmessage").html('<span>'+message+'</span>');

    $("#playagain").unbind('mouseover').on('mouseover', function() {
        $(this).find('img').attr('src', getImg("kbc-button-play-again-hover"));
    });
    $("#playagain").unbind('mouseout').on('mouseout', function() {
        $(this).find('img').attr('src', getImg("kbc-button-play-again"))
    });
    //$("#backpack").unbind('mouseout').on('mouseout', function() {
    //    $(this).find('img').attr('src', getImg("kbc-button-play-again"))
    //});
    $("#playagain").unbind('click').on('click', function() {
        messagebox.setState('default');
        initVariables();
        $("#messagebox").hide();
        $("#startgame-inst").trigger('click');
    });
    $("#backpack").unbind('click').on('click', function() {
        window.parent.openbackPack(question.slide, question.subslide);
    });
}

function sendScore(){
    return 0.16;
}

function setNodeId(nodeId){
    node=nodeId;
}

function getNodeId () {
    return node;

}

function sendTime(){
//    parent
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

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
