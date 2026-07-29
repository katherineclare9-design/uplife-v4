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



    // CATEGORIES

    coreWorkouts: 0,

    strengthWorkouts: 0,

    backspotWorkouts: 0,

    flexibilitySessions: 0,

    lowerBodyWorkouts: 0,

    upperBodyWorkouts: 0,

    jumpSessions: 0,


};





function saveUserData() {

    localStorage.setItem(

        "upliftData",

        JSON.stringify(userData)

    );

}





function resetProgress() {


    const confirmReset = confirm(

        "Resetting your progress will erase any and all completed workouts or recent badge history"

    );


    if (confirmReset) {


        localStorage.removeItem("upliftData");


        location.reload();


    }


}
