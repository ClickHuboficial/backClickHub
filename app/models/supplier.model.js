module.exports = (sequelize, Sequelize) => {
    const Suppliers = sequelize.define("suppliers", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      company_name: {
        type: Sequelize.STRING
      },
      supplier_id: {
        type: Sequelize.STRING
      },
      cpf_cnpj: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      image_path: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.NUMBER
      },
    }, {
      tableName: 'suppliers', // Nome da tabela no banco de dados
      underscored: true, // Usa `created_at` e `updated_at` em vez de camelCase
      timestamps: true // Inclui campos `created_at` e `updated_at`
  });
  
    return Suppliers;
  };
  