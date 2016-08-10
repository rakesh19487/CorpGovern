var storyConfig = {
    name: "Ptotemy",
    background: "background1.jpg",
    background1: "background2.jpg",
    zone: {
        px:18,
        py:8,
        zoneIcons: ["icon-mosque.png", "icon-palms1.png", "icon-palms2.png", "icon-tower.png", "icon-windmill.png", "icon-tree.png"]
    },
    presenter: {
        image: "character.png",
        px: 67,
        py: 8,
        width: 28
    },
    nameplate: {
        image: "sign_board.gif",
        px: 80,
        py: 64,
        width: 17
    },
    compass: {
        image: "comapss.gif",
        px: 2,
        py: 71,
        width: 14
    },
    scoreboard: {
        image: "scoreboard.png",
        px: 16,
        py: 83,
        width: 21
    },
    nodepics: {
        incomplete: "node-complete.png",
        complete: "node-complete.png",
        active: "node-complete.png"
    },
    nodes: [
        {
            name: "In or Out",
            icon_active: "2.png",
            icon_inactive: "2ii.png",
            icon_complete: "2cc.png",
            photo: "2caveman.jpg",
            description: "Warning: Snowstorm! You need shelter. Lucky for you.",
            sequence: 1,
            px: 47,
            py: 58,
            iepx:50
        },
        {
            name: "Fairy Tale",
            icon_active: "6.png",
            icon_inactive: "6ii.png",
            icon_complete: "6cc.png",
            photo: "6spirit.jpg",
            description: "Almost there! Oh ... wait a minute!",
            sequence: 2,
            px: 38.8,
            py: 46.5,
            iepx:41

        },
        {
            name: "Flight or Fight",
            icon_active: "3.png",
            icon_inactive: "3ii.png",
            icon_complete: "3cc.png",
            photo: "3snow_leopard.jpg",
            description: "Oh look! There's a Snow Leopard ready to pounce.",
            sequence: 3,
            px: 32.5,
            py: 32.8,
            iepx: 35.5
        },
        {
            name: "Hunger Game",
            icon_active: "5.png",
            icon_inactive: "5ii.png",
            icon_complete: "5cc.png",
            photo: "4yeti.jpg",
            description: "Beware! This guy is always hungry!",
            sequence: 4,
            px: 38,
            py: 19,
            iepx: 40
        }
      
    ]
};





