const bookschema = require("../../module/book.schema");
const Payschema = require("../../module/cash.schema");
const lodash = require("lodash");

const getPaymenetList = async (req, res) => {
  try {
    let bookid = req.params.bookId;
    let userId = req.decodeToken.user;
    let queryData = req.query;
    let tempQuery = {};

    //🔎🔎🔎 filtering here ------------------------------------
    if (Object.keys(queryData).length > 0) {
      // for category
      if (queryData.category) {
        tempQuery.category = {
          $in: queryData.category,
        };
      }

      // for type
      if (queryData.type) {
        tempQuery.type = {
          $in: queryData.type,
        };
      }

      // for type
      if (queryData.paymentType) {
        tempQuery.paymentType = {
          $in: queryData.paymentType,
        };
      }

      //for amount range >xx<
      if (queryData.amount) {
        if (Array.isArray(queryData.amount)) {
          tempQuery.amount = {
            $gte: Number(queryData.amount[0]),
            $lte: Number(queryData.amount[1]),
          };
        } else {
          tempQuery.amount = {
            $gte: Number(queryData.amount),
          };
        }
      }

      //for date range >xx<
      if (queryData.date) {
        if (Array.isArray(queryData.date)) {
          tempQuery.date = {
            $gte: new Date(queryData.date[0]).getTime(),
            $lte: new Date(queryData.date[1]).getTime(),
          };
        } else {
          tempQuery.date = new Date(queryData.date).getTime();
        }
      }
    }

    //getting book detail by query
    let bookidverify = await bookschema
      .findOne({
        _id: bookid,
        isDeleted: false,
        userId: userId,
      })
      .select({
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      })
      .catch((err) => null);
    if (!bookidverify)
      return res.status(404).send({
        status: false,
        message: "No Book found",
      });

    tempQuery.bookId = bookid;
    tempQuery.userId = userId;
    tempQuery.isDeleted = false;

    let paymentList = await Payschema.find(tempQuery).sort([
      ['date', -1]
    ]).select({
      userId: 0,
      bookid: 0,
      isDeleted: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });

    const inData = paymentList
      .filter((x) => (x.type == "IN" ? true : false))
      .map((x) => x.amount);
    const outData = paymentList
      .filter((x) => (x.type == "OUT" ? true : false))
      .map((x) => x.amount);

    let inAmount = lodash.sum(inData);
    let outAmount = lodash.sum(outData);
    let total = Math.floor((inAmount - outAmount) * 100) / 100;

    let [...sortedAmount] = new Set([...inData, ...outData])


    //object to make list of payments[out]
    let output = {
      timeStamp: bookidverify.timeStamp,
      _id: bookidverify._id,
      name: bookidverify.name,
      userId: bookidverify.userId,
      remark: bookidverify.remark,
      isDeleted: bookidverify.isDeleted,
      inAmount,
      outAmount,
      total,
      paymentList
    };

    res.status(200).send({
      status: true,
      data: output,
    });
  } catch (er) {
    console.log(er);
    res.status(500).send(er.message);
  }
};
module.exports = getPaymenetList;