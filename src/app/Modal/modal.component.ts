import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {

  modalBackdrop: HTMLElement;
  myModal: HTMLElement;
  closeModalButton: HTMLButtonElement;

  ngOnInit() {
    // Get references to modal elements
    this.modalBackdrop = document.getElementById('modal-backdrop') as HTMLElement;
    this.myModal = document.getElementById('my-modal') as HTMLElement;
    this.closeModalButton = document.getElementById('close-modal') as HTMLButtonElement;

    // Add event listeners to trigger the modal
    const openModalButton = document.getElementById('open-modal-button') as HTMLButtonElement; // Assuming you have a button to open the modal
    if (openModalButton) {
      openModalButton.addEventListener('click', this.showModal);
    }

    if (this.closeModalButton) {
      this.closeModalButton.addEventListener('click', this.hideModal);
    }

    // Optional: Close modal when clicking on the backdrop
    if (this.modalBackdrop) {
      this.modalBackdrop.addEventListener('click', this.hideModal);
    }
  }

  // Function to show the modal
showModal(){
  if (this.modalBackdrop && this.myModal) {
    this.modalBackdrop.style.display = 'block';
    this.myModal.style.display = 'block';
  }
}

// Function to hide the modal
hideModal() {
  if (this.modalBackdrop && this.myModal) {
    this.modalBackdrop.style.display = 'none';
    this.myModal.style.display = 'none';
  }
}


}
