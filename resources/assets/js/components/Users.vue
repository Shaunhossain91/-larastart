<template>
    <div class="container">


<div class="row">
   <div class="col-12">
      <div class="card">
         <div class="card-header">
            <h3 class="card-title">Users</h3>
            <div class="card-tools">
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                Add New
                </button>

                <!-- Modal -->
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Add New</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="createUser" method = "post" >
                    <div class="modal-body">
                    
                        <div class="form-group">
                        <input v-model="form.name" type="text" name="name" placeholder = "Name"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                        <has-error :form="form" field="name"></has-error>
                        </div>

                        <div class="form-group">
                        <input v-model="form.email" type="text" name="email" placeholder = "Email Address"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                        <has-error :form="form" field="email"></has-error>
                        </div>

                        <div class="form-group">
                        <textarea v-model="form.bio" type="text" name="bio" placeholder = "Short bio(Optional)"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                        <has-error :form="form" field="bio"></has-error>
                        </div>

                          <div class="form-group">
                            <select v-model="form.type" class="form-control" id="type" :class="{ 'is-invalid': form.errors.has('type') }">
                                <option value="">Select Admin Role</option>
                                <option value="admin">Admin</option>
                                <option value="standardUser">Standart User</option>
                                <option value="author">Author</option>
                            </select>
                            <has-error :form="form" field="type"></has-error>
                        </div>

                        <div class="form-group">
                        <input v-model="form.password" type="password" name="password" placeholder = "password"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                        <has-error :form="form" field="password"></has-error>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Create Users</button>
                    </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
         </div>
         <!-- /.card-header -->
         <div class="card-body table-responsive p-0">
            <table class="table table-hover">
               <tbody>
                  <tr>
                     <th>ID</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Type</th>
                     <th>Registered</th>
                     <th>Modify</th>  
                  </tr>
                  <tr v-for = "user in users" :key = "user.id">
                     <td>{{user.id}}</td>
                     <td>{{user.name | uppercase}}</td>
                     <td>{{user.email}}</td>
                     <td><span class="tag tag-success">{{user.type | uppercase}}</span></td>
                     <td><span class="tag tag-success">{{ user.created_at | moment("dddd, MMMM Do YYYY") }}</span></td>
                     <td> <button class="btn btn-danger">Delete</button><button class="btn btn-primary ml-2" >Edit</button> </td>
                  </tr>
               </tbody>
            </table>
         </div>
         <!-- /.card-body -->
      </div>
      <!-- /.card -->
   </div>
</div>


    </div>
</template>

<script>



    export default {
             data () {
            return {
                users : {},

            // Create a new form instance
            form: new Form({
                name : '',
                email : '',
                password : '',
                type : '',
                bio : '',
                photo : ''
            })
            }
        },

        methods: {
            loadUsers(){
                axios.get("api/user").then(({data}) => (this.users = data.data) );
            },

            createUser(){
                 this.$Progress.start();
                 this.form.post('api/user').then(() =>{
                     Fire.$emit('update');
                 $('#exampleModalCenter').modal('hide');
                this.$swal('User created succesfully');
                 this.$Progress.finish();
                 })
                 
            }
        },

        created() {
            Fire.$on('update',() =>{
                this.loadUsers();
            });
            this.loadUsers();
        }
    }
</script>
