import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class Contact {
  formData = {
    name: '',
    phone: '',
    email: '',
    message: '',
  };

  submitted = false;

  submitForm() {
    if (this.formData.name && this.formData.phone && this.formData.email && this.formData.message) {
      this.submitted = true;
      console.log('Form submitted:', this.formData);
      setTimeout(() => {
        this.resetForm();
      }, 3000);
    }
  }

  resetForm() {
    this.formData = {
      name: '',
      phone: '',
      email: '',
      message: '',
    };
    this.submitted = false;
  }
}
