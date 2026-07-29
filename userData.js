// UpLift User Data System


let userData = {


    xp: 0,

    level: 1,

    xpToNextLevel: 500,


    streak: 0,


    workoutsCompleted: 0,


    checklistCompleted: 0,


    completedWorkouts: [],


    unlockedBadges: [],


    lastWorkoutDate: null,


    // Workout Categories

    coreWorkouts: 0,

    strengthWorkouts: 0,

    backspotWorkouts: 0,

    jumpSessions: 0,

    flexibilitySessions: 0,

    lowerBodyWorkouts: 0,

    upperBodyWorkouts: 0,


    // Settings

    mode: "Regular",

    arfidSupport: false

};





function saveUserData() {


    localStorage.setItem(

        "upliftData",

        JSON.stringify(userData)

    );


}





function loadUserData() {


    const savedData = localStorage.getItem("upliftData");


    if (savedData) {


        userData = {

            ...userData,

            ...JSON.parse(savedData)

        };


    }


}





function addXP(amount) {


    userData.xp += amount;



    while (userData.xp >= userData.xpToNextLevel) {


        userData.xp -= userData.xpToNextLevel;


        userData.level += 1;


        userData.xpToNextLevel = Math.floor(

            userData.xpToNextLevel * 1.25

        );


        alert(

            "🎉 Level Up! You reached Level " + userData.level

        );


    }



    saveUserData();


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





loadUserData();
