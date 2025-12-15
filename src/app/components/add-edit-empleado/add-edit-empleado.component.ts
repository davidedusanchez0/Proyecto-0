import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css']
})
export class AddEditEmpleadoComponent implements OnInit {
  estadoCiviles: string[] = ['Soltero', 'Casado', 'Divorciado', 'Viudo'];
  idEmpleado: number | null = null;
  accion = 'Agregar';

  myForm!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder,
    private empleadoService: EmpleadoService,
    private route: Router,
    private snackbar: MatSnackBar,
    private aRouter: ActivatedRoute) {
    const idParam = 'id';
    const idStr = this.aRouter.snapshot.paramMap.get(idParam);
    this.idEmpleado = idStr ? Number(idStr) : null;
  }

  ngOnInit(): void {  
    this.initializeForm();
    if (this.idEmpleado !== null) {
      this.accion = 'Editar';
      this.esEditar(this.idEmpleado);
    }

  }

  countries = [
    { code: 'sv', name: 'El Salvador', flag: '🇸🇻' },
    { code: 'mx', name: 'México', flag: '🇲🇽' },
    { code: 'us', name: 'Estados Unidos', flag: '🇺🇸' },
    { code: 'es', name: 'España', flag: '🇪🇸' },
    { code: 'ar', name: 'Argentina', flag: '🇦🇷' }
  ];

  initializeForm(): void {
    this.myForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.maxLength(20)]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      fechaIngreso: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      estadoCivil: ['', Validators.required],
      sexo: ['', Validators.required]
    });
  }

  
  guardarEmpleado() {
    const telefonoValue = String(this.myForm.get('telefono')?.value || '').replace(/\D/g, '');

    const empleado: Empleado = {
      nombreCompleto: this.myForm.get('nombreCompleto')?.value,
      correo: this.myForm.get('correoElectronico')?.value,
      fechaIngreso: this.myForm.get('fechaIngreso')?.value,
      telefono: telefonoValue,
      estadoCivil: this.myForm.get('estadoCivil')?.value,
      sexo: this.myForm.get('sexo')?.value  
    };

    if  (this.idEmpleado !== null){
      this.editarEmpleado(empleado, this.idEmpleado);
    } else {
      this.agregarEmpleado(empleado);
    }
    
    
  }

  agregarEmpleado(empleado: Empleado) {
    this.empleadoService.agregarEmpleado(empleado);
            this.snackbar.open('El empleado fue agregado con exito', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
    this.route.navigate(['/']);
  }

  editarEmpleado(empleado: Empleado, idEmpleado: number) {
    this.empleadoService.editEmpleado(empleado, idEmpleado);
            this.snackbar.open('El empleado fue editado con exito', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
    this.route.navigate(['/']);
  }

  esEditar(idEmpleado: number) {
    const empleado: Empleado | undefined = this.empleadoService.getEmpleado(idEmpleado);

    if (!empleado) {
      console.warn('Empleado no encontrado para id:', idEmpleado);
      return;
    }

    this.myForm.patchValue({
      nombreCompleto: empleado.nombreCompleto,
      correoElectronico: empleado.correo,
      fechaIngreso: empleado.fechaIngreso,
      telefono: empleado.telefono,
      estadoCivil: empleado.estadoCivil,
      sexo: empleado.sexo
    });
  }

  private getDialCode(countryCode: string): string | undefined {
    return this.countries.find(c => c.code === countryCode)?.flag;
  }
  
  

}
