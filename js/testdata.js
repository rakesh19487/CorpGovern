var platformData = {
        introduction: "",
        endMessage: "",
        formal: true,
        sequential: false,
        nodes: [
            {
                description: "Snowstorm! Can't see a thing ahead, Can you? I could let you into my cave but you need to answer a couple of questions first.",
                sequence: 1,
                decks: [2],
                games: [5],
                videos: [0],
                backpack: [0]
            },
            {
                description: "Welcome, Traveler! Many have come this far but few have gotten past me! Answer my questions and I shall bless you else I shall disappear forever!",
                sequence: 2,
                decks: [6],
                games: [1],
                videos: [1],
                backpack: [1]
            },
            {
                description: "Running is not an option here. You can't outrun the beast. How about trapping the beast? Try this quiz and you might be able to save yourself!",
                sequence: 3,
                decks: [3],
                games: [6],
                videos: [2],
                backpack: [2]
            },
            {
                description: "Lost your way?! I could help but I am hungry and have no money to eat at the taverns. Plus I am so bored.",
                sequence: 4,
                decks: [4],
                games: [3],
                videos: [],
                backpack: [3]
            }
        ]
    };

var decks = [
    {
        id: '1',
        title: "Introduction to Ptotem",
        html: "An executive summary of Ptotem's business and plan",
        slides: 1
    },
    {
        id: '2',
        title: "Understand Serious Games",
        html: "Serious Games are big. Get an idea of what this space is all about.",
        slides: 1
    },
    {
        id: '3',
        title: "The Need Gap",
        html: "Every emerging industry comes with its set of opportunities. Discover them like we have.",
        slides: 1
    },
    {
        id: '4',
        title: "Discover Ptotemy",
        html: "The definitive global platform for building, buying and selling Serious Games",
        slides: 4
    },
    {
        id: '5',
        title: "Meet Ptotem",
        html: "Software is not just code. It is made of people too. Meet the Team and our Clients that make Ptotemy possible.",
        slides: 3
    },
    {
        id: '6',
        title: "The Plan",
        html: "We love it when a plan comes together. Get an idea of what is in store for the future.",
        slides: 3
    }
];

var games = [
    {
        id: '1',
        title: "Seek Blessing",
        backpack: "Go through Backpack",
        name: "hangman",
        fullscreen: false
    },
    {
        id: '3',
        title: "Engage the Yeti",
        backpack: "Go through Backpack",
        name: "yeti",
        fullscreen: false
    },
    {
        id: '2',
        title: "Find a Way",
        backpack: "Go through Backpack",
        name: "video",
        fullscreen: false
    },
    {
        id: '4',
        title: "Begin Security Check",
        backpack: "Go through Backpack",
        name: "securitypost",
        fullscreen: false
    },

    {
        id: '5',
        title: "Advise the Caveman",
        backpack: "Go through Backpack",
        name: "cavemandilema",
        fullscreen: false
    },
    {
        id: '6',
        title: "<span class='brown-text'>Trap the Snow Leopard</span>",
        backpack: "Go through Backpack",
        name: "hunt",
        fullscreen: false
    }

];
var videos = [
    {
        id: '1',
        title: "The Ptotemm Videoo",
        file: "http://techslides.com/demos/sample-videos/small.mp4"
    },
    {
        id: '2',
        title: "The Ptotemyy Videoo",
        file: "http://www.w3schools.com/tags/movie.mp4"
    },
    {
        id: '3',
        title: "The Ptotemm Videoy",
        file: "http://www.w3schools.com/tags/movie.mp4"
    }
];

var backpack = [
    {
        id: '1',
        title: "Go through Backpack",
        file: "1"
    },
    {
    id: '2',
    title: "Go through Backpack",
    file: "2"
},
    {
        id: '3',
        title: "Go through Backpack",
        file: "3"
    },
    {

        id: '4',
        title: "Go through Backpack",
        file: "4"

    },
    {

        id: '5',
        title: "Go through Backpack",
        file: "5"

    },
    {

        id: '6',
        title: "Go through Backpack",
        file: "6"

    }
];

var userdata = {
    decks: [
        {
            deckId: 1,
            complete: true
        },
        {
            deckId: 2,
            complete: true
        },
        {
            deckId: 3,
            complete: true
        },
        {
            deckId: 4,
            complete: true
        },
        {
            deckId: 5,
            complete: true
        },
        {
            deckId: 6,
            complete: true
        },
        {
            deckId: 7,
            complete: false
        },
        {
            deckId: 8,
            complete: false
        }
    ],
    games: [
        {
            gameId: 1,
            complete: true
        },
        {
            gameId: 2,
            complete: true
        },
        {
            gameId: 3,
            complete: true
        },
        {
            gameId: 4,
            complete: true
        },
        {
            gameId: 5,
            complete: true
        },
        {
            gameId: 6,
            complete: true
        }
    ]
};

