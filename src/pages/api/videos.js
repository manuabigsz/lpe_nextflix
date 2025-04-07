import { pool } from '../../bd/config';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { rows } = await pool.query(`SELECT id, titulo AS title, tipo, capa_filme AS image FROM videos ORDER BY titulo`);
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar vídeos', details: error });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}
