import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadSheetComponent } from './upload-sheet/upload-sheet.component';
import { HelperModule } from './helper/helper.module';

@NgModule({
  declarations: [AppComponent, UploadSheetComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HelperModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
