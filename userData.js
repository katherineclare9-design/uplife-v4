let userData = JSON.parse(localStorage.getItem("upliftData")) || {

    // PROFILE

    profileCreated: false,

    profileName: "",

    athleteType: "",

    goal: "",

    profileDate: "",


    // SETTINGS

    mode: "Regular",

    arfidSupport: false,


    // PROGRESS

    xp: 0,

    level: 1,

    xpToNextLevel: 100,

    streak: 0,


    workoutsCompleted: 0,


    completedWorkouts: [],


    unlockedBadges: [],



    // WORKOUT CATEGORIES

    coreWorkouts: 0,

    strengthWorkouts: 0,

    backspotWorkouts: 0,

    flexibilitySessions: 0,

    lowerBodyWorkouts: 0,

    upperBodyWorkouts: 0,

    jumpSessions: 0

};




// SAVE FUNCTION

function saveUserData() {

    localStorage.setItem(

        "upliftData",

        JSON.stringify(userData)

    );

}





// RESET ONLY STATS
// KEEPS PROFILE + SETTINGS

function resetProgress() {


    const confirmReset = confirm(

        "Resetting your progress will erase any and all completed workouts or recent badge history"

    );


    if (confirmReset) {


        userData.xp = 0;

        userData.level = 1;

        userData.xpToNextLevel = 100;


        userData.streak = 0;


        userData.workoutsCompleted = 0;


        userData.completedWorkouts = [];


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

}
