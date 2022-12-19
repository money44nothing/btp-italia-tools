import { JsonPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CalcoloCIComponent } from './components/calcolo-ci/calcolo-ci.component';
import { FoiExTabacchiComponent } from './components/foi-ex-tabacchi/foi-ex-tabacchi.component';

@NgModule({
  declarations: [
    AppComponent,
    FoiExTabacchiComponent,
    CalcoloCIComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbTypeaheadModule, FormsModule, JsonPipe, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
