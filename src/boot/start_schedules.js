"use strict";
// ┌────────────── second (0 - 59, OPTIONAL)
// │ ┌──────────── minute (0 - 59)
// │ │ ┌────────── hour (0 - 23)
// │ │ │ ┌──────── day of month (1 - 31)
// │ │ │ │ ┌────── month (1 - 12)
// │ │ │ │ │ ┌──── day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *
//
// * * * * * * --- Every second.
// */2 * * * * * --- Every 2 seconds.
// 0 2 * * * --- 2am daily. This will be useful for scheduling
// database backup on a daily basis. 0 5,17 * * * --- Twice a day. At
// 5 AM and 5 PM daily. You can specify multiple time stamp by comma
// separated. * * * * * --- Every minutes. 0 17 * * sun --- Every
// Sunday at 5 PM. */10 * * * * --- Every 10 minutes. * * *
// jan,may,aug * --- Execute on selected months. Sometimes we
// required scheduling a task to be executed for selected months
// only. 0 17 * * sun,fri --- execute on selected days, run on each
// Sunday and Friday at 5 PM.  More examples:
// https://github.com/kelektiv/node-cron/tree/master/examples
Object.defineProperty(exports, "__esModule", { value: true });
const print_helper_1 = require("@mosteast/print_helper");
const CronJob = require('cron').CronJob;
function start_schedules() {
    print_helper_1.print_verbose('* start_schedules');
    // todo:
    // secondly()
}
exports.start_schedules = start_schedules;
function secondly() {
    new CronJob('* * * * * *', () => {
        // This will run every second.
    }, null, true);
}
//# sourceMappingURL=start_schedules.js.map