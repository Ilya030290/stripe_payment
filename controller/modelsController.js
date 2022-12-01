const fs = require('fs')

const getModel = async (req, res) => {
  const { modelName } = req.params
  await fs.readFile(`./3dModels/${modelName}`, (err, data) => {
    if (err) {
      res.statusCode = 400
      res.end('Resource not found!')
    } else {
      res.end(data)
    }
  })
}

module.exports = getModel;
