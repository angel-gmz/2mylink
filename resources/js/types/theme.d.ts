// Primero, definimos la forma del objeto de propiedades
export interface ThemeProperties {
    bg_color?: string;
    divider_text_color?: string;
    gradient_from?: string;
    gradient_to?: string;
    link_animation?: string;
    button_style?: string;
    button_shadow?: string;
    font_family?: string;
    avatar_style?: string;
}

// Luego, actualizamos la interfaz principal del Tema
export interface Theme {
    id: number;
    name: string;
    is_premium: boolean;
    text_color: string;
    link_bg_color: string;
    link_text_color: string;
    properties?: ThemeProperties | null; // El objeto de propiedades es opcional
}