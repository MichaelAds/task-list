import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TaskModel } from './task/shared/task.model';


export class InMemoryDatabase implements InMemoryDbService {
    createDb(){
        const task: TaskModel[] = [
            { id: '1', title: 'Criar Projeto', description: 'o projeto deve ser feito em angular 8' },
            { id: '2', title: 'Refatorar', description: 'o projeto deve ser feito em angular 8' },
            { id: '3', title: 'Teste Unitario', description: 'o projeto deve ser feito em angular 8' },
            { id: '4', title: 'Backend', description: 'o projeto deve ser feito em angular 8' }
        ];

        return { task }
    }
}
