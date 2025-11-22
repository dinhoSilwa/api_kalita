import { Router } from 'express';
import { authenticateToken, requireAdmin } from '../../middlewares/auth';
import { prisma } from '../../db/prisma';

const router = Router();

// Aplicar autenticação e verificação de admin para todas as rotas
router.use(authenticateToken);
router.use(requireAdmin);

/**
 * @swagger
 * /api/v1/admin/forms:
 *   get:
 *     summary: Listar todos os formulários (Admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         description: Filtrar por status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Itens por página
 *     responses:
 *       200:
 *         description: Lista de formulários
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão de admin
 */
router.get('/forms', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where = status ? { status: status as string } : {};

    const [forms, total] = await Promise.all([
      prisma.serviceForm.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.serviceForm.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        forms,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    console.error('Erro ao listar formulários:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: 'Erro interno do servidor',
      },
    });
  }
});

/**
 * @swagger
 * /api/v1/admin/forms/{id}:
 *   get:
 *     summary: Obter formulário por ID (Admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Formulário encontrado
 *       404:
 *         description: Formulário não encontrado
 */
router.get('/forms/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const form = await prisma.serviceForm.findUnique({
      where: { id },
    });

    if (!form) {
      return res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: 'Formulário não encontrado',
        },
      });
    }

    res.json({
      success: true,
      data: { form },
    });
  } catch (error) {
    console.error('Erro ao buscar formulário:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: 'Erro interno do servidor',
      },
    });
  }
});

/**
 * @swagger
 * /api/v1/admin/forms/{id}/status:
 *   patch:
 *     summary: Atualizar status do formulário (Admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *               assigned_photographer:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *       404:
 *         description: Formulário não encontrado
 */
router.patch('/forms/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assigned_photographer } = req.body;

    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 400,
          message: 'Status inválido',
        },
      });
    }

    const form = await prisma.serviceForm.update({
      where: { id },
      data: {
        status,
        assigned_photographer: assigned_photographer || null,
        updatedAt: new Date(),
      },
    });

    res.json({
      success: true,
      data: { form },
      message: 'Status atualizado com sucesso',
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: 'Formulário não encontrado',
        },
      });
    }

    console.error('Erro ao atualizar status:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: 'Erro interno do servidor',
      },
    });
  }
});

/**
 * @swagger
 * /api/v1/admin/forms/{id}:
 *   delete:
 *     summary: Deletar formulário (Admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Formulário deletado com sucesso
 *       404:
 *         description: Formulário não encontrado
 */
router.delete('/forms/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.serviceForm.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Formulário deletado com sucesso',
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: 'Formulário não encontrado',
        },
      });
    }

    console.error('Erro ao deletar formulário:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: 'Erro interno do servidor',
      },
    });
  }
});

export default router;
