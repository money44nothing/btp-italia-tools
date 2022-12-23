import { JsonPipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import localeIt from '@angular/common/locales/it';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CalcoloCIComponent } from './components/calcolo-ci/calcolo-ci.component';
import { FoiExTabacchiComponent } from './components/foi-ex-tabacchi/foi-ex-tabacchi.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { HomeComponent } from './components/home/home.component';

registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    FoiExTabacchiComponent,
    CalcoloCIComponent,
    LeftMenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbTypeaheadModule, FormsModule, JsonPipe, AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'it-IT' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
