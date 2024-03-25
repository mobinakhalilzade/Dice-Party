import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ISection } from 'src/app/core/interface/point.interface';

@Component({
  selector: 'app-dice',
  standalone: true,
  imports: [],
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.scss',
})
export class DiceComponent implements OnChanges{
  @Input() dice: ISection;

  ngOnChanges(changes: SimpleChanges): void {
  }
}
