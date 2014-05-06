var arDrone = require('ar-drone');
var client = arDrone.createClient();

// console.log(client);

// client.takeoff();

// client
//     .after(5000, function() {
//         this.clockwise(0.5);
//     })
//     .after(3000, function() {
//         this.stop();
//         this.land();
//     });

client.on('navdata', function(data) {
    // x,y,z
    // pitch,roll,yaw
    var model;
    if(data.demo)
        model = {
            roll: data.demo.rotation.roll,
            pitch: data.demo.rotation.pitch,
            yaw: data.demo.rotation.yaw,
            x: data.demo.velocity.x,
            y: data.demo.velocity.y,
            z: data.demo.velocity.z
        };
    console.log(data.demo);
});

process.on('SIGINT', function() {
    console.log("Killing flight");
    process.exit(0);
    client.land(function() {
        process.exit(0);
    })
});
