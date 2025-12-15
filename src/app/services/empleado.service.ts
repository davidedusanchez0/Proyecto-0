import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  listEmpleado: Empleado[]  = [
    {
      nombreCompleto: 'Lucas Martinez', correo: 'lmartinez@gmail.com', telefono: '3512335522',
      sexo: 'Masculino', fechaIngreso: new Date(), estadoCivil: 'Soltero'
    },
    {
      nombreCompleto: 'Rodrigo Aliaga', correo: 'raliaga@gmail.com',
      estadoCivil: 'Soltero', fechaIngreso: new Date('2019-05-25'), sexo: 'Masculino', telefono: '3512334422'
    },
    {
      nombreCompleto: 'Maria Funes', correo: 'mfunes@gmail.com',
      estadoCivil: 'Casado', fechaIngreso: new Date('2020-04-27'), sexo: 'Femenino', telefono: '3512553322'
    },
    {
      nombreCompleto: 'Lucrecia Juarez', correo: 'maria@gmail.com',
      estadoCivil: 'Soltero', fechaIngreso: new Date('2020-07-25'), sexo: 'Femenino', telefono: '3514665533'
    },
    {
      nombreCompleto: 'Federico Gonzalez', correo: 'fgonzalez@gmail.com',
      estadoCivil: 'Soltero', fechaIngreso: new Date('2020-02-28'), sexo: 'Femenino', telefono: '1156688332'
    },
    {
      nombreCompleto: 'Estefania Schutz', correo: 'eschutz@gmail.com',
      estadoCivil: 'Soltero', fechaIngreso: new Date('2020-01-31'), sexo: 'Femenino', telefono: '1156678679'
    },
    {
      nombreCompleto: 'Maria Belen Arzu', correo: 'mbarzu@gmail.com',
      estadoCivil: 'Soltero', fechaIngreso: new Date('2020-01-31'), sexo: 'Femenino', telefono: '3512576589'
    }
  ];

  // no-op service constructor removed (keeps class simple)

  getEmpleados() {
    return this.listEmpleado.slice();
  }

  eliminarEmpleado(index: number) {
    this.listEmpleado.splice(index, 1);
  }

  agregarEmpleado(empleado: Empleado) {
    this.listEmpleado.push(empleado);
  }

  getEmpleado(index: number) {
    return this.listEmpleado[index];
  }

  editEmpleado(empleado: Empleado, idEmpleado: number) {
    this.listEmpleado[idEmpleado].nombreCompleto = empleado.nombreCompleto;
    this.listEmpleado[idEmpleado].correo = empleado.correo;
    this.listEmpleado[idEmpleado].fechaIngreso = empleado.fechaIngreso;
    this.listEmpleado[idEmpleado].telefono = empleado.telefono;
    this.listEmpleado[idEmpleado].estadoCivil = empleado.estadoCivil;
    this.listEmpleado[idEmpleado].sexo = empleado.sexo;
  }
}

