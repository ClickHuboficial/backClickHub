const db = require("../models");
const config = require("../config/auth.config");
const Product = db.product;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.create = async (req, res) => {
  try {
    const {
      name,
      id_supplier,
      cat_id,
      sub_cat_id,
      brand_id,
      unit_id,
      tax_id,
      tax_type,
      purchase_price,
      regular_price,
      discount,
      alert_qty,
      note,
    } = req.body;

    if (!sub_cat_id) {
      return res.status(400).json({ error: "sub_cat_id é obrigatório" });
    }

    const nameExists = await Product.findOne({ where: { name } });
    if (nameExists) {
      const fornecedor = await Product.findOne({ where: { id_supplier } });
      if (fornecedor) {
        console.log("aqui");
        return res.status(400).json({ error: "Produto já existe" });
      }
    }

    await Product.create({
      name: name,
      id_supplier: id_supplier,
      code: "",
      model: "", // Adicionei um valor padrão para `model`
      barcode_symbology: "",
      sub_cat_id: sub_cat_id,
      brand_id: brand_id,
      slug: "",
      unit_id: unit_id,
      tax_id: tax_id,
      tax_type: tax_type,
      purchase_price: purchase_price,
      regular_price: regular_price,
      discount: discount,
      inventory_count: 0,
      alert_qty: alert_qty,
      note: note,
    });

    res.send({ message: "Produto criado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.listProductSupplier = async (req, res) => {
  const { id_supplier } = req.query;

  const products = await Product.findAll({ where: { id_supplier } });

  res.send({ lista: products });
};

exports.listProductClient = async (req, res) => {
  const products = await Product.findAll({ where: { status: 1 } });

  res.send({ lista: products });
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_supplier } = req.body;

    const product = await Product.findOne({
      where: {
        id: id,
        id_supplier: id_supplier,
      },
    });

    if (product) {
      await Product.destroy({
        where: { id },
      });
      res.status(200).json({ message: "Produto deletado com sucesso" });
    } else {
      res.status(404).json({
        message: "Produto não encontrado ou ID do fornecedor não corresponde",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o produto" });
  }
};

exports.updateinventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { inventory_count, id_supplier } = req.body;

    const product = await Product.findOne({
      where: { id, id_supplier },
    });

    if (product) {
      const [updated] = await Product.update(
        { inventory_count },
        { where: { id } }
      );

      if (updated) {
        const updatedProduct = await Product.findOne({ where: { id } });
        res.status(200).json({
          product: updatedProduct,
          message: "Inventário atualizado com sucesso",
        });
      } else {
        res.status(404).json({ message: "Produto não encontrado" });
      }
    } else {
      res.status(404).json({
        message: "Produto não encontrado ou ID do fornecedor não corresponde",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o inventário" });
  }
};

// exports.updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const {
//     name,
//     regular_price,
//     discount,
//     inventory_count,
//     alert_qty,
//     note,
//     status,
//     id_supplier,
//     code,
//     tax_type,
//     purchase_price,
//     barcode_symbology,
//     sub_cat_id,
//     slug,
//     model,
//     image_path,
//   } = req.body;

//   try {
//     // Encontre o produto pelo ID
//     const product = await Product.findOne({
//       where: { id, id_supplier, sub_cat_id, name, model },
//     });

//     if (!product) {
//       return res.status(404).json({ error: "Produto não encontrado" });
//     }
//     // Salve as mudanças
//     await product.save();

//     res.json("Produto atualizado com sucesso");
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Alguma coisa deu errado", details: error.message });
//   }
// };

exports.changeStatus = async (req, res) => {
  try {
    const { status, id, id_supplier } = req.body;

    const product = await Product.findOne({
      where: { id, id_supplier },
    });

    if (product) {
      const [updated] = await Product.update({ status }, { where: { id } });

      if (updated) {
        const updatedProduct = await Product.findOne({ where: { id } });
        res.status(200).json({
          product: updatedProduct,
          message: "Status atualizado com sucesso",
        });
      } else {
        res.status(404).json({ message: "Produto não encontrado" });
      }
    } else {
      res.status(404).json({
        message: "Produto não encontrado ou ID do fornecedor não corresponde",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o status" });
  }
};
