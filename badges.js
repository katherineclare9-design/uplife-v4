// UpLift Badge System


const badges = {


    firstStep: {

        name: "First Step",

        icon: "🌱",

        description: "Complete your first workout",

        category: "Getting Started"

    },


    coreStarter: {

        name: "Core Starter",

        icon: "🔥",

        description: "Complete 5 core workouts",

        category: "Core"

    },


    strengthStarter: {

        name: "Strength Starter",

        icon: "💪",

        description: "Complete 5 strength workouts",

        category: "Strength"

    },


    consistency: {

        name: "3 Day Flame",

        icon: "🔥",

        description: "Complete workouts for 3 days",

        category: "Consistency"

    }


};





function checkBadges() {


    if (

        userData.workoutsCompleted >= 1 &&

        !userData.unlockedBadges.includes("firstStep")

    ) {


        userData.unlockedBadges.push("firstStep");


        alert(

            "🎉 Badge Unlocked!\n\n🌱 First Step"

        );


    }



    saveUserData();


}
