const query = require('./commonQuerries');
const User = require('../api/v1/admin/user/model/user');

const verify = async (req, res) => {
  console.log('im checking user',req.user);
  if (req.user.user === 'admin') {
    return true;
  } else {
    const user = query.findOne(
      User,
      req.user._id
    )
    const roles= [] ;
    if (roles.length === 0) {
      return false;      
    }
    roles = user.roles;
    roles.foreach(role => {
      if (role === req.user.role) {
        return true;        
      } else {
        return false;
      }
      
    });
  }
}

module.exports = { verify };
