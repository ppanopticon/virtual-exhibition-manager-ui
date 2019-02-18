import {NgModule} from '@angular/core';
import {Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {EditExhibitionComponent} from './components/exhibitions/edit-exhibition.component';
import {ListExhibitionComponent} from './components/exhibitions/list-exhibition.component';
import {ExhibitionExistsGuard} from './exhibition-exists.guard';


const routes: Routes = [
    {path: '', component: ListExhibitionComponent},
    {
        path: ':exhibitionId',
        canActivate: [ExhibitionExistsGuard],
        component: EditExhibitionComponent,
        children: [
            {path: '', redirectTo: 'index', pathMatch: 'full'},
            {path: 'index', component: EditExhibitionComponent}
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        {
            provide: [ExhibitionExistsGuard],
            useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
        }
    ]
})
export class AppRoutingModule {
}
