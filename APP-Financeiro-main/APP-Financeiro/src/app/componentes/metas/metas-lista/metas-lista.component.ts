import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { GrupoService } from '../../../services/grupo.service';
import { MetaService } from '../../../services/meta.service';
import { IGrupoShow } from '../../../types/grupo.types';
import { DropDownStandard, IMetasSalvar, IMetasShow } from '../../../types/meta.types';
import { BarraderolarComponent } from './barraderolar/barraderolar.component';

@Component({
  selector: 'app-metas-lista',
  standalone: true,
  imports: [
    ButtonModule,
        TagModule,
        CommonModule,
        CardModule,
        TableModule,
        RouterModule,
        DialogModule,
        FormsModule,
        ToastModule,
        InputTextModule,
        BarraderolarComponent,
        ConfirmDialogModule,
        FloatLabelModule,
        DropdownModule,],
  providers: [MessageService, ConfirmationService],
  templateUrl: './metas-lista.component.html',
  styleUrl: './metas-lista.component.css'
})
export class MetasListaComponent {
metas: IMetasShow[] = [];
  visible: boolean = false;
  tipoSelecionado : DropDownStandard = {label : '', value : ''};
  tipos: DropDownStandard[] = [
    { label: 'Entrada', value: 'ENTRADA' },
    { label: 'Saida', value: 'SAIDA' }
  ];
  categorias: DropDownStandard[] = [
    { label: 'Alimentação', value: 'ALIMENTACAO' },
    { label: 'Educação', value: 'EDUCACAO' },
    { label: 'Lazer', value: 'LAZER' },
    { label: 'Saúde', value: 'SAUDE' },
    { label: 'Transporte', value: 'TRANSPORTE' },
  ]

  categoriaSelecionada : DropDownStandard = {label : '', value : ''}
  grupoSelecionado: IGrupoShow | null = null;
  metaSave: IMetasSalvar = { id : null, tipo: '', meta: '', valor: null, descricao: '', categoria: '', grupoId: null};
  grupos: IGrupoShow[] = [];

  constructor(
    private grupoService: GrupoService,
    private metaService: MetaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.grupoService.getGrupos().subscribe((data: IGrupoShow[]) => {
      this.grupos = data;
    });

    this.metaService.getMetas().subscribe((data: IMetasShow[]) => {
      this.metas = data;
    });
  }
  onTipoChange(event: any) {
    if (this.metaSave.meta)
    this.metaSave.tipo =this.tipoSelecionado.value
  }

  onCategoriaChange(event: any) {
    if (this.metaSave.meta)
    this.metaSave.categoria = this.categoriaSelecionada.value
  }
  onGrupoChange(event: any) {
    this.metaSave.grupoId = event.value ? event.value.id : null;
    console.log(this.metaSave.grupoId);
  }

  editarMeta(meta: IMetasShow): void {

    this.metaSave.id = meta.id;
    this.metaSave.meta = meta.meta;
    this.metaSave.descricao = meta.descricao;
    this.metaSave.tipo = meta.tipo;
    this.metaSave.categoria = meta.categoria;
    this.metaSave.valor = meta.valor;
    this.metaSave.grupoId = meta.grupo.id;
    this.visible = true;

  }

  cadastrarMeta(): void {
    this.metaSave.valor = this.metaSave.valor ? +this.metaSave.valor : null;

    if (!this.metaSave.tipo || !this.metaSave.valor || !this.metaSave.grupoId || !this.metaSave.descricao || !this.metaSave.meta || !this.metaSave.categoria) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção!',
        detail: 'Todos os campos são obrigatórios.',
      });
      return;
    }

    this.metaService.salvarMeta(this.metaSave).subscribe(
      (resposta) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Concluído!',
          detail: 'Meta foi cadastrada com sucesso!',
        });
        this.visible = false;
        this.ngOnInit();
        this.limparCampos();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro!',
          detail: 'Falha ao cadastrar a meta.',
        });
      }
    );
  }

  excluirMeta(id: number): void {
    if (id) {
      this.metaService.deletarMeta(id).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Concluído!',
            detail: `Meta foi removida com sucesso!`,
          });
          this.ngOnInit();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro!',
            detail: 'Falha ao excluir a meta.',
          });
        }
      );
    }
  }

  confirmacaoExclusao(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Certeza que quer excluir essa meta?',
      header: 'Confirmação de exclusão',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'Sim p-button-danger p-button-text Não',
      rejectButtonStyleClass: 'p-button-text p-button-text ',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.excluirMeta(id);
      },
      reject: () => {
      },
    });
  }

  showDialog() {
    this.visible = true;
  }

  limparCampos() {
    this.metaSave.id = null;
    this.metaSave.tipo = '';
    this.metaSave.meta = '';
    this.metaSave.tipo = '';
    this.metaSave.categoria = '';
    this.metaSave.valor = null;
    this.metaSave.descricao = '';
    this.grupoSelecionado = null;
  }
}
