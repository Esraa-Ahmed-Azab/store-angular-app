import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../../_services/products.service';

@Component({
  selector: 'app-add-edit-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss'
})
export class AddEditProductComponent implements OnInit {
  @Input() title !:string;
  @Input() editMode!: boolean;
  @Input() selectedProduct:any;
  @Output() closeModal = new EventEmitter<void>();
  productsForm!: FormGroup;
  selectedFile: File | null = null;


  constructor(private fb: FormBuilder, private productsService: ProductsService) { }

  ngOnInit() {
    this.createForm();
    if(this.editMode){
      this.fillForm();
    }
  }

  createForm() {
    this.productsForm = this.fb.group({
      title: [''],
      price: [0],
      description: [''],
      image: [''],
      category: ['']
    })
  }

  fillForm(){
    this.productsForm.patchValue({
      title: this.selectedProduct.title,
      price: this.selectedProduct.price,
      description:this.selectedProduct.description,
      category: this.selectedProduct.category
    })
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      this.productsForm.patchValue({ image: this.selectedFile });
      this.productsForm.get('image')?.updateValueAndValidity();
    }
  }
  

  addProduct(){
    this.productsService.addProduct(this.productsForm.value).subscribe(res=>{
      alert('Product added successfully!')
    },
  error=>{
    alert('The following error occured while adding product: '+ error)
  });
  }

  updateProduct(){
    this.productsService.updateProduct(this.productsForm.value, this.selectedProduct.id).subscribe(res=>{
      alert('Product Updated successfully!')
    },
  error=>{
    alert('The following error occured while updating product: '+ error)
  });
  }

 
  close() {
    this.closeModal.emit();
  }
}
