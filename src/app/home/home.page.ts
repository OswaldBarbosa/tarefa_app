import { Component } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  type: string = "pending"

  constructor(
    private alertController: AlertController,
    public tasksService: TasksService,
    private toastController: ToastController,
    private popoverController: PopoverController
  ) { }

  async toast() {
    const toast = await this.toastController.create({
      message: 'Preencha uma tarefa!',
      duration: 2000
    })

    await toast.present()

  }

  async alertAdd() {
    const alert = await this.alertController.create({
      header: 'Adicionar uma tarefa',
      mode: 'ios',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Tarefa'
        },
        {
          name: 'date',
          type: 'date',
          min: '1924-01-01',
          max: '2030-12-31'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar',
          handler: (alertData) => {
            if (alertData.task != "")
              this.tasksService.addTask(alertData.task, alertData.date)
            else {
              this.toast();
              this.alertAdd();
            }
          }
        }
      ]
    })

    await alert.present();

  }

  async alertUpdate(index: number, task: any) {
    const alert = await this.alertController.create({
      header: 'Atualizar uma tarefa',
      mode: 'ios',
      inputs: [
        {
          name: 'task',
          value: task.value,
          type: 'text',
          placeholder: 'Tarefa'
        },
        {
          name: 'date',
          type: 'date',
          min: '1924-01-01',
          max: '2030-12-31',
          value: task.date.getFullYear() + "-" + ((task.date.getMonth() + 1) < 10 ? "0" + (task.date.getMonth() + 1) : (task.date
            .getMonth() + 1)) + "-" + ((task.date.getDate()+1) < 10 ? "0" + task.date.getDate() : task.date.getDate())
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar',
          handler: (alertData) => {
            if (alertData.task != "")
              this.tasksService.updateTask(index, alertData.task, alertData.date)
            else {
              this.toast();
              this.tasksService.updateTask(index, alertData.task, alertData.date);
            }
          }
        }
      ]
    })

    await alert.present();

  }

  async alertDelete(index: number) {
    const alert = await this.alertController.create({
      header: 'Excluir uma tarefa',
      mode: 'ios',
      message: 'Tem certeza que deseja excluir essa tarefa?',
      buttons:
        [
          {
            text: 'Sim',
            handler: () => this.tasksService.deleteTask(index)
          },
          {
            text: 'Cancelar',
            role: 'cancel'
          }
        ]
    })

    await alert.present();

  }

  delTask(index: number) {
    this.tasksService.deleteTask(index)
  }

}
