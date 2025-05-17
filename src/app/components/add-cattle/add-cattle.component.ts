import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CattleService } from '../../services/cattle.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-cattle',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-cattle.component.html',
  styleUrl: './add-cattle.component.css',
})
export class AddCattleComponent {
  cattleForm: FormGroup;
  error: string | null = null;
  success: string | null = null;
  loading = false;

  fb = inject(FormBuilder);
  cattleService = inject(CattleService);
  router = inject(Router);

  constructor() {
    this.cattleForm = this.fb.group({
      breed: ['', Validators.required],
      weight: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1)]],
      available: [true],
    });
  }

  onSubmit() {
    this.error = null;
    this.success = null;
    if (this.cattleForm.invalid) return;
    this.loading = true;
    this.cattleService.addCattle(this.cattleForm.value).subscribe({
      next: () => {
        this.success = 'Cattle added successfully!';
        this.loading = false;
        this.cattleForm.reset({
          breed: '',
          weight: 0,
          price: 0,
          available: true,
        });
        setTimeout(() => this.router.navigate(['/cattle']), 1000);
      },
      error: () => {
        this.error = 'Failed to add cattle';
        this.loading = false;
      },
    });
  }
}
