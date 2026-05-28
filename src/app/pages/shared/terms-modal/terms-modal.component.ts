import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms-modal.component.html',
})
export class TermsModalComponent {

  @Input() isOpen = false;
  @Input() type: 'terms' | 'privacy' | 'lgpd' = 'terms';

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}