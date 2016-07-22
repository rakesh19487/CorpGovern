var quiz;

config.quiz = {
    type: "environment",
    states: [
        {name: "default", representation: ""}
    ],
    locations: [
        {name: "question", states: [
            {name: "default", representation: ""}
        ]},
        {name: "options", states: [
            {name: "default", representation: ""}
        ]},
        {name: "knowmore", states: [
            {name: "default", representation: "<img /><span>Know More</span>"}
        ]}
    ]
};

function initQuiz() {
    quiz = new Environment("quiz");
    loadConfig(quiz);
    loadQuestionBank();
}

function loadQuestionBank() {
    for (var i in questionbank.questions) {
        var q = questionbank.questions[i];
        var opts = ["a", "b", "c", "d"];
        var optsz = ["", "correct", "points"];
        var options = [];
        var optiones = {};
        for (var i = 0; i < opts.length; i++) {
            var temp1 = "opt" + opts[i] + optsz[0];
            var temp2 = "opt" + opts[i] + optsz[1];
            var temp3 = "opt" + opts[i] + optsz[2];
            optiones.option = i + 1;
            optiones.name = q[temp1];
            optiones.correct = q[temp2];
            optiones.points = q[temp3];
            options.push(optiones);
            optiones = {}
        }
        new Question(q._id, q.name, q.image, q.weight, options, q.help, q.slide, q.subslide, q.category, q.answered);
    }
    return true;
}


var Question = Fiber.extend(function () {
    return {
        init: function (_id, name, image, weight, options, help, slide, subslide, category, answered) {
			this._id = _id;
            this.name = name;
            this.image = image;
            this.weight = weight || 1;
            this.options = options;
            this.help = help;
            this.slide = slide;
            this.subslide = subslide;
            this.category = category;
			this.answered = answered;
            Question.all.push(this);
            log.add('Question: ' + name + ' created')
        },
        checkAnswer: function (id, option) {
            var thisAnswer = $.grep(this.options, function (a) {
                return ( a == option );
            })[0];
            return { correct: thisAnswer.correct, weight: this.weight, points: thisAnswer.points, help: this.help}
        }
    }
});

Question.all = [];

Question.getByWeight = function (weight) {
    var questions = $.grep(Question.all, function (a) {
        return ( a.weight == weight );
    });
    return questions[randBetween(0, questions.length - 1)]
};

Question.getAllByWeight = function(weight, amount) {
    var questions = $.grep(Question.all, function(a) {
        return (a.weight == weight && a.answered === false);
    });

//    if(amount!=null) {
//        var tmp = [];
//        for(var i=0; i<amount+1; i++)
//            tmp.push(questions.splice(randBetween(0, questions.length-1), 1)[0]);
//
//        questions = tmp;
//    }
    return questions;
}

Question.getBySubCat = function(weight, subcategory) {

    var questions = $.grep(Question.all, function(a) {
        if(a.weight==weight && a.category == subcategory && a.answered === false)
            return a;
    });

    return questions[randBetween(0, questions.length-1)];
}

Question.getByWeightExSubcat = function(weight, subcat) {

    var questions = $.grep(Question.all, function(a) {
        if(a.weight==weight && a.category != subcat && a.answered === false)
            return a;
    });

    return questions[randBetween(0, questions.length-1)];
}

Question.getAnswer = function(question) {
    var tmp = question.options;
    for(var i=0; i<tmp.length; i++)
        if(tmp[i].correct)
            return tmp[i].name;
}

Question.showQuizPanel = function (obj, question) {
    $('#question').html("<span>"+question.name+"</span>");
    $('#options').empty();
	var alphabetRender = ["A", "B", "C", "D"];
    for (var i in question.options) {
        $('#options').append('<div class="answer-block" id="answer-block-' + i + '"><div id="answer-block-div' + i + '"><span id="answer-block-span' + i + '">' + question.options[i].name + '</span></div></div>');
		
		$("#answer-block-" + i).attr("data-content", alphabetRender[i]);
		
        $('#answer-block-'+i).prepend('<img class="answer-block-back" src= "" />');

    }
    $('.answer-block').unbind('click').on('click', function () {

        $this = $(this);
        $(question).trigger("answered", [question.checkAnswer($(this), question.options[parseInt($this.attr("id").split("answer-block-")[1])], $this.attr("id"))]);
    });


    $('#knowmore').attr('template-id',question.id);
    $("#knowmore").unbind('click').on('click', function(e) {
        templateId = $(e.currentTarget).attr('template-id');
        parent.learnModal(templateId);
        parent.recordKmClick();
    });
};


