import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { AuthService } from './../../auth/auth.service';
import { ToolService } from '../services/tool/tool.service';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { Component, Input, OnInit, Pipe, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

// import { ITool } from 'src/app/shared/interfaces/Tool';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  tool: any;
  toolId: string = '';
  admin: any;
  userId: any;
  displayIframe: boolean = false;
  fileName = '';

  @Input()
  url: string;
  urlSafe: SafeResourceUrl;

  constructor(
    private toolService: ToolService,
    private route: ActivatedRoute,
    private auth: AuthService,
    public cartService: ShoppingCartService,
    public sanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  ngOnInit(): void {
    if (this.auth.isAdmin()) {
      this.admin = true;
    }

    // this.cartService.getCartSize();
    this.cartService.cartSubject.next(this.cartService.getCartSize());
    this.userId = this.auth.getUserId();
    // this.toolId = this.route.snapshot.params['id'];
    this.route.params.subscribe((params) => {
      this.toolId = params['id'];
      console.log(this.toolId);
      this.toolService.getById(this.toolId).subscribe((res) => {
        this.tool = res;
        this.url = res.modelUrl;
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        // console.log('This is url = ' + this.urlSafe);
        console.log(this.tool), (error: any) => console.log(error);
      });
    });
  }

  // getSafeUrl() {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  // }

  // sanitizeUrl(url: string): SafeResourceUrl {
  //   debugger;
  //   this.displayIframe = true;
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  // }

  addTool(product: any) {
    console.log('addTool Works');

    if (!this.cartService.productInCart(product)) {
      product.quantity = 1;
      this.cartService.addToCart(product);
      // this.cartService.loadCart();
      this.cartService.cartSubject.next(this.cartService.getCartSize());
    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('thumbnail', file);

      const upload$ = this.http.post('/api/thumbnail-upload', formData);

      upload$.subscribe();
    }
  }

  cartSize: any;
  // cartSizeFunc() {
  //   this.cartService.getCartSize().subscribe({
  //     next: (res) => {
  //       if (res) {
  //         this.cartSize = res.data;
  //         console.log(res.message);
  //       }
  //     },
  //   });
  //   this.cartService.cartSubject.next(this.cartSize);
  //   console.log(this.cartSize + ' is the cartSize');
  // }
}
