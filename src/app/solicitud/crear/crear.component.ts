import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/services/proveedor/producto';
import { ProductoService } from 'src/app/services/proveedor/producto.service';
import { Solicitud } from 'src/app/services/solicitud/solicitud';
import { SolicitudService } from 'src/app/services/solicitud/solicitud.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class SolicitudCrearComponent {
  producto: Producto ={
    id: 0,
    nomPro: "",
    objProveedor:{
      id: 0,
      ruc: "",
      nomProvee: "",
      email: "",
      telefono: "",
      direccion: ""
    }
  };
  name: String = "";
  nuevaSolicitud: Solicitud ={
    id: 0,
	 idPro: 0,
	 cantidad: 0,
	 idProveedor: 0,
	 correo: '',
	 fecha: new Date() ,
	 descripcion: '',
  }
  constructor(private solicitudService: SolicitudService,private productoService: ProductoService,
    private router: Router
  ){}

  registrarSolicitud(){
    this.nuevaSolicitud.idPro = this.producto.id
    this.nuevaSolicitud.idProveedor = this.producto.objProveedor.id
    this.solicitudService.registrar(this.nuevaSolicitud).
    subscribe(Response =>{
      console.log('Solicitud Registrado',Response);
      this.nuevaSolicitud ={
        id: 0,
        idPro: 0,
        cantidad: 0,
        idProveedor: 0,
        correo: '',
        fecha: new Date() ,
        descripcion: '',
      };

      this.name = ""
      this.producto = {
        id: 0,
        nomPro: "",
        objProveedor:{
          id: 0,
          ruc: "",
          nomProvee: "",
          email: "",
          telefono: "",
          direccion: ""
        }
      }
      this.router.navigate(['/solicitud/crear']);
    },
    error =>{
      console.error('Error al registrar el proveedor',error)
    }
    
  );
  }

  buscarProducto(name: String) {
    this.productoService.buscarProducto(name).subscribe(data =>{
      this.producto = data[0];
    });
  }

}
