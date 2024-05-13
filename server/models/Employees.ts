
import mongoose, { Schema, Document } from 'mongoose';
import IEmpleado from './Employess-model';


const empleadoSchema: Schema = new Schema({
  cedula: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function(v: any) {
        return /^[0-9]{10}$/.test(v); 
      },
      message: (props: any) => `${props.value} no es una cédula válida. Debe tener 10 dígitos numéricos.`
    }
  },
  nombres: {
    type: String,
    required: true,
    validate: {
      validator: function(v: any) {
        return /^[a-zA-Z\s]+$/.test(v); 
      },
      message: (props: any) => `${props.value} no es un nombre válido.`
    }
  },
  apellidos: {
    type: String,
    required: true,
    validate: {
      validator: function(v: any) {
        return /^[a-zA-Z\s]+$/.test(v); 
      },
      message: (props: any) => `${props.value} no es un apellido válido.`
    }
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v: any) {
        return /\S+@\S+\.\S+/.test(v); 
      },
      message: (props: any) => `${props.value} no es un correo electrónico válido.`
    }
  },
  fecha_nacimiento: { type: Date },
  direccion_domicilio: { type: String },
  telefono_movil: {
    type: Number,
    validate: {
      validator: function(v: any) {
        return /^[0-9]{10}$/.test(v); 
      },
      message: (props: any) => `${props.value} no es un teléfono móvil válido. Debe tener 10 dígitos numéricos.`
    }
  },
  estado_vacunacion: {
    type: String,
    enum: ['Vacunado', 'No Vacunado'],
    default: 'No Vacunado'
  },
  tipo_vacuna: {
    type: String,
    enum: ['Sputnik', 'AstraZeneca', 'Pfizer', 'Jhonson&Jhonson']
  },
  fecha_vacunacion: { type: Date },
  numero_dosis: { type: Number }
},
{
    versionKey: false,
});

const Empleado = mongoose.model<IEmpleado>('Empleado', empleadoSchema);

export default Empleado;



