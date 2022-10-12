/*
재사용가능 mongoose CRUD 기능과 model처리
재사용가능한 CRUD는 ./controller/reuseCRUD.js
모든 모델을 한곳에서 처리함 ./model/models.js
*/

const crud = require("../controllers/reuseCRUD");

// const models = require("../models");
// const auth = require("../middleware/auth");
// const moment = require("moment");

module.exports = (app) => {
  //  const models = require("../models");
  //for project router
  const removes = []; //crud기본에서 제외할 custom router
  const auths = []; //middleware auth 추가할 entity
  const models = [];
  Object.keys(models).map((k, i) => {
    if (removes.indexOf(k) === -1) {
      if (auths.indexOf(k) === -1) {
        app.use(`/api/${k}`, modifyData(k), crud(models[k]));
      } else app.use(`/api/${k}`, auth, modifyData(k), crud(models[k]));
    }
  });
};

/**
  entitiy별로 별도의 가공이 필요한 경우 사용하는 middleware
 */
const modifyData = (modelname) => {
  return function (req, res, next) {
    switch (modelname) {
      case "stopworking":
        //update
        if (req.method === "PUT") {
          req.body.updated_at = Date.now();
        }
        //create
        else if ((req.method = "POST")) {
          req.body.created_at = Date.now();
          req.body.updated_at = null;
        }
        next();
        break;
      case "rest":
        //update or insert: 해당일의 휴무가능일수가 >0인지를 체크
        console.log(req.method);

        if (["POST", "PUT"].indexOf(req.method) === -1) next();
        else {
          let replacement = {
            driverId: req.id,
            routeId: req.body.routeId,
            restdate: req.body.date,
          };
          models["rest"].sequelize
            .query("CALL leave_date_confirm(:driverId, :routeId, :restdate)", {
              replacements: replacement,
              type: models.sequelize.QueryTypes.SELECT,
            })
            .then(function (resp) {
              if (resp[0][0].offnum != null && resp[0][0].offnum <= 0)
                res.send("인원초과 ! 다른날을 선택하세요.");
              else next();
            })
            .catch((err) => {
              console.log(err);
              res.err("에러나서 진행이 안됩니다.");
            });
        }
        break;
      case "bus":
        if (req.method === "DELETE")
          res.send("차량정보 삭제금지 update로 isrun=0로 변경하세요.");
        else next();
        break;
      case "work":
        switch (req.method) {
          case "GET":
            console.log("get,get,get", req.params);
            if (Object.keys(req.params).length > 0)
              query.getWorkAddShift(req, res);
            else next();
            break;
          // case "POST":
          //   break;
          default:
            next();
        }
        break;
      case "motionCapture":
        switch (req.method) {
          case "POST":
            req.body.detectionTime = moment(req.body.detectionTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            console.log("post,post", req.body.detectionTime);
            next();
            // if (Object.keys(req.params).length > 0)
            //   query.getWorkAddShift(req, res);
            // else next();
            break;

          default:
            next();
        }
        break;
      default:
        next();
        break;
    }
  };
};
