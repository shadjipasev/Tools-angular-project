import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { AuthService } from './../../auth/auth.service';
import { ToolService } from '../services/tool/tool.service';
import { Component, Input, OnInit, Pipe, NgModule, model } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver-es';

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
        console.log(this.tool.modelFile);
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

  downloadFile(fileId: string, event: MouseEvent) {
    event.preventDefault();
    console.log(fileId);
    let fileName = this.tool.name.toLowerCase();
    // console.log(this.tool.name);

    // ----------------------------
    // this.toolService
    //   .downloadFile(fileId)
    //   .subscribe((blob) => saveAs(blob));
    // console.log(fileId);
    //-----------------------------
    this.toolService.downloadFile(fileId).subscribe((response: any) => {
      // Use FileSaver.js to save the blob as a file
      saveAs(response, fileName);
    });
    // (error) => {
    //   const options = 'Failed to download file. Please try again later.';

    //   // this.snackBar.open(errorMessage, 'Dismiss', { duration: 5000 });
    // };
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
