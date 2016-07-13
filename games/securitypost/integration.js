function getImg(str){
    return defaultImages.path+defaultImages[str]
//    if(parent.getImageInGame(parent.currentIntegratedGame,str) === 403)
//        return defaultImages.path+defaultImages[str]
//    else
//        return parent.getImageInGame(parent.currentIntegratedGame,str)
}

function getText(str){
    return defaultText[str]
//    if(parent.getTextInGame(parent.currentIntegratedGame,str) === 403)
//        return defaultText[str]
//    else
//        return parent.getTextInGame(parent.currentIntegratedGame,str)
}

window.getImg= getImg
window.getText = getText

//this is the object which contains path for default text and images
defaultImages = {}
defaultImages.path = "../../img/"
defaultImages["kbc-background"] = "backgroundsecurity.png";
defaultImages["loading"] = "load.gif";
defaultImages["kbc-background1"] = "qholderimg.png";
//defaultImages["kbc-logo"] = "game_logo.png";
defaultImages["kbc-button-start"] = "active-btn.png";
defaultImages["correct"] = "correctsecurity.png";
defaultImages["incorrect"] = "incorrectsecurity.png";
defaultImages["pollover"] = "pollhover.png";
defaultImages["pollclick"] = "pollclick.png";
defaultImages["50over"] = "50hover.png";
defaultImages["50click"] = "50click.png";
defaultImages["changeover"] = "changehover.png";
defaultImages["changeclick"] = "changeclick.png";
defaultImages["kbc-button-start-hover"] = "btn-hover.png";
defaultImages["kbc-button-instruction"] = "active_instructionbuttonsecurity.png";
defaultImages["kbc-button-instruction-hover"] = "kbc-start-button-hoversecurity.png";
defaultImages["kbc-button-play-again"] = "active_instructionbuttonsecurity.png";
defaultImages["kbc-button-play-again-hover"] = "kbc-start-button-hoversecurity.png";
defaultImages["kbc-button-know-more"] = "kbc-start-button-hoversecurity.png";
defaultImages["kbc-button-know-more-hover"] = "active_instructionbuttonsecurity.png";
//defaultImages["kbc-character"] = "character.png";
defaultImages["kbc-answer-back"] = "active_instructionbuttonsecurity.png";
defaultImages["kbc-answer-hover-back"] = "kbc-start-button-hoversecurity.png";
defaultImages["kbc-answer-correct-back"] = "active_instructionbuttonsecurity.png";
defaultImages["kbc-lifeline1-img"] = "poll.png";
defaultImages["kbc-lifeline1-img-disabled"] = "poll-disabled.png";
defaultImages["kbc-lifeline2-img"] = "50-50.png";
defaultImages["kbc-lifeline2-img-disabled"] = "50-50-disabled.png";
defaultImages["kbc-lifeline3-img"] = "change.png";
defaultImages["kbc-lifeline3-img-disabled"] = "change-disabled.png";
defaultImages["kbc-ladder-current"] = "kbc-start-button-hoversecurity.png";


defaultText = {};
defaultText["kbc-text-ladder01"] = "Question 01";
defaultText["kbc-text-ladder02"] = "Question 02";
defaultText["kbc-text-ladder03"] = "Question 03";
defaultText["kbc-text-ladder04"] = "Question 04";
defaultText["kbc-text-ladder05"] = "Question 05";
defaultText["kbc-text-ladder06"] = "Question 06";
defaultText["kbc-text-ladder07"] = "Question 07";
defaultText["kbc-text-ladder08"] = "Question 08";
defaultText["kbc-text-ladder09"] = "Question 09";
defaultText["kbc-text-ladder10"] = "Question 10";

defaultText["kbc-text-instruction-header"] = "HOW TO PLAY";
defaultText["kbc-text-instructions"] = "<p>Select the correct answer from the options.You have 1 lifeline for this.</p>" +
    "<img class='img-50-1'src='"+getImg("50over")+"'/> <p style='left: 8%;'> 50-50 Lifeline: Removes two incorrect options. </p><p style='left: 8%;'>You can use this lifeline only once. Once used, it will turn to grey.</p> " +
    "<p><b>So, go ahead and answer all questions correctly to overcome this hurdle!</b></p> ";





window.defaultImages = defaultImages;
