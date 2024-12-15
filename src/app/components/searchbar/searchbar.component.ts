import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class SearchbarComponent {
  @ViewChild(IonSearchbar) searchbar!: IonSearchbar;

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

  get value(): string {
    return this.searchbar.value != null ? this.searchbar.value : '';
  }

  set value(value: string) {
    this.searchbar.value = value;
  }

  setFocus() {
    this.searchbar.setFocus();
  }
}
