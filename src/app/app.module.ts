import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
// import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CostCardComponent } from './cost-card/cost-card.component';
import { GlossaryComponent } from './glossary/glossary.component';
 
import { NiceSelectModule } from "ng-nice-select";

import { UiSwitchModule } from 'ngx-ui-switch';

// const routes: Routes = [
//   { path: '', redirectTo: 'rate', pathMatch: 'full' },
//   { path: 'rate', component: CostCardComponent },
//   { path: 'glossary', component: GlossaryComponent },
   

// ];

 @NgModule({
  declarations: [
    AppComponent,
    CostCardComponent,
    GlossaryComponent,
   ],
  imports: [
    BrowserModule,
    UiSwitchModule,
    HttpModule,
    FormsModule,
    TagInputModule,
    BrowserAnimationsModule,
    NiceSelectModule
    // RouterModule.forRoot(routes),
  ],
  // exports: [RouterModule],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
