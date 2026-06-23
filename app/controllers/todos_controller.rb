class TodosController < ApplicationController
  before_action :set_todo, only: %i[ show edit update destroy ]

  def index
    @todos = Todo.all
    if params[:query].present?
      @todos = @todos.where("title ILIKE ?", "%#{params[:query]}%")
    end

    case params[:status]
    when "completed"
      @todos = @todos.completed
    when "in_progress"
      @todos = @todos.in_progress
    when "pending"
      @todos = @todos.pending
    when "overdue"
      @todos = @todos.where.not(status: :completed).where("due_date < ?", Time.current)
    end
    @todos = @todos.order(created_at: :desc)
  end

  def show
  end

  def new
    @todo = Todo.new
  end

  def edit
  end

  def create
    @todo = Todo.new(todo_params)
    if @todo.save
      redirect_to todos_path, status: :see_other, notice: "สร้างสำเร็จ"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @todo.update(todo_params)
      redirect_to todos_path, status: :see_other, notice: "แก้ไขสำเร็จ"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @todo.destroy
    redirect_to todos_url, status: :see_other, notice: "ลบสำเร็จ"
  end

  private

  def set_todo
    @todo = Todo.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:title, :description, :status, :due_date)
  end
end