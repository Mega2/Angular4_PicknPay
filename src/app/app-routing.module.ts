import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true, enableTracing: false });

@NgModule({

    imports: [
   rootRouting
    ],
    exports: [
        RouterModule
    ]
    /*,
    providers: [
      CanDeactivateGuard,
      SelectivePreloadingStrategy
    ]*/
})
export class AppRoutingModule { }
