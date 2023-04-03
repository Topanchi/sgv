export class Venta {
    constructor(
        public _id: String,
        public valor_venta: Number,
        public fecha_ingreso: String,
        public fecha_venta: String,
        public mes: Number,
        public anio: Number,
        public nombre_cliente: String,
        public descripcion_venta: String
    ){
        

    }
}