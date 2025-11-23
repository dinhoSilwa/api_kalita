import { Router } from "express";
import {
  deleteImage,
  uploadMultipleImageController,
  uploadSingleImageController,
} from "../../../controllers/portifolio-upload/portifolioUploadController";
import { FilePortfolioManager } from "../../../middlewares/portifolio-upload/fileManager";

const router = Router();

/**
 * @openapi
 * /api/v1/portfolio/upload-image:
 *   post:
 *     summary: Faz upload de uma única imagem para o portfólio
 *     description: Upload de imagem única com categoria para organização no portfólio
 *     tags:
 *       - Portfolio
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - category
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo de imagem (PNG, JPG, JPEG, WEBP, AVIF) - máximo 5MB
 *               category:
 *                 type: string
 *                 example: "Casamentos"
 *                 description: Categoria para organizar as imagens no portfólio
 *     responses:
 *       201:
 *         description: Imagem adicionada ao portfólio com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Imagem Adicionada ao Portfólio"
 *                 data:
 *                   $ref: '#/components/schemas/PortfolioImage'
 *       400:
 *         description: Erro de validação nos dados de entrada
 *       413:
 *         description: Arquivo muito grande
 *       422:
 *         description: Erro no upload da imagem
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/upload-image",
  FilePortfolioManager.single("file"),
  uploadSingleImageController
);

/**
 * @openapi
 * /api/v1/portfolio/upload-multiples-images:
 *   post:
 *     summary: Faz upload de múltiplas imagens para o portfólio
 *     description: Upload em lote de até 30 imagens para o portfólio
 *     tags:
 *       - Portfolio
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - files
 *               - category
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array de arquivos de imagem (PNG, JPG, JPEG, WEBP, AVIF) - máximo 5MB cada
 *               category:
 *                 type: string
 *                 example: "Ensaios"
 *                 description: Categoria para organizar as imagens no portfólio
 *     responses:
 *       201:
 *         description: Imagens adicionadas ao portfólio com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Imagens adicionadas ao Portfólio"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PortfolioImage'
 *       400:
 *         description: Nenhum arquivo enviado ou categoria não informada
 *       413:
 *         description: Arquivos muito grandes ou muitos arquivos
 *       422:
 *         description: Erro no upload das imagens
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/upload-multiples-images",
  FilePortfolioManager.multiple("files"),
  uploadMultipleImageController
);

/**
 * @openapi
 * /api/v1/portfolio/delete-image:
 *   delete:
 *     summary: Remove uma imagem do portfólio
 *     description: Deleta uma imagem específica do portfólio usando seu public_id
 *     tags:
 *       - Portfolio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - public_id
 *             properties:
 *               public_id:
 *                 type: string
 *                 example: "kalita_fotografia_casamentos/image123"
 *                 description: Identificador único da imagem no serviço de storage
 *     responses:
 *       202:
 *         description: Imagem deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Imagem deletada com sucesso"
 *                 data:
 *                   type: null
 *       400:
 *         description: public_id não fornecido
 *       404:
 *         description: Imagem não encontrada
 *       422:
 *         description: Falha ao deletar a imagem
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/delete-image", deleteImage);

export default router;