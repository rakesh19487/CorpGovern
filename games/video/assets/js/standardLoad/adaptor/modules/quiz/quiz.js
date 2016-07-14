var quiz;

config.quiz = {
    type: "environment",
    states: [
        {name: "default", representation: ""}
    ],
    locations: [
        {name: "statement-area", states: [
            {name: "default", representation: ""}
        ]},
        {name: "options", states: [
            {name: "default", representation: ""}
        ]},
        {name: "knowmore", states: [
            {name: "default", representation: "<span>Know More</span>"}
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
        for (var j= 0; j < opts.length; j++) {
            var temp1 = "opt" + opts[j] + optsz[0];
            var temp2 = "opt" + opts[j] + optsz[1];
            var temp3 = "opt" + opts[j] + optsz[2];
            optiones.option = j + 1;
            optiones.name = q[temp1];
            optiones.correct = q[temp2];
            optiones.points = q[temp3];
            options.push(optiones);
            optiones = {};
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
            return {optionId:parseInt($("#" + id).attr('id').split("option-block-")[1]), correct: thisAnswer.correct, weight: this.weight, points: thisAnswer.points, help: this.help}
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

Question.getAllByWeight = function(weight) {
    var questions = $.grep(Question.all, function(a) {
        return (a.weight == weight);
    });
    return questions;
}

Question.getAnswer = function(question) {
    var tmp = question.options;
    for(var i=0; i<tmp.length; i++)
        if(tmp[i].correct==="true")
            return tmp[i].name;
}

Question.getBySubCat = function(weight, category) {

    var questions = $.grep(Question.all, function(a) {
        if(a.weight==weight && a.category == category)
            return a;
    });

    return questions[randBetween(0, questions.length-1)];
}

Question.getByWeightExSubcat = function(weight, subcat) {

    var questions = $.grep(Question.all, function(a) {
        if(a.weight==weight && a.category != subcat)
            return a;
    });

    return questions[randBetween(0, questions.length-1)];
}

Question.showQuizPanel = function (obj, question) {
    $('#statement-area').html(question.name);
    $('#options').empty().append("<ul></ul>");
    if(question.image != null){
        $('#question-image').empty().html("<img src='" + question.image + "' />");
    }
    for (var i in question.options) {
        $('#options ul').append('<li class="option-block" id="option-block-' + i + '">' + question.options[i].name + '</li>');
    }
    $('.option-block').unbind('click').on('click', function () {
        $this = $(this);
        $(question).trigger("answered", [question.checkAnswer($this.attr('id'),question.options[parseInt($this.attr("id").split("option-block-")[1])])]);
    });
};


