import { Component, OnInit } from '@angular/core';
import { Contato } from '../shared/contato';
import { ContatoDataService } from '../shared/contato-data.service';
import { ContatoService } from '../shared/contato.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  contatos: Observable<any> = new Observable<any>();

  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService) { }

  ngOnInit(): void {
    // this.contatos = this.contatoService.getAll()
    // this.contatos = this.contatoService.getByName('Pessoa 2')
    this.contatos = this.contatoService.getContactsInOrder()
  }

  delete(key: string) {
    this.contatoService.delete(key);
  }

  edit(contato: Contato, key: string) {
    this.contatoDataService.changeContato(contato, key);
  }

}
