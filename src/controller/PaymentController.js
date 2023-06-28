const PaymentService = require('../services/PaymentService')

const intializePayment = async (req, res) => {
    console.log('Hi I Got Here')
    await PaymentService.intializePayment(req.body)
    .then((response) => {
        res.json({
          response
        });
      })
      .catch((error) => {
        res.json({
          message: error
        });
      });
}

const verifyPayment = async (req, res) => {
  console.log('verify payment')
    await PaymentService.verifyPayment(req.params)
    .then((response) => {
        res.json({
          response
        });
      })
      .catch((error) => {
        res.json({
          message: error
        });
      });
}

module.exports = { intializePayment, verifyPayment }