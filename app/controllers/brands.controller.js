const db = require("../models");
const config = require("../config/auth.config");
const Brand = db.brands;

exports.createBrands = async (req, res) => {
  const { name, id_supplier } = req.body;

  const exists = await Brand.findOne({ where: { name, id_supplier } });
  if (exists) {
    return res.status(200).json({ error: "Marca já existe" });
  }
  Brand.create({
    name: name,
    id_supplier: id_supplier,
    code: "",
    status: 1,
  })
    .then((user) => {
      res.send({ message: "Marca criada com sucesso!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.updateBrands = async (req, res) => {
  const { id } = req.params;
  const { name, id_supplier } = req.body;

  try {
    const brand = await Brand.findOne({ where: { id, id_supplier } });

    if (!brand) {
      return res.status(404).json({ error: "Marca não encontrada" });
    }

    brand.name = name;

    await brand.save();

    res.json("Atualizado com sucesso");
  } catch (error) {
    res
      .status(500)
      .json({ error: "Alguma coisa deu errado", details: error.message });
  }
};

exports.deleteBrand = async (req, res) => {
  const { id } = req.params;
  const { id_supplier } = req.body;
  try {
    const brand = await Brand.findOne({ where: { id, id_supplier } });

    if (!brand) {
      return res.status(404).json({ error: "Marca não encontrada" });
    }
    await brand.destroy();

    res.json({ message: "Marca deletada com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Alguma coisa deu errado", details: error.message });
  }
};

exports.getBrands = async (req, res) => {
  const { id_supplier } = req.body;

  const brands = await Brand.findAll({ where: { id_supplier } });

  res.send({ list: brands });
};
