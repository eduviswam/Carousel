import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../service/apiservice/product.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit {

  errorMessage = '';
  sub!: Subscription;
  products: any = [];
  scrollPosition = 0;
  carouselWidth: number = 0;
  cardWidth: number = 0;

  @ViewChild('carouselDiv') carouselDiv: ElementRef | undefined;
  @ViewChild('inner') carousel: ElementRef | undefined;
  @ViewChild('innerItem') carouselItem: ElementRef | undefined;

  constructor(private apiService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.apiService.getProducts().subscribe({
      next: products => {
        this.products = products;
      },
      error: err => this.errorMessage = err
    });
  }

  onNextClick(): void {
    this.carouselWidth = this.carousel!.nativeElement.scrollWidth;
    this.cardWidth = this.carouselItem!.nativeElement.clientWidth;

    if (this.scrollPosition < (this.carouselWidth - this.cardWidth)) {
      this.scrollPosition += this.cardWidth;
      this.carousel!.nativeElement.scrollLeft += this.scrollPosition;
      //this.carousel!.nativeElement.animate(this.getScrollAnimation(), this.getScrollAnimationTiming());     
    }
  }

  onPrevClick(): void {
    this.carouselWidth = this.carousel!.nativeElement.scrollWidth;
    this.cardWidth = this.carouselItem!.nativeElement.clientWidth;

    if (this.scrollPosition > 0) {
      this.scrollPosition -= this.cardWidth;
      this.carousel!.nativeElement.scrollLeft = this.scrollPosition;
      //this.carousel!.nativeElement.animate(this.getScrollAnimation(), this.getScrollAnimationTiming());
    }
  }

  getScrollAnimation() {
    return [
      { scrollLeft: this.scrollPosition },
      { scrollX: this.scrollPosition}
    ];
  }

  getScrollAnimationTiming() {
    return {
      duration: 600
    };
  }
}
