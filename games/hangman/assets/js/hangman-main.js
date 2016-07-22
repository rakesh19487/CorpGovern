jQuery.fn.center = function(parent) {
    if (parent) {
        parent = this.parent();
    } else {
        parent = window;
    }
    this.css({
        "position": "absolute",
        "zIndex":   2,
        "top": ($(parent).height() - (this.outerHeight() / 2)) + /*$(parent).scrollTop()) +*/ "px",
        "left": ($(parent).width() - (this.outerWidth() / 2)) + /*$(parent).scrollLeft()) +*/ "px"
    });
    return this;
};

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
};

var node = 0, score= 0, time= 0, question;
var launchpad, mainPage,leftPanel, messages, transitions, strcompare="",qcount=0, quesbank = [], flag=0;

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
    mainPage = new Environment("mainPage");
    leftPanel = new Environment("leftPanel");
    rightPanel = new Environment("rightPanel");
    answerPanel = new Environment("answerPanel");
    letterPanel = new Environment("letterPanel");
    messages = new Environment("messages");
	transitions = new Environment("transitions");

    loadConfig(launchpad);
    loadConfig(mainPage);
    loadConfig(leftPanel);
    loadConfig(rightPanel);
    loadConfig(answerPanel);
    loadConfig(letterPanel);
    loadConfig(messages);
	loadConfig(transitions);
    initQuiz();

    leftPanel.statue.setState("0");

    $("img").mousedown(function(){
        return false;
    });

    if(flag==0) {
        quesbank = [];
        quesbank=Question.getAllByWeight(6, 4);
        shuffle(quesbank);
    }

    $("#start").unbind('click').on("click", function() {
        $("#launchpad").fadeOut();
        $("#mainPage").fadeIn();
        paneldisplay();
        playQuiz();
    });
    initletter();
}

function paneldisplay() {
    gameTimer('start');
    $("#leftPanel").show();
    $("#rightPanel").animania("float");
    $("#answerPanel").animania("float");
    $("#letterPanel").animania("float", {float:{direction:"up"}});
    $("#quiz").animania("float");
	setTimeout( function() {
        for(var i=0; i<$(".letter-block").length; i++)
            letterPanel[$(".letter-block").eq(i).attr("id")].setState("default");
    }, 200);
}

function playQuiz() {

    $("#options").remove();
	
    question = quesbank.pop();
	var answered = question.answered;
	while(answered!==false) {
		quesbank.unshift(question);
		question=quesbank.pop();
		answered = question.answered;
	}
	
    var answer=Question.getAnswer(question);
	
    generateAnswerBlock(answer);

	var hint =  answer.toUpperCase().charCodeAt(randBetween(0, answer.length-1));
	
    $("#quiz").fadeIn(500,function(){
		$("#hint").fadeIn().removeClass('no-click');
        $("#hint").unbind("click").on("click",function(){
            $("#letter"+hint).trigger("click");
            $(this).fadeOut().removeClass('no-click');
        });
        Question.showQuizPanel(quiz,question);
    });
	
    $(".letter-block").unbind('click').on('click', function() {
        var charcode = parseInt($(this).attr("id").split('letter')[1]);
        var alphabet = String.fromCharCode(charcode);

        checkAnswer(answer, alphabet, this);
    });

    $(document).unbind('keyup').bind('keyup', function(e) {
        if(e.keyCode>=65 && e.keyCode<=90) {
            $("#letter" + e.keyCode + ".letter-block").trigger('click');
        }
    });
}

function generateAnswerBlock(answer)
{
    strcompare = "";
    $("#answerPanel").empty();

    for(var i=0;i<answer.length;i++)

        if(answer[i] != " ") {
            strcompare+="_";
            $("#answerPanel").append("_");
        }
        else {
            strcompare+=" ";
            $("#answerPanel").append("<br />");
        }
}

