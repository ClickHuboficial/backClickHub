const db = require("../models");
const config = require("../config/auth.config");
const subCategory = db.subCategorys;

/**
 * @swagger
 * components:
 *   schemas:
 *     SubCategory:
 *       type: object
 *       required:
 *         - name
 *         - id_supplier
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the subCategory
 *         name:
 *           type: string
 *           description: The name of the subCategory
 *         id_supplier:
 *           type: integer
 *           description: The ID of the supplier
 *         code:
 *           type: string
 *           description: The code of the subCategory
 *         status:
 *           type: integer
 *           description: The status of the subCategory
 */

/**
 * @swagger
 * tags:
 *   name: SubCategory
 *   description: The subCategory managing API
 */

/**
 * @swagger
 * /subCategory:
 *   post:
 *     summary: Create a new subCategory
 *     tags: [SubCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategory'
 *     responses:
 *       200:
 *         description: The subCategory was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       500:
 *         description: Some server error
 */
exports.createSubCategory = async (req, res) => {
  const { name, id_supplier, ean } = req.body;

  const exists = await subCategory.findOne({ where: { name, id_supplier } });
  if (exists) {
    return res.status(200).json({ error: 'subCategoria já existe' });
  }
  subCategory.create({
    name: name,
    id_supplier: id_supplier,
    ean:ean,
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

/**
 * @swagger
 * /subCategory/{id}:
 *   put:
 *     summary: Update a subCategory
 *     tags: [SubCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The subCategory id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategory'
 *     responses:
 *       200:
 *         description: The subCategory was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       404:
 *         description: The subCategory was not found
 *       500:
 *         description: Some server error
 */
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

/**
 * @swagger
 * /subCategory/{id}:
 *   delete:
 *     summary: Remove the subCategory by id
 *     tags: [SubCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The subCategory id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategory'
 *     responses:
 *       200:
 *         description: The subCategory was deleted
 *       404:
 *         description: The subCategory was not found
 *       500:
 *         description: Some server error
 */
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

/**
 * @swagger
 * /subCategory:
 *   get:
 *     summary: Get all subCategories for a supplier
 *     tags: [SubCategory]
 *     parameters:
 *       - in: query
 *         name: id_supplier
 *         schema:
 *           type: integer
 *         required: true
 *         description: The supplier id
 *     responses:
 *       200:
 *         description: The list of subCategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubCategory'
 *       500:
 *         description: Some server error
 */
exports.getSubCategory = async (req, res) => {
  const { id_supplier } = req.body;

  const list = await subCategory.findAll({ where: { id_supplier } });

  res.send({ lista: list });
};