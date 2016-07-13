function slideend(){
    var effect = 'slide';
    var options = { direction:"up" };
    var duration = 1500;
    $('.slide-animation').toggle(effect, options, duration);
}

function hangmanend(){
    var effect = 'slide';
    var options = { direction:"down" };
    var duration = 5000;
    $('.slide-animation').toggle(effect, options, duration);
}
//required for wrong_ansanimation
function callback() {
};

function wrong_ansanimation(cur_pos){
    var selectedEffect ="shake" ;
    var options = {};
    if ( selectedEffect === "scale" ) {
        options = { percent: 0 };
    } else if ( selectedEffect === "transfer" ) {
        options = { to: "#button", className: "ui-effects-transfer" };
        $("#ui-effects-wrapper").css("width",0)
    } else if ( selectedEffect === "size" ) {
        options = { to: { width: 00, height: 00 } };
    }
    $(cur_pos).effect( selectedEffect, options, 500, callback );
    $(cur_pos).find("img").attr('src', getImg("incorrect"));
}

function wrong_ansanimationcaveman(cur_pos){
    var selectedEffect ="shake" ;
    var options = {};
    if ( selectedEffect === "scale" ) {
        options = { percent: 0 };
    } else if ( selectedEffect === "transfer" ) {
        options = { to: "#button", className: "ui-effects-transfer" };
        $("#ui-effects-wrapper").css("width",0);
    } else if ( selectedEffect === "size" ) {
        options = { to: { width: 00, height: 00 } };
    }
    $(cur_pos).effect( selectedEffect, options, 500, callback );
    //(cur_pos).find("img").attr('src', getImg("incorrect"));
}
function correct_ansanimation(cur_pos){
    $(".question-text").empty();
    $("#options").append('<div class="correct-text"><span class="correct-message">Correct!</span></div>');
    $(cur_pos).find("img").attr('src', getImg("correct"));
}

function backpack_slide_animation(){
    var effect = 'slide';
    var options = { direction:"left" };
    var duration = 500;
    $('#backpack-icon-wrapper').toggle(effect, options, duration);
}

function backpack_slide_animation(){
    var effect = 'slide';

    // Set the options for the effect type chosen
    var options = { direction:"up" };

    // Set the duration (default: 400 milliseconds)
    var duration = 500;

    $('#back_pack_table').toggle(effect, options, duration);
}
