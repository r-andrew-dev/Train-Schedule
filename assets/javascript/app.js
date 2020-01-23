
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
    const trainName = $("#train-input").val().trim();
    const destination = $("#destination-input").val().trim();
    const firstTrainTime = $("#train-time-input").val().trim();
    const frequency = $("#frequency-input").val().trim();

    // creating temporary local object for holding data to push to firebase
    const newTrain = {
        train: trainName,
        destination: destination,
        time: firstTrainTime,
        frequency: frequency, 
    };

    // pushes object to database.
    db.ref().push(newTrain);
    // updates text next to submit button
    $("#train-added").text("Train added!");
    // sets a function to remove text after five seconds.
    setTimeout(removeText, 5000);

    // clears all the text boxes
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");

});







