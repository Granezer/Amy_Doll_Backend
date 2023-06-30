const AdminService = require('./AdminService');
const validateLoginInput = require('../models/auth/validator/LoginValidation');
const validateRegisterInput = require('../models/auth/validator/RegisterValidation');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken')

const registerValidation = async (request) => {
    try {
      const admin = await AdminService.createNewAdmin(request);
      const { _id, userName } = admin.data;
      console.log(`auth --> id ${admin.data._id} username ${admin.data.userName}`)
      const token = jwt.sign({ _id: _id, userName: userName }, 'privatekey');
  
      return {
        message: `User Account Successfully Created, User Id is ${_id} and UserName is ${userName}`,
        data: `Auth Token ${token}`
      };
    } catch (error) {
      if (error.message === 'Admin with this userName already exist') {
        return {
          message: 'Username already taken',
          data: []
        };
      } else {
        return {
          message: 'Error creating admin',
          data: []
        };
      }
    }
  };
  

const loginValidation = async (request) => {
    // const { isValid } = validateLoginInput(request);

    // if(!isValid){
    //     return{
    //         message: `Username and password is required`,
    //         data: ''
    //     }
    // }
    try {
        // const admin = await Admin.findOne({
        //     userName: request.userName
        // })
        const admin = AdminService.findAdminByUserName(userName)

        if(!admin){
            return{
                message: 'Invalid credentials'
            }
        }

        const { _id, userName } = admin;

        const valid = await admin.validatePassword(request.password);
        if(valid){
            const token = jwt.sign({ _id: _id, userName: userName }, 'privatekey');
            console.log(`User Successfully Logged, \n User Id is ${_id} and UserName is ${userName}`)
            return{
                message: `User Successfully Logged, \n User Id is ${_id} and UserName is ${userName}`,
                data: token
            }
        }
        else{
            return{
                message: 'Invalid credentials'
            }
        }
    } catch (error) {
        return{
            message: 'Invalid User',
            data: []
        }
    }
}

module.exports = { registerValidation, loginValidation };