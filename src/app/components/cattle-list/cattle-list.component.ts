import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CattleService } from '../../services/cattle.service';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-cattle-list',
  standalone: true,
  imports: [CommonModule, PricePipe],
  templateUrl: './cattle-list.component.html',
  styleUrl: './cattle-list.component.css'
})
export class CattleListComponent implements OnInit {
  cattleList: any[] = [];
  error: string | null = null;
  loading = false;

  constructor(private cattleService: CattleService) {}

  ngOnInit() {
    this.fetchCattle();
  }

  fetchCattle() {
    this.loading = true;
    this.error = null;
    this.cattleService.getCattle().subscribe({
      next: (data) => {
        this.cattleList = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load cattle list';
        this.loading = false;
      }
    });
  }

  toggleAvailability(cattle: any) {
    const updated = { available: !cattle.available };
    this.cattleService.updateCattle(cattle.id, updated).subscribe({
      next: () => {
        cattle.available = !cattle.available;
      },
      error: () => {
        this.error = 'Failed to update status';
      }
    });
  }
}
