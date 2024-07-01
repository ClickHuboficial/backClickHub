module.exports = (sequelize, Sequelize) => {
  
    const Products = sequelize.define("products", {
      name: {
        type: Sequelize.STRING
      },
      regular_price: {
        type: Sequelize.STRING
      },
      discount: {
        type: Sequelize.STRING
      },
      inventory_count: {
        type: Sequelize.NUMBER
      },
      alert_qty: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      id_supplier: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      tax_type: {
        type: Sequelize.STRING
      },
      purchase_price: {
        type: Sequelize.STRING
      },
      barcode_symbology: {
        type: Sequelize.STRING
      },
      sub_cat_id: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      image_path: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.NUMBER
      },
    }, {
      tableName: 'products', // Nome da tabela no banco de dados
      underscored: true, // Usa `created_at` e `updated_at` em vez de camelCase
      timestamps: true // Inclui campos `created_at` e `updated_at`
  });
  
    return Products;
  };
  