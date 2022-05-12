import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiHttpService } from '../../core/services/api-http.service';
import { Order } from '../../model/Order';
import { Player } from '../../model/Player';
import { User } from '../../model/User';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  players: Player[] = []; // Initializes players array
  filteredPlayers: Player[] = []; // Initialized filted players array
  orderForm: FormGroup;

  constructor(
    private api: ApiHttpService,
    private fb: FormBuilder,
    private userService: UserService,
    private orderService: OrderService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) { }

  /**
   * This function is responsable to call the createForm function
   *  and populate players array with data comming from API
   */
  async ngOnInit(): Promise<void> {
    this.createForm();
    let loading = await this.loadingCtrl.create({
      message: "Loading...",
    }); // Creates new loading component
    loading.present();
    let apiCall = this.api.getAll();
    apiCall.subscribe((response: Player[]) => {
      response.forEach((p) => {
        let player = { name: p['fullName'] };
        player.name = p['fullName'];
        this.players.push(player);
        if (this.players.length > 0 && response.length === this.players.length) {
          loading.dismiss();
        }
      })
    });

  }

  /**
   * Creates form with all the formControl necessary
   */
  private createForm(): void {
    this.orderForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cards: new FormArray([
        this.fb.group({
          name: ['', [Validators.required]],
          quantity: [0, [Validators.required, Validators.min(1)]],
          subtotal: [0, [Validators.required, Validators.min(10)]],
        })
      ]),
      total: [0, [Validators.required]]
    });
  }

  /**
   * This function compares two giving players to display on the dropdown select
   * @param o1  Player
   * @param o2 Player
   * @returns boolean
   */
  compareWith(o1: Player, o2: Player): boolean {
    return o1 && o2 ? o1.name === o2.name : o1 === o2;
  }

  /**
   * This function adds new cards to form dynamically
   */
  addCard(): void {
    let cards = this.orderForm.get('cards') as FormArray;
    let newCard = this.fb.group({
      name: ['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      subtotal: [0, [Validators.required, Validators.min(10)]],
    });
    cards.push(newCard);
  }

  /**
   * This function removes a given card from form and updates calls getTotal() to update the total
   * @param index index of the card
   */
  removeCard(index): void {
    let cards = this.orderForm.get('cards') as FormArray;
    cards.removeAt(index);
    this.getTotal();

  }

  /**
   * This function is trigged onChange of the card input filtering players based on value typed
   * @param text value of the input  
   */
  onType(text: any): void {
    const name: string = text.target.value.toLocaleLowerCase();
    if (name === '') {
      this.filteredPlayers = [];
    } else {
      this.filteredPlayers = this.players.filter(function (str) {
        return str.name.toLocaleLowerCase().startsWith(name);
      });
    }
  }

  /**
   * This function updates quantity and subtotal based on the card being changed
   * it also calls getTotal() to update total
   * @param number value from quantity input
   * @param card formGroup of specific card
   */
  getSubtotal(number, card: FormGroup): void {
    card.controls['quantity'].setValue(number.target.value);
    let subtotal = card.controls['subtotal'].value;
    this.orderForm.controls['cards'].value;
    subtotal = number.target.value * 10;
    card.controls['subtotal'].setValue(subtotal);
    this.getTotal();

  }

  /**
   * This function updates total of the order based on the quantity of cards selected
   */
  getTotal() {
    let c = this.cards.value as [];
    let total = 0;
    c.forEach(card => {
      total += card['subtotal'];
    });
    this.total.setValue(total);
  }

    /**
   * This function creates a new user and order in the database and redirects user to receipt page
   */
     async onSubmit(): Promise<void> {
      let loading = await this.loadingCtrl.create({
        message: "Creating invoice...",
      }); // Creates new loading component
      loading.present();
      try {
        let userData: User = { key_doc: '', first_name: this.first_name.value, last_name: this.last_name.value, email: this.email.value };
        const user = await this.userService.create(userData);
        let orderData: Order = { key_doc: '', user_key_doc: user.key_doc, total: this.total.value, cards: this.cards.value };
        const order = await this.orderService.create(orderData);
        this.navCtrl.navigateForward(`/receipt/${order.key_doc}`);
      } catch (error) {
        console.log("Couldn't save order to database.");
      }
  
    }

  get first_name(): FormControl {
    return this.orderForm.get('first_name') as FormControl;
  }
  get last_name(): FormControl {
    return this.orderForm.get('last_name') as FormControl;
  }
  get email(): FormControl {
    return this.orderForm.get('email') as FormControl;
  }
  get cards(): FormControl {
    return this.orderForm.get('cards') as FormControl;
  }
  get total(): FormControl {
    return this.orderForm.get('total') as FormControl;
  }
}
