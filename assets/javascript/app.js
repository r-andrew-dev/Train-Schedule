$(document).ready(function() {

removeText()

// web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyCJADMYgWX5sj_Bc2KAo8Lxd1JBHxLRTfM",
    authDomain: "train-scheduler-a8f1e.firebaseapp.com",
    databaseURL: "https://train-scheduler-a8f1e.firebaseio.com",
    projectId: "train-scheduler-a8f1e",
    storageBucket: "train-scheduler-a8f1e.appspot.com",
    messagingSenderId: "1074058844849",
    appId: "1:1074058844849:web:9d23134db9fb5f17196090"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const db = firebase.database()

function removeText() {
    $("#train-added").text("");
}


// submit button for adding train info.
$("#submit").on("click", function(event) {
    event.preventDefault();

    // grabbing user inputs 
    let trainName = $("#train-input").val().trim();
    let destination = $("#destination-input").val().trim();
    let firstTrainTime = $("#train-time-input").val().trim();
    let frequency = $("#frequency-input").val().trim();

    if (trainName.length === 0 || destination.length === 0 || firstTrainTime.length < 5 || firstTrainTime.charAt(0) > 2 || frequency.length === 0) {

        $("#train-added").text("Please complete all fields appropriately.");
    }

    // creating temporary local object for holding data to push to firebase
    else {
        
        const newTrain = {
        train: trainName,
        destination: destination,
        time: firstTrainTime,
        frequency: frequency, 
    };

    // pushes object to database.
    db.ref().push(newTrain);

}

});

db.ref().on("child_added", function(childSnapshot) {

    // store everything into a variable 
    let trainName = childSnapshot.val().train;
    let destination = childSnapshot.val().destination;
    let firstTrainTime = childSnapshot.val().time;
    let frequency = childSnapshot.val().frequency;

    // subtracts a year from first time to ensure it comes before current time
    const firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");

    // Using moment capturing current time
    const currentTime = moment();

    // getting the differece between now and provided train time.
    const timeDiff = moment().diff(moment(firstTimeConverted), "minutes");

    // dividing the differece between now and provided train time by the frequency to get the time apart. 
    const timeApart = timeDiff % frequency;
   
    // minutes away 
    const minutesUntilTrain = frequency - timeApart;

    // time to next train 
    const nextArrival = moment().add(minutesUntilTrain, "minutes").format("hh:mm")

    // create the new row 
    const newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesUntilTrain),
      );

      $("#train-schedule > tbody").append(newRow);

     // updates text next to submit button
    $("#train-added").text("Train added!");
    // sets a function to remove text after five seconds.
    setTimeout(removeText, 3000);

    // clears all the text boxes
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");

    });

});











