const db = require("../models");
const config = require("../config/auth.config");
const Product = db.product;
const Img_Products = db.img_products;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');


exports.create = async (req, res) => {
  // Save User to Database
 
  try {
    const {  name, id_supplier,cat_id, sub_cat_id, brand_id, purchase_price, regular_price, alert_qty, note} = req.body;
    const files = req.files;

    const nameExists = await Product.findOne({ where: { name, id_supplier } });
  console.log(cat_id)
    if (nameExists != null) {
        // const fornecedor = await Product.findOne({ id_supplier: { id_supplier } });
        // if (fornecedor != null) {
          return res.status(400).json({ error: 'Produto já existe' });
        // }
    }      

     Product.create({
        name: name, 
        id_supplier: id_supplier, 
        code:'', 
        model: '', 
        barcode_symbology:'', 
        sub_cat_id:sub_cat_id, 
        cat_id: cat_id,
        brand_id:brand_id, 
        slug:'', 
        purchase_price:purchase_price, 
        regular_price:regular_price, 
        discount:0, 
        inventory_count:0, 
        alert_qty:alert_qty, 
        note:note
     })
       .then(user => {

        console.log(user)
        res.send({ message: user.id });
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

    res.send({ data: products });
};

exports.delete = async (req, res) => {
    

    try {
      const { id } = req.params;
        const {  id_supplier} = req.body;


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
      const { id } = req.params;
         const { inventory_count,  id_supplier} = req.body;

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage }).array('files'); // Use .array('files') se for upload de múltiplos arquivos

// Função para upload de imagem
exports.uploadImg = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Erro no upload:', err);
      return res.status(500).send({ message: 'Erro ao realizar uploads', error: err });
    }
     
    const files = req.files;

    const id_product = req.body.produto
    const fornecedor = req.body.fornecedor;

    console.log(id_product, fornecedor)

    const fileInfos = files.map(file => ({
      filename: file.filename,
      path: file.path,
    }));

    console.log(fileInfos)

    fileInfos.forEach(files => {
      Img_Products.create({
        id_product: id_product,
        id_supplier:fornecedor,
        patch: files.filename
      })
    });

    res.status(200).send({ message: 'Uploads realizados com sucesso!', files: fileInfos });
  });
};