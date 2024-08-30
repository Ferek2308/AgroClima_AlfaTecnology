export interface Usuario {
    ID_Usuario: number;
    Nombre: string;
    Apellido_Paterno: string;
    Apellido_Materno: string;
    Email: string;
    Contraseña: string;
    Rol: string;
    Localidad: string;
    Fotoperfil:string | null;

}
export  interface UsuarioValidadoResponse {
    mensaje: string;
    usuario: Usuario;
  }

  export interface Terreno {
    ID_Terreno?: number;
    ID_Usuario: number;
    Nombre: string;
    Ubicacion: string;
    Ancho: number;
    Largo: number;
}

export interface DatosClimaticos {
    ID: number;
    Estado: string;
    ENE_Temp_Max_Promedio: number;
    FEB_Temp_Max_Promedio: number;
    MAR_Temp_Max_Promedio: number;
    ABR_Temp_Max_Promedio: number;
    MAY_Temp_Max_Promedio: number;
    JUN_Temp_Max_Promedio: number;
    JUL_Temp_Max_Promedio: number;
    AGO_Temp_Max_Promedio: number;
    SEP_Temp_Max_Promedio: number;
    OCT_Temp_Max_Promedio: number;
    NOV_Temp_Max_Promedio: number;
    DIC_Temp_Max_Promedio: number;
    ENE_Temp_Min_Promedio: number;
    FEB_Temp_Min_Promedio: number;
    MAR_Temp_Min_Promedio: number;
    ABR_Temp_Min_Promedio: number;
    MAY_Temp_Min_Promedio: number;
    JUN_Temp_Min_Promedio: number;
    JUL_Temp_Min_Promedio: number;
    AGO_Temp_Min_Promedio: number;
    SEP_Temp_Min_Promedio: number;
    OCT_Temp_Min_Promedio: number;
    NOV_Temp_Min_Promedio: number;
    DIC_Temp_Min_Promedio: number;
    ENE_Precipitacion_Promedio: number;
    FEB_Precipitacion_Promedio: number;
    MAR_Precipitacion_Promedio: number;
    ABR_Precipitacion_Promedio: number;
    MAY_Precipitacion_Promedio: number;
    JUN_Precipitacion_Promedio: number;
    JUL_Precipitacion_Promedio: number;
    AGO_Precipitacion_Promedio: number;
    SEP_Precipitacion_Promedio: number;
    OCT_Precipitacion_Promedio: number;
    NOV_Precipitacion_Promedio: number;
    DIC_Precipitacion_Promedio: number;
}

export interface Cultivo {
    ID_Cultivo?: number;
    Nombre: string;
    Metodo_Optimo_Siembra: string;
    Manera_de_Cosechar: string;
    Cuidado: string;
    Recomendaciones: string;
    Imagen: string | null;
    TemperaturaOptima: number;
    TemperaturaMinima: number;
    TemperaturaMaxima: number;
    CicloCultivo: number;
    Tipo_De_Suelo: string;
    Recomendaciones_De_Riego: string;
    Precio_En_El_Mercado: number;
    Manejo_Post_Cosecha: string;
    Cantidad_Por_Metro_Cuadrado: number;
}


// Interfaz para Plaga
export interface Plaga {
    ID_Plaga?: number;
    Nombre: string;
    Causa: string;
    Efecto: string;
    Medidas_Preventivas: string;
    Metodos_de_Control: string | null;
    Ciclo_de_Vida: string | null;
    Identificacion: string | null;
    Imagen: string | null; // Tipo compatible con BLOB y valores nulos
}

export interface Cultivo_Plaga {
    ID_Cultivo: number;
    ID_Plaga: number;

}

// Interfaz para ClimaCultivo
export interface ClimaCultivo {
    ID_Cultivo: number;
    ID_Clima: number;
    Localidad: string;
    Mes_Optimo_Siembra: string;
    Mes_Cosecha: string;
}

// Interfaz para HistorialCultivo
export interface HistorialCultivo {
    ID?: number;
    Usuario: string;
    Accion: string;
    Cultivo_Modificada: string;
    Cambios_Realizados: string;
    Fecha: Date;
    Hora: string;
}

export interface HistorialPlaga {
    ID?: number;
    Usuario: string;
    Accion: string;
    Plaga_Modificada: string;
    Cambios_Realizados: string;
    Fecha: Date;
    Hora: string; 
}
// Interfaz para TerrenoCultivo
export interface TerrenoCultivo {
    ID_Terreno: number;
    ID_Cultivo: number;
    Fecha_Inicio: Date;
    Fecha_Cosecha: Date;
}

// Interfaz para TerrenoUsuario
export interface TerrenoUsuario {
    ID_Terreno: number;
    ID_Usuario: number;
}
