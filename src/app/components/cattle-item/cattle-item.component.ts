import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cattle-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cattle-item.component.html',
  styleUrl: './cattle-item.component.css'
})
export class CattleItemComponent {
  @Input() cattle: any;
}
