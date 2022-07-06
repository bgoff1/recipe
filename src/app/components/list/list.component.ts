import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() listControl: FormControl;
  @Input() formList: FormArray;
  @Input() label: string;
  @ViewChild('currentInput') currentInput: ElementRef;

  remove(index: number, event: any): void {
    event.preventDefault();
    this.formList.removeAt(index);
  }

  onKeyPress(event: KeyboardEvent) {
    if (
      (event.key === 'Tab' || event.key === 'Enter') &&
      this.listControl.value
    ) {
      event.preventDefault();
      event.stopPropagation();
      this.add();
      this.currentInput.nativeElement.focus();
    }
  }

  add() {
    const value = this.listControl.value?.trim();
    if (value) {
      this.formList.push(new FormControl(value));
    }
    this.listControl.setValue('');
  }

  get stepCount(): number {
    return (this.formList.value?.length ?? 0) + 1;
  }
}
