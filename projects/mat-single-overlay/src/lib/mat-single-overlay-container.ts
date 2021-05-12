import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class SingleOverlayContainer implements OnDestroy {
    protected _containerElement: any | undefined;
    protected _document: Document;

    constructor(@Inject(DOCUMENT) document: any,) {
        this._document = document;
    }

    ngOnDestroy() {
        const container = this._containerElement;

        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
        }
    }

    getContainerElement(): any {
        if (!this._containerElement) {
            this._createContainer();
        }

        return this._containerElement;
    }

    protected _createContainer(): void {
        const containerClass = 'cdk-overlay-container';
        const existing = this._document.querySelectorAll(`.${containerClass}`);
        if (existing?.length) {
            this._containerElement = existing[0];
        } else {
            const container = this._document.createElement('div');
            container.classList.add(containerClass);
            this._document.body.appendChild(container);
            this._containerElement = container;
        }
    }
}