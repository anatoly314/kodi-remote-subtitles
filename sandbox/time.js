const moment = require('moment');
const ms = 1370665;

const duration = moment.duration(ms, 'milliseconds');
const duration1 = duration.clone().add(-10, 'seconds');

function print(duration) {
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    const milliseconds = duration.milliseconds();
    console.log(hours, minutes, seconds, milliseconds);
}

print(duration);
print(duration1);