function checkAnswer(answer, alphabet, obj) {

    var bool = false;
    var count=0;
    flag++;

    for(var i=0; i<answer.length; i++)
    {
        if(answer.charAt(i) == alphabet.toString() || answer.charAt(i) == alphabet.toString().toLowerCase()) {
            strcompare = setCharAt(strcompare, i, alphabet);
            $("#answerPanel").empty().append(strcompare);
            $(obj).addClass("no-click");
            count++;
            bool = true;
        }
        else {
            $(obj).addClass("no-click");
        }
    }

    if(strcompare.toLowerCase()==answer.toLowerCase()) {
		questionbank.questions[question._id].answered = true;
		Question.all[question._id].answered = true;
		window.parent.correctMusic();
        $("#correctDisplay").fadeIn().delay(500).fadeOut();
        $(document).unbind('keyup');
        setTimeout(function() {
            qcount++;
            $(document).unbind('keyup').bind('keyup', function(e) {
                if(e.keyCode>=65 && e.keyCode<=90) {
                    $("#letter" + e.keyCode + ".letter-block").trigger('click');
                }
            });

            count = parseInt(leftPanel.statue.getState());
            if(count<6) {
                    count--;
                    leftPanel.statue.setState(count+"");
                }
            if(qcount===7) {
                displayMessage("Well done, Traveller! Only the righteous come this far! Go ahead and create history!", 1);
                window.parent.setNodeCompleted(node);
                var timr=gameTimer('stop');
                window.parent.appendScore(sendScore());
                window.parent.appendTime(sendTime());
                window.parent.changeNodeState();
                window.parent.scormCommit();
            }
            else {
                $("#start").trigger('click');
                $(".letter-block").removeClass("no-click less-opacity");
            }
        },2000);
    }

    if(count===0) {
        
        count = parseInt(leftPanel.statue.getState());
        if(count<6) {
            count++;
            leftPanel.statue.setState(count+"");
        }
        else {
			window.parent.inCorrectMusic();
            count++;
            leftPanel.statue.setState(count+"");
            $(document).unbind('keyup');
            setTimeout(function() {
                displayMessage("Aha! You have lost her! Try again to seek her blessings!", 2);
            }, 1500);
            flag=qcount;
        }
    }
    
            
    if(bool)
        letterPanel[$(obj).attr("id")].setState("correct");
    else
        letterPanel[$(obj).attr("id")].setState("incorrect");
}

function displayMessage(str,n) {
    $(document).unbind('keyup');
    $("#messageBox").empty().append("<span id='txtMsg'>" + str + "</span>");

    if(n==1) {
        $("#messageBox").append("<span id='continue'>Continue</span>");
        $("#continue").unbind('click').on('click', function() {
            // TODO:To be uncomment later
            // window.parent.modale_last(); 
            parent.$("#story-zone-close").trigger('click').trigger('click');
        });
        $('#messageBox').append('<img style="left: -35%;height: 40%;width: 50%;top: 19%;" src="../../img/spirit.png">')
    }
    if(n==2) {
        $("#messageBox").append("<span id='try-again' style='margin-left: 33%;'>Try Again</span>");
        $("#try-again").unbind('click').on('click', function() {
            if(flag!=0) {
                quesbank = [];
                for(var i=flag; i<5; i++) {
                    if(i==flag) {
                        quesbank.push(Question.getBySubCat(6, question.category));
                    }
                    else
                        quesbank.unshift(Question.getByWeightExSubcat(6,question.category));
                }
            }
            $("#start").trigger('click');
            $("#messages").fadeOut();
            $(".letter-block").removeClass("no-click");
            for(var i=0; i<$(".letter-block").length; i++) {
                letterPanel[$(".letter-block").eq(i).attr("id")].setState("default");
            }
            leftPanel.statue.setState("0");
        });
        $("#messageBox").append("<span id='backpack' style='display: table;'>Use Backpack</span>");
        $("#backpack").unbind('click').on('click', function() {
            window.parent.openbackPack(question.slide, question.subslide);
        });
//        $("#backpack").trigger('click');
//        window.parent.openbackPack(question.slide, question.subslide);
    }
    $("#messages").addClass("slide-animation");
    slideend();
}

function initletter()
{
    for(var i=0; i<$("#letterPanel div").length; i++) {
        $("#letterPanel div").eq(i).addClass("letter-block");
    }
}

function showTransition(number) {
    
    $(document).unbind('keyup');
	
	if(number==0)
		var str = "Incorrect";
	else if(number==1)
		var str = "Correct";
	else
		var str = "Default";
	
	$("#transitionMessage span").text(str);
	//$("#transitions").fadeIn(500);
	//setTimeout(function() { $("#transitions").fadeOut(500); }, 1500);
	
}

function setCharAt (str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function shuffle(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function sendScore(){
    return 0.20;
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

