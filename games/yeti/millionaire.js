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
                $(this).center(true)
            }
        });

    return this
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
var gcount=1;
var question;
var correct_option;

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
    loading = new Environment("loading");
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
    loadConfig(loading);
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

    player.location(ladder.ladder1);
    var lives = new Currency("lives");
    player.createWallet(lives, 0, 1, 1);
    initGame();
}

function runGlobalObservers() {
    $("#lifeline1img").unbind('mouseover').on('mouseover', function() {
        lifelines.text.setState('lifeline1');
        //$(this).find("img").attr('src', getImg("pollover"));
    });
    $("#lifeline1img").unbind('mouseout').on('mouseout', function() {
        //$(this).find('img').attr('src', getImg("kbc-lifeline1-img"))
    });
    //$("#lifeline1img").mouseover(function() {
    //    lifelines.text.setState('lifeline1');
    //});

    $("#lifeline2img").mouseover(function() {
        //$(this).find("img").attr('src', getImg("50over"));
        lifelines.text.setState('lifeline2');
    });
    $("#lifeline2img").unbind('mouseout').on('mouseout', function() {
        //$(this).find('img').attr('src', getImg("kbc-lifeline2-img"))
    });


    $("#lifeline3img").mouseover(function() {
        lifelines.text.setState('lifeline3');
        //$(this).find("img").attr('src', getImg("changeover"));
    });
    $("#lifeline3img").unbind('mouseout').on('mouseout', function() {
        //$(this).find('img').attr('src', getImg("kbc-lifeline3-img"))
    });
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
	quesbank=[];
    if(flag==0) {
        quesbank=Question.getAllByWeight(1, 0);
        shuffle(quesbank);
    }
    else {
        for(var i=flag; i<13; i++) {
            if(i==flag)
                quesbank.push(Question.getBySubCat(1, question.category));
            else
                quesbank.unshift(Question.getByWeightExSubcat(1,question.category));
        }
    }
}

function showStartPage() {
    $("#loading").fadeIn(1000).delay(100).fadeOut(500);
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
        $( "#kbc-back" ).attr( "src", getImg("kbc-background1"));
        gameTimer('start');
        messagebox.setState('default');
        $("#messagebox").fadeOut();
        playGame();
    });

    $("#showinst").unbind('click').on('click', function() {
        messagebox.setState('instructions');

        showInstructions();
    });

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
            $(this).find('img').attr('src', getImg("kbc-answer-hover-back"));
    });
    $(".answer-block").mouseout(function() {
        if(answered == false)
            $(".answer-block-back").attr('src', getImg("kbc-answer-back"));
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

function playGame() {
    if(pollSelected)
        lifelines.lifeline1img.setState("complete");
    if(halfSelected)
        lifelines.lifeline2img.setState("complete");
    if(changeSelected)
        lifelines.lifeline3img.setState("complete");
    $("#player").find('img').attr('src', getImg("kbc-ladder-current"));
    lifelinepanel.setState('default');
    $("#lifelines .location").css({'pointer-events': "auto", 'cursor': "pointer"});
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
            if(gcount==12)
                gameOn = false;
            if (data.correct == "true") {
				window.parent.correctMusic();
                gcount++;
				questionbank.questions[question._id].answered = true;
				Question.all[question._id].answered = true;
                correct_ansanimation($this);
                $(data.$this).find('img').attr('src', getImg("kbc-answer-correct-back"));
                setTimeout(function() {
                    player.location(ladder.nextLocation(player.location()));
                    ladder[ladder.prevLocation(player.location()).name].setState('complete');
                    if (gameOn)
                        playGame();
                    else {
                        endGame("I am very pleased.You answered all the questions correctly. Now go ahead and create history!", question);
                        window.parent.setNodeCompleted(node);
                        var timr=gameTimer('stop');
                        window.parent.appendScore(sendScore());
                        window.parent.appendTime(sendTime());
                        window.parent.changeNodeState();
                        window.parent.scormCommit();
                    }

                }, 500);


            } else {
				window.parent.inCorrectMusic();
                $(".question-text").empty();
                $("#options").append('<div class="correct-text"><span class="correct-message">Incorrect!</span></div>');
                wrong_ansanimation($this);
				for(i in question.options)
                    if(question.options[i].correct==="true")
                        $("#answer-block-"+i).find("img").attr('src', getImg("correct"));
                setTimeout(function() {
                    player.lives.is(-1);
                }, 500);
                flag=gcount;
            }
        }
    });

    $(player.lives).unbind('min').on('min', function () {
        endGame("You have made the wrong choices! Please refer to the backpack and try again!", question);
        var timr=gameTimer('stop');
    });


    //---------------lifeline function----------------------


    $("#lifeline1img").unbind('click').on('click', function () {
        $("#lifelinepanel").css('z-index',3);
        //$(this).find("img").attr('src', getImg("pollclick"));
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
                $("#lifelines #lifeline1img").css({'pointer-events': "auto", 'cursor': "default"});
                usePoll(question);
            });

            $("#cancel").unbind('click').on('click', function() {
                //$("#lifelinepanel").css('z-index',-1);
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
                halfSelected = true;
                useHalf(question);
                lifelines.lifeline2img.setState('complete');
                $("#lifelines #lifeline2img").css({'pointer-events': "auto", 'cursor': "default"});
                lifelinepanel.setState('default');
                $("#lifelinepanel").css('z-index',-1);
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
                $("#lifelines #lifeline3img").css({'pointer-events': "auto", 'cursor': "default"});
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
    //if (message == "I am very pleased. You did not make the wrong choice even though you needed my help. I am happy to" +
    //" direct now. Go forward!") {
        if (message == "I am very pleased.You answered all the questions correctly. Now go ahead and create history!" ){
            //" direct now. Go forward!") {
        $("#playagain").css("visibility", "hidden");
        $("#backpack").css("visibility", "hidden");
        $("#messagebox").append("<input type='button' value='Continue' class='btn-ok'>");
        $(".btn-ok").css({
            top: "62%",
            left: "59%",
            "background": "url(../../img/active_instructionbutton.png)",
            width: "31%",
            height: "13%",
            border: "none",
            cursor:"pointer",
            color:"white",
            "font-size":"20px",
            "background-size":"100% 100%",
            "background-repeat":"no-repeat",
            "background-size":"100% 100%"

//            font-size:"24px"
        });
        $(".btn-ok").unbind('click').on('click', function () {
            window.parent.modale_last();
            setTimeout(function(){
                parent.$("#story-zone-close").trigger('click').trigger('click');
            },800);
        });
    }
     else
        $("#backpack").show().css({display: "table"});
    $("#messagebox").addClass("slide-animation");
    slideend();
    //$("#messagebox").fadeIn();
    $("#endmessage").html('<span>'+message+'</span>');

    $("#playagain").unbind('mouseover').on('mouseover', function() {
        $(this).find('img').attr('src', getImg("kbc-button-play-again-hover"));
    });

    $("#playagain").unbind('mouseout').on('mouseout', function() {
        $(this).find('img').attr('src', getImg("kbc-button-play-again"))
    });

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

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}