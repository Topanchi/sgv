export class Venta {
    constructor(
        public _id: String,
        public valor_venta: Number,
        public fecha_ingreso: String,
        public fecha_venta: String,
        public mes: Number,
        public anio: Number,
        public nombre_cliente: String,
        public descripcion_venta: String,
        public torta_bizcocho_15_redonda: Number,
        public torta_bizcocho_20_redonda: Number,
        public torta_bizcocho_30_redonda: Number,
        public torta_bizcocho_40_redonda: Number,
        public torta_bizcocho_50_redonda: Number,
        public torta_bizcocho_15_rectangular: Number,
        public torta_bizcocho_30_rectangular: Number,
        public torta_bizcocho_40_rectangular: Number,
        public torta_bizcocho_60_rectangular: Number,
        public torta_especial_12_panqueque: Number,
        public torta_especial_20_panqueque: Number,
        public torta_especial_30_panqueque: Number,
        public torta_especial_15_hojarasca_milhoja: Number,
        public torta_especial_20_hojarasca_milhoja: Number,
        public torta_especial_30_hojarasca_milhoja: Number,
    ){
        

    }
}