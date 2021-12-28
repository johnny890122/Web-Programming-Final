import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DashboardTodoSchema = new Schema({
	DashboardTodoID: {type: mongoose.Types.ObjectId, required: true},
	Todos: [{type: mongoose.Types.ObjectId, ref: "Todo"}],
})


export  mongoose.model("DashboardTodo", DashboardTodoSchema);