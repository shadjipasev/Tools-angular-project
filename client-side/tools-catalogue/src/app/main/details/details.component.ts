import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { AuthService } from './../../auth/auth.service';
import { ToolService } from '../services/tool/tool.service';
import {
  Component,
  Input,
  OnInit,
  Pipe,
  NgModule,
  model,
  OnDestroy,
} from '@angular/core';
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
export class DetailsComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  tool: any;
  toolId: string = '';
  admin: any;
  userId: any;

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

    // this.isLoading = true;
    // this.cartService.getCartSize();
    // this.cartService.cartSubject.next(this.cartService.getCartSize());
    this.userId = this.auth.getUserId();
    // this.toolId = this.route.snapshot.params['id'];
    this.route.params.subscribe((params) => {
      this.toolId = params['id'];
      console.log(this.toolId);
      this.toolService.getById(this.toolId).subscribe((res) => {
        // this.isLoading = false;
        this.tool = res;
        console.log(this.tool.modelFile);
        this.url = res.modelUrl;
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        // console.log('This is url = ' + this.urlSafe);
        console.log(this.tool), (error: any) => console.log(error);
      });
    });
  }

  addTool(product: any) {
    console.log('addTool Works');

    if (!this.cartService.productInCart(product)) {
      product.quantity = 1;
      this.cartService.addToCart(product);
      // this.cartService.loadCart();
      this.cartService.cartSubject.next(this.cartService.getCartSize());
    } else {
      this.cartService.allReadyInCart.next(true);
    }
  }

  downloadFile(fileId: string, toolName: string, event: MouseEvent) {
    event.preventDefault();
    console.log(fileId);
    const fileName = toolName.toLowerCase();
    // console.log(this.tool.name);

    // ----------------------------
    // this.toolService
    //   .downloadFile(fileId)
    //   .subscribe((blob) => saveAs(blob));
    // console.log(fileId);
    //-----------------------------
    this.toolService.downloadFile(fileId).subscribe((response: any) => {
      // Use FileSaver.js to save the blob as a file
      console.log(response);
      saveAs(response, fileName + '.rar');
    });
  }

  ngOnDestroy(): void {
    this.cartService.allReadyInCart.next(false);
  }
}
