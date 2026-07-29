let userData = JSON.parse(localStorage.getItem("upliftData")) || {

    // PROFILE (NEVER RESET)

    profileCreated: false,
    profileName: "",
    athleteType: "",
    goal: "",
    profileDate: "",


    // SETTINGS (NEVER RESET)

    mode: "Regular",
    arfidSupport: false,


    // PROGRESS

    xp: 0,
    level: 1,
    xpToNextLevel: 100,

    streak: 0,

    workoutsCompleted: 0,


    // SAVED CHECKS

    completedToday: [],


    // BADGES

    unlockedBadges: [],


    // CATEGORIES

    coreWorkouts: 0,
    strengthWorkouts: 0,
    backspotWorkouts: 0,
    flexibilitySessions: 0,
    lowerBodyWorkouts: 0,
    upperBodyWorkouts: 0,
    jumpSessions: 0

};



function saveUserData(){

    localStorage.setItem(
        "upliftData",
        JSON.stringify(userData)
    );

}



function resetProgress(){


    if(!confirm(
        "Reset progress only? Your profile and settings will stay."
    )) return;



    userData.xp = 0;

    userData.level = 1;

    userData.xpToNextLevel = 100;

    userData.streak = 0;

    userData.workoutsCompleted = 0;

    userData.completedToday = [];

    userData.unlockedBadges = [];

    userData.coreWorkouts = 0;

    userData.strengthWorkouts = 0;

    userData.backspotWorkouts = 0;

    userData.flexibilitySessions = 0;

    userData.lowerBodyWorkouts = 0;

    userData.upperBodyWorkouts = 0;

    userData.jumpSessions = 0;



    saveUserData();

    location.reload();

}
