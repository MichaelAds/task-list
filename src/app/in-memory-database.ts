import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TaskModel } from './task/shared/task.model';


export class InMemoryDatabase implements InMemoryDbService {
    createDb(){
        const task: TaskModel[] = [
            { id: '1', title: 'Criar Projeto', description: 'o projeto deve ser feito em angular 8' },
            { id: '2', title: 'Criar Projeto', description: 'o projeto deve ser feito em angular 8' },
            { id: '3', title: 'Criar Projeto', description: 'o projeto deve ser feito em angular' },
        ];

        return { task }
    }
}
