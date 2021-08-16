import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/CreditCard';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.css'],
})
export class ListCardsComponent implements OnInit {
  listCards: CreditCard[] = [];

  constructor(
    private _cardService: CardService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCards();
  }

  getCards = () => {
    this._cardService.getCards().subscribe((data) => {
      this.listCards = [];
      data.forEach((element: any) => {
        this.listCards.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.listCards);
    });
  };

  editCard = (card: CreditCard) => {
    this._cardService.addEditCard(card);
  };

  deleteCard = (id: any) => {
    this._cardService.deleteCard(id).then(
      () => {
        this.toastr.warning(
          'Tarjeta eliminada correctamente',
          'Tarjeta eliminada'
        );
      },
      (error) => {
        this.toastr.error('Epps... ocurrio un error', 'Error');
        console.log(error);
      }
    );
  };
}
