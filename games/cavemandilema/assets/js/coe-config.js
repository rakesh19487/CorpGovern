var config = {};

config.initMana = 0;
config.initPower = 0;
config.launchpad = {
    type: "environment",
    states: [
//        {name: "default", representation: "<img src='assets/img/background_pg01.jpg'/>"}
        {name: "default", representation: "<img src='../../img/background_pg01_caveman.jpg'/>"}
    ],
    locations: [
        {name: "inst-txt", states: [
            {name: "inst-btn", representation: "<div id='game-back'><img src='../../img/background_pg01_caveman.jpg'/>"}
        ]},

        {name: "start", states: [
            {name: "start-btn", representation: "<img src='../../img/start_buttoncaveman.png'><span>START</span>"}
        ]}
    ]
};


config.instruction= {
    type: "environment",
    states: [
        {name: "default", representation: ""}
    ],
    locations: [
        {name: "inst-txt", states: [
            {name: "inst-btn", representation: "<div id='inst-header'>HOW TO PLAY</div>" +
                "<div id='inst-content' class='mCustomScrollbar'>" +
                "<p class='content'>The entrance of the cave is hidden behind the fog.</p>" +
                "<p class='content'>Select the correct answer to clear the fog.</p>" +
                "<p class='content'>You need to answer all the 5 questions correctly to enter the cave.</div>"}
        ]},
        {name: "inst-btn", states: [
            {name: "inst-btn", representation: "<img src='../../img/start_buttoncaveman.png'><span class='inst-btn-txt'>Start Game</span>"}
        ]}


    ]

};


config.correctmessage = {
    type: "environment",
    states: [
        {name: "default", representation: "<div id='game-back'><img src='../../img/cavemantrypage.jpg' /></div>" +
        "<div id='endmessage'>You haven't advised me well. Please refer to the backpack and try again!</div>" +
        "<div id='playagain-caveman' class='startpage-button'><img src='../../img/start_buttoncaveman.png' /><span>Try Again</span></div> <div id='backpack' class='backpack-button' style='display: table;'> <img src='../../img/start_buttoncaveman.png' /> <span>Use BackPack</span></div>"}
    ]
};
config.mainPage = {
    type: "environment",
    states: [
        {
            name: "default",
            representation: "<img id='mainPageBg' src='../../img/caves.jpg'/>"
        }
    ]
};

config.leftPanel = {
    type: "environment",
    states: [
        {
            name: "default",
            representation: ""
        }
    ],
    locations: [
        {name: "statusPanel", states: [
            {name: "default", representation: "<img src='../../img/about_task1.png'><span>Your questions will appear on the right. Answer all of them correctly and I will let you enter.</span>"},

        ]},
        {name: "gameDisplay", states: [
            {name: "default", representation: "<img src='../../img/caveman.png'>"}
        ]},
        {name: "smokes", states: [
            {name: "default", representation: "<div id='fog-holder'></div>"},
            {name: "0", representation: "<div class='st-0-op' id='fog-holder'></div>"},
            {name: "1", representation: "<div class='st-1-op' id='fog-holder'></div>"},
            {name: "2", representation: "<div class='st-2-op' id='fog-holder'></div>"},
            {name: "3", representation: "<div class='st-3-op' id='fog-holder'></div>"},
            {name: "4", representation: "<div class='st-4-op' id='fog-holder'></div>"},
            {name: "5", representation: "<div class='st-5-op' id='fog-holder'></div>"},
            {name: "6", representation: "<div class='st-6-op' id='fog-holder'></div>"},
            {name: "7", representation: "<div class='st-7-op' id='fog-holder'></div>"},
            {name: "8", representation: "<div class='st-8-op' id='fog-holder'></div>"},
            {name: "9", representation: "<div class='st-9-op' id='fog-holder'></div>"},
        ]},
        {name: "cave_submit", states: [
            {name: "default", representation: "<input type='button' value='Submit' style='display: none'>"}
        ]},

    ]
};
config.switches = {
    type: "environment",
    states: [
        {
            name: "default",
            representation: ""
        }
    ],
    locations: function () {
        var allLevels = [];
        for (var i = 1; i <= 4; i++) {
            allLevels.push({
                name: "switch"+i,
                states: [
               {name: "default", representation: "<img src='../../img/button_true.png'>"},
                         {name: "false", representation: "<img src='../../img/button_false1.png'>"},
                    {name: "true", representation: "<img src='../../img/button_true.png'>"}
                ]});
        }
        return allLevels;
    }()
};
//<img src="assets/img/start_button.png">
config.victoryState = {
    type: "environment",
    states: [
        {
            name: "default",
//            representation: "<div class='victory-txt'><span>Thank you! You may enter now!</span><input type='button' value='Continue' class='btn-ok' onclick='getMessage();'></div>"
            representation: "<div class='victory-txt'><span class='header'>Thank you! You may enter now! Make yourself at home!</span><span type='button' class='btn-ok' onclick='getMessage();'>Continue</span></div>"
//            representation: "<div class='victory-txt'><img src='assets/img/start_button.png' id='end_game' onclick='alert('hi') '><span class='won_txt_span'>You Won<span></span></div>"
        }
    ]

};
config.wrongState = {
    type: "environment",
    states: [
        {name: "endgame",
            representation:  "<div id='game-back'><img src='../../img/cavemantrypage.jpg'/></div>" +
         "<div id='endmessage'></div>" +
         "<div id='playagain' class='startpage-button'>" +
         "<img src='../../img/start_buttoncaveman.png' />" +
         "<span>Try Again</span>" +
          "</div>"+
          "<div id='backpack' class='backpack-button'>" +
          "<img src='../../img/start_buttoncaveman.png' />" +
          "<span>BackPack</span>" +
          "</div>"
        }
    ]

};


