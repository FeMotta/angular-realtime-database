import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Contato } from './contato';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private db: AngularFireDatabase) { }

  // Cria um novo contato

  insert(contato: Contato) {
    this.db.list('contato').push(contato)
      .then((result: any) => {
        console.log(result.key);
      }
    );
  }

  // Atualiza um contato

  update(contato: Contato, key: string) {
    this.db.list('contato').update(key, contato)
      .catch((error: any) => {
        console.error(error);
      }
    );
  }

  // Pega TODOS os contatos

  getAll() {
    return this.db.list('contato')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {} }));
        }
      )
    );
  }

  // Pega o contato pelo nome

  getByName(nome: string) {
    return this.db.list('contato', ref => ref.orderByChild('nome').equalTo(nome))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {} }));
        }
      )
    )
  }

  // Pega o contato pela ordem alfabética no nome | Default: A-Z (ASC)

  getContactsInOrder() {
    return this.db.list('contato', ref => ref.orderByChild('nome'))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {} }));
        }
      )
    )
  }

  // Deleta um contato

  delete(key: string) {
    this.db.object(`contato/${key}`).remove();
  }
}
