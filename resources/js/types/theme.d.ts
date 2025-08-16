export interface Theme {
    id: number;
    name: string;
    bg_color: string;
    text_color: string;
    link_bg_color: string;
    link_text_color: string;
    divider_text_color: string;
    gradient_from?: string | null;
    gradient_to?: string | null;
}