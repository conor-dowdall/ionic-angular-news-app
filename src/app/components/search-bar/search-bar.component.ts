import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class SearchBarComponent {
  @Output() countryNameChange = new EventEmitter<string>();

  onSearchChange(searchTerm: string | null | undefined) {
    if (searchTerm != null) this.countryNameChange.emit(searchTerm);
  }
}
