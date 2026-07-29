// UpLift App Logic


const app = document.getElementById("app");




// =====================
// SETTINGS FUNCTIONS
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
// COMPLETE WORKOUT
// =====================


function completeWorkout(workoutName) {


    if (!userData.completedWorkouts.includes(workoutName)) {


        userData.completedWorkouts.push(workoutName);


        const workout = workoutTypes[workoutName];


        if (workout) {


            addXP(workout.xp);



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


        }



        userData.workoutsCompleted++;


        checkBadges();


        saveUserData();


    }


    showPage("training");


}






// =====================
// SHOW PAGES
// =====================


function showPage(page) {


    let content = "";





    // HOME

    if (page === "home") {


        content = `


        <h1>💖 UpLift</h1>


        <h2>🏠 Home</h2>


        <div class="card">

        <h3>⭐ Level ${userData.level}</h3>

        <p>${userData.xp}/${userData.xpToNextLevel} XP</p>

        </div>



        <div class="card">

        <h3>🔥 Daily Streak</h3>

        <p>${userData.streak} Days</p>

        </div>



        <div class="card">

        <h3>💪 Workouts Completed</h3>

        <p>${userData.workoutsCompleted}</p>

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


        let workout;




        if (userData.mode === "Vacation") {


            content = `


            <h1>🤍 Vacation Workout</h1>


            <div class="card">


            ${vacationWorkouts.workout.map(item => `


            <p>

            <button onclick="completeWorkout('${item}')">


            ${userData.completedWorkouts.includes(item) ? "✅" : "☐"}

            ${item}


            </button>


            </p>


            `).join("")}


            </div>


            `;


        }



        else {



            workout = dailyWorkouts[today];



            content = `


            <h1>💪 Training</h1>


            <h2>Today's Workout: ${today}</h2>



            <div class="card">


            <h3>🌅 Morning</h3>


            ${workout.morning.map(item => `


            <p>

            <button onclick="completeWorkout('${item}')">


            ${userData.completedWorkouts.includes(item) ? "✅" : "☐"}

            ${item}


            </button>

            </p>


            `).join("")}


            </div>






            <div class="card">


            <h3>

            🌙 Nighttime

            ${userData.mode === "Period" ? "(Optional)" : ""}


            </h3>



            ${workout.nighttime.map(item => `


            <p>

            <button onclick="completeWorkout('${item}')">


            ${userData.completedWorkouts.includes(item) ? "✅" : "☐"}

            ${item}


            </button>


            </p>


            `).join("")}


            </div>


            `;

        }


    }








    // BADGES

    if (page === "badges") {


        content = `


        <h1>🏅 Badge Gallery</h1>


        <div class="badge-gallery">


        ${Object.keys(badges).map(badge => {


            const unlocked = userData.unlockedBadges.includes(badge);



            return `


            <div class="badge-card ${unlocked ? "unlocked" : "locked"}">


            <h2>${unlocked ? badges[badge].icon : "🔒"}</h2>


            <h3>${badges[badge].name}</h3>


            <p>${badges[badge].description}</p>


            </div>


            `;


        }).join("")}


        </div>


        `;


    }








    // PROFILE

    if (page === "profile") {


        content = `


        <h1>👤 Profile</h1>


        <div class="card">


        <p>⭐ Level: ${userData.level}</p>

        <p>XP: ${userData.xp}/${userData.xpToNextLevel}</p>

        <p>🔥 Streak: ${userData.streak}</p>

        <p>💪 Total Workouts: ${userData.workoutsCompleted}</p>


        <hr>


        <p>🔥 Core: ${userData.coreWorkouts || 0}</p>

        <p>💪 Strength: ${userData.strengthWorkouts || 0}</p>

        <p>🤸 Flexibility: ${userData.flexibilitySessions || 0}</p>

        <p>🏋️ Backspot: ${userData.backspotWorkouts || 0}</p>


        </div>


        `;


    }








    // SETTINGS

    if (page === "settings") {


        content = `


        <h1>⚙️ Settings</h1>



        <div class="card">


        <h3>🌈 App Mode</h3>



        <button class="mode-button" onclick="changeMode('Regular')">

        💖 Regular Mode

        </button>



        <button class="mode-button" onclick="changeMode('Vacation')">

        🤍 Vacation Mode

        </button>



        <button class="mode-button" onclick="changeMode('Period')">

        ❤️ Period Mode

        </button>



        <p>

        Current Mode: ${userData.mode}

        </p>


        </div>






        <div class="card">


        <h3>🥗 Nutrition Support</h3>


        <label>


        <input type="checkbox"

        ${userData.arfidSupport ? "checked" : ""}

        onclick="toggleARFID()">



        ARFID Support Feature


        </label>


        </div>







        <div class="card">


        <h3>💾 Data</h3>


        <button onclick="resetProgress()">

        Reset Progress

        </button>


        </div>


        `;


    }







    app.innerHTML = content + `


    <div class="bottom-nav">


    <button onclick="showPage('home')">

    🏠<br>Home

    </button>



    <button onclick="showPage('training')">

    💪<br>Training

    </button>



    <button onclick="showPage('badges')">

    🏅<br>Badges

    </button>



    <button onclick="showPage('profile')">

    👤<br>Profile

    </button>



    <button onclick="showPage('settings')">

    ⚙️<br>Settings

    </button>



    </div>


    `;

}




applyTheme();


showPage("home");
