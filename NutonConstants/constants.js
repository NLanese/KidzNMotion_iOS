const categories = [
    {
        id: 1,
        name: "Business",
        image: require("../assets/images/categories/business.png"),
    },
    {
        id: 2,
        name: "Technology",
        image: require("../assets/images/categories/technology.png"),
    },
    {
        id: 3,
        name: "Digital Marketing",
        image: require("../assets/images/categories/digital-marketing.png"),
    },
    {
        id: 4,
        name: "Business",
        image: require("../assets/images/categories/business.png"),
    },
    {
        id: 5,
        name: "Technology",
        image: require("../assets/images/categories/technology.png"),
    },
    {
        id: 6,
        name: "Digital Marketing",
        image: require("../assets/images/categories/digital-marketing.png"),
    },
];

const promo = [
    {
        id: "1",
        image: { uri: "https://via.placeholder.com/1005x660" },
    },
    {
        id: "2",
        image: { uri: "https://via.placeholder.com/1005x660" },
    },
    {
        id: "3",
        image: { uri: "https://via.placeholder.com/1005x660" },
    },
];

const tags = [
    {
        id: "1",
        tag: "Java",
    },
    {
        id: "2",
        tag: "Python",
    },
    {
        id: "3",
        tag: "Marketing",
    },
    {
        id: "4",
        tag: "App",
    },
    {
        id: "5",
        tag: "Database",
    },
    {
        id: "6",
        tag: "Analytics",
    },
    {
        id: "7",
        tag: "UI/UX",
    },
];

const myCoupons = [
    {
        id: "1",
        discount: "10% off",
        course: "Mobile Application Development",
        activationCode: "START",
        image: {
            uri: "https://via.placeholder.com/1005x255",
        },
    },
    {
        id: "2",
        discount: "10% off",
        course: "Mobile Application Development",
        activationCode: "START",
        image: {
            uri: "https://via.placeholder.com/1005x255",
        },
    },
    {
        id: "3",
        discount: "10% off",
        course: "Mobile Application Development",
        activationCode: "START",
        image: {
            uri: "https://via.placeholder.com/1005x255",
        },
    },
    {
        id: "4",
        discount: "10% off",
        course: "Mobile Application Development",
        activationCode: "START",
        image: {
            uri: "https://via.placeholder.com/1005x255",
        },
    },
];

const FAQ = [
    {
        id: "1",
        question: "Refund Status: Common Questions",
        answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        id: "2",
        question: "Troubleshooting Failed Payments",
        answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        id: "3",
        question: "How to Find Your Missing Course",
        answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        id: "4",
        question: "Downloading Course Resources",
        answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        id: "5",
        question: "How to Refund a Course",
        answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        id: "6",
        question: "Lifetime Access",
        answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
];

const PP = [
    {
        id: "1",
        title: "1. Terms",
        description:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        id: "2",
        title: "2. Use license",
        description:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        id: "3",
        title: "3. Disclaimer",
        description:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
];

const reviews = [
    {
        id: "1",
        name: "Lillian Davis",
        photo: {
            uri: "https://via.placeholder.com/120x120",
        },
        comment: "Lots of good info.",
        rating: 3,
        date: "March 3, 2022",
    },
    {
        id: "2",
        name: "Adam Thompson",
        photo: {
            uri: "https://via.placeholder.com/120x120",
        },
        comment:
            "Great course, Chris helps you get started with a framework where you can then build off of and focus on getting your games started faster. Great course, Chris helps you get started with a framework where you can then build off of and focus on getting your games started faster.",
        rating: 4,
        date: "March 28, 2022",
    },
    {
        id: "3",
        name: "Ryan Howard",
        photo: {
            uri: "https://via.placeholder.com/120x120",
        },
        comment: "It has explained it very well & made it very simple.",
        rating: 5,
        date: "February 12, 2022",
    },
];

const onboardingSlide = [
    {
        id: "1",
        title: "Discover useful resources",
        description:
            "E-Learning is for everyone. Now is the chance to sign up and receive all the lessons that we’ve prepared for education so far.",
        image: {
            uri: "https://via.placeholder.com/1125x1125",
        },
    },
    {
        id: "2",
        title: "New profession",
        description:
            "With us you can get a new profession, learn skills for career development or reconfigure your business. ",
        image: {
            uri: "https://via.placeholder.com/1125x1125",
        },
    },
    {
        id: "3",
        title: "Move forward",
        description:
            "We have created a comfortable learning environment so that you always have the motivation to move forward.",
        image: {
            uri: "https://via.placeholder.com/1125x1125",
        },
    },
];

export {
    categories,
    promo,
    tags,
    myCoupons,
    FAQ,
    PP,
    reviews,
    onboardingSlide,
};
