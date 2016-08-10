var config = {};

config.initMana = 0;
config.initPower = 0;

config.launchpad = {
    type: "environment",
    states: [
        {name: "default", representation: "<img src='../../img/background_page01hunt.jpg'/>"}
    ],
    locations: [
        {name: "inst-txt", states: [
            {name: "inst-btn", representation: "<div id='game-back'><img src='../../img/background_page01hunt.jpg'/>"}
        ]},
        {name: "inst-btn", states: [
            {name: "inst-btn", representation: "<img src='../../img/start_buttonhunt.png'><span class='inst-btn-txt'>Start Game</span>"}
        ]},

        {name: "start", states: [
            {name: "start-btn", representation: "<img src='../../img/start_buttonhunt.png'><span>START</span>"}
        ]}
    ]
};
config.mainPage = {
    type: "environment",
    states: [
        {
            name: "default",
            representation: "<img id='mainPageBg' src='../../img/background_page02hunt.jpg'/>"
        }
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
                "<div id='inst-content'><p>To save yourself, you will have to trap the beast.</p>" +
                "<p>Select the correct answer to bring down the trap.</p>" +
                "<p>You need to answer all the 5 questions correctly to get away safely.</p></div>"}
        ]},
        {name: "inst-btn", states: [
            {name: "inst-btn", representation: "<img src='../../img/start_buttonhunt.png' /><span class='inst-btn-txt'>Start Game</span>"}
        ]}


    ]

};
config.correctmessage = {
    type: "environment",
    states: [
        {name: "default", representation: "<div id='game-back'><img src='../../img/game_back_snap.jpg' /></div>" +
        "<div id='endmessage'>Well, it's feast for the beast! Please refer to the backpack and try again!</div>" +
        "<div id='playagain-caveman' class='startpage-button'><img src='../../img/start_buttonhunt.png' /><span>Try Again</span></div> <div id='backpack' class='backpack-button'> <img src='../../img/start_buttonhunt.png' /> <span>Use BackPack</span></div>"}
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
            {name: "default", representation: "<img src='../../img/about_task.png'><span>Can you see the snow leopard over there? He's ready to pounce on you. But you can save your self and there's only one way to do that. Trap him! Answer the Questions correctly to trap the leopard!</span>"}

        ]},
        {name: "gameDisplay", states: [
            {name: "default", representation: "<img src='../../img/snow_leopard_bg.png'>"}
        ]},
        {name: "smokes", states: [
            {name: "default", representation: "<img id='cageimg' src='../../img/cage.png'>"}
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
                    {name: "default", representation: "<img src='../../img/button_false1.png'>"},
                    {name: "false", representation: "<img src='../../img/button_false1.png'>"},
                    {name: "true", representation: "<img src='../../img/button_true.png'>"}
                ]});
        }
        return allLevels;
    }()
};

config.victoryState = {
    type: "environment",
    states: [
        {
            name: "default",
            representation: "<div class='victory-txt'><span class='header'>Bravo! You may proceed now! And be careful!</span><span type='button' class='btn-ok' onclick='getMessage();'>Continue</span></div>"
        }
    ]

};



