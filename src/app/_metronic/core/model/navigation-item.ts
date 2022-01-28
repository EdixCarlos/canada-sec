import { SubMenuItem } from "./submenu-item";

export class NavigationItem {
    title: string;
    root?: boolean;
    icon?: string;
    svg?: string;
    page: string;
    translate: string;
    bullet?: string;
    submenu?: SubMenuItem[];

    constructor() {
        this.root = true;
        this.icon = 'flaticon2-architecture-and-city';
        this.svg = './assets/media/svg/icons/Design/Layers.svg';
        this.bullet = 'dot';
    }
}