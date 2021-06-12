const bcrypt = require('bcryptjs'),
      salt = bcrypt.genSaltSync(10);

const saltPassword = async (password) => {
    const salted = bcrypt.hashSync(password, salt);
    return salted;
    
}

const save = async(table, data) => {
    if (!data) {
        return 'Requested Data Missing!'
    }
    if (!table) {
        return 'Unable to Save the Record'
    }
     new table().save(data)
}

const insertIntoCollection = function InsertIntoCollection(model, obj) {
    return new Promise(function (resolve, reject) {
        new model(obj).save(function (err, userInfo) {
            let tempObj = {
                status: false
            }
            if (err) {
                tempObj.error = err;
                reject(tempObj);
            } else {
                tempObj.status = true;
                tempObj.data = userInfo;
                resolve(tempObj);
            }
        });
    })
}

module.exports = {
    saltPassword,
    save,
    insertIntoCollection
};