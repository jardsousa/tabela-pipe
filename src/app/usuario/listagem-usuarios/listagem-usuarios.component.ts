import {Component, OnInit} from '@angular/core';
import { MensagemConsoleService } from 'src/app/shared/services/mensagem-console.service';
import {Usuario} from '../../shared/modelo/usuario';
import {USUARIOS} from '../../shared/modelo/USUARIOS';
import {UsuarioService} from '../../shared/services/usuario.service';

@Component({
  selector: 'app-listagem-usuarios',
  templateUrl: './listagem-usuarios.component.html',
  styleUrls: ['./listagem-usuarios.component.css']
})
export class ListagemUsuariosComponent implements OnInit{

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private mensagemConsole: MensagemConsoleService) {
  }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(
      usuariosRetornados =>
        this.usuarios = usuariosRetornados
    );
  }

  excluir(usuarioARemover: Usuario): void {
    if (usuarioARemover.id) {
      this.usuarioService.apagar(usuarioARemover.id).subscribe(
        usuarioRemovido => {
          const indx = this.usuarios.findIndex(usuario =>
            usuario.id === usuarioARemover.id);
          this.usuarios.splice(indx, 1);
          this.mensagemConsole.alerta('Usuário apagado com sucesso!')
        }
      );
    }

  }

}
