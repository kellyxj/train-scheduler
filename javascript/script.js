//Initializing firebase
var firebaseConfig = {
    apiKey: "AIzaSyAY0xyra_GAcE1wal7SrAzkQlweeWEV3Hs",
    authDomain: "bootcamp-2b209.firebaseapp.com",
    databaseURL: "https://bootcamp-2b209.firebaseio.com",
    projectId: "bootcamp-2b209",
    storageBucket: "",
    messagingSenderId: "778638094382",
    appId: "1:778638094382:web:81ab3bbe83156821"
};
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

//Holds train objects
const trains = [];

function makeTrain(tName, tDest, tFreq, tFirst) {
    const train = {
        name: tName,
        dest: tDest,
        freq: tFreq,
        first: tFirst,
        //returns, as minutes the amount of time until the next train arrives
        getMinsToArrival() {
            let firstTime = moment().set("hour",this.first.substring(0,2)).set("minute", this.first.substring(3));
            let duration = moment.duration(moment().diff(firstTime));
            return this.freq - (Math.floor(duration.asMinutes()) % this.freq);
        }
    }
    trains.push(train);
}

//This function will be called whenever a train is added or removed. It will add the contents of the trains array to HTML.
//It will also be called once per second to ensure that the "minutes away" column of the table is updated in real time.
function updateTable() {
    $("#trains").empty();
    for(i = 0; i < trains.length; i++) {
        const row = $("<tr>");
        const trainName = $("<td>");
        const trainDest = $("<td>");
        const trainFreq = $("<td>");
        const nextArrival = $("<td>");
        const minutesAway = $("<td>");
        trainName.text(trains[i].name);
        trainDest.text(trains[i].dest);
        trainFreq.text(trains[i].freq);
        nextArrival.text(moment().add(trains[i].getMinsToArrival(),"minutes").format("HH:mm"));
        minutesAway.text(trains[i].getMinsToArrival());
        row.append(trainName, trainDest, trainFreq, nextArrival, minutesAway);
        $("#trains").append(row);
    }
}

$(document).ready(() => {
    $("#submit").on("click", (e) => {
        e.preventDefault();
        database.ref().push({
            name: $("#trainName").val(),
            destination: $("#dest").val(),
            frequency: $("#freq").val(),
            firstTime: $("#firstTime").val()
        });
    });
    database.ref().on("child_added", (snapshot) => {
        makeTrain(snapshot.val().name, snapshot.val().destination, snapshot.val().frequency, snapshot.val().firstTime);
        updateTable();
    });
    setInterval(() => {
        if(moment().seconds() == 0)
        {
            updateTable();
        }
    }, 1000);
});