const getModel = async (req, res) => {
  try {
    const { modelName } = req.params;
    const filePath = `./3dModels/${modelName}`;
    res.download(filePath);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getModel;
