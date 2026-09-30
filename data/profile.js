// 个人资料 — 改这个文件就能更新侧边栏、简介、技能、联系方式
// 注意：不要删掉最上面那行 window.PORTFOLIO_DATA... 和最后的分号
window.PORTFOLIO_DATA = window.PORTFOLIO_DATA || {};

window.PORTFOLIO_DATA.profile = {
    "name": "Lim Jun Hao",
    "handle": "Hao0819",
    "title": "Software Engineering Student",

    // 首屏那行会循环打字的头衔 — 第一、二条跟 GitHub profile README 的标语一致
    "roles": [
        "Software Engineering Student",
        "Mobile App Developer",
        "Flutter & React Native",
        "Heading toward backend"
    ],

    // 名字下面那段自我介绍 — 每个元素是一行，保持简短
    // 跟 GitHub profile README 的措辞一致，别单独改这里
    "bio": [
        "Software engineering student at TARUMT.",
        "I build mobile apps that talk to hardware, and I'm heading toward backend engineering."
    ],

    "availability": "Open to internships and junior software engineering roles",

    // 侧边栏那几行 meta
    "location": "Kuala Lumpur, Malaysia",
    "school": "TARUMT",
    "targetRole": "Backend / Software Engineer",

    "contact": {
        "email": "junhao060103@gmail.com",
        "phone": "+60 16-700-6299",
        "linkedin": "junhao0819",
        "github": "Hao0819"
    },

    "skills": [
        {
            "category": "Languages",
            "technologies": "Java, Dart, Python, TypeScript, JavaScript, C++, Kotlin"
        },
        {
            "category": "Mobile",
            "technologies": "Flutter, React Native, Android Studio, Jetpack Compose"
        },
        {
            "category": "Backend & Data",
            "technologies": "Data structures & algorithms, OOP design, Oracle SQL, Hive, Firebase, scikit-learn"
        },
        {
            "category": "Device & Protocols",
            "technologies": "BLE, Wi-Fi, MQTT, OTA firmware updates"
        },
        {
            "category": "Tools",
            "technologies": "Git, Riverpod, Figma, VS Code, IntelliJ IDEA, Android Studio"
        }
    ]
};
