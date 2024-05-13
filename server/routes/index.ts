import { Router } from "express";
import Empleado from '../models/Employees'
import Admin from "../models/Admin";

const router = Router();

router.get('/empleados', async (req, res) => {
    try {
      const empleados = await Empleado.find();
      res.json(empleados);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  router.get('/empleados/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const empleado = await Empleado.findById(id);
      if (!empleado) {
        return res.status(404).json({ error: 'Empleado no encontrado' });
      }
      res.json(empleado);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  router.post('/empleados', async (req, res) => {
    const nuevoEmpleadoData = req.body;
    try {
      const nuevoEmpleado = new Empleado(nuevoEmpleadoData);
      const empleadoGuardado = await nuevoEmpleado.save();
      res.status(201).json(empleadoGuardado);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  router.put('/empleados/:id', async (req, res) => {
    const id = req.params.id;
    const datosActualizados = req.body;
    try {
      const empleadoActualizado = await Empleado.findByIdAndUpdate(id, datosActualizados, { new: true });
      if (!empleadoActualizado) {
        return res.status(404).json({ error: 'Empleado no encontrado' });
      }
      res.json(empleadoActualizado);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  router.delete('/empleados/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const empleadoEliminado = await Empleado.findByIdAndDelete(id);
      if (!empleadoEliminado) {
        return res.status(404).json({ error: 'Empleado no encontrado' });
      }
      res.json({ message: 'Empleado eliminado correctamente' });
    } catch (error) {
      res.status(500).send(error);
    }
  });


  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ username, password }).exec();
  
      if (admin) {

        if (username === 'admin') {
          // Si el usuario es 'admin', enviar un mensaje adicional
          res.json({ message: 'Credenciales correctas admin', isAdmin: true });
        } else {
          res.json({ message: 'Credenciales correctas' });
        }
      } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });

  router.post('/login-new', async (req, res) => {
    const { username, password } = req.body;
  
    const newTask = new Admin({ username, password });
    const savedTask = await newTask.save();
    res.json(savedTask);
  });
  
  export default router;



  