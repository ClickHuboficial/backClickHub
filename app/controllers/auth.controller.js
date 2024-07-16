const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
 
  try {
    const { name, email, password, phone, cpf_cnpj, companyName, address} = req.body;
  const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(200).json({ error: 'Email já existe' });
    }

    // Verificar se o número de telefone já existe
    const phoneExists = await User.findOne({ where: { phone } });
    if (phoneExists) {
      return res.status(200).json({ error: 'Telefone já existe' });
    }

    const lastClient = await User.findOne({
      order: [['created_at', 'DESC']]
  });

  let code = bcrypt.hashSync(new Date() + name, 8);


    User.create({
      name: name,
      client_id : code,
      email: email,
      password: bcrypt.hashSync(password, 8),
      phone: phone,
      cpf_cnpj:cpf_cnpj,
      company_name: companyName,
      address: address,
      slug: name,
      image_path: null,
      status: 1,
    })
      .then(user => {
       res.send({ message: "Afiliado criado com sucesso!" });
      })
      .catch(err => {
        res.status(500).send({ message: err });
      });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

exports.test = (req, res) => {
  res.send({ message: "Afiliado criado com sucesso!" });
};

// admddin@dsdd.coms 1235202
exports.signin = (req, res) => {

  console.log(req.body)

  let a =  User.findOne({
    where: {
      email: req.body.email
    }
  })


  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {       
      if (user == null) {
         return res.status(404).send({ message: "Usuário não encontrado." });
       }

       let passwordIsValid = bcrypt.compareSync(
         req.body.password,
         user.password
       );

       if (!passwordIsValid) {
         return res.status(401).send({
           accessToken: null,
           message: "Senha inválida!"
         });
       }

       const token = jwt.sign({ id: user.id },
                               config.secret,
                               {
                                 algorithm: 'HS256',
                                 allowInsecureKeySizes: true,
                                 expiresIn: 86400,  //24 hours
                               });


                               console.log(user)

                                res.status(200).send({
                                  email: user.email,
                                  id: user.client_id,
                                  accessToken: token,
                                  type: 1,
                                  status: user.status
                      
                                });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
