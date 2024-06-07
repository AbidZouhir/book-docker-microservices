import {Component, OnInit} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  name = '';

  ngOnInit(): void {

    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')){
        link.classList.add('active');
      }
      link.addEventListener('click', ()=>{
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      })
    })
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

}
