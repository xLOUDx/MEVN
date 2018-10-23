<template>
    <div>

        <nav class="navbar navbar-light bg-light"> 
            <a class="navbar-brand" href="/">MEVN</a>
        </nav>

        <div class="container">
            <div class="row pt-3">
               <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="sendTask">
                                <div class="form-group">
                                    <input 
                                     v-model="task.title"
                                     type="text" 
                                     placeholder="Inserte una tarea" 
                                     class="form-control">
                                </div>
                                <div class="form-group">
                                    <textarea 
                                     v-model="task.description"
                                     class="form-control" 
                                     placeholder="Inserte una descripción" 
                                     cols="30" 
                                     rows="10"></textarea>
                                </div>
                                    <button v-show="edit === false" class="btn btn-primary btn-block">Enviar</button> 
                                    <button v-show="edit === true" class="btn btn-primary btn-block">Actualizar</button> 
                            </form>
                        </div>
                    </div>
               </div>
               <div class="col-md-7">
                   <table class="table table-bordered">
                       <thead>
                           <tr>
                               <th>Tarea</th>
                               <th>Descripción</th>
                               <th>Operaciones</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr v-for="task of tasks">
                               <td>{{ task.title }}</td>
                               <td>{{ task.description }}</td>
                               <td>
                                   <button 
                                    @click="deleteTask(task._id)" 
                                    class="btn btn-danger">Delete</button>
                                    <button 
                                   @click="editTask(task._id)" 
                                   class="btn btn-secondary">Update</button>
                               </td>
                           </tr>
                       </tbody>
                   </table>
               </div>
            </div>
        </div>

    </div>
</template>

<script>
    class Task{
        constructor(title, description){
            this.title = title;
            this.description = description;
        }
    }

    export default {
        data(){
            return{
                task: new Task(),
                tasks: [],
                edit: false,
                taskToEdit: ''
            }
        },
        created(){
            this.getTask();
        },
        methods: {
            sendTask(){
                if(this.edit === false){
                    fetch('/api/tasks', {
                        method: 'POST',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getTask();
                    })
                } else {
                    fetch('/api/tasks/' + this.taskToEdit, {
                        method: 'PUT',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getTask();
                        this.edit = false;
                    })
                }

                this.task = new Task();
            },
            getTask(){
                fetch('/api/tasks')
                    .then(res => res.json())
                    .then(data => {
                        this.tasks = data;
                        console.log(this.tasks);
                    })
            },
            deleteTask(id){
                fetch('/api/tasks/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getTask();
                })
            },
            editTask(id){
                fetch('/api/tasks/' + id)
                    .then(res => res.json())
                    .then(data => {
                        this.task = new Task(data.title, data.description);
                        this.taskToEdit = data._id;
                        this.edit = true;
                    });
            }
        }
    }
</script>
