import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-country-searchbar',
  templateUrl: './country-searchbar.component.html',
  styleUrls: ['./country-searchbar.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class CountrySearchbarComponent {
  @Output() searchChange = new EventEmitter<string>();
  @Output() downArrowKey = new EventEmitter();
  @Output() upArrowKey = new EventEmitter();
  @Output() enterKey = new EventEmitter();

  onInputChange(event: CustomEvent) {
    if (event.detail?.value != null) this.searchChange.emit(event.detail.value);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.downArrowKey.emit();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.upArrowKey.emit();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.enterKey.emit();
    }
  }
}
