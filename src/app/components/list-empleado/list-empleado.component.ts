import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; 
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado';     
// imports cleaned: MatIconModule and Console were unused here
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css']
})
export class ListEmpleadoComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['nombreCompleto', 'telefono', 'correo', 'fechaIngreso', 'estadoCivil', 'sexo', 'acciones'];
  dataSource = new MatTableDataSource<Empleado>();
  listEmpleado: Empleado[] | undefined;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedRow: Empleado | null = null;
  private tooltipHideTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private empleadoService: EmpleadoService, public dialog: MatDialog, public snackbar: MatSnackBar) {
  }

  ngAfterViewInit(): void {
    this.cargarEmpleados();

  }

  ngOnDestroy(): void {
    if (this.tooltipHideTimer) {
      clearTimeout(this.tooltipHideTimer);
      this.tooltipHideTimer = null;
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarEmpleados() {
    this.listEmpleado = this.empleadoService.getEmpleados();
    this.dataSource = new MatTableDataSource(this.listEmpleado);
        this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Devuelve el índice global del elemento teniendo en cuenta la página actual.
   * Esto evita borrar/editar el elemento equivocado cuando se usa paginador.
   */
  getIndex(pageIndexRelative: number): number {
    if (!this.paginator) {
      return pageIndexRelative;
    }
    const pageIndex = this.paginator.pageIndex || 0;
    const pageSize = this.paginator.pageSize || this.dataSource.data.length || 0;
    return pageIndexRelative + (pageIndex * pageSize);
  }

  eliminarEmpleado(index: number) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {Mensaje: 'Esta seguro de eliminar el empleado?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.empleadoService.eliminarEmpleado(index);
        this.cargarEmpleados();
        this.snackbar.open('El empleado fue eliminado con exito', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      }
    });

  }

  selectRow(row: Empleado) {
    if (this.selectedRow === row) {
      this.selectedRow = null;
    } else {
      this.selectedRow = row;
    }
  }

  isSelected(row: Empleado): boolean {
    return this.selectedRow === row;
  }

  showTempTooltip(tooltip: MatTooltip) {
    // show tooltip immediately, then hide after 250ms
    if (this.tooltipHideTimer) {
      clearTimeout(this.tooltipHideTimer);
      this.tooltipHideTimer = null;
    }
    try {
      tooltip.show();
    } catch (e) {
      // ignore if show fails
    }
    this.tooltipHideTimer = setTimeout(() => {
      try {
        tooltip.hide();
      } catch (e) {}
      this.tooltipHideTimer = null;
    }, 500);
  }

}
