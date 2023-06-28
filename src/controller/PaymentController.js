const PaymentService = require('../services/PaymentService')

const initializePayment = async (req, res) => {
    await PaymentService.initializePayment(req.body)
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

module.exports = { initializePayment, verifyPayment }