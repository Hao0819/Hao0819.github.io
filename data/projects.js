// 作品集 — 改这个文件就能增删项目
//
// 文案规则（保持一致，别打破）：2–3 句，35–55 词，主动语态，只写事实。
//
// category  分组名（同一个 category 的排在一起，按第一次出现的顺序）
// pinned    true = 出现在最上面的 Pinned 区（建议最多 6 个）
// language  主语言，决定语言小圆点的颜色（见 projects-loader.js 的 LANGUAGE_COLORS）
//           留空字符串 = 不显示圆点
// github    留空 = 不显示链接，标记为 Private
window.PORTFOLIO_DATA = window.PORTFOLIO_DATA || {};

window.PORTFOLIO_DATA.projects = [

    // ---------- 实习作品 ----------
    {
        "category": "Internship — Deng Kai Sdn Bhd, R&D",
        "title": "EBQ Control Hybrid",
        "repo": "ebq-control-hybrid",
        "description": "Cross-platform React Native app that controls EBQ devices over BLE for local access and MQTT for cloud access. Provides real-time current readings, device configuration, scene control, a multi-language interface and BLE OTA firmware updates. Contributed feature development and tested the BLE/MQTT switching behaviour.",
        "meta": "Jan – May 2026 · React Native",
        "language": "",
        "pinned": true,
        "image": "",
        "github": "",
        "tags": ["React Native", "BLE", "MQTT", "OTA"]
    },
    {
        "category": "Internship — Deng Kai Sdn Bhd, R&D",
        "title": "BLE ChangeOver",
        "repo": "ble-changeover",
        "description": "React Native app for monitoring and controlling the MyStarChangeOver automatic transfer switch over BLE. Provides real-time voltage and current readings across three channels, configurable protection thresholds, Arabic language support and BLE packet inspection. Handled development, testing and debugging, and verified app-to-hardware communication.",
        "meta": "Jan – May 2026 · React Native",
        "language": "TypeScript",
        "pinned": true,
        "image": "",
        "github": "",
        "tags": ["React Native", "BLE", "Embedded"]
    },
    {
        "category": "Internship — Deng Kai Sdn Bhd, R&D",
        "title": "EBQ Control Wi-Fi",
        "repo": "ebq-control-wifi",
        "description": "Mobile app for monitoring and controlling EBQ devices over Wi-Fi, so users can operate hardware remotely without a Bluetooth connection. Worked on feature development, interface improvements, testing and debugging, and on stabilising communication between the app and the devices.",
        "meta": "Jan – May 2026 · Mobile",
        "language": "JavaScript",
        "pinned": false,
        "image": "",
        "github": "",
        "tags": ["Mobile", "Wi-Fi", "IoT"]
    },
    {
        "category": "Internship — Deng Kai Sdn Bhd, R&D",
        "title": "Meter Image Uploader",
        "repo": "meter-image-uploader",
        "description": "React Native app that uploads profile images and greeting text to an EBQ Meter's LCD display over BLE, converting images to hex data for transmission. Supports several upload modes, camera and gallery input, progress tracking, and retry logic when a transfer fails.",
        "meta": "Jan – May 2026 · React Native",
        "language": "JavaScript",
        "pinned": false,
        "image": "",
        "github": "",
        "tags": ["React Native", "BLE", "Image Processing"]
    },

    // ---------- 课业 & 个人项目 ----------
    {
        "category": "Coursework & personal builds",
        "title": "Music Player",
        "repo": "Music_Player",
        "description": "Offline audio player for Android, built with Flutter and Riverpod. The Hive database holds only folder-to-file links and a play log — titles, artwork and durations are read live from MediaStore, so a rescan never leaves stale data behind. Adds background playback, drag-to-reorder queues and collections built from play history.",
        "meta": "Personal build · Sep 2026",
        "language": "Dart",
        "pinned": true,
        "image": "",
        "github": "https://github.com/Hao0819/Music_Player",
        "tags": ["Flutter", "Dart", "Riverpod", "Hive"]
    },
    {
        "category": "Coursework & personal builds",
        "title": "Resort Management System",
        "repo": "TARUMTResorts",
        "description": "Built a generic linked-list Queue ADT in Java for a resort's walk-in registration module. Part of a team project applying custom data structures — Queue, BST, Set and List — to a real booking workflow rather than reaching for library collections.",
        "meta": "Data Structures coursework · team project",
        "language": "Java",
        "pinned": true,
        "image": "assets/resort-management.png",
        "github": "https://github.com/Hao0819/TARUMTResorts",
        "tags": ["Java", "Data Structures", "OOP"]
    },
    {
        "category": "Coursework & personal builds",
        "title": "Student Performance Prediction",
        "repo": "student-performance-prediction",
        "description": "Compared KNN, Decision Tree and Logistic Regression in scikit-learn to predict academic performance from a real student-factors dataset. Logistic Regression performed best, with attendance rate and study hours the strongest predictors. Built with a three-person team.",
        "meta": "AI/ML coursework · 3-person team",
        "language": "Python",
        "pinned": true,
        "image": "assets/student-performance.png",
        "github": "https://github.com/Hao0819/Machine-Learning-Supervised---Student-Academic-Performance-Prediction",
        "tags": ["Python", "scikit-learn", "Machine Learning"]
    },
    {
        "category": "Coursework & personal builds",
        "title": "Hotel Management System",
        "repo": "HotelManagementSystem",
        "description": "Console-based hotel management system in Java, written to practise object-oriented design. Covers guest, employee, room, booking, payment and housekeeping operations, each behind its own manager class, with Guest and Employee extending a shared abstract Person base.",
        "meta": "Java OOP · personal build",
        "language": "Java",
        "pinned": true,
        "image": "",
        "github": "https://github.com/Hao0819/HotelManagementSystem",
        "tags": ["Java", "OOP", "CLI"]
    },
    {
        "category": "Coursework & personal builds",
        "title": "TicTacTalk",
        "repo": "tictactalk",
        "description": "Talk-show event management system in C++, built with a small team. Serves speakers, customers and administrators across eight modules — event registration and approval, ticket booking, wishlists, self-service check-in, feedback and attendance reporting. All records persist to files, so nothing is lost when the program exits.",
        "meta": "C++ coursework · team project",
        "language": "C++",
        "pinned": false,
        "image": "assets/tictactalk.png",
        "github": "https://github.com/51-Shenn/tictactalk",
        "tags": ["C++", "CLI", "File I/O"]
    },
    {
        "category": "Coursework & personal builds",
        "title": "PetHub",
        "repo": "PetHub",
        "description": "Android app for a pet care business, built in Kotlin with Jetpack Compose and Firebase Firestore. Covers pet profiles, appointment booking across multiple branches, a service and product catalogue with cart and orders, and customer notifications. Built as a team project.",
        "meta": "Mobile development · team project",
        "language": "Kotlin",
        "pinned": false,
        "image": "assets/pethub.jpg",
        "github": "https://github.com/Estrella0407/PetHub",
        "tags": ["Kotlin", "Jetpack Compose", "Firebase"]
    }

];
