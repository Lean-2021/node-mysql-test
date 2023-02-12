import { response, request } from 'express';
import { pool } from '../db/configDB.js';

// obtener empleados
export const getEmployeed = async (req = request, res = response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees;');
    res.status(200).json({ users: rows });
  } catch (error) {
    res.status(500).json({ msg: 'Something goes wrong' });
  }
};

export const getEmployee = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM employees WHERE id=?', [id]);
    if (rows.length === 0)
      return res.status(404).json({ msg: 'employee not found' });
    return res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ msg: 'Something goes wrong' });
  }
};

export const createEmployeed = async (req = request, res = response) => {
  const { name, salary } = req.body;
  try {
    const [rows] = await pool.query(
      `INSERT INTO employees (name,salary) VALUES (?,?); `,
      [name, salary]
    );
    res.status(200).json({
      user: {
        id: rows.insertId,
        name,
        salary,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: 'Something goes wrong' });
  }
};

export const deleteEmployeed = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM employees WHERE id=?', [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ msg: 'employee not found' });
    res.status(200).json({ msg: 'employee removed' });
  } catch (error) {
    res.status(500).json({ msg: 'Something goes wrong' });
  }
};

export const updateEmployeed = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, salary } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE employees SET name = IFNULL(?,name), salary = IFNULL(?,salary) WHERE id = ?;',
      [name, salary, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ msg: 'employee not found' });

    const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?;', [
      id,
    ]);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ msg: 'Something goes wrong' });
  }
};
