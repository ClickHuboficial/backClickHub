const db = require("../models");
const config = require("../config/auth.config");
const Product = db.product;


const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



exports.create = async (req, res) => {
  // Save User to Database
 
  try {
    const {  name, id_supplier, slug, model, barcode_symbology, sub_cat_id, brand_id, unit_id, tax_id, tax_type, purchase_price, regular_price, discount, inventory_count, alert_qty, note} = req.body;
  const nameExists = await Product.findOne({ where: { name } });
    if (nameExists != '') {
        const fornecedor = await Product.findOne({ id_supplier: { id_supplier } });
        if (fornecedor) {
            console.log('aqui')
          return res.status(400).json({ error: 'Produto já existe' });
        }
    }      

     Product.create({
        name: name, 
        id_supplier: id_supplier, 
        code:'', 
        model: model, 
        barcode_symbology:'', 
        sub_cat_id:sub_cat_id, 
        brand_id:brand_id, 
        slug:slug, 
        unit_id:unit_id, 
        tax_id:tax_id, 
        tax_type:tax_type, 
        purchase_price:purchase_price, 
        regular_price:regular_price, 
        discount:discount, 
        inventory_count:0, 
        alert_qty:alert_qty, 
        note:note
     })
       .then(user => {
        res.send({ message: "Produto criado com sucesso!" });
       })
       .catch(err => {
         res.status(500).send({ message: err });
       });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};


exports.listProductSupplier = async (req, res) => {

  const { id_supplier } = req.query;


    const products = await Product.findAll({ where: { id_supplier } });

    res.send({ lista: products });
};

exports.listProductClient = async (req, res) => {

    const products = await Product.findAll({ where: {  status: 1 } });

    res.send({ lista: products });
};

exports.delete = async (req, res) => {
    

    try {
        const {  id_supplier, id } = req.body;


        const product = await Product.findOne({
            where: {
              id: id,
              id_supplier: id_supplier
            }
          });

          if (product) {
 const result = await Product.destroy({
        where: {
             id: id
          }
         });

       if (result) {
           res.status(200).json({ message: 'Produto deletado com sucesso' });
         } else {
           res.status(404).json({ message: 'Produto não encontrado' });
         }
          } else {
            res.status(404).json({ message: 'O ID e o ID do fornecedor não pertencem ao mesmo produto' });
          }

      } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o produto' });
      }

};

exports.updateinventory = async (req, res) => {

     try {

         const { inventory_count, id,  id_supplier} = req.body;

         const product = await Product.findOne({
             where: {
               id: id,
               id_supplier: id_supplier
             }
           });

           if (product) {
    
         const [updated]= await Product.update(
           { inventory_count: inventory_count },
           {
             where: { id }
           }
         );
    
         console.log(updated)
         if (updated) {
           const updatedProduct = await Product.findOne({ where: { id } });
           res.status(200).json({ product: updatedProduct, message: 'Produto atualizado com sucesso' });
         } else {
           res.status(404).json({ message: 'Produto não encontrado' });
         }

 } else {
     res.status(404).json({ message: 'O ID e o ID do fornecedor não pertencem ao mesmo produto' });
   }
        
       } catch (error) {
         res.status(500).json({ error: 'Error updating inventory count' });
       }
    
};


exports.changeStatus = async (req, res) => {
    try {

        const { status, id,  id_supplier} = req.body;

        const product = await Product.findOne({
            where: {
              id: id,
              id_supplier: id_supplier
            }
          });

          if (product) {
   
        const [updated]= await Product.update(
          { status: status },
          {
            where: { id }
          }
        );
   
        console.log(updated)
        if (updated) {
          const updatedProduct = await Product.findOne({ where: { id } });
          res.status(200).json({ product: updatedProduct, message: 'Produto atualizado com sucesso' });
        } else {
          res.status(404).json({ message: 'Produto não encontrado' });
        }

} else {
    res.status(404).json({ message: 'O ID e o ID do fornecedor não pertencem ao mesmo produto' });
  }
       
      } catch (error) {
        res.status(500).json({ error: 'Error updating inventory count' });
      }
   

}

