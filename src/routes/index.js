const receive = require("../controllers/receive");
const send = require("../controllers/send");

//const auth = require("../middleware/auth");

module.exports = (app) => {
  // app.use("/send", send);
  // app.use("/receive", receive);
  //app.use("/simpletest", send.simpleTest);
  app.use("/send", send.sendTest);
  //const models = require("../models");
  // app.use("/api/getQuery", query.getQuery);
  // app.use("/api/managerreplacelist", auth, proc.managerReplacelist);
  // app.use("/api/managerworkbydateandroute", proc.getWorkbyManager);
  // app.use("/api/findshiftthismonth/:routeId/:date", proc.findShiftThisMonth);
  // app.use(
  //   "/api/leavedatebydriver/:routeId/:shift/:yearMonth",
  //   proc.leaveDateByDriver
  // );
  // app.use(
  //   "/api/leaveSummaryByDriver/:routeId/:date",
  //   auth,
  //   proc.leaveSummaryByDriver
  // );
  // app.use(
  //   "/api/dailybusnumworknumyearmonth/:routeId/:yearMonth",
  //   auth,
  //   proc.dailyBusnumWorknumYearMonth
  // );
  // app.use(
  //   "/api/scheduleperiodfind/:routeId/:yearMonth",
  //   proc.schedulePeriodFind
  // );
  // app.use("/api/dispatchlist/:routeId/:datetime", auth, proc.dispatchList);
  // app.use("/api/dispatchlist1/:routeId/:datetime", auth, proc.dispatchList1);
  // app.use(
  //   "/api/routelistbymanager/:placeId/:datetime",
  //   auth,
  //   proc.routeListByManager
  // );
  // app.use("/api/user/:id", proc.userDetail);
  // app.use(
  //   "/api/rest/driver/:yearMonth",
  //   auth,
  //   query.getRestbyDriverAndYearmonth
  // );
  // app.use(
  //   "/api/rest/manager/:yearMonth/:routeId",
  //   auth,
  //   query.getRestbyManagerAndYearmonth
  // );
  // //app.use("/api/tutorial", ctr_tutorial(models.tutorial));
  // app.use("/api/notice", auth, ctr_notice(models.notice));
  // app.use("/api/alert", auth, ctr_alert(models.alert));
  // app.use("/api/log", log.queryLog);
  // app.use("/api/logresult", logresult.swaggerMaker);
  // app.use("/api/buslocation/:routeId", busLocation.getBusLocation);
  // app.use(
  //   "/api/buslocationedge/:routeId/:cdate",
  //   busLocation.getBusLocationEdge
  // );
  // app.use("/api/checkbusarrival", busLocation.checkBusArrival);
  // app.use("/api/busEdge/:routeId", busLocation.getBusLocationEdge);
  // app.use("/api/cronStop", cronJob.cronStop);
  // app.use("/api/cronStart", cronJob.cronStart);
  // app.use("/api/motionAnalysis/:routeId/:yearMonth", auth, proc.motionAnalysis);
};
