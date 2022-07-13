const LannisterPay = require('../model/tpss.schema');
// const { v4: uuid } = require('uuid');

const lanTransaction = (req, res) => {
    try {
        const payload = req.body;
        payload["ID"] = generateAccountNumber() 

        let response = {
          "ID": payload["ID"],
          "Balance": payload["Balance"],
          "SplitBreakdown": []
        }
        

        let prevState = {
          initialBal: payload['Amount']
        }

        // Calculate flat data
        const flatData = payload?.SplitInfo.filter(elem => elem.SplitType === 'FLAT')
        const getFlatData = flatData.reduce((acc, result) => {
          response?.SplitBreakdown.push({
            SplitEntityID: result.SplitEntityId,
            Amount: result?.SplitValue
          })
          const main = acc - result.SplitValue
          response.Balance = main
          return main
        }, prevState.initialBal);


        // Calculate percentage data
        const percentageData = payload?.SplitInfo.filter(elem => elem.SplitType === 'PERCENTAGE')
        const getPercentageData = percentageData.reduce((acc, result) => {
          const Amount = (result.SplitValue / 100) * acc
          response?.SplitBreakdown.push({
            SplitEntityID: result.SplitEntityId,
            Amount,
          });
          const main = acc - Amount
          response.Balance = main
          return main
        }, getFlatData)


        // Calculate ratio data
        const allRatio = payload?.SplitInfo.filter(elem => elem.SplitType === 'RATIO')
        .reduce((acc, result) => result.SplitValue += acc, 0)

        const ratioData = payload?.SplitInfo.filter(elem => elem.SplitType === 'RATIO')

        let bal = getPercentageData

        ratioData.forEach(elem => {
          const Amount = (elem.SplitValue / allRatio) * bal
          response?.SplitBreakdown.push({
            SplitEntityID: elem.SplitEntityId,
            Amount
          })
          response.Balance = bal - Amount
          bal = bal - Amount
        })
        new LannisterPay(payload).save();
        res.status(200).json(response);
    } catch (err) {
        console.error(err.message);
        res.status(404).json({message: 'an error just occured.'})
    }
}

function generateAccountNumber() {
  return Math.floor(1000 + Math.random() * 999);
}

module.exports = lanTransaction;