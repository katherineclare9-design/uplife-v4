const app = document.getElementById("app");


// =====================
// SETTINGS
// =====================


function changeMode(mode) {

    userData.mode = mode;

    saveUserData();

    applyTheme();

    showPage("settings");

}



function toggleARFID() {

    userData.arfidSupport = !userData.arfidSupport;

    saveUserData();

    showPage("settings");

}




function applyTheme() {


    document.body.className = "";


    if (userData.mode === "Regular") {

        document.body.classList.add("regular-theme");

    }


    if (userData.mode === "Vacation") {

        document.body.classList.add("vacation-theme");

    }


    if (userData.mode === "Period") {

        document.body.classList.add("period-theme");

    }

}





// =====================
// PROFILE
// =====================


function createProfile() {


    userData.profileName =
        document.getElementById("profileName").value;


    userData.athleteType =
        document.getElementById("athleteType").value;


    userData.goal =
        document.getElementById("goal").value;



    userData.profileDate =
        new Date().toLocaleDateString();



    userData.profileCreated = true;



    saveUserData();


    checkBadges();


    showPage("profile");


}







// =====================
// COMPLETE WORKOUT
// =====================


function completeWorkout(workoutName) {


    // Stops double clicking

    if (userData.completedToday.includes(workoutName)) {

        return;

    }



    // Save checkbox

    userData.completedToday.push(workoutName);



    // Lifetime count

    userData.workoutsCompleted++;



    // Find workout info

    const workout = workoutTypes[workoutName];



    if (workout) {


        addXP(workout.xp || 10);



        if (workout.category === "core") {

            userData.coreWorkouts++;

        }


        if (workout.category === "strength") {

            userData.strengthWorkouts++;

        }


        if (workout.category === "backspot") {

            userData.backspotWorkouts++;

        }


        if (workout.category === "flexibility") {

            userData.flexibilitySessions++;

        }


        if (workout.category === "lowerBody") {

            userData.lowerBodyWorkouts++;

        }


        if (workout.category === "upperBody") {

            userData.upperBodyWorkouts++;

        }


        if (workout.category === "jump") {

            userData.jumpSessions++;

        }


    }

    else {


        // Backup XP if workout type is missing

        addXP(10);


    }




    checkBadges();


    saveUserData();



    showPage("training");


}








// =====================
// PAGE DISPLAY
// =====================


function showPage(page) {


let content = "";





// HOME

if (page === "home") {


content = `


<h1>💖 FULL OUT</h1>


<div class="card">

<h3>⭐ Level ${userData.level}</h3>

<p>${userData.xp}/${userData.xpToNextLevel} XP</p>

</div>



<div class="card">

<h3>🔥 Streak</h3>

<p>${userData.streak} Days</p>

</div>


`;


}






// TRAINING

if (page === "training") {


const days = [

"Sunday",

"Monday",

"Tuesday",

"Wednesday",

"Thursday",

"Friday",

"Saturday"

];


const today = days[new Date().getDay()];





if (userData.mode === "Vacation") {


content = `


<h1>🤍 Vacation Workout</h1>


<div class="card">


${vacationWorkouts.workout.map(item => `


<button class="workout-button" onclick="completeWorkout('${item}')">


${userData.completedToday.includes(item) ? "✅" : "☐"}

${item}


</button>


<br><br>


`).join("")}



</div>


`;



}



else {



const workout = dailyWorkouts[today];



content = `


<h1>💪 Today's Workout</h1>

<h2>${today}</h2>



<div class="card">


<h3>🌅 Morning</h3>



${workout.morning.map(item => `


<button class="workout-button" onclick="completeWorkout('${item}')">


${userData.completedToday.includes(item) ? "✅" : "☐"}

${item}


</button>


<br><br>


`).join("")}


</div>





<div class="card">


<h3>

🌙 Nighttime

${userData.mode === "Period" ? "(Optional)" : ""}


</h3>



${workout.nighttime.map(item => `


<button class="workout-button" onclick="completeWorkout('${item}')">


${userData.completedToday.includes(item) ? "✅" : "☐"}

${item}


</button>


<br><br>


`).join("")}



</div>


`;



}


}








// PROFILE

if (page === "profile") {


if (!userData.profileCreated) {


content = `


<h1>👤 Create Your Profile</h1>


<div class="card">


<p>Name</p>

<input id="profileName">


<p>Athlete Type</p>


<select id="athleteType">

<option>Cheer Athlete</option>

<option>Strength Athlete</option>

<option>Flexibility Athlete</option>

</select>



<p>Main Goal</p>

<input id="goal">



<br><br>


<button onclick="createProfile()">

Save Profile

</button>


</div>


`;



}



else {



content = `


<h1>👤 Profile</h1>


<div class="card">


<h2>${userData.profileName}</h2>


<p>🤸 ${userData.athleteType}</p>


<p>🎯 ${userData.goal}</p>


<p>📅 Joined ${userData.profileDate}</p>


</div>




<div class="card">


<h3>📊 Training Stats</h3>


<p>🔥 Core: ${userData.coreWorkouts}</p>

<p>💪 Strength: ${userData.strengthWorkouts}</p>

<p>🏋️ Upper Body: ${userData.upperBodyWorkouts}</p>

<p>🦵 Lower Body: ${userData.lowerBodyWorkouts}</p>

<p>🤸 Backspot: ${userData.backspotWorkouts}</p>

<p>🩰 Flexibility: ${userData.flexibilitySessions}</p>

<p>⭐ Jumps: ${userData.jumpSessions}</p>


<hr>


<p>⭐ Level: ${userData.level}</p>

<p>XP: ${userData.xp}</p>

<p>🔥 Streak: ${userData.streak}</p>

<p>💪 Total Workouts: ${userData.workoutsCompleted}</p>


</div>


`;


}


}







// BADGES

if (page === "badges") {


content = `


<h1>🏅 Badge Gallery</h1>


<div class="badge-gallery">


${Object.keys(badges).map(badge => `


<div class="badge-card">


<h2>${badges[badge].icon}</h2>

<h3>${badges[badge].name}</h3>

<p>${badges[badge].description}</p>


</div>


`).join("")}


</div>


`;



}








// SETTINGS

if (page === "settings") {


content = `


<h1>⚙️ Settings</h1>



<div class="card">


<h3>🌈 App Mode</h3>


<button onclick="changeMode('Regular')">💖 Regular</button>


<button onclick="changeMode('Vacation')">🤍 Vacation</button>


<button onclick="changeMode('Period')">❤️ Period</button>


</div>




<div class="card">


<h3>🥗 Nutrition</h3>


<label>


<input type="checkbox"

${userData.arfidSupport ? "checked" : ""}

onclick="toggleARFID()">



ARFID Support Feature


</label>


</div>




<div class="card">


<button onclick="resetProgress()">

Reset Progress

</button>


</div>


`;



}








app.innerHTML = content + `


<div class="bottom-nav">


<button onclick="showPage('home')">🏠</button>

<button onclick="showPage('training')">💪</button>

<button onclick="showPage('badges')">🏅</button>

<button onclick="showPage('profile')">👤</button>

<button onclick="showPage('settings')">⚙️</button>


</div>


`;



}




applyTheme();

showPage("home");
