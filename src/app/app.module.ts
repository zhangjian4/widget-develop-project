import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { DelonFormModule } from '@delon/form';
import { AlainConfigService } from '@delon/util';
import { WidgetDeveloperModule } from 'widget-developer';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DelonFormModule.forRoot(),
    WidgetDeveloperModule,
    NgZorroAntdMobileModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, AlainConfigService],
  bootstrap: [AppComponent],
})
export class AppModule {}
