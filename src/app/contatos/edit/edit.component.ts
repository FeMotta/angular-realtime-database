import { Component, OnInit } from '@angular/core';
import { Contato } from '../shared/contato';
import { ContatoDataService } from '../shared/contato-data.service';
import { ContatoService } from '../shared/contato.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  contato: Contato = new Contato()
  key: string = '';

  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService) { }

  ngOnInit(): void {
    this.contato = new Contato();
    this.contatoDataService.currentContato.subscribe(data => {
      if (data.contato && data.key) {
        this.contato = new Contato();
        this.contato.nome = data.contato.nome;
        this.contato.telefone = data.contato.telefone;
        this.key = data.key;
      }
    })
  }

  onSubmit() {
    this.key ? this.contatoService.update(this.contato, this.key) : this.contatoService.insert(this.contato);
    this.contato = new Contato();
  }

}
