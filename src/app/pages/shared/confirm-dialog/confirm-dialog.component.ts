import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="isOpen"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
    >
      <div class="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">
        <h2 class="text-xl font-bold text-gray-900 mb-4">{{ title }}</h2>
        <p class="text-gray-600 mb-6">{{ message }}</p>

        <div class="flex justify-end gap-3">
          <button
            type="button"
            (click)="onCancel()"
            class="px-4 py-2 rounded-xl border hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            (click)="onConfirm()"
            class="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ConfirmDialogComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirm';
  @Input() message = 'Are you sure?';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
    this.isOpen = false;
  }

  onCancel() {
    this.cancel.emit();
    this.isOpen = false;
  }
}