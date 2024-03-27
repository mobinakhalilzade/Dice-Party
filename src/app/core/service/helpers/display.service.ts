import { Injectable, NgZone } from '@angular/core';
import { Subject, Observable } from 'rxjs';

 type DisplayType = 'MOBILE' | 'TABLET' | 'DESKTOP' | 'TV' | undefined;


@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  private tablet: number = 768; // TABLET display
  private desktop: number = 1440; // DESKTOP display
  private tv: number = 1920; // TV display

  private widthValue: number = 0;
  private heightValue: number = 0;
  private displayValue: DisplayType | null = null;

  private displayChanged: Subject<DisplayType> = new Subject<DisplayType>();
  onDisplayChanged: Observable<DisplayType> = this.displayChanged.asObservable();

  constructor(private ngZone: NgZone) {
    this.onResize();
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('resize', () => {
        this.ngZone.run(() => {
          this.onResize();
        });
      });
    });
  }

  get width(): number {
    return this.widthValue;
  }

  get height(): number {
    return this.heightValue;
  }

  get display(): DisplayType | null {
    return this.displayValue;
  }

  private onResize(): void {
    this.widthValue = window.innerWidth;
    this.heightValue = window.innerHeight;

    const last: DisplayType | null = this.displayValue;
    let display: DisplayType | undefined;

    if (this.widthValue <= this.tablet) display = 'MOBILE';
    else if (this.widthValue <= this.desktop) display = 'TABLET';
    else if (this.widthValue <= this.tv) display = 'DESKTOP';
    else display = 'TV';

    if (display !== last) {
      this.displayValue = display;
      this.displayChanged.next(display);
      console.log('Display type changed:', display);
    }
  }
}
