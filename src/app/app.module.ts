import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataProvider } from './data-access/data-provider.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjectModule } from './project';
import { NavigationComponent, NavigationSectionComponent, NavigationItemComponent } from './navigation';
import { UserAreaComponent, UserService } from './user';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NavigationSectionComponent,
    NavigationItemComponent,
    UserAreaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ProjectModule,
    AppRoutingModule
  ],
  providers: [
     DataProvider,
     UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
