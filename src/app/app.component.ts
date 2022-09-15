import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  level: number = 1;
  dim: number = 2;
  array: any = [];
  array2: any = [];
  array3: any = [];
  chosenArray: any = [];
  selectedArray: any = [];
  isSelectable: boolean = false;
  check: any = true;
  live: number = 5;
  message: string = "";
  color: string = "#ffff00";
  ngOnInit(): void {
    this.dim = this.level + 2;
    this.levelup();
    this.generateRandom();
  }

  generateRandom() {
    while (this.selectedArray.length < this.dim) {
      let x: any = Math.round(Math.random() * (this.dim * this.dim - 1));
      console.log(this.dim);
      if (!this.selectedArray.includes(x)) {
        this.selectedArray.push(x);
        this.array3[x].selected = true;
      }
    }
    setTimeout(() => {
      this.array3.map((v) => (v.selected = false));
      this.isSelectable = true;
      this.message = "";
    }, 5000);
  }
  generateColor() {
    this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  levelup() {
    this.generateColor();
    this.array = [];
    this.array2 = [];
    this.array3 = [];
    this.selectedArray = [];
    this.chosenArray = [];
    this.isSelectable = false;

    let m = 0;
    while (m < this.dim * this.dim) {
      this.array3.push({ selected: false });
      m++;
    }
    let i: any = 0;
    let k: any = 0;
    while (i < this.dim) {
      let j: any = 0;
      this.array2 = [];
      while (j < this.dim) {
        this.array2.push(k);
        j++;
        k++;
      }
      this.array.push(this.array2);
      i++;
    }
  }

  selectBox(index: any) {
    if (this.isSelectable) {
      if (this.selectedArray.length !== this.chosenArray.length) {
        this.chosenArray.push(index);
        this.array3[index].selected = true;
      }
      if (this.selectedArray.length === this.chosenArray.length) {
        this.check = true;
        this.chosenArray.map((v: any) => {
          if (!this.selectedArray.includes(v)) this.check = false;

          return v;
        });
        if (this.check) {
          this.message = "level up";
          this.level += 1;
          this.dim = this.level + 2;
          this.levelup();
          this.generateRandom();
          this.check = false;
        } else if (!this.check && this.live === 1) {
          this.message = "You loss";
          this.live = 5;
          this.level = 1;
          this.dim = this.level + 2;
          this.levelup();
          this.generateRandom();
        } else {
          this.message = "You loss";
          this.live -= 1;
          this.dim = this.level + 2;
          console.log(this.dim, this.level);
          this.levelup();
          this.generateRandom();
        }
      }
    }
  }
}
