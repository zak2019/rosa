import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {NavigationMenu} from "../model/navigation-menu";

@Injectable({
  providedIn: 'root'
})
export class NavigationMenuService {

  private menuSections =  new BehaviorSubject<NavigationMenu[]>(null);
  public menuSectionsObs$ = this.menuSections.asObservable();

  private sideNavToggleSubject = new BehaviorSubject(null);
  public sideNavToggleSubjectObs$ = this.sideNavToggleSubject.asObservable();

  constructor(){}

  public setMenuSections(menuSectionsData: Array<NavigationMenu>) {
    this.menuSections.next(menuSectionsData);
  }

  public toggle() {
    this.sideNavToggleSubject.next(null);
  }
}
