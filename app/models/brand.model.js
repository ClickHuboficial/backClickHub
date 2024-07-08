module.exports = (sequelize, Sequelize) => {
  
    const Brands = sequelize.define("brands", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING
      },
      id_supplier: {
        type: Sequelize.STRING
      }, 
      code: {
        type: Sequelize.STRING
      }, 
      image: {
        type: Sequelize.STRING
      }, 
      note: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.NUMBER
      },
    }, {
      tableName: 'brands', // Nome da tabela no banco de dados
      underscored: true, // Usa `created_at` e `updated_at` em vez de camelCase
      timestamps: true // Inclui campos `created_at` e `updated_at`
  });
  
    return Brands;
  };
  