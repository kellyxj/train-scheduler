//Holds train objects
const trains = [];

function makeTrain(tName, tDest, tFreq, tFirst) {
    const train = {
        name: tName,
        dest: tDest,
        freq: tFreq,
        first: tFirst,
        getMinsToArrival() {
            let firstTime = moment().set("hour",this.first.substring(0,2)).set("minute", this.first.substring(4));
            let duration = moment.duration(moment().diff(firstTime));
            return this.freq - (Math.floor(duration.asMinutes()) % this.freq);
        }
    }
}

//This function will be called whenever a train is added or removed. It will add the contents of the trains array to HTML.
//It will also be called once per second to ensure that the "minutes away" column of the table is updated in real time.
function updateTable() {
    for(i = 0; i < trains.length; i++) {
        
    }
}

$(document).ready(() => {
    $("#submit").on("click", (e) => {
        e.preventDefault();

    });
});