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
defaultImages["kbc-background"] = "b1.jpg";
defaultImages["kbc-background1"] = "b2.jpg";
defaultImages["loading"] = "load.gif";
defaultImages["pollover"] = "pollhover.png";
defaultImages["50over"] = "50hover.png";
defaultImages["changeover"] = "changehover.png";
defaultImages["correct"] = "correctsecurity.png";
defaultImages["incorrect"] = "incorrectsecurity.png";
//defaultImages["kbc-logo"] = "game_logo.png";
defaultImages["kbc-button-start"] = "active_instructionbutton.png";
defaultImages["kbc-button-start-hover"] = "hovestartbutton.png";
defaultImages["kbc-button-instruction"] = "active_instructionbutton.png";
defaultImages["kbc-button-instruction-hover"] = "hovestartbutton.png";
defaultImages["kbc-button-play-again"] = "active_instructionbutton.png";
defaultImages["kbc-button-play-again-hover"] = "hovestartbutton.png";
defaultImages["kbc-button-know-more"] = "hovestartbutton.png";
defaultImages["kbc-button-know-more-hover"] = "active_instructionbutton.png";
//defaultImages["kbc-character"] = "character.png";
defaultImages["kbc-answer-back"] = "active_instructionbutton.png";
defaultImages["kbc-answer-hover-back"] = "hovestartbutton.png";
defaultImages["kbc-answer-correct-back"] = "active_instructionbutton.png";
defaultImages["50click"] = "50click.png";
defaultImages["changeclick"] = "changeclick.png";
defaultImages["pollclick"] = "pollclick.png";
defaultImages["kbc-lifeline1-img"] = "poll.png";
defaultImages["kbc-lifeline1-img-disabled"] = "poll-disabled.png";
defaultImages["kbc-lifeline2-img"] = "50-50.png";
defaultImages["kbc-lifeline2-img-disabled"] = "50-50-disabled.png";
defaultImages["kbc-lifeline3-img"] = "change.png";
defaultImages["kbc-lifeline3-img-disabled"] = "change-disabled.png";
defaultImages["kbc-ladder-current"] = "hovestartbutton.png";


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
defaultText["kbc-text-instructions"] ="<p>Select the correct answer from the given options.</p>"+
"<p>Answer all the questions correctly to reach the top.</p> ";





window.defaultImages = defaultImages;
