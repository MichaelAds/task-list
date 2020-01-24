import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TaskModel } from './task/shared/task.model';


export class InMemoryDatabase implements InMemoryDbService {
    createDb(){
        const task: TaskModel[] = [
            { id: 1, title: 'Criar Projeto1', description: 'o projeto deve ser feito em angular 8' },
            { id: 2, title: 'Criar Projeto2', description: 'o projeto deve ser feito em angular 8' },
            { id: 3, title: 'Criar Projeto3', description: 'o projeto deve ser feito em angular' },
            { id: 4, title: 'Criar Projeto4', description: 'o projeto deve ser feito em angular 8' },
            { id: 5, title: 'Criar Projeto5', description: 'o projeto deve ser feito em angular 8' },
            { id: 6, title: 'Criar Projeto6', description: 'o projeto deve ser feito em angular' },
        ];

        return { task }
    }
}
