import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/CreditCard';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css'],
})
export class CreateCardComponent implements OnInit {
  form: FormGroup;
  loading = false;
  title = 'Agregar Tarjeta';
  id: string | undefined;

  constructor(
    private fb: FormBuilder,
    private _cardService: CardService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      expirationDate: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      cvv: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
    });
  }

  ngOnInit(): void {
    this._cardService.getEditCard().subscribe((data) => {
      console.log('editar --> ', data);
      this.id = data.id;
      this.title = 'Editar tarjeta';
      this.form.patchValue({
        titular: data.titular,
        cardNumber: data.cardNumber,
        expirationDate: data.expirationDate,
        cvv: data.cvv,
      });
    });
  }

  addCard = () => {
    if (this.id == undefined) {
      this.newCard();
    } else {
      this.editCard(this.id);
    }
  };

  newCard = () => {
    const CARD: CreditCard = {
      titular: this.form.value.titular,
      cardNumber: this.form.value.cardNumber,
      expirationDate: this.form.value.expirationDate,
      cvv: this.form.value.cvv,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.loading = true;
    this._cardService.addCard(CARD).then(
      () => {
        this.loading = false;
        this.toastr.success(
          'La tarjeta fue registrada con exito!',
          'Tarjeta registrada'
        );
        this.form.reset();
      },
      (error) => {
        this.loading = false;
        this.toastr.error('Opps.. ocurrio un error', 'Error');
        console.log(error);
      }
    );
  };

  editCard = (id: string) => {
    const CARD: any = {
      titular: this.form.value.titular,
      cardNumber: this.form.value.cardNumber,
      expirationDate: this.form.value.expirationDate,
      cvv: this.form.value.cvv,
      updatedAt: new Date(),
    };
    this.loading = true;
    this._cardService.editCard(id, CARD).then(
      () => {
        this.loading = false;
        this.title = 'Agregar Tarjeta';
        this.form.reset();
        this.id = undefined;
        this.toastr.info(
          'La tarjeta fue actualizada con exito',
          'Tarjeta actualizada'
        );
      },
      (error) => {
        console.log(error);
      }
    );
  };
}
