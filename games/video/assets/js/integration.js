function getImg(str){
    return defaultImages.path+defaultImages[str];
}

function getText(str){
    return defaultText[str];
}

window.getImg= getImg
window.getText = getText

//this is the object which contains path for default text and images
defaultImages  ={}
//defaultImages.path = "assets/img/";
defaultImages.path = "../../img/";
defaultImages["hm-background"] = "backhangman.jpg";
defaultImages["hm-logo"] = "nameplate.png";
defaultImages["hm-right-panel"] = "wanted.png";
defaultImages["hm-hang1"] = "spirit.png";
defaultImages["hm-hang2"] = "hm1.png";
defaultImages["hm-hang3"] = "hm2.png";
defaultImages["hm-hang4"] = "hm3.png";
defaultImages["hm-hang5"] = "hm4.png";
defaultImages["hm-hang6"] = "hm5.png";
defaultImages["hm-hang7"] = "hm6.png";
defaultImages["hm-hang8"] = "hm7.png";
defaultImages["hm-tile-back-1"] = "tile_back_default.png";
defaultImages["hm-tile-back-2"] = "tile_back_click.png";


defaultText = {};
defaultText["hm-text-instructions"] = "<p>To please the Spirit, you need to answer all the questions correctly.Read the question and select a letter from the keypad to complete the answer.</p>" +
"<p>Remember, with every wrong letter, the Spirit will fade. 6 wrong guesses and the Spirit will disappear completely.</p>" +

// "<p>6 wrong guesses and the Spirit will disappear completely.</p>" +
"<p>You can use your keyboard to type in the answers.</p>" +
"<p>In case you need any help, click on ‘Hint’ for clues. Good luck!</p>";
// "<p>Good luck!</p>";


window.defaultImages = defaultImages;
