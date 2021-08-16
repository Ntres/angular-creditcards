export class CreditCard {
  id?: string;
  titular: string;
  cardNumber: string;
  expirationDate: string;
  cvv: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    titular: string,
    cardNumber: string,
    expirationDate: string,
    cvv: number
  ) {
    this.titular = titular;
    this.cardNumber = cardNumber;
    this.expirationDate = expirationDate;
    this.cvv = cvv;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
