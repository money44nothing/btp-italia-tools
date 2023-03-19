import { JsonPipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import localeIt from '@angular/common/locales/it';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CiListComponent } from './components/ci/ci-list/ci-list.component';
import { FoiExTabacchiComponent } from './components/foi-ex-tabacchi/foi-ex-tabacchi.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { HomeComponent } from './components/home/home.component';
import { BtpListComponent } from './components/btp/btp-list/btp-list.component';
import { BtpDetailsComponent } from './components/btp/btp-details/btp-details.component';
import { CiTableComponent } from './components/ci/ci-table/ci-table.component';
import { CIBaseDatePipe } from './pipes/ci/cibase-date.pipe';
import { httpInterceptorProviders } from './services/http-interceptors';

registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    FoiExTabacchiComponent,
    CiListComponent,
    LeftMenuComponent,
    HomeComponent,
    BtpListComponent,
    BtpDetailsComponent,
    CiTableComponent,
    CIBaseDatePipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    NgbTypeaheadModule, FormsModule, JsonPipe, AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'it-IT' },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
