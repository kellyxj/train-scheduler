//Holds train objects
const trains = [];

function makeTrain(tName, tDest, tFreq, tFirst) {
    const train = {
        name: tName,
        dest: tDest,
        freq: tFreq,
        first: tFirst,
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
        makeTrain($("#trainName").val(),$("#dest").val(),$("#freq").val(),$("#firstTime").val());
        updateTable();
    });
    setInterval(() => {
        if(moment().seconds() == 0)
        {
            updateTable();
        }
    }, 1000);
});