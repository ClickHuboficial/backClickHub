module.exports = (sequelize, Sequelize) => {
  
    const Img_products = sequelize.define("img_products", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_product: {
        type: Sequelize.STRING
      },
      id_supplier: {
        type: Sequelize.STRING
      }, 
      patch: {
         type: Sequelize.STRING
       }, 

    }, {
      tableName: 'img_products', // Nome da tabela no banco de dados
      underscored: true, // Usa `created_at` e `updated_at` em vez de camelCase
      timestamps: true // Inclui campos `created_at` e `updated_at`
  });
  
    return Img_products;
  };
  