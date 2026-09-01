// 作品集 — 改这个文件就能增删项目卡片
// category 用来分组（同一个 category 的卡片会排在一起，组标题按第一次出现的顺序）
// image 留空字符串 = 显示蓝图占位图；github 留空 = 不显示 "View on GitHub"
window.PORTFOLIO_DATA = window.PORTFOLIO_DATA || {};

window.PORTFOLIO_DATA.projects = [

    // ---------- 实习作品 ----------
    {
        "category": "Internship — Deng Kai Sdn Bhd, R&D",
        "title": "EBQ Control Hybrid",
        "repo": "ebq-control-hybrid",
        "description": "Cross-platform React Native app that controls EBQ devices over both BLE for local access and MQTT for cloud access. Features real-time current display, device configuration, scene control, a multi-language UI, and BLE OTA firmware updates. Contributed development and feature improvements, and tested the BLE/MQTT switching behaviour.",
        "meta": "Jan – May 2026 · React Native",
        "image": "",
        "github": "",
        "tags": [
            "React Native",
            "BLE",
            "MQTT",
            "OTA"
        ]
    },
    {
        "category": "Internship — Deng Kai Sdn Bhd, R&D",
        "title": "BLE ChangeOver",
        "repo": "ble-changeover",
        "description": "React Native app for monitoring and controlling the MyStarChangeOver automatic transfer switch over BLE. Provides real-time voltage and current monitoring across three channels, configurable protection thresholds, Arabic-language support, and BLE packet inspection. Handled development, testing and debugging, and verified communication between app and hardware.",
        "meta": "Jan – May 2026 · React Native",
        "image": "",
        "github": "",
        "tags": [
            "React Native",
            "BLE",
            "Embedded"
        ]
    },
    {
        "category": "Internship — Deng Kai Sdn Bhd, R&D",
        "title": "EBQ Control Wi-Fi",
        "repo": "ebq-control-wifi",
        "description": "Mobile app for monitoring and controlling EBQ devices over Wi-Fi, letting users operate hardware remotely without a Bluetooth connection. Worked on app development, UI improvements, testing and debugging, and on stabilising communication between the app and the devices.",
        "meta": "Jan – May 2026 · Mobile",
        "image": "",
        "github": "",
        "tags": [
            "Mobile",
            "Wi-Fi",
            "IoT"
        ]
    },
    {
        "category": "Internship — Deng Kai Sdn Bhd, R&D",
        "title": "Meter Image Uploader",
        "repo": "meter-image-uploader",
        "description": "React Native app that uploads profile images and greeting text to an EBQ Meter's LCD display over BLE, converting images to hex data for transmission. Supports multiple upload modes, camera and gallery input, progress tracking, and retry logic on failed transfers.",
        "meta": "Jan – May 2026 · React Native",
        "image": "",
        "github": "",
        "tags": [
            "React Native",
            "BLE",
            "Image Processing"
        ]
    },

    // ---------- 课业 & 个人项目 ----------
    {
        "category": "Coursework & personal builds",
        "title": "Resort Management System",
        "repo": "resort-management-system",
        "description": "Built a generic Queue ADT (linked-list based) for a resort's walk-in registration module, as part of a team applying custom data structures — Queue, BST, Set, List — to a real booking workflow.",
        "meta": "Data Structures coursework · team project",
        "image": "D:\\junha\\TARUMTResorts\\ui\\Screenshot 2026-09-02 015706.png",
        "github": "https://github.com/Hao0819/TARUMTResorts",
        "tags": [
            "Java",
            "Data Structures",
            "OOP"
        ]
    },
    {
        "category": "Coursework & personal builds",
        "title": "Student Performance Prediction",
        "repo": "student-performance-prediction",
        "description": "Compared KNN, Decision Tree, and Logistic Regression with scikit-learn to predict academic performance from a real student-factors dataset. Logistic Regression performed best, with attendance rate and study hours the strongest signals.",
        "meta": "AI/ML coursework · 3-person team",
        "image": "C:\\Users\\junha\\Machine-Learning-Supervised---Student-Academic-Performance-Prediction\\interface\\Screenshot 2026-09-02 020212.png",
        "github": "https://github.com/Hao0819/Machine-Learning-Supervised---Student-Academic-Performance-Prediction",
        "tags": [
            "Python",
            "scikit-learn",
            "Machine Learning"
        ]
    },
    {
        "category": "Coursework & personal builds",
        "title": "TicTacTalk",
        "repo": "tictactalk",
        "description": "Command-line event management system built with advanced C++ techniques, developed with a small team.",
        "meta": "Team project",
        "image": "C:\Users\junha\OneDrive\画像\Screenshots\Screenshot 2026-09-02 022059.png",
        "github": "https://github.com/51-Shenn/tictactalk",
        "tags": [
            "C++",
            "CLI"
        ]
    },
    {
        "category": "Coursework & personal builds",
        "title": "PetHub",
        "repo": "pethub",
        "description": "Android application built as part of a team — a pet care and management app. See the repository for full details.",
        "meta": "Mobile development · team project",
        "image": "D:\\junha\\Pictures\\6104693054150218354.jpg",
        "github": "https://github.com/Estrella0407/PetHub",
        "tags": [
            "Kotlin",
            "Android"
        ]
    }

];

// ---------------------------------------------------------------------------
// 下面这两个是原本的个人小项目，被实习作品取代了（名字容易和实习的 EBQ 项目搞混）。
// 想放回去的话，把它们剪下来贴回上面那个 [ ] 里面就行。
//
// {
//     "category": "Coursework & personal builds",
//     "title": "MQTT Manbo",
//     "repo": "mqtt-manbo",
//     "description": "MQTT-based messaging experiment exploring publish/subscribe communication between devices.",
//     "meta": "Personal build",
//     "image": "",
//     "github": "https://github.com/Hao0819/MQTT-manbo",
//     "tags": ["JavaScript", "MQTT", "IoT"]
// },
// {
//     "category": "Coursework & personal builds",
//     "title": "EBQ Control WiFi",
//     "repo": "ebqcontrol-wifi",
//     "description": "WiFi-based device control project for driving hardware over a local network.",
//     "meta": "Personal build",
//     "image": "",
//     "github": "https://github.com/Hao0819/EBQControl_Wifi",
//     "tags": ["JavaScript", "WiFi", "Hardware"]
// },
// ---------------------------------------------------------------------------
