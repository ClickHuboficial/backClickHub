const db = require("../models");
const config = require("../config/auth.config");
const Category = db.categorys;

exports.createCategory = async (req, res) => {
  const { name, sku, id_supplier } = req.body;

  const exists = await Category.findOne({ where: { name, id_supplier } });
  if (exists) {
    return res.status(200).json({ error: "Categoria já existe" });
  }
  Category.create({
    name: name,
    id_supplier: id_supplier,
    sku: sku,
    code: "",
    status: 1,
  })
    .then((user) => {
      res.send({ message: "Categoria criada com sucesso!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, id_supplier, sku } = req.body;

  try {
    const category = await Category.findOne({ where: { id, id_supplier } });

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    category.name = name;
    category.sku = sku;

    await category.save();

    res.json("Atualizado com sucesso");
  } catch (error) {
    res
      .status(500)
      .json({ error: "Alguma coisa deu errado", details: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  const { id_supplier } = req.body;
  try {
    const exist = await Category.findOne({ where: { id, id_supplier } });

    if (!exist) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }
    await exist.destroy();

    res.json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Alguma coisa deu errado", details: error.message });
  }
};

exports.getCategory = async (req, res) => {
  const { id_supplier } = req.body;

  const list = await Category.findAll({ where: { id_supplier } });

  res.send({ lista: list });
};
