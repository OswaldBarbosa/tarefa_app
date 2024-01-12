import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private alertController: AlertController,
    private tasksService: TasksService,
    private toastController: ToastController
  ) { }

  async alert() {
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
              this.alert();
            }
          }
        }
      ]
    })

    await alert.present();

  }

  async toast() {
    const toast = await this.toastController.create({
      message: 'Preencha uma tarefa!',
      duration: 2000
    })

    await toast.present()

  }

}
