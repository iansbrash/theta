# Task Implementation Brainstorming
* Tasks are stored in some global state (i.e. Redux)
* Tasks are in a useState hook which are then mapped to the Tasks screen
* Therefore, we have to pass in a 'setTasks' useState function to the AddTasks screen
* Deleting a task means filtering the entire list of tasks and finding that task with the ID and deleting it
* Storing all tasks in a useState object and mapping to Tasks seems like a terrible idea performance wise
* However, this might actually be what devs who use react do after further thought 