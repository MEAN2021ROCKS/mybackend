const query = require('../../../../../lib/commonQuerries');
const Categories = require('../model/categories');
const errorTypes = require('../../../../../lib/errorTypes');
const constObj = require('../../../../../lib/constant');

const createCategory = async (req, res) => {
  try {
    // required properties

    // Permission

    const insertIntoCollection = await query.insertIntoCollection(
      Categories,
      req.body
    )
    if (!insertIntoCollection.status) {
      return res.customError(errorTypes.errorTypes.INPUT, 'Unble to Save the Record');
    }
    parseResponse(req, res);
  } catch (error) {
    console.log(error);
  }
}

const parseResponse = async (req, res) => {
  const finalObj = {};
  finalObj.flowStatus = constObj.statusMessage.SUCCESS;
  finalObj.flowStatusMessage = 'Record Inserted Sucessfully';
  finalObj.result = {};
  return res.customResponse(finalObj, false);
}

module.exports = {
  createCategory
}
