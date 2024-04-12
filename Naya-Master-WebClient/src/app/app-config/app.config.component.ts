import {Component, OnInit} from '@angular/core';
import { AppComponent } from '@app/app.component';
import { AppMainComponent } from '@app-main/app.main.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgFor, NgClass, NgIf, NgStyle } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

@Component({
    selector: 'app-config',
    templateUrl: "./app.config.component.html",
    standalone: true,
    imports: [
        SidebarModule,
        ButtonModule,
        RippleModule,
        NgFor,
        NgClass,
        RadioButtonModule,
        FormsModule,
        InputSwitchModule,
        NgIf,
        NgStyle,
    ],
})
export class AppConfigComponent implements OnInit {

    scale: number = 14;

    scales: number[] = [12,13,14,15,16];

    themes: any[] = [];

    menuThemes: any[] = [];

    menuTheme = 'light';

    topbarThemes: any[] = [];

    topbarTheme: string = 'blue';

    theme: string = 'blue';

    matchingMenuTheme: boolean = false;

    matchingTopbarTheme: boolean = false;

    selectedMenuTheme: any;

    selectedTopbarTheme: any;

    configActive: boolean = false;

    isInputBackgroundChanged: boolean = false;

    constructor(public appMain: AppMainComponent, public app: AppComponent) {}

    ngOnInit() {
        this.themes = [
            {name: 'indigo', color: '#2f8ee5'},
            {name: 'pink', color: '#E91E63'},
            {name: 'purple', color: '#9C27B0'},
            {name: 'deeppurple', color: '#673AB7'},
            {name: 'blue', color: '#2196F3'},
            {name: 'lightblue', color: '#03A9F4'},
            {name: 'cyan', color: '#00BCD4'},
            {name: 'teal', color: '#009688'},
            {name: 'green', color: '#4CAF50'},
            {name: 'lightgreen', color: '#8BC34A'},
            {name: 'lime', color: '#CDDC39'},
            {name: 'yellow', color: '#FFEB3B'},
            {name: 'amber', color: '#FFC107'},
            {name: 'orange', color: '#FF9800'},
            {name: 'deeporange', color: '#FF5722'},
            {name: 'brown', color: '#795548'},
            {name: 'bluegrey', color: '#607D8B'}
        ];

        this.menuThemes = [
            {name: 'light', color: '#FDFEFF'},
            {name: 'dark', color: '#434B54'},
            {name: 'indigo', color: '#1A237E'},
            {name: 'bluegrey', color: '#37474F'},
            {name: 'brown', color: '#4E342E'},
            {name: 'cyan', color: '#006064'},
            {name: 'green', color: '#2E7D32'},
            {name: 'deeppurple', color: '#4527A0'},
            {name: 'deeporange', color: '#BF360C'},
            {name: 'pink', color: '#880E4F'},
            {name: 'purple', color: '#6A1B9A'},
            {name: 'teal', color: '#00695C'}
        ];

        this.topbarThemes = [
            {name: 'lightblue', color: '#2E88FF'},
            {name: 'dark', color: '#363636'},
            {name: 'white', color: '#FDFEFF'},
            {name: 'blue', color: '#1565C0'},
            {name: 'deeppurple', color: '#4527A0'},
            {name: 'purple', color: '#6A1B9A'},
            {name: 'pink', color: '#AD1457'},
            {name: 'cyan', color: '#0097A7'},
            {name: 'teal', color: '#00796B'},
            {name: 'green', color: '#43A047'},
            {name: 'lightgreen', color: '#689F38'},
            {name: 'lime', color: '#AFB42B'},
            {name: 'yellow', color: '#FBC02D'},
            {name: 'amber', color: '#FFA000'},
            {name: 'orange', color: '#FB8C00'},
            {name: 'deeporange', color: '#D84315'},
            {name: 'brown', color: '#5D4037'},
            {name: 'grey', color: '#616161'},
            {name: 'bluegrey', color: '#546E7A'},
            {name: 'indigo', color: '#3F51B5'}
        ];

        this.selectedMenuTheme = this.menuThemes.find(theme => theme.name === this.menuTheme);
        this.selectedTopbarTheme = this.topbarThemes.find(theme => theme.name === this.topbarTheme);
    }

    decrementScale() {
        this.scale--;
        this.applyScale();
    }

    incrementScale() {
        this.scale++;
        this.applyScale();
    }

    applyScale() {
        document.documentElement.style.fontSize = this.scale + 'px';
    }

    onInputStyleClick() {
        this.isInputBackgroundChanged = true;
    }
    onLayoutModeChange(mode: 'light' | 'dark') {
        this.app.layoutMode = mode;

        if (!this.isInputBackgroundChanged) {
            this.app.inputStyle = mode === 'dark' ? 'filled' : 'outlined';
        }

        if (mode === 'dark') {
            this.app.menuTheme = 'dark';
            this.app.topbarTheme = 'dark';
        }
        else {
            this.app.menuTheme = 'light';
            this.app.topbarTheme = 'blue';
        }

        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        const layoutHref = 'assets/layout/css/layout-' + this.app.layoutMode + '.css';
        this.replaceLink(layoutLink, layoutHref);

        const themeLink = document.getElementById('theme-css');
        if(themeLink == null){
            return;
        }

        const urlTokens = themeLink?.getAttribute('href')?.split('/');
        if(urlTokens?.length)
        urlTokens[urlTokens.length - 1] = 'theme-' + this.app.layoutMode + '.css';
        const newURL = urlTokens?.join('/') ?? String.empty;

        this.replaceLink(themeLink, newURL, this.appMain.refreshChart);
    }

    changeTheme(theme: string) {
        this.theme = theme;

        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        const themeHref = 'assets/theme/' + theme + '/theme-' + this.app.layoutMode + '.css';
        this.replaceLink(themeLink, themeHref);
    }

    changeMenuTheme(theme: any) {
        this.selectedMenuTheme = theme;
        this.app.menuTheme = theme.name;
    }

    changeTopbarTheme(theme: any) {
        this.selectedTopbarTheme = theme;
        this.app.topbarTheme = theme.name;

        const appLogoLink: HTMLImageElement = document.getElementById('app-logo') as HTMLImageElement;

        if (theme.name == 'white' || theme.name == 'yellow' || theme.name == 'amber'  || theme.name == 'orange' || theme.name == 'lime') {
            appLogoLink.src = 'assets/layout/images/logo-dark.svg';
        }
        else {
            appLogoLink.src = 'assets/layout/images/logo-light.svg';
        }
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    replaceLink(linkElement: HTMLElement, href: string, callback?: Function) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
            if (callback) {
                callback();
            }
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = <HTMLElement>linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode?.insertBefore(cloneLinkElement, linkElement.nextSibling);

            if (id) {
                cloneLinkElement.addEventListener('load', () => {
                    linkElement.remove();
                    cloneLinkElement.setAttribute('id', id);

                    if (callback) {
                        callback();
                    }
                });
            }
        }
    }
}
