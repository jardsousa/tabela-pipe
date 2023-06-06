import { Component } from '@angular/core';
import {Usuario} from '../../shared/modelo/usuario';
import {USUARIOS} from '../../shared/modelo/USUARIOS';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../shared/services/usuario.service';
import {MensagemService} from '../../shared/services/mensagem.service';
import{MensagemConsoleService} from '../../shared/services/mensagem-console.service';
import {IMensagem} from '../../shared/modelo/IMensagem';

@Component({
  selector: 'app-mantem-usuario',
  templateUrl: './mantem-usuario.component.html',
  styleUrls: ['./mantem-usuario.component.css']
})
export class MantemUsuarioComponent {

  usuarioDeManutencao: Usuario;
  estahCadastrando = true;
  nomeBotaoManutencao = 'Cadastrar';

  constructor(private rotaAtual: ActivatedRoute, private roteador: Router,
              private usuarioService: UsuarioService, private mensagemConsole: MensagemConsoleService) {
    this.usuarioDeManutencao = new Usuario('', 0);
    const idParaEdicao = this.rotaAtual.snapshot.paramMap.get('id');
    if (idParaEdicao) {
      // editando
      this.usuarioService.pesquisarPorId(Number(idParaEdicao)).subscribe(
        usuarioRetornado => {
          this.usuarioDeManutencao = usuarioRetornado;
          this.estahCadastrando = false;
          this.nomeBotaoManutencao = 'Salvar';
        }
    );
    } else {
      this.nomeBotaoManutencao = 'Cadastrar';
    }
  }

  manter(): void {
    if (this.estahCadastrando && this.usuarioDeManutencao) {
      this.usuarioService.inserir(this.usuarioDeManutencao).subscribe(
        usuarioInserido => this.mensagemConsole.sucesso('Usuário cadastrado com sucesso!')
      );
    } else {
      this.usuarioService.atualizar(this.usuarioDeManutencao).subscribe(
        usuarioAtualizado => this.mensagemConsole.erro('Usuário atualizado com sucesso!')
      );
    }
    this.usuarioDeManutencao = new Usuario();
    this.nomeBotaoManutencao = 'Cadastrar';
    this.roteador.navigate(['listagemusuarios']);
  }

}
