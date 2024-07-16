const db = require("../models");
const config = require("../config/auth.config");
const subCategory = db.subCategorys;
const Category = db.categorys;

exports.createSubCategory = async (req, res) => {
  const { name, id_supplier, ean, id_cat } = req.body;


  const existsCat = await Category.findOne({ where: { id: id_cat, id_supplier } });

  console.log(existsCat)
  if (!existsCat) {
    return res.status(200).json({ error: 'Não existe essa categoria' });
  }

  const exists = await subCategory.findOne({ where: { name, id_supplier } });
  if (exists) {
    return res.status(200).json({ error: 'subCategoria já existe' });
  }
  subCategory.create({
    name: name,
    id_supplier: id_supplier,
    ean:ean,
    id_cat: id_cat,
    code: 1,
    status: 1,
  })
    .then(user => {
      res.send({ message: "subCategoria criada com sucesso!" });
    })
    .catch(err => {
      res.status(500).send({ message: err });
    });
};


exports.updateSubCategory = async (req, res) => {
  const { id } = req.params;
  const { name, id_supplier, ean } = req.body;

  try {
    const subcategory = await subCategory.findOne({ where: { id, id_supplier } });

    if (!subcategory) {
      return res.status(404).json({ error: 'subCategoria não encontrada' });
    }

    subcategory.name = name;
    subCategory.ean = ean;

    await subcategory.save();

    res.json('Atualizado com sucesso');

  } catch (error) {
    res.status(500).json({ error: 'Alguma coisa deu errado', details: error.message });
  }
};


exports.deleteSubCategory = async (req, res) => {
  const { id } = req.params;
  const { id_supplier } = req.body;
  try {
    const exist = await subCategory.findOne({ where: { id, id_supplier } });

    if (!exist) {
      return res.status(404).json({ error: 'subCategoria não encontrada' });
    }
    await exist.destroy();

    res.json({ message: 'subCategoria deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Alguma coisa deu errado', details: error.message });
  }
};

exports.getSubCategory = async (req, res) => {
  const { id_supplier, id_cat } = req.body;

  const list = await subCategory.findAll({ where: { id_supplier,  id_cat } });

  res.send({ list: list });
};