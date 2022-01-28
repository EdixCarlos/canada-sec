import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mnt-delete-modal',
  templateUrl: './mnt-delete-modal.component.html',
  styleUrls: ['./mnt-delete-modal.component.scss']
})
export class MntDeleteModalComponent implements OnInit {

  @Input() id: number;
  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    console.log('id')
  }

  deleteProperty() {
    console.log('deleted item')
    this.modal.close()
  }
}
