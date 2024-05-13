
 export interface Empleados{
    _id:null;
    cedula: number;
    nombres: string;
    apellidos: string;
    correo: string;
    fecha_nacimiento?: Date;
    direccion_domicilio?: string;
    telefono_movil?: number;
    estado_vacunacion?: 'Vacunado' | 'No Vacunado';
    tipo_vacuna?: 'Sputnik' | 'AstraZeneca' | 'Pfizer' | 'Jhonson&Jhonson';
    fecha_vacunacion?: Date;
    numero_dosis?: number;
}