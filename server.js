// var arDrone = require('ar-drone');
// var client = arDrone.createClient();

// // console.log(client);

// client.on('navdata', function(data) {
//     // x,y,z
//     // pitch,roll,yaw
//     var model;
//     if (data.demo)
//         model = {
//             roll: data.demo.rotation.roll,
//             pitch: data.demo.rotation.pitch,
//             yaw: data.demo.rotation.yaw,
//             x: data.demo.velocity.x,
//             y: data.demo.velocity.y,
//             z: data.demo.velocity.z
//         };
//     // console.log(data.demo);
// });

process.on('SIGINT', function() {
    console.log("Killing flight");
    process.exit(0);
    client.land(function() {
        process.exit(0);
    })
});


var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('/executePath', function(req, res) {
    var path = JSON.parse(req.query.path),
        width = JSON.parse(req.query.width),
        scale = JSON.parse(req.query.scale);

    console.log(width, scale);
    sendDrone();
    res.end();
});
var sendDrone = function(path) {
    var autonomy = require('ardrone-autonomy');
    var mission = autonomy.createMission();

    mission.takeoff()
        .zero() // Sets the current state as the reference
    .altitude(1) // Climb to altitude = 1 meter
    .forward(.2)
        .right(.2)
        .forward(2)
        .left(.2)
        .forward(1)
        .left(.2)
        .forward(.2)
        .forward(4)
        .hover(1000) // Hover in place for 1 second
    .land();

    mission.run(function(err, result) {
        if (err) {
            console.trace("Oops, something bad happened: %s", err.message);
            mission.client().stop();
            mission.client().land();
        } else {
            console.log("Mission success!");
            process.exit(0);
        }
    });

}



// mission.run(function(err, result) {
//     if (err) {
//         console.trace("Oops, something bad happened: %s", err.message);
//         mission.client().stop();
//         mission.client().land();
//     } else {
//         console.log("Mission success!");
//         process.exit(0);
//     }
// });

app.listen(3111);
